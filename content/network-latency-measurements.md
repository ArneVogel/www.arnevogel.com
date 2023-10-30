---
title: "What does the ping actually measure?"
description: ""
author: "Arne Vogel"
date: 2023-10-30T20:29:57+01:00
lastModified: ""
language: "en"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
toc: "no"
customCSS: []
customJS: []
init: "no"
category: []
draft: true
---

This is an appendix to the following blog post, if you want to learn how to get more details for network latency measurements using hardware timestamps, check it out:
https://eng-blog.iij.ad.jp/archives/21198

## Network time measurements with `ping`
In short: ping uses `gettimeofday` to add a timestamp to the packet before sending it. 
And then uses `gettimeofday` again to get the time when the packet is received. 
`ping` reports the difference between these two as the latency.

### In the code
Inserting a timestamp into the packet: `gettimeofday`
```
struct timeval tmp_tv;
gettimeofday(&tmp_tv, NULL);
memcpy(icp + 1, &tmp_tv, sizeof(tmp_tv));
```


When they receive a packet they again get the time with `gettimeofday`:
```
if (rts->opt_latency || recv_timep == NULL) {
    if (rts->opt_latency ||
        ioctl(sock->fd, SIOCGSTAMP, &recv_time))
        gettimeofday(&recv_time, NULL);
    recv_timep = &recv_time;
}
```

And then they calculate the latency:
```
struct timeval tmp_tv;
memcpy(&tmp_tv, ptr, sizeof(tmp_tv));
tvsub(tv, &tmp_tv);
triptime = tv->tv_sec * 1000000 + tv->tv_usec;
```

### Latency breakdown with hardware timestamps
One disadvantage of `ping`s approach is that we do not know how much time the packet spent in the network, how much time it spent on the NIC and how much time it spent in the kernel.
We only see the sum of all these different aspects of network latency.

For optimizing the latency critial software, it is important to know where the latency is coming from.

If you want to learn how to get more details about the network time measurements, check out the blog post :
https://eng-blog.iij.ad.jp/archives/21198

It describes how to use hardware timestamps to get more details about the network latency, in particular with a breakdown of how much time the packet spend in the network, on the NIC and in the kernel.
