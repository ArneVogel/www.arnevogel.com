clear
x = sym('x',[1 1]);
f(x) = [-1/4*x(1)^4+5/2*x(1)^3-7*x(1)^2+8*x-1];
eps = 0.1;
x0 = 2;

newton_raphson_method(f,x,x0,eps)

x = sym('x',[1 3]);
f(x) = [x(1)^2;x(2)^2-x(3)^3;x(3)^2-5];
eps = 0.1;
x0 = [2;2;2];

newton_raphson_method(f,x,x0,eps)