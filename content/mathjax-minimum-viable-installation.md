---
title: "MathJax Minimum Viable Installation"
description: "Reduce the size of your local copy of MathJax"
author: "Arne Vogel"
date: 2018-01-02T01:50:47+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
draft: false
---

Downloading a local copy of MathJax gives you over 60mb in 30.000 files. If you want to use this on your webserver or don't want 30.000 files on your local copy this can be a problem. Luckily many files can be cut without affecting MathJax's functionality. For example for this website my [MathJax folder](https://github.com/ArneVogel/arnevogel.github.io/tree/master/MathJax) has only 47 files in 12 folders and is only 948kb big.

## Things to cut for free

Some of the files you get don't add any functionality and are only for development or documentation reasons in the zip. So you can cut these files and folders without affecting MathJax in any way if you don't specially need them yourself:

1. /Docs
2. /test
3. /unpacket
4. .gitignore
5. .npmignore
6. .travis.yml
7. bower.json
8. composer.json
9. CONTRIBUTING.md
10. latest.js
11. LICENSE
12. package.json
13. README.md

Already down to 47mb, but still over 30.000 files.

## Things you probably won't need

The biggest chunk of files is located in `/fonts/HTML-CSS/TeX/png/`, this is most likely a fallback for browsers that don't support webfonts. But since all up to date browsers support them, all the files in `/fonts/HTML-CSS/TeX/png/` aren't needed anymore. Deleting the folder removes 7.6mb in 29.012 files.

You also most likely only need one config from `/config/`. Deleting all the others gets rid of over 7mb.

Another thing that many people won't need is the `/localization/` folder. If you only need english you are safe to delete that to reducing the total size another 1mb and getting rid of 300 files.

Down to 31mb and 1523 files.

## Limiting to one

Limiting yourself to one font and one rendering mode safes more redundant files. If you choose to render your LaTeX to SVG you can delete the complete `/fonts/` folder since SVG uses fonts from `/jax/output/SVG/fonts/`. If you choose a different render mode delete all fonts you don't need in `/fonts/`. If you choose SVG delete the `/fonts/` folder and delete all fonts you don't need in `/jax/output/SVG/fonts/`.

Also delete all render modes and input modes in `/jax/output/` and `/jax/input/` that you don't need.

## Extreme Limiting

Technically you don't need anything in the older `/extensions/` so you can go in and delete anything that you don't specifically need, or just delete it completely saving another 2mb and 300 files.

Another thing you can do is cutting more on the font front. After you limited yourself to one font there are still most likely options like __bold__ or _italic_ that you might not need.