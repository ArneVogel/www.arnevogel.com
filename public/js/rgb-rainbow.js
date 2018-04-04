var carouselCount = 0;
var generator;

function init() {
	clearInterval(generator);
	var r = document.getElementById("rainbow1");
	var n = document.getElementById("n1").value;
	var r2 = document.getElementById("rainbow2");
	var n2 = document.getElementById("n2").value;
	createDivs(r, n);
	createDivs(r2, n2);
	colorDivs(r);
	generator = setInterval(function() { carousel(r2); }, 500);
}

function setColor(color,elmt) {
	elmt.style.background = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
}

function removeChilds(div) {
	while (div.firstChild) {
		div.removeChild(div.firstChild);
	}
}

function carousel(div) {
	var n = div.childElementCount;
	carouselCount = ++carouselCount % n;
	
	var children = div.children;
	for (var i = 0; i < n; ++i) {
		setColor(nthColor((i+carouselCount)%n,n), children[i]);
	}
}

function createDivs(div, n) {
	removeChilds(div);
	for (var i = 0; i < n; ++i) {
		var tmp = document.createElement("div");
		tmp.style.width = "" + (100/n) + "%";
		tmp.classList.add("rainbowChild");
		div.appendChild(tmp);
	}
}

function colorDivs(div) {
	var n = div.childElementCount;
	var children = div.children;
	for (var i = 0; i < n; ++i) {
		setColor(nthColor(i,n), children[i]);
	}
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