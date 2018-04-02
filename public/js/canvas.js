/*
pixel format = (x,y)
     y
   x (0,0) (0,1) 
     (1,0) (1,1)
     (2,0) (2,1)

*/

var pixelSize = 5;
var widthToHeightDifference = 1.6; // 1.6 = 16:10

var canvas;
var ctx;

var canvasWidthInPixel;
var canvasHeightInPixel;


function initCanvas() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}


function setCanvasSize() {
    var windowsWidth = document.getElementById("canvasWrapper").offsetWidth;
    var width = windowsWidth-20;
    width -= width%pixelSize;
    var height = Math.floor(width/widthToHeightDifference);
    height -= height%pixelSize;
    setCanvasHeight(height);
    setCanvasWidth(width);
    
    canvasHeightInPixel = canvas.height/pixelSize;
    canvasWidthInPixel = canvas.width/pixelSize
}

function setCanvasWidth(x) {
    canvas.width = x;
}

function setCanvasHeight(x) {
    canvas.height = x;
}

function getCanvasHeightInPixel() {
    return canvasHeightInPixel;
}

function getCanvasWidthInPixel() {
    return canvasWidthInPixel;
}

function getEventPixel(evnt) {
    var rect = canvas.getBoundingClientRect();
    var xPixel = Math.floor((evnt.clientX - rect.left)/pixelSize);
    var yPixel = Math.floor((evnt.clientY - rect.top)/pixelSize);
    xPixel < 0 ? xPixel = 0 : xPixel = xPixel;
    xPixel >= getCanvasWidthInPixel() ? xPixel = getCanvasWidthInPixel()-1 : xPixel = xPixel;
    yPixel < 0 ? yPixel = 0 : yPixel = yPixel;
    yPixel >= getCanvasHeightInPixel ? yPixel = getCanvasHeightInPixel()-1 : yPixel = yPixel;
    
    return {
        x: xPixel,
        y: yPixel
    };
}

function setPixel(x,y, color) {
    ctx.beginPath();
    ctx.rect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}