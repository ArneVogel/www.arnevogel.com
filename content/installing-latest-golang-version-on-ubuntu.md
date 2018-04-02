---
title: "Installing Latest Golang Version on Ubuntu"
description: "Installing the latest Golang Version on Ubuntu and setting up GOPATH and GOROOT"
author: "Arne Vogel"
date: 2018-01-10T11:03:35+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
category: ["go", "ubuntu"]
draft: false
---

Installing Go with apt-get might not give you the most up to date golang version. On this page I describe how to install the latest golang version on how to set the $GOPATH and $GOROOT system variables

    $go version
    The program 'go' is currently not installed. You can install it by typing:
    apt install golang-go

After installing golang with the suggested command `apt install golang-go` you might have an older version of golang installed.

	$go version
	go version go1.6.2 linux/amd64

## Latest Go Version
	
So let's install the latest version of go. This should work on all up to date Ubuntu versions, I tested it on 17.10, 16.04, 14.04.

To do so go to the [download page](https://golang.org/dl/) of golang and select the version you want to install. In my case the latest version is 1.9.2, but your might be different. Rightclick and copy the link with `linux-amd64.tar.gz` in the name. Now we download this version using ``

	$wget https://dl.google.com/go/go1.9.2.linux-amd64.tar.gz

	
Once the download is finished extract the package with `sudo tar -xvf go1.9.2.linux-amd64.tar.gz`. This should result in a lot of text flying by your screen. Once its finished there should be a folder named `go` in the directory. You can remove the package now with `rm go1.9.2.linux-amd64.tar.gz`.

	$sudo tar -xvf go1.9.2.linux-amd64.tar.gz
	$ls
	go  go1.9.2.linux-amd64.tar.gz
	$rm go1.9.2.linux-amd64.tar.gz
	$ls
	go


Now move the folder anywhere you like with `sudo mv go [folder]`. In my case I used `sudo mv go /usr/local`

	$sudo mv go /usr/local
	$ls
	[empty]

## Setting up GOPATH and GOROOT

To access golang from anywhere on the system and to let golang know where to install packages we have to set the `GOPATH` and `GOROOT` system variables and additionally add them to `PATH`. To do so we have to append them to `~/.profile`. Open `~/.profile` with:

	$sudo nano ~/.profile

Scroll all the way to the botton and add these three lines to the file and save it:
	
	export GOROOT=/usr/local/go
	export GOPATH=/go
	export PATH=$GOPATH/bin:$GOROOT/bin:$PATH

You have to change the folder in the first line if you moved the go folder to a different location. The second line tells go where to install packages with `go get`. So if you want a different folder there just change it in the second line. The third line adds both to the `PATH`.

After restarting the command line you have the most up to date go version installed:

	go version
	go version go1.9.2 linux/amd64
