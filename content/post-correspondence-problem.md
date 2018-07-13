---
title: "Post Correspondence Problem (PCP)"
description: ""
author: "Arne Vogel"
date: 2018-07-08
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
customCSS: []
customJS: ["pcp-solver"]
init: "no"
category: [""]
draft: false
---

## Problem Statement
Given a list of pairs ((x<sub>1</sub>,y<sub>1</sub>),(x<sub>2</sub>,y<sub>2</sub>),...,(x<sub>n</sub>,y<sub>n</sub>)) of non-empty words x<sub>1</sub>,x<sub>2</sub>,...,x<sub>n</sub>,y<sub>1</sub>,y<sub>2</sub>,...,y<sub>n</sub> find a non-empty list of indices i<sub>1</sub>,i<sub>2</sub>,...,i<sub>m</sub> so that the concatination of x<sub>i<sub>1</sub></sub>.x<sub>i<sub>2</sub></sub>....x<sub>i<sub>m</sub></sub> equals y<sub>i<sub>1</sub></sub>.y<sub>i<sub>2</sub></sub>....y<sub>i<sub>m</sub></sub>.

The word pairs (x<sub>i</sub>,y<sub>i</sub>) of a problem case can well be imagined as dominoes, where on one half x<sub>i</sub> and on the other half y<sub>i</sub> are written. There are n types of dominoes and any number of dominoes are available.

The correspondence problem can now be understood as follows: Is there a sequence of dominoes so that the words on the upper half of the dominoes (read from left to right) produce the same word as the words (read from left to right) from the lower half of the merged dominoes?

## PCP Solver
<textarea id="pcp_input" rows="8" cols="20">1 101
10 00
011 11</textarea><br>
<button class="btn" onclick="solve()">Solve</button>
<span>max. depth:</span><input value="6" style="width:40px;margin-left: 3px;" type="number" id="depth"></input>
<p id="pcp_result"></p>

<button class="btn" onclick="example1()">Example 1</button><button class="btn" onclick="example2()">Example 2</button>

JavaScript implementation of the PCP algorithm below. In some cases, in particular with big instances and large values for depth, this might crash the site.

Example two illustrates how even for small instances the solution might only be found with a huge amount of indices.

## Algorithm for solving PCP Instances

The Algorithm, given a list of pairs (n pairs) and a limit k, finds a list of indices that are a solution to the PVP problem.

    solutions = {}
	(1)FOR i = 1...n:
		IF xi = yi:
			return (i)
		IF length(xi) < length(yi):
			IF yi begins with xi:
				solutions = solutions + (i)
		IF length(yi) < length(xi):
			IF xi begins with yi:
				solutions = solutions + (i)
				
	(2)FOR i = 1...k:
		new_solutions = {}
	(2.1)	FOR solution in solutions:
	(2.2)		FOR j = 1...n:
	(2.2.1)			IF adding pair j would not break the solution:
						new_solutions = new_solutions + (solution, j)
		
	(2.3)	IF new_solutions = {}:
				return {}
	(2.4)	FOR solution in new_solutions:
				IF length of concatination of all xi equals length of concatination of all yi:
					return solution
		solutions = new_solutions
					
In step (1) a solutions list is created. Solutions are checked for validity in (2.4). There are k iterations (2). For each iteration each solution in the set of possible solutions (2.1) is checked if there can be added one of each of the possible pairs of (x<sub>j</sub>,y<sub>j</sub>) (2.2). A pair can be added if the concatination of all the x and y in the solution concatinated with x<sub>j</sub> and y<sub>j</sub>, like in (1), the bigger concatination begins with the smaller of both concatinations. If no new possible solutions are found the search can be aborted in (2.3).

Inpired by https://webdocs.cs.ualberta.ca/~games/PCP/thesis/pcp.pdf (Chapter 2.2 An example of solving PCP instances).