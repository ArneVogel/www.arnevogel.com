function updateCanvasOnResize() {
    window.onresize = function(event) {
       updateChanvas();
    };
}

function randomize() {
    randomizePopulation();
    colorCanvas();
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
    var tmp = [];
    var x = getCanvasWidthInPixel();
    var y = getCanvasHeightInPixel();
    for (var i = 0; i < x; ++i) {
        tmp.push([]);
        for (var j = 0; j < y; ++j) {
            tmp[i].push(std);
        }
    }
	return tmp;
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

// Based on https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal/14832797#14832797
function allTheSame(array) {
    var first = array[0][0];
    return array.every(function(element) { 
        return element.every(function(element) { 
            return element === first;
        });
    });
}

// random int [min, max), the int is inclusive min, exclusive max.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}