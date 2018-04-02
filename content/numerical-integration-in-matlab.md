---
title: "Numerical Integration in Matlab"
description: "Numerical Integration in Matlab with summed newton cotes formulas. Trapezoid rule, Simpson's rule and 3/8 rule."
author: "Arne Vogel"
date: 2017-12-09T11:32:35+01:00
lastModified: "2017-12-11"
language: "en"
listed: "yes"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
category: ["matlab", "numeric"]
---

The code for the summed newton cotes formulas in matlab. The functions compute the integral of a function f(x) in the same file from a to b with step size n. Use a sufficient high n for accurate results.

See the [example](/download/numerical-integration.m) for usage.

![h](/images/numerical-integration-in-matlab/h.svg)

x is a vector of equidistant nodes.

## Trapezoid rule ##



![trapezoid rule](/images/numerical-integration-in-matlab/trapezoid.svg)

	function t = trapezoid_rule(a,b,n)
	  t = 0;
	  x = linspace(a,b,n);
	  h = x(2)-x(1);
	  for i = 1:length(x)-1
		t = t + (h/2 * (f(x(i)) + f(x(i+1))));
	  end
	end

## Simpson's rule ##

![simpson rule](/images/numerical-integration-in-matlab/simpson.svg)

	function s = simpson_rule(a,b,n)
	  s = 0;
	  x = linspace(a,b,n);
	  h = x(2)-x(1);
	  for i = 1:length(x)-1
		s = s + (f(x(i)) + 4* f((x(i)+x(i+1))/2) + f(x(i+1)));
	  end
	  s = s * h/6;
	end
	
## 3/8 rule ##

![38](/images/numerical-integration-in-matlab/38.svg)

	function r = rule38(a,b,n)
	  r = 0;
	  x = linspace(a,b,n);
	  h = x(2)-x(1);
	  for i = 1:length(x)-1
		r = r + ( f(x(i)) + 3* f(((x(i) + x(i+1))*(4/3)/3)) + 3* f(((x(i) + x(i+1))*(5/3))/3) + f(x(i+1)));
	  end
	  r = r * h/8;
	end