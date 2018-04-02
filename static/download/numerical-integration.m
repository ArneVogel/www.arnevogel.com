clear

function y = f(x)
  y = 1/(sqrt(2*pi))* e ^ -((1/2)*x^2);
end


function t = trapezoid_rule(a,b,n)
  t = 0;
  x = linspace(a,b,n);
  h = x(2)-x(1);
  for i = 1:length(x)-1
    t = t + (h/2 * (f(x(i)) + f(x(i+1))));
  end
end

function s = simpson_rule(a,b,n)
  s = 0;
  x = linspace(a,b,n);
  h = x(2)-x(1);
  for i = 1:length(x)-1
    s = s + (f(x(i)) + 4* f((x(i)+x(i+1))/2) + f(x(i+1)));
  end
  s = s * h/6;
end


function r = rule38(a,b,n)
  r = 0;
  x = linspace(a,b,n);
  h = x(2)-x(1);
  for i = 1:length(x)-1
    r = r + ( f(x(i)) + 3* f(((x(i) + x(i+1))*(4/3)/3)) + 3* f(((x(i) + x(i+1))*(5/3))/3) + f(x(i+1)));
  end
  r = r * h/8;
end


a = -100;
b = 100;

for i = 20:120
  simpson(i) = simpson_rule(a,b,i);
  trapez(i) = trapezoid_rule(a,b,i);
  rule(i) = rule38(a,b,i);
end

x = 20:1:120;
plot(x,trapz(20:120));
plot(x,simpson(20:120));
plot(x,rule(20:120));

trapezoid_rule(a,b,500)
simpson_rule(a,b,500)
rule38(a,b,500)