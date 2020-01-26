function simplify(a,b) {
    for (var i = a; i > 1; i--) {
        if (a % i == 0 && b % i == 0) {
            return [a / i, b / i];
        }
    }
    return  [a, b];
}

function print_fraction(a,b) {
    result = document.getElementById("result");
    print(a);
    print("/");
    print(b)
}

function newline() {
    document.getElementById("result").innerHTML += "<br>";
}

function print(to_print) {
    document.getElementById("result").append(to_print);
}

function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

function lcm(a,b) {
    return a*b/gcd(a,b);
}

function fibonacci() {
    a = document.getElementById("a").value;
    b = document.getElementById("b").value;
    unit_fractions = [];

    if (a == "" || b == "" || Number(a) > Number(b) ) {
        return;
    }

    result = document.getElementById("result");
    result.innerHTML = "";
    print_fraction(a,b);

    old_a = a;
    x = simplify(a,b);
    a = x[0];
    b = x[1];
    if (a != old_a) {
        print(" = ");
        print_fraction(a,b);
    }
    newline();
    var ceil = 0;
    var lcm_value = 0;
    while(a != 1) {
        print("ceil(");
        print_fraction(b,a);
        print(") = ");
        ceil = Math.ceil(b/a);
        unit_fractions.push(ceil);
        print(ceil);
        print(" => ");
        print_fraction(1,ceil);
        newline();

        print_fraction(a,b);
        print(" - ");
        print_fraction(1,ceil);
        
        print(" = ");

        lcm_value = lcm(b,ceil);

        print_fraction(lcm_value/b*a, lcm_value);
        print(" - ");
        print_fraction(lcm_value/ceil, lcm_value);

        a = lcm_value/b*a - lcm_value/ceil;
        b = lcm_value;

        print(" = ")
        print_fraction(a,b);
        old_a = a;
        x = simplify(a,b);
        a = x[0];
        b = x[1];
        if (a != old_a) {
            print(" = ");
            print_fraction(a,b);
        }

        newline();
    }

    newline();
    old_a = document.getElementById("a").value;
    old_b = document.getElementById("b").value;
    
    print_fraction(old_a,old_b);
    print(" = ");
    for (var x in unit_fractions) {
        print_fraction(1,unit_fractions[x]);
        print(" + ");
    }
    print_fraction(1,b);
}
