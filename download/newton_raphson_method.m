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