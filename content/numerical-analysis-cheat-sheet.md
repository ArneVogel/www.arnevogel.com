---
title: "Numerical Analysis Cheat Sheet"
description: ""
author: "Arne Vogel"
date: 2018-01-21T15:11:39+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "yes"
category: ["cheat sheet", "numeric"]
draft: false
---

## Error Analysis

### Machine Numbers
A set of machine numbers $\mathbb{M}(b,m,e)$ is composed of three parts, $b$ the base of the number, $m$ the number of digits in the mantissa and $e$ the number of digits for the exponent. $\mathbb{M}(10,3,1)$ contains the machine numbers with base 10 that have three digits for the mantissa and 1 digit for the exponent. One such number would be +102 +3 where +102 is the mantissa and +3 is the exponent. The corresponding number would be 102.000.

Roundoff unit or macheps is defined as $\varepsilon = \tfrac{b}{2}b^{-m}$. For $\mathbb{M}(10,3,1)$ that would be $\varepsilon = \tfrac{10}{2}10^{-3} = 0.005$.

#### Converting Decimal numbers to Machine Numbers

To convert a decimal number to a machine number you have to keep dividing the number by the base of the machine number and keep track of the remainer and set the resulting number to the decimal number until the division results in 0. For example converting $125_{10}$ to $\mathbb{M}(2,5,3)$:

$$125 : 2 = 62, R = 1$$
$$62 : 2 = 31, R = 0$$
$$31 : 2 = 15, R = 1$$
$$15 : 2 = 7, R = 1$$
$$7 : 2 = 3, R = 1$$
$$3 : 2 = 1, R = 1$$
$$1 : 2 = 0, R = 1$$

If we would have an infinite mantissa $m$ we would take all the reminders in reverse order but because $m$ is limited we only take 5 in this case. So we get $+11111$ as the mantissa. Now we have to calculate the exponent. The exponent is the number of division you had to do to get to 0 in the base of $b$. We had to do 7 divisions. That is in binary $111_{2}$. So the final number is $+11111 +111$. That is also the biggest number in the set of numbers in $\mathbb{M}(2,5,3)$. If you convert it back into base 10 you notice that the number you get back is 124. During the conversion we got a rounding error.

#### Arithmetic with Machine Numbers

Calculations also result in rounding errors. For example with $a = 23, b = 24$ in $\mathbb{M}(10,2,1)$:

The conversion has no error because $a = 23 = +23+2$ and $b = 24 = +24+2$ but if we calculate $a^2 - b^2$ we get different results from the real result than when we use the machine numbers.

Calculation with machine numbers:

$$a^2 = (+23+2)^2 = 529 = (+53+3)$$
$$b^2 = (+24+2)^2 = 576 = (+58+3)$$
$$(+53+3) - (+58+3) = -50 = (-5+2)$$

Note that you have to convert the number back into $\mathbb{M}(10,2,1)$ after every calculation.

Calculation with natural numbers:

$$a^2 = 23^2 = 529$$
$$b^2 = 24^2 = 576$$
$$a^2-b^2 = -47$$

#### Absolute/relative rounding error

The absolute rounding error in calculations with machine numbers is calculated like this: $|gl(x) - x|$ where $gl(x)$ is the machine number and $x$ is the natural number. The relative rounding error is calculated with $\tfrac{|gl(x) - x|}{|x|}$.

The rounding errors for the example above would be:

absolute: $|gl(x) - x| = | - 50 - (-47)| = |-3| = 3$

relative: $\tfrac{|gl(x) - x|}{|x|} = \tfrac{|-50 - (-47)|}{|-47|} = \tfrac{3}{47} \approx 0.0638$


## System of linear equations

### Matrix Norm and Condition Number

Matrix norm for $A = \begin{pmatrix}-1 & 1\\\ 2 & -4\end{pmatrix}$:

${ \||A\||_{1}=\max(|-1|+2;1+|-4|)=\max(3,5)=5}$ 

${ \||A\||_{\infty}=\max(|-1|+1; 2 + |-4|)=\max(2,6)=6}$

Condition number is defined as: ${ \kappa (A)=\||A\||\cdot\||A^{-1}\||}$. The condition number depends on the norm you choose.

$A^{-1} = \begin{pmatrix}-2 & -\tfrac{1}{2}\\\ -1 & -\tfrac{1}{2}\end{pmatrix}$

${ \||A^{-1}\||_{1}=\max(|-2|+|1|;|-\tfrac{1}{2}|+|-\tfrac{1}{2}|)=\max(3,1)=3}$ 

${ \||A^{-1}\||_{\infty}=\max(|-2|+|-\tfrac{1}{2}|; |-1| + |-\tfrac{1}{2}|)=\max(\tfrac{5}{2},\tfrac{3}{2})=\tfrac{5}{2}}$

So ${ \kappa_1 (A)=\||A\||_1\cdot\||A^{-1}\||_1} = 5 \cdot 3 = 15$,

and ${ \kappa_\infty (A)=\||A\||\cdot\||A^{-1}\||} = 6 \cdot \tfrac{5}{2} = 15$ 




## System of non-linear equations 