---
title: "Golang Cross Compiling on Ubuntu"
description: "Cross Compile Go Projects on Ubuntu for different operating systems and system architectures."
author: "Arne Vogel"
date: 2017-12-27T15:41:07+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
category: ["go", "ubuntu"]
draft: false
---

Cross compiling a golang project on Ubuntu is as easy as building the project for ubuntu itself. Golang makes it easy to cross compile for many platforms and architecture types. When you want to cross compile your go project you only have to set the GOOS and GOARCH variables and go will handle the rest.

In your project folder typing `go build` will build it for the platform and architecture of the computer you currently are on. When you want to cross compile for a different platform you have to set the GOOS and possibly the GOARCH variable before go build. This is as easy as `env GOOS=[OS] GOARCH=[ARCH] go build`. Replace [OS] with the OS you want to target and [ARCH] with the architecture.

You don't necessarily have to set the [ARCH] variable. When building for windows I use `env GOOS=windows go build` and for mac I use `env GOOS=darwin go build`.

The possible values for OS are:

	android darwin dragonfly freebsd linux nacl netbsd openbsd plan9 solaris windows zos

and the possible values for ARCH are:

	386 amd64 amd64p32 arm armbe arm64 arm64be ppc64 ppc64le mips mipsle mips64 mips64le mips64p32 mips64p32le ppc s390 s390x sparc sparc64

These values are up to date as of writing this. Check out the official [go github repo](https://github.com/golang/go/blob/master/src/go/build/syslist.go) for possible changes.

