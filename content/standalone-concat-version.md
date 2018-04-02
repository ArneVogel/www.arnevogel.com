---
title: "Standalone Concat Version"
description: "Standalone Concat Version"
author: "Arne Vogel"
date: 2017-12-13T13:21:01+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
---

For some time I wanted to create a [standalone version](https://github.com/ArneVogel/concat/releases) of Concat without the download restriction I had to pose on the online version because of server limitations.

In a poll I put up some months ago the most asked feature was to increase the download limit. Unfortunately with only 20gb disk space on the server and about 300 people using the downloader every day that is not possible without investing in more disk space. Considering that the ads I have put up on the website only barely cover the server costs that was no option in going further.

## Standalone version

So I have created a [go](https://golang.org/) version of the script that I use on the server. The go version can be compiled and run from the console without having to install python and manually installing dependencies of the script.

The standalone version still needs ffmpeg to combine the vod parts that get downloaded by the script.

## Further development

If you have found a bug or want to give me feedback send me an email to: <contact@concat.org>

If you want to look at the source code or want to make the script more error resistant you can take a look at the source code [here](https://github.com/ArneVogel/concat/blob/master/main.go).