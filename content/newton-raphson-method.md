---
title: "Newton Raphson Method"
description: ""
author: "Arne Vogel"
date: 2018-01-23T16:18:43+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
category: ["numeric"]
draft: false
---

The Newton-Raphson method (named after Isaac Newton 1669 and Joseph Raphson 1690) is a method for generating a numerical sulution for systems of equations. 

Example for f(x) = -1/4*x^4+5/2*x^3-7*x^2+8*x-1, x0 = 2 and eps = 0.1 generated with MatLab:

<video src="/images/newton-raphson-method/newton-raphson-approximation.webm" controls>
	<p>Your browser doesn't seem to support the \<video/\> tag. Direct link to the video: <a href="/images/newton-raphson-method/newton-raphson-approximation.webm">newton-raphson-approximation.webm</a></p>
</video>

## Newton Raphson Method in MatLab
	
MatLab implementation for ![input](/images/newton-raphson-method/input.svg):

	function y = newton_raphson_method(f,x,x0,eps)
		fx = jacobian(f,x);
		v = num2cell(x0);
		b = f(v{:});

		while norm(b) > eps
			d = fx(v{:})\f(v{:});
			x0 = x0 - d;
			v = num2cell(x0);
			b = f(v{:});
		end
		y = x0;
	end

Note that the MatLab implementation doesn't exit when the function has no root.

Download: [newton_raphson_method.m](/download/newton_raphson_method.m)

See [newton_raphson_method_usage.m](/download/newton_raphson_method_usage.m) for how to use the implementation. You need the Symbolics library.