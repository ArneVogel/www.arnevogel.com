---
title: "RGB Rainbow"
description: "RGB Rainbow: Generating N colors in rgb around the color circle"
author: "Arne Vogel"
date: 2018-04-03T20:29:17+02:00
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
customCSS: ["rgb-rainbow"]
customJS: ["rgb-rainbow"]
init: "yes"
category: ["javascript"]
draft: true
---

For a recent project I had to create a variable amount of colors around the color circle. This is how I solved that problem.

<div id="rainbow1" class="rainbow"></div>
\# of colors <input style="width:40px;" value="20" onchange="init()" id="n1" type="number">


<div id="rainbow2" class="rainbow"></div>
\# of colors <input style="width:40px;" value="20" onchange="init()" id="n2" type="number">