class Domino {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
}

class Solution {
	constructor(dominos, indices) {
		this.indices = indices; //list
		this.dominos = dominos;
		this.diff = "";
		this.diffSide = "";
		this.updateDiffs();
	}
	
	addIndice(i) {
		this.indices.push(i);
		this.updateDiffs();
	}
	
	updateDiffs() {
		var x = "";
		var y = "";
		
		for(var i = 0; i < this.indices.length; i++) {
			x += this.dominos[this.indices[i]].x;
			y += this.dominos[this.indices[i]].y;
		}
		
		if (x.length > y.length) {
			this.diffSide = "y";
			this.diff = x.slice(y.length, x.length);
		} else if (x.length < y.length) {
			this.diffSide = "x";
			this.diff = y.slice(x.length, y.length);
		} else {
			this.diffSide = "";
			this.diff = "";
		}
	}
	
	isValidSolution() {
		var x = "";
		var y = "";
		
		for(var i = 0; i < this.indices.length; i++) {
			x += this.dominos[this.indices[i]].x;
			y += this.dominos[this.indices[i]].y;
		}
		
		return x.length == y.length;
	}
	
	getX() {
		var x = "";
		
		for(var i = 0; i < this.indices.length; i++) {
			x += this.dominos[this.indices[i]].x;
		}
		
		return x;
	}
	
	getY() {
		var y = "";
		
		for(var i = 0; i < this.indices.length; i++) {
			y += this.dominos[this.indices[i]].y;
		}
		
		return y;
	}
}

function solve() {
	var dominos = []
	var pcp_text = get_instance_text();
	var pcp_text_split = pcp_text.split("\n");
	for (var i = 0; i< pcp_text_split.length; i++) {
		if(pcp_text_split[i].length == 0) {
			continue;
		}
		pcp_text_split[i] = pcp_text_split[i].replace( /\s\s+/g, ' ' )
		
		if (pcp_text_split[i].split(" ").length < 2) {
			print_error("Wrong domino in line: " + i+1 + ", " + pcp_text_split[i] + " is not a valid domino.");
		} else {
			dominos.push(new Domino(pcp_text_split[i].split(" ")[0], pcp_text_split[i].split(" ")[1]));
		}
	}
	
	
	
	let solutions = [];
	
	for (var i = 0; i < dominos.length; i++) {
		if (dominos[i].x.length == dominos[i].y.length) {
			if (dominos[i].x != dominos[i].y) {
				continue;
			}
		}
		if (dominos[i].x.length < dominos[i].y.length) {
			if (! dominos[i].y.startsWith(dominos[i].x)) {
				continue;
			}
		}
		if (dominos[i].y.length < dominos[i].x.length) {
			if (! dominos[i].x.startsWith(dominos[i].y)) {
				continue;
			}
		}
		var s = new Solution(dominos, [i]);
		solutions.push(s);
	}
	
	print_text("starting search for solution");
	
	
	//console.log(solutions)
	var validSolutions = getValidSolutions(solutions);
	
	for (var i = 0; i < get_depth(); i++) {
		/*
		console.log("iteration " + i);
		console.log("solutions going in: ");
		console.log(solutions);
		*/
		if(validSolutions.length > 0 || solutions.length == 0) {
			break;
		}
		newSolutions = [];
		for (var j = 0; j < solutions.length; j++) {
			if (solutions[j].diff == "") { //should never happen to be honest, but keeping it in for now, just in case
										   //actually if this case happens there should already be a solution
										   //but hey the code is here so its staying
				for (var k = 0; k < dominos.length; k++) {
					if (dominos[k].x.length == dominos[k].y.length) {
						if (dominos[k].x != dominos[k].y) {
							continue;
						}
					}
					if (dominos[k].x.length < dominos[k].y.length) {
						if (! dominos[k].y.startsWith(dominos[k].x)) {
							continue;
						}
					}
					if (dominos[k].y.length < dominos[k].x.length) {
						if (! dominos[k].x.startsWith(dominos[k].y)) {
							continue;
						}
					}
					var s = new Solution(dominos, solutions[j].indices.push(k));
				}
			}
			if (solutions[j].diffSide == "x") {
				for (var k = 0; k < dominos.length; k++) {
					if (dominos[k].x.startsWith(solutions[j].diff.slice(0,dominos[k].x.length))) {
						newX = solutions[j].getX() + dominos[k].x;
						newY = solutions[j].getY() + dominos[k].y;
						if(newX.length == newY.length) {
							if (newX != newY) {
								continue;
							}
						}
						if(newX.length > newY.length) {
							if (! newX.startsWith(newY)) {
								continue;
							}
						}
						if(newY.length > newX.length) {
							if (! newY.startsWith(newX)) {
								continue;
							}
						}
						
						var oldIndices = [];
						for (var p = 0; p < solutions[j].indices.length; p++) {
							oldIndices.push(solutions[j].indices[p]);
						}
						oldIndices.push(k);
						newSolutions.push(new Solution(dominos, oldIndices));
					}
				}
			}
			 
			if (solutions[j].diffSide == "y") {
				for (var k = 0; k < dominos.length; k++) {
					if (dominos[k].y.startsWith(solutions[j].diff.slice(0,dominos[k].y.length))) {
						newX = solutions[j].getX() + dominos[k].x;
						newY = solutions[j].getY() + dominos[k].y;
						
						if(newX.length == newY.length) {
							if (newX != newY) {
								continue;
							}
						}
						if(newX.length > newY.length) {
							if (! newX.startsWith(newY)) {
								continue;
							}
						}
						if(newY.length > newX.length) {
							if (! newY.startsWith(newX)) {
								continue;
							}
						}
						
						var oldIndices = [];
						for (var p = 0; p < solutions[j].indices.length; p++) {
							oldIndices.push(solutions[j].indices[p]);
						}
						oldIndices.push(k);
						newSolutions.push(new Solution(dominos, oldIndices));
					}
				}
			}
		}
		validSolutions = getValidSolutions(newSolutions);
		
		solutions = newSolutions;
		/*
		console.log("newly created solutions: ");
		console.log(solutions);
		console.log("---------")
		*/
		append_text("<br>finished depth " + (i+1));
	}
	if (validSolutions.length == 0) {
		print_text("found no solutions");
	} else {
		print_validSolutions(validSolutions, dominos);
		
	}
	console.log(validSolutions);
	console.log("end")
	
}

function getValidSolutions(solutions) {
	validSolutions = []
	for (var i = 0; i < solutions.length; i++) {
		if (solutions[i].isValidSolution()) {
			validSolutions.push(solutions[i]);
		}
	}
	return validSolutions;
}

function print_validSolutions(validSolutions, dominos) {
	validSolutions.length == 1 ? print_text("found solution: ") : print_text("found solutions:");
		for (var i = 0; i < validSolutions.length; i++) {
			append_text("<br>indices: ");
			for (var j = 0; j < validSolutions[i].indices.length; j++) {
				append_text((validSolutions[i].indices[j] + 1));
				if(j != validSolutions[i].indices.length-1) {
					append_text(",")
				}
			}
			append_text("<br>");
			for (var i = 0; i < validSolutions.length; i++) {
				for (var j = 0; j < validSolutions[i].indices.length; j++) {
					append_text("x<sub>" + (validSolutions[i].indices[j] + 1) + "</sub>");
					if(j != validSolutions[i].indices.length-1) {
						append_text(".")
					}
				}
			}
			
			append_text("=");
			
			for (var i = 0; i < validSolutions.length; i++) {
				for (var j = 0; j < validSolutions[i].indices.length; j++) {
					append_text( dominos[(validSolutions[i].indices[j])].x);
					if(j != validSolutions[i].indices.length-1) {
						append_text(".")
					}
				}
			}
			
			append_text("=");
			
			
			for (var i = 0; i < validSolutions.length; i++) {
				for (var j = 0; j < validSolutions[i].indices.length; j++) {
					append_text( dominos[(validSolutions[i].indices[j])].x);
					
				}
			}
			
			
			append_text("=");
			
			for (var i = 0; i < validSolutions.length; i++) {
				for (var j = 0; j < validSolutions[i].indices.length; j++) {
					append_text( dominos[(validSolutions[i].indices[j])].y);
					if(j != validSolutions[i].indices.length-1) {
						append_text(".")
					}
				}
			}
			
			append_text("=");
			for (var i = 0; i < validSolutions.length; i++) {
				for (var j = 0; j < validSolutions[i].indices.length; j++) {
					append_text("y<sub>" + (validSolutions[i].indices[j] + 1) + "</sub>");
					if(j != validSolutions[i].indices.length-1) {
						append_text(".")
					}
				}
			}
		}
}

function get_instance_text() {
	return document.getElementById("pcp_input").value;
}

function get_depth() {
	return parseInt(document.getElementById("depth").value)
}

function print_error(error) {
	document.getElementById("pcp_result").innerHTML = error;
}

function print_text(t) {
	document.getElementById("pcp_result").innerHTML = t;
}

function append_text(t) {
	document.getElementById("pcp_result").innerHTML += t;
}

function example1() {
	print_text("");
	document.getElementById("pcp_input").innerHTML = "1 101\n10 00\n011 11"
	document.getElementById("depth").value = "6"
}

function example2() {
	print_text("");
	document.getElementById("pcp_input").innerHTML = "001 0\n01 011\n01 101\n10 001"
	document.getElementById("depth").value = "70"
}