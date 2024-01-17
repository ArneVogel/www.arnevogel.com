---
title: "TIL: Home Manager Nixpkgs Mismatch"
description: ""
author: "Arne Vogel"
date: 2024-01-17T11:39:38+01:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---
With `nix-channel --update; nix-env -iA nixpkgs.nix nixpkgs.cacert; systemctl daemon-reload; systemctl restart nix-daemon` I was able to solve the following error: 

```
trace: warning: You are using

  Home Manager version 24.05 and
  Nixpkgs version 23.11.

Using mismatched versions is likely to cause errors and unexpected
behavior. It is therefore highly recommended to use a release of Home
Manager that corresponds with your chosen release of Nixpkgs.

If you insist then you can disable this warning by adding

  home.enableNixpkgsReleaseCheck = false;

to your configuration.
```
