var wrap = true;
var speed = 200;
var population = [];
var typeColors = {alive: "black", dead: "white"};
var types = ["alive", "dead"];
var survivingNumbers; // a alive cell with a number of alive neighbors in survivingNumbers survives into the next generation
var birthNumbers; // a dead cell with a number of alive neighbors in birthNumbers revives in the next generation
var generator;

function init() {
    initCanvas();
    setCanvasSize();
    updateCanvasOnResize();
    updateChanvas();
    
    initSwitchTypesEvent("click");
    gameChange();
    lvlChange();
}

function updateCanvasOnResize() {
    window.onresize = function(event) {
       updateChanvas();
    };
}

function updateChanvas() {
    setCanvasSize();
    createPopulationArray("dead");
    randomizePopulation();
    colorCanvas();
}

function gameChange() {
    birthNumbers = parseMirekString(document.getElementById("b").value);
    survivingNumbers = parseMirekString(document.getElementById("s").value);
    wrap = document.getElementById("wrap").checked;
}

function lvlChange() {
    pixelSize = parseInt(document.getElementById("cellSize").value);
    setCanvasSize();
    updateChanvas();
}

function startStop() {
    startBtn = document.getElementById("startStop");
    if (startBtn.innerHTML == "Start") {
        updateSpeed();
    } else {
        stopGenerating();
    }
}

function updateSpeed() {
    startBtn = document.getElementById("startStop");
    startBtn.innerHTML = "Stop";
    speed = parseInt(document.getElementById("speed").value);
    clearInterval(generator);
    generator = setInterval(createAndDrawNextPopulation, speed);
}

function stopGenerating() {
    startBtn = document.getElementById("startStop");
    startBtn.innerHTML = "Start";
    clearInterval(generator);
}


function randomize() {
    randomizePopulation();
    colorCanvas();
}

function clearScreen() {
    createPopulationArray("dead");
    colorCanvas();
    
    stopGenerating();
    
}

function createAndDrawNextPopulation() {
    population = nextPopulation();
    colorCanvas();
}

function initSwitchTypesEvent(triggerEvent) {
    canvas.addEventListener(triggerEvent, function(evt) { 
        pixel = getEventPixel(evt);
        switchTypes(pixel);
        setPixel(pixel.x,pixel.y, typeColors[population[pixel.x][pixel.y]]);
    }, false);
}

function switchTypes(pixel) {
    var curr = population[pixel.x][pixel.y];
    var index = types.indexOf(curr);
    index+1 >= types.length ? index = 0 : ++index;
    population[pixel.x][pixel.y] = types[index];
}

function createPopulationArray(std) {
    population = [];
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    for (var i = 0; i < x; ++i) {
        population.push([]);
        for (var j = 0; j < y; ++j) {
            population[i].push(std);
        }
    }
}

function nextPopulation() {
    newPopulation = [];
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    for (var i = 0; i < x; ++i) {
        newPopulation.push([]);
        for (var j = 0; j < y; ++j) {
            if (population[i][j] == "dead") {
                birthNumbers.includes(getNeighborCount(i,j,"alive")) ? newPopulation[i].push("alive") : newPopulation[i].push("dead");
            } else if (population[i][j] == "alive") {
                survivingNumbers.includes(getNeighborCount(i,j,"alive")) ? newPopulation[i].push("alive") : newPopulation[i].push("dead");
            } else {
                newPopulation[i].push("dead");
            }
        }
    }
    return newPopulation;
}


function getNeighborCount(x, y, type) {
    var width = getCanvasWidthInPixel();
    var height = getCanvasHeightInPixel();
    var p;
    var sum = 0;
    if (wrap) {
        sameType(wrapPixel({x:x+1, y:y}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x, y:y+1}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x+1, y:y+1}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x-1, y:y}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x, y:y-1}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x-1, y:y-1}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x+1, y:y-1}, width,height), type) ? ++sum : sum;
        sameType(wrapPixel({x:x-1, y:y+1}, width,height), type) ? ++sum : sum;
    } else {
        p = {x:x+1, y:y};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x, y:y+1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x+1, y:y+1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x-1, y:y};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x, y:y-1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x-1, y:y-1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x-1, y:y+1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;
        p = {x:x+1, y:y-1};
        (validPixel(p, width, height) && sameType(p,type)) ? ++sum : sum;    
    }
    return sum;
}

function wrapPixel(pixel, width, height) {
    if (pixel.x >= width) {
        pixel.x = 0;
    } else if (pixel.x < 0) {
        pixel.x = width-1;
    }
    if (pixel.y >= height) {
        pixel.y = 0;
    } else if (pixel.y < 0) {
        pixel.y = height-1;
    }
    return pixel;
}

function validPixel(pixel, width, height) {
    return (pixel.x < width && pixel.x >= 0 && pixel.y < height && pixel.y >= 0);
}

function sameType(pixel, type) {
    return population[pixel.x][pixel.y] === type;
}

// https://en.wikipedia.org/wiki/Life-like_cellular_automaton#Notation_for_rules
// "237" returns [2,3,7]
function parseMirekString(str) {
    var tmp = [];
    for (var i = 0; i < str.length; i++) {
      tmp.push(parseInt(str.charAt(i)));
    }
    return tmp;
}

function colorCanvas() {
    clearCanvas();
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    for (var i = 0; i < x; ++i) {
        for (var j = 0; j < y; ++j) {
            setPixel(i,j,typeColors[population[i][j]]);
        }
    }
}

function randomizePopulation() {
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    var min = 0;
    var max = types.length;
    
    for (var i = 0; i < x; ++i) {
        for (var j = 0; j < y; ++j) {
            tmp = types[getRandomInt(min,max)];
            population[i][j] = tmp;
        }
    }
}

// random int [min, max), the int is inclusive min, exclusive max.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}