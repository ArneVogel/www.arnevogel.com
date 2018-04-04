---
title: "Brian\'s Brain Cellular Automaton"
description: ""
author: "Arne Vogel"
date: 2018-04-03T17:08:02+02:00
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
customCSS: ["life-like", "canvas"]
customJS: ["life-like", "canvas", "brian-life-like"]
init: "yes"
category: ["cellular automaton"]
draft: false
---

<div id="canvasWrapper" class="canvasWrapper">
    <canvas id="canvas" class="canvas" height="320" width="480"></canvas>
</div>
<div class="input_with_appended_unit">
<button class="btn" id="startStop" onclick="startStop()">Start</button><button class="btn" onclick="createAndDrawNextPopulation()">Step</button><button class="btn" onclick="clearScreen()">Clear</button><button class="btn" onclick="randomize()">Randomize</button> update rate: <input value="200" class="width30" id="speed"></input><span>ms</span><button class="btn" onclick="updateSpeed()">Apply</button>
</div>
<div class="input_with_appended_unit">
Simulation settings: Birth numbers: <input value="2" id="b"></input><span>B</span> Wrapping: <input class="checkbox" id="wrap" type="checkbox"><button class="btn" onclick="gameChange()">Apply</button>
</div>
<div class="input_with_appended_unit">
Display settings: Cell Size: <input class="width30" value="10" id="cellSize"></input><span>px</span><button  class="btn" onclick="lvlChange()">Apply</button>
</div>

__Rules__: There are three cell types. Dead (white), alive (black) and dying (gray). A alive cell always goes into dying and a dying cell always dies in the next iteration. A dead cell comes alive in the next iteration if the number of alive cells in the [moore neighborhood](https://en.wikipedia.org/wiki/Moore_neighborhood) are in the _birth numbers_ (above).

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

 * Spawn B: Specifies how many cells around a dead cell have to be alive for the cell to come alive.
 * Wrapping: Makes the _world_ wrap around, like in snake. With wrapping turned off the outside world acts as dead cells.

**Display Settings:**

Will restart the simulation.

 * Cell Size: Controls the height and width of the cells. Low values are very CPU intensive.
 