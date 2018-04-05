---
title: "RGB Rainbow"
description: "RGB Rainbow: Generating N colors in rgb around the color circle"
author: "Arne Vogel"
date: "2018-04-05"
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
category: []
draft: false
---

For the [cyclic cellular automaton](https://www.arnevogel.com/cyclic-cellular-automaton/) I had to get a variable amount of colors around the color circle. This is how I solved that problem.

<div style="border: 1px solid black; margin-bottom:5px; padding: 5px">
<div id="rainbow1" class="rainbow"></div>
\# of colors <input style="width:40px;" value="20" onchange="init()" id="n1" type="number">
</div>
I split the color wheel into 6 equal parts:

![wheel](/images/rgb-rainbow/wheel.png)


| Sector/Color | R     | G     | B     |
|--------------|-------|-------|-------|
| 0            | incr. | 0     | 255   |
| 1            | 255   | 0     | decr. |
| 2            | 255   | incr. | 0     |
| 3            | decr. | 255   | 0     |
| 4            | 0     | 255   | incr. |
| 5            | 0     | decr. | 255   |

__incr.__ means the color is increasing and __decr.__ means the color is decreasing going counter clockwise around the circle.

The pseudo code to achieve this:
	
	#get the i'th color, of n colors. 
	color(i,n):
		r, g, b = 0
		stepsize = floor((255*6)/n)
		progress = i*stepsize
		switch(floor(progress/255))
			case 0:
				b = 255
				r = progress%255
			case 1:
				r = 255
				b = progress%255
			case 2:
				r = 255
				g = progress%255
			case 3:
				g = 255
				r = progress%255
			case 4:
				g = 255
				b = progress%255
			case 5:
				b = 255
				g = progress%255
		return r, g, b
				

<div style="border: 1px solid black; margin-bottom:5px; padding: 5px">
<div id="rainbow2" class="rainbow"></div>
\# of colors <input style="width:40px;" value="20" onchange="init()" id="n2" type="number">
</div>
## Attributions
RGB color wheel: https://commons.wikimedia.org/wiki/File:RGB_color_wheel_360.svg