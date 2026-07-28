(() => {
  "use strict";
  var e = 1e6,
    t = "[big.js] ",
    n = t + "Invalid ",
    i = n + "decimal places",
    a = n + "rounding mode",
    r = t + "Division by zero",
    s = {},
    o = void 0,
    l = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  function c(e, t, n, i) {
    var r = e.c;
    if (
      (n === o && (n = e.constructor.RM),
      0 !== n && 1 !== n && 2 !== n && 3 !== n)
    )
      throw Error(a);
    if (t < 1)
      (i =
        (3 === n && (i || !!r[0])) ||
        (0 === t &&
          ((1 === n && r[0] >= 5) ||
            (2 === n && (r[0] > 5 || (5 === r[0] && (i || r[1] !== o))))))),
        (r.length = 1),
        i ? ((e.e = e.e - t + 1), (r[0] = 1)) : (r[0] = e.e = 0);
    else if (t < r.length) {
      if (
        ((i =
          (1 === n && r[t] >= 5) ||
          (2 === n &&
            (r[t] > 5 ||
              (5 === r[t] && (i || r[t + 1] !== o || 1 & r[t - 1])))) ||
          (3 === n && (i || !!r[0]))),
        (r.length = t),
        i)
      )
        for (; ++r[--t] > 9; )
          if (((r[t] = 0), 0 === t)) {
            ++e.e, r.unshift(1);
            break;
          }
      for (t = r.length; !r[--t]; ) r.pop();
    }
    return e;
  }
  function d(e, t, n) {
    var i = e.e,
      a = e.c.join(""),
      r = a.length;
    if (t)
      a =
        a.charAt(0) +
        (r > 1 ? "." + a.slice(1) : "") +
        (i < 0 ? "e" : "e+") +
        i;
    else if (i < 0) {
      for (; ++i; ) a = "0" + a;
      a = "0." + a;
    } else if (i > 0)
      if (++i > r) for (i -= r; i--; ) a += "0";
      else i < r && (a = a.slice(0, i) + "." + a.slice(i));
    else r > 1 && (a = a.charAt(0) + "." + a.slice(1));
    return e.s < 0 && n ? "-" + a : a;
  }
  (s.abs = function () {
    var e = new this.constructor(this);
    return (e.s = 1), e;
  }),
    (s.cmp = function (e) {
      var t,
        n = this,
        i = n.c,
        a = (e = new n.constructor(e)).c,
        r = n.s,
        s = e.s,
        o = n.e,
        l = e.e;
      if (!i[0] || !a[0]) return i[0] ? r : a[0] ? -s : 0;
      if (r != s) return r;
      if (((t = r < 0), o != l)) return (o > l) ^ t ? 1 : -1;
      for (s = (o = i.length) < (l = a.length) ? o : l, r = -1; ++r < s; )
        if (i[r] != a[r]) return (i[r] > a[r]) ^ t ? 1 : -1;
      return o == l ? 0 : (o > l) ^ t ? 1 : -1;
    }),
    (s.div = function (t) {
      var n = this,
        a = n.constructor,
        s = n.c,
        l = (t = new a(t)).c,
        d = n.s == t.s ? 1 : -1,
        h = a.DP;
      if (h !== ~~h || h < 0 || h > e) throw Error(i);
      if (!l[0]) throw Error(r);
      if (!s[0]) return (t.s = d), (t.c = [(t.e = 0)]), t;
      var u,
        p,
        m,
        w,
        f,
        v = l.slice(),
        b = (u = l.length),
        g = s.length,
        k = s.slice(0, u),
        _ = k.length,
        x = t,
        y = (x.c = []),
        E = 0,
        S = h + (x.e = n.e - t.e) + 1;
      for (x.s = d, d = S < 0 ? 0 : S, v.unshift(0); _++ < u; ) k.push(0);
      do {
        for (m = 0; m < 10; m++) {
          if (u != (_ = k.length)) w = u > _ ? 1 : -1;
          else
            for (f = -1, w = 0; ++f < u; )
              if (l[f] != k[f]) {
                w = l[f] > k[f] ? 1 : -1;
                break;
              }
          if (!(w < 0)) break;
          for (p = _ == u ? l : v; _; ) {
            if (k[--_] < p[_]) {
              for (f = _; f && !k[--f]; ) k[f] = 9;
              --k[f], (k[_] += 10);
            }
            k[_] -= p[_];
          }
          for (; !k[0]; ) k.shift();
        }
        (y[E++] = w ? m : ++m), k[0] && w ? (k[_] = s[b] || 0) : (k = [s[b]]);
      } while ((b++ < g || k[0] !== o) && d--);
      return (
        y[0] || 1 == E || (y.shift(), x.e--, S--),
        E > S && c(x, S, a.RM, k[0] !== o),
        x
      );
    }),
    (s.eq = function (e) {
      return 0 === this.cmp(e);
    }),
    (s.gt = function (e) {
      return this.cmp(e) > 0;
    }),
    (s.gte = function (e) {
      return this.cmp(e) > -1;
    }),
    (s.lt = function (e) {
      return this.cmp(e) < 0;
    }),
    (s.lte = function (e) {
      return this.cmp(e) < 1;
    }),
    (s.minus = s.sub =
      function (e) {
        var t,
          n,
          i,
          a,
          r = this,
          s = r.constructor,
          o = r.s,
          l = (e = new s(e)).s;
        if (o != l) return (e.s = -l), r.plus(e);
        var c = r.c.slice(),
          d = r.e,
          h = e.c,
          u = e.e;
        if (!c[0] || !h[0])
          return h[0] ? (e.s = -l) : c[0] ? (e = new s(r)) : (e.s = 1), e;
        if ((o = d - u)) {
          for (
            (a = o < 0) ? ((o = -o), (i = c)) : ((u = d), (i = h)),
              i.reverse(),
              l = o;
            l--;

          )
            i.push(0);
          i.reverse();
        } else
          for (
            n = ((a = c.length < h.length) ? c : h).length, o = l = 0;
            l < n;
            l++
          )
            if (c[l] != h[l]) {
              a = c[l] < h[l];
              break;
            }
        if (
          (a && ((i = c), (c = h), (h = i), (e.s = -e.s)),
          (l = (n = h.length) - (t = c.length)) > 0)
        )
          for (; l--; ) c[t++] = 0;
        for (l = t; n > o; ) {
          if (c[--n] < h[n]) {
            for (t = n; t && !c[--t]; ) c[t] = 9;
            --c[t], (c[n] += 10);
          }
          c[n] -= h[n];
        }
        for (; 0 === c[--l]; ) c.pop();
        for (; 0 === c[0]; ) c.shift(), --u;
        return c[0] || ((e.s = 1), (c = [(u = 0)])), (e.c = c), (e.e = u), e;
      }),
    (s.mod = function (e) {
      var t,
        n = this,
        i = n.constructor,
        a = n.s,
        s = (e = new i(e)).s;
      if (!e.c[0]) throw Error(r);
      return (
        (n.s = e.s = 1),
        (t = 1 == e.cmp(n)),
        (n.s = a),
        (e.s = s),
        t
          ? new i(n)
          : ((a = i.DP),
            (s = i.RM),
            (i.DP = i.RM = 0),
            (n = n.div(e)),
            (i.DP = a),
            (i.RM = s),
            this.minus(n.times(e)))
      );
    }),
    (s.neg = function () {
      var e = new this.constructor(this);
      return (e.s = -e.s), e;
    }),
    (s.plus = s.add =
      function (e) {
        var t,
          n,
          i,
          a = this,
          r = a.constructor;
        if (((e = new r(e)), a.s != e.s)) return (e.s = -e.s), a.minus(e);
        var s = a.e,
          o = a.c,
          l = e.e,
          c = e.c;
        if (!o[0] || !c[0])
          return c[0] || (o[0] ? (e = new r(a)) : (e.s = a.s)), e;
        if (((o = o.slice()), (t = s - l))) {
          for (
            t > 0 ? ((l = s), (i = c)) : ((t = -t), (i = o)), i.reverse();
            t--;

          )
            i.push(0);
          i.reverse();
        }
        for (
          o.length - c.length < 0 && ((i = c), (c = o), (o = i)),
            t = c.length,
            n = 0;
          t;
          o[t] %= 10
        )
          n = ((o[--t] = o[t] + c[t] + n) / 10) | 0;
        for (n && (o.unshift(n), ++l), t = o.length; 0 === o[--t]; ) o.pop();
        return (e.c = o), (e.e = l), e;
      }),
    (s.pow = function (e) {
      var t = this,
        i = new t.constructor("1"),
        a = i,
        r = e < 0;
      if (e !== ~~e || e < -1e6 || e > 1e6) throw Error(n + "exponent");
      for (r && (e = -e); 1 & e && (a = a.times(t)), (e >>= 1); )
        t = t.times(t);
      return r ? i.div(a) : a;
    }),
    (s.prec = function (t, i) {
      if (t !== ~~t || t < 1 || t > e) throw Error(n + "precision");
      return c(new this.constructor(this), t, i);
    }),
    (s.round = function (t, n) {
      if (t === o) t = 0;
      else if (t !== ~~t || t < -e || t > e) throw Error(i);
      return c(new this.constructor(this), t + this.e + 1, n);
    }),
    (s.sqrt = function () {
      var e,
        n,
        i,
        a = this,
        r = a.constructor,
        s = a.s,
        o = a.e,
        l = new r("0.5");
      if (!a.c[0]) return new r(a);
      if (s < 0) throw Error(t + "No square root");
      0 === (s = Math.sqrt(a + "")) || s === 1 / 0
        ? (((n = a.c.join("")).length + o) & 1 || (n += "0"),
          (o = (((o + 1) / 2) | 0) - (o < 0 || 1 & o)),
          (e = new r(
            ((s = Math.sqrt(n)) == 1 / 0
              ? "5e"
              : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + o
          )))
        : (e = new r(s + "")),
        (o = e.e + (r.DP += 4));
      do {
        (i = e), (e = l.times(i.plus(a.div(i))));
      } while (i.c.slice(0, o).join("") !== e.c.slice(0, o).join(""));
      return c(e, (r.DP -= 4) + e.e + 1, r.RM);
    }),
    (s.times = s.mul =
      function (e) {
        var t,
          n = this,
          i = n.constructor,
          a = n.c,
          r = (e = new i(e)).c,
          s = a.length,
          o = r.length,
          l = n.e,
          c = e.e;
        if (((e.s = n.s == e.s ? 1 : -1), !a[0] || !r[0]))
          return (e.c = [(e.e = 0)]), e;
        for (
          e.e = l + c,
            s < o && ((t = a), (a = r), (r = t), (c = s), (s = o), (o = c)),
            t = new Array((c = s + o));
          c--;

        )
          t[c] = 0;
        for (l = o; l--; ) {
          for (o = 0, c = s + l; c > l; )
            (o = t[c] + r[l] * a[c - l - 1] + o),
              (t[c--] = o % 10),
              (o = (o / 10) | 0);
          t[c] = o;
        }
        for (o ? ++e.e : t.shift(), l = t.length; !t[--l]; ) t.pop();
        return (e.c = t), e;
      }),
    (s.toExponential = function (t, n) {
      var a = this,
        r = a.c[0];
      if (t !== o) {
        if (t !== ~~t || t < 0 || t > e) throw Error(i);
        for (a = c(new a.constructor(a), ++t, n); a.c.length < t; ) a.c.push(0);
      }
      return d(a, !0, !!r);
    }),
    (s.toFixed = function (t, n) {
      var a = this,
        r = a.c[0];
      if (t !== o) {
        if (t !== ~~t || t < 0 || t > e) throw Error(i);
        for (
          t = t + (a = c(new a.constructor(a), t + a.e + 1, n)).e + 1;
          a.c.length < t;

        )
          a.c.push(0);
      }
      return d(a, !1, !!r);
    }),
    (s[Symbol.for("nodejs.util.inspect.custom")] =
      s.toJSON =
      s.toString =
        function () {
          var e = this,
            t = e.constructor;
          return d(e, e.e <= t.NE || e.e >= t.PE, !!e.c[0]);
        }),
    (s.toNumber = function () {
      var e = Number(d(this, !0, !0));
      if (!0 === this.constructor.strict && !this.eq(e.toString()))
        throw Error(t + "Imprecise conversion");
      return e;
    }),
    (s.toPrecision = function (t, i) {
      var a = this,
        r = a.constructor,
        s = a.c[0];
      if (t !== o) {
        if (t !== ~~t || t < 1 || t > e) throw Error(n + "precision");
        for (a = c(new r(a), t, i); a.c.length < t; ) a.c.push(0);
      }
      return d(a, t <= a.e || a.e <= r.NE || a.e >= r.PE, !!s);
    }),
    (s.valueOf = function () {
      var e = this,
        n = e.constructor;
      if (!0 === n.strict) throw Error(t + "valueOf disallowed");
      return d(e, e.e <= n.NE || e.e >= n.PE, !0);
    });
  const h = (function e() {
    function t(i) {
      var a = this;
      if (!(a instanceof t)) return i === o ? e() : new t(i);
      if (i instanceof t) (a.s = i.s), (a.e = i.e), (a.c = i.c.slice());
      else {
        if ("string" != typeof i) {
          if (!0 === t.strict && "bigint" != typeof i)
            throw TypeError(n + "value");
          i = 0 === i && 1 / i < 0 ? "-0" : String(i);
        }
        !(function (e, t) {
          var i, a, r;
          if (!l.test(t)) throw Error(n + "number");
          for (
            e.s = "-" == t.charAt(0) ? ((t = t.slice(1)), -1) : 1,
              (i = t.indexOf(".")) > -1 && (t = t.replace(".", "")),
              (a = t.search(/e/i)) > 0
                ? (i < 0 && (i = a),
                  (i += +t.slice(a + 1)),
                  (t = t.substring(0, a)))
                : i < 0 && (i = t.length),
              r = t.length,
              a = 0;
            a < r && "0" == t.charAt(a);

          )
            ++a;
          if (a == r) e.c = [(e.e = 0)];
          else {
            for (; r > 0 && "0" == t.charAt(--r); );
            for (e.e = i - a - 1, e.c = [], i = 0; a <= r; )
              e.c[i++] = +t.charAt(a++);
          }
        })(a, i);
      }
      a.constructor = t;
    }
    return (
      (t.prototype = s),
      (t.DP = 20),
      (t.RM = 1),
      (t.NE = -7),
      (t.PE = 21),
      (t.strict = !1),
      (t.roundDown = 0),
      (t.roundHalfUp = 1),
      (t.roundHalfEven = 2),
      (t.roundUp = 3),
      t
    );
  })();
  function u(e, t = !1) {
    let n = h(e)
        .toNumber()
        .toLocaleString("en-US", { useGrouping: !0 })
        .split(","),
      i = "";
    switch (n.length) {
      case 1:
        i = "";
        break;
      case 2:
        i = t ? " thousand" : "k";
        break;
      case 3:
        i = t ? " million" : "m";
        break;
      case 4:
        i = t ? " billion" : "b";
        break;
      case 5:
        i = t ? " trillion" : "t";
        break;
      case 6:
        i = t ? " quadrillion" : "qd";
        break;
      case 7:
        i = t ? " quintillion" : "qt";
        break;
      case 8:
        i = t ? " sextillion" : "sx";
        break;
      case 9:
        i = t ? " septillion" : "sp";
    }
    let a = 0;
    const r = n.shift();
    r && (a = parseInt(r));
    let s = 0,
      o = n.shift();
    o && parseInt(o);
    return o
      ? a + "." + o + i
      : (1 * parseFloat(parseFloat(e).toFixed(3))).toString();
  }
  const p = function (e) {
    const t = m(h(e).toString());
    let n = "";
    var i = t.split(".");
    (i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
      "" == i[0] && (i[0] = "0");
    let a = i[1];
    return (
      a && 1 == a.length && (a += "0"),
      (a && "undefined" != a) || (a = "00"),
      (a = a.substring(0, 2)),
      (n = i.join(".")),
      {
        amount: e,
        amount_str: t,
        amount_human: u(e, !0),
        amount_human_short: u(e),
        amount_commas: n,
        amount_commas_two: i[0] + "." + a,
        amount_fmt: f(e),
      }
    );
  };
  function m(e) {
    if (!(e + "".toLowerCase()).includes("e")) return e;
    var t = "";
    "-" == (e += "").charAt(0) && ((e = e.substring(1)), (t = "-"));
    var n = e.split(/[eE]/g);
    if (n.length < 2) return t + e;
    var i = n[1];
    if (0 == i || -0 == i) return t + n[0];
    var a = (1.1).toLocaleString().substring(1, 2),
      r = (n = n[0].split(a))[1] || "",
      s = n[0];
    if (i > 0)
      i > r.length && (r += "0".repeat(i - r.length)),
        (r = r.slice(0, i) + a + r.slice(i)).charAt(r.length - 1) == a &&
          (r = r.slice(0, -1));
    else {
      var o = Math.abs(i) - s.length;
      o > 0 && (s = "0".repeat(o) + s),
        (s = s.slice(0, i) + a + s.slice(i)).charAt(0) == a && (s = "0" + s);
    }
    return t + s + r;
  }
  const w = m;
  function f(e, t = 4, n = null) {
    const i = h(e);
    if (i.e < -8) {
      let n = 0,
        a = '0.0<span class="zeroes">(' + Math.abs(i.e + 1) + ")</span>…",
        r = "";
      for (let i of h(e).c)
        if (((r += i), n++, t + 1 === n)) {
          let e = parseFloat("0." + r)
            .toFixed(t)
            .split(".")[1];
          (e = parseFloat("0." + e)
            .toString()
            .split(".")[1]),
            (r = e);
          break;
        }
      return a + r;
    }
    if (i.e < 0) {
      let e = Math.abs(i.e) + t - 1;
      return i.toNumber().toFixed(e);
    }
    {
      if (i.e < 21) {
        let e = i
            .toNumber()
            .toFixed(t + 1)
            .split("."),
          n = parseFloat(e[0]),
          a = parseFloat("0." + e[1])
            .toString()
            .split(".")[1],
          r = parseFloat(n + "." + a).toFixed(t),
          s = r.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return r.split(".")[1] && (s += "." + r.split(".")[1]), s;
      }
      let n,
        a = e,
        r = !1;
      if (a.split(".")[1]) {
        n = a.split(".")[1];
        let e = parseFloat("0." + n);
        parseFloat(e.toFixed(t)) >= 1 && (r = !0),
          t > 0 && (n = e.toFixed(t).split(".")[1]);
      }
      let s = a.split(".")[0];
      r && (s = m(h(s).plus(1).toString())),
        (s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      let o = s;
      return n && t > 0 && (o += "." + n), o;
    }
  }
  const v = function (e) {
      return e.slice(0, 5) + ".." + e.slice(-4);
    },
    b = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  class g {
    constructor() {
      return g.instance
        ? g.instance
        : ((this.interval_ms = 12e4),
          this.interval,
          this.config,
          (this.cache = { token: null }),
          (g.instance = this),
          this);
    }
    async init(e) {
      if (e.address)
        if (e.api) {
          if (
            ((this.config = e),
            await this.getToken(this.config.address),
            this.cache.token)
          )
            return (
              (this.interval = setInterval(async () => {
                await this.getToken(this.config.address);
              }, this.interval_ms)),
              this.cache.token
            );
        } else console.log("NO API");
      else console.log("NO ADDRESS");
    }
    emitToken(e) {
      window.dispatchEvent(new CustomEvent("token", { detail: e }));
    }
    emitTokenPrice(e) {
      window.dispatchEvent(new CustomEvent("token-price", { detail: e }));
    }
    emitTokenSwaps(e) {
      window.dispatchEvent(new CustomEvent("token-swaps", { detail: e }));
    }
    emitPriceEth(e) {
      window.dispatchEvent(new CustomEvent("eth-price", { detail: e }));
    }
    async getToken(e) {
      try {
        const t = await fetch(`${this.config.api}/graph?addr=${e}`),
          n = await t.json();
        return n.errors
          ? void console.log("error", error)
          : ((this.cache.token = n),
            (this.cache.token.price_human = p(this.cache.token.price_usd)),
            (this.cache.token.eth_usd_human = p(this.cache.token.eth_usd)),
            this.emitToken({ token: this.cache.token }),
            this.emitPriceEth({
              eth_usd: this.cache.token.eth_usd,
              eth_usd_human: this.cache.token.eth_usd_human,
            }),
            this.emitTokenPrice({
              price_usd: this.cache.token.price_usd,
              price_usd_zeroes: this.cache.token.price_usd_zeroes,
              price_usd_fmt: this.cache.token.price_human.amount_fmt,
              price_eth: this.cache.token.derivedETH,
              eth_usd: this.cache.token.eth_usd,
            }),
            this.emitTokenSwaps({ swaps: this.cache.token.swaps }),
            n);
      } catch (e) {
        return void console.log("error", e);
      }
    }
  }
  const k = (() => {
      let e;
      return { getInstance: () => (e || (e = new g()), e) };
    })(),
    _ = document.createElement("template");
  _.innerHTML =
    '\n<style>\n    #balance-checker {\n        display: block;\n        margin-top: 5px;\n       /* width: fit-content; */\n        min-width:200px;\n        max-width:450px;\n        padding: 8px;\n        border-radius: 5px;\n        border: 1px solid #777;\n        background: black;\n    }\n</style>\n<div id="balance-checker">\n    BALANCE CHECKER\n</div>';
  const x = document.createElement("template");
  x.innerHTML =
    '\n<style>\n    #balance-wallet {\n        color:white;\n    }\n    #balance-wallet-cont {\n        display:flex;\n        gap:10px;\n        align-items: center;\n    }\n    #balance-wallet-address {\n        font-family: \'Courier New\', Courier, monospace;\n        font-size:0.7rem;\n        flex:auto;\n    }\n    #balance-wallet-address a {\n        color: yellow;\n        cursor:pointer;\n        text-decoration: none;\n    }\n    #balance-wallet-address a:hover {\n        color: lime;\n    }\n    #btn-wallet-clear {\n        padding:4px;\n        color:#444;\n        cursor:pointer;\n        align-self: baseline;\n    }\n    #btn-wallet-clear svg {\n        fill: #777;\n    }\n    #btn-wallet-clear svg:hover {\n        fill: lightcoral;\n    }\n    #balance-wallet-amount-cont {\n        flex: auto;\n    }\n    #balance-wallet-amount {\n        font-size: 1.4rem;\n        letter-spacing:-2px;\n        font-family: \'Courier New\', Courier, monospace;\n        font-weight: bold;\n    }\n    #balance-wallet-amount-human {\n        font-size: 0.8rem;\n        color: orange;\n        font-family: \'Courier New\', Courier, monospace;\n        font-weight: bold;\n    }\n    #balance-wallet-value {\n        font-family: \'Courier New\', Courier, monospace;\n        text-align: right;\n        font-size:1.5rem;\n        font-weight: bold;\n    }\n    #balance-wallet-value-head {\n        text-align: right;\n        text-transform: uppercase;\n        font-size:0.7rem;\n        font-family: \'Courier New\', Courier, monospace;\n        font-weight: bold;\n        color: #888;\n    }\n</style>\n<div id="balance-wallet">\n    <div id="balance-wallet-address"></div>\n    <div id="balance-wallet-cont">\n        <div id="balance-wallet-amount-cont">\n            <div id="balance-wallet-amount"></div>\n            <div id="balance-wallet-amount-human"></div>\n            <div id="balance-wallet-value-head"></div>\n            <div id="balance-wallet-value"></div>\n            \n        </div>\n        <div id="btn-wallet-clear" title="Remove stored wallet address">\n            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>\n        </div>\n    </div>\n\n</div>';
  const y = document.createElement("template");
  y.innerHTML =
    '\n<style>\n    #balance-checker-input-cont {\n\n    }\n    #balance-checker-input-inner {\n        display:flex;\n        gap:10px;\n        align-items: center;\n        width: 100%;\n    }\n    #wallet-input {\n        font-family: \'Courier New\', Courier, monospace;\n        flex:auto;\n        color:white;\n        background: #333;\n        font-size:1rem;\n        border:1px solid #555;\n        outline:0;\n        padding:6px;\n        border-radius:4px;\n    }\n    #wallet-input:focus {\n        border-color: yellow;\n    }\n    #btn-wallet-input {\n        cursor:pointer;\n        border:1px solid #888;\n        border-radius: 4px;\n        background:cornflowerblue ;\n        color: white;\n        padding:4px 8px 4px 8px;\n    }\n    #btn-wallet-input:hover {\n        background: orange;\n    }\n    #btn-wallet-input:active{\n        background:green;\n    }\n    #balance-checker-input-msg {\n        color: lightcoral;\n        padding: 4px;\n        font-size:0.8rem;\n\n    }\n</style>\n<div id="balance-checker-input-cont">\n    <div id="balance-checker-input-inner">\n        <input type="text" id="wallet-input" placeholder="enter wallet address">\n        <button id="btn-wallet-input">OK</button>\n    </div>\n    <div id="balance-checker-input-msg"></div>\n</div>\n';
  class E extends HTMLElement {
    constructor() {
      super(),
        this.ready,
        this.template_balance,
        this.template_balance_input,
        this.template_balance_wallet,
        this.cont,
        this.wallet,
        this.wallet_input,
        this.wallet_input_msg,
        this.balance_wallet_value,
        (this.tokenService = k.getInstance()),
        (this.tokenReady = this.tokenReady.bind(this)),
        (this.tokenPriceUpdate = this.tokenPriceUpdate.bind(this)),
        window.addEventListener("token", this.tokenReady),
        window.addEventListener("token-price", this.tokenPriceUpdate),
        localStorage.getItem(
          "tkp-0x5de758bba013e58dae2693aea3f0b12b31a3023d"
        ) &&
          ((this.wallet = JSON.parse(
            localStorage.getItem(
              "tkp-0x5de758bba013e58dae2693aea3f0b12b31a3023d"
            )
          )),
          console.log("wallet", this.wallet));
    }
    tokenReady(e) {
      this.tokenService.cache.token &&
        (window.removeEventListener("token", this.tokenReady),
        (this.ready = !0),
        console.log("ready"));
    }
    async connectedCallback() {
      (this.template_balance = _.content.cloneNode(!0)),
        this.append(this.template_balance),
        (this.cont = this.querySelector("#balance-checker")),
        this.wallet
          ? (console.log("UPDATE WALLET"),
            await this.getBalance(this.wallet.address, this.wallet.token.id),
            this.updateBalance())
          : ((this.template_balance_input = y.content.cloneNode(!0)),
            this.cont.replaceChildren(this.template_balance_input),
            this.setupInput());
    }
    setupInput() {
      (this.wallet_input = this.querySelector("#wallet-input")),
        (this.wallet_input_msg = this.querySelector(
          "#balance-checker-input-msg"
        )),
        (this.querySelector("#btn-wallet-input").onclick = () => {
          if (
            this.tokenService?.cache?.token &&
            "" !== this.wallet_input.value
          ) {
            if (!this.isValidAddress(this.wallet_input.value.toLowerCase()))
              return (
                console.log("invalid wallet address"),
                void (this.wallet_input_msg.innerHTML =
                  "invalid wallet address")
              );
            (this.wallet_input_msg.innerHTML = ""),
              this.checkBalance(
                this.wallet_input.value,
                this.tokenService.cache.token.id
              );
          }
        });
    }
    isValidAddress(e) {
      return new RegExp(/^0x[a-f0-9]{40}$/).test(e);
    }
    disconnectedCallback() {}
    tokenPriceUpdate(e) {
      console.log("token-price update", e.detail),
        this.balance_wallet_value && this.updateBalanceValue();
    }
    updateBalance() {
      this.wallet &&
        (console.log("updateBalance", this.wallet.balance.amount),
        (this.template_balance_wallet = x.content.cloneNode(!0)),
        (this.template_balance_wallet.querySelector(
          "#btn-wallet-clear"
        ).onclick = () => {
          console.log("clear wallet"),
            localStorage.removeItem(
              "tkp-0x5de758bba013e58dae2693aea3f0b12b31a3023d"
            ),
            (this.template_balance_input = y.content.cloneNode(!0)),
            (this.balance_wallet_value = null),
            (this.wallet = null),
            this.cont.replaceChildren(this.template_balance_input),
            this.setupInput();
        }),
        (this.template_balance_wallet.querySelector(
          "#balance-wallet-amount"
        ).innerHTML = this.wallet.balance.amount_commas_two),
        (this.template_balance_wallet.querySelector(
          "#balance-wallet-amount-human"
        ).innerHTML =
          this.wallet.balance.amount_human + " " + this.wallet.token.symbol),
        (this.template_balance_wallet.querySelector(
          "#balance-wallet-address"
        ).innerHTML = `<a href="https://etherscan.io/token/${
          this.wallet.token.id
        }?a=${
          this.wallet.address
        }" target="_blank" title="View token holding on etherscan">${v(
          this.wallet.address
        )}</a>`),
        this.cont.replaceChildren(this.template_balance_wallet),
        this.updateBalanceValue());
    }
    updateBalanceValue() {
      if (this.tokenService.cache.token) {
        const e = p(
          w(
            h(this.wallet.balance.amount)
              .times(this.tokenService.cache.token.price_usd)
              .toString()
          )
        );
        (this.balance_wallet_value = this.querySelector(
          "#balance-wallet-value"
        )),
          (this.balance_wallet_value.innerHTML = `$${e.amount_commas_two}`),
          (this.querySelector("#balance-wallet-value-head").innerHTML =
            "usd value at current price"),
          console.log("wallet balance value updated");
      }
    }
    async getBalance(e, t) {
      const n = await fetch(
          `https://vip-api.realshibadoge.com/balance?contract_address=${t}&wallet_address=${e}&block=latest`
        ),
        i = await n.json();
      if (i) return console.log("fresh balance"), i;
    }
    async checkBalance(e, t) {
      const n = await this.getBalance(e, t);
      n && "0" !== n.balance
        ? ((this.wallet = { balance: p(n.balance), address: e }),
          this.tokenService.cache.token &&
            (this.wallet.token = this.tokenService.cache.token),
          localStorage.setItem(
            "tkp-0x5de758bba013e58dae2693aea3f0b12b31a3023d",
            JSON.stringify(this.wallet)
          ),
          this.updateBalance())
        : (this.wallet_input_msg.innerHTML = `This wallet holds no ${this.tokenService.cache.token.name}`);
    }
  }
  customElements.define("balance-checker", E);
  const S = document.createElement("template");
  S.innerHTML = '\n<div id="token-price" class="price component"></div>';
  class M extends HTMLElement {
    constructor() {
      super(),
        this.template_price,
        this.token_price,
        (this.render = this.render.bind(this));
    }
    async connectedCallback() {
      (this.template_price = S.content.cloneNode(!0)),
        this.append(this.template_price),
        window.addEventListener("token-price", this.render);
    }
    render(e) {
      this.querySelector("#token-price").innerHTML =
        "$" + e.detail.price_usd_fmt;
    }
    disconnectedCallback() {
      window.removeEventListener("token-price", this.render);
    }
  }
  customElements.define("token-price", M);
  const L = document.createElement("template");
  L.innerHTML =
    '\n<div class="cell date">date</div>\n<div class="cell maker">maker</div>\n<div class="cell weth">eth</div>\n<div class="cell tokens">tokens</div>\n<div class="cell usd">usd</div>\n<div class="cell tx">tx</div>';
  const T = document.createElement("template");
  T.innerHTML =
    '\n<style>\n    #token-swaps {\n        font-family: "Share Tech Mono", monospace;\n        font-size:0.9rem;\n        display: grid;\n        grid-template-columns: 0.6fr 1fr 1fr 1fr 1fr 0.2fr;\n        align-items: center;\n        gap: 2px;\n    }\n    .cell {\n        padding: 2px 2px 2px 4px;\n    }\n    .maker, .maker a {\n        color: lightblue;\n        text-decoration:none;\n    }\n    .maker a:hover {\n        color:yellow;\n    }\n    .tx, .tx a {\n        color: cyan;\n        text-decoration:none;\n    }\n    .tx a:hover {\n        color:yellow;\n    }\n    .date span {\n        color: #999;\n    }\n    .weth.buy {\n        color:lightseagreen;\n    }\n    .weth.sell {\n        color:crimson;\n    }\n    .head {\n        background:black;\n        padding: 2px 4px 2px 4px;\n        color: yellow;\n        text-transform: uppercase;\n    }\n</style>\n<div id="token-swaps" class="swaps">\n    <div id="swap-date" class="head">date</div>\n    <div id="swap-maker" class="head">maker</div>\n    <div id="swap-weth" class="head">eth</div>\n    <div id="swap-tokens" class="head">tokens</div>\n    <div id="swap-usd" class="head">usd</div>\n    <div id="swap-tx" class="head">tx</div>\n</div>';
  class H extends HTMLElement {
    constructor() {
      super(),
        this.template_swaps,
        this.swaps,
        (this.render = this.render.bind(this));
    }
    async connectedCallback() {
      window.addEventListener("token-swaps", this.render),
        (this.template_swaps = T.content.cloneNode(!0));
    }
    render(e) {
      (this.template_swaps = T.content.cloneNode(!0)),
        this.replaceChildren(this.template_swaps),
        (this.swaps = e.detail.swaps),
        this.swaps.forEach((e) => {
          const t = L.content.cloneNode(!0);
          (t.querySelector(".weth").innerHTML = p(e.weth).amount_human_short),
            t.querySelector(".weth").classList.add(e.buy ? "buy" : "sell"),
            (t.querySelector(".tokens").innerHTML = p(
              e.tokens
            ).amount_human_short),
            (t.querySelector(".usd").innerHTML = `$${
              p(e.usd).amount_commas_two
            }`),
            (t.querySelector(".date").innerHTML = (function (e) {
              const t = new Date(e);
              return `${
                b[t.getMonth()]
              }-${t.getDate()}<br><span class="time">${t
                .getHours()
                .toString()
                .padStart(2, "0")}:${t
                .getMinutes()
                .toString()
                .padStart(2, "0")}</span>`;
            })(e.date)),
            (t.querySelector(
              ".maker"
            ).innerHTML = `<a title="View on etherscan" href="https://etherscan.io/token/0x5de758bba013e58dae2693aea3f0b12b31a3023d?a=${
              e.maker
            }" target="_blank">${v(e.maker)}</a>`),
            (t.querySelector(
              ".tx"
            ).innerHTML = `<a title="View on etherscan" href="https://etherscan.io/tx/${e.id}" target="_blank">##</a>`),
            this.querySelector("#token-swaps").append(t);
        });
    }
    disconnectedCallback() {
      window.removeEventListener("token-swaps", this.render);
    }
  }
  customElements.define("token-swaps", H);
  const q = document.createElement("template");
  q.innerHTML = '\n\n<div id="eth-price" class="component eth"></div>';
  class C extends HTMLElement {
    constructor() {
      super(),
        this.template_eth,
        this.eth_price,
        (this.render = this.render.bind(this));
    }
    async connectedCallback() {
      (this.template_eth = q.content.cloneNode(!0)),
        this.append(this.template_eth),
        window.addEventListener("eth-price", this.render);
    }
    render(e) {
      (this.eth_price = e.detail.eth_usd_human),
        (this.querySelector("#eth-price").innerHTML =
          "$" + this.eth_price.amount_commas_two);
    }
    disconnectedCallback() {
      window.removeEventListener("eth-price", this.render);
    }
  }
  customElements.define("eth-price", C);
  const N = document.createElement("template");
  N.innerHTML =
    '\n<style>\n    #token-contract {\n        display: flex;\n        gap:10px;\n        align-items:center;\n    }\n    svg {\n        cursor: pointer;\n        fill: green;\n    }\n    svg:hover {\n        fill:cyan;\n    }\n</style>\n<div id="token-contract">\n    <div id="address"></div>\n    <div title="copy contract address" id="copy-address"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M360-240q-29.7 0-50.85-21.15Q288-282.3 288-312v-480q0-29.7 21.15-50.85Q330.3-864 360-864h384q29.7 0 50.85 21.15Q816-821.7 816-792v480q0 29.7-21.15 50.85Q773.7-240 744-240H360Zm0-72h384v-480H360v480ZM216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-552h72v552h456v72H216Zm144-216v-480 480Z"/></svg></div>\n</div>';
  class $ extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.append(N.content.cloneNode(!0)),
        (this.querySelector("#address").innerHTML =
          "0x5de758bba013e58dae2693aea3f0b12b31a3023d"),
        (this.querySelector("#copy-address").onclick = () => {
          navigator.clipboard.writeText(
            "0x5de758bba013e58dae2693aea3f0b12b31a3023d"
          );
        });
    }
  }
  customElements.define("token-contract", $);
  const P = document.createElement("template");
  P.innerHTML = '\n<div id="token-name">\n    <div id="name"></div>\n</div>';
  class A extends HTMLElement {
    constructor() {
      super(), (this.render = this.render.bind(this));
    }
    connectedCallback() {
      this.append(P.content.cloneNode(!0)),
        window.addEventListener("token", this.render, !1);
    }
    render(e) {
      (this.querySelector("#name").innerHTML = e.detail.token.name),
        window.removeEventListener("token", this.render, !1);
    }
  }
  customElements.define("token-name", A);
  const R = document.createElement("template");
  R.innerHTML =
    '\n<div id="token-symbol">\n    <div id="symbol"></div>\n</div>';
  class B extends HTMLElement {
    constructor() {
      super(), (this.render = this.render.bind(this));
    }
    connectedCallback() {
      this.append(R.content.cloneNode(!0)),
        window.addEventListener("token", this.render, !1);
    }
    render(e) {
      (this.querySelector("#symbol").innerHTML = e.detail.token.symbol),
        window.removeEventListener("token", this.render, !1);
    }
  }
  customElements.define("token-symbol", B),
    (async function () {
      const e = k.getInstance(),
        t = await e.init({
          address: "0x5de758bba013e58dae2693aea3f0b12b31a3023d",
          api: "https://vip-api.realshibadoge.com",
        });
      (t && t.id) || console.log("INIT ERROR");
    })();
})();
