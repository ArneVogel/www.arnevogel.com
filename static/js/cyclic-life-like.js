var wrap = true;
var speed = 200;
var n = 10;
var population = [];
var typeColors = {};
var types = [];
var generator;

function init() {
    initCanvas();
    setCanvasSize();
    updateCanvasOnResize();
    updateChanvas();
    
    initSwitchTypesEvent("click");
    gameChange();
    lvlChange();
	updateChanvas();
}

function updateChanvas() {
    setCanvasSize();
    population = createPopulationArray("0");
    randomizePopulation();
    colorCanvas();
}

function gameChange() {
    n = parseInt(document.getElementById("n").value);
    wrap = document.getElementById("wrap").checked;
	types = [];
	typeColors = [];
	for (var i = 0; i < n; ++i) {
		types.push(i.toString())
		typeColors[i.toString()] = toRGB(nthColor(i,n));
	}
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
    population = createPopulationArray("0");
    colorCanvas();
    
    stopGenerating();
    
}


function nextPopulation() {
    var newPopulation = [];
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
	var curr;
	var plusOne;
    for (var i = 0; i < x; ++i) {
        newPopulation.push([]);
        for (var j = 0; j < y; ++j) {
			curr = population[i][j];
			plusOne = ((parseInt(curr)+1)%n).toString();
			if (getNeighborCount(i,j,plusOne) >= 1) {
				newPopulation[i].push(plusOne);
			} else {
				newPopulation[i].push(curr);
			}
        }
    }
    return newPopulation;
}

function toRGB(colorArray) {
	var r = colorArray[0].toString(16);
	var g = colorArray[1].toString(16);
	var b = colorArray[2].toString(16);
	r.length == 1 ? r = "0" + r : r;
	g.length == 1 ? g = "0" + g : g;
	b.length == 1 ? b = "0" + b : b;
	return "#" + r + g + b;
}

function nthColor(i,n) {
	var step = Math.floor((255*6)/n);
	var r = 0;
	var g = 0;
	var b = 0;
	var progress = i*step;
	switch (Math.floor(progress/255)) {
		case 0:
			b = 255;
			g = progress%255;
			break;
		case 1:
			g = 255;
			b = 255 - progress%255;
			break;
		case 2:
			g = 255
			r = progress%255;
			break;
		case 3:
			r = 255;
			g = 255-progress%255;
			break;
		case 4:
			r = 255;
			b = progress%255;
			break;
		case 5:
			b = 255;
			r = 255-progress%255;
			break;		
	}
	tmp = [];
	tmp.push(r);
	tmp.push(g);
	tmp.push(b);
	return tmp;
}