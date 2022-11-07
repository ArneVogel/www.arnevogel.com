---
title: "TIL: The Nix Home Manager Works on Non-Nix Distros"
description: ""
author: "Arne Vogel"
date: 2022-11-07T16:47:45+01:00
lastModified: ""
language: "en"
customCSS: []
customJS: []
init: "no"
listed: "yes"
category: []
draft: false
---

Nix in general seems promising for both reproducible software and as a distro.
But making a full switch seems like a lot of work and im lazy.
Because of this I am happy to find out that the [home-manager](https://github.com/nix-community/home-manager) project works on non-nix distros.
Tl:dr on home-manager: it lets you configure and install software on your system using the nix ecosystem.
This lets me incrementally switch while staying on my regular distros.
I have successfully run the home-manager on Ubuntu and Arch linux.

All I needed was [nix installed](https://nixos.org/download.html) and the [installation of home-manager](https://nix-community.github.io/home-manager/index.html#sec-install-standalone).
Note on the home-manager install: The `$PATH` variable only needed to be set for the installation. I did not need to set it in `.bashrc`.

The whole nix language(?) is still daunting but so far I managed to build up piece by piece my configuration.
The [Appendix A](https://rycee.gitlab.io/home-manager/options.html) is a great resource and everything else I managed to look up so far.
One thing I haven't tackled yet is configuring neovim.
That seems a bit more involved but im sure it will work out.
For progress on that you can check out my [nixpkgs config](https://github.com/ArneVogel/nixpkgs).
