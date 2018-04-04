---
title: "Cyclic Cellular Automaton"
description: ""
author: "Arne Vogel"
date: 2018-04-04T10:30:52+02:00
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
customCSS: ["life-like"]
customJS: ["cyclic-life-like", "life-like", "canvas"]
init: "yes"
category: ["cellular-automaton"]
draft: false
---

<div id="canvasWrapper" class="canvasWrapper">
    <canvas id="canvas" class="canvas" height="320" width="480"></canvas>
</div>
<div>
<button class="btn" id="startStop" onclick="startStop()">Start</button><button class="btn" onclick="createAndDrawNextPopulation()">Step</button><button class="btn" onclick="clearScreen()">Clear</button><button class="btn" onclick="randomize()">Randomize</button> update rate: <input value="200" class="width30" id="speed"></input><span>ms</span><button class="btn" onclick="updateSpeed()">Apply</button>
</div>
<div>
Simulation settings: # of colors: <input type="number" style="width:40px" id="n" value="15"> Wrapping: <input class="checkbox" id="wrap" type="checkbox"><button class="btn" onclick="gameChange()">Apply</button>
</div>
<div class="input_with_appended_unit">
Display settings: Cell Size: <input style="width:30px" value="10" id="cellSize"></input><span>px</span><button  class="btn" onclick="lvlChange()">Apply</button>
</div>

## Settings

Clicking on the simulation turns cells on and off.

**Controls:**

 * Start: Begins the simulation, calculating and displaying the next population every _update rate_ seconds
 * Step: Calculates and displays the next population
 * Clear: Stops the simulation and clears the population
 * Randomize: Randomly sets 50% of the cells _alive_ and the other 50% _dead_
 * Update Rate: How many milliseconds each frame is displayed. Lower = Faster simulation, but more CPU intensive.

**Simulation Settings:**

Can be edited while the simulation is running.

 * # of colors: Number of colors
 * Wrapping: Makes the _world_ wrap around, like in snake. With wrapping turned off the outside world acts as dead cells.

**Display Settings:**

Will restart the simulation.

 * Cell Size: Controls the height and width of the cells. Low values are very CPU intensive.
 