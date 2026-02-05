!(function () {
  var t = setInterval(function () {
    var e = document.getElementById("calc-baseline");
    e && (clearInterval(t), n());
  }, 500);
  function n() {
    var t = document.getElementById("calc-baseline"),
      e = document.getElementById("calc-target"),
      n = document.getElementById("calc-alpha"),
      a = document.getElementById("calc-power"),
      r = document.getElementById("calc-daily-users"),
      l = document.getElementById("calc-result-per"),
      c = document.getElementById("calc-result-total"),
      u = document.getElementById("calc-diff-abs"),
      o = document.getElementById("calc-diff-rel"),
      d = document.getElementById("calc-message"),
      m = document.getElementById("calc-estimated-days");
    function s(t) {
      return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function i(t) {
      if (t <= 0 || t >= 1) return 0;
      var e, n;
      return (
        t < 0.5
          ? ((e = Math.sqrt(-2 * Math.log(t))),
            (n = -(
              e -
              ((0.010328 * e + 0.802853) * e + 2.515517) /
                (((0.001308 * e + 0.189269) * e + 1.432788) * e + 1)
            )))
          : ((e = Math.sqrt(-2 * Math.log(1 - t))),
            (n =
              e -
              ((0.010328 * e + 0.802853) * e + 2.515517) /
                (((0.001308 * e + 0.189269) * e + 1.432788) * e + 1))),
        Math.abs(n)
      );
    }
    function g() {
      var g = parseFloat(t.value),
        f = parseFloat(e.value),
        v = parseFloat(n.value),
        y = parseFloat(a.value),
        p = parseFloat(r.value) || 0;
      if (!isNaN(g) && !isNaN(f) && !(g <= 0) && !(f <= 0)) {
        var h = f - g,
          E = (f / g) * 100;
        ((u.textContent = (h > 0 ? "+" : "") + h.toFixed(2) + "%"),
          (u.style.color = h > 0 ? "#16a34a" : h < 0 ? "#dc2626" : "#64748b"),
          (o.textContent = E.toFixed(1) + "%"));
        if (Math.abs(h) < 1e-4)
          return (
            (l.textContent = "∞"),
            (c.textContent = "∞"),
            void (d.textContent = "差が設定されていません。")
          );
        var x = g / 100,
          b = f / 100,
          M = (v || 5) / 100,
          B = (y || 80) / 100,
          L = i(1 - M / 2),
          w = i(B),
          T = x * (1 - x) + b * (1 - b),
          C = Math.pow(x - b, 2),
          S = Math.ceil((Math.pow(L + w, 2) * T) / C),
          k = 2 * S;
        if (((l.textContent = s(S)), (c.textContent = s(k)), k > 1e6))
          d.textContent =
            "&#x26a0;&#xfe0f; 必要数が多すぎます。改善幅をもっと大きく狙うか、マイクロコンバージョンを指標にしてください。";
        else if (k > 1e5)
          d.textContent =
            "&#x2757;&#xfe0f; かなり多くのサンプルが必要です。テスト期間が長期化する可能性があります。";
        else
          d.textContent =
            "各パターンに" +
            s(S) +
            "人ずつ、合計" +
            s(k) +
            "人のユーザーが必要です。";
        if (p > 0) {
          var I = Math.ceil(k / p);
          ((m.textContent = s(I)),
            (m.className = I > 30 ? "days-val warning" : "days-val"));
        }
      }
    }
    ([t, e, n, a, r].forEach(function (t) {
      t && t.addEventListener("input", g);
    }),
      g());
  }
})();
