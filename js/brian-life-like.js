var wrap = true;
var speed = 200;
var population = [];
var typeColors = {alive: "black", dead: "white", dying: "gray"};
var types = ["alive", "dying", "dead"];
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

function updateChanvas() {
    setCanvasSize();
    population = createPopulationArray("dead");
    randomizePopulation();
    colorCanvas();
}

function gameChange() {
    birthNumbers = parseMirekString(document.getElementById("b").value);
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
    population = createPopulationArray("dead");
    colorCanvas();
    
    stopGenerating();
    
}


function nextPopulation() {
    var newPopulation = [];
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    for (var i = 0; i < x; ++i) {
        newPopulation.push([]);
        for (var j = 0; j < y; ++j) {
            if (population[i][j] == "dead") {
                birthNumbers.includes(getNeighborCount(i,j,"alive")) ? newPopulation[i].push("alive") : newPopulation[i].push("dead");
            } else if (population[i][j] == "alive") {
                newPopulation[i].push("dying");
            } else {
                newPopulation[i].push("dead");
            }
        }
    }
    return newPopulation;
}