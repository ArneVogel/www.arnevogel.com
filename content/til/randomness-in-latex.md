---
title: "TIL: Randomness in Latex"
description: ""
author: "Arne Vogel"
date: 2023-01-30T21:48:32+01:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

You can use `\usepackage{pgffor}` for randomness in LaTeX.

```
\usepackage{pgffor}
\pgfmathdeclarerandomlist{Options}{{option1}{option3}{option3}}
\pgfmathrandomitem{\randomlySelected}{Options}
```

This will select one random element from `Options` and populate `\randomlySelected` with it.
`\randomlySelected` can they get used just as you would expect it to work.
One thing I noticed though: the random item selection will pick the same element for ~15 seconds.
So rebuilding will not necessarily give you another option, even if you rebuild multiple times, if you don't wait for some amount of time.
