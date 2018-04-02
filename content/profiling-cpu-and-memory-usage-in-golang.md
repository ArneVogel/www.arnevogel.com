---
title: "Profiling CPU and Memory Usage in Golang"
description: "Find bugs and bottlenecks in your golang projects using profiling. Profile your CPU and memory usage in go"
author: "Arne Vogel"
date: 2018-01-06T17:40:20+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
category: ["go"]
draft: true
---

Finding bugs and bottlenecks in programs can be downright impossible without the right tools. Luckely go comes with a neat profiling toolkit for analysing CPU and memory usage of go programs. And together with [github.com/pkg/profile](https://github.com/pkg/profile) profiling can be achieved with literally two lines of code.

## Prerequisites

Additionally to the build in tool from golang you might need to get [graphviz](https://graphviz.gitlab.io/). If you are on windows make sure to download the `.zip`, extract it and add the `bin` folder to %PATH%.

## Usage

go tool pprof --pdf C:\Users\Michael\AppData\Local\Temp\profile321510623\mem.pprof > file2.pdf

defer profile.Start(profile.MemProfile).Stop()