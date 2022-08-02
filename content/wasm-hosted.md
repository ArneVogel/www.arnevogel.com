---
title: "WebAssembly hosted Web Server"
description: ""
author: "Arne Vogel"
date: 2022-08-01T20:51:00+02:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
toc: "no"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

We can now host web servers as WebAssembly modules!

As a proof of concept see [wasmhosted.arnevogel.com](https://wasmhosted.arnevogel.com), which is hosted by a WebAssembly module run by wasmtime.
Also check out the [source code](https://github.com/arnevogel/wasm-file-server).




## How we got here
This year, `sock_accept` was [added to WASI](https://github.com/WebAssembly/WASI/pull/458).
Because of this, we can now accept connections on pre-opened listening sockets from within WebAssembly.
Before `sock_accept` only `sock_recv`, `sock_send`, and `sock_shutdown` were [defined for WASI](https://github.com/WebAssembly/WASI/blob/71e710bfa88fa460963ad465dcdc548e4542fae2/phases/snapshot/witx/wasi_snapshot_preview1.witx#L487).
Unfortunately, you can't do much with the three of them alone. 

That's why `sock_accept` is so exciting.
Support for `sock_accept` has in the meanwhile been added for the Rust [stdlib](https://github.com/rust-lang/rust/pull/93158), [tokio + mio](https://github.com/tokio-rs/tokio/pull/4716), and probably a lot more places.


## Accepting connections
We can only accept connections on pre-opened listening sockets.
This means for our WebAssembly module that we cannot open a socket from inside the module.
We have to get the socket from the runtime.
Fortunately [wasmtime already supports this](https://github.com/bytecodealliance/wasmtime/commit/853a025613e012c6c29002ddcccfced67073a8d0).

For us, this means that we have to construct our `TcpListener` from a raw file descriptor given to us by wasmtime:

{{< highlight rust "hl_lines=4" >}}
#[cfg(target_os = "wasi")]
async fn get_tcplistener() -> TcpListener {
    use std::os::wasi::io::FromRawFd;
    let stdlistener = unsafe { std::net::TcpListener::from_raw_fd(4) };
    stdlistener.set_nonblocking(true).unwrap();
    TcpListener::from_std(stdlistener).unwrap()
}
{{< / highlight >}}

When we run our server with wasmtime we use `--tcplisten` to tell wasmtime to open up a socket listening on localhost:4000 and to provide this socket to our module.

{{< highlight shell >}}
wasmtime run --tcplisten 127.0.0.1:4000 server.wasm
{{< / highlight >}}

Actually, for the proof of concept server I also need to specify the directory wasmtime lets the server access `--dir=public`, but thats besides the point.
While we are at it, we also need to [patch](https://github.com/ArneVogel/wasm-file-server/blob/main/socket.patch) our wasmtime.
There has been an issue with wasmtime where `--tcplisten` and `--dir` do not play [nicely together](https://github.com/bytecodealliance/wasmtime/issues/3936).
The patch applies this "[band-aid fix](https://github.com/bytecodealliance/wasmtime/issues/3936#issuecomment-1088393681)" to wasmtime to fix this issue.

