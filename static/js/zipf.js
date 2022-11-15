function zipf(i, total, alpha) {
    let sum = 0;
    for (let j = 1; j <= total; ++j) {
        sum += 1 / (j ** alpha);
    }
    return (1 / i ** alpha) / sum;
}

function init() {
    let N = document.getElementById("N").value;
    let alpha = document.getElementById("alpha").value;
    document.getElementById("N-label").innerText = N;
    document.getElementById("alpha-label").innerText = alpha;

    let probabilities = [];
    for (let i = 1; i <= N; ++i) {
        probabilities.push(zipf(i, N, alpha));
    }

    document.getElementById("text-output").innerText = "";
    for (let p of probabilities) {
        document.getElementById("text-output").innerText += (p*100).toFixed(2) + "%\n";
    }

    let xValues = [];
    let yValues = [];
    for (let i = 1; i <= N; ++i) {
        xValues.push(i);
        probabilities.push(zipf(i, N, alpha));
        let p = probabilities[i-1];
        yValues.push((p*100).toFixed(2));
    }


    new Chart("chart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          data: yValues
        }]
      },
      options: {
          animation: false,
      }
    });
}
