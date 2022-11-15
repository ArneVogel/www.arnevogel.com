---
title: "Zipfian Distribution Simulator"
description: ""
author: "Arne Vogel"
date: 2022-11-15T20:40:26+01:00
lastModified: ""
language: "en"
about: "no"
related: "no"
listed: "yes"
mathjax: "yes"
toc: "no"
customCSS: []
customJS: ["zipf", "Chart"]
init: "yes"
category: []
draft: false
---

Below is a simulator for a zipfian distribution with parameters $N$ and $\alpha$.
Each entry has probability:
$${f(i;\alpha,N)~=~{\frac {\left[{\frac {1}{\ i^{\alpha}\ }}\right]}{\ \left[\ \sum \limits _{n=1}^{N}{\frac {1}{\ n^{\alpha}\ }}\ \right]\ \ }}}$$


<canvas id="chart" style="width:100%;max-width:700px"></canvas>


<input oninput="init()" type="range" min="1" value="10" max="20" step="1" id="N" name="N">
<label for="N">N = <span id="N-label"></span></label>

<input oninput="init()" type="range" id="alpha" name="alpha" 
     min="0" max="2" value="0" step="0.05">
<label for="alpha">$\alpha$ = <span id="alpha-label"></span></label>


<div id="text-output"></div>

