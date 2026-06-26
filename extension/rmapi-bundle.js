(() => {
  // node_modules/rmapi-js/dist/rmapi-js.esm.min.js
  var FU = Object.create;
  var { getPrototypeOf: jU, defineProperty: t1, getOwnPropertyNames: X7, getOwnPropertyDescriptor: HU } = Object;
  var Y7 = Object.prototype.hasOwnProperty;
  function J7(Q) {
    return this[Q];
  }
  var MU;
  var wU;
  var V5 = (Q, q, $) => {
    var X = Q != null && typeof Q === "object";
    if (X) {
      var Y = q ? MU ??= /* @__PURE__ */ new WeakMap() : wU ??= /* @__PURE__ */ new WeakMap(), J = Y.get(Q);
      if (J) return J;
    }
    $ = Q != null ? FU(jU(Q)) : {};
    let K = q || !Q || !Q.__esModule ? t1($, "default", { value: Q, enumerable: true }) : $;
    for (let U of X7(Q)) if (!Y7.call(K, U)) t1(K, U, { get: J7.bind(Q, U), enumerable: true });
    if (X) Y.set(Q, K);
    return K;
  };
  var a0 = (Q) => {
    var q = ($7 ??= /* @__PURE__ */ new WeakMap()).get(Q), $;
    if (q) return q;
    if (q = t1({}, "__esModule", { value: true }), Q && typeof Q === "object" || typeof Q === "function") {
      for (var X of X7(Q)) if (!Y7.call(q, X)) t1(q, X, { get: J7.bind(Q, X), enumerable: !($ = HU(Q, X)) || $.enumerable });
    }
    return $7.set(Q, q), q;
  };
  var $7;
  var k = (Q, q) => () => (q || Q((q = { exports: {} }).exports, q), q.exports);
  var PU = (Q) => Q;
  function LU(Q, q) {
    this[Q] = PU.bind(null, q);
  }
  var K7 = (Q, q) => {
    for (var $ in q) t1(Q, $, { get: q[$], enumerable: true, configurable: true, set: LU.bind(q, $) });
  };
  var U7 = (Q, q) => () => (Q && (q = Q(Q = 0)), q);
  var A2 = {};
  K7(A2, { transcode: () => JV, resolveObjectURL: () => $V, kStringMaxLength: () => H7, kMaxLength: () => e1, isUtf8: () => XV, isAscii: () => YV, default: () => KV, constants: () => vU, btoa: () => OU, atob: () => RU, INSPECT_MAX_BYTES: () => j7, File: () => xU, Buffer: () => _, Blob: () => TU });
  function CU(Q) {
    var q = Q.length;
    if (q % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
    var $ = Q.indexOf("=");
    if ($ === -1) $ = q;
    var X = $ === q ? 0 : 4 - $ % 4;
    return [$, X];
  }
  function IU(Q, q) {
    return (Q + q) * 3 / 4 - q;
  }
  function NU(Q) {
    var q, $ = CU(Q), X = $[0], Y = $[1], J = new Uint8Array(IU(X, Y)), K = 0, U = Y > 0 ? X - 4 : X, G;
    for (G = 0; G < U; G += 4) q = s0[Q.charCodeAt(G)] << 18 | s0[Q.charCodeAt(G + 1)] << 12 | s0[Q.charCodeAt(G + 2)] << 6 | s0[Q.charCodeAt(G + 3)], J[K++] = q >> 16 & 255, J[K++] = q >> 8 & 255, J[K++] = q & 255;
    if (Y === 2) q = s0[Q.charCodeAt(G)] << 2 | s0[Q.charCodeAt(G + 1)] >> 4, J[K++] = q & 255;
    if (Y === 1) q = s0[Q.charCodeAt(G)] << 10 | s0[Q.charCodeAt(G + 1)] << 4 | s0[Q.charCodeAt(G + 2)] >> 2, J[K++] = q >> 8 & 255, J[K++] = q & 255;
    return J;
  }
  function DU(Q) {
    return B2[Q >> 18 & 63] + B2[Q >> 12 & 63] + B2[Q >> 6 & 63] + B2[Q & 63];
  }
  function AU(Q, q, $) {
    var X, Y = [];
    for (var J = q; J < $; J += 3) X = (Q[J] << 16 & 16711680) + (Q[J + 1] << 8 & 65280) + (Q[J + 2] & 255), Y.push(DU(X));
    return Y.join("");
  }
  function z7(Q) {
    var q, $ = Q.length, X = $ % 3, Y = [], J = 16383;
    for (var K = 0, U = $ - X; K < U; K += J) Y.push(AU(Q, K, K + J > U ? U : K + J));
    if (X === 1) q = Q[$ - 1], Y.push(B2[q >> 2] + B2[q << 4 & 63] + "==");
    else if (X === 2) q = (Q[$ - 2] << 8) + Q[$ - 1], Y.push(B2[q >> 10] + B2[q >> 4 & 63] + B2[q << 2 & 63] + "=");
    return Y.join("");
  }
  function b6(Q, q, $, X, Y) {
    var J, K, U = Y * 8 - X - 1, G = (1 << U) - 1, V = G >> 1, z = -7, H = $ ? Y - 1 : 0, j = $ ? -1 : 1, Z = Q[q + H];
    H += j, J = Z & (1 << -z) - 1, Z >>= -z, z += U;
    for (; z > 0; J = J * 256 + Q[q + H], H += j, z -= 8) ;
    K = J & (1 << -z) - 1, J >>= -z, z += X;
    for (; z > 0; K = K * 256 + Q[q + H], H += j, z -= 8) ;
    if (J === 0) J = 1 - V;
    else if (J === G) return K ? NaN : (Z ? -1 : 1) * (1 / 0);
    else K = K + Math.pow(2, X), J = J - V;
    return (Z ? -1 : 1) * K * Math.pow(2, J - X);
  }
  function F7(Q, q, $, X, Y, J) {
    var K, U, G, V = J * 8 - Y - 1, z = (1 << V) - 1, H = z >> 1, j = Y === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, Z = X ? 0 : J - 1, h = X ? 1 : -1, g = q < 0 || q === 0 && 1 / q < 0 ? 1 : 0;
    if (q = Math.abs(q), isNaN(q) || q === 1 / 0) U = isNaN(q) ? 1 : 0, K = z;
    else {
      if (K = Math.floor(Math.log(q) / Math.LN2), q * (G = Math.pow(2, -K)) < 1) K--, G *= 2;
      if (K + H >= 1) q += j / G;
      else q += j * Math.pow(2, 1 - H);
      if (q * G >= 2) K++, G /= 2;
      if (K + H >= z) U = 0, K = z;
      else if (K + H >= 1) U = (q * G - 1) * Math.pow(2, Y), K = K + H;
      else U = q * Math.pow(2, H - 1) * Math.pow(2, Y), K = 0;
    }
    for (; Y >= 8; Q[$ + Z] = U & 255, Z += h, U /= 256, Y -= 8) ;
    K = K << Y | U, V += Y;
    for (; V > 0; Q[$ + Z] = K & 255, Z += h, K /= 256, V -= 8) ;
    Q[$ + Z - h] |= g * 128;
  }
  function D2(Q) {
    if (Q > e1) throw RangeError('The value "' + Q + '" is invalid for option "size"');
    let q = new Uint8Array(Q);
    return Object.setPrototypeOf(q, _.prototype), q;
  }
  function F5(Q, q, $) {
    return class extends $ {
      constructor() {
        super();
        Object.defineProperty(this, "message", { value: q.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${Q}]`, this.stack, delete this.name;
      }
      get code() {
        return Q;
      }
      set code(X) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: X, writable: true });
      }
      toString() {
        return `${this.name} [${Q}]: ${this.message}`;
      }
    };
  }
  function _(Q, q, $) {
    if (typeof Q === "number") {
      if (typeof q === "string") throw TypeError('The "string" argument must be of type string. Received type number');
      return j5(Q);
    }
    return M7(Q, q, $);
  }
  function M7(Q, q, $) {
    if (typeof Q === "string") return gU(Q, q);
    if (ArrayBuffer.isView(Q)) return yU(Q);
    if (Q == null) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q);
    if (Z2(Q, ArrayBuffer) || Q && Z2(Q.buffer, ArrayBuffer)) return B5(Q, q, $);
    if (typeof SharedArrayBuffer < "u" && (Z2(Q, SharedArrayBuffer) || Q && Z2(Q.buffer, SharedArrayBuffer))) return B5(Q, q, $);
    if (typeof Q === "number") throw TypeError('The "value" argument must not be of type number. Received type number');
    let X = Q.valueOf && Q.valueOf();
    if (X != null && X !== Q) return _.from(X, q, $);
    let Y = fU(Q);
    if (Y) return Y;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof Q[Symbol.toPrimitive] === "function") return _.from(Q[Symbol.toPrimitive]("string"), q, $);
    throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q);
  }
  function w7(Q) {
    if (typeof Q !== "number") throw TypeError('"size" argument must be of type number');
    else if (Q < 0) throw RangeError('The value "' + Q + '" is invalid for option "size"');
  }
  function kU(Q, q, $) {
    if (w7(Q), Q <= 0) return D2(Q);
    if (q !== void 0) return typeof $ === "string" ? D2(Q).fill(q, $) : D2(Q).fill(q);
    return D2(Q);
  }
  function j5(Q) {
    return w7(Q), D2(Q < 0 ? 0 : H5(Q) | 0);
  }
  function gU(Q, q) {
    if (typeof q !== "string" || q === "") q = "utf8";
    if (!_.isEncoding(q)) throw TypeError("Unknown encoding: " + q);
    let $ = P7(Q, q) | 0, X = D2($), Y = X.write(Q, q);
    if (Y !== $) X = X.slice(0, Y);
    return X;
  }
  function W5(Q) {
    let q = Q.length < 0 ? 0 : H5(Q.length) | 0, $ = D2(q);
    for (let X = 0; X < q; X += 1) $[X] = Q[X] & 255;
    return $;
  }
  function yU(Q) {
    if (Z2(Q, Uint8Array)) {
      let q = new Uint8Array(Q);
      return B5(q.buffer, q.byteOffset, q.byteLength);
    }
    return W5(Q);
  }
  function B5(Q, q, $) {
    if (q < 0 || Q.byteLength < q) throw RangeError('"offset" is outside of buffer bounds');
    if (Q.byteLength < q + ($ || 0)) throw RangeError('"length" is outside of buffer bounds');
    let X;
    if (q === void 0 && $ === void 0) X = new Uint8Array(Q);
    else if ($ === void 0) X = new Uint8Array(Q, q);
    else X = new Uint8Array(Q, q, $);
    return Object.setPrototypeOf(X, _.prototype), X;
  }
  function fU(Q) {
    if (_.isBuffer(Q)) {
      let q = H5(Q.length) | 0, $ = D2(q);
      if ($.length === 0) return $;
      return Q.copy($, 0, 0, q), $;
    }
    if (Q.length !== void 0) {
      if (typeof Q.length !== "number" || Number.isNaN(Q.length)) return D2(0);
      return W5(Q);
    }
    if (Q.type === "Buffer" && Array.isArray(Q.data)) return W5(Q.data);
  }
  function H5(Q) {
    if (Q >= e1) throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + e1.toString(16) + " bytes");
    return Q | 0;
  }
  function P7(Q, q) {
    if (_.isBuffer(Q)) return Q.length;
    if (ArrayBuffer.isView(Q) || Z2(Q, ArrayBuffer)) return Q.byteLength;
    if (typeof Q !== "string") throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Q);
    let $ = Q.length, X = arguments.length > 2 && arguments[2] === true;
    if (!X && $ === 0) return 0;
    let Y = false;
    for (; ; ) switch (q) {
      case "ascii":
      case "latin1":
      case "binary":
        return $;
      case "utf8":
      case "utf-8":
        return Z5(Q).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return $ * 2;
      case "hex":
        return $ >>> 1;
      case "base64":
        return x7(Q).length;
      default:
        if (Y) return X ? -1 : Z5(Q).length;
        q = ("" + q).toLowerCase(), Y = true;
    }
  }
  function hU(Q, q, $) {
    let X = false;
    if (q === void 0 || q < 0) q = 0;
    if (q > this.length) return "";
    if ($ === void 0 || $ > this.length) $ = this.length;
    if ($ <= 0) return "";
    if ($ >>>= 0, q >>>= 0, $ <= q) return "";
    if (!Q) Q = "utf8";
    while (true) switch (Q) {
      case "hex":
        return oU(this, q, $);
      case "utf8":
      case "utf-8":
        return C7(this, q, $);
      case "ascii":
        return lU(this, q, $);
      case "latin1":
      case "binary":
        return iU(this, q, $);
      case "base64":
        return mU(this, q, $);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return nU(this, q, $);
      default:
        if (X) throw TypeError("Unknown encoding: " + Q);
        Q = (Q + "").toLowerCase(), X = true;
    }
  }
  function X1(Q, q, $) {
    let X = Q[q];
    Q[q] = Q[$], Q[$] = X;
  }
  function L7(Q, q, $, X, Y) {
    if (Q.length === 0) return -1;
    if (typeof $ === "string") X = $, $ = 0;
    else if ($ > 2147483647) $ = 2147483647;
    else if ($ < -2147483648) $ = -2147483648;
    if ($ = +$, Number.isNaN($)) $ = Y ? 0 : Q.length - 1;
    if ($ < 0) $ = Q.length + $;
    if ($ >= Q.length) if (Y) return -1;
    else $ = Q.length - 1;
    else if ($ < 0) if (Y) $ = 0;
    else return -1;
    if (typeof q === "string") q = _.from(q, X);
    if (_.isBuffer(q)) {
      if (q.length === 0) return -1;
      return W7(Q, q, $, X, Y);
    } else if (typeof q === "number") {
      if (q = q & 255, typeof Uint8Array.prototype.indexOf === "function") if (Y) return Uint8Array.prototype.indexOf.call(Q, q, $);
      else return Uint8Array.prototype.lastIndexOf.call(Q, q, $);
      return W7(Q, [q], $, X, Y);
    }
    throw TypeError("val must be string, number or Buffer");
  }
  function W7(Q, q, $, X, Y) {
    let J = 1, K = Q.length, U = q.length;
    if (X !== void 0) {
      if (X = String(X).toLowerCase(), X === "ucs2" || X === "ucs-2" || X === "utf16le" || X === "utf-16le") {
        if (Q.length < 2 || q.length < 2) return -1;
        J = 2, K /= 2, U /= 2, $ /= 2;
      }
    }
    function G(z, H) {
      if (J === 1) return z[H];
      else return z.readUInt16BE(H * J);
    }
    let V;
    if (Y) {
      let z = -1;
      for (V = $; V < K; V++) if (G(Q, V) === G(q, z === -1 ? 0 : V - z)) {
        if (z === -1) z = V;
        if (V - z + 1 === U) return z * J;
      } else {
        if (z !== -1) V -= V - z;
        z = -1;
      }
    } else {
      if ($ + U > K) $ = K - U;
      for (V = $; V >= 0; V--) {
        let z = true;
        for (let H = 0; H < U; H++) if (G(Q, V + H) !== G(q, H)) {
          z = false;
          break;
        }
        if (z) return V;
      }
    }
    return -1;
  }
  function _U(Q, q, $, X) {
    $ = Number($) || 0;
    let Y = Q.length - $;
    if (!X) X = Y;
    else if (X = Number(X), X > Y) X = Y;
    let J = q.length;
    if (X > J / 2) X = J / 2;
    let K;
    for (K = 0; K < X; ++K) {
      let U = parseInt(q.substr(K * 2, 2), 16);
      if (Number.isNaN(U)) return K;
      Q[$ + K] = U;
    }
    return K;
  }
  function bU(Q, q, $, X) {
    return u6(Z5(q, Q.length - $), Q, $, X);
  }
  function uU(Q, q, $, X) {
    return u6(tU(q), Q, $, X);
  }
  function cU(Q, q, $, X) {
    return u6(x7(q), Q, $, X);
  }
  function pU(Q, q, $, X) {
    return u6(eU(q, Q.length - $), Q, $, X);
  }
  function mU(Q, q, $) {
    if (q === 0 && $ === Q.length) return z7(Q);
    else return z7(Q.slice(q, $));
  }
  function C7(Q, q, $) {
    $ = Math.min(Q.length, $);
    let X = [], Y = q;
    while (Y < $) {
      let J = Q[Y], K = null, U = J > 239 ? 4 : J > 223 ? 3 : J > 191 ? 2 : 1;
      if (Y + U <= $) {
        let G, V, z, H;
        switch (U) {
          case 1:
            if (J < 128) K = J;
            break;
          case 2:
            if (G = Q[Y + 1], (G & 192) === 128) {
              if (H = (J & 31) << 6 | G & 63, H > 127) K = H;
            }
            break;
          case 3:
            if (G = Q[Y + 1], V = Q[Y + 2], (G & 192) === 128 && (V & 192) === 128) {
              if (H = (J & 15) << 12 | (G & 63) << 6 | V & 63, H > 2047 && (H < 55296 || H > 57343)) K = H;
            }
            break;
          case 4:
            if (G = Q[Y + 1], V = Q[Y + 2], z = Q[Y + 3], (G & 192) === 128 && (V & 192) === 128 && (z & 192) === 128) {
              if (H = (J & 15) << 18 | (G & 63) << 12 | (V & 63) << 6 | z & 63, H > 65535 && H < 1114112) K = H;
            }
        }
      }
      if (K === null) K = 65533, U = 1;
      else if (K > 65535) K -= 65536, X.push(K >>> 10 & 1023 | 55296), K = 56320 | K & 1023;
      X.push(K), Y += U;
    }
    return dU(X);
  }
  function dU(Q) {
    let q = Q.length;
    if (q <= B7) return String.fromCharCode.apply(String, Q);
    let $ = "", X = 0;
    while (X < q) $ += String.fromCharCode.apply(String, Q.slice(X, X += B7));
    return $;
  }
  function lU(Q, q, $) {
    let X = "";
    $ = Math.min(Q.length, $);
    for (let Y = q; Y < $; ++Y) X += String.fromCharCode(Q[Y] & 127);
    return X;
  }
  function iU(Q, q, $) {
    let X = "";
    $ = Math.min(Q.length, $);
    for (let Y = q; Y < $; ++Y) X += String.fromCharCode(Q[Y]);
    return X;
  }
  function oU(Q, q, $) {
    let X = Q.length;
    if (!q || q < 0) q = 0;
    if (!$ || $ < 0 || $ > X) $ = X;
    let Y = "";
    for (let J = q; J < $; ++J) Y += QV[Q[J]];
    return Y;
  }
  function nU(Q, q, $) {
    let X = Q.slice(q, $), Y = "";
    for (let J = 0; J < X.length - 1; J += 2) Y += String.fromCharCode(X[J] + X[J + 1] * 256);
    return Y;
  }
  function v0(Q, q, $) {
    if (Q % 1 !== 0 || Q < 0) throw RangeError("offset is not uint");
    if (Q + q > $) throw RangeError("Trying to access beyond buffer length");
  }
  function p0(Q, q, $, X, Y, J) {
    if (!_.isBuffer(Q)) throw TypeError('"buffer" argument must be a Buffer instance');
    if (q > Y || q < J) throw RangeError('"value" argument is out of bounds');
    if ($ + X > Q.length) throw RangeError("Index out of range");
  }
  function I7(Q, q, $, X, Y) {
    R7(q, X, Y, Q, $, 7);
    let J = Number(q & BigInt(4294967295));
    Q[$++] = J, J = J >> 8, Q[$++] = J, J = J >> 8, Q[$++] = J, J = J >> 8, Q[$++] = J;
    let K = Number(q >> BigInt(32) & BigInt(4294967295));
    return Q[$++] = K, K = K >> 8, Q[$++] = K, K = K >> 8, Q[$++] = K, K = K >> 8, Q[$++] = K, $;
  }
  function N7(Q, q, $, X, Y) {
    R7(q, X, Y, Q, $, 7);
    let J = Number(q & BigInt(4294967295));
    Q[$ + 7] = J, J = J >> 8, Q[$ + 6] = J, J = J >> 8, Q[$ + 5] = J, J = J >> 8, Q[$ + 4] = J;
    let K = Number(q >> BigInt(32) & BigInt(4294967295));
    return Q[$ + 3] = K, K = K >> 8, Q[$ + 2] = K, K = K >> 8, Q[$ + 1] = K, K = K >> 8, Q[$] = K, $ + 8;
  }
  function D7(Q, q, $, X, Y, J) {
    if ($ + X > Q.length) throw RangeError("Index out of range");
    if ($ < 0) throw RangeError("Index out of range");
  }
  function A7(Q, q, $, X, Y) {
    if (q = +q, $ = $ >>> 0, !Y) D7(Q, q, $, 4, 34028234663852886e22, -34028234663852886e22);
    return F7(Q, q, $, X, 23, 4), $ + 4;
  }
  function O7(Q, q, $, X, Y) {
    if (q = +q, $ = $ >>> 0, !Y) D7(Q, q, $, 8, 17976931348623157e292, -17976931348623157e292);
    return F7(Q, q, $, X, 52, 8), $ + 8;
  }
  function Z7(Q) {
    let q = "", $ = Q.length, X = Q[0] === "-" ? 1 : 0;
    for (; $ >= X + 4; $ -= 3) q = `_${Q.slice($ - 3, $)}${q}`;
    return `${Q.slice(0, $)}${q}`;
  }
  function rU(Q, q, $) {
    if (D1(q, "offset"), Q[q] === void 0 || Q[q + $] === void 0) Q6(q, Q.length - ($ + 1));
  }
  function R7(Q, q, $, X, Y, J) {
    if (Q > $ || Q < q) {
      let K = typeof q === "bigint" ? "n" : "", U;
      if (J > 3) if (q === 0 || q === BigInt(0)) U = `>= 0${K} and < 2${K} ** ${(J + 1) * 8}${K}`;
      else U = `>= -(2${K} ** ${(J + 1) * 8 - 1}${K}) and < 2 ** ${(J + 1) * 8 - 1}${K}`;
      else U = `>= ${q}${K} and <= ${$}${K}`;
      throw new G5("value", U, Q);
    }
    rU(X, Y, J);
  }
  function D1(Q, q) {
    if (typeof Q !== "number") throw new SU(q, "number", Q);
  }
  function Q6(Q, q, $) {
    if (Math.floor(Q) !== Q) throw D1(Q, $), new G5($ || "offset", "an integer", Q);
    if (q < 0) throw new EU();
    throw new G5($ || "offset", `>= ${$ ? 1 : 0} and <= ${q}`, Q);
  }
  function sU(Q) {
    if (Q = Q.split("=")[0], Q = Q.trim().replace(aU, ""), Q.length < 2) return "";
    while (Q.length % 4 !== 0) Q = Q + "=";
    return Q;
  }
  function Z5(Q, q) {
    q = q || 1 / 0;
    let $, X = Q.length, Y = null, J = [];
    for (let K = 0; K < X; ++K) {
      if ($ = Q.charCodeAt(K), $ > 55295 && $ < 57344) {
        if (!Y) {
          if ($ > 56319) {
            if ((q -= 3) > -1) J.push(239, 191, 189);
            continue;
          } else if (K + 1 === X) {
            if ((q -= 3) > -1) J.push(239, 191, 189);
            continue;
          }
          Y = $;
          continue;
        }
        if ($ < 56320) {
          if ((q -= 3) > -1) J.push(239, 191, 189);
          Y = $;
          continue;
        }
        $ = (Y - 55296 << 10 | $ - 56320) + 65536;
      } else if (Y) {
        if ((q -= 3) > -1) J.push(239, 191, 189);
      }
      if (Y = null, $ < 128) {
        if ((q -= 1) < 0) break;
        J.push($);
      } else if ($ < 2048) {
        if ((q -= 2) < 0) break;
        J.push($ >> 6 | 192, $ & 63 | 128);
      } else if ($ < 65536) {
        if ((q -= 3) < 0) break;
        J.push($ >> 12 | 224, $ >> 6 & 63 | 128, $ & 63 | 128);
      } else if ($ < 1114112) {
        if ((q -= 4) < 0) break;
        J.push($ >> 18 | 240, $ >> 12 & 63 | 128, $ >> 6 & 63 | 128, $ & 63 | 128);
      } else throw Error("Invalid code point");
    }
    return J;
  }
  function tU(Q) {
    let q = [];
    for (let $ = 0; $ < Q.length; ++$) q.push(Q.charCodeAt($) & 255);
    return q;
  }
  function eU(Q, q) {
    let $, X, Y, J = [];
    for (let K = 0; K < Q.length; ++K) {
      if ((q -= 2) < 0) break;
      $ = Q.charCodeAt(K), X = $ >> 8, Y = $ % 256, J.push(Y), J.push(X);
    }
    return J;
  }
  function x7(Q) {
    return NU(sU(Q));
  }
  function u6(Q, q, $, X) {
    let Y;
    for (Y = 0; Y < X; ++Y) {
      if (Y + $ >= q.length || Y >= Q.length) break;
      q[Y + $] = Q[Y];
    }
    return Y;
  }
  function Z2(Q, q) {
    return Q instanceof q || Q != null && Q.constructor != null && Q.constructor.name != null && Q.constructor.name === q.name;
  }
  function f2(Q) {
    return typeof BigInt > "u" ? qV : Q;
  }
  function qV() {
    throw Error("BigInt not supported");
  }
  function M5(Q) {
    return () => {
      throw Error(Q + " is not implemented for node:buffer browser polyfill");
    };
  }
  var B2;
  var s0;
  var z5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var $1;
  var V7;
  var G7;
  var j7 = 50;
  var e1 = 2147483647;
  var H7 = 536870888;
  var OU;
  var RU;
  var xU;
  var TU;
  var vU;
  var EU;
  var SU;
  var G5;
  var B7 = 4096;
  var aU;
  var QV;
  var $V;
  var XV;
  var YV = (Q) => {
    for (let q of Q) if (q.charCodeAt(0) > 127) return false;
    return true;
  };
  var JV;
  var KV;
  var O2 = U7(() => {
    B2 = [], s0 = [];
    for ($1 = 0, V7 = z5.length; $1 < V7; ++$1) B2[$1] = z5[$1], s0[z5.charCodeAt($1)] = $1;
    s0[45] = 62;
    s0[95] = 63;
    G7 = typeof Symbol === "function" && typeof Symbol.for === "function" ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null, OU = globalThis.btoa, RU = globalThis.atob, xU = globalThis.File, TU = globalThis.Blob, vU = { MAX_LENGTH: e1, MAX_STRING_LENGTH: H7 };
    EU = F5("ERR_BUFFER_OUT_OF_BOUNDS", function(Q) {
      if (Q) return `${Q} is outside of buffer bounds`;
      return "Attempt to access memory outside buffer bounds";
    }, RangeError), SU = F5("ERR_INVALID_ARG_TYPE", function(Q, q) {
      return `The "${Q}" argument must be of type number. Received type ${typeof q}`;
    }, TypeError), G5 = F5("ERR_OUT_OF_RANGE", function(Q, q, $) {
      let X = `The value of "${Q}" is out of range.`, Y = $;
      if (Number.isInteger($) && Math.abs($) > 4294967296) Y = Z7(String($));
      else if (typeof $ === "bigint") {
        if (Y = String($), $ > BigInt(2) ** BigInt(32) || $ < -(BigInt(2) ** BigInt(32))) Y = Z7(Y);
        Y += "n";
      }
      return X += ` It must be ${q}. Received ${Y}`, X;
    }, RangeError);
    Object.defineProperty(_.prototype, "parent", { enumerable: true, get: function() {
      if (!_.isBuffer(this)) return;
      return this.buffer;
    } });
    Object.defineProperty(_.prototype, "offset", { enumerable: true, get: function() {
      if (!_.isBuffer(this)) return;
      return this.byteOffset;
    } });
    _.poolSize = 8192;
    _.from = function(Q, q, $) {
      return M7(Q, q, $);
    };
    Object.setPrototypeOf(_.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(_, Uint8Array);
    _.alloc = function(Q, q, $) {
      return kU(Q, q, $);
    };
    _.allocUnsafe = function(Q) {
      return j5(Q);
    };
    _.allocUnsafeSlow = function(Q) {
      return j5(Q);
    };
    _.isBuffer = function(Q) {
      return Q != null && Q._isBuffer === true && Q !== _.prototype;
    };
    _.compare = function(Q, q) {
      if (Z2(Q, Uint8Array)) Q = _.from(Q, Q.offset, Q.byteLength);
      if (Z2(q, Uint8Array)) q = _.from(q, q.offset, q.byteLength);
      if (!_.isBuffer(Q) || !_.isBuffer(q)) throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      if (Q === q) return 0;
      let $ = Q.length, X = q.length;
      for (let Y = 0, J = Math.min($, X); Y < J; ++Y) if (Q[Y] !== q[Y]) {
        $ = Q[Y], X = q[Y];
        break;
      }
      if ($ < X) return -1;
      if (X < $) return 1;
      return 0;
    };
    _.isEncoding = function(Q) {
      switch (String(Q).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    _.concat = function(Q, q) {
      if (!Array.isArray(Q)) throw TypeError('"list" argument must be an Array of Buffers');
      if (Q.length === 0) return _.alloc(0);
      let $;
      if (q === void 0) {
        q = 0;
        for ($ = 0; $ < Q.length; ++$) q += Q[$].length;
      }
      let X = _.allocUnsafe(q), Y = 0;
      for ($ = 0; $ < Q.length; ++$) {
        let J = Q[$];
        if (Z2(J, Uint8Array)) if (Y + J.length > X.length) {
          if (!_.isBuffer(J)) J = _.from(J);
          J.copy(X, Y);
        } else Uint8Array.prototype.set.call(X, J, Y);
        else if (!_.isBuffer(J)) throw TypeError('"list" argument must be an Array of Buffers');
        else J.copy(X, Y);
        Y += J.length;
      }
      return X;
    };
    _.byteLength = P7;
    _.prototype._isBuffer = true;
    _.prototype.swap16 = function() {
      let Q = this.length;
      if (Q % 2 !== 0) throw RangeError("Buffer size must be a multiple of 16-bits");
      for (let q = 0; q < Q; q += 2) X1(this, q, q + 1);
      return this;
    };
    _.prototype.swap32 = function() {
      let Q = this.length;
      if (Q % 4 !== 0) throw RangeError("Buffer size must be a multiple of 32-bits");
      for (let q = 0; q < Q; q += 4) X1(this, q, q + 3), X1(this, q + 1, q + 2);
      return this;
    };
    _.prototype.swap64 = function() {
      let Q = this.length;
      if (Q % 8 !== 0) throw RangeError("Buffer size must be a multiple of 64-bits");
      for (let q = 0; q < Q; q += 8) X1(this, q, q + 7), X1(this, q + 1, q + 6), X1(this, q + 2, q + 5), X1(this, q + 3, q + 4);
      return this;
    };
    _.prototype.toString = function() {
      let Q = this.length;
      if (Q === 0) return "";
      if (arguments.length === 0) return C7(this, 0, Q);
      return hU.apply(this, arguments);
    };
    _.prototype.toLocaleString = _.prototype.toString;
    _.prototype.equals = function(Q) {
      if (!_.isBuffer(Q)) throw TypeError("Argument must be a Buffer");
      if (this === Q) return true;
      return _.compare(this, Q) === 0;
    };
    _.prototype.inspect = function() {
      let Q = "", q = j7;
      if (Q = this.toString("hex", 0, q).replace(/(.{2})/g, "$1 ").trim(), this.length > q) Q += " ... ";
      return "<Buffer " + Q + ">";
    };
    if (G7) _.prototype[G7] = _.prototype.inspect;
    _.prototype.compare = function(Q, q, $, X, Y) {
      if (Z2(Q, Uint8Array)) Q = _.from(Q, Q.offset, Q.byteLength);
      if (!_.isBuffer(Q)) throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof Q);
      if (q === void 0) q = 0;
      if ($ === void 0) $ = Q ? Q.length : 0;
      if (X === void 0) X = 0;
      if (Y === void 0) Y = this.length;
      if (q < 0 || $ > Q.length || X < 0 || Y > this.length) throw RangeError("out of range index");
      if (X >= Y && q >= $) return 0;
      if (X >= Y) return -1;
      if (q >= $) return 1;
      if (q >>>= 0, $ >>>= 0, X >>>= 0, Y >>>= 0, this === Q) return 0;
      let J = Y - X, K = $ - q, U = Math.min(J, K), G = this.slice(X, Y), V = Q.slice(q, $);
      for (let z = 0; z < U; ++z) if (G[z] !== V[z]) {
        J = G[z], K = V[z];
        break;
      }
      if (J < K) return -1;
      if (K < J) return 1;
      return 0;
    };
    _.prototype.includes = function(Q, q, $) {
      return this.indexOf(Q, q, $) !== -1;
    };
    _.prototype.indexOf = function(Q, q, $) {
      return L7(this, Q, q, $, true);
    };
    _.prototype.lastIndexOf = function(Q, q, $) {
      return L7(this, Q, q, $, false);
    };
    _.prototype.write = function(Q, q, $, X) {
      if (q === void 0) X = "utf8", $ = this.length, q = 0;
      else if ($ === void 0 && typeof q === "string") X = q, $ = this.length, q = 0;
      else if (isFinite(q)) if (q = q >>> 0, isFinite($)) {
        if ($ = $ >>> 0, X === void 0) X = "utf8";
      } else X = $, $ = void 0;
      else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      let Y = this.length - q;
      if ($ === void 0 || $ > Y) $ = Y;
      if (Q.length > 0 && ($ < 0 || q < 0) || q > this.length) throw RangeError("Attempt to write outside buffer bounds");
      if (!X) X = "utf8";
      let J = false;
      for (; ; ) switch (X) {
        case "hex":
          return _U(this, Q, q, $);
        case "utf8":
        case "utf-8":
          return bU(this, Q, q, $);
        case "ascii":
        case "latin1":
        case "binary":
          return uU(this, Q, q, $);
        case "base64":
          return cU(this, Q, q, $);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return pU(this, Q, q, $);
        default:
          if (J) throw TypeError("Unknown encoding: " + X);
          X = ("" + X).toLowerCase(), J = true;
      }
    };
    _.prototype.toJSON = function() {
      return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
    };
    _.prototype.slice = function(Q, q) {
      let $ = this.length;
      if (Q = ~~Q, q = q === void 0 ? $ : ~~q, Q < 0) {
        if (Q += $, Q < 0) Q = 0;
      } else if (Q > $) Q = $;
      if (q < 0) {
        if (q += $, q < 0) q = 0;
      } else if (q > $) q = $;
      if (q < Q) q = Q;
      let X = this.subarray(Q, q);
      return Object.setPrototypeOf(X, _.prototype), X;
    };
    _.prototype.readUintLE = _.prototype.readUIntLE = function(Q, q, $) {
      if (Q = Q >>> 0, q = q >>> 0, !$) v0(Q, q, this.length);
      let X = this[Q], Y = 1, J = 0;
      while (++J < q && (Y *= 256)) X += this[Q + J] * Y;
      return X;
    };
    _.prototype.readUintBE = _.prototype.readUIntBE = function(Q, q, $) {
      if (Q = Q >>> 0, q = q >>> 0, !$) v0(Q, q, this.length);
      let X = this[Q + --q], Y = 1;
      while (q > 0 && (Y *= 256)) X += this[Q + --q] * Y;
      return X;
    };
    _.prototype.readUint8 = _.prototype.readUInt8 = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 1, this.length);
      return this[Q];
    };
    _.prototype.readUint16LE = _.prototype.readUInt16LE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 2, this.length);
      return this[Q] | this[Q + 1] << 8;
    };
    _.prototype.readUint16BE = _.prototype.readUInt16BE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 2, this.length);
      return this[Q] << 8 | this[Q + 1];
    };
    _.prototype.readUint32LE = _.prototype.readUInt32LE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return (this[Q] | this[Q + 1] << 8 | this[Q + 2] << 16) + this[Q + 3] * 16777216;
    };
    _.prototype.readUint32BE = _.prototype.readUInt32BE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return this[Q] * 16777216 + (this[Q + 1] << 16 | this[Q + 2] << 8 | this[Q + 3]);
    };
    _.prototype.readBigUInt64LE = f2(function(Q) {
      Q = Q >>> 0, D1(Q, "offset");
      let q = this[Q], $ = this[Q + 7];
      if (q === void 0 || $ === void 0) Q6(Q, this.length - 8);
      let X = q + this[++Q] * 256 + this[++Q] * 65536 + this[++Q] * 16777216, Y = this[++Q] + this[++Q] * 256 + this[++Q] * 65536 + $ * 16777216;
      return BigInt(X) + (BigInt(Y) << BigInt(32));
    });
    _.prototype.readBigUInt64BE = f2(function(Q) {
      Q = Q >>> 0, D1(Q, "offset");
      let q = this[Q], $ = this[Q + 7];
      if (q === void 0 || $ === void 0) Q6(Q, this.length - 8);
      let X = q * 16777216 + this[++Q] * 65536 + this[++Q] * 256 + this[++Q], Y = this[++Q] * 16777216 + this[++Q] * 65536 + this[++Q] * 256 + $;
      return (BigInt(X) << BigInt(32)) + BigInt(Y);
    });
    _.prototype.readIntLE = function(Q, q, $) {
      if (Q = Q >>> 0, q = q >>> 0, !$) v0(Q, q, this.length);
      let X = this[Q], Y = 1, J = 0;
      while (++J < q && (Y *= 256)) X += this[Q + J] * Y;
      if (Y *= 128, X >= Y) X -= Math.pow(2, 8 * q);
      return X;
    };
    _.prototype.readIntBE = function(Q, q, $) {
      if (Q = Q >>> 0, q = q >>> 0, !$) v0(Q, q, this.length);
      let X = q, Y = 1, J = this[Q + --X];
      while (X > 0 && (Y *= 256)) J += this[Q + --X] * Y;
      if (Y *= 128, J >= Y) J -= Math.pow(2, 8 * q);
      return J;
    };
    _.prototype.readInt8 = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 1, this.length);
      if (!(this[Q] & 128)) return this[Q];
      return (255 - this[Q] + 1) * -1;
    };
    _.prototype.readInt16LE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 2, this.length);
      let $ = this[Q] | this[Q + 1] << 8;
      return $ & 32768 ? $ | 4294901760 : $;
    };
    _.prototype.readInt16BE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 2, this.length);
      let $ = this[Q + 1] | this[Q] << 8;
      return $ & 32768 ? $ | 4294901760 : $;
    };
    _.prototype.readInt32LE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return this[Q] | this[Q + 1] << 8 | this[Q + 2] << 16 | this[Q + 3] << 24;
    };
    _.prototype.readInt32BE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return this[Q] << 24 | this[Q + 1] << 16 | this[Q + 2] << 8 | this[Q + 3];
    };
    _.prototype.readBigInt64LE = f2(function(Q) {
      Q = Q >>> 0, D1(Q, "offset");
      let q = this[Q], $ = this[Q + 7];
      if (q === void 0 || $ === void 0) Q6(Q, this.length - 8);
      let X = this[Q + 4] + this[Q + 5] * 256 + this[Q + 6] * 65536 + ($ << 24);
      return (BigInt(X) << BigInt(32)) + BigInt(q + this[++Q] * 256 + this[++Q] * 65536 + this[++Q] * 16777216);
    });
    _.prototype.readBigInt64BE = f2(function(Q) {
      Q = Q >>> 0, D1(Q, "offset");
      let q = this[Q], $ = this[Q + 7];
      if (q === void 0 || $ === void 0) Q6(Q, this.length - 8);
      let X = (q << 24) + this[++Q] * 65536 + this[++Q] * 256 + this[++Q];
      return (BigInt(X) << BigInt(32)) + BigInt(this[++Q] * 16777216 + this[++Q] * 65536 + this[++Q] * 256 + $);
    });
    _.prototype.readFloatLE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return b6(this, Q, true, 23, 4);
    };
    _.prototype.readFloatBE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 4, this.length);
      return b6(this, Q, false, 23, 4);
    };
    _.prototype.readDoubleLE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 8, this.length);
      return b6(this, Q, true, 52, 8);
    };
    _.prototype.readDoubleBE = function(Q, q) {
      if (Q = Q >>> 0, !q) v0(Q, 8, this.length);
      return b6(this, Q, false, 52, 8);
    };
    _.prototype.writeUintLE = _.prototype.writeUIntLE = function(Q, q, $, X) {
      if (Q = +Q, q = q >>> 0, $ = $ >>> 0, !X) {
        let K = Math.pow(2, 8 * $) - 1;
        p0(this, Q, q, $, K, 0);
      }
      let Y = 1, J = 0;
      this[q] = Q & 255;
      while (++J < $ && (Y *= 256)) this[q + J] = Q / Y & 255;
      return q + $;
    };
    _.prototype.writeUintBE = _.prototype.writeUIntBE = function(Q, q, $, X) {
      if (Q = +Q, q = q >>> 0, $ = $ >>> 0, !X) {
        let K = Math.pow(2, 8 * $) - 1;
        p0(this, Q, q, $, K, 0);
      }
      let Y = $ - 1, J = 1;
      this[q + Y] = Q & 255;
      while (--Y >= 0 && (J *= 256)) this[q + Y] = Q / J & 255;
      return q + $;
    };
    _.prototype.writeUint8 = _.prototype.writeUInt8 = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 1, 255, 0);
      return this[q] = Q & 255, q + 1;
    };
    _.prototype.writeUint16LE = _.prototype.writeUInt16LE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 2, 65535, 0);
      return this[q] = Q & 255, this[q + 1] = Q >>> 8, q + 2;
    };
    _.prototype.writeUint16BE = _.prototype.writeUInt16BE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 2, 65535, 0);
      return this[q] = Q >>> 8, this[q + 1] = Q & 255, q + 2;
    };
    _.prototype.writeUint32LE = _.prototype.writeUInt32LE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 4, 4294967295, 0);
      return this[q + 3] = Q >>> 24, this[q + 2] = Q >>> 16, this[q + 1] = Q >>> 8, this[q] = Q & 255, q + 4;
    };
    _.prototype.writeUint32BE = _.prototype.writeUInt32BE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 4, 4294967295, 0);
      return this[q] = Q >>> 24, this[q + 1] = Q >>> 16, this[q + 2] = Q >>> 8, this[q + 3] = Q & 255, q + 4;
    };
    _.prototype.writeBigUInt64LE = f2(function(Q, q = 0) {
      return I7(this, Q, q, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    _.prototype.writeBigUInt64BE = f2(function(Q, q = 0) {
      return N7(this, Q, q, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    _.prototype.writeIntLE = function(Q, q, $, X) {
      if (Q = +Q, q = q >>> 0, !X) {
        let U = Math.pow(2, 8 * $ - 1);
        p0(this, Q, q, $, U - 1, -U);
      }
      let Y = 0, J = 1, K = 0;
      this[q] = Q & 255;
      while (++Y < $ && (J *= 256)) {
        if (Q < 0 && K === 0 && this[q + Y - 1] !== 0) K = 1;
        this[q + Y] = (Q / J >> 0) - K & 255;
      }
      return q + $;
    };
    _.prototype.writeIntBE = function(Q, q, $, X) {
      if (Q = +Q, q = q >>> 0, !X) {
        let U = Math.pow(2, 8 * $ - 1);
        p0(this, Q, q, $, U - 1, -U);
      }
      let Y = $ - 1, J = 1, K = 0;
      this[q + Y] = Q & 255;
      while (--Y >= 0 && (J *= 256)) {
        if (Q < 0 && K === 0 && this[q + Y + 1] !== 0) K = 1;
        this[q + Y] = (Q / J >> 0) - K & 255;
      }
      return q + $;
    };
    _.prototype.writeInt8 = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 1, 127, -128);
      if (Q < 0) Q = 255 + Q + 1;
      return this[q] = Q & 255, q + 1;
    };
    _.prototype.writeInt16LE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 2, 32767, -32768);
      return this[q] = Q & 255, this[q + 1] = Q >>> 8, q + 2;
    };
    _.prototype.writeInt16BE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 2, 32767, -32768);
      return this[q] = Q >>> 8, this[q + 1] = Q & 255, q + 2;
    };
    _.prototype.writeInt32LE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 4, 2147483647, -2147483648);
      return this[q] = Q & 255, this[q + 1] = Q >>> 8, this[q + 2] = Q >>> 16, this[q + 3] = Q >>> 24, q + 4;
    };
    _.prototype.writeInt32BE = function(Q, q, $) {
      if (Q = +Q, q = q >>> 0, !$) p0(this, Q, q, 4, 2147483647, -2147483648);
      if (Q < 0) Q = 4294967295 + Q + 1;
      return this[q] = Q >>> 24, this[q + 1] = Q >>> 16, this[q + 2] = Q >>> 8, this[q + 3] = Q & 255, q + 4;
    };
    _.prototype.writeBigInt64LE = f2(function(Q, q = 0) {
      return I7(this, Q, q, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    _.prototype.writeBigInt64BE = f2(function(Q, q = 0) {
      return N7(this, Q, q, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    _.prototype.writeFloatLE = function(Q, q, $) {
      return A7(this, Q, q, true, $);
    };
    _.prototype.writeFloatBE = function(Q, q, $) {
      return A7(this, Q, q, false, $);
    };
    _.prototype.writeDoubleLE = function(Q, q, $) {
      return O7(this, Q, q, true, $);
    };
    _.prototype.writeDoubleBE = function(Q, q, $) {
      return O7(this, Q, q, false, $);
    };
    _.prototype.copy = function(Q, q, $, X) {
      if (!_.isBuffer(Q)) throw TypeError("argument should be a Buffer");
      if (!$) $ = 0;
      if (!X && X !== 0) X = this.length;
      if (q >= Q.length) q = Q.length;
      if (!q) q = 0;
      if (X > 0 && X < $) X = $;
      if (X === $) return 0;
      if (Q.length === 0 || this.length === 0) return 0;
      if (q < 0) throw RangeError("targetStart out of bounds");
      if ($ < 0 || $ >= this.length) throw RangeError("Index out of range");
      if (X < 0) throw RangeError("sourceEnd out of bounds");
      if (X > this.length) X = this.length;
      if (Q.length - q < X - $) X = Q.length - q + $;
      let Y = X - $;
      if (this === Q && typeof Uint8Array.prototype.copyWithin === "function") this.copyWithin(q, $, X);
      else Uint8Array.prototype.set.call(Q, this.subarray($, X), q);
      return Y;
    };
    _.prototype.fill = function(Q, q, $, X) {
      if (typeof Q === "string") {
        if (typeof q === "string") X = q, q = 0, $ = this.length;
        else if (typeof $ === "string") X = $, $ = this.length;
        if (X !== void 0 && typeof X !== "string") throw TypeError("encoding must be a string");
        if (typeof X === "string" && !_.isEncoding(X)) throw TypeError("Unknown encoding: " + X);
        if (Q.length === 1) {
          let J = Q.charCodeAt(0);
          if (X === "utf8" && J < 128 || X === "latin1") Q = J;
        }
      } else if (typeof Q === "number") Q = Q & 255;
      else if (typeof Q === "boolean") Q = Number(Q);
      if (q < 0 || this.length < q || this.length < $) throw RangeError("Out of range index");
      if ($ <= q) return this;
      if (q = q >>> 0, $ = $ === void 0 ? this.length : $ >>> 0, !Q) Q = 0;
      let Y;
      if (typeof Q === "number") for (Y = q; Y < $; ++Y) this[Y] = Q;
      else {
        let J = _.isBuffer(Q) ? Q : _.from(Q, X), K = J.length;
        if (K === 0) throw TypeError('The value "' + Q + '" is invalid for argument "value"');
        for (Y = 0; Y < $ - q; ++Y) this[Y + q] = J[Y % K];
      }
      return this;
    };
    aU = /[^+/0-9A-Za-z-_]/g;
    QV = (function() {
      let Q = Array(256);
      for (let q = 0; q < 16; ++q) {
        let $ = q * 16;
        for (let X = 0; X < 16; ++X) Q[$ + X] = "0123456789abcdef"[q] + "0123456789abcdef"[X];
      }
      return Q;
    })();
    $V = M5("resolveObjectURL"), XV = M5("isUtf8"), JV = M5("transcode"), KV = _;
  });
  var $6 = {};
  K7($6, { setMaxListeners: () => b7, once: () => h7, listenerCount: () => u7, init: () => h2, getMaxListeners: () => p7, getEventListeners: () => _7, default: () => jV, captureRejectionSymbol: () => k7, addAbortListener: () => m7, EventEmitter: () => h2 });
  function g7(Q, q) {
    var { _events: $ } = Q;
    if (q[0] ??= Error("Unhandled error."), !$) throw q[0];
    var X = $[S7];
    if (X) for (var Y of v7.call(X)) Y.apply(Q, q);
    var J = $.error;
    if (!J) throw q[0];
    for (var Y of v7.call(J)) Y.apply(Q, q);
    return true;
  }
  function zV(Q, q, $, X) {
    q.then(void 0, function(Y) {
      queueMicrotask(() => GV(Q, Y, $, X));
    });
  }
  function GV(Q, q, $, X) {
    if (typeof Q[T7] === "function") Q[T7](q, $, ...X);
    else try {
      Q[Y1] = false, Q.emit("error", q);
    } finally {
      Q[Y1] = true;
    }
  }
  function y7(Q, q, $) {
    $.warned = true;
    let X = Error(`Possible EventEmitter memory leak detected. ${$.length} ${String(q)} listeners added to [${Q.constructor.name}]. Use emitter.setMaxListeners() to increase limit`);
    X.name = "MaxListenersExceededWarning", X.emitter = Q, X.type = q, X.count = $.length, console.warn(X);
  }
  function f7(Q, q, ...$) {
    this.removeListener(Q, q), q.apply(this, $);
  }
  function h7(Q, q, $) {
    var X = $?.signal;
    if (c7(X, "options.signal"), X?.aborted) throw new w5(void 0, { cause: X?.reason });
    let { resolve: Y, reject: J, promise: K } = $newPromiseCapability(Promise), U = (z) => {
      if (Q.removeListener(q, G), X != null) c6(X, "abort", V);
      J(z);
    }, G = (...z) => {
      if (typeof Q.removeListener === "function") Q.removeListener("error", U);
      if (X != null) c6(X, "abort", V);
      Y(z);
    };
    if (E7(Q, q, G, { once: true }), q !== "error" && typeof Q.once === "function") Q.once("error", U);
    function V() {
      c6(Q, q, G), c6(Q, "error", U), J(new w5(void 0, { cause: X?.reason }));
    }
    if (X != null) E7(X, "abort", V, { once: true });
    return K;
  }
  function _7(Q, q) {
    return Q.listeners(q);
  }
  function b7(Q, ...q) {
    L5(Q, "setMaxListeners", 0);
    var $;
    if (q && ($ = q.length)) for (let X = 0; X < $; X++) q[X].setMaxListeners(Q);
    else J1 = Q;
  }
  function u7(Q, q) {
    return Q.listenerCount(q);
  }
  function c6(Q, q, $, X) {
    if (typeof Q.removeListener === "function") Q.removeListener(q, $);
    else Q.removeEventListener(q, $, X);
  }
  function E7(Q, q, $, X) {
    if (typeof Q.on === "function") if (X.once) Q.once(q, $);
    else Q.on(q, $);
    else Q.addEventListener(q, $, X);
  }
  function A1(Q, q, $) {
    let X = TypeError(`The "${Q}" argument must be of type ${q}. Received ${$}`);
    return X.code = "ERR_INVALID_ARG_TYPE", X;
  }
  function ZV(Q, q, $) {
    let X = RangeError(`The "${Q}" argument is out of range. It must be ${q}. Received ${$}`);
    return X.code = "ERR_OUT_OF_RANGE", X;
  }
  function c7(Q, q) {
    if (Q !== void 0 && (Q === null || typeof Q !== "object" || !("aborted" in Q))) throw A1(q, "AbortSignal", Q);
  }
  function L5(Q, q, $, X) {
    if (typeof Q !== "number") throw A1(q, "number", Q);
    if ($ != null && Q < $ || X != null && Q > X || ($ != null || X != null) && Number.isNaN(Q)) throw ZV(q, `${$ != null ? `>= ${$}` : ""}${$ != null && X != null ? " && " : ""}${X != null ? `<= ${X}` : ""}`, Q);
  }
  function q6(Q) {
    if (typeof Q !== "function") throw TypeError("The listener must be a function");
  }
  function FV(Q, q) {
    if (typeof Q !== "boolean") throw A1(q, "boolean", Q);
  }
  function p7(Q) {
    return Q?._maxListeners ?? J1;
  }
  function m7(Q, q) {
    if (Q === void 0) throw A1("signal", "AbortSignal", Q);
    if (c7(Q, "signal"), typeof q !== "function") throw A1("listener", "function", q);
    let $;
    if (Q.aborted) queueMicrotask(() => q());
    else Q.addEventListener("abort", q, { __proto__: null, once: true }), $ = () => {
      Q.removeEventListener("abort", q);
    };
    return { __proto__: null, [Symbol.dispose]() {
      $?.();
    } };
  }
  var P5;
  var Y1;
  var S7;
  var UV;
  var VV;
  var T7;
  var k7;
  var v7;
  var J1 = 10;
  var h2 = function(Q) {
    if (this._events === void 0 || this._events === this.__proto__._events) this._events = { __proto__: null }, this._eventsCount = 0;
    if (this._maxListeners ??= void 0, this[Y1] = Q?.captureRejections ? Boolean(Q?.captureRejections) : I0[Y1]) this.emit = BV;
  };
  var I0;
  var WV = function(Q, ...q) {
    if (Q === "error") return g7(this, q);
    var { _events: $ } = this;
    if ($ === void 0) return false;
    var X = $[Q];
    if (X === void 0) return false;
    let Y = X.length > 1 ? X.slice() : X;
    for (let J = 0, { length: K } = Y; J < K; J++) {
      let U = Y[J];
      switch (q.length) {
        case 0:
          U.call(this);
          break;
        case 1:
          U.call(this, q[0]);
          break;
        case 2:
          U.call(this, q[0], q[1]);
          break;
        case 3:
          U.call(this, q[0], q[1], q[2]);
          break;
        default:
          U.apply(this, q);
          break;
      }
    }
    return true;
  };
  var BV = function(Q, ...q) {
    if (Q === "error") return g7(this, q);
    var { _events: $ } = this;
    if ($ === void 0) return false;
    var X = $[Q];
    if (X === void 0) return false;
    let Y = X.length > 1 ? X.slice() : X;
    for (let J = 0, { length: K } = Y; J < K; J++) {
      let U = Y[J], G;
      switch (q.length) {
        case 0:
          G = U.call(this);
          break;
        case 1:
          G = U.call(this, q[0]);
          break;
        case 2:
          G = U.call(this, q[0], q[1]);
          break;
        case 3:
          G = U.call(this, q[0], q[1], q[2]);
          break;
        default:
          G = U.apply(this, q);
          break;
      }
      if (G !== void 0 && typeof G?.then === "function" && G.then === Promise.prototype.then) zV(this, G, Q, q);
    }
    return true;
  };
  var w5;
  var jV;
  var X6 = U7(() => {
    P5 = Symbol.for, Y1 = /* @__PURE__ */ Symbol("kCapture"), S7 = P5("events.errorMonitor"), UV = /* @__PURE__ */ Symbol("events.maxEventTargetListeners"), VV = /* @__PURE__ */ Symbol("events.maxEventTargetListenersWarned"), T7 = P5("nodejs.rejection"), k7 = P5("nodejs.rejection"), v7 = Array.prototype.slice, I0 = h2.prototype = {};
    I0._events = void 0;
    I0._eventsCount = 0;
    I0._maxListeners = void 0;
    I0.setMaxListeners = function(Q) {
      return L5(Q, "setMaxListeners", 0), this._maxListeners = Q, this;
    };
    I0.constructor = h2;
    I0.getMaxListeners = function() {
      return this?._maxListeners ?? J1;
    };
    I0.emit = WV;
    I0.addListener = function(Q, q) {
      q6(q);
      var $ = this._events;
      if (!$) $ = this._events = { __proto__: null }, this._eventsCount = 0;
      else if ($.newListener) this.emit("newListener", Q, q.listener ?? q);
      var X = $[Q];
      if (!X) $[Q] = [q], this._eventsCount++;
      else {
        X.push(q);
        var Y = this._maxListeners ?? J1;
        if (Y > 0 && X.length > Y && !X.warned) y7(this, Q, X);
      }
      return this;
    };
    I0.on = I0.addListener;
    I0.prependListener = function(Q, q) {
      q6(q);
      var $ = this._events;
      if (!$) $ = this._events = { __proto__: null }, this._eventsCount = 0;
      else if ($.newListener) this.emit("newListener", Q, q.listener ?? q);
      var X = $[Q];
      if (!X) $[Q] = [q], this._eventsCount++;
      else {
        X.unshift(q);
        var Y = this._maxListeners ?? J1;
        if (Y > 0 && X.length > Y && !X.warned) y7(this, Q, X);
      }
      return this;
    };
    I0.once = function(Q, q) {
      q6(q);
      let $ = f7.bind(this, Q, q);
      return $.listener = q, this.addListener(Q, $), this;
    };
    I0.prependOnceListener = function(Q, q) {
      q6(q);
      let $ = f7.bind(this, Q, q);
      return $.listener = q, this.prependListener(Q, $), this;
    };
    I0.removeListener = function(Q, q) {
      q6(q);
      var { _events: $ } = this;
      if (!$) return this;
      var X = $[Q];
      if (!X) return this;
      var Y = X.length;
      let J = -1;
      for (let K = Y - 1; K >= 0; K--) if (X[K] === q || X[K].listener === q) {
        J = K;
        break;
      }
      if (J < 0) return this;
      if (J === 0) X.shift();
      else X.splice(J, 1);
      if (X.length === 0) delete $[Q], this._eventsCount--;
      return this;
    };
    I0.off = I0.removeListener;
    I0.removeAllListeners = function(Q) {
      var { _events: q } = this;
      if (Q && q) {
        if (q[Q]) delete q[Q], this._eventsCount--;
      } else this._events = { __proto__: null };
      return this;
    };
    I0.listeners = function(Q) {
      var { _events: q } = this;
      if (!q) return [];
      var $ = q[Q];
      if (!$) return [];
      return $.map((X) => X.listener ?? X);
    };
    I0.rawListeners = function(Q) {
      var { _events: q } = this;
      if (!q) return [];
      var $ = q[Q];
      if (!$) return [];
      return $.slice();
    };
    I0.listenerCount = function(Q) {
      var { _events: q } = this;
      if (!q) return 0;
      return q[Q]?.length ?? 0;
    };
    I0.eventNames = function() {
      return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
    };
    I0[Y1] = false;
    w5 = class w5 extends Error {
      constructor(Q = "The operation was aborted", q = void 0) {
        if (q !== void 0 && typeof q !== "object") throw A1("options", "Object", q);
        super(Q, q);
        this.code = "ABORT_ERR", this.name = "AbortError";
      }
    };
    Object.defineProperties(h2, { captureRejections: { get() {
      return I0[Y1];
    }, set(Q) {
      FV(Q, "EventEmitter.captureRejections"), I0[Y1] = Q;
    }, enumerable: true }, defaultMaxListeners: { enumerable: true, get: () => {
      return J1;
    }, set: (Q) => {
      L5(Q, "defaultMaxListeners", 0), J1 = Q;
    } }, kMaxEventTargetListeners: { value: UV, enumerable: false, configurable: false, writable: false }, kMaxEventTargetListenersWarned: { value: VV, enumerable: false, configurable: false, writable: false } });
    Object.assign(h2, { once: h7, getEventListeners: _7, getMaxListeners: p7, setMaxListeners: b7, EventEmitter: h2, usingDomains: false, captureRejectionSymbol: k7, errorMonitor: S7, addAbortListener: m7, init: h2, listenerCount: u7 });
    jV = h2;
  });
  var l6 = k((nw, s7) => {
    var w0 = (Q, q) => () => (q || Q((q = { exports: {} }).exports, q), q.exports), D0 = w0((Q, q) => {
      class $ extends Error {
        constructor(X) {
          if (!Array.isArray(X)) throw TypeError(`Expected input to be an Array, got ${typeof X}`);
          let Y = "";
          for (let J = 0; J < X.length; J++) Y += `    ${X[J].stack}
`;
          super(Y);
          this.name = "AggregateError", this.errors = X;
        }
      }
      q.exports = { AggregateError: $, ArrayIsArray(X) {
        return Array.isArray(X);
      }, ArrayPrototypeIncludes(X, Y) {
        return X.includes(Y);
      }, ArrayPrototypeIndexOf(X, Y) {
        return X.indexOf(Y);
      }, ArrayPrototypeJoin(X, Y) {
        return X.join(Y);
      }, ArrayPrototypeMap(X, Y) {
        return X.map(Y);
      }, ArrayPrototypePop(X, Y) {
        return X.pop(Y);
      }, ArrayPrototypePush(X, Y) {
        return X.push(Y);
      }, ArrayPrototypeSlice(X, Y, J) {
        return X.slice(Y, J);
      }, Error, FunctionPrototypeCall(X, Y, ...J) {
        return X.call(Y, ...J);
      }, FunctionPrototypeSymbolHasInstance(X, Y) {
        return Function.prototype[Symbol.hasInstance].call(X, Y);
      }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties(X, Y) {
        return Object.defineProperties(X, Y);
      }, ObjectDefineProperty(X, Y, J) {
        return Object.defineProperty(X, Y, J);
      }, ObjectGetOwnPropertyDescriptor(X, Y) {
        return Object.getOwnPropertyDescriptor(X, Y);
      }, ObjectKeys(X) {
        return Object.keys(X);
      }, ObjectSetPrototypeOf(X, Y) {
        return Object.setPrototypeOf(X, Y);
      }, Promise, PromisePrototypeCatch(X, Y) {
        return X.catch(Y);
      }, PromisePrototypeThen(X, Y, J) {
        return X.then(Y, J);
      }, PromiseReject(X) {
        return Promise.reject(X);
      }, PromiseResolve(X) {
        return Promise.resolve(X);
      }, ReflectApply: Reflect.apply, RegExpPrototypeTest(X, Y) {
        return X.test(Y);
      }, SafeSet: Set, String, StringPrototypeSlice(X, Y, J) {
        return X.slice(Y, J);
      }, StringPrototypeToLowerCase(X) {
        return X.toLowerCase();
      }, StringPrototypeToUpperCase(X) {
        return X.toUpperCase();
      }, StringPrototypeTrim(X) {
        return X.trim();
      }, Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"), SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"), TypedArrayPrototypeSet(X, Y, J) {
        return X.set(Y, J);
      }, Boolean, Uint8Array };
    }), d7 = w0((Q, q) => {
      q.exports = { format($, ...X) {
        return $.replace(/%([sdifj])/g, function(...[Y, J]) {
          let K = X.shift();
          if (J === "f") return K.toFixed(6);
          else if (J === "j") return JSON.stringify(K);
          else if (J === "s" && typeof K === "object") return `${K.constructor !== Object ? K.constructor.name : ""} {}`.trim();
          else return K.toString();
        });
      }, inspect($) {
        switch (typeof $) {
          case "string":
            if ($.includes("'")) {
              if (!$.includes('"')) return `"${$}"`;
              else if (!$.includes("`") && !$.includes("${")) return `\`${$}\``;
            }
            return `'${$}'`;
          case "number":
            if (isNaN($)) return "NaN";
            else if (Object.is($, -0)) return String($);
            return $;
          case "bigint":
            return `${String($)}n`;
          case "boolean":
          case "undefined":
            return String($);
          case "object":
            return "{}";
        }
      } };
    }), _0 = w0((Q, q) => {
      var { format: $, inspect: X } = d7(), { AggregateError: Y } = D0(), J = globalThis.AggregateError || Y, K = /* @__PURE__ */ Symbol("kIsNodeError"), U = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], G = /^([A-Z][a-z0-9]*)+$/, V = {};
      function z(N, W) {
        if (!N) throw new V.ERR_INTERNAL_ASSERTION(W);
      }
      function H(N) {
        let W = "", M = N.length, w = N[0] === "-" ? 1 : 0;
        for (; M >= w + 4; M -= 3) W = `_${N.slice(M - 3, M)}${W}`;
        return `${N.slice(0, M)}${W}`;
      }
      function j(N, W, M) {
        if (typeof W === "function") return z(W.length <= M.length, `Code: ${N}; The provided arguments length (${M.length}) does not match the required ones (${W.length}).`), W(...M);
        let w = (W.match(/%[dfijoOs]/g) || []).length;
        if (z(w === M.length, `Code: ${N}; The provided arguments length (${M.length}) does not match the required ones (${w}).`), M.length === 0) return W;
        return $(W, ...M);
      }
      function Z(N, W, M) {
        if (!M) M = Error;
        class w extends M {
          constructor(...I) {
            super(j(N, W, I));
          }
          toString() {
            return `${this.name} [${N}]: ${this.message}`;
          }
        }
        Object.defineProperties(w.prototype, { name: { value: M.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
          return `${this.name} [${N}]: ${this.message}`;
        }, writable: true, enumerable: false, configurable: true } }), w.prototype.code = N, w.prototype[K] = true, V[N] = w;
      }
      function h(N) {
        let W = "__node_internal_" + N.name;
        return Object.defineProperty(N, "name", { value: W }), N;
      }
      function g(N, W) {
        if (N && W && N !== W) {
          if (Array.isArray(W.errors)) return W.errors.push(N), W;
          let M = new J([W, N], W.message);
          return M.code = W.code, M;
        }
        return N || W;
      }
      class C extends Error {
        constructor(N = "The operation was aborted", W = void 0) {
          if (W !== void 0 && typeof W !== "object") throw new V.ERR_INVALID_ARG_TYPE("options", "Object", W);
          super(N, W);
          this.code = "ABORT_ERR", this.name = "AbortError";
        }
      }
      Z("ERR_ASSERTION", "%s", Error), Z("ERR_INVALID_ARG_TYPE", (N, W, M) => {
        if (z(typeof N === "string", "'name' must be a string"), !Array.isArray(W)) W = [W];
        let w = "The ";
        if (N.endsWith(" argument")) w += `${N} `;
        else w += `"${N}" ${N.includes(".") ? "property" : "argument"} `;
        w += "must be ";
        let I = [], f = [], E = [];
        for (let R of W) if (z(typeof R === "string", "All expected entries have to be of type string"), U.includes(R)) I.push(R.toLowerCase());
        else if (G.test(R)) f.push(R);
        else z(R !== "object", 'The value "object" should be written as "Object"'), E.push(R);
        if (f.length > 0) {
          let R = I.indexOf("object");
          if (R !== -1) I.splice(I, R, 1), f.push("Object");
        }
        if (I.length > 0) {
          switch (I.length) {
            case 1:
              w += `of type ${I[0]}`;
              break;
            case 2:
              w += `one of type ${I[0]} or ${I[1]}`;
              break;
            default: {
              let R = I.pop();
              w += `one of type ${I.join(", ")}, or ${R}`;
            }
          }
          if (f.length > 0 || E.length > 0) w += " or ";
        }
        if (f.length > 0) {
          switch (f.length) {
            case 1:
              w += `an instance of ${f[0]}`;
              break;
            case 2:
              w += `an instance of ${f[0]} or ${f[1]}`;
              break;
            default: {
              let R = f.pop();
              w += `an instance of ${f.join(", ")}, or ${R}`;
            }
          }
          if (E.length > 0) w += " or ";
        }
        switch (E.length) {
          case 0:
            break;
          case 1:
            if (E[0].toLowerCase() !== E[0]) w += "an ";
            w += `${E[0]}`;
            break;
          case 2:
            w += `one of ${E[0]} or ${E[1]}`;
            break;
          default: {
            let R = E.pop();
            w += `one of ${E.join(", ")}, or ${R}`;
          }
        }
        if (M == null) w += `. Received ${M}`;
        else if (typeof M === "function" && M.name) w += `. Received function ${M.name}`;
        else if (typeof M === "object") {
          var d;
          if ((d = M.constructor) !== null && d !== void 0 && d.name) w += `. Received an instance of ${M.constructor.name}`;
          else {
            let R = X(M, { depth: -1 });
            w += `. Received ${R}`;
          }
        } else {
          let R = X(M, { colors: false });
          if (R.length > 25) R = `${R.slice(0, 25)}...`;
          w += `. Received type ${typeof M} (${R})`;
        }
        return w;
      }, TypeError), Z("ERR_INVALID_ARG_VALUE", (N, W, M = "is invalid") => {
        let w = X(W);
        if (w.length > 128) w = w.slice(0, 128) + "...";
        return `The ${N.includes(".") ? "property" : "argument"} '${N}' ${M}. Received ${w}`;
      }, TypeError), Z("ERR_INVALID_RETURN_VALUE", (N, W, M) => {
        var w;
        let I = M !== null && M !== void 0 && (w = M.constructor) !== null && w !== void 0 && w.name ? `instance of ${M.constructor.name}` : `type ${typeof M}`;
        return `Expected ${N} to be returned from the "${W}" function but got ${I}.`;
      }, TypeError), Z("ERR_MISSING_ARGS", (...N) => {
        z(N.length > 0, "At least one arg needs to be specified");
        let W, M = N.length;
        switch (N = (Array.isArray(N) ? N : [N]).map((w) => `"${w}"`).join(" or "), M) {
          case 1:
            W += `The ${N[0]} argument`;
            break;
          case 2:
            W += `The ${N[0]} and ${N[1]} arguments`;
            break;
          default:
            {
              let w = N.pop();
              W += `The ${N.join(", ")}, and ${w} arguments`;
            }
            break;
        }
        return `${W} must be specified`;
      }, TypeError), Z("ERR_OUT_OF_RANGE", (N, W, M) => {
        z(W, 'Missing "range" argument');
        let w;
        if (Number.isInteger(M) && Math.abs(M) > 4294967296) w = H(String(M));
        else if (typeof M === "bigint") {
          w = String(M);
          let I = BigInt(2) ** BigInt(32);
          if (M > I || M < -I) w = H(w);
          w += "n";
        } else w = X(M);
        return `The value of "${N}" is out of range. It must be ${W}. Received ${w}`;
      }, RangeError), Z("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), Z("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), Z("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), Z("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), Z("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), Z("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), Z("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), Z("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), Z("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), Z("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), Z("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), q.exports = { AbortError: C, aggregateTwoErrors: h(g), hideStackFrames: h, codes: V };
    }), HV = w0((Q, q) => {
      Object.defineProperty(Q, "__esModule", { value: true });
      var $ = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap();
      function Y(x) {
        let D = $.get(x);
        return console.assert(D != null, "'this' is expected an Event object, but got", x), D;
      }
      function J(x) {
        if (x.passiveListener != null) {
          if (typeof console < "u" && typeof console.error === "function") console.error("Unable to preventDefault inside passive event listener invocation.", x.passiveListener);
          return;
        }
        if (!x.event.cancelable) return;
        if (x.canceled = true, typeof x.event.preventDefault === "function") x.event.preventDefault();
      }
      function K(x, D) {
        $.set(this, { eventTarget: x, event: D, eventPhase: 2, currentTarget: x, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: D.timeStamp || Date.now() }), Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
        let L = Object.keys(D);
        for (let S = 0; S < L.length; ++S) {
          let y = L[S];
          if (!(y in this)) Object.defineProperty(this, y, U(y));
        }
      }
      if (K.prototype = { get type() {
        return Y(this).event.type;
      }, get target() {
        return Y(this).eventTarget;
      }, get currentTarget() {
        return Y(this).currentTarget;
      }, composedPath() {
        let x = Y(this).currentTarget;
        if (x == null) return [];
        return [x];
      }, get NONE() {
        return 0;
      }, get CAPTURING_PHASE() {
        return 1;
      }, get AT_TARGET() {
        return 2;
      }, get BUBBLING_PHASE() {
        return 3;
      }, get eventPhase() {
        return Y(this).eventPhase;
      }, stopPropagation() {
        let x = Y(this);
        if (x.stopped = true, typeof x.event.stopPropagation === "function") x.event.stopPropagation();
      }, stopImmediatePropagation() {
        let x = Y(this);
        if (x.stopped = true, x.immediateStopped = true, typeof x.event.stopImmediatePropagation === "function") x.event.stopImmediatePropagation();
      }, get bubbles() {
        return Boolean(Y(this).event.bubbles);
      }, get cancelable() {
        return Boolean(Y(this).event.cancelable);
      }, preventDefault() {
        J(Y(this));
      }, get defaultPrevented() {
        return Y(this).canceled;
      }, get composed() {
        return Boolean(Y(this).event.composed);
      }, get timeStamp() {
        return Y(this).timeStamp;
      }, get srcElement() {
        return Y(this).eventTarget;
      }, get cancelBubble() {
        return Y(this).stopped;
      }, set cancelBubble(x) {
        if (!x) return;
        let D = Y(this);
        if (D.stopped = true, typeof D.event.cancelBubble === "boolean") D.event.cancelBubble = true;
      }, get returnValue() {
        return !Y(this).canceled;
      }, set returnValue(x) {
        if (!x) J(Y(this));
      }, initEvent() {
      } }, Object.defineProperty(K.prototype, "constructor", { value: K, configurable: true, writable: true }), typeof window < "u" && typeof window.Event < "u") Object.setPrototypeOf(K.prototype, window.Event.prototype), X.set(window.Event.prototype, K);
      function U(x) {
        return { get() {
          return Y(this).event[x];
        }, set(D) {
          Y(this).event[x] = D;
        }, configurable: true, enumerable: true };
      }
      function G(x) {
        return { value() {
          let D = Y(this).event;
          return D[x].apply(D, arguments);
        }, configurable: true, enumerable: true };
      }
      function V(x, D) {
        let L = Object.keys(D);
        if (L.length === 0) return x;
        function S(y, v) {
          x.call(this, y, v);
        }
        S.prototype = Object.create(x.prototype, { constructor: { value: S, configurable: true, writable: true } });
        for (let y = 0; y < L.length; ++y) {
          let v = L[y];
          if (!(v in x.prototype)) {
            let a = typeof Object.getOwnPropertyDescriptor(D, v).value === "function";
            Object.defineProperty(S.prototype, v, a ? G(v) : U(v));
          }
        }
        return S;
      }
      function z(x) {
        if (x == null || x === Object.prototype) return K;
        let D = X.get(x);
        if (D == null) D = V(z(Object.getPrototypeOf(x)), x), X.set(x, D);
        return D;
      }
      function H(x, D) {
        return new (z(Object.getPrototypeOf(D)))(x, D);
      }
      function j(x) {
        return Y(x).immediateStopped;
      }
      function Z(x, D) {
        Y(x).eventPhase = D;
      }
      function h(x, D) {
        Y(x).currentTarget = D;
      }
      function g(x, D) {
        Y(x).passiveListener = D;
      }
      var C = /* @__PURE__ */ new WeakMap(), N = 1, W = 2, M = 3;
      function w(x) {
        return x !== null && typeof x === "object";
      }
      function I(x) {
        let D = C.get(x);
        if (D == null) throw TypeError("'this' is expected an EventTarget object, but got another value.");
        return D;
      }
      function f(x) {
        return { get() {
          let D = I(this).get(x);
          while (D != null) {
            if (D.listenerType === M) return D.listener;
            D = D.next;
          }
          return null;
        }, set(D) {
          if (typeof D !== "function" && !w(D)) D = null;
          let L = I(this), S = null, y = L.get(x);
          while (y != null) {
            if (y.listenerType === M) if (S !== null) S.next = y.next;
            else if (y.next !== null) L.set(x, y.next);
            else L.delete(x);
            else S = y;
            y = y.next;
          }
          if (D !== null) {
            let v = { listener: D, listenerType: M, passive: false, once: false, next: null };
            if (S === null) L.set(x, v);
            else S.next = v;
          }
        }, configurable: true, enumerable: true };
      }
      function E(x, D) {
        Object.defineProperty(x, `on${D}`, f(D));
      }
      function d(x) {
        function D() {
          R.call(this);
        }
        D.prototype = Object.create(R.prototype, { constructor: { value: D, configurable: true, writable: true } });
        for (let L = 0; L < x.length; ++L) E(D.prototype, x[L]);
        return D;
      }
      function R() {
        if (this instanceof R) {
          C.set(this, /* @__PURE__ */ new Map());
          return;
        }
        if (arguments.length === 1 && Array.isArray(arguments[0])) return d(arguments[0]);
        if (arguments.length > 0) {
          let x = Array(arguments.length);
          for (let D = 0; D < arguments.length; ++D) x[D] = arguments[D];
          return d(x);
        }
        throw TypeError("Cannot call a class as a function");
      }
      if (R.prototype = { addEventListener(x, D, L) {
        if (D == null) return;
        if (typeof D !== "function" && !w(D)) throw TypeError("'listener' should be a function or an object.");
        let S = I(this), y = w(L), v = (y ? Boolean(L.capture) : Boolean(L)) ? N : W, a = { listener: D, listenerType: v, passive: y && Boolean(L.passive), once: y && Boolean(L.once), next: null }, Q0 = S.get(x);
        if (Q0 === void 0) {
          S.set(x, a);
          return;
        }
        let Y0 = null;
        while (Q0 != null) {
          if (Q0.listener === D && Q0.listenerType === v) return;
          Y0 = Q0, Q0 = Q0.next;
        }
        Y0.next = a;
      }, removeEventListener(x, D, L) {
        if (D == null) return;
        let S = I(this), y = (w(L) ? Boolean(L.capture) : Boolean(L)) ? N : W, v = null, a = S.get(x);
        while (a != null) {
          if (a.listener === D && a.listenerType === y) {
            if (v !== null) v.next = a.next;
            else if (a.next !== null) S.set(x, a.next);
            else S.delete(x);
            return;
          }
          v = a, a = a.next;
        }
      }, dispatchEvent(x) {
        if (x == null || typeof x.type !== "string") throw TypeError('"event.type" should be a string.');
        let D = I(this), L = x.type, S = D.get(L);
        if (S == null) return true;
        let y = H(this, x), v = null;
        while (S != null) {
          if (S.once) if (v !== null) v.next = S.next;
          else if (S.next !== null) D.set(L, S.next);
          else D.delete(L);
          else v = S;
          if (g(y, S.passive ? S.listener : null), typeof S.listener === "function") try {
            S.listener.call(this, y);
          } catch (a) {
            if (typeof console < "u" && typeof console.error === "function") console.error(a);
          }
          else if (S.listenerType !== M && typeof S.listener.handleEvent === "function") S.listener.handleEvent(y);
          if (j(y)) break;
          S = S.next;
        }
        return g(y, null), Z(y, 0), h(y, null), !y.defaultPrevented;
      } }, Object.defineProperty(R.prototype, "constructor", { value: R, configurable: true, writable: true }), typeof window < "u" && typeof window.EventTarget < "u") Object.setPrototypeOf(R.prototype, window.EventTarget.prototype);
      Q.defineEventAttribute = E, Q.EventTarget = R, Q.default = R, q.exports = R, q.exports.EventTarget = q.exports.default = R, q.exports.defineEventAttribute = E;
    }), Y6 = w0((Q, q) => {
      Object.defineProperty(Q, "__esModule", { value: true });
      var $ = HV();
      class X extends $.EventTarget {
        constructor() {
          super();
          throw TypeError("AbortSignal cannot be constructed directly");
        }
        get aborted() {
          let z = K.get(this);
          if (typeof z !== "boolean") throw TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
          return z;
        }
      }
      $.defineEventAttribute(X.prototype, "abort");
      function Y() {
        let z = Object.create(X.prototype);
        return $.EventTarget.call(z), K.set(z, false), z;
      }
      function J(z) {
        if (K.get(z) !== false) return;
        K.set(z, true), z.dispatchEvent({ type: "abort" });
      }
      var K = /* @__PURE__ */ new WeakMap();
      if (Object.defineProperties(X.prototype, { aborted: { enumerable: true } }), typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") Object.defineProperty(X.prototype, Symbol.toStringTag, { configurable: true, value: "AbortSignal" });
      class U {
        constructor() {
          G.set(this, Y());
        }
        get signal() {
          return V(this);
        }
        abort() {
          J(V(this));
        }
      }
      var G = /* @__PURE__ */ new WeakMap();
      function V(z) {
        let H = G.get(z);
        if (H == null) throw TypeError(`Expected 'this' to be an 'AbortController' object, but got ${z === null ? "null" : typeof z}`);
        return H;
      }
      if (Object.defineProperties(U.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") Object.defineProperty(U.prototype, Symbol.toStringTag, { configurable: true, value: "AbortController" });
      Q.AbortController = U, Q.AbortSignal = X, Q.default = U, q.exports = U, q.exports.AbortController = q.exports.default = U, q.exports.AbortSignal = X;
    }), m0 = w0((Q, q) => {
      var $ = (O2(), a0(A2)), { format: X, inspect: Y } = d7(), { codes: { ERR_INVALID_ARG_TYPE: J } } = _0(), { kResistStopPropagation: K, AggregateError: U, SymbolDispose: G } = D0(), V = globalThis.AbortSignal || Y6().AbortSignal, z = globalThis.AbortController || Y6().AbortController, H = Object.getPrototypeOf(async function() {
      }).constructor, j = globalThis.Blob || $.Blob, Z = typeof j < "u" ? function(C) {
        return C instanceof j;
      } : function(C) {
        return false;
      }, h = (C, N) => {
        if (C !== void 0 && (C === null || typeof C !== "object" || !("aborted" in C))) throw new J(N, "AbortSignal", C);
      }, g = (C, N) => {
        if (typeof C !== "function") throw new J(N, "Function", C);
      };
      q.exports = { AggregateError: U, kEmptyObject: Object.freeze({}), once(C) {
        let N = false;
        return function(...W) {
          if (N) return;
          N = true, C.apply(this, W);
        };
      }, createDeferredPromise: function() {
        let C, N;
        return { promise: new Promise((W, M) => {
          C = W, N = M;
        }), resolve: C, reject: N };
      }, promisify(C) {
        return new Promise((N, W) => {
          C((M, ...w) => {
            if (M) return W(M);
            return N(...w);
          });
        });
      }, debuglog() {
        return function() {
        };
      }, format: X, inspect: Y, types: { isAsyncFunction(C) {
        return C instanceof H;
      }, isArrayBufferView(C) {
        return ArrayBuffer.isView(C);
      } }, isBlob: Z, deprecate(C, N) {
        return C;
      }, addAbortListener: (X6(), a0($6)).addAbortListener || function(C, N) {
        if (C === void 0) throw new J("signal", "AbortSignal", C);
        h(C, "signal"), g(N, "listener");
        let W;
        if (C.aborted) queueMicrotask(() => N());
        else C.addEventListener("abort", N, { __proto__: null, once: true, [K]: true }), W = () => {
          C.removeEventListener("abort", N);
        };
        return { __proto__: null, [G]() {
          var M;
          (M = W) === null || M === void 0 || M();
        } };
      }, AbortSignalAny: V.any || function(C) {
        if (C.length === 1) return C[0];
        let N = new z(), W = () => N.abort();
        return C.forEach((M) => {
          h(M, "signals"), M.addEventListener("abort", W, { once: true });
        }), N.signal.addEventListener("abort", () => {
          C.forEach((M) => M.removeEventListener("abort", W));
        }, { once: true }), N.signal;
      } }, q.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
    }), J6 = w0((Q, q) => {
      var { ArrayIsArray: $, ArrayPrototypeIncludes: X, ArrayPrototypeJoin: Y, ArrayPrototypeMap: J, NumberIsInteger: K, NumberIsNaN: U, NumberMAX_SAFE_INTEGER: G, NumberMIN_SAFE_INTEGER: V, NumberParseInt: z, ObjectPrototypeHasOwnProperty: H, RegExpPrototypeExec: j, String: Z, StringPrototypeToUpperCase: h, StringPrototypeTrim: g } = D0(), { hideStackFrames: C, codes: { ERR_SOCKET_BAD_PORT: N, ERR_INVALID_ARG_TYPE: W, ERR_INVALID_ARG_VALUE: M, ERR_OUT_OF_RANGE: w, ERR_UNKNOWN_SIGNAL: I } } = _0(), { normalizeEncoding: f } = m0(), { isAsyncFunction: E, isArrayBufferView: d } = m0().types, R = {};
      function x(O) {
        return O === (O | 0);
      }
      function D(O) {
        return O === O >>> 0;
      }
      var L = /^[0-7]+$/, S = "must be a 32-bit unsigned integer or an octal string";
      function y(O, i, q0) {
        if (typeof O > "u") O = q0;
        if (typeof O === "string") {
          if (j(L, O) === null) throw new M(i, O, S);
          O = z(O, 8);
        }
        return Q0(O, i), O;
      }
      var v = C((O, i, q0 = V, o = G) => {
        if (typeof O !== "number") throw new W(i, "number", O);
        if (!K(O)) throw new w(i, "an integer", O);
        if (O < q0 || O > o) throw new w(i, `>= ${q0} && <= ${o}`, O);
      }), a = C((O, i, q0 = -2147483648, o = 2147483647) => {
        if (typeof O !== "number") throw new W(i, "number", O);
        if (!K(O)) throw new w(i, "an integer", O);
        if (O < q0 || O > o) throw new w(i, `>= ${q0} && <= ${o}`, O);
      }), Q0 = C((O, i, q0 = false) => {
        if (typeof O !== "number") throw new W(i, "number", O);
        if (!K(O)) throw new w(i, "an integer", O);
        let o = q0 ? 1 : 0, V0 = 4294967295;
        if (O < o || O > V0) throw new w(i, `>= ${o} && <= ${V0}`, O);
      });
      function Y0(O, i) {
        if (typeof O !== "string") throw new W(i, "string", O);
      }
      function B0(O, i, q0 = void 0, o) {
        if (typeof O !== "number") throw new W(i, "number", O);
        if (q0 != null && O < q0 || o != null && O > o || (q0 != null || o != null) && U(O)) throw new w(i, `${q0 != null ? `>= ${q0}` : ""}${q0 != null && o != null ? " && " : ""}${o != null ? `<= ${o}` : ""}`, O);
      }
      var c = C((O, i, q0) => {
        if (!X(q0, O)) {
          let o = "must be one of: " + Y(J(q0, (V0) => typeof V0 === "string" ? `'${V0}'` : Z(V0)), ", ");
          throw new M(i, O, o);
        }
      });
      function U0(O, i) {
        if (typeof O !== "boolean") throw new W(i, "boolean", O);
      }
      function P(O, i, q0) {
        return O == null || !H(O, i) ? q0 : O[i];
      }
      var l = C((O, i, q0 = null) => {
        let o = P(q0, "allowArray", false), V0 = P(q0, "allowFunction", false);
        if (!P(q0, "nullable", false) && O === null || !o && $(O) || typeof O !== "object" && (!V0 || typeof O !== "function")) throw new W(i, "Object", O);
      }), $0 = C((O, i) => {
        if (O != null && typeof O !== "object" && typeof O !== "function") throw new W(i, "a dictionary", O);
      }), u = C((O, i, q0 = 0) => {
        if (!$(O)) throw new W(i, "Array", O);
        if (O.length < q0) {
          let o = `must be longer than ${q0}`;
          throw new M(i, O, o);
        }
      });
      function K0(O, i) {
        u(O, i);
        for (let q0 = 0; q0 < O.length; q0++) Y0(O[q0], `${i}[${q0}]`);
      }
      function z0(O, i) {
        u(O, i);
        for (let q0 = 0; q0 < O.length; q0++) U0(O[q0], `${i}[${q0}]`);
      }
      function j0(O, i) {
        u(O, i);
        for (let q0 = 0; q0 < O.length; q0++) {
          let o = O[q0], V0 = `${i}[${q0}]`;
          if (o == null) throw new W(V0, "AbortSignal", o);
          G0(o, V0);
        }
      }
      function Z0(O, i = "signal") {
        if (Y0(O, i), R[O] === void 0) {
          if (R[h(O)] !== void 0) throw new I(O + " (signals must use all capital letters)");
          throw new I(O);
        }
      }
      var p = C((O, i = "buffer") => {
        if (!d(O)) throw new W(i, ["Buffer", "TypedArray", "DataView"], O);
      });
      function m(O, i) {
        let q0 = f(i), o = O.length;
        if (q0 === "hex" && o % 2 !== 0) throw new M("encoding", i, `is invalid for data of length ${o}`);
      }
      function s(O, i = "Port", q0 = true) {
        if (typeof O !== "number" && typeof O !== "string" || typeof O === "string" && g(O).length === 0 || +O !== +O >>> 0 || O > 65535 || O === 0 && !q0) throw new N(i, O, q0);
        return O | 0;
      }
      var G0 = C((O, i) => {
        if (O !== void 0 && (O === null || typeof O !== "object" || !("aborted" in O))) throw new W(i, "AbortSignal", O);
      }), W0 = C((O, i) => {
        if (typeof O !== "function") throw new W(i, "Function", O);
      }), A = C((O, i) => {
        if (typeof O !== "function" || E(O)) throw new W(i, "Function", O);
      }), T = C((O, i) => {
        if (O !== void 0) throw new W(i, "undefined", O);
      });
      function b(O, i, q0) {
        if (!X(q0, O)) throw new W(i, `('${Y(q0, "|")}')`, O);
      }
      var r = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
      function e(O, i) {
        if (typeof O > "u" || !j(r, O)) throw new M(i, O, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
      }
      function t(O) {
        if (typeof O === "string") return e(O, "hints"), O;
        else if ($(O)) {
          let i = O.length, q0 = "";
          if (i === 0) return q0;
          for (let o = 0; o < i; o++) {
            let V0 = O[o];
            if (e(V0, "hints"), q0 += V0, o !== i - 1) q0 += ", ";
          }
          return q0;
        }
        throw new M("hints", O, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
      }
      q.exports = { isInt32: x, isUint32: D, parseFileMode: y, validateArray: u, validateStringArray: K0, validateBooleanArray: z0, validateAbortSignalArray: j0, validateBoolean: U0, validateBuffer: p, validateDictionary: $0, validateEncoding: m, validateFunction: W0, validateInt32: a, validateInteger: v, validateNumber: B0, validateObject: l, validateOneOf: c, validatePlainFunction: A, validatePort: s, validateSignalName: Z0, validateString: Y0, validateUint32: Q0, validateUndefined: T, validateUnion: b, validateAbortSignal: G0, validateLinkHeaderValue: t };
    }), K1 = w0((Q, q) => {
      q.exports = globalThis.process;
    }), x2 = w0((Q, q) => {
      var { SymbolAsyncIterator: $, SymbolIterator: X, SymbolFor: Y } = D0(), J = Y("nodejs.stream.destroyed"), K = Y("nodejs.stream.errored"), U = Y("nodejs.stream.readable"), G = Y("nodejs.stream.writable"), V = Y("nodejs.stream.disturbed"), z = Y("nodejs.webstream.isClosedPromise"), H = Y("nodejs.webstream.controllerErrorFunction");
      function j(P, l = false) {
        var $0;
        return !!(P && typeof P.pipe === "function" && typeof P.on === "function" && (!l || typeof P.pause === "function" && typeof P.resume === "function") && (!P._writableState || (($0 = P._readableState) === null || $0 === void 0 ? void 0 : $0.readable) !== false) && (!P._writableState || P._readableState));
      }
      function Z(P) {
        var l;
        return !!(P && typeof P.write === "function" && typeof P.on === "function" && (!P._readableState || ((l = P._writableState) === null || l === void 0 ? void 0 : l.writable) !== false));
      }
      function h(P) {
        return !!(P && typeof P.pipe === "function" && P._readableState && typeof P.on === "function" && typeof P.write === "function");
      }
      function g(P) {
        return P && (P._readableState || P._writableState || typeof P.write === "function" && typeof P.on === "function" || typeof P.pipe === "function" && typeof P.on === "function");
      }
      function C(P) {
        return !!(P && !g(P) && typeof P.pipeThrough === "function" && typeof P.getReader === "function" && typeof P.cancel === "function");
      }
      function N(P) {
        return !!(P && !g(P) && typeof P.getWriter === "function" && typeof P.abort === "function");
      }
      function W(P) {
        return !!(P && !g(P) && typeof P.readable === "object" && typeof P.writable === "object");
      }
      function M(P) {
        return C(P) || N(P) || W(P);
      }
      function w(P, l) {
        if (P == null) return false;
        if (l === true) return typeof P[$] === "function";
        if (l === false) return typeof P[X] === "function";
        return typeof P[$] === "function" || typeof P[X] === "function";
      }
      function I(P) {
        if (!g(P)) return null;
        let { _writableState: l, _readableState: $0 } = P, u = l || $0;
        return !!(P.destroyed || P[J] || u !== null && u !== void 0 && u.destroyed);
      }
      function f(P) {
        if (!Z(P)) return null;
        if (P.writableEnded === true) return true;
        let l = P._writableState;
        if (l !== null && l !== void 0 && l.errored) return false;
        if (typeof (l === null || l === void 0 ? void 0 : l.ended) !== "boolean") return null;
        return l.ended;
      }
      function E(P, l) {
        if (!Z(P)) return null;
        if (P.writableFinished === true) return true;
        let $0 = P._writableState;
        if ($0 !== null && $0 !== void 0 && $0.errored) return false;
        if (typeof ($0 === null || $0 === void 0 ? void 0 : $0.finished) !== "boolean") return null;
        return !!($0.finished || l === false && $0.ended === true && $0.length === 0);
      }
      function d(P) {
        if (!j(P)) return null;
        if (P.readableEnded === true) return true;
        let l = P._readableState;
        if (!l || l.errored) return false;
        if (typeof (l === null || l === void 0 ? void 0 : l.ended) !== "boolean") return null;
        return l.ended;
      }
      function R(P, l) {
        if (!j(P)) return null;
        let $0 = P._readableState;
        if ($0 !== null && $0 !== void 0 && $0.errored) return false;
        if (typeof ($0 === null || $0 === void 0 ? void 0 : $0.endEmitted) !== "boolean") return null;
        return !!($0.endEmitted || l === false && $0.ended === true && $0.length === 0);
      }
      function x(P) {
        if (P && P[U] != null) return P[U];
        if (typeof (P === null || P === void 0 ? void 0 : P.readable) !== "boolean") return null;
        if (I(P)) return false;
        return j(P) && P.readable && !R(P);
      }
      function D(P) {
        if (P && P[G] != null) return P[G];
        if (typeof (P === null || P === void 0 ? void 0 : P.writable) !== "boolean") return null;
        if (I(P)) return false;
        return Z(P) && P.writable && !f(P);
      }
      function L(P, l) {
        if (!g(P)) return null;
        if (I(P)) return true;
        if ((l === null || l === void 0 ? void 0 : l.readable) !== false && x(P)) return false;
        if ((l === null || l === void 0 ? void 0 : l.writable) !== false && D(P)) return false;
        return true;
      }
      function S(P) {
        var l, $0;
        if (!g(P)) return null;
        if (P.writableErrored) return P.writableErrored;
        return (l = ($0 = P._writableState) === null || $0 === void 0 ? void 0 : $0.errored) !== null && l !== void 0 ? l : null;
      }
      function y(P) {
        var l, $0;
        if (!g(P)) return null;
        if (P.readableErrored) return P.readableErrored;
        return (l = ($0 = P._readableState) === null || $0 === void 0 ? void 0 : $0.errored) !== null && l !== void 0 ? l : null;
      }
      function v(P) {
        if (!g(P)) return null;
        if (typeof P.closed === "boolean") return P.closed;
        let { _writableState: l, _readableState: $0 } = P;
        if (typeof (l === null || l === void 0 ? void 0 : l.closed) === "boolean" || typeof ($0 === null || $0 === void 0 ? void 0 : $0.closed) === "boolean") return (l === null || l === void 0 ? void 0 : l.closed) || ($0 === null || $0 === void 0 ? void 0 : $0.closed);
        if (typeof P._closed === "boolean" && a(P)) return P._closed;
        return null;
      }
      function a(P) {
        return typeof P._closed === "boolean" && typeof P._defaultKeepAlive === "boolean" && typeof P._removedConnection === "boolean" && typeof P._removedContLen === "boolean";
      }
      function Q0(P) {
        return typeof P._sent100 === "boolean" && a(P);
      }
      function Y0(P) {
        var l;
        return typeof P._consuming === "boolean" && typeof P._dumped === "boolean" && ((l = P.req) === null || l === void 0 ? void 0 : l.upgradeOrConnect) === void 0;
      }
      function B0(P) {
        if (!g(P)) return null;
        let { _writableState: l, _readableState: $0 } = P, u = l || $0;
        return !u && Q0(P) || !!(u && u.autoDestroy && u.emitClose && u.closed === false);
      }
      function c(P) {
        var l;
        return !!(P && ((l = P[V]) !== null && l !== void 0 ? l : P.readableDidRead || P.readableAborted));
      }
      function U0(P) {
        var l, $0, u, K0, z0, j0, Z0, p, m, s;
        return !!(P && ((l = ($0 = (u = (K0 = (z0 = (j0 = P[K]) !== null && j0 !== void 0 ? j0 : P.readableErrored) !== null && z0 !== void 0 ? z0 : P.writableErrored) !== null && K0 !== void 0 ? K0 : (Z0 = P._readableState) === null || Z0 === void 0 ? void 0 : Z0.errorEmitted) !== null && u !== void 0 ? u : (p = P._writableState) === null || p === void 0 ? void 0 : p.errorEmitted) !== null && $0 !== void 0 ? $0 : (m = P._readableState) === null || m === void 0 ? void 0 : m.errored) !== null && l !== void 0 ? l : (s = P._writableState) === null || s === void 0 ? void 0 : s.errored));
      }
      q.exports = { isDestroyed: I, kIsDestroyed: J, isDisturbed: c, kIsDisturbed: V, isErrored: U0, kIsErrored: K, isReadable: x, kIsReadable: U, kIsClosedPromise: z, kControllerErrorFunction: H, kIsWritable: G, isClosed: v, isDuplexNodeStream: h, isFinished: L, isIterable: w, isReadableNodeStream: j, isReadableStream: C, isReadableEnded: d, isReadableFinished: R, isReadableErrored: y, isNodeStream: g, isWebStream: M, isWritable: D, isWritableNodeStream: Z, isWritableStream: N, isWritableEnded: f, isWritableFinished: E, isWritableErrored: S, isServerRequest: Y0, isServerResponse: Q0, willEmitClose: B0, isTransformStream: W };
    }), _2 = w0((Q, q) => {
      var $ = K1(), { AbortError: X, codes: Y } = _0(), { ERR_INVALID_ARG_TYPE: J, ERR_STREAM_PREMATURE_CLOSE: K } = Y, { kEmptyObject: U, once: G } = m0(), { validateAbortSignal: V, validateFunction: z, validateObject: H, validateBoolean: j } = J6(), { Promise: Z, PromisePrototypeThen: h, SymbolDispose: g } = D0(), { isClosed: C, isReadable: N, isReadableNodeStream: W, isReadableStream: M, isReadableFinished: w, isReadableErrored: I, isWritable: f, isWritableNodeStream: E, isWritableStream: d, isWritableFinished: R, isWritableErrored: x, isNodeStream: D, willEmitClose: L, kIsClosedPromise: S } = x2(), y;
      function v(c) {
        return c.setHeader && typeof c.abort === "function";
      }
      var a = () => {
      };
      function Q0(c, U0, P) {
        var l, $0;
        if (arguments.length === 2) P = U0, U0 = U;
        else if (U0 == null) U0 = U;
        else H(U0, "options");
        if (z(P, "callback"), V(U0.signal, "options.signal"), P = G(P), M(c) || d(c)) return Y0(c, U0, P);
        if (!D(c)) throw new J("stream", ["ReadableStream", "WritableStream", "Stream"], c);
        let u = (l = U0.readable) !== null && l !== void 0 ? l : W(c), K0 = ($0 = U0.writable) !== null && $0 !== void 0 ? $0 : E(c), z0 = c._writableState, j0 = c._readableState, Z0 = () => {
          if (!c.writable) s();
        }, p = L(c) && W(c) === u && E(c) === K0, m = R(c, false), s = () => {
          if (m = true, c.destroyed) p = false;
          if (p && (!c.readable || u)) return;
          if (!u || G0) P.call(c);
        }, G0 = w(c, false), W0 = () => {
          if (G0 = true, c.destroyed) p = false;
          if (p && (!c.writable || K0)) return;
          if (!K0 || m) P.call(c);
        }, A = (O) => {
          P.call(c, O);
        }, T = C(c), b = () => {
          T = true;
          let O = x(c) || I(c);
          if (O && typeof O !== "boolean") return P.call(c, O);
          if (u && !G0 && W(c, true)) {
            if (!w(c, false)) return P.call(c, new K());
          }
          if (K0 && !m) {
            if (!R(c, false)) return P.call(c, new K());
          }
          P.call(c);
        }, r = () => {
          T = true;
          let O = x(c) || I(c);
          if (O && typeof O !== "boolean") return P.call(c, O);
          P.call(c);
        }, e = () => {
          c.req.on("finish", s);
        };
        if (v(c)) {
          if (c.on("complete", s), !p) c.on("abort", b);
          if (c.req) e();
          else c.on("request", e);
        } else if (K0 && !z0) c.on("end", Z0), c.on("close", Z0);
        if (!p && typeof c.aborted === "boolean") c.on("aborted", b);
        if (c.on("end", W0), c.on("finish", s), U0.error !== false) c.on("error", A);
        if (c.on("close", b), T) $.nextTick(b);
        else if (z0 !== null && z0 !== void 0 && z0.errorEmitted || j0 !== null && j0 !== void 0 && j0.errorEmitted) {
          if (!p) $.nextTick(r);
        } else if (!u && (!p || N(c)) && (m || f(c) === false)) $.nextTick(r);
        else if (!K0 && (!p || f(c)) && (G0 || N(c) === false)) $.nextTick(r);
        else if (j0 && c.req && c.aborted) $.nextTick(r);
        let t = () => {
          if (P = a, c.removeListener("aborted", b), c.removeListener("complete", s), c.removeListener("abort", b), c.removeListener("request", e), c.req) c.req.removeListener("finish", s);
          c.removeListener("end", Z0), c.removeListener("close", Z0), c.removeListener("finish", s), c.removeListener("end", W0), c.removeListener("error", A), c.removeListener("close", b);
        };
        if (U0.signal && !T) {
          let O = () => {
            let i = P;
            t(), i.call(c, new X(void 0, { cause: U0.signal.reason }));
          };
          if (U0.signal.aborted) $.nextTick(O);
          else {
            y = y || m0().addAbortListener;
            let i = y(U0.signal, O), q0 = P;
            P = G((...o) => {
              i[g](), q0.apply(c, o);
            });
          }
        }
        return t;
      }
      function Y0(c, U0, P) {
        let l = false, $0 = a;
        if (U0.signal) if ($0 = () => {
          l = true, P.call(c, new X(void 0, { cause: U0.signal.reason }));
        }, U0.signal.aborted) $.nextTick($0);
        else {
          y = y || m0().addAbortListener;
          let K0 = y(U0.signal, $0), z0 = P;
          P = G((...j0) => {
            K0[g](), z0.apply(c, j0);
          });
        }
        let u = (...K0) => {
          if (!l) $.nextTick(() => P.apply(c, K0));
        };
        return h(c[S].promise, u, u), a;
      }
      function B0(c, U0) {
        var P;
        let l = false;
        if (U0 === null) U0 = U;
        if ((P = U0) !== null && P !== void 0 && P.cleanup) j(U0.cleanup, "cleanup"), l = U0.cleanup;
        return new Z(($0, u) => {
          let K0 = Q0(c, U0, (z0) => {
            if (l) K0();
            if (z0) u(z0);
            else $0();
          });
        });
      }
      q.exports = Q0, q.exports.finished = B0;
    }), O1 = w0((Q, q) => {
      var $ = K1(), { aggregateTwoErrors: X, codes: { ERR_MULTIPLE_CALLBACK: Y }, AbortError: J } = _0(), { Symbol: K } = D0(), { kIsDestroyed: U, isDestroyed: G, isFinished: V, isServerRequest: z } = x2(), H = K("kDestroy"), j = K("kConstruct");
      function Z(L, S, y) {
        if (L) {
          if (L.stack, S && !S.errored) S.errored = L;
          if (y && !y.errored) y.errored = L;
        }
      }
      function h(L, S) {
        let y = this._readableState, v = this._writableState, a = v || y;
        if (v !== null && v !== void 0 && v.destroyed || y !== null && y !== void 0 && y.destroyed) {
          if (typeof S === "function") S();
          return this;
        }
        if (Z(L, v, y), v) v.destroyed = true;
        if (y) y.destroyed = true;
        if (!a.constructed) this.once(H, function(Q0) {
          g(this, X(Q0, L), S);
        });
        else g(this, L, S);
        return this;
      }
      function g(L, S, y) {
        let v = false;
        function a(Q0) {
          if (v) return;
          v = true;
          let { _readableState: Y0, _writableState: B0 } = L;
          if (Z(Q0, B0, Y0), B0) B0.closed = true;
          if (Y0) Y0.closed = true;
          if (typeof y === "function") y(Q0);
          if (Q0) $.nextTick(C, L, Q0);
          else $.nextTick(N, L);
        }
        try {
          L._destroy(S || null, a);
        } catch (Q0) {
          a(Q0);
        }
      }
      function C(L, S) {
        W(L, S), N(L);
      }
      function N(L) {
        let { _readableState: S, _writableState: y } = L;
        if (y) y.closeEmitted = true;
        if (S) S.closeEmitted = true;
        if (y !== null && y !== void 0 && y.emitClose || S !== null && S !== void 0 && S.emitClose) L.emit("close");
      }
      function W(L, S) {
        let { _readableState: y, _writableState: v } = L;
        if (v !== null && v !== void 0 && v.errorEmitted || y !== null && y !== void 0 && y.errorEmitted) return;
        if (v) v.errorEmitted = true;
        if (y) y.errorEmitted = true;
        L.emit("error", S);
      }
      function M() {
        let L = this._readableState, S = this._writableState;
        if (L) L.constructed = true, L.closed = false, L.closeEmitted = false, L.destroyed = false, L.errored = null, L.errorEmitted = false, L.reading = false, L.ended = L.readable === false, L.endEmitted = L.readable === false;
        if (S) S.constructed = true, S.destroyed = false, S.closed = false, S.closeEmitted = false, S.errored = null, S.errorEmitted = false, S.finalCalled = false, S.prefinished = false, S.ended = S.writable === false, S.ending = S.writable === false, S.finished = S.writable === false;
      }
      function w(L, S, y) {
        let { _readableState: v, _writableState: a } = L;
        if (a !== null && a !== void 0 && a.destroyed || v !== null && v !== void 0 && v.destroyed) return this;
        if (v !== null && v !== void 0 && v.autoDestroy || a !== null && a !== void 0 && a.autoDestroy) L.destroy(S);
        else if (S) {
          if (S.stack, a && !a.errored) a.errored = S;
          if (v && !v.errored) v.errored = S;
          if (y) $.nextTick(W, L, S);
          else W(L, S);
        }
      }
      function I(L, S) {
        if (typeof L._construct !== "function") return;
        let { _readableState: y, _writableState: v } = L;
        if (y) y.constructed = false;
        if (v) v.constructed = false;
        if (L.once(j, S), L.listenerCount(j) > 1) return;
        $.nextTick(f, L);
      }
      function f(L) {
        let S = false;
        function y(v) {
          if (S) {
            w(L, v !== null && v !== void 0 ? v : new Y());
            return;
          }
          S = true;
          let { _readableState: a, _writableState: Q0 } = L, Y0 = Q0 || a;
          if (a) a.constructed = true;
          if (Q0) Q0.constructed = true;
          if (Y0.destroyed) L.emit(H, v);
          else if (v) w(L, v, true);
          else $.nextTick(E, L);
        }
        try {
          L._construct((v) => {
            $.nextTick(y, v);
          });
        } catch (v) {
          $.nextTick(y, v);
        }
      }
      function E(L) {
        L.emit(j);
      }
      function d(L) {
        return (L === null || L === void 0 ? void 0 : L.setHeader) && typeof L.abort === "function";
      }
      function R(L) {
        L.emit("close");
      }
      function x(L, S) {
        L.emit("error", S), $.nextTick(R, L);
      }
      function D(L, S) {
        if (!L || G(L)) return;
        if (!S && !V(L)) S = new J();
        if (z(L)) L.socket = null, L.destroy(S);
        else if (d(L)) L.abort();
        else if (d(L.req)) L.req.abort();
        else if (typeof L.destroy === "function") L.destroy(S);
        else if (typeof L.close === "function") L.close();
        else if (S) $.nextTick(x, L, S);
        else $.nextTick(R, L);
        if (!L.destroyed) L[U] = true;
      }
      q.exports = { construct: I, destroyer: D, destroy: h, undestroy: M, errorOrDestroy: w };
    }), C5 = w0((Q, q) => {
      var { ArrayIsArray: $, ObjectSetPrototypeOf: X } = D0(), { EventEmitter: Y } = (X6(), a0($6));
      function J(U) {
        Y.call(this, U);
      }
      X(J.prototype, Y.prototype), X(J, Y), J.prototype.pipe = function(U, G) {
        let V = this;
        function z(N) {
          if (U.writable && U.write(N) === false && V.pause) V.pause();
        }
        V.on("data", z);
        function H() {
          if (V.readable && V.resume) V.resume();
        }
        if (U.on("drain", H), !U._isStdio && (!G || G.end !== false)) V.on("end", Z), V.on("close", h);
        let j = false;
        function Z() {
          if (j) return;
          j = true, U.end();
        }
        function h() {
          if (j) return;
          if (j = true, typeof U.destroy === "function") U.destroy();
        }
        function g(N) {
          if (C(), Y.listenerCount(this, "error") === 0) this.emit("error", N);
        }
        K(V, "error", g), K(U, "error", g);
        function C() {
          V.removeListener("data", z), U.removeListener("drain", H), V.removeListener("end", Z), V.removeListener("close", h), V.removeListener("error", g), U.removeListener("error", g), V.removeListener("end", C), V.removeListener("close", C), U.removeListener("close", C);
        }
        return V.on("end", C), V.on("close", C), U.on("close", C), U.emit("pipe", V), U;
      };
      function K(U, G, V) {
        if (typeof U.prependListener === "function") return U.prependListener(G, V);
        if (!U._events || !U._events[G]) U.on(G, V);
        else if ($(U._events[G])) U._events[G].unshift(V);
        else U._events[G] = [V, U._events[G]];
      }
      q.exports = { Stream: J, prependListener: K };
    }), p6 = w0((Q, q) => {
      var { SymbolDispose: $ } = D0(), { AbortError: X, codes: Y } = _0(), { isNodeStream: J, isWebStream: K, kControllerErrorFunction: U } = x2(), G = _2(), { ERR_INVALID_ARG_TYPE: V } = Y, z, H = (j, Z) => {
        if (typeof j !== "object" || !("aborted" in j)) throw new V(Z, "AbortSignal", j);
      };
      q.exports.addAbortSignal = function(j, Z) {
        if (H(j, "signal"), !J(Z) && !K(Z)) throw new V("stream", ["ReadableStream", "WritableStream", "Stream"], Z);
        return q.exports.addAbortSignalNoValidate(j, Z);
      }, q.exports.addAbortSignalNoValidate = function(j, Z) {
        if (typeof j !== "object" || !("aborted" in j)) return Z;
        let h = J(Z) ? () => {
          Z.destroy(new X(void 0, { cause: j.reason }));
        } : () => {
          Z[U](new X(void 0, { cause: j.reason }));
        };
        if (j.aborted) h();
        else {
          z = z || m0().addAbortListener;
          let g = z(j, h);
          G(Z, g[$]);
        }
        return Z;
      };
    }), MV = w0((Q, q) => {
      var { StringPrototypeSlice: $, SymbolIterator: X, TypedArrayPrototypeSet: Y, Uint8Array: J } = D0(), { Buffer: K } = (O2(), a0(A2)), { inspect: U } = m0();
      q.exports = class {
        constructor() {
          this.head = null, this.tail = null, this.length = 0;
        }
        push(G) {
          let V = { data: G, next: null };
          if (this.length > 0) this.tail.next = V;
          else this.head = V;
          this.tail = V, ++this.length;
        }
        unshift(G) {
          let V = { data: G, next: this.head };
          if (this.length === 0) this.tail = V;
          this.head = V, ++this.length;
        }
        shift() {
          if (this.length === 0) return;
          let G = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          return --this.length, G;
        }
        clear() {
          this.head = this.tail = null, this.length = 0;
        }
        join(G) {
          if (this.length === 0) return "";
          let V = this.head, z = "" + V.data;
          while ((V = V.next) !== null) z += G + V.data;
          return z;
        }
        concat(G) {
          if (this.length === 0) return K.alloc(0);
          let V = K.allocUnsafe(G >>> 0), z = this.head, H = 0;
          while (z) Y(V, z.data, H), H += z.data.length, z = z.next;
          return V;
        }
        consume(G, V) {
          let z = this.head.data;
          if (G < z.length) {
            let H = z.slice(0, G);
            return this.head.data = z.slice(G), H;
          }
          if (G === z.length) return this.shift();
          return V ? this._getString(G) : this._getBuffer(G);
        }
        first() {
          return this.head.data;
        }
        *[X]() {
          for (let G = this.head; G; G = G.next) yield G.data;
        }
        _getString(G) {
          let V = "", z = this.head, H = 0;
          do {
            let j = z.data;
            if (G > j.length) V += j, G -= j.length;
            else {
              if (G === j.length) if (V += j, ++H, z.next) this.head = z.next;
              else this.head = this.tail = null;
              else V += $(j, 0, G), this.head = z, z.data = $(j, G);
              break;
            }
            ++H;
          } while ((z = z.next) !== null);
          return this.length -= H, V;
        }
        _getBuffer(G) {
          let V = K.allocUnsafe(G), z = G, H = this.head, j = 0;
          do {
            let Z = H.data;
            if (G > Z.length) Y(V, Z, z - G), G -= Z.length;
            else {
              if (G === Z.length) if (Y(V, Z, z - G), ++j, H.next) this.head = H.next;
              else this.head = this.tail = null;
              else Y(V, new J(Z.buffer, Z.byteOffset, G), z - G), this.head = H, H.data = Z.slice(G);
              break;
            }
            ++j;
          } while ((H = H.next) !== null);
          return this.length -= j, V;
        }
        [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](G, V) {
          return U(this, { ...V, depth: 0, customInspect: false });
        }
      };
    }), m6 = w0((Q, q) => {
      var { MathFloor: $, NumberIsInteger: X } = D0(), { validateInteger: Y } = J6(), { ERR_INVALID_ARG_VALUE: J } = _0().codes, K = 16384, U = 16;
      function G(j, Z, h) {
        return j.highWaterMark != null ? j.highWaterMark : Z ? j[h] : null;
      }
      function V(j) {
        return j ? U : K;
      }
      function z(j, Z) {
        if (Y(Z, "value", 0), j) U = Z;
        else K = Z;
      }
      function H(j, Z, h, g) {
        let C = G(Z, g, h);
        if (C != null) {
          if (!X(C) || C < 0) {
            let N = g ? `options.${h}` : "options.highWaterMark";
            throw new J(N, C);
          }
          return $(C);
        }
        return V(j.objectMode);
      }
      q.exports = { getHighWaterMark: H, getDefaultHighWaterMark: V, setDefaultHighWaterMark: z };
    }), wV = w0((Q, q) => {
      var $ = (O2(), a0(A2)), X = $.Buffer;
      function Y(K, U) {
        for (var G in K) U[G] = K[G];
      }
      if (X.from && X.alloc && X.allocUnsafe && X.allocUnsafeSlow) q.exports = $;
      else Y($, Q), Q.Buffer = J;
      function J(K, U, G) {
        return X(K, U, G);
      }
      J.prototype = Object.create(X.prototype), Y(X, J), J.from = function(K, U, G) {
        if (typeof K === "number") throw TypeError("Argument must not be a number");
        return X(K, U, G);
      }, J.alloc = function(K, U, G) {
        if (typeof K !== "number") throw TypeError("Argument must be a number");
        var V = X(K);
        if (U !== void 0) if (typeof G === "string") V.fill(U, G);
        else V.fill(U);
        else V.fill(0);
        return V;
      }, J.allocUnsafe = function(K) {
        if (typeof K !== "number") throw TypeError("Argument must be a number");
        return X(K);
      }, J.allocUnsafeSlow = function(K) {
        if (typeof K !== "number") throw TypeError("Argument must be a number");
        return $.SlowBuffer(K);
      };
    }), PV = w0((Q) => {
      var q = wV().Buffer, $ = q.isEncoding || function(W) {
        switch (W = "" + W, W && W.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function X(W) {
        if (!W) return "utf8";
        var M;
        while (true) switch (W) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return W;
          default:
            if (M) return;
            W = ("" + W).toLowerCase(), M = true;
        }
      }
      function Y(W) {
        var M = X(W);
        if (typeof M !== "string" && (q.isEncoding === $ || !$(W))) throw Error("Unknown encoding: " + W);
        return M || W;
      }
      Q.StringDecoder = J;
      function J(W) {
        this.encoding = Y(W);
        var M;
        switch (this.encoding) {
          case "utf16le":
            this.text = j, this.end = Z, M = 4;
            break;
          case "utf8":
            this.fillLast = V, M = 4;
            break;
          case "base64":
            this.text = h, this.end = g, M = 3;
            break;
          default:
            this.write = C, this.end = N;
            return;
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = q.allocUnsafe(M);
      }
      J.prototype.write = function(W) {
        if (W.length === 0) return "";
        var M, w;
        if (this.lastNeed) {
          if (M = this.fillLast(W), M === void 0) return "";
          w = this.lastNeed, this.lastNeed = 0;
        } else w = 0;
        if (w < W.length) return M ? M + this.text(W, w) : this.text(W, w);
        return M || "";
      }, J.prototype.end = H, J.prototype.text = z, J.prototype.fillLast = function(W) {
        if (this.lastNeed <= W.length) return W.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        W.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, W.length), this.lastNeed -= W.length;
      };
      function K(W) {
        if (W <= 127) return 0;
        else if (W >> 5 === 6) return 2;
        else if (W >> 4 === 14) return 3;
        else if (W >> 3 === 30) return 4;
        return W >> 6 === 2 ? -1 : -2;
      }
      function U(W, M, w) {
        var I = M.length - 1;
        if (I < w) return 0;
        var f = K(M[I]);
        if (f >= 0) {
          if (f > 0) W.lastNeed = f - 1;
          return f;
        }
        if (--I < w || f === -2) return 0;
        if (f = K(M[I]), f >= 0) {
          if (f > 0) W.lastNeed = f - 2;
          return f;
        }
        if (--I < w || f === -2) return 0;
        if (f = K(M[I]), f >= 0) {
          if (f > 0) if (f === 2) f = 0;
          else W.lastNeed = f - 3;
          return f;
        }
        return 0;
      }
      function G(W, M, w) {
        if ((M[0] & 192) !== 128) return W.lastNeed = 0, "\uFFFD";
        if (W.lastNeed > 1 && M.length > 1) {
          if ((M[1] & 192) !== 128) return W.lastNeed = 1, "\uFFFD";
          if (W.lastNeed > 2 && M.length > 2) {
            if ((M[2] & 192) !== 128) return W.lastNeed = 2, "\uFFFD";
          }
        }
      }
      function V(W) {
        var M = this.lastTotal - this.lastNeed, w = G(this, W, M);
        if (w !== void 0) return w;
        if (this.lastNeed <= W.length) return W.copy(this.lastChar, M, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        W.copy(this.lastChar, M, 0, W.length), this.lastNeed -= W.length;
      }
      function z(W, M) {
        var w = U(this, W, M);
        if (!this.lastNeed) return W.toString("utf8", M);
        this.lastTotal = w;
        var I = W.length - (w - this.lastNeed);
        return W.copy(this.lastChar, 0, I), W.toString("utf8", M, I);
      }
      function H(W) {
        var M = W && W.length ? this.write(W) : "";
        if (this.lastNeed) return M + "\uFFFD";
        return M;
      }
      function j(W, M) {
        if ((W.length - M) % 2 === 0) {
          var w = W.toString("utf16le", M);
          if (w) {
            var I = w.charCodeAt(w.length - 1);
            if (I >= 55296 && I <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = W[W.length - 2], this.lastChar[1] = W[W.length - 1], w.slice(0, -1);
          }
          return w;
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = W[W.length - 1], W.toString("utf16le", M, W.length - 1);
      }
      function Z(W) {
        var M = W && W.length ? this.write(W) : "";
        if (this.lastNeed) {
          var w = this.lastTotal - this.lastNeed;
          return M + this.lastChar.toString("utf16le", 0, w);
        }
        return M;
      }
      function h(W, M) {
        var w = (W.length - M) % 3;
        if (w === 0) return W.toString("base64", M);
        if (this.lastNeed = 3 - w, this.lastTotal = 3, w === 1) this.lastChar[0] = W[W.length - 1];
        else this.lastChar[0] = W[W.length - 2], this.lastChar[1] = W[W.length - 1];
        return W.toString("base64", M, W.length - w);
      }
      function g(W) {
        var M = W && W.length ? this.write(W) : "";
        if (this.lastNeed) return M + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
        return M;
      }
      function C(W) {
        return W.toString(this.encoding);
      }
      function N(W) {
        return W && W.length ? this.write(W) : "";
      }
    }), l7 = w0((Q, q) => {
      var $ = K1(), { PromisePrototypeThen: X, SymbolAsyncIterator: Y, SymbolIterator: J } = D0(), { Buffer: K } = (O2(), a0(A2)), { ERR_INVALID_ARG_TYPE: U, ERR_STREAM_NULL_VALUES: G } = _0().codes;
      function V(z, H, j) {
        let Z;
        if (typeof H === "string" || H instanceof K) return new z({ objectMode: true, ...j, read() {
          this.push(H), this.push(null);
        } });
        let h;
        if (H && H[Y]) h = true, Z = H[Y]();
        else if (H && H[J]) h = false, Z = H[J]();
        else throw new U("iterable", ["Iterable"], H);
        let g = new z({ objectMode: true, highWaterMark: 1, ...j }), C = false;
        g._read = function() {
          if (!C) C = true, W();
        }, g._destroy = function(M, w) {
          X(N(M), () => $.nextTick(w, M), (I) => $.nextTick(w, I || M));
        };
        async function N(M) {
          let w = M !== void 0 && M !== null, I = typeof Z.throw === "function";
          if (w && I) {
            let { value: f, done: E } = await Z.throw(M);
            if (await f, E) return;
          }
          if (typeof Z.return === "function") {
            let { value: f } = await Z.return();
            await f;
          }
        }
        async function W() {
          for (; ; ) {
            try {
              let { value: M, done: w } = h ? await Z.next() : Z.next();
              if (w) g.push(null);
              else {
                let I = M && typeof M.then === "function" ? await M : M;
                if (I === null) throw C = false, new G();
                else if (g.push(I)) continue;
                else C = false;
              }
            } catch (M) {
              g.destroy(M);
            }
            break;
          }
        }
        return g;
      }
      q.exports = V;
    }), d6 = w0((Q, q) => {
      var $ = K1(), { ArrayPrototypeIndexOf: X, NumberIsInteger: Y, NumberIsNaN: J, NumberParseInt: K, ObjectDefineProperties: U, ObjectKeys: G, ObjectSetPrototypeOf: V, Promise: z, SafeSet: H, SymbolAsyncDispose: j, SymbolAsyncIterator: Z, Symbol: h } = D0();
      q.exports = o, o.ReadableState = q0;
      var { EventEmitter: g } = (X6(), a0($6)), { Stream: C, prependListener: N } = C5(), { Buffer: W } = (O2(), a0(A2)), { addAbortSignal: M } = p6(), w = _2(), I = m0().debuglog("stream", (B) => {
        I = B;
      }), f = MV(), E = O1(), { getHighWaterMark: d, getDefaultHighWaterMark: R } = m6(), { aggregateTwoErrors: x, codes: { ERR_INVALID_ARG_TYPE: D, ERR_METHOD_NOT_IMPLEMENTED: L, ERR_OUT_OF_RANGE: S, ERR_STREAM_PUSH_AFTER_EOF: y, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: v }, AbortError: a } = _0(), { validateObject: Q0 } = J6(), Y0 = h("kPaused"), { StringDecoder: B0 } = PV(), c = l7();
      V(o.prototype, C.prototype), V(o, C);
      var U0 = () => {
      }, { errorOrDestroy: P } = E, l = 1, $0 = 2, u = 4, K0 = 8, z0 = 16, j0 = 32, Z0 = 64, p = 128, m = 256, s = 512, G0 = 1024, W0 = 2048, A = 4096, T = 8192, b = 16384, r = 32768, e = 65536, t = 131072, O = 262144;
      function i(B) {
        return { enumerable: false, get() {
          return (this.state & B) !== 0;
        }, set(F) {
          if (F) this.state |= B;
          else this.state &= ~B;
        } };
      }
      U(q0.prototype, { objectMode: i(l), ended: i($0), endEmitted: i(u), reading: i(K0), constructed: i(z0), sync: i(j0), needReadable: i(Z0), emittedReadable: i(p), readableListening: i(m), resumeScheduled: i(s), errorEmitted: i(G0), emitClose: i(W0), autoDestroy: i(A), destroyed: i(T), closed: i(b), closeEmitted: i(r), multiAwaitDrain: i(e), readingMore: i(t), dataEmitted: i(O) });
      function q0(B, F, n) {
        if (typeof n !== "boolean") n = F instanceof R2();
        if (this.state = W0 | A | z0 | j0, B && B.objectMode) this.state |= l;
        if (n && B && B.readableObjectMode) this.state |= l;
        if (this.highWaterMark = B ? d(this, B, "readableHighWaterMark", n) : R(false), this.buffer = new f(), this.length = 0, this.pipes = [], this.flowing = null, this[Y0] = null, B && B.emitClose === false) this.state &= ~W0;
        if (B && B.autoDestroy === false) this.state &= ~A;
        if (this.errored = null, this.defaultEncoding = B && B.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, B && B.encoding) this.decoder = new B0(B.encoding), this.encoding = B.encoding;
      }
      function o(B) {
        if (!(this instanceof o)) return new o(B);
        let F = this instanceof R2();
        if (this._readableState = new q0(B, this, F), B) {
          if (typeof B.read === "function") this._read = B.read;
          if (typeof B.destroy === "function") this._destroy = B.destroy;
          if (typeof B.construct === "function") this._construct = B.construct;
          if (B.signal && !F) M(B.signal, this);
        }
        C.call(this, B), E.construct(this, () => {
          if (this._readableState.needReadable) N1(this, this._readableState);
        });
      }
      o.prototype.destroy = E.destroy, o.prototype._undestroy = E.undestroy, o.prototype._destroy = function(B, F) {
        F(B);
      }, o.prototype[g.captureRejectionSymbol] = function(B) {
        this.destroy(B);
      }, o.prototype[j] = function() {
        let B;
        if (!this.destroyed) B = this.readableEnded ? null : new a(), this.destroy(B);
        return new z((F, n) => w(this, (X0) => X0 && X0 !== B ? n(X0) : F(null)));
      }, o.prototype.push = function(B, F) {
        return V0(this, B, F, false);
      }, o.prototype.unshift = function(B, F) {
        return V0(this, B, F, true);
      };
      function V0(B, F, n, X0) {
        I("readableAddChunk", F);
        let J0 = B._readableState, y0;
        if ((J0.state & l) === 0) {
          if (typeof F === "string") {
            if (n = n || J0.defaultEncoding, J0.encoding !== n) if (X0 && J0.encoding) F = W.from(F, n).toString(J0.encoding);
            else F = W.from(F, n), n = "";
          } else if (F instanceof W) n = "";
          else if (C._isUint8Array(F)) F = C._uint8ArrayToBuffer(F), n = "";
          else if (F != null) y0 = new D("chunk", ["string", "Buffer", "Uint8Array"], F);
        }
        if (y0) P(B, y0);
        else if (F === null) J0.state &= ~K0, g0(B, J0);
        else if ((J0.state & l) !== 0 || F && F.length > 0) if (X0) if ((J0.state & u) !== 0) P(B, new v());
        else if (J0.destroyed || J0.errored) return false;
        else P0(B, J0, F, true);
        else if (J0.ended) P(B, new y());
        else if (J0.destroyed || J0.errored) return false;
        else if (J0.state &= ~K0, J0.decoder && !n) if (F = J0.decoder.write(F), J0.objectMode || F.length !== 0) P0(B, J0, F, false);
        else N1(B, J0);
        else P0(B, J0, F, false);
        else if (!X0) J0.state &= ~K0, N1(B, J0);
        return !J0.ended && (J0.length < J0.highWaterMark || J0.length === 0);
      }
      function P0(B, F, n, X0) {
        if (F.flowing && F.length === 0 && !F.sync && B.listenerCount("data") > 0) {
          if ((F.state & e) !== 0) F.awaitDrainWriters.clear();
          else F.awaitDrainWriters = null;
          F.dataEmitted = true, B.emit("data", n);
        } else {
          if (F.length += F.objectMode ? 1 : n.length, X0) F.buffer.unshift(n);
          else F.buffer.push(n);
          if ((F.state & Z0) !== 0) c0(B);
        }
        N1(B, F);
      }
      o.prototype.isPaused = function() {
        let B = this._readableState;
        return B[Y0] === true || B.flowing === false;
      }, o.prototype.setEncoding = function(B) {
        let F = new B0(B);
        this._readableState.decoder = F, this._readableState.encoding = this._readableState.decoder.encoding;
        let n = this._readableState.buffer, X0 = "";
        for (let J0 of n) X0 += F.write(J0);
        if (n.clear(), X0 !== "") n.push(X0);
        return this._readableState.length = X0.length, this;
      };
      var o0 = 1073741824;
      function n0(B) {
        if (B > o0) throw new S("size", "<= 1GiB", B);
        else B--, B |= B >>> 1, B |= B >>> 2, B |= B >>> 4, B |= B >>> 8, B |= B >>> 16, B++;
        return B;
      }
      function e2(B, F) {
        if (B <= 0 || F.length === 0 && F.ended) return 0;
        if ((F.state & l) !== 0) return 1;
        if (J(B)) {
          if (F.flowing && F.length) return F.buffer.first().length;
          return F.length;
        }
        if (B <= F.length) return B;
        return F.ended ? F.length : 0;
      }
      o.prototype.read = function(B) {
        if (I("read", B), B === void 0) B = NaN;
        else if (!Y(B)) B = K(B, 10);
        let F = this._readableState, n = B;
        if (B > F.highWaterMark) F.highWaterMark = n0(B);
        if (B !== 0) F.state &= ~p;
        if (B === 0 && F.needReadable && ((F.highWaterMark !== 0 ? F.length >= F.highWaterMark : F.length > 0) || F.ended)) {
          if (I("read: emitReadable", F.length, F.ended), F.length === 0 && F.ended) X5(this);
          else c0(this);
          return null;
        }
        if (B = e2(B, F), B === 0 && F.ended) {
          if (F.length === 0) X5(this);
          return null;
        }
        let X0 = (F.state & Z0) !== 0;
        if (I("need readable", X0), F.length === 0 || F.length - B < F.highWaterMark) X0 = true, I("length less than watermark", X0);
        if (F.ended || F.reading || F.destroyed || F.errored || !F.constructed) X0 = false, I("reading, ended or constructing", X0);
        else if (X0) {
          if (I("do read"), F.state |= K0 | j0, F.length === 0) F.state |= Z0;
          try {
            this._read(F.highWaterMark);
          } catch (y0) {
            P(this, y0);
          }
          if (F.state &= ~j0, !F.reading) B = e2(n, F);
        }
        let J0;
        if (B > 0) J0 = sQ(B, F);
        else J0 = null;
        if (J0 === null) F.needReadable = F.length <= F.highWaterMark, B = 0;
        else if (F.length -= B, F.multiAwaitDrain) F.awaitDrainWriters.clear();
        else F.awaitDrainWriters = null;
        if (F.length === 0) {
          if (!F.ended) F.needReadable = true;
          if (n !== B && F.ended) X5(this);
        }
        if (J0 !== null && !F.errorEmitted && !F.closeEmitted) F.dataEmitted = true, this.emit("data", J0);
        return J0;
      };
      function g0(B, F) {
        if (I("onEofChunk"), F.ended) return;
        if (F.decoder) {
          let n = F.decoder.end();
          if (n && n.length) F.buffer.push(n), F.length += F.objectMode ? 1 : n.length;
        }
        if (F.ended = true, F.sync) c0(B);
        else F.needReadable = false, F.emittedReadable = true, I1(B);
      }
      function c0(B) {
        let F = B._readableState;
        if (I("emitReadable", F.needReadable, F.emittedReadable), F.needReadable = false, !F.emittedReadable) I("emitReadable", F.flowing), F.emittedReadable = true, $.nextTick(I1, B);
      }
      function I1(B) {
        let F = B._readableState;
        if (I("emitReadable_", F.destroyed, F.length, F.ended), !F.destroyed && !F.errored && (F.length || F.ended)) B.emit("readable"), F.emittedReadable = false;
        F.needReadable = !F.flowing && !F.ended && F.length <= F.highWaterMark, rQ(B);
      }
      function N1(B, F) {
        if (!F.readingMore && F.constructed) F.readingMore = true, $.nextTick(W2, B, F);
      }
      function W2(B, F) {
        while (!F.reading && !F.ended && (F.length < F.highWaterMark || F.flowing && F.length === 0)) {
          let n = F.length;
          if (I("maybeReadMore read 0"), B.read(0), n === F.length) break;
        }
        F.readingMore = false;
      }
      o.prototype._read = function(B) {
        throw new L("_read()");
      }, o.prototype.pipe = function(B, F) {
        let n = this, X0 = this._readableState;
        if (X0.pipes.length === 1) {
          if (!X0.multiAwaitDrain) X0.multiAwaitDrain = true, X0.awaitDrainWriters = new H(X0.awaitDrainWriters ? [X0.awaitDrainWriters] : []);
        }
        X0.pipes.push(B), I("pipe count=%d opts=%j", X0.pipes.length, F);
        let J0 = (!F || F.end !== false) && B !== $.stdout && B !== $.stderr ? r0 : s1;
        if (X0.endEmitted) $.nextTick(J0);
        else n.once("end", J0);
        B.on("unpipe", y0);
        function y0(q1, N2) {
          if (I("onunpipe"), q1 === n) {
            if (N2 && N2.hasUnpiped === false) N2.hasUnpiped = true, ZU();
          }
        }
        function r0() {
          I("onend"), B.end();
        }
        let Q1, eQ = false;
        function ZU() {
          if (I("cleanup"), B.removeListener("close", K5), B.removeListener("finish", U5), Q1) B.removeListener("drain", Q1);
          if (B.removeListener("error", J5), B.removeListener("unpipe", y0), n.removeListener("end", r0), n.removeListener("end", s1), n.removeListener("data", q7), eQ = true, Q1 && X0.awaitDrainWriters && (!B._writableState || B._writableState.needDrain)) Q1();
        }
        function Q7() {
          if (!eQ) {
            if (X0.pipes.length === 1 && X0.pipes[0] === B) I("false write response, pause", 0), X0.awaitDrainWriters = B, X0.multiAwaitDrain = false;
            else if (X0.pipes.length > 1 && X0.pipes.includes(B)) I("false write response, pause", X0.awaitDrainWriters.size), X0.awaitDrainWriters.add(B);
            n.pause();
          }
          if (!Q1) Q1 = KU(n, B), B.on("drain", Q1);
        }
        n.on("data", q7);
        function q7(q1) {
          I("ondata");
          let N2 = B.write(q1);
          if (I("dest.write", N2), N2 === false) Q7();
        }
        function J5(q1) {
          if (I("onerror", q1), s1(), B.removeListener("error", J5), B.listenerCount("error") === 0) {
            let N2 = B._writableState || B._readableState;
            if (N2 && !N2.errorEmitted) P(B, q1);
            else B.emit("error", q1);
          }
        }
        N(B, "error", J5);
        function K5() {
          B.removeListener("finish", U5), s1();
        }
        B.once("close", K5);
        function U5() {
          I("onfinish"), B.removeListener("close", K5), s1();
        }
        B.once("finish", U5);
        function s1() {
          I("unpipe"), n.unpipe(B);
        }
        if (B.emit("pipe", n), B.writableNeedDrain === true) Q7();
        else if (!X0.flowing) I("pipe resume"), n.resume();
        return B;
      };
      function KU(B, F) {
        return function() {
          let n = B._readableState;
          if (n.awaitDrainWriters === F) I("pipeOnDrain", 1), n.awaitDrainWriters = null;
          else if (n.multiAwaitDrain) I("pipeOnDrain", n.awaitDrainWriters.size), n.awaitDrainWriters.delete(F);
          if ((!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) && B.listenerCount("data")) B.resume();
        };
      }
      o.prototype.unpipe = function(B) {
        let F = this._readableState, n = { hasUnpiped: false };
        if (F.pipes.length === 0) return this;
        if (!B) {
          let J0 = F.pipes;
          F.pipes = [], this.pause();
          for (let y0 = 0; y0 < J0.length; y0++) J0[y0].emit("unpipe", this, { hasUnpiped: false });
          return this;
        }
        let X0 = X(F.pipes, B);
        if (X0 === -1) return this;
        if (F.pipes.splice(X0, 1), F.pipes.length === 0) this.pause();
        return B.emit("unpipe", this, n), this;
      }, o.prototype.on = function(B, F) {
        let n = C.prototype.on.call(this, B, F), X0 = this._readableState;
        if (B === "data") {
          if (X0.readableListening = this.listenerCount("readable") > 0, X0.flowing !== false) this.resume();
        } else if (B === "readable") {
          if (!X0.endEmitted && !X0.readableListening) {
            if (X0.readableListening = X0.needReadable = true, X0.flowing = false, X0.emittedReadable = false, I("on readable", X0.length, X0.reading), X0.length) c0(this);
            else if (!X0.reading) $.nextTick(UU, this);
          }
        }
        return n;
      }, o.prototype.addListener = o.prototype.on, o.prototype.removeListener = function(B, F) {
        let n = C.prototype.removeListener.call(this, B, F);
        if (B === "readable") $.nextTick(nQ, this);
        return n;
      }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(B) {
        let F = C.prototype.removeAllListeners.apply(this, arguments);
        if (B === "readable" || B === void 0) $.nextTick(nQ, this);
        return F;
      };
      function nQ(B) {
        let F = B._readableState;
        if (F.readableListening = B.listenerCount("readable") > 0, F.resumeScheduled && F[Y0] === false) F.flowing = true;
        else if (B.listenerCount("data") > 0) B.resume();
        else if (!F.readableListening) F.flowing = null;
      }
      function UU(B) {
        I("readable nexttick read 0"), B.read(0);
      }
      o.prototype.resume = function() {
        let B = this._readableState;
        if (!B.flowing) I("resume"), B.flowing = !B.readableListening, VU(this, B);
        return B[Y0] = false, this;
      };
      function VU(B, F) {
        if (!F.resumeScheduled) F.resumeScheduled = true, $.nextTick(zU, B, F);
      }
      function zU(B, F) {
        if (I("resume", F.reading), !F.reading) B.read(0);
        if (F.resumeScheduled = false, B.emit("resume"), rQ(B), F.flowing && !F.reading) B.read(0);
      }
      o.prototype.pause = function() {
        if (I("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== false) I("pause"), this._readableState.flowing = false, this.emit("pause");
        return this._readableState[Y0] = true, this;
      };
      function rQ(B) {
        let F = B._readableState;
        I("flow", F.flowing);
        while (F.flowing && B.read() !== null) ;
      }
      o.prototype.wrap = function(B) {
        let F = false;
        B.on("data", (X0) => {
          if (!this.push(X0) && B.pause) F = true, B.pause();
        }), B.on("end", () => {
          this.push(null);
        }), B.on("error", (X0) => {
          P(this, X0);
        }), B.on("close", () => {
          this.destroy();
        }), B.on("destroy", () => {
          this.destroy();
        }), this._read = () => {
          if (F && B.resume) F = false, B.resume();
        };
        let n = G(B);
        for (let X0 = 1; X0 < n.length; X0++) {
          let J0 = n[X0];
          if (this[J0] === void 0 && typeof B[J0] === "function") this[J0] = B[J0].bind(B);
        }
        return this;
      }, o.prototype[Z] = function() {
        return aQ(this);
      }, o.prototype.iterator = function(B) {
        if (B !== void 0) Q0(B, "options");
        return aQ(this, B);
      };
      function aQ(B, F) {
        if (typeof B.read !== "function") B = o.wrap(B, { objectMode: true });
        let n = GU(B, F);
        return n.stream = B, n;
      }
      async function* GU(B, F) {
        let n = U0;
        function X0(r0) {
          if (this === B) n(), n = U0;
          else n = r0;
        }
        B.on("readable", X0);
        let J0, y0 = w(B, { writable: false }, (r0) => {
          J0 = r0 ? x(J0, r0) : null, n(), n = U0;
        });
        try {
          while (true) {
            let r0 = B.destroyed ? null : B.read();
            if (r0 !== null) yield r0;
            else if (J0) throw J0;
            else if (J0 === null) return;
            else await new z(X0);
          }
        } catch (r0) {
          throw J0 = x(J0, r0), J0;
        } finally {
          if ((J0 || (F === null || F === void 0 ? void 0 : F.destroyOnReturn) !== false) && (J0 === void 0 || B._readableState.autoDestroy)) E.destroyer(B, null);
          else B.off("readable", X0), y0();
        }
      }
      U(o.prototype, { readable: { __proto__: null, get() {
        let B = this._readableState;
        return !!B && B.readable !== false && !B.destroyed && !B.errorEmitted && !B.endEmitted;
      }, set(B) {
        if (this._readableState) this._readableState.readable = !!B;
      } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.dataEmitted;
      } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
        return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
      } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.highWaterMark;
      } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
        return this._readableState && this._readableState.buffer;
      } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
        return this._readableState.flowing;
      }, set: function(B) {
        if (this._readableState) this._readableState.flowing = B;
      } }, readableLength: { __proto__: null, enumerable: false, get() {
        return this._readableState.length;
      } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.objectMode : false;
      } }, readableEncoding: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.encoding : null;
      } }, errored: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.errored : null;
      } }, closed: { __proto__: null, get() {
        return this._readableState ? this._readableState.closed : false;
      } }, destroyed: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.destroyed : false;
      }, set(B) {
        if (!this._readableState) return;
        this._readableState.destroyed = B;
      } }, readableEnded: { __proto__: null, enumerable: false, get() {
        return this._readableState ? this._readableState.endEmitted : false;
      } } }), U(q0.prototype, { pipesCount: { __proto__: null, get() {
        return this.pipes.length;
      } }, paused: { __proto__: null, get() {
        return this[Y0] !== false;
      }, set(B) {
        this[Y0] = !!B;
      } } }), o._fromList = sQ;
      function sQ(B, F) {
        if (F.length === 0) return null;
        let n;
        if (F.objectMode) n = F.buffer.shift();
        else if (!B || B >= F.length) {
          if (F.decoder) n = F.buffer.join("");
          else if (F.buffer.length === 1) n = F.buffer.first();
          else n = F.buffer.concat(F.length);
          F.buffer.clear();
        } else n = F.buffer.consume(B, F.decoder);
        return n;
      }
      function X5(B) {
        let F = B._readableState;
        if (I("endReadable", F.endEmitted), !F.endEmitted) F.ended = true, $.nextTick(WU, F, B);
      }
      function WU(B, F) {
        if (I("endReadableNT", B.endEmitted, B.length), !B.errored && !B.closeEmitted && !B.endEmitted && B.length === 0) {
          if (B.endEmitted = true, F.emit("end"), F.writable && F.allowHalfOpen === false) $.nextTick(BU, F);
          else if (B.autoDestroy) {
            let n = F._writableState;
            if (!n || n.autoDestroy && (n.finished || n.writable === false)) F.destroy();
          }
        }
      }
      function BU(B) {
        if (B.writable && !B.writableEnded && !B.destroyed) B.end();
      }
      o.from = function(B, F) {
        return c(o, B, F);
      };
      var Y5;
      function tQ() {
        if (Y5 === void 0) Y5 = {};
        return Y5;
      }
      o.fromWeb = function(B, F) {
        return tQ().newStreamReadableFromReadableStream(B, F);
      }, o.toWeb = function(B, F) {
        return tQ().newReadableStreamFromStreamReadable(B, F);
      }, o.wrap = function(B, F) {
        var n, X0;
        return new o({ objectMode: (n = (X0 = B.readableObjectMode) !== null && X0 !== void 0 ? X0 : B.objectMode) !== null && n !== void 0 ? n : true, ...F, destroy(J0, y0) {
          E.destroyer(B, J0), y0(J0);
        } }).wrap(B);
      };
    }), I5 = w0((Q, q) => {
      var $ = K1(), { ArrayPrototypeSlice: X, Error: Y, FunctionPrototypeSymbolHasInstance: J, ObjectDefineProperty: K, ObjectDefineProperties: U, ObjectSetPrototypeOf: G, StringPrototypeToLowerCase: V, Symbol: z, SymbolHasInstance: H } = D0();
      q.exports = Q0, Q0.WritableState = v;
      var { EventEmitter: j } = (X6(), a0($6)), Z = C5().Stream, { Buffer: h } = (O2(), a0(A2)), g = O1(), { addAbortSignal: C } = p6(), { getHighWaterMark: N, getDefaultHighWaterMark: W } = m6(), { ERR_INVALID_ARG_TYPE: M, ERR_METHOD_NOT_IMPLEMENTED: w, ERR_MULTIPLE_CALLBACK: I, ERR_STREAM_CANNOT_PIPE: f, ERR_STREAM_DESTROYED: E, ERR_STREAM_ALREADY_FINISHED: d, ERR_STREAM_NULL_VALUES: R, ERR_STREAM_WRITE_AFTER_END: x, ERR_UNKNOWN_ENCODING: D } = _0().codes, { errorOrDestroy: L } = g;
      G(Q0.prototype, Z.prototype), G(Q0, Z);
      function S() {
      }
      var y = z("kOnFinished");
      function v(A, T, b) {
        if (typeof b !== "boolean") b = T instanceof R2();
        if (this.objectMode = !!(A && A.objectMode), b) this.objectMode = this.objectMode || !!(A && A.writableObjectMode);
        this.highWaterMark = A ? N(this, A, "writableHighWaterMark", b) : W(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
        let r = !!(A && A.decodeStrings === false);
        this.decodeStrings = !r, this.defaultEncoding = A && A.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = P.bind(void 0, T), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, a(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !A || A.emitClose !== false, this.autoDestroy = !A || A.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[y] = [];
      }
      function a(A) {
        A.buffered = [], A.bufferedIndex = 0, A.allBuffers = true, A.allNoop = true;
      }
      v.prototype.getBuffer = function() {
        return X(this.buffered, this.bufferedIndex);
      }, K(v.prototype, "bufferedRequestCount", { __proto__: null, get() {
        return this.buffered.length - this.bufferedIndex;
      } });
      function Q0(A) {
        let T = this instanceof R2();
        if (!T && !J(Q0, this)) return new Q0(A);
        if (this._writableState = new v(A, this, T), A) {
          if (typeof A.write === "function") this._write = A.write;
          if (typeof A.writev === "function") this._writev = A.writev;
          if (typeof A.destroy === "function") this._destroy = A.destroy;
          if (typeof A.final === "function") this._final = A.final;
          if (typeof A.construct === "function") this._construct = A.construct;
          if (A.signal) C(A.signal, this);
        }
        Z.call(this, A), g.construct(this, () => {
          let b = this._writableState;
          if (!b.writing) K0(this, b);
          p(this, b);
        });
      }
      K(Q0, H, { __proto__: null, value: function(A) {
        if (J(this, A)) return true;
        if (this !== Q0) return false;
        return A && A._writableState instanceof v;
      } }), Q0.prototype.pipe = function() {
        L(this, new f());
      };
      function Y0(A, T, b, r) {
        let e = A._writableState;
        if (typeof b === "function") r = b, b = e.defaultEncoding;
        else {
          if (!b) b = e.defaultEncoding;
          else if (b !== "buffer" && !h.isEncoding(b)) throw new D(b);
          if (typeof r !== "function") r = S;
        }
        if (T === null) throw new R();
        else if (!e.objectMode) if (typeof T === "string") {
          if (e.decodeStrings !== false) T = h.from(T, b), b = "buffer";
        } else if (T instanceof h) b = "buffer";
        else if (Z._isUint8Array(T)) T = Z._uint8ArrayToBuffer(T), b = "buffer";
        else throw new M("chunk", ["string", "Buffer", "Uint8Array"], T);
        let t;
        if (e.ending) t = new x();
        else if (e.destroyed) t = new E("write");
        if (t) return $.nextTick(r, t), L(A, t, true), t;
        return e.pendingcb++, B0(A, e, T, b, r);
      }
      Q0.prototype.write = function(A, T, b) {
        return Y0(this, A, T, b) === true;
      }, Q0.prototype.cork = function() {
        this._writableState.corked++;
      }, Q0.prototype.uncork = function() {
        let A = this._writableState;
        if (A.corked) {
          if (A.corked--, !A.writing) K0(this, A);
        }
      }, Q0.prototype.setDefaultEncoding = function(A) {
        if (typeof A === "string") A = V(A);
        if (!h.isEncoding(A)) throw new D(A);
        return this._writableState.defaultEncoding = A, this;
      };
      function B0(A, T, b, r, e) {
        let t = T.objectMode ? 1 : b.length;
        T.length += t;
        let O = T.length < T.highWaterMark;
        if (!O) T.needDrain = true;
        if (T.writing || T.corked || T.errored || !T.constructed) {
          if (T.buffered.push({ chunk: b, encoding: r, callback: e }), T.allBuffers && r !== "buffer") T.allBuffers = false;
          if (T.allNoop && e !== S) T.allNoop = false;
        } else T.writelen = t, T.writecb = e, T.writing = true, T.sync = true, A._write(b, r, T.onwrite), T.sync = false;
        return O && !T.errored && !T.destroyed;
      }
      function c(A, T, b, r, e, t, O) {
        if (T.writelen = r, T.writecb = O, T.writing = true, T.sync = true, T.destroyed) T.onwrite(new E("write"));
        else if (b) A._writev(e, T.onwrite);
        else A._write(e, t, T.onwrite);
        T.sync = false;
      }
      function U0(A, T, b, r) {
        --T.pendingcb, r(b), u(T), L(A, b);
      }
      function P(A, T) {
        let b = A._writableState, r = b.sync, e = b.writecb;
        if (typeof e !== "function") {
          L(A, new I());
          return;
        }
        if (b.writing = false, b.writecb = null, b.length -= b.writelen, b.writelen = 0, T) {
          if (T.stack, !b.errored) b.errored = T;
          if (A._readableState && !A._readableState.errored) A._readableState.errored = T;
          if (r) $.nextTick(U0, A, b, T, e);
          else U0(A, b, T, e);
        } else {
          if (b.buffered.length > b.bufferedIndex) K0(A, b);
          if (r) if (b.afterWriteTickInfo !== null && b.afterWriteTickInfo.cb === e) b.afterWriteTickInfo.count++;
          else b.afterWriteTickInfo = { count: 1, cb: e, stream: A, state: b }, $.nextTick(l, b.afterWriteTickInfo);
          else $0(A, b, 1, e);
        }
      }
      function l({ stream: A, state: T, count: b, cb: r }) {
        return T.afterWriteTickInfo = null, $0(A, T, b, r);
      }
      function $0(A, T, b, r) {
        if (!T.ending && !A.destroyed && T.length === 0 && T.needDrain) T.needDrain = false, A.emit("drain");
        while (b-- > 0) T.pendingcb--, r();
        if (T.destroyed) u(T);
        p(A, T);
      }
      function u(A) {
        if (A.writing) return;
        for (let e = A.bufferedIndex; e < A.buffered.length; ++e) {
          var T;
          let { chunk: t, callback: O } = A.buffered[e], i = A.objectMode ? 1 : t.length;
          A.length -= i, O((T = A.errored) !== null && T !== void 0 ? T : new E("write"));
        }
        let b = A[y].splice(0);
        for (let e = 0; e < b.length; e++) {
          var r;
          b[e]((r = A.errored) !== null && r !== void 0 ? r : new E("end"));
        }
        a(A);
      }
      function K0(A, T) {
        if (T.corked || T.bufferProcessing || T.destroyed || !T.constructed) return;
        let { buffered: b, bufferedIndex: r, objectMode: e } = T, t = b.length - r;
        if (!t) return;
        let O = r;
        if (T.bufferProcessing = true, t > 1 && A._writev) {
          T.pendingcb -= t - 1;
          let i = T.allNoop ? S : (o) => {
            for (let V0 = O; V0 < b.length; ++V0) b[V0].callback(o);
          }, q0 = T.allNoop && O === 0 ? b : X(b, O);
          q0.allBuffers = T.allBuffers, c(A, T, true, T.length, q0, "", i), a(T);
        } else {
          do {
            let { chunk: i, encoding: q0, callback: o } = b[O];
            b[O++] = null;
            let V0 = e ? 1 : i.length;
            c(A, T, false, V0, i, q0, o);
          } while (O < b.length && !T.writing);
          if (O === b.length) a(T);
          else if (O > 256) b.splice(0, O), T.bufferedIndex = 0;
          else T.bufferedIndex = O;
        }
        T.bufferProcessing = false;
      }
      Q0.prototype._write = function(A, T, b) {
        if (this._writev) this._writev([{ chunk: A, encoding: T }], b);
        else throw new w("_write()");
      }, Q0.prototype._writev = null, Q0.prototype.end = function(A, T, b) {
        let r = this._writableState;
        if (typeof A === "function") b = A, A = null, T = null;
        else if (typeof T === "function") b = T, T = null;
        let e;
        if (A !== null && A !== void 0) {
          let t = Y0(this, A, T);
          if (t instanceof Y) e = t;
        }
        if (r.corked) r.corked = 1, this.uncork();
        if (e) ;
        else if (!r.errored && !r.ending) r.ending = true, p(this, r, true), r.ended = true;
        else if (r.finished) e = new d("end");
        else if (r.destroyed) e = new E("end");
        if (typeof b === "function") if (e || r.finished) $.nextTick(b, e);
        else r[y].push(b);
        return this;
      };
      function z0(A) {
        return A.ending && !A.destroyed && A.constructed && A.length === 0 && !A.errored && A.buffered.length === 0 && !A.finished && !A.writing && !A.errorEmitted && !A.closeEmitted;
      }
      function j0(A, T) {
        let b = false;
        function r(e) {
          if (b) {
            L(A, e !== null && e !== void 0 ? e : I());
            return;
          }
          if (b = true, T.pendingcb--, e) {
            let t = T[y].splice(0);
            for (let O = 0; O < t.length; O++) t[O](e);
            L(A, e, T.sync);
          } else if (z0(T)) T.prefinished = true, A.emit("prefinish"), T.pendingcb++, $.nextTick(m, A, T);
        }
        T.sync = true, T.pendingcb++;
        try {
          A._final(r);
        } catch (e) {
          r(e);
        }
        T.sync = false;
      }
      function Z0(A, T) {
        if (!T.prefinished && !T.finalCalled) if (typeof A._final === "function" && !T.destroyed) T.finalCalled = true, j0(A, T);
        else T.prefinished = true, A.emit("prefinish");
      }
      function p(A, T, b) {
        if (z0(T)) {
          if (Z0(A, T), T.pendingcb === 0) {
            if (b) T.pendingcb++, $.nextTick((r, e) => {
              if (z0(e)) m(r, e);
              else e.pendingcb--;
            }, A, T);
            else if (z0(T)) T.pendingcb++, m(A, T);
          }
        }
      }
      function m(A, T) {
        T.pendingcb--, T.finished = true;
        let b = T[y].splice(0);
        for (let r = 0; r < b.length; r++) b[r]();
        if (A.emit("finish"), T.autoDestroy) {
          let r = A._readableState;
          if (!r || r.autoDestroy && (r.endEmitted || r.readable === false)) A.destroy();
        }
      }
      U(Q0.prototype, { closed: { __proto__: null, get() {
        return this._writableState ? this._writableState.closed : false;
      } }, destroyed: { __proto__: null, get() {
        return this._writableState ? this._writableState.destroyed : false;
      }, set(A) {
        if (this._writableState) this._writableState.destroyed = A;
      } }, writable: { __proto__: null, get() {
        let A = this._writableState;
        return !!A && A.writable !== false && !A.destroyed && !A.errored && !A.ending && !A.ended;
      }, set(A) {
        if (this._writableState) this._writableState.writable = !!A;
      } }, writableFinished: { __proto__: null, get() {
        return this._writableState ? this._writableState.finished : false;
      } }, writableObjectMode: { __proto__: null, get() {
        return this._writableState ? this._writableState.objectMode : false;
      } }, writableBuffer: { __proto__: null, get() {
        return this._writableState && this._writableState.getBuffer();
      } }, writableEnded: { __proto__: null, get() {
        return this._writableState ? this._writableState.ending : false;
      } }, writableNeedDrain: { __proto__: null, get() {
        let A = this._writableState;
        if (!A) return false;
        return !A.destroyed && !A.ending && A.needDrain;
      } }, writableHighWaterMark: { __proto__: null, get() {
        return this._writableState && this._writableState.highWaterMark;
      } }, writableCorked: { __proto__: null, get() {
        return this._writableState ? this._writableState.corked : 0;
      } }, writableLength: { __proto__: null, get() {
        return this._writableState && this._writableState.length;
      } }, errored: { __proto__: null, enumerable: false, get() {
        return this._writableState ? this._writableState.errored : null;
      } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
        return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
      } } });
      var s = g.destroy;
      Q0.prototype.destroy = function(A, T) {
        let b = this._writableState;
        if (!b.destroyed && (b.bufferedIndex < b.buffered.length || b[y].length)) $.nextTick(u, b);
        return s.call(this, A, T), this;
      }, Q0.prototype._undestroy = g.undestroy, Q0.prototype._destroy = function(A, T) {
        T(A);
      }, Q0.prototype[j.captureRejectionSymbol] = function(A) {
        this.destroy(A);
      };
      var G0;
      function W0() {
        if (G0 === void 0) G0 = {};
        return G0;
      }
      Q0.fromWeb = function(A, T) {
        return W0().newStreamWritableFromWritableStream(A, T);
      }, Q0.toWeb = function(A) {
        return W0().newWritableStreamFromStreamWritable(A);
      };
    }), LV = w0((Q, q) => {
      var $ = K1(), X = (O2(), a0(A2)), { isReadable: Y, isWritable: J, isIterable: K, isNodeStream: U, isReadableNodeStream: G, isWritableNodeStream: V, isDuplexNodeStream: z, isReadableStream: H, isWritableStream: j } = x2(), Z = _2(), { AbortError: h, codes: { ERR_INVALID_ARG_TYPE: g, ERR_INVALID_RETURN_VALUE: C } } = _0(), { destroyer: N } = O1(), W = R2(), M = d6(), w = I5(), { createDeferredPromise: I } = m0(), f = l7(), E = globalThis.Blob || X.Blob, d = typeof E < "u" ? function(y) {
        return y instanceof E;
      } : function(y) {
        return false;
      }, R = globalThis.AbortController || Y6().AbortController, { FunctionPrototypeCall: x } = D0();
      class D extends W {
        constructor(y) {
          super(y);
          if ((y === null || y === void 0 ? void 0 : y.readable) === false) this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true;
          if ((y === null || y === void 0 ? void 0 : y.writable) === false) this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true;
        }
      }
      q.exports = function y(v, a) {
        if (z(v)) return v;
        if (G(v)) return S({ readable: v });
        if (V(v)) return S({ writable: v });
        if (U(v)) return S({ writable: false, readable: false });
        if (H(v)) return S({ readable: M.fromWeb(v) });
        if (j(v)) return S({ writable: w.fromWeb(v) });
        if (typeof v === "function") {
          let { value: Y0, write: B0, final: c, destroy: U0 } = L(v);
          if (K(Y0)) return f(D, Y0, { objectMode: true, write: B0, final: c, destroy: U0 });
          let P = Y0 === null || Y0 === void 0 ? void 0 : Y0.then;
          if (typeof P === "function") {
            let l, $0 = x(P, Y0, (u) => {
              if (u != null) throw new C("nully", "body", u);
            }, (u) => {
              N(l, u);
            });
            return l = new D({ objectMode: true, readable: false, write: B0, final(u) {
              c(async () => {
                try {
                  await $0, $.nextTick(u, null);
                } catch (K0) {
                  $.nextTick(u, K0);
                }
              });
            }, destroy: U0 });
          }
          throw new C("Iterable, AsyncIterable or AsyncFunction", a, Y0);
        }
        if (d(v)) return y(v.arrayBuffer());
        if (K(v)) return f(D, v, { objectMode: true, writable: false });
        if (H(v === null || v === void 0 ? void 0 : v.readable) && j(v === null || v === void 0 ? void 0 : v.writable)) return D.fromWeb(v);
        if (typeof (v === null || v === void 0 ? void 0 : v.writable) === "object" || typeof (v === null || v === void 0 ? void 0 : v.readable) === "object") {
          let Y0 = v !== null && v !== void 0 && v.readable ? G(v === null || v === void 0 ? void 0 : v.readable) ? v === null || v === void 0 ? void 0 : v.readable : y(v.readable) : void 0, B0 = v !== null && v !== void 0 && v.writable ? V(v === null || v === void 0 ? void 0 : v.writable) ? v === null || v === void 0 ? void 0 : v.writable : y(v.writable) : void 0;
          return S({ readable: Y0, writable: B0 });
        }
        let Q0 = v === null || v === void 0 ? void 0 : v.then;
        if (typeof Q0 === "function") {
          let Y0;
          return x(Q0, v, (B0) => {
            if (B0 != null) Y0.push(B0);
            Y0.push(null);
          }, (B0) => {
            N(Y0, B0);
          }), Y0 = new D({ objectMode: true, writable: false, read() {
          } });
        }
        throw new g(a, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], v);
      };
      function L(y) {
        let { promise: v, resolve: a } = I(), Q0 = new R(), Y0 = Q0.signal;
        return { value: y((async function* () {
          while (true) {
            let B0 = v;
            v = null;
            let { chunk: c, done: U0, cb: P } = await B0;
            if ($.nextTick(P), U0) return;
            if (Y0.aborted) throw new h(void 0, { cause: Y0.reason });
            ({ promise: v, resolve: a } = I()), yield c;
          }
        })(), { signal: Y0 }), write(B0, c, U0) {
          let P = a;
          a = null, P({ chunk: B0, done: false, cb: U0 });
        }, final(B0) {
          let c = a;
          a = null, c({ done: true, cb: B0 });
        }, destroy(B0, c) {
          Q0.abort(), c(B0);
        } };
      }
      function S(y) {
        let v = y.readable && typeof y.readable.read !== "function" ? M.wrap(y.readable) : y.readable, a = y.writable, Q0 = !!Y(v), Y0 = !!J(a), B0, c, U0, P, l;
        function $0(u) {
          let K0 = P;
          if (P = null, K0) K0(u);
          else if (u) l.destroy(u);
        }
        if (l = new D({ readableObjectMode: !!(v !== null && v !== void 0 && v.readableObjectMode), writableObjectMode: !!(a !== null && a !== void 0 && a.writableObjectMode), readable: Q0, writable: Y0 }), Y0) Z(a, (u) => {
          if (Y0 = false, u) N(v, u);
          $0(u);
        }), l._write = function(u, K0, z0) {
          if (a.write(u, K0)) z0();
          else B0 = z0;
        }, l._final = function(u) {
          a.end(), c = u;
        }, a.on("drain", function() {
          if (B0) {
            let u = B0;
            B0 = null, u();
          }
        }), a.on("finish", function() {
          if (c) {
            let u = c;
            c = null, u();
          }
        });
        if (Q0) Z(v, (u) => {
          if (Q0 = false, u) N(v, u);
          $0(u);
        }), v.on("readable", function() {
          if (U0) {
            let u = U0;
            U0 = null, u();
          }
        }), v.on("end", function() {
          l.push(null);
        }), l._read = function() {
          while (true) {
            let u = v.read();
            if (u === null) {
              U0 = l._read;
              return;
            }
            if (!l.push(u)) return;
          }
        };
        return l._destroy = function(u, K0) {
          if (!u && P !== null) u = new h();
          if (U0 = null, B0 = null, c = null, P === null) K0(u);
          else P = K0, N(a, u), N(v, u);
        }, l;
      }
    }), R2 = w0((Q, q) => {
      var { ObjectDefineProperties: $, ObjectGetOwnPropertyDescriptor: X, ObjectKeys: Y, ObjectSetPrototypeOf: J } = D0();
      q.exports = G;
      var K = d6(), U = I5();
      J(G.prototype, K.prototype), J(G, K);
      {
        let j = Y(U.prototype);
        for (let Z = 0; Z < j.length; Z++) {
          let h = j[Z];
          if (!G.prototype[h]) G.prototype[h] = U.prototype[h];
        }
      }
      function G(j) {
        if (!(this instanceof G)) return new G(j);
        if (K.call(this, j), U.call(this, j), j) {
          if (this.allowHalfOpen = j.allowHalfOpen !== false, j.readable === false) this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true;
          if (j.writable === false) this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true;
        } else this.allowHalfOpen = true;
      }
      $(G.prototype, { writable: { __proto__: null, ...X(U.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...X(U.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...X(U.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...X(U.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...X(U.prototype, "writableLength") }, writableFinished: { __proto__: null, ...X(U.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...X(U.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...X(U.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...X(U.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
        if (this._readableState === void 0 || this._writableState === void 0) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
      }, set(j) {
        if (this._readableState && this._writableState) this._readableState.destroyed = j, this._writableState.destroyed = j;
      } } });
      var V;
      function z() {
        if (V === void 0) V = {};
        return V;
      }
      G.fromWeb = function(j, Z) {
        return z().newStreamDuplexFromReadableWritablePair(j, Z);
      }, G.toWeb = function(j) {
        return z().newReadableWritablePairFromDuplex(j);
      };
      var H;
      G.from = function(j) {
        if (!H) H = LV();
        return H(j, "body");
      };
    }), i7 = w0((Q, q) => {
      var { ObjectSetPrototypeOf: $, Symbol: X } = D0();
      q.exports = G;
      var { ERR_METHOD_NOT_IMPLEMENTED: Y } = _0().codes, J = R2(), { getHighWaterMark: K } = m6();
      $(G.prototype, J.prototype), $(G, J);
      var U = X("kCallback");
      function G(H) {
        if (!(this instanceof G)) return new G(H);
        let j = H ? K(this, H, "readableHighWaterMark", true) : null;
        if (j === 0) H = { ...H, highWaterMark: null, readableHighWaterMark: j, writableHighWaterMark: H.writableHighWaterMark || 0 };
        if (J.call(this, H), this._readableState.sync = false, this[U] = null, H) {
          if (typeof H.transform === "function") this._transform = H.transform;
          if (typeof H.flush === "function") this._flush = H.flush;
        }
        this.on("prefinish", z);
      }
      function V(H) {
        if (typeof this._flush === "function" && !this.destroyed) this._flush((j, Z) => {
          if (j) {
            if (H) H(j);
            else this.destroy(j);
            return;
          }
          if (Z != null) this.push(Z);
          if (this.push(null), H) H();
        });
        else if (this.push(null), H) H();
      }
      function z() {
        if (this._final !== V) V.call(this);
      }
      G.prototype._final = V, G.prototype._transform = function(H, j, Z) {
        throw new Y("_transform()");
      }, G.prototype._write = function(H, j, Z) {
        let h = this._readableState, g = this._writableState, C = h.length;
        this._transform(H, j, (N, W) => {
          if (N) {
            Z(N);
            return;
          }
          if (W != null) this.push(W);
          if (g.ended || C === h.length || h.length < h.highWaterMark) Z();
          else this[U] = Z;
        });
      }, G.prototype._read = function() {
        if (this[U]) {
          let H = this[U];
          this[U] = null, H();
        }
      };
    }), o7 = w0((Q, q) => {
      var { ObjectSetPrototypeOf: $ } = D0();
      q.exports = Y;
      var X = i7();
      $(Y.prototype, X.prototype), $(Y, X);
      function Y(J) {
        if (!(this instanceof Y)) return new Y(J);
        X.call(this, J);
      }
      Y.prototype._transform = function(J, K, U) {
        U(null, J);
      };
    }), N5 = w0((Q, q) => {
      var $ = K1(), { ArrayIsArray: X, Promise: Y, SymbolAsyncIterator: J, SymbolDispose: K } = D0(), U = _2(), { once: G } = m0(), V = O1(), z = R2(), { aggregateTwoErrors: H, codes: { ERR_INVALID_ARG_TYPE: j, ERR_INVALID_RETURN_VALUE: Z, ERR_MISSING_ARGS: h, ERR_STREAM_DESTROYED: g, ERR_STREAM_PREMATURE_CLOSE: C }, AbortError: N } = _0(), { validateFunction: W, validateAbortSignal: M } = J6(), { isIterable: w, isReadable: I, isReadableNodeStream: f, isNodeStream: E, isTransformStream: d, isWebStream: R, isReadableStream: x, isReadableFinished: D } = x2(), L = globalThis.AbortController || Y6().AbortController, S, y, v;
      function a(u, K0, z0) {
        let j0 = false;
        u.on("close", () => {
          j0 = true;
        });
        let Z0 = U(u, { readable: K0, writable: z0 }, (p) => {
          j0 = !p;
        });
        return { destroy: (p) => {
          if (j0) return;
          j0 = true, V.destroyer(u, p || new g("pipe"));
        }, cleanup: Z0 };
      }
      function Q0(u) {
        return W(u[u.length - 1], "streams[stream.length - 1]"), u.pop();
      }
      function Y0(u) {
        if (w(u)) return u;
        else if (f(u)) return B0(u);
        throw new j("val", ["Readable", "Iterable", "AsyncIterable"], u);
      }
      async function* B0(u) {
        if (!y) y = d6();
        yield* y.prototype[J].call(u);
      }
      async function c(u, K0, z0, { end: j0 }) {
        let Z0, p = null, m = (W0) => {
          if (W0) Z0 = W0;
          if (p) {
            let A = p;
            p = null, A();
          }
        }, s = () => new Y((W0, A) => {
          if (Z0) A(Z0);
          else p = () => {
            if (Z0) A(Z0);
            else W0();
          };
        });
        K0.on("drain", m);
        let G0 = U(K0, { readable: false }, m);
        try {
          if (K0.writableNeedDrain) await s();
          for await (let W0 of u) if (!K0.write(W0)) await s();
          if (j0) K0.end(), await s();
          z0();
        } catch (W0) {
          z0(Z0 !== W0 ? H(Z0, W0) : W0);
        } finally {
          G0(), K0.off("drain", m);
        }
      }
      async function U0(u, K0, z0, { end: j0 }) {
        if (d(K0)) K0 = K0.writable;
        let Z0 = K0.getWriter();
        try {
          for await (let p of u) await Z0.ready, Z0.write(p).catch(() => {
          });
          if (await Z0.ready, j0) await Z0.close();
          z0();
        } catch (p) {
          try {
            await Z0.abort(p), z0(p);
          } catch (m) {
            z0(m);
          }
        }
      }
      function P(...u) {
        return l(u, G(Q0(u)));
      }
      function l(u, K0, z0) {
        if (u.length === 1 && X(u[0])) u = u[0];
        if (u.length < 2) throw new h("streams");
        let j0 = new L(), Z0 = j0.signal, p = z0 === null || z0 === void 0 ? void 0 : z0.signal, m = [];
        M(p, "options.signal");
        function s() {
          e(new N());
        }
        v = v || m0().addAbortListener;
        let G0;
        if (p) G0 = v(p, s);
        let W0, A, T = [], b = 0;
        function r(o) {
          e(o, --b === 0);
        }
        function e(o, V0) {
          var P0;
          if (o && (!W0 || W0.code === "ERR_STREAM_PREMATURE_CLOSE")) W0 = o;
          if (!W0 && !V0) return;
          while (T.length) T.shift()(W0);
          if ((P0 = G0) === null || P0 === void 0 || P0[K](), j0.abort(), V0) {
            if (!W0) m.forEach((o0) => o0());
            $.nextTick(K0, W0, A);
          }
        }
        let t;
        for (let o = 0; o < u.length; o++) {
          let V0 = u[o], P0 = o < u.length - 1, o0 = o > 0, n0 = P0 || (z0 === null || z0 === void 0 ? void 0 : z0.end) !== false, e2 = o === u.length - 1;
          if (E(V0)) {
            let g0 = function(c0) {
              if (c0 && c0.name !== "AbortError" && c0.code !== "ERR_STREAM_PREMATURE_CLOSE") r(c0);
            };
            var O = g0;
            if (n0) {
              let { destroy: c0, cleanup: I1 } = a(V0, P0, o0);
              if (T.push(c0), I(V0) && e2) m.push(I1);
            }
            if (V0.on("error", g0), I(V0) && e2) m.push(() => {
              V0.removeListener("error", g0);
            });
          }
          if (o === 0) if (typeof V0 === "function") {
            if (t = V0({ signal: Z0 }), !w(t)) throw new Z("Iterable, AsyncIterable or Stream", "source", t);
          } else if (w(V0) || f(V0) || d(V0)) t = V0;
          else t = z.from(V0);
          else if (typeof V0 === "function") {
            if (d(t)) {
              var i;
              t = Y0((i = t) === null || i === void 0 ? void 0 : i.readable);
            } else t = Y0(t);
            if (t = V0(t, { signal: Z0 }), P0) {
              if (!w(t, true)) throw new Z("AsyncIterable", `transform[${o - 1}]`, t);
            } else {
              var q0;
              if (!S) S = o7();
              let g0 = new S({ objectMode: true }), c0 = (q0 = t) === null || q0 === void 0 ? void 0 : q0.then;
              if (typeof c0 === "function") b++, c0.call(t, (W2) => {
                if (A = W2, W2 != null) g0.write(W2);
                if (n0) g0.end();
                $.nextTick(r);
              }, (W2) => {
                g0.destroy(W2), $.nextTick(r, W2);
              });
              else if (w(t, true)) b++, c(t, g0, r, { end: n0 });
              else if (x(t) || d(t)) {
                let W2 = t.readable || t;
                b++, c(W2, g0, r, { end: n0 });
              } else throw new Z("AsyncIterable or Promise", "destination", t);
              t = g0;
              let { destroy: I1, cleanup: N1 } = a(t, false, true);
              if (T.push(I1), e2) m.push(N1);
            }
          } else if (E(V0)) {
            if (f(t)) {
              b += 2;
              let g0 = $0(t, V0, r, { end: n0 });
              if (I(V0) && e2) m.push(g0);
            } else if (d(t) || x(t)) {
              let g0 = t.readable || t;
              b++, c(g0, V0, r, { end: n0 });
            } else if (w(t)) b++, c(t, V0, r, { end: n0 });
            else throw new j("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], t);
            t = V0;
          } else if (R(V0)) {
            if (f(t)) b++, U0(Y0(t), V0, r, { end: n0 });
            else if (x(t) || w(t)) b++, U0(t, V0, r, { end: n0 });
            else if (d(t)) b++, U0(t.readable, V0, r, { end: n0 });
            else throw new j("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], t);
            t = V0;
          } else t = z.from(V0);
        }
        if (Z0 !== null && Z0 !== void 0 && Z0.aborted || p !== null && p !== void 0 && p.aborted) $.nextTick(s);
        return t;
      }
      function $0(u, K0, z0, { end: j0 }) {
        let Z0 = false;
        if (K0.on("close", () => {
          if (!Z0) z0(new C());
        }), u.pipe(K0, { end: false }), j0) {
          let m = function() {
            Z0 = true, K0.end();
          };
          var p = m;
          if (D(u)) $.nextTick(m);
          else u.once("end", m);
        } else z0();
        return U(u, { readable: true, writable: false }, (m) => {
          let s = u._readableState;
          if (m && m.code === "ERR_STREAM_PREMATURE_CLOSE" && s && s.ended && !s.errored && !s.errorEmitted) u.once("end", z0).once("error", z0);
          else z0(m);
        }), U(K0, { readable: false, writable: true }, z0);
      }
      q.exports = { pipelineImpl: l, pipeline: P };
    }), n7 = w0((Q, q) => {
      var { pipeline: $ } = N5(), X = R2(), { destroyer: Y } = O1(), { isNodeStream: J, isReadable: K, isWritable: U, isWebStream: G, isTransformStream: V, isWritableStream: z, isReadableStream: H } = x2(), { AbortError: j, codes: { ERR_INVALID_ARG_VALUE: Z, ERR_MISSING_ARGS: h } } = _0(), g = _2();
      q.exports = function(...C) {
        if (C.length === 0) throw new h("streams");
        if (C.length === 1) return X.from(C[0]);
        let N = [...C];
        if (typeof C[0] === "function") C[0] = X.from(C[0]);
        if (typeof C[C.length - 1] === "function") {
          let L = C.length - 1;
          C[L] = X.from(C[L]);
        }
        for (let L = 0; L < C.length; ++L) {
          if (!J(C[L]) && !G(C[L])) continue;
          if (L < C.length - 1 && !(K(C[L]) || H(C[L]) || V(C[L]))) throw new Z(`streams[${L}]`, N[L], "must be readable");
          if (L > 0 && !(U(C[L]) || z(C[L]) || V(C[L]))) throw new Z(`streams[${L}]`, N[L], "must be writable");
        }
        let W, M, w, I, f;
        function E(L) {
          let S = I;
          if (I = null, S) S(L);
          else if (L) f.destroy(L);
          else if (!D && !x) f.destroy();
        }
        let d = C[0], R = $(C, E), x = !!(U(d) || z(d) || V(d)), D = !!(K(R) || H(R) || V(R));
        if (f = new X({ writableObjectMode: !!(d !== null && d !== void 0 && d.writableObjectMode), readableObjectMode: !!(R !== null && R !== void 0 && R.readableObjectMode), writable: x, readable: D }), x) {
          if (J(d)) f._write = function(S, y, v) {
            if (d.write(S, y)) v();
            else W = v;
          }, f._final = function(S) {
            d.end(), M = S;
          }, d.on("drain", function() {
            if (W) {
              let S = W;
              W = null, S();
            }
          });
          else if (G(d)) {
            let S = (V(d) ? d.writable : d).getWriter();
            f._write = async function(y, v, a) {
              try {
                await S.ready, S.write(y).catch(() => {
                }), a();
              } catch (Q0) {
                a(Q0);
              }
            }, f._final = async function(y) {
              try {
                await S.ready, S.close().catch(() => {
                }), M = y;
              } catch (v) {
                y(v);
              }
            };
          }
          let L = V(R) ? R.readable : R;
          g(L, () => {
            if (M) {
              let S = M;
              M = null, S();
            }
          });
        }
        if (D) {
          if (J(R)) R.on("readable", function() {
            if (w) {
              let L = w;
              w = null, L();
            }
          }), R.on("end", function() {
            f.push(null);
          }), f._read = function() {
            while (true) {
              let L = R.read();
              if (L === null) {
                w = f._read;
                return;
              }
              if (!f.push(L)) return;
            }
          };
          else if (G(R)) {
            let L = (V(R) ? R.readable : R).getReader();
            f._read = async function() {
              while (true) try {
                let { value: S, done: y } = await L.read();
                if (!f.push(S)) return;
                if (y) {
                  f.push(null);
                  return;
                }
              } catch {
                return;
              }
            };
          }
        }
        return f._destroy = function(L, S) {
          if (!L && I !== null) L = new j();
          if (w = null, W = null, M = null, I === null) S(L);
          else if (I = S, J(R)) Y(R, L);
        }, f;
      };
    }), CV = w0((Q, q) => {
      var $ = globalThis.AbortController || Y6().AbortController, { codes: { ERR_INVALID_ARG_VALUE: X, ERR_INVALID_ARG_TYPE: Y, ERR_MISSING_ARGS: J, ERR_OUT_OF_RANGE: K }, AbortError: U } = _0(), { validateAbortSignal: G, validateInteger: V, validateObject: z } = J6(), H = D0().Symbol("kWeak"), j = D0().Symbol("kResistStopPropagation"), { finished: Z } = _2(), h = n7(), { addAbortSignalNoValidate: g } = p6(), { isWritable: C, isNodeStream: N } = x2(), { deprecate: W } = m0(), { ArrayPrototypePush: M, Boolean: w, MathFloor: I, Number: f, NumberIsNaN: E, Promise: d, PromiseReject: R, PromiseResolve: x, PromisePrototypeThen: D, Symbol: L } = D0(), S = L("kEmpty"), y = L("kEof");
      function v(p, m) {
        if (m != null) z(m, "options");
        if ((m === null || m === void 0 ? void 0 : m.signal) != null) G(m.signal, "options.signal");
        if (N(p) && !C(p)) throw new X("stream", p, "must be writable");
        let s = h(this, p);
        if (m !== null && m !== void 0 && m.signal) g(m.signal, s);
        return s;
      }
      function a(p, m) {
        if (typeof p !== "function") throw new Y("fn", ["Function", "AsyncFunction"], p);
        if (m != null) z(m, "options");
        if ((m === null || m === void 0 ? void 0 : m.signal) != null) G(m.signal, "options.signal");
        let s = 1;
        if ((m === null || m === void 0 ? void 0 : m.concurrency) != null) s = I(m.concurrency);
        let G0 = s - 1;
        if ((m === null || m === void 0 ? void 0 : m.highWaterMark) != null) G0 = I(m.highWaterMark);
        return V(s, "options.concurrency", 1), V(G0, "options.highWaterMark", 0), G0 += s, async function* () {
          let W0 = m0().AbortSignalAny([m === null || m === void 0 ? void 0 : m.signal].filter(w)), A = this, T = [], b = { signal: W0 }, r, e, t = false, O = 0;
          function i() {
            t = true, q0();
          }
          function q0() {
            O -= 1, o();
          }
          function o() {
            if (e && !t && O < s && T.length < G0) e(), e = null;
          }
          async function V0() {
            try {
              for await (let P0 of A) {
                if (t) return;
                if (W0.aborted) throw new U();
                try {
                  if (P0 = p(P0, b), P0 === S) continue;
                  P0 = x(P0);
                } catch (o0) {
                  P0 = R(o0);
                }
                if (O += 1, D(P0, q0, i), T.push(P0), r) r(), r = null;
                if (!t && (T.length >= G0 || O >= s)) await new d((o0) => {
                  e = o0;
                });
              }
              T.push(y);
            } catch (P0) {
              let o0 = R(P0);
              D(o0, q0, i), T.push(o0);
            } finally {
              if (t = true, r) r(), r = null;
            }
          }
          V0();
          try {
            while (true) {
              while (T.length > 0) {
                let P0 = await T[0];
                if (P0 === y) return;
                if (W0.aborted) throw new U();
                if (P0 !== S) yield P0;
                T.shift(), o();
              }
              await new d((P0) => {
                r = P0;
              });
            }
          } finally {
            if (t = true, e) e(), e = null;
          }
        }.call(this);
      }
      function Q0(p = void 0) {
        if (p != null) z(p, "options");
        if ((p === null || p === void 0 ? void 0 : p.signal) != null) G(p.signal, "options.signal");
        return async function* () {
          let m = 0;
          for await (let G0 of this) {
            var s;
            if (p !== null && p !== void 0 && (s = p.signal) !== null && s !== void 0 && s.aborted) throw new U({ cause: p.signal.reason });
            yield [m++, G0];
          }
        }.call(this);
      }
      async function Y0(p, m = void 0) {
        for await (let s of P.call(this, p, m)) return true;
        return false;
      }
      async function B0(p, m = void 0) {
        if (typeof p !== "function") throw new Y("fn", ["Function", "AsyncFunction"], p);
        return !await Y0.call(this, async (...s) => {
          return !await p(...s);
        }, m);
      }
      async function c(p, m) {
        for await (let s of P.call(this, p, m)) return s;
        return;
      }
      async function U0(p, m) {
        if (typeof p !== "function") throw new Y("fn", ["Function", "AsyncFunction"], p);
        async function s(G0, W0) {
          return await p(G0, W0), S;
        }
        for await (let G0 of a.call(this, s, m)) ;
      }
      function P(p, m) {
        if (typeof p !== "function") throw new Y("fn", ["Function", "AsyncFunction"], p);
        async function s(G0, W0) {
          if (await p(G0, W0)) return G0;
          return S;
        }
        return a.call(this, s, m);
      }
      class l extends J {
        constructor() {
          super("reduce");
          this.message = "Reduce of an empty stream requires an initial value";
        }
      }
      async function $0(p, m, s) {
        var G0;
        if (typeof p !== "function") throw new Y("reducer", ["Function", "AsyncFunction"], p);
        if (s != null) z(s, "options");
        if ((s === null || s === void 0 ? void 0 : s.signal) != null) G(s.signal, "options.signal");
        let W0 = arguments.length > 1;
        if (s !== null && s !== void 0 && (G0 = s.signal) !== null && G0 !== void 0 && G0.aborted) {
          let e = new U(void 0, { cause: s.signal.reason });
          throw this.once("error", () => {
          }), await Z(this.destroy(e)), e;
        }
        let A = new $(), T = A.signal;
        if (s !== null && s !== void 0 && s.signal) {
          let e = { once: true, [H]: this, [j]: true };
          s.signal.addEventListener("abort", () => A.abort(), e);
        }
        let b = false;
        try {
          for await (let e of this) {
            var r;
            if (b = true, s !== null && s !== void 0 && (r = s.signal) !== null && r !== void 0 && r.aborted) throw new U();
            if (!W0) m = e, W0 = true;
            else m = await p(m, e, { signal: T });
          }
          if (!b && !W0) throw new l();
        } finally {
          A.abort();
        }
        return m;
      }
      async function u(p) {
        if (p != null) z(p, "options");
        if ((p === null || p === void 0 ? void 0 : p.signal) != null) G(p.signal, "options.signal");
        let m = [];
        for await (let G0 of this) {
          var s;
          if (p !== null && p !== void 0 && (s = p.signal) !== null && s !== void 0 && s.aborted) throw new U(void 0, { cause: p.signal.reason });
          M(m, G0);
        }
        return m;
      }
      function K0(p, m) {
        let s = a.call(this, p, m);
        return async function* () {
          for await (let G0 of s) yield* G0;
        }.call(this);
      }
      function z0(p) {
        if (p = f(p), E(p)) return 0;
        if (p < 0) throw new K("number", ">= 0", p);
        return p;
      }
      function j0(p, m = void 0) {
        if (m != null) z(m, "options");
        if ((m === null || m === void 0 ? void 0 : m.signal) != null) G(m.signal, "options.signal");
        return p = z0(p), async function* () {
          var s;
          if (m !== null && m !== void 0 && (s = m.signal) !== null && s !== void 0 && s.aborted) throw new U();
          for await (let W0 of this) {
            var G0;
            if (m !== null && m !== void 0 && (G0 = m.signal) !== null && G0 !== void 0 && G0.aborted) throw new U();
            if (p-- <= 0) yield W0;
          }
        }.call(this);
      }
      function Z0(p, m = void 0) {
        if (m != null) z(m, "options");
        if ((m === null || m === void 0 ? void 0 : m.signal) != null) G(m.signal, "options.signal");
        return p = z0(p), async function* () {
          var s;
          if (m !== null && m !== void 0 && (s = m.signal) !== null && s !== void 0 && s.aborted) throw new U();
          for await (let W0 of this) {
            var G0;
            if (m !== null && m !== void 0 && (G0 = m.signal) !== null && G0 !== void 0 && G0.aborted) throw new U();
            if (p-- > 0) yield W0;
            if (p <= 0) return;
          }
        }.call(this);
      }
      q.exports.streamReturningOperators = { asIndexedPairs: W(Q0, "readable.asIndexedPairs will be removed in a future version."), drop: j0, filter: P, flatMap: K0, map: a, take: Z0, compose: v }, q.exports.promiseReturningOperators = { every: B0, forEach: U0, reduce: $0, toArray: u, some: Y0, find: c };
    }), r7 = w0((Q, q) => {
      var { ArrayPrototypePop: $, Promise: X } = D0(), { isIterable: Y, isNodeStream: J, isWebStream: K } = x2(), { pipelineImpl: U } = N5(), { finished: G } = _2();
      a7();
      function V(...z) {
        return new X((H, j) => {
          let Z, h, g = z[z.length - 1];
          if (g && typeof g === "object" && !J(g) && !Y(g) && !K(g)) {
            let C = $(z);
            Z = C.signal, h = C.end;
          }
          U(z, (C, N) => {
            if (C) j(C);
            else H(N);
          }, { signal: Z, end: h });
        });
      }
      q.exports = { finished: G, pipeline: V };
    }), a7 = w0((Q, q) => {
      var { Buffer: $ } = (O2(), a0(A2)), { ObjectDefineProperty: X, ObjectKeys: Y, ReflectApply: J } = D0(), { promisify: { custom: K } } = m0(), { streamReturningOperators: U, promiseReturningOperators: G } = CV(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: V } } = _0(), z = n7(), { setDefaultHighWaterMark: H, getDefaultHighWaterMark: j } = m6(), { pipeline: Z } = N5(), { destroyer: h } = O1(), g = _2(), C = r7(), N = x2(), W = q.exports = C5().Stream;
      W.isDestroyed = N.isDestroyed, W.isDisturbed = N.isDisturbed, W.isErrored = N.isErrored, W.isReadable = N.isReadable, W.isWritable = N.isWritable, W.Readable = d6();
      for (let w of Y(U)) {
        let I = function(...E) {
          if (new.target) throw V();
          return W.Readable.from(J(f, this, E));
        }, f = U[w];
        X(I, "name", { __proto__: null, value: f.name }), X(I, "length", { __proto__: null, value: f.length }), X(W.Readable.prototype, w, { __proto__: null, value: I, enumerable: false, configurable: true, writable: true });
      }
      for (let w of Y(G)) {
        let I = function(...E) {
          if (new.target) throw V();
          return J(f, this, E);
        }, f = G[w];
        X(I, "name", { __proto__: null, value: f.name }), X(I, "length", { __proto__: null, value: f.length }), X(W.Readable.prototype, w, { __proto__: null, value: I, enumerable: false, configurable: true, writable: true });
      }
      W.Writable = I5(), W.Duplex = R2(), W.Transform = i7(), W.PassThrough = o7(), W.pipeline = Z;
      var { addAbortSignal: M } = p6();
      W.addAbortSignal = M, W.finished = g, W.destroy = h, W.compose = z, W.setDefaultHighWaterMark = H, W.getDefaultHighWaterMark = j, X(W, "promises", { __proto__: null, configurable: true, enumerable: true, get() {
        return C;
      } }), X(Z, K, { __proto__: null, enumerable: true, get() {
        return C.pipeline;
      } }), X(g, K, { __proto__: null, enumerable: true, get() {
        return C.finished;
      } }), W.Stream = W, W._isUint8Array = function(w) {
        return w instanceof Uint8Array;
      }, W._uint8ArrayToBuffer = function(w) {
        return $.from(w.buffer, w.byteOffset, w.byteLength);
      };
    }), IV = w0((Q, q) => {
      var $ = l6();
      {
        let X = a7(), Y = r7(), J = X.Readable.destroy;
        q.exports = X.Readable, q.exports._uint8ArrayToBuffer = X._uint8ArrayToBuffer, q.exports._isUint8Array = X._isUint8Array, q.exports.isDisturbed = X.isDisturbed, q.exports.isErrored = X.isErrored, q.exports.isReadable = X.isReadable, q.exports.Readable = X.Readable, q.exports.Writable = X.Writable, q.exports.Duplex = X.Duplex, q.exports.Transform = X.Transform, q.exports.PassThrough = X.PassThrough, q.exports.addAbortSignal = X.addAbortSignal, q.exports.finished = X.finished, q.exports.destroy = X.destroy, q.exports.destroy = J, q.exports.pipeline = X.pipeline, q.exports.compose = X.compose, Object.defineProperty(X, "promises", { configurable: true, enumerable: true, get() {
          return Y;
        } }), q.exports.Stream = X.Stream;
      }
      q.exports.default = q.exports;
    });
    s7.exports = IV();
  });
  var T2 = k((DV) => {
    DV.base64 = true;
    DV.array = true;
    DV.string = true;
    DV.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u";
    DV.nodebuffer = typeof Buffer < "u";
    DV.uint8array = typeof Uint8Array < "u";
    if (typeof ArrayBuffer > "u") DV.blob = false;
    else {
      i6 = new ArrayBuffer(0);
      try {
        DV.blob = new Blob([i6], { type: "application/zip" }).size === 0;
      } catch (Q) {
        try {
          A5 = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, o6 = new A5(), o6.append(i6), DV.blob = o6.getBlob("application/zip").size === 0;
        } catch (q) {
          DV.blob = false;
        }
      }
    }
    var i6, A5, o6;
    try {
      DV.nodestream = !!l6().Readable;
    } catch (Q) {
      DV.nodestream = false;
    }
  });
  var O5 = k((kV) => {
    var EV = A0(), SV = T2(), F2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    kV.encode = function(Q) {
      var q = [], $, X, Y, J, K, U, G, V = 0, z = Q.length, H = z, j = EV.getTypeOf(Q) !== "string";
      while (V < Q.length) {
        if (H = z - V, !j) $ = Q.charCodeAt(V++), X = V < z ? Q.charCodeAt(V++) : 0, Y = V < z ? Q.charCodeAt(V++) : 0;
        else $ = Q[V++], X = V < z ? Q[V++] : 0, Y = V < z ? Q[V++] : 0;
        J = $ >> 2, K = ($ & 3) << 4 | X >> 4, U = H > 1 ? (X & 15) << 2 | Y >> 6 : 64, G = H > 2 ? Y & 63 : 64, q.push(F2.charAt(J) + F2.charAt(K) + F2.charAt(U) + F2.charAt(G));
      }
      return q.join("");
    };
    kV.decode = function(Q) {
      var q, $, X, Y, J, K, U, G = 0, V = 0, z = "data:";
      if (Q.substr(0, z.length) === z) throw Error("Invalid base64 input, it looks like a data url.");
      Q = Q.replace(/[^A-Za-z0-9+/=]/g, "");
      var H = Q.length * 3 / 4;
      if (Q.charAt(Q.length - 1) === F2.charAt(64)) H--;
      if (Q.charAt(Q.length - 2) === F2.charAt(64)) H--;
      if (H % 1 !== 0) throw Error("Invalid base64 input, bad content length.");
      var j;
      if (SV.uint8array) j = new Uint8Array(H | 0);
      else j = Array(H | 0);
      while (G < Q.length) {
        if (Y = F2.indexOf(Q.charAt(G++)), J = F2.indexOf(Q.charAt(G++)), K = F2.indexOf(Q.charAt(G++)), U = F2.indexOf(Q.charAt(G++)), q = Y << 2 | J >> 4, $ = (J & 15) << 4 | K >> 2, X = (K & 3) << 6 | U, j[V++] = q, K !== 64) j[V++] = $;
        if (U !== 64) j[V++] = X;
      }
      return j;
    };
  });
  var K6 = k((tw, t7) => {
    t7.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(Q, q) {
      if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(Q, q);
      else {
        if (typeof Q === "number") throw Error('The "data" argument must not be a number');
        return new Buffer(Q, q);
      }
    }, allocBuffer: function(Q) {
      if (Buffer.alloc) return Buffer.alloc(Q);
      else {
        var q = new Buffer(Q);
        return q.fill(0), q;
      }
    }, isBuffer: function(Q) {
      return Buffer.isBuffer(Q);
    }, isStream: function(Q) {
      return Q && typeof Q.on === "function" && typeof Q.pause === "function" && typeof Q.resume === "function";
    } };
  });
  var q9 = k((ew, Q9) => {
    var e7 = global.MutationObserver || global.WebKitMutationObserver, U6;
    if (e7) r6 = 0, R5 = new e7(n6), a6 = global.document.createTextNode(""), R5.observe(a6, { characterData: true }), U6 = function() {
      a6.data = r6 = ++r6 % 2;
    };
    else if (!global.setImmediate && typeof global.MessageChannel < "u") s6 = new global.MessageChannel(), s6.port1.onmessage = n6, U6 = function() {
      s6.port2.postMessage(0);
    };
    else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) U6 = function() {
      var Q = global.document.createElement("script");
      Q.onreadystatechange = function() {
        n6(), Q.onreadystatechange = null, Q.parentNode.removeChild(Q), Q = null;
      }, global.document.documentElement.appendChild(Q);
    };
    else U6 = function() {
      setTimeout(n6, 0);
    };
    var r6, R5, a6, s6, x5, V6 = [];
    function n6() {
      x5 = true;
      var Q, q, $ = V6.length;
      while ($) {
        q = V6, V6 = [], Q = -1;
        while (++Q < $) q[Q]();
        $ = V6.length;
      }
      x5 = false;
    }
    Q9.exports = fV;
    function fV(Q) {
      if (V6.push(Q) === 1 && !x5) U6();
    }
  });
  var U9 = k((QP, K9) => {
    var hV = q9();
    function R1() {
    }
    var f0 = {}, $9 = ["REJECTED"], T5 = ["FULFILLED"], X9 = ["PENDING"];
    K9.exports = b2;
    function b2(Q) {
      if (typeof Q !== "function") throw TypeError("resolver must be a function");
      if (this.state = X9, this.queue = [], this.outcome = void 0, Q !== R1) Y9(this, Q);
    }
    b2.prototype.finally = function(Q) {
      if (typeof Q !== "function") return this;
      var q = this.constructor;
      return this.then($, X);
      function $(Y) {
        function J() {
          return Y;
        }
        return q.resolve(Q()).then(J);
      }
      function X(Y) {
        function J() {
          throw Y;
        }
        return q.resolve(Q()).then(J);
      }
    };
    b2.prototype.catch = function(Q) {
      return this.then(null, Q);
    };
    b2.prototype.then = function(Q, q) {
      if (typeof Q !== "function" && this.state === T5 || typeof q !== "function" && this.state === $9) return this;
      var $ = new this.constructor(R1);
      if (this.state !== X9) {
        var X = this.state === T5 ? Q : q;
        v5($, X, this.outcome);
      } else this.queue.push(new z6($, Q, q));
      return $;
    };
    function z6(Q, q, $) {
      if (this.promise = Q, typeof q === "function") this.onFulfilled = q, this.callFulfilled = this.otherCallFulfilled;
      if (typeof $ === "function") this.onRejected = $, this.callRejected = this.otherCallRejected;
    }
    z6.prototype.callFulfilled = function(Q) {
      f0.resolve(this.promise, Q);
    };
    z6.prototype.otherCallFulfilled = function(Q) {
      v5(this.promise, this.onFulfilled, Q);
    };
    z6.prototype.callRejected = function(Q) {
      f0.reject(this.promise, Q);
    };
    z6.prototype.otherCallRejected = function(Q) {
      v5(this.promise, this.onRejected, Q);
    };
    function v5(Q, q, $) {
      hV(function() {
        var X;
        try {
          X = q($);
        } catch (Y) {
          return f0.reject(Q, Y);
        }
        if (X === Q) f0.reject(Q, TypeError("Cannot resolve promise with itself"));
        else f0.resolve(Q, X);
      });
    }
    f0.resolve = function(Q, q) {
      var $ = J9(_V, q);
      if ($.status === "error") return f0.reject(Q, $.value);
      var X = $.value;
      if (X) Y9(Q, X);
      else {
        Q.state = T5, Q.outcome = q;
        var Y = -1, J = Q.queue.length;
        while (++Y < J) Q.queue[Y].callFulfilled(q);
      }
      return Q;
    };
    f0.reject = function(Q, q) {
      Q.state = $9, Q.outcome = q;
      var $ = -1, X = Q.queue.length;
      while (++$ < X) Q.queue[$].callRejected(q);
      return Q;
    };
    function _V(Q) {
      var q = Q && Q.then;
      if (Q && (typeof Q === "object" || typeof Q === "function") && typeof q === "function") return function() {
        q.apply(Q, arguments);
      };
    }
    function Y9(Q, q) {
      var $ = false;
      function X(U) {
        if ($) return;
        $ = true, f0.reject(Q, U);
      }
      function Y(U) {
        if ($) return;
        $ = true, f0.resolve(Q, U);
      }
      function J() {
        q(Y, X);
      }
      var K = J9(J);
      if (K.status === "error") X(K.value);
    }
    function J9(Q, q) {
      var $ = {};
      try {
        $.value = Q(q), $.status = "success";
      } catch (X) {
        $.status = "error", $.value = X;
      }
      return $;
    }
    b2.resolve = bV;
    function bV(Q) {
      if (Q instanceof this) return Q;
      return f0.resolve(new this(R1), Q);
    }
    b2.reject = uV;
    function uV(Q) {
      var q = new this(R1);
      return f0.reject(q, Q);
    }
    b2.all = cV;
    function cV(Q) {
      var q = this;
      if (Object.prototype.toString.call(Q) !== "[object Array]") return this.reject(TypeError("must be an array"));
      var $ = Q.length, X = false;
      if (!$) return this.resolve([]);
      var Y = Array($), J = 0, K = -1, U = new this(R1);
      while (++K < $) G(Q[K], K);
      return U;
      function G(V, z) {
        q.resolve(V).then(H, function(j) {
          if (!X) X = true, f0.reject(U, j);
        });
        function H(j) {
          if (Y[z] = j, ++J === $ && !X) X = true, f0.resolve(U, Y);
        }
      }
    }
    b2.race = pV;
    function pV(Q) {
      var q = this;
      if (Object.prototype.toString.call(Q) !== "[object Array]") return this.reject(TypeError("must be an array"));
      var $ = Q.length, X = false;
      if (!$) return this.resolve([]);
      var Y = -1, J = new this(R1);
      while (++Y < $) K(Q[Y]);
      return J;
      function K(U) {
        q.resolve(U).then(function(G) {
          if (!X) X = true, f0.resolve(J, G);
        }, function(G) {
          if (!X) X = true, f0.reject(J, G);
        });
      }
    }
  });
  var x1 = k((qP, V9) => {
    var E5 = null;
    if (typeof Promise < "u") E5 = Promise;
    else E5 = U9();
    V9.exports = { Promise: E5 };
  });
  var G9 = k((z9) => {
    (function(Q, q) {
      if (Q.setImmediate) return;
      var $ = 1, X = {}, Y = false, J = Q.document, K;
      function U(W) {
        if (typeof W !== "function") W = Function("" + W);
        var M = Array(arguments.length - 1);
        for (var w = 0; w < M.length; w++) M[w] = arguments[w + 1];
        var I = { callback: W, args: M };
        return X[$] = I, K($), $++;
      }
      function G(W) {
        delete X[W];
      }
      function V(W) {
        var { callback: M, args: w } = W;
        switch (w.length) {
          case 0:
            M();
            break;
          case 1:
            M(w[0]);
            break;
          case 2:
            M(w[0], w[1]);
            break;
          case 3:
            M(w[0], w[1], w[2]);
            break;
          default:
            M.apply(q, w);
            break;
        }
      }
      function z(W) {
        if (Y) setTimeout(z, 0, W);
        else {
          var M = X[W];
          if (M) {
            Y = true;
            try {
              V(M);
            } finally {
              G(W), Y = false;
            }
          }
        }
      }
      function H() {
        K = function(W) {
          process.nextTick(function() {
            z(W);
          });
        };
      }
      function j() {
        if (Q.postMessage && !Q.importScripts) {
          var W = true, M = Q.onmessage;
          return Q.onmessage = function() {
            W = false;
          }, Q.postMessage("", "*"), Q.onmessage = M, W;
        }
      }
      function Z() {
        var W = "setImmediate$" + Math.random() + "$", M = function(w) {
          if (w.source === Q && typeof w.data === "string" && w.data.indexOf(W) === 0) z(+w.data.slice(W.length));
        };
        if (Q.addEventListener) Q.addEventListener("message", M, false);
        else Q.attachEvent("onmessage", M);
        K = function(w) {
          Q.postMessage(W + w, "*");
        };
      }
      function h() {
        var W = new MessageChannel();
        W.port1.onmessage = function(M) {
          var w = M.data;
          z(w);
        }, K = function(M) {
          W.port2.postMessage(M);
        };
      }
      function g() {
        var W = J.documentElement;
        K = function(M) {
          var w = J.createElement("script");
          w.onreadystatechange = function() {
            z(M), w.onreadystatechange = null, W.removeChild(w), w = null;
          }, W.appendChild(w);
        };
      }
      function C() {
        K = function(W) {
          setTimeout(z, 0, W);
        };
      }
      var N = Object.getPrototypeOf && Object.getPrototypeOf(Q);
      if (N = N && N.setTimeout ? N : Q, {}.toString.call(Q.process) === "[object process]") H();
      else if (j()) Z();
      else if (Q.MessageChannel) h();
      else if (J && "onreadystatechange" in J.createElement("script")) g();
      else C();
      N.setImmediate = U, N.clearImmediate = G;
    })(typeof self > "u" ? typeof global > "u" ? z9 : global : self);
  });
  var A0 = k((lV) => {
    var u2 = T2(), mV = O5(), T1 = K6(), S5 = x1();
    G9();
    function dV(Q) {
      var q = null;
      if (u2.uint8array) q = new Uint8Array(Q.length);
      else q = Array(Q.length);
      return e6(Q, q);
    }
    lV.newBlob = function(Q, q) {
      lV.checkSupport("blob");
      try {
        return new Blob([Q], { type: q });
      } catch (Y) {
        try {
          var $ = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder, X = new $();
          return X.append(Q), X.getBlob(q);
        } catch (J) {
          throw Error("Bug : can't construct the Blob.");
        }
      }
    };
    function G6(Q) {
      return Q;
    }
    function e6(Q, q) {
      for (var $ = 0; $ < Q.length; ++$) q[$] = Q.charCodeAt($) & 255;
      return q;
    }
    var t6 = { stringifyByChunk: function(Q, q, $) {
      var X = [], Y = 0, J = Q.length;
      if (J <= $) return String.fromCharCode.apply(null, Q);
      while (Y < J) {
        if (q === "array" || q === "nodebuffer") X.push(String.fromCharCode.apply(null, Q.slice(Y, Math.min(Y + $, J))));
        else X.push(String.fromCharCode.apply(null, Q.subarray(Y, Math.min(Y + $, J))));
        Y += $;
      }
      return X.join("");
    }, stringifyByChar: function(Q) {
      var q = "";
      for (var $ = 0; $ < Q.length; $++) q += String.fromCharCode(Q[$]);
      return q;
    }, applyCanBeUsed: { uint8array: (function() {
      try {
        return u2.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
      } catch (Q) {
        return false;
      }
    })(), nodebuffer: (function() {
      try {
        return u2.nodebuffer && String.fromCharCode.apply(null, T1.allocBuffer(1)).length === 1;
      } catch (Q) {
        return false;
      }
    })() } };
    function W6(Q) {
      var q = 65536, $ = lV.getTypeOf(Q), X = true;
      if ($ === "uint8array") X = t6.applyCanBeUsed.uint8array;
      else if ($ === "nodebuffer") X = t6.applyCanBeUsed.nodebuffer;
      if (X) while (q > 1) try {
        return t6.stringifyByChunk(Q, $, q);
      } catch (Y) {
        q = Math.floor(q / 2);
      }
      return t6.stringifyByChar(Q);
    }
    lV.applyFromCharCode = W6;
    function Q8(Q, q) {
      for (var $ = 0; $ < Q.length; $++) q[$] = Q[$];
      return q;
    }
    var c2 = {};
    c2.string = { string: G6, array: function(Q) {
      return e6(Q, Array(Q.length));
    }, arraybuffer: function(Q) {
      return c2.string.uint8array(Q).buffer;
    }, uint8array: function(Q) {
      return e6(Q, new Uint8Array(Q.length));
    }, nodebuffer: function(Q) {
      return e6(Q, T1.allocBuffer(Q.length));
    } };
    c2.array = { string: W6, array: G6, arraybuffer: function(Q) {
      return new Uint8Array(Q).buffer;
    }, uint8array: function(Q) {
      return new Uint8Array(Q);
    }, nodebuffer: function(Q) {
      return T1.newBufferFrom(Q);
    } };
    c2.arraybuffer = { string: function(Q) {
      return W6(new Uint8Array(Q));
    }, array: function(Q) {
      return Q8(new Uint8Array(Q), Array(Q.byteLength));
    }, arraybuffer: G6, uint8array: function(Q) {
      return new Uint8Array(Q);
    }, nodebuffer: function(Q) {
      return T1.newBufferFrom(new Uint8Array(Q));
    } };
    c2.uint8array = { string: W6, array: function(Q) {
      return Q8(Q, Array(Q.length));
    }, arraybuffer: function(Q) {
      return Q.buffer;
    }, uint8array: G6, nodebuffer: function(Q) {
      return T1.newBufferFrom(Q);
    } };
    c2.nodebuffer = { string: W6, array: function(Q) {
      return Q8(Q, Array(Q.length));
    }, arraybuffer: function(Q) {
      return c2.nodebuffer.uint8array(Q).buffer;
    }, uint8array: function(Q) {
      return Q8(Q, new Uint8Array(Q.length));
    }, nodebuffer: G6 };
    lV.transformTo = function(Q, q) {
      if (!q) q = "";
      if (!Q) return q;
      lV.checkSupport(Q);
      var $ = lV.getTypeOf(q), X = c2[$][Q](q);
      return X;
    };
    lV.resolve = function(Q) {
      var q = Q.split("/"), $ = [];
      for (var X = 0; X < q.length; X++) {
        var Y = q[X];
        if (Y === "." || Y === "" && X !== 0 && X !== q.length - 1) continue;
        else if (Y === "..") $.pop();
        else $.push(Y);
      }
      return $.join("/");
    };
    lV.getTypeOf = function(Q) {
      if (typeof Q === "string") return "string";
      if (Object.prototype.toString.call(Q) === "[object Array]") return "array";
      if (u2.nodebuffer && T1.isBuffer(Q)) return "nodebuffer";
      if (u2.uint8array && Q instanceof Uint8Array) return "uint8array";
      if (u2.arraybuffer && Q instanceof ArrayBuffer) return "arraybuffer";
    };
    lV.checkSupport = function(Q) {
      var q = u2[Q.toLowerCase()];
      if (!q) throw Error(Q + " is not supported by this platform");
    };
    lV.MAX_VALUE_16BITS = 65535;
    lV.MAX_VALUE_32BITS = -1;
    lV.pretty = function(Q) {
      var q = "", $, X;
      for (X = 0; X < (Q || "").length; X++) $ = Q.charCodeAt(X), q += "\\x" + ($ < 16 ? "0" : "") + $.toString(16).toUpperCase();
      return q;
    };
    lV.delay = function(Q, q, $) {
      setImmediate(function() {
        Q.apply($ || null, q || []);
      });
    };
    lV.inherits = function(Q, q) {
      var $ = function() {
      };
      $.prototype = q.prototype, Q.prototype = new $();
    };
    lV.extend = function() {
      var Q = {}, q, $;
      for (q = 0; q < arguments.length; q++) for ($ in arguments[q]) if (Object.prototype.hasOwnProperty.call(arguments[q], $) && typeof Q[$] > "u") Q[$] = arguments[q][$];
      return Q;
    };
    lV.prepareContent = function(Q, q, $, X, Y) {
      var J = S5.Promise.resolve(q).then(function(K) {
        var U = u2.blob && (K instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(K)) !== -1);
        if (U && typeof FileReader < "u") return new S5.Promise(function(G, V) {
          var z = new FileReader();
          z.onload = function(H) {
            G(H.target.result);
          }, z.onerror = function(H) {
            V(H.target.error);
          }, z.readAsArrayBuffer(K);
        });
        else return K;
      });
      return J.then(function(K) {
        var U = lV.getTypeOf(K);
        if (!U) return S5.Promise.reject(Error("Can't read the data of '" + Q + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        if (U === "arraybuffer") K = lV.transformTo("uint8array", K);
        else if (U === "string") {
          if (Y) K = mV.decode(K);
          else if ($) {
            if (X !== true) K = dV(K);
          }
        }
        return K;
      });
    };
  });
  var l0 = k((YP, F9) => {
    function Z9(Q) {
      this.name = Q || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
    }
    Z9.prototype = { push: function(Q) {
      this.emit("data", Q);
    }, end: function() {
      if (this.isFinished) return false;
      this.flush();
      try {
        this.emit("end"), this.cleanUp(), this.isFinished = true;
      } catch (Q) {
        this.emit("error", Q);
      }
      return true;
    }, error: function(Q) {
      if (this.isFinished) return false;
      if (this.isPaused) this.generatedError = Q;
      else {
        if (this.isFinished = true, this.emit("error", Q), this.previous) this.previous.error(Q);
        this.cleanUp();
      }
      return true;
    }, on: function(Q, q) {
      return this._listeners[Q].push(q), this;
    }, cleanUp: function() {
      this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
    }, emit: function(Q, q) {
      if (this._listeners[Q]) for (var $ = 0; $ < this._listeners[Q].length; $++) this._listeners[Q][$].call(this, q);
    }, pipe: function(Q) {
      return Q.registerPrevious(this);
    }, registerPrevious: function(Q) {
      if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
      this.streamInfo = Q.streamInfo, this.mergeStreamInfo(), this.previous = Q;
      var q = this;
      return Q.on("data", function($) {
        q.processChunk($);
      }), Q.on("end", function() {
        q.end();
      }), Q.on("error", function($) {
        q.error($);
      }), this;
    }, pause: function() {
      if (this.isPaused || this.isFinished) return false;
      if (this.isPaused = true, this.previous) this.previous.pause();
      return true;
    }, resume: function() {
      if (!this.isPaused || this.isFinished) return false;
      this.isPaused = false;
      var Q = false;
      if (this.generatedError) this.error(this.generatedError), Q = true;
      if (this.previous) this.previous.resume();
      return !Q;
    }, flush: function() {
    }, processChunk: function(Q) {
      this.push(Q);
    }, withStreamInfo: function(Q, q) {
      return this.extraStreamInfo[Q] = q, this.mergeStreamInfo(), this;
    }, mergeStreamInfo: function() {
      for (var Q in this.extraStreamInfo) {
        if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, Q)) continue;
        this.streamInfo[Q] = this.extraStreamInfo[Q];
      }
    }, lock: function() {
      if (this.isLocked) throw Error("The stream '" + this + "' has already been used.");
      if (this.isLocked = true, this.previous) this.previous.lock();
    }, toString: function() {
      var Q = "Worker " + this.name;
      if (this.previous) return this.previous + " -> " + Q;
      else return Q;
    } };
    F9.exports = Z9;
  });
  var E1 = k((Kz) => {
    var v1 = A0(), U1 = T2(), $z = K6(), q8 = l0(), B6 = Array(256);
    for (j2 = 0; j2 < 256; j2++) B6[j2] = j2 >= 252 ? 6 : j2 >= 248 ? 5 : j2 >= 240 ? 4 : j2 >= 224 ? 3 : j2 >= 192 ? 2 : 1;
    var j2;
    B6[254] = B6[254] = 1;
    var Xz = function(Q) {
      var q, $, X, Y, J, K = Q.length, U = 0;
      for (Y = 0; Y < K; Y++) {
        if ($ = Q.charCodeAt(Y), ($ & 64512) === 55296 && Y + 1 < K) {
          if (X = Q.charCodeAt(Y + 1), (X & 64512) === 56320) $ = 65536 + ($ - 55296 << 10) + (X - 56320), Y++;
        }
        U += $ < 128 ? 1 : $ < 2048 ? 2 : $ < 65536 ? 3 : 4;
      }
      if (U1.uint8array) q = new Uint8Array(U);
      else q = Array(U);
      for (J = 0, Y = 0; J < U; Y++) {
        if ($ = Q.charCodeAt(Y), ($ & 64512) === 55296 && Y + 1 < K) {
          if (X = Q.charCodeAt(Y + 1), (X & 64512) === 56320) $ = 65536 + ($ - 55296 << 10) + (X - 56320), Y++;
        }
        if ($ < 128) q[J++] = $;
        else if ($ < 2048) q[J++] = 192 | $ >>> 6, q[J++] = 128 | $ & 63;
        else if ($ < 65536) q[J++] = 224 | $ >>> 12, q[J++] = 128 | $ >>> 6 & 63, q[J++] = 128 | $ & 63;
        else q[J++] = 240 | $ >>> 18, q[J++] = 128 | $ >>> 12 & 63, q[J++] = 128 | $ >>> 6 & 63, q[J++] = 128 | $ & 63;
      }
      return q;
    }, Yz = function(Q, q) {
      var $;
      if (q = q || Q.length, q > Q.length) q = Q.length;
      $ = q - 1;
      while ($ >= 0 && (Q[$] & 192) === 128) $--;
      if ($ < 0) return q;
      if ($ === 0) return q;
      return $ + B6[Q[$]] > q ? $ : q;
    }, Jz = function(Q) {
      var q, $, X, Y, J = Q.length, K = Array(J * 2);
      for ($ = 0, q = 0; q < J; ) {
        if (X = Q[q++], X < 128) {
          K[$++] = X;
          continue;
        }
        if (Y = B6[X], Y > 4) {
          K[$++] = 65533, q += Y - 1;
          continue;
        }
        X &= Y === 2 ? 31 : Y === 3 ? 15 : 7;
        while (Y > 1 && q < J) X = X << 6 | Q[q++] & 63, Y--;
        if (Y > 1) {
          K[$++] = 65533;
          continue;
        }
        if (X < 65536) K[$++] = X;
        else X -= 65536, K[$++] = 55296 | X >> 10 & 1023, K[$++] = 56320 | X & 1023;
      }
      if (K.length !== $) if (K.subarray) K = K.subarray(0, $);
      else K.length = $;
      return v1.applyFromCharCode(K);
    };
    Kz.utf8encode = function(q) {
      if (U1.nodebuffer) return $z.newBufferFrom(q, "utf-8");
      return Xz(q);
    };
    Kz.utf8decode = function(q) {
      if (U1.nodebuffer) return v1.transformTo("nodebuffer", q).toString("utf-8");
      return q = v1.transformTo(U1.uint8array ? "uint8array" : "array", q), Jz(q);
    };
    function $8() {
      q8.call(this, "utf-8 decode"), this.leftOver = null;
    }
    v1.inherits($8, q8);
    $8.prototype.processChunk = function(Q) {
      var q = v1.transformTo(U1.uint8array ? "uint8array" : "array", Q.data);
      if (this.leftOver && this.leftOver.length) {
        if (U1.uint8array) {
          var $ = q;
          q = new Uint8Array($.length + this.leftOver.length), q.set(this.leftOver, 0), q.set($, this.leftOver.length);
        } else q = this.leftOver.concat(q);
        this.leftOver = null;
      }
      var X = Yz(q), Y = q;
      if (X !== q.length) if (U1.uint8array) Y = q.subarray(0, X), this.leftOver = q.subarray(X, q.length);
      else Y = q.slice(0, X), this.leftOver = q.slice(X, q.length);
      this.push({ data: Kz.utf8decode(Y), meta: Q.meta });
    };
    $8.prototype.flush = function() {
      if (this.leftOver && this.leftOver.length) this.push({ data: Kz.utf8decode(this.leftOver), meta: {} }), this.leftOver = null;
    };
    Kz.Utf8DecodeWorker = $8;
    function g5() {
      q8.call(this, "utf-8 encode");
    }
    v1.inherits(g5, q8);
    g5.prototype.processChunk = function(Q) {
      this.push({ data: Kz.utf8encode(Q.data), meta: Q.meta });
    };
    Kz.Utf8EncodeWorker = g5;
  });
  var P9 = k((KP, w9) => {
    var H9 = l0(), M9 = A0();
    function f5(Q) {
      H9.call(this, "ConvertWorker to " + Q), this.destType = Q;
    }
    M9.inherits(f5, H9);
    f5.prototype.processChunk = function(Q) {
      this.push({ data: M9.transformTo(this.destType, Q.data), meta: Q.meta });
    };
    w9.exports = f5;
  });
  var I9 = k((UP, C9) => {
    var L9 = l6().Readable, zz = A0();
    zz.inherits(h5, L9);
    function h5(Q, q, $) {
      L9.call(this, q), this._helper = Q;
      var X = this;
      Q.on("data", function(Y, J) {
        if (!X.push(Y)) X._helper.pause();
        if ($) $(J);
      }).on("error", function(Y) {
        X.emit("error", Y);
      }).on("end", function() {
        X.push(null);
      });
    }
    h5.prototype._read = function() {
      this._helper.resume();
    };
    C9.exports = h5;
  });
  var _5 = k((VP, A9) => {
    var V1 = A0(), Gz = P9(), Wz = l0(), Bz = O5(), Zz = T2(), Fz = x1(), N9 = null;
    if (Zz.nodestream) try {
      N9 = I9();
    } catch (Q) {
    }
    function jz(Q, q, $) {
      switch (Q) {
        case "blob":
          return V1.newBlob(V1.transformTo("arraybuffer", q), $);
        case "base64":
          return Bz.encode(q);
        default:
          return V1.transformTo(Q, q);
      }
    }
    function Hz(Q, q) {
      var $, X = 0, Y = null, J = 0;
      for ($ = 0; $ < q.length; $++) J += q[$].length;
      switch (Q) {
        case "string":
          return q.join("");
        case "array":
          return Array.prototype.concat.apply([], q);
        case "uint8array":
          Y = new Uint8Array(J);
          for ($ = 0; $ < q.length; $++) Y.set(q[$], X), X += q[$].length;
          return Y;
        case "nodebuffer":
          return Buffer.concat(q);
        default:
          throw Error("concat : unsupported type '" + Q + "'");
      }
    }
    function Mz(Q, q) {
      return new Fz.Promise(function($, X) {
        var Y = [], J = Q._internalType, K = Q._outputType, U = Q._mimeType;
        Q.on("data", function(G, V) {
          if (Y.push(G), q) q(V);
        }).on("error", function(G) {
          Y = [], X(G);
        }).on("end", function() {
          try {
            var G = jz(K, Hz(J, Y), U);
            $(G);
          } catch (V) {
            X(V);
          }
          Y = [];
        }).resume();
      });
    }
    function D9(Q, q, $) {
      var X = q;
      switch (q) {
        case "blob":
        case "arraybuffer":
          X = "uint8array";
          break;
        case "base64":
          X = "string";
          break;
      }
      try {
        this._internalType = X, this._outputType = q, this._mimeType = $, V1.checkSupport(X), this._worker = Q.pipe(new Gz(X)), Q.lock();
      } catch (Y) {
        this._worker = new Wz("error"), this._worker.error(Y);
      }
    }
    D9.prototype = { accumulate: function(Q) {
      return Mz(this, Q);
    }, on: function(Q, q) {
      var $ = this;
      if (Q === "data") this._worker.on(Q, function(X) {
        q.call($, X.data, X.meta);
      });
      else this._worker.on(Q, function() {
        V1.delay(q, arguments, $);
      });
      return this;
    }, resume: function() {
      return V1.delay(this._worker.resume, [], this._worker), this;
    }, pause: function() {
      return this._worker.pause(), this;
    }, toNodejsStream: function(Q) {
      if (V1.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw Error(this._outputType + " is not supported by this method");
      return new N9(this, { objectMode: this._outputType !== "nodebuffer" }, Q);
    } };
    A9.exports = D9;
  });
  var b5 = k((wz) => {
    wz.base64 = false;
    wz.binary = false;
    wz.dir = false;
    wz.createFolders = true;
    wz.date = null;
    wz.compression = null;
    wz.compressionOptions = null;
    wz.comment = null;
    wz.unixPermissions = null;
    wz.dosPermissions = null;
  });
  var u5 = k((GP, O9) => {
    var X8 = A0(), Y8 = l0(), Tz = 16384;
    function S1(Q) {
      Y8.call(this, "DataWorker");
      var q = this;
      this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, Q.then(function($) {
        if (q.dataIsReady = true, q.data = $, q.max = $ && $.length || 0, q.type = X8.getTypeOf($), !q.isPaused) q._tickAndRepeat();
      }, function($) {
        q.error($);
      });
    }
    X8.inherits(S1, Y8);
    S1.prototype.cleanUp = function() {
      Y8.prototype.cleanUp.call(this), this.data = null;
    };
    S1.prototype.resume = function() {
      if (!Y8.prototype.resume.call(this)) return false;
      if (!this._tickScheduled && this.dataIsReady) this._tickScheduled = true, X8.delay(this._tickAndRepeat, [], this);
      return true;
    };
    S1.prototype._tickAndRepeat = function() {
      if (this._tickScheduled = false, this.isPaused || this.isFinished) return;
      if (this._tick(), !this.isFinished) X8.delay(this._tickAndRepeat, [], this), this._tickScheduled = true;
    };
    S1.prototype._tick = function() {
      if (this.isPaused || this.isFinished) return false;
      var Q = Tz, q = null, $ = Math.min(this.max, this.index + Q);
      if (this.index >= this.max) return this.end();
      else {
        switch (this.type) {
          case "string":
            q = this.data.substring(this.index, $);
            break;
          case "uint8array":
            q = this.data.subarray(this.index, $);
            break;
          case "array":
          case "nodebuffer":
            q = this.data.slice(this.index, $);
            break;
        }
        return this.index = $, this.push({ data: q, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }
    };
    O9.exports = S1;
  });
  var J8 = k((WP, x9) => {
    var vz = A0();
    function Ez() {
      var Q, q = [];
      for (var $ = 0; $ < 256; $++) {
        Q = $;
        for (var X = 0; X < 8; X++) Q = Q & 1 ? 3988292384 ^ Q >>> 1 : Q >>> 1;
        q[$] = Q;
      }
      return q;
    }
    var R9 = Ez();
    function Sz(Q, q, $, X) {
      var Y = R9, J = X + $;
      Q = Q ^ -1;
      for (var K = X; K < J; K++) Q = Q >>> 8 ^ Y[(Q ^ q[K]) & 255];
      return Q ^ -1;
    }
    function kz(Q, q, $, X) {
      var Y = R9, J = X + $;
      Q = Q ^ -1;
      for (var K = X; K < J; K++) Q = Q >>> 8 ^ Y[(Q ^ q.charCodeAt(K)) & 255];
      return Q ^ -1;
    }
    x9.exports = function(q, $) {
      if (typeof q > "u" || !q.length) return 0;
      var X = vz.getTypeOf(q) !== "string";
      if (X) return Sz($ | 0, q, q.length, 0);
      else return kz($ | 0, q, q.length, 0);
    };
  });
  var p5 = k((BP, v9) => {
    var T9 = l0(), gz = J8(), yz = A0();
    function c5() {
      T9.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
    }
    yz.inherits(c5, T9);
    c5.prototype.processChunk = function(Q) {
      this.streamInfo.crc32 = gz(Q.data, this.streamInfo.crc32 || 0), this.push(Q);
    };
    v9.exports = c5;
  });
  var S9 = k((ZP, E9) => {
    var fz = A0(), m5 = l0();
    function d5(Q) {
      m5.call(this, "DataLengthProbe for " + Q), this.propName = Q, this.withStreamInfo(Q, 0);
    }
    fz.inherits(d5, m5);
    d5.prototype.processChunk = function(Q) {
      if (Q) {
        var q = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = q + Q.data.length;
      }
      m5.prototype.processChunk.call(this, Q);
    };
    E9.exports = d5;
  });
  var K8 = k((FP, y9) => {
    var k9 = x1(), g9 = u5(), hz = p5(), l5 = S9();
    function i5(Q, q, $, X, Y) {
      this.compressedSize = Q, this.uncompressedSize = q, this.crc32 = $, this.compression = X, this.compressedContent = Y;
    }
    i5.prototype = { getContentWorker: function() {
      var Q = new g9(k9.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new l5("data_length")), q = this;
      return Q.on("end", function() {
        if (this.streamInfo.data_length !== q.uncompressedSize) throw Error("Bug : uncompressed data size mismatch");
      }), Q;
    }, getCompressedWorker: function() {
      return new g9(k9.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
    } };
    i5.createWorkerFrom = function(Q, q, $) {
      return Q.pipe(new hz()).pipe(new l5("uncompressedSize")).pipe(q.compressWorker($)).pipe(new l5("compressedSize")).withStreamInfo("compression", q);
    };
    y9.exports = i5;
  });
  var b9 = k((jP, _9) => {
    var _z = _5(), bz = u5(), o5 = E1(), n5 = K8(), f9 = l0(), r5 = function(Q, q, $) {
      this.name = Q, this.dir = $.dir, this.date = $.date, this.comment = $.comment, this.unixPermissions = $.unixPermissions, this.dosPermissions = $.dosPermissions, this._data = q, this._dataBinary = $.binary, this.options = { compression: $.compression, compressionOptions: $.compressionOptions };
    };
    r5.prototype = { internalStream: function(Q) {
      var q = null, $ = "string";
      try {
        if (!Q) throw Error("No output type specified.");
        $ = Q.toLowerCase();
        var X = $ === "string" || $ === "text";
        if ($ === "binarystring" || $ === "text") $ = "string";
        q = this._decompressWorker();
        var Y = !this._dataBinary;
        if (Y && !X) q = q.pipe(new o5.Utf8EncodeWorker());
        if (!Y && X) q = q.pipe(new o5.Utf8DecodeWorker());
      } catch (J) {
        q = new f9("error"), q.error(J);
      }
      return new _z(q, $, "");
    }, async: function(Q, q) {
      return this.internalStream(Q).accumulate(q);
    }, nodeStream: function(Q, q) {
      return this.internalStream(Q || "nodebuffer").toNodejsStream(q);
    }, _compressWorker: function(Q, q) {
      if (this._data instanceof n5 && this._data.compression.magic === Q.magic) return this._data.getCompressedWorker();
      else {
        var $ = this._decompressWorker();
        if (!this._dataBinary) $ = $.pipe(new o5.Utf8EncodeWorker());
        return n5.createWorkerFrom($, Q, q);
      }
    }, _decompressWorker: function() {
      if (this._data instanceof n5) return this._data.getContentWorker();
      else if (this._data instanceof f9) return this._data;
      else return new bz(this._data);
    } };
    var h9 = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], uz = function() {
      throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    };
    for (Z6 = 0; Z6 < h9.length; Z6++) r5.prototype[h9[Z6]] = uz;
    var Z6;
    _9.exports = r5;
  });
  var v2 = k((a5) => {
    var dz = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
    function lz(Q, q) {
      return Object.prototype.hasOwnProperty.call(Q, q);
    }
    a5.assign = function(Q) {
      var q = Array.prototype.slice.call(arguments, 1);
      while (q.length) {
        var $ = q.shift();
        if (!$) continue;
        if (typeof $ !== "object") throw TypeError($ + "must be non-object");
        for (var X in $) if (lz($, X)) Q[X] = $[X];
      }
      return Q;
    };
    a5.shrinkBuf = function(Q, q) {
      if (Q.length === q) return Q;
      if (Q.subarray) return Q.subarray(0, q);
      return Q.length = q, Q;
    };
    var iz = { arraySet: function(Q, q, $, X, Y) {
      if (q.subarray && Q.subarray) {
        Q.set(q.subarray($, $ + X), Y);
        return;
      }
      for (var J = 0; J < X; J++) Q[Y + J] = q[$ + J];
    }, flattenChunks: function(Q) {
      var q, $, X, Y, J, K;
      X = 0;
      for (q = 0, $ = Q.length; q < $; q++) X += Q[q].length;
      K = new Uint8Array(X), Y = 0;
      for (q = 0, $ = Q.length; q < $; q++) J = Q[q], K.set(J, Y), Y += J.length;
      return K;
    } }, oz = { arraySet: function(Q, q, $, X, Y) {
      for (var J = 0; J < X; J++) Q[Y + J] = q[$ + J];
    }, flattenChunks: function(Q) {
      return [].concat.apply([], Q);
    } };
    a5.setTyped = function(Q) {
      if (Q) a5.Buf8 = Uint8Array, a5.Buf16 = Uint16Array, a5.Buf32 = Int32Array, a5.assign(a5, iz);
      else a5.Buf8 = Array, a5.Buf16 = Array, a5.Buf32 = Array, a5.assign(a5, oz);
    };
    a5.setTyped(dz);
  });
  var zq = k((HG) => {
    var rz = v2(), az = 4, c9 = 0, p9 = 1, sz = 2;
    function g1(Q) {
      var q = Q.length;
      while (--q >= 0) Q[q] = 0;
    }
    var tz = 0, n9 = 1, ez = 2, QG = 3, qG = 258, Y4 = 29, P6 = 256, j6 = P6 + 1 + Y4, k1 = 30, J4 = 19, r9 = 2 * j6 + 1, z1 = 15, t5 = 16, $G = 7, K4 = 256, a9 = 16, s9 = 17, t9 = 18, $4 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], U8 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], XG = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], e9 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], YG = 512, E2 = Array((j6 + 2) * 2);
    g1(E2);
    var F6 = Array(k1 * 2);
    g1(F6);
    var H6 = Array(YG);
    g1(H6);
    var M6 = Array(qG - QG + 1);
    g1(M6);
    var U4 = Array(Y4);
    g1(U4);
    var V8 = Array(k1);
    g1(V8);
    function e5(Q, q, $, X, Y) {
      this.static_tree = Q, this.extra_bits = q, this.extra_base = $, this.elems = X, this.max_length = Y, this.has_stree = Q && Q.length;
    }
    var Qq, qq, $q;
    function Q4(Q, q) {
      this.dyn_tree = Q, this.max_code = 0, this.stat_desc = q;
    }
    function Xq(Q) {
      return Q < 256 ? H6[Q] : H6[256 + (Q >>> 7)];
    }
    function w6(Q, q) {
      Q.pending_buf[Q.pending++] = q & 255, Q.pending_buf[Q.pending++] = q >>> 8 & 255;
    }
    function d0(Q, q, $) {
      if (Q.bi_valid > t5 - $) Q.bi_buf |= q << Q.bi_valid & 65535, w6(Q, Q.bi_buf), Q.bi_buf = q >> t5 - Q.bi_valid, Q.bi_valid += $ - t5;
      else Q.bi_buf |= q << Q.bi_valid & 65535, Q.bi_valid += $;
    }
    function H2(Q, q, $) {
      d0(Q, $[q * 2], $[q * 2 + 1]);
    }
    function Yq(Q, q) {
      var $ = 0;
      do
        $ |= Q & 1, Q >>>= 1, $ <<= 1;
      while (--q > 0);
      return $ >>> 1;
    }
    function JG(Q) {
      if (Q.bi_valid === 16) w6(Q, Q.bi_buf), Q.bi_buf = 0, Q.bi_valid = 0;
      else if (Q.bi_valid >= 8) Q.pending_buf[Q.pending++] = Q.bi_buf & 255, Q.bi_buf >>= 8, Q.bi_valid -= 8;
    }
    function KG(Q, q) {
      var { dyn_tree: $, max_code: X } = q, Y = q.stat_desc.static_tree, J = q.stat_desc.has_stree, K = q.stat_desc.extra_bits, U = q.stat_desc.extra_base, G = q.stat_desc.max_length, V, z, H, j, Z, h, g = 0;
      for (j = 0; j <= z1; j++) Q.bl_count[j] = 0;
      $[Q.heap[Q.heap_max] * 2 + 1] = 0;
      for (V = Q.heap_max + 1; V < r9; V++) {
        if (z = Q.heap[V], j = $[$[z * 2 + 1] * 2 + 1] + 1, j > G) j = G, g++;
        if ($[z * 2 + 1] = j, z > X) continue;
        if (Q.bl_count[j]++, Z = 0, z >= U) Z = K[z - U];
        if (h = $[z * 2], Q.opt_len += h * (j + Z), J) Q.static_len += h * (Y[z * 2 + 1] + Z);
      }
      if (g === 0) return;
      do {
        j = G - 1;
        while (Q.bl_count[j] === 0) j--;
        Q.bl_count[j]--, Q.bl_count[j + 1] += 2, Q.bl_count[G]--, g -= 2;
      } while (g > 0);
      for (j = G; j !== 0; j--) {
        z = Q.bl_count[j];
        while (z !== 0) {
          if (H = Q.heap[--V], H > X) continue;
          if ($[H * 2 + 1] !== j) Q.opt_len += (j - $[H * 2 + 1]) * $[H * 2], $[H * 2 + 1] = j;
          z--;
        }
      }
    }
    function Jq(Q, q, $) {
      var X = Array(z1 + 1), Y = 0, J, K;
      for (J = 1; J <= z1; J++) X[J] = Y = Y + $[J - 1] << 1;
      for (K = 0; K <= q; K++) {
        var U = Q[K * 2 + 1];
        if (U === 0) continue;
        Q[K * 2] = Yq(X[U]++, U);
      }
    }
    function UG() {
      var Q, q, $, X, Y, J = Array(z1 + 1);
      $ = 0;
      for (X = 0; X < Y4 - 1; X++) {
        U4[X] = $;
        for (Q = 0; Q < 1 << $4[X]; Q++) M6[$++] = X;
      }
      M6[$ - 1] = X, Y = 0;
      for (X = 0; X < 16; X++) {
        V8[X] = Y;
        for (Q = 0; Q < 1 << U8[X]; Q++) H6[Y++] = X;
      }
      Y >>= 7;
      for (; X < k1; X++) {
        V8[X] = Y << 7;
        for (Q = 0; Q < 1 << U8[X] - 7; Q++) H6[256 + Y++] = X;
      }
      for (q = 0; q <= z1; q++) J[q] = 0;
      Q = 0;
      while (Q <= 143) E2[Q * 2 + 1] = 8, Q++, J[8]++;
      while (Q <= 255) E2[Q * 2 + 1] = 9, Q++, J[9]++;
      while (Q <= 279) E2[Q * 2 + 1] = 7, Q++, J[7]++;
      while (Q <= 287) E2[Q * 2 + 1] = 8, Q++, J[8]++;
      Jq(E2, j6 + 1, J);
      for (Q = 0; Q < k1; Q++) F6[Q * 2 + 1] = 5, F6[Q * 2] = Yq(Q, 5);
      Qq = new e5(E2, $4, P6 + 1, j6, z1), qq = new e5(F6, U8, 0, k1, z1), $q = new e5([], XG, 0, J4, $G);
    }
    function Kq(Q) {
      var q;
      for (q = 0; q < j6; q++) Q.dyn_ltree[q * 2] = 0;
      for (q = 0; q < k1; q++) Q.dyn_dtree[q * 2] = 0;
      for (q = 0; q < J4; q++) Q.bl_tree[q * 2] = 0;
      Q.dyn_ltree[K4 * 2] = 1, Q.opt_len = Q.static_len = 0, Q.last_lit = Q.matches = 0;
    }
    function Uq(Q) {
      if (Q.bi_valid > 8) w6(Q, Q.bi_buf);
      else if (Q.bi_valid > 0) Q.pending_buf[Q.pending++] = Q.bi_buf;
      Q.bi_buf = 0, Q.bi_valid = 0;
    }
    function VG(Q, q, $, X) {
      if (Uq(Q), X) w6(Q, $), w6(Q, ~$);
      rz.arraySet(Q.pending_buf, Q.window, q, $, Q.pending), Q.pending += $;
    }
    function m9(Q, q, $, X) {
      var Y = q * 2, J = $ * 2;
      return Q[Y] < Q[J] || Q[Y] === Q[J] && X[q] <= X[$];
    }
    function q4(Q, q, $) {
      var X = Q.heap[$], Y = $ << 1;
      while (Y <= Q.heap_len) {
        if (Y < Q.heap_len && m9(q, Q.heap[Y + 1], Q.heap[Y], Q.depth)) Y++;
        if (m9(q, X, Q.heap[Y], Q.depth)) break;
        Q.heap[$] = Q.heap[Y], $ = Y, Y <<= 1;
      }
      Q.heap[$] = X;
    }
    function d9(Q, q, $) {
      var X, Y, J = 0, K, U;
      if (Q.last_lit !== 0) do
        if (X = Q.pending_buf[Q.d_buf + J * 2] << 8 | Q.pending_buf[Q.d_buf + J * 2 + 1], Y = Q.pending_buf[Q.l_buf + J], J++, X === 0) H2(Q, Y, q);
        else {
          if (K = M6[Y], H2(Q, K + P6 + 1, q), U = $4[K], U !== 0) Y -= U4[K], d0(Q, Y, U);
          if (X--, K = Xq(X), H2(Q, K, $), U = U8[K], U !== 0) X -= V8[K], d0(Q, X, U);
        }
      while (J < Q.last_lit);
      H2(Q, K4, q);
    }
    function X4(Q, q) {
      var $ = q.dyn_tree, X = q.stat_desc.static_tree, Y = q.stat_desc.has_stree, J = q.stat_desc.elems, K, U, G = -1, V;
      Q.heap_len = 0, Q.heap_max = r9;
      for (K = 0; K < J; K++) if ($[K * 2] !== 0) Q.heap[++Q.heap_len] = G = K, Q.depth[K] = 0;
      else $[K * 2 + 1] = 0;
      while (Q.heap_len < 2) if (V = Q.heap[++Q.heap_len] = G < 2 ? ++G : 0, $[V * 2] = 1, Q.depth[V] = 0, Q.opt_len--, Y) Q.static_len -= X[V * 2 + 1];
      q.max_code = G;
      for (K = Q.heap_len >> 1; K >= 1; K--) q4(Q, $, K);
      V = J;
      do
        K = Q.heap[1], Q.heap[1] = Q.heap[Q.heap_len--], q4(Q, $, 1), U = Q.heap[1], Q.heap[--Q.heap_max] = K, Q.heap[--Q.heap_max] = U, $[V * 2] = $[K * 2] + $[U * 2], Q.depth[V] = (Q.depth[K] >= Q.depth[U] ? Q.depth[K] : Q.depth[U]) + 1, $[K * 2 + 1] = $[U * 2 + 1] = V, Q.heap[1] = V++, q4(Q, $, 1);
      while (Q.heap_len >= 2);
      Q.heap[--Q.heap_max] = Q.heap[1], KG(Q, q), Jq($, G, Q.bl_count);
    }
    function l9(Q, q, $) {
      var X, Y = -1, J, K = q[1], U = 0, G = 7, V = 4;
      if (K === 0) G = 138, V = 3;
      q[($ + 1) * 2 + 1] = 65535;
      for (X = 0; X <= $; X++) {
        if (J = K, K = q[(X + 1) * 2 + 1], ++U < G && J === K) continue;
        else if (U < V) Q.bl_tree[J * 2] += U;
        else if (J !== 0) {
          if (J !== Y) Q.bl_tree[J * 2]++;
          Q.bl_tree[a9 * 2]++;
        } else if (U <= 10) Q.bl_tree[s9 * 2]++;
        else Q.bl_tree[t9 * 2]++;
        if (U = 0, Y = J, K === 0) G = 138, V = 3;
        else if (J === K) G = 6, V = 3;
        else G = 7, V = 4;
      }
    }
    function i9(Q, q, $) {
      var X, Y = -1, J, K = q[1], U = 0, G = 7, V = 4;
      if (K === 0) G = 138, V = 3;
      for (X = 0; X <= $; X++) {
        if (J = K, K = q[(X + 1) * 2 + 1], ++U < G && J === K) continue;
        else if (U < V) do
          H2(Q, J, Q.bl_tree);
        while (--U !== 0);
        else if (J !== 0) {
          if (J !== Y) H2(Q, J, Q.bl_tree), U--;
          H2(Q, a9, Q.bl_tree), d0(Q, U - 3, 2);
        } else if (U <= 10) H2(Q, s9, Q.bl_tree), d0(Q, U - 3, 3);
        else H2(Q, t9, Q.bl_tree), d0(Q, U - 11, 7);
        if (U = 0, Y = J, K === 0) G = 138, V = 3;
        else if (J === K) G = 6, V = 3;
        else G = 7, V = 4;
      }
    }
    function zG(Q) {
      var q;
      l9(Q, Q.dyn_ltree, Q.l_desc.max_code), l9(Q, Q.dyn_dtree, Q.d_desc.max_code), X4(Q, Q.bl_desc);
      for (q = J4 - 1; q >= 3; q--) if (Q.bl_tree[e9[q] * 2 + 1] !== 0) break;
      return Q.opt_len += 3 * (q + 1) + 5 + 5 + 4, q;
    }
    function GG(Q, q, $, X) {
      var Y;
      d0(Q, q - 257, 5), d0(Q, $ - 1, 5), d0(Q, X - 4, 4);
      for (Y = 0; Y < X; Y++) d0(Q, Q.bl_tree[e9[Y] * 2 + 1], 3);
      i9(Q, Q.dyn_ltree, q - 1), i9(Q, Q.dyn_dtree, $ - 1);
    }
    function WG(Q) {
      var q = 4093624447, $;
      for ($ = 0; $ <= 31; $++, q >>>= 1) if (q & 1 && Q.dyn_ltree[$ * 2] !== 0) return c9;
      if (Q.dyn_ltree[18] !== 0 || Q.dyn_ltree[20] !== 0 || Q.dyn_ltree[26] !== 0) return p9;
      for ($ = 32; $ < P6; $++) if (Q.dyn_ltree[$ * 2] !== 0) return p9;
      return c9;
    }
    var o9 = false;
    function BG(Q) {
      if (!o9) UG(), o9 = true;
      Q.l_desc = new Q4(Q.dyn_ltree, Qq), Q.d_desc = new Q4(Q.dyn_dtree, qq), Q.bl_desc = new Q4(Q.bl_tree, $q), Q.bi_buf = 0, Q.bi_valid = 0, Kq(Q);
    }
    function Vq(Q, q, $, X) {
      d0(Q, (tz << 1) + (X ? 1 : 0), 3), VG(Q, q, $, true);
    }
    function ZG(Q) {
      d0(Q, n9 << 1, 3), H2(Q, K4, E2), JG(Q);
    }
    function FG(Q, q, $, X) {
      var Y, J, K = 0;
      if (Q.level > 0) {
        if (Q.strm.data_type === sz) Q.strm.data_type = WG(Q);
        if (X4(Q, Q.l_desc), X4(Q, Q.d_desc), K = zG(Q), Y = Q.opt_len + 3 + 7 >>> 3, J = Q.static_len + 3 + 7 >>> 3, J <= Y) Y = J;
      } else Y = J = $ + 5;
      if ($ + 4 <= Y && q !== -1) Vq(Q, q, $, X);
      else if (Q.strategy === az || J === Y) d0(Q, (n9 << 1) + (X ? 1 : 0), 3), d9(Q, E2, F6);
      else d0(Q, (ez << 1) + (X ? 1 : 0), 3), GG(Q, Q.l_desc.max_code + 1, Q.d_desc.max_code + 1, K + 1), d9(Q, Q.dyn_ltree, Q.dyn_dtree);
      if (Kq(Q), X) Uq(Q);
    }
    function jG(Q, q, $) {
      if (Q.pending_buf[Q.d_buf + Q.last_lit * 2] = q >>> 8 & 255, Q.pending_buf[Q.d_buf + Q.last_lit * 2 + 1] = q & 255, Q.pending_buf[Q.l_buf + Q.last_lit] = $ & 255, Q.last_lit++, q === 0) Q.dyn_ltree[$ * 2]++;
      else Q.matches++, q--, Q.dyn_ltree[(M6[$] + P6 + 1) * 2]++, Q.dyn_dtree[Xq(q) * 2]++;
      return Q.last_lit === Q.lit_bufsize - 1;
    }
    HG._tr_init = BG;
    HG._tr_stored_block = Vq;
    HG._tr_flush_block = FG;
    HG._tr_tally = jG;
    HG._tr_align = ZG;
  });
  var V4 = k((wP, Gq) => {
    function IG(Q, q, $, X) {
      var Y = Q & 65535 | 0, J = Q >>> 16 & 65535 | 0, K = 0;
      while ($ !== 0) {
        K = $ > 2e3 ? 2e3 : $, $ -= K;
        do
          Y = Y + q[X++] | 0, J = J + Y | 0;
        while (--K);
        Y %= 65521, J %= 65521;
      }
      return Y | J << 16 | 0;
    }
    Gq.exports = IG;
  });
  var z4 = k((PP, Wq) => {
    function NG() {
      var Q, q = [];
      for (var $ = 0; $ < 256; $++) {
        Q = $;
        for (var X = 0; X < 8; X++) Q = Q & 1 ? 3988292384 ^ Q >>> 1 : Q >>> 1;
        q[$] = Q;
      }
      return q;
    }
    var DG = NG();
    function AG(Q, q, $, X) {
      var Y = DG, J = X + $;
      Q ^= -1;
      for (var K = X; K < J; K++) Q = Q >>> 8 ^ Y[(Q ^ q[K]) & 255];
      return Q ^ -1;
    }
    Wq.exports = AG;
  });
  var z8 = k((LP, Bq) => {
    Bq.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
  });
  var Cq = k((YW) => {
    var b0 = v2(), t0 = zq(), Hq = V4(), p2 = z4(), OG = z8(), Z1 = 0, RG = 1, xG = 3, o2 = 4, Zq = 5, w2 = 0, Fq = 1, e0 = -2, TG = -3, G4 = -5, vG = -1, EG = 1, G8 = 2, SG = 3, kG = 4, gG = 0, yG = 2, F8 = 8, fG = 9, hG = 15, _G = 8, bG = 29, uG = 256, B4 = uG + 1 + bG, cG = 30, pG = 19, mG = 2 * B4 + 1, dG = 15, H0 = 3, l2 = 258, J2 = l2 + H0 + 1, lG = 32, j8 = 42, Z4 = 69, W8 = 73, B8 = 91, Z8 = 103, G1 = 113, C6 = 666, T0 = 1, I6 = 2, W1 = 3, h1 = 4, iG = 3;
    function i2(Q, q) {
      return Q.msg = OG[q], q;
    }
    function jq(Q) {
      return (Q << 1) - (Q > 4 ? 9 : 0);
    }
    function d2(Q) {
      var q = Q.length;
      while (--q >= 0) Q[q] = 0;
    }
    function m2(Q) {
      var q = Q.state, $ = q.pending;
      if ($ > Q.avail_out) $ = Q.avail_out;
      if ($ === 0) return;
      if (b0.arraySet(Q.output, q.pending_buf, q.pending_out, $, Q.next_out), Q.next_out += $, q.pending_out += $, Q.total_out += $, Q.avail_out -= $, q.pending -= $, q.pending === 0) q.pending_out = 0;
    }
    function E0(Q, q) {
      t0._tr_flush_block(Q, Q.block_start >= 0 ? Q.block_start : -1, Q.strstart - Q.block_start, q), Q.block_start = Q.strstart, m2(Q.strm);
    }
    function M0(Q, q) {
      Q.pending_buf[Q.pending++] = q;
    }
    function L6(Q, q) {
      Q.pending_buf[Q.pending++] = q >>> 8 & 255, Q.pending_buf[Q.pending++] = q & 255;
    }
    function oG(Q, q, $, X) {
      var Y = Q.avail_in;
      if (Y > X) Y = X;
      if (Y === 0) return 0;
      if (Q.avail_in -= Y, b0.arraySet(q, Q.input, Q.next_in, Y, $), Q.state.wrap === 1) Q.adler = Hq(Q.adler, q, Y, $);
      else if (Q.state.wrap === 2) Q.adler = p2(Q.adler, q, Y, $);
      return Q.next_in += Y, Q.total_in += Y, Y;
    }
    function Mq(Q, q) {
      var { max_chain_length: $, strstart: X } = Q, Y, J, K = Q.prev_length, U = Q.nice_match, G = Q.strstart > Q.w_size - J2 ? Q.strstart - (Q.w_size - J2) : 0, V = Q.window, z = Q.w_mask, H = Q.prev, j = Q.strstart + l2, Z = V[X + K - 1], h = V[X + K];
      if (Q.prev_length >= Q.good_match) $ >>= 2;
      if (U > Q.lookahead) U = Q.lookahead;
      do {
        if (Y = q, V[Y + K] !== h || V[Y + K - 1] !== Z || V[Y] !== V[X] || V[++Y] !== V[X + 1]) continue;
        X += 2, Y++;
        do
          ;
        while (V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && V[++X] === V[++Y] && X < j);
        if (J = l2 - (j - X), X = j - l2, J > K) {
          if (Q.match_start = q, K = J, J >= U) break;
          Z = V[X + K - 1], h = V[X + K];
        }
      } while ((q = H[q & z]) > G && --$ !== 0);
      if (K <= Q.lookahead) return K;
      return Q.lookahead;
    }
    function B1(Q) {
      var q = Q.w_size, $, X, Y, J, K;
      do {
        if (J = Q.window_size - Q.lookahead - Q.strstart, Q.strstart >= q + (q - J2)) {
          b0.arraySet(Q.window, Q.window, q, q, 0), Q.match_start -= q, Q.strstart -= q, Q.block_start -= q, X = Q.hash_size, $ = X;
          do
            Y = Q.head[--$], Q.head[$] = Y >= q ? Y - q : 0;
          while (--X);
          X = q, $ = X;
          do
            Y = Q.prev[--$], Q.prev[$] = Y >= q ? Y - q : 0;
          while (--X);
          J += q;
        }
        if (Q.strm.avail_in === 0) break;
        if (X = oG(Q.strm, Q.window, Q.strstart + Q.lookahead, J), Q.lookahead += X, Q.lookahead + Q.insert >= H0) {
          K = Q.strstart - Q.insert, Q.ins_h = Q.window[K], Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[K + 1]) & Q.hash_mask;
          while (Q.insert) if (Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[K + H0 - 1]) & Q.hash_mask, Q.prev[K & Q.w_mask] = Q.head[Q.ins_h], Q.head[Q.ins_h] = K, K++, Q.insert--, Q.lookahead + Q.insert < H0) break;
        }
      } while (Q.lookahead < J2 && Q.strm.avail_in !== 0);
    }
    function nG(Q, q) {
      var $ = 65535;
      if ($ > Q.pending_buf_size - 5) $ = Q.pending_buf_size - 5;
      for (; ; ) {
        if (Q.lookahead <= 1) {
          if (B1(Q), Q.lookahead === 0 && q === Z1) return T0;
          if (Q.lookahead === 0) break;
        }
        Q.strstart += Q.lookahead, Q.lookahead = 0;
        var X = Q.block_start + $;
        if (Q.strstart === 0 || Q.strstart >= X) {
          if (Q.lookahead = Q.strstart - X, Q.strstart = X, E0(Q, false), Q.strm.avail_out === 0) return T0;
        }
        if (Q.strstart - Q.block_start >= Q.w_size - J2) {
          if (E0(Q, false), Q.strm.avail_out === 0) return T0;
        }
      }
      if (Q.insert = 0, q === o2) {
        if (E0(Q, true), Q.strm.avail_out === 0) return W1;
        return h1;
      }
      if (Q.strstart > Q.block_start) {
        if (E0(Q, false), Q.strm.avail_out === 0) return T0;
      }
      return T0;
    }
    function W4(Q, q) {
      var $, X;
      for (; ; ) {
        if (Q.lookahead < J2) {
          if (B1(Q), Q.lookahead < J2 && q === Z1) return T0;
          if (Q.lookahead === 0) break;
        }
        if ($ = 0, Q.lookahead >= H0) Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[Q.strstart + H0 - 1]) & Q.hash_mask, $ = Q.prev[Q.strstart & Q.w_mask] = Q.head[Q.ins_h], Q.head[Q.ins_h] = Q.strstart;
        if ($ !== 0 && Q.strstart - $ <= Q.w_size - J2) Q.match_length = Mq(Q, $);
        if (Q.match_length >= H0) if (X = t0._tr_tally(Q, Q.strstart - Q.match_start, Q.match_length - H0), Q.lookahead -= Q.match_length, Q.match_length <= Q.max_lazy_match && Q.lookahead >= H0) {
          Q.match_length--;
          do
            Q.strstart++, Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[Q.strstart + H0 - 1]) & Q.hash_mask, $ = Q.prev[Q.strstart & Q.w_mask] = Q.head[Q.ins_h], Q.head[Q.ins_h] = Q.strstart;
          while (--Q.match_length !== 0);
          Q.strstart++;
        } else Q.strstart += Q.match_length, Q.match_length = 0, Q.ins_h = Q.window[Q.strstart], Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[Q.strstart + 1]) & Q.hash_mask;
        else X = t0._tr_tally(Q, 0, Q.window[Q.strstart]), Q.lookahead--, Q.strstart++;
        if (X) {
          if (E0(Q, false), Q.strm.avail_out === 0) return T0;
        }
      }
      if (Q.insert = Q.strstart < H0 - 1 ? Q.strstart : H0 - 1, q === o2) {
        if (E0(Q, true), Q.strm.avail_out === 0) return W1;
        return h1;
      }
      if (Q.last_lit) {
        if (E0(Q, false), Q.strm.avail_out === 0) return T0;
      }
      return I6;
    }
    function y1(Q, q) {
      var $, X, Y;
      for (; ; ) {
        if (Q.lookahead < J2) {
          if (B1(Q), Q.lookahead < J2 && q === Z1) return T0;
          if (Q.lookahead === 0) break;
        }
        if ($ = 0, Q.lookahead >= H0) Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[Q.strstart + H0 - 1]) & Q.hash_mask, $ = Q.prev[Q.strstart & Q.w_mask] = Q.head[Q.ins_h], Q.head[Q.ins_h] = Q.strstart;
        if (Q.prev_length = Q.match_length, Q.prev_match = Q.match_start, Q.match_length = H0 - 1, $ !== 0 && Q.prev_length < Q.max_lazy_match && Q.strstart - $ <= Q.w_size - J2) {
          if (Q.match_length = Mq(Q, $), Q.match_length <= 5 && (Q.strategy === EG || Q.match_length === H0 && Q.strstart - Q.match_start > 4096)) Q.match_length = H0 - 1;
        }
        if (Q.prev_length >= H0 && Q.match_length <= Q.prev_length) {
          Y = Q.strstart + Q.lookahead - H0, X = t0._tr_tally(Q, Q.strstart - 1 - Q.prev_match, Q.prev_length - H0), Q.lookahead -= Q.prev_length - 1, Q.prev_length -= 2;
          do
            if (++Q.strstart <= Y) Q.ins_h = (Q.ins_h << Q.hash_shift ^ Q.window[Q.strstart + H0 - 1]) & Q.hash_mask, $ = Q.prev[Q.strstart & Q.w_mask] = Q.head[Q.ins_h], Q.head[Q.ins_h] = Q.strstart;
          while (--Q.prev_length !== 0);
          if (Q.match_available = 0, Q.match_length = H0 - 1, Q.strstart++, X) {
            if (E0(Q, false), Q.strm.avail_out === 0) return T0;
          }
        } else if (Q.match_available) {
          if (X = t0._tr_tally(Q, 0, Q.window[Q.strstart - 1]), X) E0(Q, false);
          if (Q.strstart++, Q.lookahead--, Q.strm.avail_out === 0) return T0;
        } else Q.match_available = 1, Q.strstart++, Q.lookahead--;
      }
      if (Q.match_available) X = t0._tr_tally(Q, 0, Q.window[Q.strstart - 1]), Q.match_available = 0;
      if (Q.insert = Q.strstart < H0 - 1 ? Q.strstart : H0 - 1, q === o2) {
        if (E0(Q, true), Q.strm.avail_out === 0) return W1;
        return h1;
      }
      if (Q.last_lit) {
        if (E0(Q, false), Q.strm.avail_out === 0) return T0;
      }
      return I6;
    }
    function rG(Q, q) {
      var $, X, Y, J, K = Q.window;
      for (; ; ) {
        if (Q.lookahead <= l2) {
          if (B1(Q), Q.lookahead <= l2 && q === Z1) return T0;
          if (Q.lookahead === 0) break;
        }
        if (Q.match_length = 0, Q.lookahead >= H0 && Q.strstart > 0) {
          if (Y = Q.strstart - 1, X = K[Y], X === K[++Y] && X === K[++Y] && X === K[++Y]) {
            J = Q.strstart + l2;
            do
              ;
            while (X === K[++Y] && X === K[++Y] && X === K[++Y] && X === K[++Y] && X === K[++Y] && X === K[++Y] && X === K[++Y] && X === K[++Y] && Y < J);
            if (Q.match_length = l2 - (J - Y), Q.match_length > Q.lookahead) Q.match_length = Q.lookahead;
          }
        }
        if (Q.match_length >= H0) $ = t0._tr_tally(Q, 1, Q.match_length - H0), Q.lookahead -= Q.match_length, Q.strstart += Q.match_length, Q.match_length = 0;
        else $ = t0._tr_tally(Q, 0, Q.window[Q.strstart]), Q.lookahead--, Q.strstart++;
        if ($) {
          if (E0(Q, false), Q.strm.avail_out === 0) return T0;
        }
      }
      if (Q.insert = 0, q === o2) {
        if (E0(Q, true), Q.strm.avail_out === 0) return W1;
        return h1;
      }
      if (Q.last_lit) {
        if (E0(Q, false), Q.strm.avail_out === 0) return T0;
      }
      return I6;
    }
    function aG(Q, q) {
      var $;
      for (; ; ) {
        if (Q.lookahead === 0) {
          if (B1(Q), Q.lookahead === 0) {
            if (q === Z1) return T0;
            break;
          }
        }
        if (Q.match_length = 0, $ = t0._tr_tally(Q, 0, Q.window[Q.strstart]), Q.lookahead--, Q.strstart++, $) {
          if (E0(Q, false), Q.strm.avail_out === 0) return T0;
        }
      }
      if (Q.insert = 0, q === o2) {
        if (E0(Q, true), Q.strm.avail_out === 0) return W1;
        return h1;
      }
      if (Q.last_lit) {
        if (E0(Q, false), Q.strm.avail_out === 0) return T0;
      }
      return I6;
    }
    function M2(Q, q, $, X, Y) {
      this.good_length = Q, this.max_lazy = q, this.nice_length = $, this.max_chain = X, this.func = Y;
    }
    var f1;
    f1 = [new M2(0, 0, 0, 0, nG), new M2(4, 4, 8, 4, W4), new M2(4, 5, 16, 8, W4), new M2(4, 6, 32, 32, W4), new M2(4, 4, 16, 16, y1), new M2(8, 16, 32, 32, y1), new M2(8, 16, 128, 128, y1), new M2(8, 32, 128, 256, y1), new M2(32, 128, 258, 1024, y1), new M2(32, 258, 258, 4096, y1)];
    function sG(Q) {
      Q.window_size = 2 * Q.w_size, d2(Q.head), Q.max_lazy_match = f1[Q.level].max_lazy, Q.good_match = f1[Q.level].good_length, Q.nice_match = f1[Q.level].nice_length, Q.max_chain_length = f1[Q.level].max_chain, Q.strstart = 0, Q.block_start = 0, Q.lookahead = 0, Q.insert = 0, Q.match_length = Q.prev_length = H0 - 1, Q.match_available = 0, Q.ins_h = 0;
    }
    function tG() {
      this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = F8, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new b0.Buf16(mG * 2), this.dyn_dtree = new b0.Buf16((2 * cG + 1) * 2), this.bl_tree = new b0.Buf16((2 * pG + 1) * 2), d2(this.dyn_ltree), d2(this.dyn_dtree), d2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new b0.Buf16(dG + 1), this.heap = new b0.Buf16(2 * B4 + 1), d2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new b0.Buf16(2 * B4 + 1), d2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
    }
    function wq(Q) {
      var q;
      if (!Q || !Q.state) return i2(Q, e0);
      if (Q.total_in = Q.total_out = 0, Q.data_type = yG, q = Q.state, q.pending = 0, q.pending_out = 0, q.wrap < 0) q.wrap = -q.wrap;
      return q.status = q.wrap ? j8 : G1, Q.adler = q.wrap === 2 ? 0 : 1, q.last_flush = Z1, t0._tr_init(q), w2;
    }
    function Pq(Q) {
      var q = wq(Q);
      if (q === w2) sG(Q.state);
      return q;
    }
    function eG(Q, q) {
      if (!Q || !Q.state) return e0;
      if (Q.state.wrap !== 2) return e0;
      return Q.state.gzhead = q, w2;
    }
    function Lq(Q, q, $, X, Y, J) {
      if (!Q) return e0;
      var K = 1;
      if (q === vG) q = 6;
      if (X < 0) K = 0, X = -X;
      else if (X > 15) K = 2, X -= 16;
      if (Y < 1 || Y > fG || $ !== F8 || X < 8 || X > 15 || q < 0 || q > 9 || J < 0 || J > kG) return i2(Q, e0);
      if (X === 8) X = 9;
      var U = new tG();
      return Q.state = U, U.strm = Q, U.wrap = K, U.gzhead = null, U.w_bits = X, U.w_size = 1 << U.w_bits, U.w_mask = U.w_size - 1, U.hash_bits = Y + 7, U.hash_size = 1 << U.hash_bits, U.hash_mask = U.hash_size - 1, U.hash_shift = ~~((U.hash_bits + H0 - 1) / H0), U.window = new b0.Buf8(U.w_size * 2), U.head = new b0.Buf16(U.hash_size), U.prev = new b0.Buf16(U.w_size), U.lit_bufsize = 1 << Y + 6, U.pending_buf_size = U.lit_bufsize * 4, U.pending_buf = new b0.Buf8(U.pending_buf_size), U.d_buf = 1 * U.lit_bufsize, U.l_buf = 3 * U.lit_bufsize, U.level = q, U.strategy = J, U.method = $, Pq(Q);
    }
    function QW(Q, q) {
      return Lq(Q, q, F8, hG, _G, gG);
    }
    function qW(Q, q) {
      var $, X, Y, J;
      if (!Q || !Q.state || q > Zq || q < 0) return Q ? i2(Q, e0) : e0;
      if (X = Q.state, !Q.output || !Q.input && Q.avail_in !== 0 || X.status === C6 && q !== o2) return i2(Q, Q.avail_out === 0 ? G4 : e0);
      if (X.strm = Q, $ = X.last_flush, X.last_flush = q, X.status === j8) if (X.wrap === 2) if (Q.adler = 0, M0(X, 31), M0(X, 139), M0(X, 8), !X.gzhead) M0(X, 0), M0(X, 0), M0(X, 0), M0(X, 0), M0(X, 0), M0(X, X.level === 9 ? 2 : X.strategy >= G8 || X.level < 2 ? 4 : 0), M0(X, iG), X.status = G1;
      else {
        if (M0(X, (X.gzhead.text ? 1 : 0) + (X.gzhead.hcrc ? 2 : 0) + (!X.gzhead.extra ? 0 : 4) + (!X.gzhead.name ? 0 : 8) + (!X.gzhead.comment ? 0 : 16)), M0(X, X.gzhead.time & 255), M0(X, X.gzhead.time >> 8 & 255), M0(X, X.gzhead.time >> 16 & 255), M0(X, X.gzhead.time >> 24 & 255), M0(X, X.level === 9 ? 2 : X.strategy >= G8 || X.level < 2 ? 4 : 0), M0(X, X.gzhead.os & 255), X.gzhead.extra && X.gzhead.extra.length) M0(X, X.gzhead.extra.length & 255), M0(X, X.gzhead.extra.length >> 8 & 255);
        if (X.gzhead.hcrc) Q.adler = p2(Q.adler, X.pending_buf, X.pending, 0);
        X.gzindex = 0, X.status = Z4;
      }
      else {
        var K = F8 + (X.w_bits - 8 << 4) << 8, U = -1;
        if (X.strategy >= G8 || X.level < 2) U = 0;
        else if (X.level < 6) U = 1;
        else if (X.level === 6) U = 2;
        else U = 3;
        if (K |= U << 6, X.strstart !== 0) K |= lG;
        if (K += 31 - K % 31, X.status = G1, L6(X, K), X.strstart !== 0) L6(X, Q.adler >>> 16), L6(X, Q.adler & 65535);
        Q.adler = 1;
      }
      if (X.status === Z4) if (X.gzhead.extra) {
        Y = X.pending;
        while (X.gzindex < (X.gzhead.extra.length & 65535)) {
          if (X.pending === X.pending_buf_size) {
            if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
            if (m2(Q), Y = X.pending, X.pending === X.pending_buf_size) break;
          }
          M0(X, X.gzhead.extra[X.gzindex] & 255), X.gzindex++;
        }
        if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
        if (X.gzindex === X.gzhead.extra.length) X.gzindex = 0, X.status = W8;
      } else X.status = W8;
      if (X.status === W8) if (X.gzhead.name) {
        Y = X.pending;
        do {
          if (X.pending === X.pending_buf_size) {
            if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
            if (m2(Q), Y = X.pending, X.pending === X.pending_buf_size) {
              J = 1;
              break;
            }
          }
          if (X.gzindex < X.gzhead.name.length) J = X.gzhead.name.charCodeAt(X.gzindex++) & 255;
          else J = 0;
          M0(X, J);
        } while (J !== 0);
        if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
        if (J === 0) X.gzindex = 0, X.status = B8;
      } else X.status = B8;
      if (X.status === B8) if (X.gzhead.comment) {
        Y = X.pending;
        do {
          if (X.pending === X.pending_buf_size) {
            if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
            if (m2(Q), Y = X.pending, X.pending === X.pending_buf_size) {
              J = 1;
              break;
            }
          }
          if (X.gzindex < X.gzhead.comment.length) J = X.gzhead.comment.charCodeAt(X.gzindex++) & 255;
          else J = 0;
          M0(X, J);
        } while (J !== 0);
        if (X.gzhead.hcrc && X.pending > Y) Q.adler = p2(Q.adler, X.pending_buf, X.pending - Y, Y);
        if (J === 0) X.status = Z8;
      } else X.status = Z8;
      if (X.status === Z8) if (X.gzhead.hcrc) {
        if (X.pending + 2 > X.pending_buf_size) m2(Q);
        if (X.pending + 2 <= X.pending_buf_size) M0(X, Q.adler & 255), M0(X, Q.adler >> 8 & 255), Q.adler = 0, X.status = G1;
      } else X.status = G1;
      if (X.pending !== 0) {
        if (m2(Q), Q.avail_out === 0) return X.last_flush = -1, w2;
      } else if (Q.avail_in === 0 && jq(q) <= jq($) && q !== o2) return i2(Q, G4);
      if (X.status === C6 && Q.avail_in !== 0) return i2(Q, G4);
      if (Q.avail_in !== 0 || X.lookahead !== 0 || q !== Z1 && X.status !== C6) {
        var G = X.strategy === G8 ? aG(X, q) : X.strategy === SG ? rG(X, q) : f1[X.level].func(X, q);
        if (G === W1 || G === h1) X.status = C6;
        if (G === T0 || G === W1) {
          if (Q.avail_out === 0) X.last_flush = -1;
          return w2;
        }
        if (G === I6) {
          if (q === RG) t0._tr_align(X);
          else if (q !== Zq) {
            if (t0._tr_stored_block(X, 0, 0, false), q === xG) {
              if (d2(X.head), X.lookahead === 0) X.strstart = 0, X.block_start = 0, X.insert = 0;
            }
          }
          if (m2(Q), Q.avail_out === 0) return X.last_flush = -1, w2;
        }
      }
      if (q !== o2) return w2;
      if (X.wrap <= 0) return Fq;
      if (X.wrap === 2) M0(X, Q.adler & 255), M0(X, Q.adler >> 8 & 255), M0(X, Q.adler >> 16 & 255), M0(X, Q.adler >> 24 & 255), M0(X, Q.total_in & 255), M0(X, Q.total_in >> 8 & 255), M0(X, Q.total_in >> 16 & 255), M0(X, Q.total_in >> 24 & 255);
      else L6(X, Q.adler >>> 16), L6(X, Q.adler & 65535);
      if (m2(Q), X.wrap > 0) X.wrap = -X.wrap;
      return X.pending !== 0 ? w2 : Fq;
    }
    function $W(Q) {
      var q;
      if (!Q || !Q.state) return e0;
      if (q = Q.state.status, q !== j8 && q !== Z4 && q !== W8 && q !== B8 && q !== Z8 && q !== G1 && q !== C6) return i2(Q, e0);
      return Q.state = null, q === G1 ? i2(Q, TG) : w2;
    }
    function XW(Q, q) {
      var $ = q.length, X, Y, J, K, U, G, V, z;
      if (!Q || !Q.state) return e0;
      if (X = Q.state, K = X.wrap, K === 2 || K === 1 && X.status !== j8 || X.lookahead) return e0;
      if (K === 1) Q.adler = Hq(Q.adler, q, $, 0);
      if (X.wrap = 0, $ >= X.w_size) {
        if (K === 0) d2(X.head), X.strstart = 0, X.block_start = 0, X.insert = 0;
        z = new b0.Buf8(X.w_size), b0.arraySet(z, q, $ - X.w_size, X.w_size, 0), q = z, $ = X.w_size;
      }
      U = Q.avail_in, G = Q.next_in, V = Q.input, Q.avail_in = $, Q.next_in = 0, Q.input = q, B1(X);
      while (X.lookahead >= H0) {
        Y = X.strstart, J = X.lookahead - (H0 - 1);
        do
          X.ins_h = (X.ins_h << X.hash_shift ^ X.window[Y + H0 - 1]) & X.hash_mask, X.prev[Y & X.w_mask] = X.head[X.ins_h], X.head[X.ins_h] = Y, Y++;
        while (--J);
        X.strstart = Y, X.lookahead = H0 - 1, B1(X);
      }
      return X.strstart += X.lookahead, X.block_start = X.strstart, X.insert = X.lookahead, X.lookahead = 0, X.match_length = X.prev_length = H0 - 1, X.match_available = 0, Q.next_in = G, Q.input = V, Q.avail_in = U, X.wrap = K, w2;
    }
    YW.deflateInit = QW;
    YW.deflateInit2 = Lq;
    YW.deflateReset = Pq;
    YW.deflateResetKeep = wq;
    YW.deflateSetHeader = eG;
    YW.deflate = qW;
    YW.deflateEnd = $W;
    YW.deflateSetDictionary = XW;
    YW.deflateInfo = "pako deflate (from Nodeca project)";
  });
  var F4 = k((FW) => {
    var H8 = v2(), Iq = true, Nq = true;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (Q) {
      Iq = false;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (Q) {
      Nq = false;
    }
    var N6 = new H8.Buf8(256);
    for (P2 = 0; P2 < 256; P2++) N6[P2] = P2 >= 252 ? 6 : P2 >= 248 ? 5 : P2 >= 240 ? 4 : P2 >= 224 ? 3 : P2 >= 192 ? 2 : 1;
    var P2;
    N6[254] = N6[254] = 1;
    FW.string2buf = function(Q) {
      var q, $, X, Y, J, K = Q.length, U = 0;
      for (Y = 0; Y < K; Y++) {
        if ($ = Q.charCodeAt(Y), ($ & 64512) === 55296 && Y + 1 < K) {
          if (X = Q.charCodeAt(Y + 1), (X & 64512) === 56320) $ = 65536 + ($ - 55296 << 10) + (X - 56320), Y++;
        }
        U += $ < 128 ? 1 : $ < 2048 ? 2 : $ < 65536 ? 3 : 4;
      }
      q = new H8.Buf8(U);
      for (J = 0, Y = 0; J < U; Y++) {
        if ($ = Q.charCodeAt(Y), ($ & 64512) === 55296 && Y + 1 < K) {
          if (X = Q.charCodeAt(Y + 1), (X & 64512) === 56320) $ = 65536 + ($ - 55296 << 10) + (X - 56320), Y++;
        }
        if ($ < 128) q[J++] = $;
        else if ($ < 2048) q[J++] = 192 | $ >>> 6, q[J++] = 128 | $ & 63;
        else if ($ < 65536) q[J++] = 224 | $ >>> 12, q[J++] = 128 | $ >>> 6 & 63, q[J++] = 128 | $ & 63;
        else q[J++] = 240 | $ >>> 18, q[J++] = 128 | $ >>> 12 & 63, q[J++] = 128 | $ >>> 6 & 63, q[J++] = 128 | $ & 63;
      }
      return q;
    };
    function Dq(Q, q) {
      if (q < 65534) {
        if (Q.subarray && Nq || !Q.subarray && Iq) return String.fromCharCode.apply(null, H8.shrinkBuf(Q, q));
      }
      var $ = "";
      for (var X = 0; X < q; X++) $ += String.fromCharCode(Q[X]);
      return $;
    }
    FW.buf2binstring = function(Q) {
      return Dq(Q, Q.length);
    };
    FW.binstring2buf = function(Q) {
      var q = new H8.Buf8(Q.length);
      for (var $ = 0, X = q.length; $ < X; $++) q[$] = Q.charCodeAt($);
      return q;
    };
    FW.buf2string = function(Q, q) {
      var $, X, Y, J, K = q || Q.length, U = Array(K * 2);
      for (X = 0, $ = 0; $ < K; ) {
        if (Y = Q[$++], Y < 128) {
          U[X++] = Y;
          continue;
        }
        if (J = N6[Y], J > 4) {
          U[X++] = 65533, $ += J - 1;
          continue;
        }
        Y &= J === 2 ? 31 : J === 3 ? 15 : 7;
        while (J > 1 && $ < K) Y = Y << 6 | Q[$++] & 63, J--;
        if (J > 1) {
          U[X++] = 65533;
          continue;
        }
        if (Y < 65536) U[X++] = Y;
        else Y -= 65536, U[X++] = 55296 | Y >> 10 & 1023, U[X++] = 56320 | Y & 1023;
      }
      return Dq(U, X);
    };
    FW.utf8border = function(Q, q) {
      var $;
      if (q = q || Q.length, q > Q.length) q = Q.length;
      $ = q - 1;
      while ($ >= 0 && (Q[$] & 192) === 128) $--;
      if ($ < 0) return q;
      if ($ === 0) return q;
      return $ + N6[Q[$]] > q ? $ : q;
    };
  });
  var j4 = k((NP, Aq) => {
    function LW() {
      this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
    }
    Aq.exports = LW;
  });
  var Tq = k((xW) => {
    var D6 = Cq(), A6 = v2(), M4 = F4(), w4 = z8(), CW = j4(), xq = Object.prototype.toString, IW = 0, H4 = 4, _1 = 0, Oq = 1, Rq = 2, NW = -1, DW = 0, AW = 8;
    function F1(Q) {
      if (!(this instanceof F1)) return new F1(Q);
      this.options = A6.assign({ level: NW, method: AW, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: DW, to: "" }, Q || {});
      var q = this.options;
      if (q.raw && q.windowBits > 0) q.windowBits = -q.windowBits;
      else if (q.gzip && q.windowBits > 0 && q.windowBits < 16) q.windowBits += 16;
      this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new CW(), this.strm.avail_out = 0;
      var $ = D6.deflateInit2(this.strm, q.level, q.method, q.windowBits, q.memLevel, q.strategy);
      if ($ !== _1) throw Error(w4[$]);
      if (q.header) D6.deflateSetHeader(this.strm, q.header);
      if (q.dictionary) {
        var X;
        if (typeof q.dictionary === "string") X = M4.string2buf(q.dictionary);
        else if (xq.call(q.dictionary) === "[object ArrayBuffer]") X = new Uint8Array(q.dictionary);
        else X = q.dictionary;
        if ($ = D6.deflateSetDictionary(this.strm, X), $ !== _1) throw Error(w4[$]);
        this._dict_set = true;
      }
    }
    F1.prototype.push = function(Q, q) {
      var $ = this.strm, X = this.options.chunkSize, Y, J;
      if (this.ended) return false;
      if (J = q === ~~q ? q : q === true ? H4 : IW, typeof Q === "string") $.input = M4.string2buf(Q);
      else if (xq.call(Q) === "[object ArrayBuffer]") $.input = new Uint8Array(Q);
      else $.input = Q;
      $.next_in = 0, $.avail_in = $.input.length;
      do {
        if ($.avail_out === 0) $.output = new A6.Buf8(X), $.next_out = 0, $.avail_out = X;
        if (Y = D6.deflate($, J), Y !== Oq && Y !== _1) return this.onEnd(Y), this.ended = true, false;
        if ($.avail_out === 0 || $.avail_in === 0 && (J === H4 || J === Rq)) if (this.options.to === "string") this.onData(M4.buf2binstring(A6.shrinkBuf($.output, $.next_out)));
        else this.onData(A6.shrinkBuf($.output, $.next_out));
      } while (($.avail_in > 0 || $.avail_out === 0) && Y !== Oq);
      if (J === H4) return Y = D6.deflateEnd(this.strm), this.onEnd(Y), this.ended = true, Y === _1;
      if (J === Rq) return this.onEnd(_1), $.avail_out = 0, true;
      return true;
    };
    F1.prototype.onData = function(Q) {
      this.chunks.push(Q);
    };
    F1.prototype.onEnd = function(Q) {
      if (Q === _1) if (this.options.to === "string") this.result = this.chunks.join("");
      else this.result = A6.flattenChunks(this.chunks);
      this.chunks = [], this.err = Q, this.msg = this.strm.msg;
    };
    function P4(Q, q) {
      var $ = new F1(q);
      if ($.push(Q, true), $.err) throw $.msg || w4[$.err];
      return $.result;
    }
    function OW(Q, q) {
      return q = q || {}, q.raw = true, P4(Q, q);
    }
    function RW(Q, q) {
      return q = q || {}, q.gzip = true, P4(Q, q);
    }
    xW.Deflate = F1;
    xW.deflate = P4;
    xW.deflateRaw = OW;
    xW.gzip = RW;
  });
  var Eq = k((AP, vq) => {
    var M8 = 30, kW = 12;
    vq.exports = function(q, $) {
      var X, Y, J, K, U, G, V, z, H, j, Z, h, g, C, N, W, M, w, I, f, E, d, R, x, D;
      X = q.state, Y = q.next_in, x = q.input, J = Y + (q.avail_in - 5), K = q.next_out, D = q.output, U = K - ($ - q.avail_out), G = K + (q.avail_out - 257), V = X.dmax, z = X.wsize, H = X.whave, j = X.wnext, Z = X.window, h = X.hold, g = X.bits, C = X.lencode, N = X.distcode, W = (1 << X.lenbits) - 1, M = (1 << X.distbits) - 1;
      Q: do {
        if (g < 15) h += x[Y++] << g, g += 8, h += x[Y++] << g, g += 8;
        w = C[h & W];
        q: for (; ; ) {
          if (I = w >>> 24, h >>>= I, g -= I, I = w >>> 16 & 255, I === 0) D[K++] = w & 65535;
          else if (I & 16) {
            if (f = w & 65535, I &= 15, I) {
              if (g < I) h += x[Y++] << g, g += 8;
              f += h & (1 << I) - 1, h >>>= I, g -= I;
            }
            if (g < 15) h += x[Y++] << g, g += 8, h += x[Y++] << g, g += 8;
            w = N[h & M];
            $: for (; ; ) {
              if (I = w >>> 24, h >>>= I, g -= I, I = w >>> 16 & 255, I & 16) {
                if (E = w & 65535, I &= 15, g < I) {
                  if (h += x[Y++] << g, g += 8, g < I) h += x[Y++] << g, g += 8;
                }
                if (E += h & (1 << I) - 1, E > V) {
                  q.msg = "invalid distance too far back", X.mode = M8;
                  break Q;
                }
                if (h >>>= I, g -= I, I = K - U, E > I) {
                  if (I = E - I, I > H) {
                    if (X.sane) {
                      q.msg = "invalid distance too far back", X.mode = M8;
                      break Q;
                    }
                  }
                  if (d = 0, R = Z, j === 0) {
                    if (d += z - I, I < f) {
                      f -= I;
                      do
                        D[K++] = Z[d++];
                      while (--I);
                      d = K - E, R = D;
                    }
                  } else if (j < I) {
                    if (d += z + j - I, I -= j, I < f) {
                      f -= I;
                      do
                        D[K++] = Z[d++];
                      while (--I);
                      if (d = 0, j < f) {
                        I = j, f -= I;
                        do
                          D[K++] = Z[d++];
                        while (--I);
                        d = K - E, R = D;
                      }
                    }
                  } else if (d += j - I, I < f) {
                    f -= I;
                    do
                      D[K++] = Z[d++];
                    while (--I);
                    d = K - E, R = D;
                  }
                  while (f > 2) D[K++] = R[d++], D[K++] = R[d++], D[K++] = R[d++], f -= 3;
                  if (f) {
                    if (D[K++] = R[d++], f > 1) D[K++] = R[d++];
                  }
                } else {
                  d = K - E;
                  do
                    D[K++] = D[d++], D[K++] = D[d++], D[K++] = D[d++], f -= 3;
                  while (f > 2);
                  if (f) {
                    if (D[K++] = D[d++], f > 1) D[K++] = D[d++];
                  }
                }
              } else if ((I & 64) === 0) {
                w = N[(w & 65535) + (h & (1 << I) - 1)];
                continue $;
              } else {
                q.msg = "invalid distance code", X.mode = M8;
                break Q;
              }
              break;
            }
          } else if ((I & 64) === 0) {
            w = C[(w & 65535) + (h & (1 << I) - 1)];
            continue q;
          } else if (I & 32) {
            X.mode = kW;
            break Q;
          } else {
            q.msg = "invalid literal/length code", X.mode = M8;
            break Q;
          }
          break;
        }
      } while (Y < J && K < G);
      f = g >> 3, Y -= f, g -= f << 3, h &= (1 << g) - 1, q.next_in = Y, q.next_out = K, q.avail_in = Y < J ? 5 + (J - Y) : 5 - (Y - J), q.avail_out = K < G ? 257 + (G - K) : 257 - (K - G), X.hold = h, X.bits = g;
      return;
    };
  });
  var _q = k((OP, hq) => {
    var Sq = v2(), b1 = 15, kq = 852, gq = 592, yq = 0, L4 = 1, fq = 2, gW = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], yW = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], fW = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], hW = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
    hq.exports = function(q, $, X, Y, J, K, U, G) {
      var V = G.bits, z = 0, H = 0, j = 0, Z = 0, h = 0, g = 0, C = 0, N = 0, W = 0, M = 0, w, I, f, E, d, R = null, x = 0, D, L = new Sq.Buf16(b1 + 1), S = new Sq.Buf16(b1 + 1), y = null, v = 0, a, Q0, Y0;
      for (z = 0; z <= b1; z++) L[z] = 0;
      for (H = 0; H < Y; H++) L[$[X + H]]++;
      h = V;
      for (Z = b1; Z >= 1; Z--) if (L[Z] !== 0) break;
      if (h > Z) h = Z;
      if (Z === 0) return J[K++] = 20971520, J[K++] = 20971520, G.bits = 1, 0;
      for (j = 1; j < Z; j++) if (L[j] !== 0) break;
      if (h < j) h = j;
      N = 1;
      for (z = 1; z <= b1; z++) if (N <<= 1, N -= L[z], N < 0) return -1;
      if (N > 0 && (q === yq || Z !== 1)) return -1;
      S[1] = 0;
      for (z = 1; z < b1; z++) S[z + 1] = S[z] + L[z];
      for (H = 0; H < Y; H++) if ($[X + H] !== 0) U[S[$[X + H]]++] = H;
      if (q === yq) R = y = U, D = 19;
      else if (q === L4) R = gW, x -= 257, y = yW, v -= 257, D = 256;
      else R = fW, y = hW, D = -1;
      if (M = 0, H = 0, z = j, d = K, g = h, C = 0, f = -1, W = 1 << h, E = W - 1, q === L4 && W > kq || q === fq && W > gq) return 1;
      for (; ; ) {
        if (a = z - C, U[H] < D) Q0 = 0, Y0 = U[H];
        else if (U[H] > D) Q0 = y[v + U[H]], Y0 = R[x + U[H]];
        else Q0 = 96, Y0 = 0;
        w = 1 << z - C, I = 1 << g, j = I;
        do
          I -= w, J[d + (M >> C) + I] = a << 24 | Q0 << 16 | Y0 | 0;
        while (I !== 0);
        w = 1 << z - 1;
        while (M & w) w >>= 1;
        if (w !== 0) M &= w - 1, M += w;
        else M = 0;
        if (H++, --L[z] === 0) {
          if (z === Z) break;
          z = $[X + U[H]];
        }
        if (z > h && (M & E) !== f) {
          if (C === 0) C = h;
          d += j, g = z - C, N = 1 << g;
          while (g + C < Z) {
            if (N -= L[g + C], N <= 0) break;
            g++, N <<= 1;
          }
          if (W += 1 << g, q === L4 && W > kq || q === fq && W > gq) return 1;
          f = M & E, J[f] = h << 24 | g << 16 | d - K | 0;
        }
      }
      if (M !== 0) J[d + M] = z - C << 24 | 4194304 | 0;
      return G.bits = h, 0;
    };
  });
  var P$ = k(($B) => {
    var i0 = v2(), O4 = V4(), L2 = z4(), _W = Eq(), O6 = _q(), bW = 0, G$ = 1, W$ = 2, bq = 4, uW = 5, w8 = 6, j1 = 0, cW = 1, pW = 2, Q2 = -2, B$ = -3, R4 = -4, mW = -5, uq = 8, Z$ = 1, cq = 2, pq = 3, mq = 4, dq = 5, lq = 6, iq = 7, oq = 8, nq = 9, rq = 10, C8 = 11, S2 = 12, C4 = 13, aq = 14, I4 = 15, sq = 16, tq = 17, eq = 18, Q$ = 19, P8 = 20, L8 = 21, q$ = 22, $$ = 23, X$ = 24, Y$ = 25, J$ = 26, N4 = 27, K$ = 28, U$ = 29, N0 = 30, x4 = 31, dW = 32, lW = 852, iW = 592, oW = 15, nW = oW;
    function V$(Q) {
      return (Q >>> 24 & 255) + (Q >>> 8 & 65280) + ((Q & 65280) << 8) + ((Q & 255) << 24);
    }
    function rW() {
      this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new i0.Buf16(320), this.work = new i0.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
    }
    function F$(Q) {
      var q;
      if (!Q || !Q.state) return Q2;
      if (q = Q.state, Q.total_in = Q.total_out = q.total = 0, Q.msg = "", q.wrap) Q.adler = q.wrap & 1;
      return q.mode = Z$, q.last = 0, q.havedict = 0, q.dmax = 32768, q.head = null, q.hold = 0, q.bits = 0, q.lencode = q.lendyn = new i0.Buf32(lW), q.distcode = q.distdyn = new i0.Buf32(iW), q.sane = 1, q.back = -1, j1;
    }
    function j$(Q) {
      var q;
      if (!Q || !Q.state) return Q2;
      return q = Q.state, q.wsize = 0, q.whave = 0, q.wnext = 0, F$(Q);
    }
    function H$(Q, q) {
      var $, X;
      if (!Q || !Q.state) return Q2;
      if (X = Q.state, q < 0) $ = 0, q = -q;
      else if ($ = (q >> 4) + 1, q < 48) q &= 15;
      if (q && (q < 8 || q > 15)) return Q2;
      if (X.window !== null && X.wbits !== q) X.window = null;
      return X.wrap = $, X.wbits = q, j$(Q);
    }
    function M$(Q, q) {
      var $, X;
      if (!Q) return Q2;
      if (X = new rW(), Q.state = X, X.window = null, $ = H$(Q, q), $ !== j1) Q.state = null;
      return $;
    }
    function aW(Q) {
      return M$(Q, nW);
    }
    var z$ = true, D4, A4;
    function sW(Q) {
      if (z$) {
        var q;
        D4 = new i0.Buf32(512), A4 = new i0.Buf32(32), q = 0;
        while (q < 144) Q.lens[q++] = 8;
        while (q < 256) Q.lens[q++] = 9;
        while (q < 280) Q.lens[q++] = 7;
        while (q < 288) Q.lens[q++] = 8;
        O6(G$, Q.lens, 0, 288, D4, 0, Q.work, { bits: 9 }), q = 0;
        while (q < 32) Q.lens[q++] = 5;
        O6(W$, Q.lens, 0, 32, A4, 0, Q.work, { bits: 5 }), z$ = false;
      }
      Q.lencode = D4, Q.lenbits = 9, Q.distcode = A4, Q.distbits = 5;
    }
    function w$(Q, q, $, X) {
      var Y, J = Q.state;
      if (J.window === null) J.wsize = 1 << J.wbits, J.wnext = 0, J.whave = 0, J.window = new i0.Buf8(J.wsize);
      if (X >= J.wsize) i0.arraySet(J.window, q, $ - J.wsize, J.wsize, 0), J.wnext = 0, J.whave = J.wsize;
      else {
        if (Y = J.wsize - J.wnext, Y > X) Y = X;
        if (i0.arraySet(J.window, q, $ - X, Y, J.wnext), X -= Y, X) i0.arraySet(J.window, q, $ - X, X, 0), J.wnext = X, J.whave = J.wsize;
        else {
          if (J.wnext += Y, J.wnext === J.wsize) J.wnext = 0;
          if (J.whave < J.wsize) J.whave += Y;
        }
      }
      return 0;
    }
    function tW(Q, q) {
      var $, X, Y, J, K, U, G, V, z, H, j, Z, h, g, C = 0, N, W, M, w, I, f, E, d, R = new i0.Buf8(4), x, D, L = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      if (!Q || !Q.state || !Q.output || !Q.input && Q.avail_in !== 0) return Q2;
      if ($ = Q.state, $.mode === S2) $.mode = C4;
      K = Q.next_out, Y = Q.output, G = Q.avail_out, J = Q.next_in, X = Q.input, U = Q.avail_in, V = $.hold, z = $.bits, H = U, j = G, d = j1;
      Q: for (; ; ) switch ($.mode) {
        case Z$:
          if ($.wrap === 0) {
            $.mode = C4;
            break;
          }
          while (z < 16) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ($.wrap & 2 && V === 35615) {
            $.check = 0, R[0] = V & 255, R[1] = V >>> 8 & 255, $.check = L2($.check, R, 2, 0), V = 0, z = 0, $.mode = cq;
            break;
          }
          if ($.flags = 0, $.head) $.head.done = false;
          if (!($.wrap & 1) || (((V & 255) << 8) + (V >> 8)) % 31) {
            Q.msg = "incorrect header check", $.mode = N0;
            break;
          }
          if ((V & 15) !== uq) {
            Q.msg = "unknown compression method", $.mode = N0;
            break;
          }
          if (V >>>= 4, z -= 4, E = (V & 15) + 8, $.wbits === 0) $.wbits = E;
          else if (E > $.wbits) {
            Q.msg = "invalid window size", $.mode = N0;
            break;
          }
          $.dmax = 1 << E, Q.adler = $.check = 1, $.mode = V & 512 ? rq : S2, V = 0, z = 0;
          break;
        case cq:
          while (z < 16) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ($.flags = V, ($.flags & 255) !== uq) {
            Q.msg = "unknown compression method", $.mode = N0;
            break;
          }
          if ($.flags & 57344) {
            Q.msg = "unknown header flags set", $.mode = N0;
            break;
          }
          if ($.head) $.head.text = V >> 8 & 1;
          if ($.flags & 512) R[0] = V & 255, R[1] = V >>> 8 & 255, $.check = L2($.check, R, 2, 0);
          V = 0, z = 0, $.mode = pq;
        case pq:
          while (z < 32) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ($.head) $.head.time = V;
          if ($.flags & 512) R[0] = V & 255, R[1] = V >>> 8 & 255, R[2] = V >>> 16 & 255, R[3] = V >>> 24 & 255, $.check = L2($.check, R, 4, 0);
          V = 0, z = 0, $.mode = mq;
        case mq:
          while (z < 16) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ($.head) $.head.xflags = V & 255, $.head.os = V >> 8;
          if ($.flags & 512) R[0] = V & 255, R[1] = V >>> 8 & 255, $.check = L2($.check, R, 2, 0);
          V = 0, z = 0, $.mode = dq;
        case dq:
          if ($.flags & 1024) {
            while (z < 16) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            if ($.length = V, $.head) $.head.extra_len = V;
            if ($.flags & 512) R[0] = V & 255, R[1] = V >>> 8 & 255, $.check = L2($.check, R, 2, 0);
            V = 0, z = 0;
          } else if ($.head) $.head.extra = null;
          $.mode = lq;
        case lq:
          if ($.flags & 1024) {
            if (Z = $.length, Z > U) Z = U;
            if (Z) {
              if ($.head) {
                if (E = $.head.extra_len - $.length, !$.head.extra) $.head.extra = Array($.head.extra_len);
                i0.arraySet($.head.extra, X, J, Z, E);
              }
              if ($.flags & 512) $.check = L2($.check, X, Z, J);
              U -= Z, J += Z, $.length -= Z;
            }
            if ($.length) break Q;
          }
          $.length = 0, $.mode = iq;
        case iq:
          if ($.flags & 2048) {
            if (U === 0) break Q;
            Z = 0;
            do
              if (E = X[J + Z++], $.head && E && $.length < 65536) $.head.name += String.fromCharCode(E);
            while (E && Z < U);
            if ($.flags & 512) $.check = L2($.check, X, Z, J);
            if (U -= Z, J += Z, E) break Q;
          } else if ($.head) $.head.name = null;
          $.length = 0, $.mode = oq;
        case oq:
          if ($.flags & 4096) {
            if (U === 0) break Q;
            Z = 0;
            do
              if (E = X[J + Z++], $.head && E && $.length < 65536) $.head.comment += String.fromCharCode(E);
            while (E && Z < U);
            if ($.flags & 512) $.check = L2($.check, X, Z, J);
            if (U -= Z, J += Z, E) break Q;
          } else if ($.head) $.head.comment = null;
          $.mode = nq;
        case nq:
          if ($.flags & 512) {
            while (z < 16) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            if (V !== ($.check & 65535)) {
              Q.msg = "header crc mismatch", $.mode = N0;
              break;
            }
            V = 0, z = 0;
          }
          if ($.head) $.head.hcrc = $.flags >> 9 & 1, $.head.done = true;
          Q.adler = $.check = 0, $.mode = S2;
          break;
        case rq:
          while (z < 32) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          Q.adler = $.check = V$(V), V = 0, z = 0, $.mode = C8;
        case C8:
          if ($.havedict === 0) return Q.next_out = K, Q.avail_out = G, Q.next_in = J, Q.avail_in = U, $.hold = V, $.bits = z, pW;
          Q.adler = $.check = 1, $.mode = S2;
        case S2:
          if (q === uW || q === w8) break Q;
        case C4:
          if ($.last) {
            V >>>= z & 7, z -= z & 7, $.mode = N4;
            break;
          }
          while (z < 3) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          switch ($.last = V & 1, V >>>= 1, z -= 1, V & 3) {
            case 0:
              $.mode = aq;
              break;
            case 1:
              if (sW($), $.mode = P8, q === w8) {
                V >>>= 2, z -= 2;
                break Q;
              }
              break;
            case 2:
              $.mode = tq;
              break;
            case 3:
              Q.msg = "invalid block type", $.mode = N0;
          }
          V >>>= 2, z -= 2;
          break;
        case aq:
          V >>>= z & 7, z -= z & 7;
          while (z < 32) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ((V & 65535) !== (V >>> 16 ^ 65535)) {
            Q.msg = "invalid stored block lengths", $.mode = N0;
            break;
          }
          if ($.length = V & 65535, V = 0, z = 0, $.mode = I4, q === w8) break Q;
        case I4:
          $.mode = sq;
        case sq:
          if (Z = $.length, Z) {
            if (Z > U) Z = U;
            if (Z > G) Z = G;
            if (Z === 0) break Q;
            i0.arraySet(Y, X, J, Z, K), U -= Z, J += Z, G -= Z, K += Z, $.length -= Z;
            break;
          }
          $.mode = S2;
          break;
        case tq:
          while (z < 14) {
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ($.nlen = (V & 31) + 257, V >>>= 5, z -= 5, $.ndist = (V & 31) + 1, V >>>= 5, z -= 5, $.ncode = (V & 15) + 4, V >>>= 4, z -= 4, $.nlen > 286 || $.ndist > 30) {
            Q.msg = "too many length or distance symbols", $.mode = N0;
            break;
          }
          $.have = 0, $.mode = eq;
        case eq:
          while ($.have < $.ncode) {
            while (z < 3) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            $.lens[L[$.have++]] = V & 7, V >>>= 3, z -= 3;
          }
          while ($.have < 19) $.lens[L[$.have++]] = 0;
          if ($.lencode = $.lendyn, $.lenbits = 7, x = { bits: $.lenbits }, d = O6(bW, $.lens, 0, 19, $.lencode, 0, $.work, x), $.lenbits = x.bits, d) {
            Q.msg = "invalid code lengths set", $.mode = N0;
            break;
          }
          $.have = 0, $.mode = Q$;
        case Q$:
          while ($.have < $.nlen + $.ndist) {
            for (; ; ) {
              if (C = $.lencode[V & (1 << $.lenbits) - 1], N = C >>> 24, W = C >>> 16 & 255, M = C & 65535, N <= z) break;
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            if (M < 16) V >>>= N, z -= N, $.lens[$.have++] = M;
            else {
              if (M === 16) {
                D = N + 2;
                while (z < D) {
                  if (U === 0) break Q;
                  U--, V += X[J++] << z, z += 8;
                }
                if (V >>>= N, z -= N, $.have === 0) {
                  Q.msg = "invalid bit length repeat", $.mode = N0;
                  break;
                }
                E = $.lens[$.have - 1], Z = 3 + (V & 3), V >>>= 2, z -= 2;
              } else if (M === 17) {
                D = N + 3;
                while (z < D) {
                  if (U === 0) break Q;
                  U--, V += X[J++] << z, z += 8;
                }
                V >>>= N, z -= N, E = 0, Z = 3 + (V & 7), V >>>= 3, z -= 3;
              } else {
                D = N + 7;
                while (z < D) {
                  if (U === 0) break Q;
                  U--, V += X[J++] << z, z += 8;
                }
                V >>>= N, z -= N, E = 0, Z = 11 + (V & 127), V >>>= 7, z -= 7;
              }
              if ($.have + Z > $.nlen + $.ndist) {
                Q.msg = "invalid bit length repeat", $.mode = N0;
                break;
              }
              while (Z--) $.lens[$.have++] = E;
            }
          }
          if ($.mode === N0) break;
          if ($.lens[256] === 0) {
            Q.msg = "invalid code -- missing end-of-block", $.mode = N0;
            break;
          }
          if ($.lenbits = 9, x = { bits: $.lenbits }, d = O6(G$, $.lens, 0, $.nlen, $.lencode, 0, $.work, x), $.lenbits = x.bits, d) {
            Q.msg = "invalid literal/lengths set", $.mode = N0;
            break;
          }
          if ($.distbits = 6, $.distcode = $.distdyn, x = { bits: $.distbits }, d = O6(W$, $.lens, $.nlen, $.ndist, $.distcode, 0, $.work, x), $.distbits = x.bits, d) {
            Q.msg = "invalid distances set", $.mode = N0;
            break;
          }
          if ($.mode = P8, q === w8) break Q;
        case P8:
          $.mode = L8;
        case L8:
          if (U >= 6 && G >= 258) {
            if (Q.next_out = K, Q.avail_out = G, Q.next_in = J, Q.avail_in = U, $.hold = V, $.bits = z, _W(Q, j), K = Q.next_out, Y = Q.output, G = Q.avail_out, J = Q.next_in, X = Q.input, U = Q.avail_in, V = $.hold, z = $.bits, $.mode === S2) $.back = -1;
            break;
          }
          $.back = 0;
          for (; ; ) {
            if (C = $.lencode[V & (1 << $.lenbits) - 1], N = C >>> 24, W = C >>> 16 & 255, M = C & 65535, N <= z) break;
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if (W && (W & 240) === 0) {
            w = N, I = W, f = M;
            for (; ; ) {
              if (C = $.lencode[f + ((V & (1 << w + I) - 1) >> w)], N = C >>> 24, W = C >>> 16 & 255, M = C & 65535, w + N <= z) break;
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            V >>>= w, z -= w, $.back += w;
          }
          if (V >>>= N, z -= N, $.back += N, $.length = M, W === 0) {
            $.mode = J$;
            break;
          }
          if (W & 32) {
            $.back = -1, $.mode = S2;
            break;
          }
          if (W & 64) {
            Q.msg = "invalid literal/length code", $.mode = N0;
            break;
          }
          $.extra = W & 15, $.mode = q$;
        case q$:
          if ($.extra) {
            D = $.extra;
            while (z < D) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            $.length += V & (1 << $.extra) - 1, V >>>= $.extra, z -= $.extra, $.back += $.extra;
          }
          $.was = $.length, $.mode = $$;
        case $$:
          for (; ; ) {
            if (C = $.distcode[V & (1 << $.distbits) - 1], N = C >>> 24, W = C >>> 16 & 255, M = C & 65535, N <= z) break;
            if (U === 0) break Q;
            U--, V += X[J++] << z, z += 8;
          }
          if ((W & 240) === 0) {
            w = N, I = W, f = M;
            for (; ; ) {
              if (C = $.distcode[f + ((V & (1 << w + I) - 1) >> w)], N = C >>> 24, W = C >>> 16 & 255, M = C & 65535, w + N <= z) break;
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            V >>>= w, z -= w, $.back += w;
          }
          if (V >>>= N, z -= N, $.back += N, W & 64) {
            Q.msg = "invalid distance code", $.mode = N0;
            break;
          }
          $.offset = M, $.extra = W & 15, $.mode = X$;
        case X$:
          if ($.extra) {
            D = $.extra;
            while (z < D) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            $.offset += V & (1 << $.extra) - 1, V >>>= $.extra, z -= $.extra, $.back += $.extra;
          }
          if ($.offset > $.dmax) {
            Q.msg = "invalid distance too far back", $.mode = N0;
            break;
          }
          $.mode = Y$;
        case Y$:
          if (G === 0) break Q;
          if (Z = j - G, $.offset > Z) {
            if (Z = $.offset - Z, Z > $.whave) {
              if ($.sane) {
                Q.msg = "invalid distance too far back", $.mode = N0;
                break;
              }
            }
            if (Z > $.wnext) Z -= $.wnext, h = $.wsize - Z;
            else h = $.wnext - Z;
            if (Z > $.length) Z = $.length;
            g = $.window;
          } else g = Y, h = K - $.offset, Z = $.length;
          if (Z > G) Z = G;
          G -= Z, $.length -= Z;
          do
            Y[K++] = g[h++];
          while (--Z);
          if ($.length === 0) $.mode = L8;
          break;
        case J$:
          if (G === 0) break Q;
          Y[K++] = $.length, G--, $.mode = L8;
          break;
        case N4:
          if ($.wrap) {
            while (z < 32) {
              if (U === 0) break Q;
              U--, V |= X[J++] << z, z += 8;
            }
            if (j -= G, Q.total_out += j, $.total += j, j) Q.adler = $.check = $.flags ? L2($.check, Y, j, K - j) : O4($.check, Y, j, K - j);
            if (j = G, ($.flags ? V : V$(V)) !== $.check) {
              Q.msg = "incorrect data check", $.mode = N0;
              break;
            }
            V = 0, z = 0;
          }
          $.mode = K$;
        case K$:
          if ($.wrap && $.flags) {
            while (z < 32) {
              if (U === 0) break Q;
              U--, V += X[J++] << z, z += 8;
            }
            if (V !== ($.total & 4294967295)) {
              Q.msg = "incorrect length check", $.mode = N0;
              break;
            }
            V = 0, z = 0;
          }
          $.mode = U$;
        case U$:
          d = cW;
          break Q;
        case N0:
          d = B$;
          break Q;
        case x4:
          return R4;
        case dW:
        default:
          return Q2;
      }
      if (Q.next_out = K, Q.avail_out = G, Q.next_in = J, Q.avail_in = U, $.hold = V, $.bits = z, $.wsize || j !== Q.avail_out && $.mode < N0 && ($.mode < N4 || q !== bq)) {
        if (w$(Q, Q.output, Q.next_out, j - Q.avail_out)) return $.mode = x4, R4;
      }
      if (H -= Q.avail_in, j -= Q.avail_out, Q.total_in += H, Q.total_out += j, $.total += j, $.wrap && j) Q.adler = $.check = $.flags ? L2($.check, Y, j, Q.next_out - j) : O4($.check, Y, j, Q.next_out - j);
      if (Q.data_type = $.bits + ($.last ? 64 : 0) + ($.mode === S2 ? 128 : 0) + ($.mode === P8 || $.mode === I4 ? 256 : 0), (H === 0 && j === 0 || q === bq) && d === j1) d = mW;
      return d;
    }
    function eW(Q) {
      if (!Q || !Q.state) return Q2;
      var q = Q.state;
      if (q.window) q.window = null;
      return Q.state = null, j1;
    }
    function QB(Q, q) {
      var $;
      if (!Q || !Q.state) return Q2;
      if ($ = Q.state, ($.wrap & 2) === 0) return Q2;
      return $.head = q, q.done = false, j1;
    }
    function qB(Q, q) {
      var $ = q.length, X, Y, J;
      if (!Q || !Q.state) return Q2;
      if (X = Q.state, X.wrap !== 0 && X.mode !== C8) return Q2;
      if (X.mode === C8) {
        if (Y = 1, Y = O4(Y, q, $, 0), Y !== X.check) return B$;
      }
      if (J = w$(Q, q, $, $), J) return X.mode = x4, R4;
      return X.havedict = 1, j1;
    }
    $B.inflateReset = j$;
    $B.inflateReset2 = H$;
    $B.inflateResetKeep = F$;
    $B.inflateInit = aW;
    $B.inflateInit2 = M$;
    $B.inflate = tW;
    $B.inflateEnd = eW;
    $B.inflateGetHeader = QB;
    $B.inflateSetDictionary = qB;
    $B.inflateInfo = "pako inflate (from Nodeca project)";
  });
  var T4 = k((xP, L$) => {
    L$.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
  });
  var I$ = k((TP, C$) => {
    function ZB() {
      this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
    }
    C$.exports = ZB;
  });
  var D$ = k((MB) => {
    var u1 = P$(), R6 = v2(), I8 = F4(), x0 = T4(), v4 = z8(), FB = j4(), jB = I$(), N$ = Object.prototype.toString;
    function H1(Q) {
      if (!(this instanceof H1)) return new H1(Q);
      this.options = R6.assign({ chunkSize: 16384, windowBits: 0, to: "" }, Q || {});
      var q = this.options;
      if (q.raw && q.windowBits >= 0 && q.windowBits < 16) {
        if (q.windowBits = -q.windowBits, q.windowBits === 0) q.windowBits = -15;
      }
      if (q.windowBits >= 0 && q.windowBits < 16 && !(Q && Q.windowBits)) q.windowBits += 32;
      if (q.windowBits > 15 && q.windowBits < 48) {
        if ((q.windowBits & 15) === 0) q.windowBits |= 15;
      }
      this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new FB(), this.strm.avail_out = 0;
      var $ = u1.inflateInit2(this.strm, q.windowBits);
      if ($ !== x0.Z_OK) throw Error(v4[$]);
      if (this.header = new jB(), u1.inflateGetHeader(this.strm, this.header), q.dictionary) {
        if (typeof q.dictionary === "string") q.dictionary = I8.string2buf(q.dictionary);
        else if (N$.call(q.dictionary) === "[object ArrayBuffer]") q.dictionary = new Uint8Array(q.dictionary);
        if (q.raw) {
          if ($ = u1.inflateSetDictionary(this.strm, q.dictionary), $ !== x0.Z_OK) throw Error(v4[$]);
        }
      }
    }
    H1.prototype.push = function(Q, q) {
      var $ = this.strm, X = this.options.chunkSize, Y = this.options.dictionary, J, K, U, G, V, z = false;
      if (this.ended) return false;
      if (K = q === ~~q ? q : q === true ? x0.Z_FINISH : x0.Z_NO_FLUSH, typeof Q === "string") $.input = I8.binstring2buf(Q);
      else if (N$.call(Q) === "[object ArrayBuffer]") $.input = new Uint8Array(Q);
      else $.input = Q;
      $.next_in = 0, $.avail_in = $.input.length;
      do {
        if ($.avail_out === 0) $.output = new R6.Buf8(X), $.next_out = 0, $.avail_out = X;
        if (J = u1.inflate($, x0.Z_NO_FLUSH), J === x0.Z_NEED_DICT && Y) J = u1.inflateSetDictionary(this.strm, Y);
        if (J === x0.Z_BUF_ERROR && z === true) J = x0.Z_OK, z = false;
        if (J !== x0.Z_STREAM_END && J !== x0.Z_OK) return this.onEnd(J), this.ended = true, false;
        if ($.next_out) {
          if ($.avail_out === 0 || J === x0.Z_STREAM_END || $.avail_in === 0 && (K === x0.Z_FINISH || K === x0.Z_SYNC_FLUSH)) if (this.options.to === "string") {
            if (U = I8.utf8border($.output, $.next_out), G = $.next_out - U, V = I8.buf2string($.output, U), $.next_out = G, $.avail_out = X - G, G) R6.arraySet($.output, $.output, U, G, 0);
            this.onData(V);
          } else this.onData(R6.shrinkBuf($.output, $.next_out));
        }
        if ($.avail_in === 0 && $.avail_out === 0) z = true;
      } while (($.avail_in > 0 || $.avail_out === 0) && J !== x0.Z_STREAM_END);
      if (J === x0.Z_STREAM_END) K = x0.Z_FINISH;
      if (K === x0.Z_FINISH) return J = u1.inflateEnd(this.strm), this.onEnd(J), this.ended = true, J === x0.Z_OK;
      if (K === x0.Z_SYNC_FLUSH) return this.onEnd(x0.Z_OK), $.avail_out = 0, true;
      return true;
    };
    H1.prototype.onData = function(Q) {
      this.chunks.push(Q);
    };
    H1.prototype.onEnd = function(Q) {
      if (Q === x0.Z_OK) if (this.options.to === "string") this.result = this.chunks.join("");
      else this.result = R6.flattenChunks(this.chunks);
      this.chunks = [], this.err = Q, this.msg = this.strm.msg;
    };
    function E4(Q, q) {
      var $ = new H1(q);
      if ($.push(Q, true), $.err) throw $.msg || v4[$.err];
      return $.result;
    }
    function HB(Q, q) {
      return q = q || {}, q.raw = true, E4(Q, q);
    }
    MB.Inflate = H1;
    MB.inflate = E4;
    MB.inflateRaw = HB;
    MB.ungzip = E4;
  });
  var R$ = k((EP, O$) => {
    var IB = v2().assign, NB = Tq(), DB = D$(), AB = T4(), A$ = {};
    IB(A$, NB, DB, AB);
    O$.exports = A$;
  });
  var T$ = k((TB) => {
    var OB = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", RB = R$(), x$ = A0(), N8 = l0(), xB = OB ? "uint8array" : "array";
    TB.magic = "\b\0";
    function M1(Q, q) {
      N8.call(this, "FlateWorker/" + Q), this._pako = null, this._pakoAction = Q, this._pakoOptions = q, this.meta = {};
    }
    x$.inherits(M1, N8);
    M1.prototype.processChunk = function(Q) {
      if (this.meta = Q.meta, this._pako === null) this._createPako();
      this._pako.push(x$.transformTo(xB, Q.data), false);
    };
    M1.prototype.flush = function() {
      if (N8.prototype.flush.call(this), this._pako === null) this._createPako();
      this._pako.push([], true);
    };
    M1.prototype.cleanUp = function() {
      N8.prototype.cleanUp.call(this), this._pako = null;
    };
    M1.prototype._createPako = function() {
      this._pako = new RB[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
      var Q = this;
      this._pako.onData = function(q) {
        Q.push({ data: q, meta: Q.meta });
      };
    };
    TB.compressWorker = function(Q) {
      return new M1("Deflate", Q);
    };
    TB.uncompressWorker = function() {
      return new M1("Inflate", {});
    };
  });
  var S4 = k((kB) => {
    var v$ = l0();
    kB.STORE = { magic: "\0\0", compressWorker: function() {
      return new v$("STORE compression");
    }, uncompressWorker: function() {
      return new v$("STORE decompression");
    } };
    kB.DEFLATE = T$();
  });
  var k4 = k((fB) => {
    fB.LOCAL_FILE_HEADER = "PK";
    fB.CENTRAL_FILE_HEADER = "PK";
    fB.CENTRAL_DIRECTORY_END = "PK";
    fB.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
    fB.ZIP64_CENTRAL_DIRECTORY_END = "PK";
    fB.DATA_DESCRIPTOR = "PK\x07\b";
  });
  var g$ = k((yP, k$) => {
    var c1 = A0(), p1 = l0(), g4 = E1(), E$ = J8(), D8 = k4(), L0 = function(Q, q) {
      var $ = "", X;
      for (X = 0; X < q; X++) $ += String.fromCharCode(Q & 255), Q = Q >>> 8;
      return $;
    }, mB = function(Q, q) {
      var $ = Q;
      if (!Q) $ = q ? 16893 : 33204;
      return ($ & 65535) << 16;
    }, dB = function(Q) {
      return (Q || 0) & 63;
    }, S$ = function(Q, q, $, X, Y, J) {
      var { file: K, compression: U } = Q, G = J !== g4.utf8encode, V = c1.transformTo("string", J(K.name)), z = c1.transformTo("string", g4.utf8encode(K.name)), H = K.comment, j = c1.transformTo("string", J(H)), Z = c1.transformTo("string", g4.utf8encode(H)), h = z.length !== K.name.length, g = Z.length !== H.length, C, N, W = "", M = "", w = "", I = K.dir, f = K.date, E = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
      if (!q || $) E.crc32 = Q.crc32, E.compressedSize = Q.compressedSize, E.uncompressedSize = Q.uncompressedSize;
      var d = 0;
      if (q) d |= 8;
      if (!G && (h || g)) d |= 2048;
      var R = 0, x = 0;
      if (I) R |= 16;
      if (Y === "UNIX") x = 798, R |= mB(K.unixPermissions, I);
      else x = 20, R |= dB(K.dosPermissions, I);
      if (C = f.getUTCHours(), C = C << 6, C = C | f.getUTCMinutes(), C = C << 5, C = C | f.getUTCSeconds() / 2, N = f.getUTCFullYear() - 1980, N = N << 4, N = N | f.getUTCMonth() + 1, N = N << 5, N = N | f.getUTCDate(), h) M = L0(1, 1) + L0(E$(V), 4) + z, W += "up" + L0(M.length, 2) + M;
      if (g) w = L0(1, 1) + L0(E$(j), 4) + Z, W += "uc" + L0(w.length, 2) + w;
      var D = "";
      D += `
\0`, D += L0(d, 2), D += U.magic, D += L0(C, 2), D += L0(N, 2), D += L0(E.crc32, 4), D += L0(E.compressedSize, 4), D += L0(E.uncompressedSize, 4), D += L0(V.length, 2), D += L0(W.length, 2);
      var L = D8.LOCAL_FILE_HEADER + D + V + W, S = D8.CENTRAL_FILE_HEADER + L0(x, 2) + D + L0(j.length, 2) + "\0\0\0\0" + L0(R, 4) + L0(X, 4) + V + W + j;
      return { fileRecord: L, dirRecord: S };
    }, lB = function(Q, q, $, X, Y) {
      var J = "", K = c1.transformTo("string", Y(X));
      return J = D8.CENTRAL_DIRECTORY_END + "\0\0\0\0" + L0(Q, 2) + L0(Q, 2) + L0(q, 4) + L0($, 4) + L0(K.length, 2) + K, J;
    }, iB = function(Q) {
      var q = "";
      return q = D8.DATA_DESCRIPTOR + L0(Q.crc32, 4) + L0(Q.compressedSize, 4) + L0(Q.uncompressedSize, 4), q;
    };
    function K2(Q, q, $, X) {
      p1.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = q, this.zipPlatform = $, this.encodeFileName = X, this.streamFiles = Q, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
    }
    c1.inherits(K2, p1);
    K2.prototype.push = function(Q) {
      var q = Q.meta.percent || 0, $ = this.entriesCount, X = this._sources.length;
      if (this.accumulate) this.contentBuffer.push(Q);
      else this.bytesWritten += Q.data.length, p1.prototype.push.call(this, { data: Q.data, meta: { currentFile: this.currentFile, percent: $ ? (q + 100 * ($ - X - 1)) / $ : 100 } });
    };
    K2.prototype.openedSource = function(Q) {
      this.currentSourceOffset = this.bytesWritten, this.currentFile = Q.file.name;
      var q = this.streamFiles && !Q.file.dir;
      if (q) {
        var $ = S$(Q, q, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({ data: $.fileRecord, meta: { percent: 0 } });
      } else this.accumulate = true;
    };
    K2.prototype.closedSource = function(Q) {
      this.accumulate = false;
      var q = this.streamFiles && !Q.file.dir, $ = S$(Q, q, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      if (this.dirRecords.push($.dirRecord), q) this.push({ data: iB(Q), meta: { percent: 100 } });
      else {
        this.push({ data: $.fileRecord, meta: { percent: 0 } });
        while (this.contentBuffer.length) this.push(this.contentBuffer.shift());
      }
      this.currentFile = null;
    };
    K2.prototype.flush = function() {
      var Q = this.bytesWritten;
      for (var q = 0; q < this.dirRecords.length; q++) this.push({ data: this.dirRecords[q], meta: { percent: 100 } });
      var $ = this.bytesWritten - Q, X = lB(this.dirRecords.length, $, Q, this.zipComment, this.encodeFileName);
      this.push({ data: X, meta: { percent: 100 } });
    };
    K2.prototype.prepareNextSource = function() {
      if (this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused) this.previous.pause();
      else this.previous.resume();
    };
    K2.prototype.registerPrevious = function(Q) {
      this._sources.push(Q);
      var q = this;
      return Q.on("data", function($) {
        q.processChunk($);
      }), Q.on("end", function() {
        if (q.closedSource(q.previous.streamInfo), q._sources.length) q.prepareNextSource();
        else q.end();
      }), Q.on("error", function($) {
        q.error($);
      }), this;
    };
    K2.prototype.resume = function() {
      if (!p1.prototype.resume.call(this)) return false;
      if (!this.previous && this._sources.length) return this.prepareNextSource(), true;
      if (!this.previous && !this._sources.length && !this.generatedError) return this.end(), true;
    };
    K2.prototype.error = function(Q) {
      var q = this._sources;
      if (!p1.prototype.error.call(this, Q)) return false;
      for (var $ = 0; $ < q.length; $++) try {
        q[$].error(Q);
      } catch (X) {
      }
      return true;
    };
    K2.prototype.lock = function() {
      p1.prototype.lock.call(this);
      var Q = this._sources;
      for (var q = 0; q < Q.length; q++) Q[q].lock();
    };
    k$.exports = K2;
  });
  var y$ = k((aB) => {
    var oB = S4(), nB = g$(), rB = function(Q, q) {
      var $ = Q || q, X = oB[$];
      if (!X) throw Error($ + " is not a valid compression method !");
      return X;
    };
    aB.generateWorker = function(Q, q, $) {
      var X = new nB(q.streamFiles, $, q.platform, q.encodeFileName), Y = 0;
      try {
        Q.forEach(function(J, K) {
          Y++;
          var U = rB(K.options.compression, q.compression), G = K.options.compressionOptions || q.compressionOptions || {}, V = K.dir, z = K.date;
          K._compressWorker(U, G).withStreamInfo("file", { name: J, dir: V, date: z, comment: K.comment || "", unixPermissions: K.unixPermissions, dosPermissions: K.dosPermissions }).pipe(X);
        }), X.entriesCount = Y;
      } catch (J) {
        X.error(J);
      }
      return X;
    };
  });
  var h$ = k((hP, f$) => {
    var tB = A0(), A8 = l0();
    function x6(Q, q) {
      A8.call(this, "Nodejs stream input adapter for " + Q), this._upstreamEnded = false, this._bindStream(q);
    }
    tB.inherits(x6, A8);
    x6.prototype._bindStream = function(Q) {
      var q = this;
      this._stream = Q, Q.pause(), Q.on("data", function($) {
        q.push({ data: $, meta: { percent: 0 } });
      }).on("error", function($) {
        if (q.isPaused) this.generatedError = $;
        else q.error($);
      }).on("end", function() {
        if (q.isPaused) q._upstreamEnded = true;
        else q.end();
      });
    };
    x6.prototype.pause = function() {
      if (!A8.prototype.pause.call(this)) return false;
      return this._stream.pause(), true;
    };
    x6.prototype.resume = function() {
      if (!A8.prototype.resume.call(this)) return false;
      if (this._upstreamEnded) this.end();
      else this._stream.resume();
      return true;
    };
    f$.exports = x6;
  });
  var o$ = k((_P, i$) => {
    var eB = E1(), T6 = A0(), c$ = l0(), QZ = _5(), p$ = b5(), _$ = K8(), qZ = b9(), $Z = y$(), b$ = K6(), XZ = h$(), m$ = function(Q, q, $) {
      var X = T6.getTypeOf(q), Y, J = T6.extend($ || {}, p$);
      if (J.date = J.date || /* @__PURE__ */ new Date(), J.compression !== null) J.compression = J.compression.toUpperCase();
      if (typeof J.unixPermissions === "string") J.unixPermissions = parseInt(J.unixPermissions, 8);
      if (J.unixPermissions && J.unixPermissions & 16384) J.dir = true;
      if (J.dosPermissions && J.dosPermissions & 16) J.dir = true;
      if (J.dir) Q = d$(Q);
      if (J.createFolders && (Y = YZ(Q))) l$.call(this, Y, true);
      var K = X === "string" && J.binary === false && J.base64 === false;
      if (!$ || typeof $.binary > "u") J.binary = !K;
      var U = q instanceof _$ && q.uncompressedSize === 0;
      if (U || J.dir || !q || q.length === 0) J.base64 = false, J.binary = true, q = "", J.compression = "STORE", X = "string";
      var G = null;
      if (q instanceof _$ || q instanceof c$) G = q;
      else if (b$.isNode && b$.isStream(q)) G = new XZ(Q, q);
      else G = T6.prepareContent(Q, q, J.binary, J.optimizedBinaryString, J.base64);
      var V = new qZ(Q, G, J);
      this.files[Q] = V;
    }, YZ = function(Q) {
      if (Q.slice(-1) === "/") Q = Q.substring(0, Q.length - 1);
      var q = Q.lastIndexOf("/");
      return q > 0 ? Q.substring(0, q) : "";
    }, d$ = function(Q) {
      if (Q.slice(-1) !== "/") Q += "/";
      return Q;
    }, l$ = function(Q, q) {
      if (q = typeof q < "u" ? q : p$.createFolders, Q = d$(Q), !this.files[Q]) m$.call(this, Q, null, { dir: true, createFolders: q });
      return this.files[Q];
    };
    function u$(Q) {
      return Object.prototype.toString.call(Q) === "[object RegExp]";
    }
    var JZ = { load: function() {
      throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, forEach: function(Q) {
      var q, $, X;
      for (q in this.files) if (X = this.files[q], $ = q.slice(this.root.length, q.length), $ && q.slice(0, this.root.length) === this.root) Q($, X);
    }, filter: function(Q) {
      var q = [];
      return this.forEach(function($, X) {
        if (Q($, X)) q.push(X);
      }), q;
    }, file: function(Q, q, $) {
      if (arguments.length === 1) if (u$(Q)) {
        var X = Q;
        return this.filter(function(J, K) {
          return !K.dir && X.test(J);
        });
      } else {
        var Y = this.files[this.root + Q];
        if (Y && !Y.dir) return Y;
        else return null;
      }
      else Q = this.root + Q, m$.call(this, Q, q, $);
      return this;
    }, folder: function(Q) {
      if (!Q) return this;
      if (u$(Q)) return this.filter(function(Y, J) {
        return J.dir && Q.test(Y);
      });
      var q = this.root + Q, $ = l$.call(this, q), X = this.clone();
      return X.root = $.name, X;
    }, remove: function(Q) {
      Q = this.root + Q;
      var q = this.files[Q];
      if (!q) {
        if (Q.slice(-1) !== "/") Q += "/";
        q = this.files[Q];
      }
      if (q && !q.dir) delete this.files[Q];
      else {
        var $ = this.filter(function(Y, J) {
          return J.name.slice(0, Q.length) === Q;
        });
        for (var X = 0; X < $.length; X++) delete this.files[$[X].name];
      }
      return this;
    }, generate: function() {
      throw Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    }, generateInternalStream: function(Q) {
      var q, $ = {};
      try {
        if ($ = T6.extend(Q || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: eB.utf8encode }), $.type = $.type.toLowerCase(), $.compression = $.compression.toUpperCase(), $.type === "binarystring") $.type = "string";
        if (!$.type) throw Error("No output type specified.");
        if (T6.checkSupport($.type), $.platform === "darwin" || $.platform === "freebsd" || $.platform === "linux" || $.platform === "sunos") $.platform = "UNIX";
        if ($.platform === "win32") $.platform = "DOS";
        var X = $.comment || this.comment || "";
        q = $Z.generateWorker(this, $, X);
      } catch (Y) {
        q = new c$("error"), q.error(Y);
      }
      return new QZ(q, $.type || "string", $.mimeType);
    }, generateAsync: function(Q, q) {
      return this.generateInternalStream(Q).accumulate(q);
    }, generateNodeStream: function(Q, q) {
      if (Q = Q || {}, !Q.type) Q.type = "nodebuffer";
      return this.generateInternalStream(Q).toNodejsStream(q);
    } };
    i$.exports = JZ;
  });
  var y4 = k((bP, r$) => {
    var KZ = A0();
    function n$(Q) {
      this.data = Q, this.length = Q.length, this.index = 0, this.zero = 0;
    }
    n$.prototype = { checkOffset: function(Q) {
      this.checkIndex(this.index + Q);
    }, checkIndex: function(Q) {
      if (this.length < this.zero + Q || Q < 0) throw Error("End of data reached (data length = " + this.length + ", asked index = " + Q + "). Corrupted zip ?");
    }, setIndex: function(Q) {
      this.checkIndex(Q), this.index = Q;
    }, skip: function(Q) {
      this.setIndex(this.index + Q);
    }, byteAt: function() {
    }, readInt: function(Q) {
      var q = 0, $;
      this.checkOffset(Q);
      for ($ = this.index + Q - 1; $ >= this.index; $--) q = (q << 8) + this.byteAt($);
      return this.index += Q, q;
    }, readString: function(Q) {
      return KZ.transformTo("string", this.readData(Q));
    }, readData: function() {
    }, lastIndexOfSignature: function() {
    }, readAndCheckSignature: function() {
    }, readDate: function() {
      var Q = this.readInt(4);
      return new Date(Date.UTC((Q >> 25 & 127) + 1980, (Q >> 21 & 15) - 1, Q >> 16 & 31, Q >> 11 & 31, Q >> 5 & 63, (Q & 31) << 1));
    } };
    r$.exports = n$;
  });
  var f4 = k((uP, s$) => {
    var a$ = y4(), UZ = A0();
    function m1(Q) {
      a$.call(this, Q);
      for (var q = 0; q < this.data.length; q++) Q[q] = Q[q] & 255;
    }
    UZ.inherits(m1, a$);
    m1.prototype.byteAt = function(Q) {
      return this.data[this.zero + Q];
    };
    m1.prototype.lastIndexOfSignature = function(Q) {
      var q = Q.charCodeAt(0), $ = Q.charCodeAt(1), X = Q.charCodeAt(2), Y = Q.charCodeAt(3);
      for (var J = this.length - 4; J >= 0; --J) if (this.data[J] === q && this.data[J + 1] === $ && this.data[J + 2] === X && this.data[J + 3] === Y) return J - this.zero;
      return -1;
    };
    m1.prototype.readAndCheckSignature = function(Q) {
      var q = Q.charCodeAt(0), $ = Q.charCodeAt(1), X = Q.charCodeAt(2), Y = Q.charCodeAt(3), J = this.readData(4);
      return q === J[0] && $ === J[1] && X === J[2] && Y === J[3];
    };
    m1.prototype.readData = function(Q) {
      if (this.checkOffset(Q), Q === 0) return [];
      var q = this.data.slice(this.zero + this.index, this.zero + this.index + Q);
      return this.index += Q, q;
    };
    s$.exports = m1;
  });
  var QX = k((cP, e$) => {
    var t$ = y4(), VZ = A0();
    function d1(Q) {
      t$.call(this, Q);
    }
    VZ.inherits(d1, t$);
    d1.prototype.byteAt = function(Q) {
      return this.data.charCodeAt(this.zero + Q);
    };
    d1.prototype.lastIndexOfSignature = function(Q) {
      return this.data.lastIndexOf(Q) - this.zero;
    };
    d1.prototype.readAndCheckSignature = function(Q) {
      var q = this.readData(4);
      return Q === q;
    };
    d1.prototype.readData = function(Q) {
      this.checkOffset(Q);
      var q = this.data.slice(this.zero + this.index, this.zero + this.index + Q);
      return this.index += Q, q;
    };
    e$.exports = d1;
  });
  var _4 = k((pP, $X) => {
    var qX = f4(), zZ = A0();
    function h4(Q) {
      qX.call(this, Q);
    }
    zZ.inherits(h4, qX);
    h4.prototype.readData = function(Q) {
      if (this.checkOffset(Q), Q === 0) return new Uint8Array(0);
      var q = this.data.subarray(this.zero + this.index, this.zero + this.index + Q);
      return this.index += Q, q;
    };
    $X.exports = h4;
  });
  var JX = k((mP, YX) => {
    var XX = _4(), GZ = A0();
    function b4(Q) {
      XX.call(this, Q);
    }
    GZ.inherits(b4, XX);
    b4.prototype.readData = function(Q) {
      this.checkOffset(Q);
      var q = this.data.slice(this.zero + this.index, this.zero + this.index + Q);
      return this.index += Q, q;
    };
    YX.exports = b4;
  });
  var u4 = k((dP, UX) => {
    var O8 = A0(), KX = T2(), WZ = f4(), BZ = QX(), ZZ = JX(), FZ = _4();
    UX.exports = function(Q) {
      var q = O8.getTypeOf(Q);
      if (O8.checkSupport(q), q === "string" && !KX.uint8array) return new BZ(Q);
      if (q === "nodebuffer") return new ZZ(Q);
      if (KX.uint8array) return new FZ(O8.transformTo("uint8array", Q));
      return new WZ(O8.transformTo("array", Q));
    };
  });
  var WX = k((lP, GX) => {
    var c4 = u4(), n2 = A0(), jZ = K8(), VX = J8(), R8 = E1(), x8 = S4(), HZ = T2(), MZ = 0, wZ = 3, PZ = function(Q) {
      for (var q in x8) {
        if (!Object.prototype.hasOwnProperty.call(x8, q)) continue;
        if (x8[q].magic === Q) return x8[q];
      }
      return null;
    };
    function zX(Q, q) {
      this.options = Q, this.loadOptions = q;
    }
    zX.prototype = { isEncrypted: function() {
      return (this.bitFlag & 1) === 1;
    }, useUTF8: function() {
      return (this.bitFlag & 2048) === 2048;
    }, readLocalPart: function(Q) {
      var q, $;
      if (Q.skip(22), this.fileNameLength = Q.readInt(2), $ = Q.readInt(2), this.fileName = Q.readData(this.fileNameLength), Q.skip($), this.compressedSize === -1 || this.uncompressedSize === -1) throw Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
      if (q = PZ(this.compressionMethod), q === null) throw Error("Corrupted zip : compression " + n2.pretty(this.compressionMethod) + " unknown (inner file : " + n2.transformTo("string", this.fileName) + ")");
      this.decompressed = new jZ(this.compressedSize, this.uncompressedSize, this.crc32, q, Q.readData(this.compressedSize));
    }, readCentralPart: function(Q) {
      this.versionMadeBy = Q.readInt(2), Q.skip(2), this.bitFlag = Q.readInt(2), this.compressionMethod = Q.readString(2), this.date = Q.readDate(), this.crc32 = Q.readInt(4), this.compressedSize = Q.readInt(4), this.uncompressedSize = Q.readInt(4);
      var q = Q.readInt(2);
      if (this.extraFieldsLength = Q.readInt(2), this.fileCommentLength = Q.readInt(2), this.diskNumberStart = Q.readInt(2), this.internalFileAttributes = Q.readInt(2), this.externalFileAttributes = Q.readInt(4), this.localHeaderOffset = Q.readInt(4), this.isEncrypted()) throw Error("Encrypted zip are not supported");
      Q.skip(q), this.readExtraFields(Q), this.parseZIP64ExtraField(Q), this.fileComment = Q.readData(this.fileCommentLength);
    }, processAttributes: function() {
      this.unixPermissions = null, this.dosPermissions = null;
      var Q = this.versionMadeBy >> 8;
      if (this.dir = this.externalFileAttributes & 16 ? true : false, Q === MZ) this.dosPermissions = this.externalFileAttributes & 63;
      if (Q === wZ) this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
      if (!this.dir && this.fileNameStr.slice(-1) === "/") this.dir = true;
    }, parseZIP64ExtraField: function() {
      if (!this.extraFields[1]) return;
      var Q = c4(this.extraFields[1].value);
      if (this.uncompressedSize === n2.MAX_VALUE_32BITS) this.uncompressedSize = Q.readInt(8);
      if (this.compressedSize === n2.MAX_VALUE_32BITS) this.compressedSize = Q.readInt(8);
      if (this.localHeaderOffset === n2.MAX_VALUE_32BITS) this.localHeaderOffset = Q.readInt(8);
      if (this.diskNumberStart === n2.MAX_VALUE_32BITS) this.diskNumberStart = Q.readInt(4);
    }, readExtraFields: function(Q) {
      var q = Q.index + this.extraFieldsLength, $, X, Y;
      if (!this.extraFields) this.extraFields = {};
      while (Q.index + 4 < q) $ = Q.readInt(2), X = Q.readInt(2), Y = Q.readData(X), this.extraFields[$] = { id: $, length: X, value: Y };
      Q.setIndex(q);
    }, handleUTF8: function() {
      var Q = HZ.uint8array ? "uint8array" : "array";
      if (this.useUTF8()) this.fileNameStr = R8.utf8decode(this.fileName), this.fileCommentStr = R8.utf8decode(this.fileComment);
      else {
        var q = this.findExtraFieldUnicodePath();
        if (q !== null) this.fileNameStr = q;
        else {
          var $ = n2.transformTo(Q, this.fileName);
          this.fileNameStr = this.loadOptions.decodeFileName($);
        }
        var X = this.findExtraFieldUnicodeComment();
        if (X !== null) this.fileCommentStr = X;
        else {
          var Y = n2.transformTo(Q, this.fileComment);
          this.fileCommentStr = this.loadOptions.decodeFileName(Y);
        }
      }
    }, findExtraFieldUnicodePath: function() {
      var Q = this.extraFields[28789];
      if (Q) {
        var q = c4(Q.value);
        if (q.readInt(1) !== 1) return null;
        if (VX(this.fileName) !== q.readInt(4)) return null;
        return R8.utf8decode(q.readData(Q.length - 5));
      }
      return null;
    }, findExtraFieldUnicodeComment: function() {
      var Q = this.extraFields[25461];
      if (Q) {
        var q = c4(Q.value);
        if (q.readInt(1) !== 1) return null;
        if (VX(this.fileComment) !== q.readInt(4)) return null;
        return R8.utf8decode(q.readData(Q.length - 5));
      }
      return null;
    } };
    GX.exports = zX;
  });
  var FX = k((iP, ZX) => {
    var LZ = u4(), k2 = A0(), U2 = k4(), CZ = WX(), IZ = T2();
    function BX(Q) {
      this.files = [], this.loadOptions = Q;
    }
    BX.prototype = { checkSignature: function(Q) {
      if (!this.reader.readAndCheckSignature(Q)) {
        this.reader.index -= 4;
        var q = this.reader.readString(4);
        throw Error("Corrupted zip or bug: unexpected signature (" + k2.pretty(q) + ", expected " + k2.pretty(Q) + ")");
      }
    }, isSignature: function(Q, q) {
      var $ = this.reader.index;
      this.reader.setIndex(Q);
      var X = this.reader.readString(4), Y = X === q;
      return this.reader.setIndex($), Y;
    }, readBlockEndOfCentral: function() {
      this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
      var Q = this.reader.readData(this.zipCommentLength), q = IZ.uint8array ? "uint8array" : "array", $ = k2.transformTo(q, Q);
      this.zipComment = this.loadOptions.decodeFileName($);
    }, readBlockZip64EndOfCentral: function() {
      this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
      var Q = this.zip64EndOfCentralSize - 44, q = 0, $, X, Y;
      while (q < Q) $ = this.reader.readInt(2), X = this.reader.readInt(4), Y = this.reader.readData(X), this.zip64ExtensibleData[$] = { id: $, length: X, value: Y };
    }, readBlockZip64EndOfCentralLocator: function() {
      if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw Error("Multi-volumes zip are not supported");
    }, readLocalFiles: function() {
      var Q, q;
      for (Q = 0; Q < this.files.length; Q++) q = this.files[Q], this.reader.setIndex(q.localHeaderOffset), this.checkSignature(U2.LOCAL_FILE_HEADER), q.readLocalPart(this.reader), q.handleUTF8(), q.processAttributes();
    }, readCentralDir: function() {
      var Q;
      this.reader.setIndex(this.centralDirOffset);
      while (this.reader.readAndCheckSignature(U2.CENTRAL_FILE_HEADER)) Q = new CZ({ zip64: this.zip64 }, this.loadOptions), Q.readCentralPart(this.reader), this.files.push(Q);
      if (this.centralDirRecords !== this.files.length) {
        if (this.centralDirRecords !== 0 && this.files.length === 0) throw Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }
    }, readEndOfCentral: function() {
      var Q = this.reader.lastIndexOfSignature(U2.CENTRAL_DIRECTORY_END);
      if (Q < 0) {
        var q = !this.isSignature(0, U2.LOCAL_FILE_HEADER);
        if (q) throw Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
        else throw Error("Corrupted zip: can't find end of central directory");
      }
      this.reader.setIndex(Q);
      var $ = Q;
      if (this.checkSignature(U2.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === k2.MAX_VALUE_16BITS || this.diskWithCentralDirStart === k2.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === k2.MAX_VALUE_16BITS || this.centralDirRecords === k2.MAX_VALUE_16BITS || this.centralDirSize === k2.MAX_VALUE_32BITS || this.centralDirOffset === k2.MAX_VALUE_32BITS) {
        if (this.zip64 = true, Q = this.reader.lastIndexOfSignature(U2.ZIP64_CENTRAL_DIRECTORY_LOCATOR), Q < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
        if (this.reader.setIndex(Q), this.checkSignature(U2.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, U2.ZIP64_CENTRAL_DIRECTORY_END)) {
          if (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(U2.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0) throw Error("Corrupted zip: can't find the ZIP64 end of central directory");
        }
        this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(U2.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
      }
      var X = this.centralDirOffset + this.centralDirSize;
      if (this.zip64) X += 20, X += 12 + this.zip64EndOfCentralSize;
      var Y = $ - X;
      if (Y > 0) if (this.isSignature($, U2.CENTRAL_FILE_HEADER)) ;
      else this.reader.zero = Y;
      else if (Y < 0) throw Error("Corrupted zip: missing " + Math.abs(Y) + " bytes.");
    }, prepareReader: function(Q) {
      this.reader = LZ(Q);
    }, load: function(Q) {
      this.prepareReader(Q), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
    } };
    ZX.exports = BX;
  });
  var MX = k((oP, HX) => {
    var p4 = A0(), T8 = x1(), NZ = E1(), DZ = FX(), AZ = p5(), jX = K6();
    function OZ(Q) {
      return new T8.Promise(function(q, $) {
        var X = Q.decompressed.getContentWorker().pipe(new AZ());
        X.on("error", function(Y) {
          $(Y);
        }).on("end", function() {
          if (X.streamInfo.crc32 !== Q.decompressed.crc32) $(Error("Corrupted zip : CRC32 mismatch"));
          else q();
        }).resume();
      });
    }
    HX.exports = function(Q, q) {
      var $ = this;
      if (q = p4.extend(q || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: NZ.utf8decode }), jX.isNode && jX.isStream(Q)) return T8.Promise.reject(Error("JSZip can't accept a stream when loading a zip file."));
      return p4.prepareContent("the loaded zip file", Q, true, q.optimizedBinaryString, q.base64).then(function(X) {
        var Y = new DZ(q);
        return Y.load(X), Y;
      }).then(function(Y) {
        var J = [T8.Promise.resolve(Y)], K = Y.files;
        if (q.checkCRC32) for (var U = 0; U < K.length; U++) J.push(OZ(K[U]));
        return T8.Promise.all(J);
      }).then(function(Y) {
        var J = Y.shift(), K = J.files;
        for (var U = 0; U < K.length; U++) {
          var G = K[U], V = G.fileNameStr, z = p4.resolve(G.fileNameStr);
          if ($.file(z, G.decompressed, { binary: true, optimizedBinaryString: true, date: G.date, dir: G.dir, comment: G.fileCommentStr.length ? G.fileCommentStr : null, unixPermissions: G.unixPermissions, dosPermissions: G.dosPermissions, createFolders: q.createFolders }), !G.dir) $.file(z).unsafeOriginalName = V;
        }
        if (J.zipComment.length) $.comment = J.zipComment;
        return $;
      });
    };
  });
  var PX = k((nP, wX) => {
    function q2() {
      if (!(this instanceof q2)) return new q2();
      if (arguments.length) throw Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
      this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
        var Q = new q2();
        for (var q in this) if (typeof this[q] !== "function") Q[q] = this[q];
        return Q;
      };
    }
    q2.prototype = o$();
    q2.prototype.loadAsync = MX();
    q2.support = T2();
    q2.defaults = b5();
    q2.version = "3.10.1";
    q2.loadAsync = function(Q, q) {
      return new q2().loadAsync(Q, q);
    };
    q2.external = x1();
    wX.exports = q2;
  });
  var uX = k((i4) => {
    var bX;
    (function(Q) {
      if (typeof DO_NOT_EXPORT_CRC > "u") if (typeof i4 === "object") Q(i4);
      else if (typeof define === "function" && define.amd) define(function() {
        var q = {};
        return Q(q), q;
      });
      else Q(bX = {});
      else Q(bX = {});
    })(function(Q) {
      Q.version = "1.2.2";
      function q() {
        var E = 0, d = Array(256);
        for (var R = 0; R != 256; ++R) E = R, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, E = E & 1 ? -2097792136 ^ E >>> 1 : E >>> 1, d[R] = E;
        return typeof Int32Array < "u" ? new Int32Array(d) : d;
      }
      var $ = q();
      function X(E) {
        var d = 0, R = 0, x = 0, D = typeof Int32Array < "u" ? new Int32Array(4096) : Array(4096);
        for (x = 0; x != 256; ++x) D[x] = E[x];
        for (x = 0; x != 256; ++x) {
          R = E[x];
          for (d = 256 + x; d < 4096; d += 256) R = D[d] = R >>> 8 ^ E[R & 255];
        }
        var L = [];
        for (x = 1; x != 16; ++x) L[x - 1] = typeof Int32Array < "u" ? D.subarray(x * 256, x * 256 + 256) : D.slice(x * 256, x * 256 + 256);
        return L;
      }
      var Y = X($), J = Y[0], K = Y[1], U = Y[2], G = Y[3], V = Y[4], z = Y[5], H = Y[6], j = Y[7], Z = Y[8], h = Y[9], g = Y[10], C = Y[11], N = Y[12], W = Y[13], M = Y[14];
      function w(E, d) {
        var R = d ^ -1;
        for (var x = 0, D = E.length; x < D; ) R = R >>> 8 ^ $[(R ^ E.charCodeAt(x++)) & 255];
        return ~R;
      }
      function I(E, d) {
        var R = d ^ -1, x = E.length - 15, D = 0;
        for (; D < x; ) R = M[E[D++] ^ R & 255] ^ W[E[D++] ^ R >> 8 & 255] ^ N[E[D++] ^ R >> 16 & 255] ^ C[E[D++] ^ R >>> 24] ^ g[E[D++]] ^ h[E[D++]] ^ Z[E[D++]] ^ j[E[D++]] ^ H[E[D++]] ^ z[E[D++]] ^ V[E[D++]] ^ G[E[D++]] ^ U[E[D++]] ^ K[E[D++]] ^ J[E[D++]] ^ $[E[D++]];
        x += 15;
        while (D < x) R = R >>> 8 ^ $[(R ^ E[D++]) & 255];
        return ~R;
      }
      function f(E, d) {
        var R = d ^ -1;
        for (var x = 0, D = E.length, L = 0, S = 0; x < D; ) if (L = E.charCodeAt(x++), L < 128) R = R >>> 8 ^ $[(R ^ L) & 255];
        else if (L < 2048) R = R >>> 8 ^ $[(R ^ (192 | L >> 6 & 31)) & 255], R = R >>> 8 ^ $[(R ^ (128 | L & 63)) & 255];
        else if (L >= 55296 && L < 57344) L = (L & 1023) + 64, S = E.charCodeAt(x++) & 1023, R = R >>> 8 ^ $[(R ^ (240 | L >> 8 & 7)) & 255], R = R >>> 8 ^ $[(R ^ (128 | L >> 2 & 63)) & 255], R = R >>> 8 ^ $[(R ^ (128 | S >> 6 & 15 | (L & 3) << 4)) & 255], R = R >>> 8 ^ $[(R ^ (128 | S & 63)) & 255];
        else R = R >>> 8 ^ $[(R ^ (224 | L >> 12 & 15)) & 255], R = R >>> 8 ^ $[(R ^ (128 | L >> 6 & 63)) & 255], R = R >>> 8 ^ $[(R ^ (128 | L & 63)) & 255];
        return ~R;
      }
      Q.table = $, Q.bstr = w, Q.buf = I, Q.str = f;
    });
  });
  var R0 = k((o4, pX) => {
    var g6 = function(Q) {
      return Q && Q.Math === Math && Q;
    };
    pX.exports = g6(typeof globalThis == "object" && globalThis) || g6(typeof window == "object" && window) || g6(typeof self == "object" && self) || g6(typeof global == "object" && global) || g6(typeof o4 == "object" && o4) || /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
  });
  var g2 = k((kL, mX) => {
    mX.exports = function(Q) {
      try {
        return !!Q();
      } catch (q) {
        return true;
      }
    };
  });
  var r2 = k((gL, dX) => {
    var pZ = g2();
    dX.exports = !pZ(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] !== 7;
    });
  });
  var n4 = k((yL, lX) => {
    var mZ = g2();
    lX.exports = !mZ(function() {
      var Q = function() {
      }.bind();
      return typeof Q != "function" || Q.hasOwnProperty("prototype");
    });
  });
  var h8 = k((fL, iX) => {
    var dZ = n4(), f8 = Function.prototype.call;
    iX.exports = dZ ? f8.bind(f8) : function() {
      return f8.apply(f8, arguments);
    };
  });
  var rX = k((iZ) => {
    var oX = {}.propertyIsEnumerable, nX = Object.getOwnPropertyDescriptor, lZ = nX && !oX.call({ 1: 2 }, 1);
    iZ.f = lZ ? function(q) {
      var $ = nX(this, q);
      return !!$ && $.enumerable;
    } : oX;
  });
  var r4 = k((_L, aX) => {
    aX.exports = function(Q, q) {
      return { enumerable: !(Q & 1), configurable: !(Q & 2), writable: !(Q & 4), value: q };
    };
  });
  var u0 = k((bL, eX) => {
    var sX = n4(), tX = Function.prototype, a4 = tX.call, nZ = sX && tX.bind.bind(a4, a4);
    eX.exports = sX ? nZ : function(Q) {
      return function() {
        return a4.apply(Q, arguments);
      };
    };
  });
  var _8 = k((uL, qY) => {
    var QY = u0(), rZ = QY({}.toString), aZ = QY("".slice);
    qY.exports = function(Q) {
      return aZ(rZ(Q), 8, -1);
    };
  });
  var XY = k((cL, $Y) => {
    var sZ = u0(), tZ = g2(), eZ = _8(), s4 = Object, QF = sZ("".split);
    $Y.exports = tZ(function() {
      return !s4("z").propertyIsEnumerable(0);
    }) ? function(Q) {
      return eZ(Q) === "String" ? QF(Q, "") : s4(Q);
    } : s4;
  });
  var t4 = k((pL, YY) => {
    YY.exports = function(Q) {
      return Q === null || Q === void 0;
    };
  });
  var e4 = k((mL, JY) => {
    var qF = t4(), $F = TypeError;
    JY.exports = function(Q) {
      if (qF(Q)) throw new $F("Can't call method on " + Q);
      return Q;
    };
  });
  var b8 = k((dL, KY) => {
    var XF = XY(), YF = e4();
    KY.exports = function(Q) {
      return XF(YF(Q));
    };
  });
  var X2 = k((lL, UY) => {
    var QQ = typeof document == "object" && document.all;
    UY.exports = typeof QQ > "u" && QQ !== void 0 ? function(Q) {
      return typeof Q == "function" || Q === QQ;
    } : function(Q) {
      return typeof Q == "function";
    };
  });
  var P1 = k((iL, VY) => {
    var JF = X2();
    VY.exports = function(Q) {
      return typeof Q == "object" ? Q !== null : JF(Q);
    };
  });
  var $Q = k((oL, zY) => {
    var qQ = R0(), KF = X2(), UF = function(Q) {
      return KF(Q) ? Q : void 0;
    };
    zY.exports = function(Q, q) {
      return arguments.length < 2 ? UF(qQ[Q]) : qQ[Q] && qQ[Q][q];
    };
  });
  var WY = k((nL, GY) => {
    var VF = u0();
    GY.exports = VF({}.isPrototypeOf);
  });
  var jY = k((rL, FY) => {
    var zF = R0(), BY = zF.navigator, ZY = BY && BY.userAgent;
    FY.exports = ZY ? String(ZY) : "";
  });
  var IY = k((aL, CY) => {
    var LY = R0(), XQ = jY(), HY = LY.process, MY = LY.Deno, wY = HY && HY.versions || MY && MY.version, PY = wY && wY.v8, G2, u8;
    if (PY) G2 = PY.split("."), u8 = G2[0] > 0 && G2[0] < 4 ? 1 : +(G2[0] + G2[1]);
    if (!u8 && XQ) {
      if (G2 = XQ.match(/Edge\/(\d+)/), !G2 || G2[1] >= 74) {
        if (G2 = XQ.match(/Chrome\/(\d+)/), G2) u8 = +G2[1];
      }
    }
    CY.exports = u8;
  });
  var YQ = k((sL, DY) => {
    var NY = IY(), GF = g2(), WF = R0(), BF = WF.String;
    DY.exports = !!Object.getOwnPropertySymbols && !GF(function() {
      var Q = /* @__PURE__ */ Symbol("symbol detection");
      return !BF(Q) || !(Object(Q) instanceof Symbol) || !Symbol.sham && NY && NY < 41;
    });
  });
  var JQ = k((tL, AY) => {
    var ZF = YQ();
    AY.exports = ZF && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var KQ = k((eL, OY) => {
    var FF = $Q(), jF = X2(), HF = WY(), MF = JQ(), wF = Object;
    OY.exports = MF ? function(Q) {
      return typeof Q == "symbol";
    } : function(Q) {
      var q = FF("Symbol");
      return jF(q) && HF(q.prototype, wF(Q));
    };
  });
  var xY = k((Q3, RY) => {
    var PF = String;
    RY.exports = function(Q) {
      try {
        return PF(Q);
      } catch (q) {
        return "Object";
      }
    };
  });
  var UQ = k((q3, TY) => {
    var LF = X2(), CF = xY(), IF = TypeError;
    TY.exports = function(Q) {
      if (LF(Q)) return Q;
      throw new IF(CF(Q) + " is not a function");
    };
  });
  var EY = k(($3, vY) => {
    var NF = UQ(), DF = t4();
    vY.exports = function(Q, q) {
      var $ = Q[q];
      return DF($) ? void 0 : NF($);
    };
  });
  var kY = k((X3, SY) => {
    var VQ = h8(), zQ = X2(), GQ = P1(), AF = TypeError;
    SY.exports = function(Q, q) {
      var $, X;
      if (q === "string" && zQ($ = Q.toString) && !GQ(X = VQ($, Q))) return X;
      if (zQ($ = Q.valueOf) && !GQ(X = VQ($, Q))) return X;
      if (q !== "string" && zQ($ = Q.toString) && !GQ(X = VQ($, Q))) return X;
      throw new AF("Can't convert object to primitive value");
    };
  });
  var yY = k((Y3, gY) => {
    gY.exports = false;
  });
  var c8 = k((J3, hY) => {
    var fY = R0(), OF = Object.defineProperty;
    hY.exports = function(Q, q) {
      try {
        OF(fY, Q, { value: q, configurable: true, writable: true });
      } catch ($) {
        fY[Q] = q;
      }
      return q;
    };
  });
  var p8 = k((K3, uY) => {
    var RF = yY(), xF = R0(), TF = c8(), _Y = "__core-js_shared__", bY = uY.exports = xF[_Y] || TF(_Y, {});
    (bY.versions || (bY.versions = [])).push({ version: "3.49.0", mode: RF ? "pure" : "global", copyright: "\xA9 2013\u20132025 Denis Pushkarev (zloirock.ru), 2025\u20132026 CoreJS Company (core-js.io). All rights reserved.", license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE", source: "https://github.com/zloirock/core-js" });
  });
  var WQ = k((U3, pY) => {
    var cY = p8();
    pY.exports = function(Q, q) {
      return cY[Q] || (cY[Q] = q || {});
    };
  });
  var dY = k((V3, mY) => {
    var vF = e4(), EF = Object;
    mY.exports = function(Q) {
      return EF(vF(Q));
    };
  });
  var y2 = k((z3, lY) => {
    var SF = u0(), kF = dY(), gF = SF({}.hasOwnProperty);
    lY.exports = Object.hasOwn || function(q, $) {
      return gF(kF(q), $);
    };
  });
  var BQ = k((G3, iY) => {
    var yF = u0(), fF = 0, hF = Math.random(), _F = yF(1.1.toString);
    iY.exports = function(Q) {
      return "Symbol(" + (Q === void 0 ? "" : Q) + ")_" + _F(++fF + hF, 36);
    };
  });
  var m8 = k((W3, nY) => {
    var bF = R0(), uF = WQ(), oY = y2(), cF = BQ(), pF = YQ(), mF = JQ(), r1 = bF.Symbol, ZQ = uF("wks"), dF = mF ? r1.for || r1 : r1 && r1.withoutSetter || cF;
    nY.exports = function(Q) {
      if (!oY(ZQ, Q)) ZQ[Q] = pF && oY(r1, Q) ? r1[Q] : dF("Symbol." + Q);
      return ZQ[Q];
    };
  });
  var tY = k((B3, sY) => {
    var lF = h8(), rY = P1(), aY = KQ(), iF = EY(), oF = kY(), nF = m8(), rF = TypeError, aF = nF("toPrimitive");
    sY.exports = function(Q, q) {
      if (!rY(Q) || aY(Q)) return Q;
      var $ = iF(Q, aF), X;
      if ($) {
        if (q === void 0) q = "default";
        if (X = lF($, Q, q), !rY(X) || aY(X)) return X;
        throw new rF("Can't convert object to primitive value");
      }
      if (q === void 0) q = "number";
      return oF(Q, q);
    };
  });
  var FQ = k((Z3, eY) => {
    var sF = tY(), tF = KQ();
    eY.exports = function(Q) {
      var q = sF(Q, "string");
      return tF(q) ? q : q + "";
    };
  });
  var $J = k((F3, qJ) => {
    var eF = R0(), QJ = P1(), jQ = eF.document, Qj = QJ(jQ) && QJ(jQ.createElement);
    qJ.exports = function(Q) {
      return Qj ? jQ.createElement(Q) : {};
    };
  });
  var HQ = k((j3, XJ) => {
    var qj = r2(), $j = g2(), Xj = $J();
    XJ.exports = !qj && !$j(function() {
      return Object.defineProperty(Xj("div"), "a", { get: function() {
        return 7;
      } }).a !== 7;
    });
  });
  var MQ = k((Bj) => {
    var Yj = r2(), Jj = h8(), Kj = rX(), Uj = r4(), Vj = b8(), zj = FQ(), Gj = y2(), Wj = HQ(), YJ = Object.getOwnPropertyDescriptor;
    Bj.f = Yj ? YJ : function(q, $) {
      if (q = Vj(q), $ = zj($), Wj) try {
        return YJ(q, $);
      } catch (X) {
      }
      if (Gj(q, $)) return Uj(!Jj(Kj.f, q, $), q[$]);
    };
  });
  var KJ = k((M3, JJ) => {
    var Fj = r2(), jj = g2();
    JJ.exports = Fj && jj(function() {
      return Object.defineProperty(function() {
      }, "prototype", { value: 42, writable: false }).prototype !== 42;
    });
  });
  var wQ = k((w3, UJ) => {
    var Hj = P1(), Mj = String, wj = TypeError;
    UJ.exports = function(Q) {
      if (Hj(Q)) return Q;
      throw new wj(Mj(Q) + " is not an object");
    };
  });
  var l8 = k((Dj) => {
    var Pj = r2(), Lj = HQ(), Cj = KJ(), d8 = wQ(), VJ = FQ(), Ij = TypeError, PQ = Object.defineProperty, Nj = Object.getOwnPropertyDescriptor, LQ = "enumerable", CQ = "configurable", IQ = "writable";
    Dj.f = Pj ? Cj ? function(q, $, X) {
      if (d8(q), $ = VJ($), d8(X), typeof q === "function" && $ === "prototype" && "value" in X && IQ in X && !X[IQ]) {
        var Y = Nj(q, $);
        if (Y && Y[IQ]) q[$] = X.value, X = { configurable: CQ in X ? X[CQ] : Y[CQ], enumerable: LQ in X ? X[LQ] : Y[LQ], writable: false };
      }
      return PQ(q, $, X);
    } : PQ : function(q, $, X) {
      if (d8(q), $ = VJ($), d8(X), Lj) try {
        return PQ(q, $, X);
      } catch (Y) {
      }
      if ("get" in X || "set" in X) throw new Ij("Accessors not supported");
      if ("value" in X) q[$] = X.value;
      return q;
    };
  });
  var NQ = k((L3, zJ) => {
    var Oj = r2(), Rj = l8(), xj = r4();
    zJ.exports = Oj ? function(Q, q, $) {
      return Rj.f(Q, q, xj(1, $));
    } : function(Q, q, $) {
      return Q[q] = $, Q;
    };
  });
  var BJ = k((C3, WJ) => {
    var DQ = r2(), Tj = y2(), GJ = Function.prototype, vj = DQ && Object.getOwnPropertyDescriptor, AQ = Tj(GJ, "name"), Ej = AQ && function() {
    }.name === "something", Sj = AQ && (!DQ || DQ && vj(GJ, "name").configurable);
    WJ.exports = { EXISTS: AQ, PROPER: Ej, CONFIGURABLE: Sj };
  });
  var FJ = k((I3, ZJ) => {
    var kj = u0(), gj = X2(), OQ = p8(), yj = kj(Function.toString);
    if (!gj(OQ.inspectSource)) OQ.inspectSource = function(Q) {
      return yj(Q);
    };
    ZJ.exports = OQ.inspectSource;
  });
  var MJ = k((N3, HJ) => {
    var fj = R0(), hj = X2(), jJ = fj.WeakMap;
    HJ.exports = hj(jJ) && /native code/.test(String(jJ));
  });
  var LJ = k((D3, PJ) => {
    var _j = WQ(), bj = BQ(), wJ = _j("keys");
    PJ.exports = function(Q) {
      return wJ[Q] || (wJ[Q] = bj(Q));
    };
  });
  var RQ = k((A3, CJ) => {
    CJ.exports = {};
  });
  var AJ = k((O3, DJ) => {
    var uj = MJ(), NJ = R0(), cj = P1(), pj = NQ(), xQ = y2(), TQ = p8(), mj = LJ(), dj = RQ(), IJ = "Object already initialized", vQ = NJ.TypeError, lj = NJ.WeakMap, i8, y6, o8, ij = function(Q) {
      return o8(Q) ? y6(Q) : i8(Q, {});
    }, oj = function(Q) {
      return function(q) {
        var $;
        if (!cj(q) || ($ = y6(q)).type !== Q) throw new vQ("Incompatible receiver, " + Q + " required");
        return $;
      };
    };
    if (uj || TQ.state) Y2 = TQ.state || (TQ.state = new lj()), Y2.get = Y2.get, Y2.has = Y2.has, Y2.set = Y2.set, i8 = function(Q, q) {
      if (Y2.has(Q)) throw new vQ(IJ);
      return q.facade = Q, Y2.set(Q, q), q;
    }, y6 = function(Q) {
      return Y2.get(Q) || {};
    }, o8 = function(Q) {
      return Y2.has(Q);
    };
    else a2 = mj("state"), dj[a2] = true, i8 = function(Q, q) {
      if (xQ(Q, a2)) throw new vQ(IJ);
      return q.facade = Q, pj(Q, a2, q), q;
    }, y6 = function(Q) {
      return xQ(Q, a2) ? Q[a2] : {};
    }, o8 = function(Q) {
      return xQ(Q, a2);
    };
    var Y2, a2;
    DJ.exports = { set: i8, get: y6, has: o8, enforce: ij, getterFor: oj };
  });
  var TJ = k((R3, xJ) => {
    var SQ = u0(), nj = g2(), rj = X2(), n8 = y2(), EQ = r2(), aj = BJ().CONFIGURABLE, sj = FJ(), RJ = AJ(), tj = RJ.enforce, ej = RJ.get, OJ = String, r8 = Object.defineProperty, QH = SQ("".slice), qH = SQ("".replace), $H = SQ([].join), XH = EQ && !nj(function() {
      return r8(function() {
      }, "length", { value: 8 }).length !== 8;
    }), YH = String(String).split("String"), JH = xJ.exports = function(Q, q, $) {
      if (QH(OJ(q), 0, 7) === "Symbol(") q = "[" + qH(OJ(q), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
      if ($ && $.getter) q = "get " + q;
      if ($ && $.setter) q = "set " + q;
      if (!n8(Q, "name") || aj && Q.name !== q) if (EQ) r8(Q, "name", { value: q, configurable: true });
      else Q.name = q;
      if (XH && $ && n8($, "arity") && Q.length !== $.arity) r8(Q, "length", { value: $.arity });
      try {
        if ($ && n8($, "constructor") && $.constructor) {
          if (EQ) r8(Q, "prototype", { writable: false });
        } else if (Q.prototype) Q.prototype = void 0;
      } catch (Y) {
      }
      var X = tj(Q);
      if (!n8(X, "source")) X.source = $H(YH, typeof q == "string" ? q : "");
      return Q;
    };
    Function.prototype.toString = JH(function() {
      return rj(this) && ej(this).source || sj(this);
    }, "toString");
  });
  var EJ = k((x3, vJ) => {
    var KH = X2(), UH = l8(), VH = TJ(), zH = c8();
    vJ.exports = function(Q, q, $, X) {
      if (!X) X = {};
      var Y = X.enumerable, J = X.name !== void 0 ? X.name : q;
      if (KH($)) VH($, J, X);
      if (X.global) if (Y) Q[q] = $;
      else zH(q, $);
      else {
        try {
          if (!X.unsafe) delete Q[q];
          else if (Q[q]) Y = true;
        } catch (K) {
        }
        if (Y) Q[q] = $;
        else UH.f(Q, q, { value: $, enumerable: false, configurable: !X.nonConfigurable, writable: !X.nonWritable });
      }
      return Q;
    };
  });
  var kJ = k((T3, SJ) => {
    var { ceil: GH, floor: WH } = Math;
    SJ.exports = Math.trunc || function(q) {
      var $ = +q;
      return ($ > 0 ? WH : GH)($);
    };
  });
  var kQ = k((v3, gJ) => {
    var BH = kJ();
    gJ.exports = function(Q) {
      var q = +Q;
      return q !== q || q === 0 ? 0 : BH(q);
    };
  });
  var fJ = k((E3, yJ) => {
    var ZH = kQ(), FH = Math.max, jH = Math.min;
    yJ.exports = function(Q, q) {
      var $ = ZH(Q);
      return $ < 0 ? FH($ + q, 0) : jH($, q);
    };
  });
  var _J = k((S3, hJ) => {
    var HH = kQ(), MH = Math.min;
    hJ.exports = function(Q) {
      var q = HH(Q);
      return q > 0 ? MH(q, 9007199254740991) : 0;
    };
  });
  var gQ = k((k3, bJ) => {
    var wH = _J();
    bJ.exports = function(Q) {
      return wH(Q.length);
    };
  });
  var pJ = k((g3, cJ) => {
    var PH = b8(), LH = fJ(), CH = gQ(), uJ = function(Q) {
      return function(q, $, X) {
        var Y = PH(q), J = CH(Y);
        if (J === 0) return !Q && -1;
        var K = LH(X, J), U;
        if (Q && $ !== $) {
          while (J > K) if (U = Y[K++], U !== U) return true;
        } else for (; J > K; K++) if ((Q || K in Y) && Y[K] === $) return Q || K || 0;
        return !Q && -1;
      };
    };
    cJ.exports = { includes: uJ(true), indexOf: uJ(false) };
  });
  var lJ = k((y3, dJ) => {
    var IH = u0(), yQ = y2(), NH = b8(), DH = pJ().indexOf, AH = RQ(), mJ = IH([].push);
    dJ.exports = function(Q, q) {
      var $ = NH(Q), X = 0, Y = [], J;
      for (J in $) !yQ(AH, J) && yQ($, J) && mJ(Y, J);
      while (q.length > X) if (yQ($, J = q[X++])) ~DH(Y, J) || mJ(Y, J);
      return Y;
    };
  });
  var oJ = k((f3, iJ) => {
    iJ.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
  });
  var nJ = k((TH) => {
    var OH = lJ(), RH = oJ(), xH = RH.concat("length", "prototype");
    TH.f = Object.getOwnPropertyNames || function(q) {
      return OH(q, xH);
    };
  });
  var rJ = k((EH) => {
    EH.f = Object.getOwnPropertySymbols;
  });
  var sJ = k((b3, aJ) => {
    var kH = $Q(), gH = u0(), yH = nJ(), fH = rJ(), hH = wQ(), _H = gH([].concat);
    aJ.exports = kH("Reflect", "ownKeys") || function(q) {
      var $ = yH.f(hH(q)), X = fH.f;
      return X ? _H($, X(q)) : $;
    };
  });
  var QK = k((u3, eJ) => {
    var tJ = y2(), bH = sJ(), uH = MQ(), cH = l8();
    eJ.exports = function(Q, q, $) {
      var X = bH(q), Y = cH.f, J = uH.f;
      for (var K = 0; K < X.length; K++) {
        var U = X[K];
        if (!tJ(Q, U) && !($ && tJ($, U))) Y(Q, U, J(q, U));
      }
    };
  });
  var $K = k((c3, qK) => {
    var pH = g2(), mH = X2(), dH = /#|\.prototype\./, f6 = function(Q, q) {
      var $ = iH[lH(Q)];
      return $ === nH ? true : $ === oH ? false : mH(q) ? pH(q) : !!q;
    }, lH = f6.normalize = function(Q) {
      return String(Q).replace(dH, ".").toLowerCase();
    }, iH = f6.data = {}, oH = f6.NATIVE = "N", nH = f6.POLYFILL = "P";
    qK.exports = f6;
  });
  var L1 = k((p3, XK) => {
    var a8 = R0(), rH = MQ().f, aH = NQ(), sH = EJ(), tH = c8(), eH = QK(), QM = $K();
    XK.exports = function(Q, q) {
      var { target: $, global: X, stat: Y } = Q, J, K, U, G, V, z;
      if (X) K = a8;
      else if (Y) K = a8[$] || tH($, {});
      else K = a8[$] && a8[$].prototype;
      if (K) for (U in q) {
        if (V = q[U], Q.dontCallGetSet) z = rH(K, U), G = z && z.value;
        else G = K[U];
        if (J = QM(X ? U : $ + (Y ? "." : "#") + U, Q.forced), !J && G !== void 0) {
          if (typeof V == typeof G) continue;
          eH(V, G);
        }
        if (Q.sham || G && G.sham) aH(V, "sham", true);
        sH(K, U, V, Q);
      }
    };
  });
  var JK = k((m3, YK) => {
    var qM = gQ();
    YK.exports = function(Q, q, $) {
      var X = 0, Y = arguments.length > 2 ? $ : qM(q), J = new Q(Y);
      while (Y > X) J[X] = q[X++];
      return J;
    };
  });
  var fQ = k((d3, KK) => {
    var $M = P1(), XM = String, YM = TypeError;
    KK.exports = function(Q) {
      if (Q === void 0 || $M(Q)) return Q;
      throw new YM(XM(Q) + " is not an object or undefined");
    };
  });
  var s8 = k((l3, UK) => {
    var JM = TypeError;
    UK.exports = function(Q) {
      if (typeof Q == "string") return Q;
      throw new JM("Argument is not a string");
    };
  });
  var hQ = k((i3, BK) => {
    var WK = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", VK = WK + "+/", zK = WK + "-_", GK = function(Q) {
      var q = {}, $ = 0;
      for (; $ < 64; $++) q[Q.charAt($)] = $;
      return q;
    };
    BK.exports = { i2c: VK, c2i: GK(VK), i2cUrl: zK, c2iUrl: GK(zK) };
  });
  var _Q = k((o3, ZK) => {
    var KM = TypeError;
    ZK.exports = function(Q) {
      var q = Q && Q.alphabet;
      if (q === void 0 || q === "base64" || q === "base64url") return q || "base64";
      throw new KM("Incorrect `alphabet` option");
    };
  });
  var jK = k((n3, FK) => {
    FK.exports = typeof ArrayBuffer < "u" && typeof DataView < "u";
  });
  var MK = k((r3, HK) => {
    var UM = u0(), VM = UQ();
    HK.exports = function(Q, q, $) {
      try {
        return UM(VM(Object.getOwnPropertyDescriptor(Q, q)[$]));
      } catch (X) {
      }
    };
  });
  var CK = k((a3, LK) => {
    var PK = R0(), zM = MK(), GM = _8(), wK = PK.ArrayBuffer, WM = PK.TypeError;
    LK.exports = wK && zM(wK.prototype, "byteLength", "get") || function(Q) {
      if (GM(Q) !== "ArrayBuffer") throw new WM("ArrayBuffer expected");
      return Q.byteLength;
    };
  });
  var NK = k((s3, IK) => {
    var BM = R0(), ZM = jK(), FM = CK(), jM = BM.DataView;
    IK.exports = function(Q) {
      if (!ZM || FM(Q) !== 0) return false;
      try {
        return new jM(Q), false;
      } catch (q) {
        return true;
      }
    };
  });
  var h6 = k((t3, DK) => {
    var HM = NK(), MM = TypeError;
    DK.exports = function(Q) {
      if (HM(Q)) throw new MM("ArrayBuffer is detached");
      return Q;
    };
  });
  var pQ = k((e3, RK) => {
    var AK = R0(), wM = u0(), PM = fQ(), LM = s8(), CM = y2(), OK = hQ(), IM = _Q(), NM = h6(), DM = OK.c2i, AM = OK.c2iUrl, s2 = AK.SyntaxError, OM = AK.TypeError, C1 = wM("".charAt), bQ = function(Q, q) {
      var $ = Q.length;
      for (; q < $; q++) {
        var X = C1(Q, q);
        if (X !== " " && X !== "	" && X !== `
` && X !== "\f" && X !== "\r") break;
      }
      return q;
    }, uQ = function(Q, q, $) {
      var X = Q.length;
      if (X < 4) Q += X === 2 ? "AA" : "A";
      var Y = (q[C1(Q, 0)] << 18) + (q[C1(Q, 1)] << 12) + (q[C1(Q, 2)] << 6) + q[C1(Q, 3)], J = [Y >> 16 & 255, Y >> 8 & 255, Y & 255];
      if (X === 2) {
        if ($ && J[1] !== 0) throw new s2("Extra bits");
        return [J[0]];
      }
      if (X === 3) {
        if ($ && J[2] !== 0) throw new s2("Extra bits");
        return [J[0], J[1]];
      }
      return J;
    }, cQ = function(Q, q, $) {
      var X = q.length;
      for (var Y = 0; Y < X; Y++) Q[$ + Y] = q[Y];
      return $ + X;
    };
    RK.exports = function(Q, q, $, X) {
      LM(Q), PM(q);
      var Y = IM(q) === "base64" ? DM : AM, J = q ? q.lastChunkHandling : void 0;
      if (J === void 0) J = "loose";
      if (J !== "loose" && J !== "strict" && J !== "stop-before-partial") throw new OM("Incorrect `lastChunkHandling` option");
      if ($) NM($.buffer);
      var K = Q.length, U = $ || [], G = 0, V = 0, z = "", H = 0;
      if (X) while (true) {
        if (H = bQ(Q, H), H === K) {
          if (z.length > 0) {
            if (J === "stop-before-partial") break;
            if (J === "loose") {
              if (z.length === 1) throw new s2("Malformed padding: exactly one additional character");
              G = cQ(U, uQ(z, Y, false), G);
            } else throw new s2("Missing padding");
          }
          V = K;
          break;
        }
        var j = C1(Q, H);
        if (++H, j === "=") {
          if (z.length < 2) throw new s2("Padding is too early");
          if (H = bQ(Q, H), z.length === 2) {
            if (H === K) {
              if (J === "stop-before-partial") break;
              throw new s2("Malformed padding: only one =");
            }
            if (C1(Q, H) === "=") ++H, H = bQ(Q, H);
          }
          if (H < K) throw new s2("Unexpected character after padding");
          G = cQ(U, uQ(z, Y, J === "strict"), G), V = K;
          break;
        }
        if (!CM(Y, j)) throw new s2("Unexpected character");
        var Z = X - G;
        if (Z === 1 && z.length === 2 || Z === 2 && z.length === 3) break;
        if (z += j, z.length === 4) {
          if (G = cQ(U, uQ(z, Y, false), G), z = "", V = H, G === X) break;
        }
      }
      return { bytes: U, read: V, written: G };
    };
  });
  var xK = k(() => {
    var RM = L1(), xM = R0(), TM = JK(), vM = pQ(), a1 = xM.Uint8Array, EM = !a1 || !a1.fromBase64 || !(function() {
      try {
        a1.fromBase64("a");
        return;
      } catch (Q) {
      }
      try {
        a1.fromBase64("", null);
      } catch (Q) {
        return true;
      }
    })();
    if (a1) RM({ target: "Uint8Array", stat: true, forced: EM }, { fromBase64: function(q) {
      var $ = vM(q, arguments.length > 1 ? arguments[1] : void 0, null, 9007199254740991);
      return TM(a1, $.bytes);
    } });
  });
  var TK = k(() => {
    xK();
  });
  var mQ = k((YC, SK) => {
    var EK = R0(), SM = u0(), kM = EK.Uint8Array, vK = EK.SyntaxError, gM = Math.min, yM = SM("".match);
    SK.exports = function(Q, q) {
      var $ = Q.length;
      if ($ % 2 !== 0) throw new vK("String should be an even number of characters");
      var X = q ? gM(q.length, $ / 2) : $ / 2, Y = q || new kM(X), J = yM(Q, /.{2}/g), K = 0;
      for (; K < X; K++) {
        var U = +("0x" + J[K] + "0");
        if (U !== U) throw new vK("String should only contain hex characters");
        Y[K] = U >> 4;
      }
      return { bytes: Y, read: K << 1 };
    };
  });
  var kK = k(() => {
    var fM = L1(), hM = R0(), _M = s8(), bM = mQ();
    if (hM.Uint8Array) fM({ target: "Uint8Array", stat: true }, { fromHex: function(q) {
      return bM(_M(q)).bytes;
    } });
  });
  var gK = k(() => {
    kK();
  });
  var hK = k((zC, fK) => {
    var uM = m8(), cM = uM("toStringTag"), yK = {};
    yK[cM] = "z";
    fK.exports = String(yK) === "[object z]";
  });
  var bK = k((GC, _K) => {
    var pM = hK(), mM = X2(), t8 = _8(), dM = m8(), lM = dM("toStringTag"), iM = Object, oM = t8(/* @__PURE__ */ (function() {
      return arguments;
    })()) === "Arguments", nM = function(Q, q) {
      try {
        return Q[q];
      } catch ($) {
      }
    };
    _K.exports = pM ? t8 : function(Q) {
      var q, $, X;
      return Q === void 0 ? "Undefined" : Q === null ? "Null" : typeof ($ = nM(q = iM(Q), lM)) == "string" ? $ : oM ? t8(q) : (X = t8(q)) === "Object" && mM(q.callee) ? "Arguments" : X;
    };
  });
  var _6 = k((WC, uK) => {
    var rM = bK(), aM = TypeError;
    uK.exports = function(Q) {
      if (rM(Q) === "Uint8Array") return Q;
      throw new aM("Argument is not an Uint8Array");
    };
  });
  var cK = k(() => {
    var sM = L1(), tM = R0(), eM = pQ(), Qw = _6(), e8 = tM.Uint8Array, qw = !e8 || !e8.prototype.setFromBase64 || !(function() {
      var Q = new e8([255, 255, 255, 255, 255]);
      try {
        Q.setFromBase64("", null);
        return;
      } catch (q) {
      }
      try {
        Q.setFromBase64("a");
        return;
      } catch (q) {
      }
      try {
        Q.setFromBase64("MjYyZg===");
      } catch (q) {
        return Q[0] === 50 && Q[1] === 54 && Q[2] === 50 && Q[3] === 255 && Q[4] === 255;
      }
    })();
    if (e8) sM({ target: "Uint8Array", proto: true, forced: qw }, { setFromBase64: function(q) {
      Qw(this);
      var $ = eM(q, arguments.length > 1 ? arguments[1] : void 0, this, this.length);
      return { read: $.read, written: $.written };
    } });
  });
  var pK = k(() => {
    cK();
  });
  var mK = k(() => {
    var $w = L1(), Xw = R0(), Yw = s8(), Jw = _6(), Kw = h6(), Uw = mQ();
    function Vw() {
      try {
        var Q = new ArrayBuffer(16, { maxByteLength: 1024 });
        new Uint8Array(Q).setFromHex("cafed00d");
      } catch (q) {
        return true;
      }
    }
    if (Xw.Uint8Array) $w({ target: "Uint8Array", proto: true, forced: Vw() }, { setFromHex: function(q) {
      Jw(this), Yw(q), Kw(this.buffer);
      var $ = Uw(q, this).read;
      return { read: $, written: $ / 2 };
    } });
  });
  var dK = k(() => {
    mK();
  });
  var iK = k(() => {
    var zw = L1(), Gw = R0(), Ww = u0(), Bw = fQ(), Zw = _6(), Fw = h6(), lK = hQ(), jw = _Q(), Hw = lK.i2c, Mw = lK.i2cUrl, ww = Ww("".charAt), Q5 = Gw.Uint8Array, Pw = !Q5 || !Q5.prototype.toBase64 || !(function() {
      try {
        var Q = new Q5();
        Q.toBase64(null);
      } catch (q) {
        return true;
      }
    })();
    if (Q5) zw({ target: "Uint8Array", proto: true, forced: Pw }, { toBase64: function() {
      var q = Zw(this), $ = arguments.length ? Bw(arguments[0]) : void 0, X = jw($) === "base64" ? Hw : Mw, Y = !!$ && !!$.omitPadding;
      Fw(this.buffer);
      var J = "", K = 0, U = q.length, G, V = function(z) {
        return ww(X, G >> 6 * z & 63);
      };
      for (; K + 2 < U; K += 3) G = (q[K] << 16) + (q[K + 1] << 8) + q[K + 2], J += V(3) + V(2) + V(1) + V(0);
      if (K + 2 === U) G = (q[K] << 16) + (q[K + 1] << 8), J += V(3) + V(2) + V(1) + (Y ? "" : "=");
      else if (K + 1 === U) G = q[K] << 16, J += V(3) + V(2) + (Y ? "" : "==");
      return J;
    } });
  });
  var oK = k(() => {
    iK();
  });
  var rK = k(() => {
    var Lw = L1(), Cw = R0(), nK = u0(), Iw = _6(), Nw = h6(), Dw = nK(1.1.toString), Aw = nK([].join), Ow = Array, q5 = Cw.Uint8Array, Rw = !q5 || !q5.prototype.toHex || !(function() {
      try {
        var Q = new q5([255, 255, 255, 255, 255, 255, 255, 255]);
        return Q.toHex() === "ffffffffffffffff";
      } catch (q) {
        return false;
      }
    })();
    if (q5) Lw({ target: "Uint8Array", proto: true, forced: Rw }, { toHex: function() {
      Iw(this), Nw(this.buffer);
      var q = Ow(this.length);
      for (var $ = 0, X = this.length; $ < X; $++) {
        var Y = Dw(this[$], 16);
        q[$] = Y.length === 1 ? "0" + Y : Y;
      }
      return Aw(q, "");
    } });
  });
  var aK = k(() => {
    rK();
  });
  var sK = k(() => {
    TK();
    gK();
    pK();
    dK();
    oK();
    aK();
  });
  var XU = V5(PX(), 1);
  var RZ = /^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(\.\d+)?([zZ]|((\+|-)(\d{2}):(\d{2})))$/;
  function xZ(Q) {
    let q = RZ.exec(Q);
    if (!q) return false;
    let [, $, X, Y, J, K, U] = q.map((G) => parseInt(G));
    return $ !== void 0 && X !== void 0 && Y !== void 0 && J !== void 0 && K !== void 0 && U !== void 0 && 0 < X && X <= 12 && Y <= TZ($, X) && J < 24 && K < 60 && U <= 60;
  }
  function TZ(Q, q) {
    if (q === 2) return vZ(Q) ? 29 : 28;
    return EZ[q - 1] ?? 0;
  }
  function vZ(Q) {
    return Q % 4 === 0 && (Q % 100 !== 0 || Q % 400 === 0);
  }
  var EZ = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function S8(Q) {
    return typeof Q === "object" && Q !== null && !Array.isArray(Q);
  }
  var SZ = { int8: [-128, 128], int16: [-32768, 32768], int32: [-2147483648, 2147483648], uint8: [0, 256], uint16: [0, 65536], uint32: [0, 4294967296] };
  function v6(Q = 0.5) {
    return Math.random() < Q;
  }
  function CX(Q, q) {
    return Q + Math.floor(Math.random() * (q - Q));
  }
  function k8(Q) {
    let q = Q[CX(0, Q.length)];
    if (q === void 0) throw Error("choices was empty in random choice");
    else return q;
  }
  var v8;
  function m4() {
    if (v8 === void 0) {
      let Q = Math.sqrt(-2 * Math.log(Math.random())), q = 2 * Math.PI * Math.random();
      return v8 = Q * Math.sin(q), Q * Math.cos(q);
    } else {
      let Q = v8;
      return v8 = void 0, Q;
    }
  }
  function V2(Q = 1) {
    let q = Math.exp(-Q), $ = 0, X = Math.random();
    while (X > q) $++, X *= Math.random();
    return $;
  }
  var LX = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ;,'"`;
  function i1(Q) {
    return Array(Q).fill(null).map(() => LX.charAt(Math.floor(Math.random() * LX.length))).join("");
  }
  function* IX(...Q) {
    for (let q of Q) yield* q;
  }
  function* E8(Q, q) {
    let $ = 0;
    for (let X of Q) yield q(X, $++);
  }
  function* kZ(Q, q) {
    let $ = 0;
    for (let X of Q) if (q(X, $++)) yield X;
  }
  function* gZ(Q) {
    for (let q = 0; q < Q; ++q) yield q;
  }
  function l1(Q) {
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(Q) ? `.${Q}` : `["${Q}"]`;
  }
  function $2(Q) {
    return Q === null ? "null" : Array.isArray(Q) ? "array" : typeof Q;
  }
  var S0 = class {
    guard(Q) {
      for (let q of this.pathErrors(Q)) return false;
      return true;
    }
    guardAssert(Q) {
      let q = [];
      for (let [$, X] of this.pathErrors(Q)) {
        let Y = $.reverse().join("") || ".";
        q.push(`${Y}: ${X}`);
      }
      if (q.length) {
        let $ = JSON.stringify(Q, null, 2), X = JSON.stringify(this.schema(), null, 2);
        throw Error(`Validation errors:
${q.join(`
`)}

While trying to validate:
${$}

Against schema:
${X}`);
      } else return true;
    }
  };
  var NX = class extends S0 {
    #Q;
    definitions;
    nullable = true;
    constructor(Q) {
      super();
      this.#Q = Q, this.definitions = Q.definitions;
    }
    *pathErrors(Q) {
      if (Q !== null) for (let [q, $] of this.#Q.pathErrors(Q)) yield [q, `${$} or ${$2(Q)} is not null`];
    }
    fuzz() {
      return v6(0.1) ? null : this.#Q.fuzz();
    }
    schema() {
      return { ...this.#Q.schema(), nullable: true };
    }
  };
  function E6(Q) {
    return new NX(Q);
  }
  var DX = class extends S0 {
    *pathErrors(Q) {
      if (Q === void 0) yield [[], "value is undefined"];
    }
    fuzz() {
      return k8([() => null, v6, m4, () => i1(V2()), () => Array(V2()).fill(null).map(() => this.fuzz()), () => Object.fromEntries(Array(V2()).fill(null).map(() => [i1(V2(3)), this.fuzz()]))])();
    }
    schema() {
      return {};
    }
  };
  function AX() {
    return new DX();
  }
  var OX = class extends S0 {
    *pathErrors(Q) {
      if (typeof Q !== "boolean") yield [[], `${$2(Q)} is not a boolean`];
    }
    fuzz() {
      return v6();
    }
    schema() {
      return { type: "boolean" };
    }
  };
  function w1() {
    return new OX();
  }
  var g8 = class extends S0 {
    #Q;
    #q;
    #$;
    constructor(Q) {
      super();
      this.#Q = Q, [this.#q, this.#$] = SZ[Q];
    }
    *pathErrors(Q) {
      if (typeof Q !== "number") yield [[], `${$2(Q)} is not a number`];
      else if (Q % 1 !== 0) yield [[], `${Q.toPrecision()} is not an integer`];
      else if (Q < this.#q) yield [[], `${Q.toFixed()} is less than ${this.#q.toFixed()}`];
      else if (Q >= this.#$) yield [[], `${Q.toFixed()} is greater than ${(this.#$ - 1).toFixed()}`];
    }
    fuzz() {
      return CX(this.#q, this.#$);
    }
    schema() {
      return { type: this.#Q };
    }
  };
  function y8() {
    return new g8("uint8");
  }
  function z2() {
    return new g8("int32");
  }
  function o1() {
    return new g8("uint32");
  }
  var RX = class extends S0 {
    #Q;
    constructor(Q) {
      super();
      this.#Q = Q;
    }
    *pathErrors(Q) {
      if (typeof Q !== "number") yield [[], `${$2(Q)} is not number, expected a float`];
    }
    fuzz() {
      return m4();
    }
    schema() {
      return { type: this.#Q };
    }
  };
  function O0() {
    return new RX("float64");
  }
  var xX = class extends S0 {
    *pathErrors(Q) {
      if (typeof Q !== "string") yield [[], `${$2(Q)} is not a string`];
    }
    fuzz() {
      return i1(V2(3));
    }
    schema() {
      return { type: "string" };
    }
  };
  function F0() {
    return new xX();
  }
  var TX = class extends S0 {
    *pathErrors(Q) {
      if (typeof Q !== "string") yield [[], `${$2(Q)} is not a string`];
      else if (!xZ(Q)) yield [[], `${Q} is not a valid timestamp`];
    }
    fuzz() {
      return new Date(Math.random() * 31536e8).toISOString();
    }
    schema() {
      return { type: "timestamp" };
    }
  };
  function vX() {
    return new TX();
  }
  var EX = class extends S0 {
    #Q;
    #q;
    constructor(Q, q) {
      super();
      this.#Q = Q, this.#q = q;
    }
    *pathErrors(Q) {
      if (typeof Q !== "string") yield [[], `${$2(Q)} is not a string`];
      else if (!this.#q.has(Q)) yield [[], `${Q} is not one of ${this.#Q.join(", ")}`];
    }
    fuzz() {
      return k8(this.#Q);
    }
    schema() {
      return { enum: [...this.#Q] };
    }
  };
  function C2(...Q) {
    let q = new Set(Q);
    if (q.size !== Q.length) throw Error("enum can't contain duplicates");
    else return new EX(Q, q);
  }
  var SX = class extends S0 {
    #Q;
    constructor(Q) {
      super();
      this.#Q = Q;
    }
    *pathErrors(Q) {
      if (!Array.isArray(Q)) yield [[], `${$2(Q)} is not an array`];
      else for (let [q, $] of Q.entries()) for (let [X, Y] of this.#Q.pathErrors($)) X.push(`[${q.toFixed()}]`), yield [X, Y];
    }
    fuzz() {
      return Array(V2()).fill(null).map(() => this.#Q.fuzz());
    }
    schema() {
      return { elements: this.#Q.schema() };
    }
  };
  function h0(Q) {
    if (Q.definitions) throw Error("definitions can only exist on a root schema");
    else return new SX(Q);
  }
  var kX = class extends S0 {
    #Q;
    constructor(Q) {
      super();
      this.#Q = Q;
    }
    *pathErrors(Q) {
      if (!S8(Q)) yield [[], `${$2(Q)} is not a record`];
      else for (let [q, $] of Object.entries(Q)) for (let [X, Y] of this.#Q.pathErrors($)) X.push(l1(q)), yield [X, Y];
    }
    fuzz() {
      return Object.fromEntries(Array(V2()).fill(null).map(() => [i1(V2(3)), this.#Q.fuzz()]));
    }
    schema() {
      return { values: this.#Q.schema() };
    }
  };
  function S6(Q) {
    if (Q.definitions) throw Error("definitions can only exist on a root schema");
    else return new kX(Q);
  }
  var gX = class extends S0 {
    #Q;
    #q;
    #$;
    keys;
    constructor(Q, q, $, X) {
      super();
      this.#Q = Q, this.#q = q, this.#$ = $, this.keys = X;
    }
    *pathErrors(Q) {
      if (!S8(Q)) yield [[], `${$2(Q)} is not a record`];
      else {
        if (this.#Q) for (let [q, $] of this.#Q) {
          let X = Q[q];
          if (X === void 0) yield [[], `required key '${q}' is missing`];
          else for (let [Y, J] of $.pathErrors(X)) Y.push(l1(q)), yield [Y, J];
        }
        if (this.#q) {
          for (let [q, $] of this.#q) if (Q[q] !== void 0) for (let [X, Y] of $.pathErrors(Q[q])) X.push(l1(q)), yield [X, Y];
        }
        if (!this.#$) {
          for (let q of Object.keys(Q)) if (!this.keys.has(q)) yield [[l1(q)], `'${q}' is not a valid property and additional properties are not allowed`];
        }
      }
    }
    fuzz() {
      let Q = E8(this.#Q ?? [], ([X, Y]) => [X, Y.fuzz()]), q = E8(kZ(this.#q ?? [], () => v6()), ([X, Y]) => [X, Y.fuzz()]), $ = this.#$ ? E8(gZ(V2()), () => [i1(V2(3)), k8([() => null, v6, m4, () => i1(V2()), () => [], () => ({})])()]) : [];
      return Object.fromEntries(IX(Q, q, $));
    }
    schema() {
      let Q = {};
      if (this.#Q) Q.properties = Object.fromEntries(this.#Q.map(([q, $]) => [q, $.schema()]));
      if (this.#q) Q.optionalProperties = Object.fromEntries(this.#q.map(([q, $]) => [q, $.schema()]));
      if (this.#$) Q.additionalProperties = true;
      return Q;
    }
  };
  function fZ(Q, q, $) {
    let X = new Set(E8(IX(Q ?? [], q ?? []), ([Y]) => Y));
    if (Q?.some(([, Y]) => Y.definitions)) throw Error("definitions can only exist on a root schema");
    else if (q?.some(([, Y]) => Y.definitions)) throw Error("definitions can only exist on a root schema");
    else if (X.size !== (Q?.length ?? 0) + (q?.length ?? 0)) throw Error("properties and optionalProperties keys must be unique");
    else return new gX(Q, q, $ ?? false, X);
  }
  function C0(Q, q, $) {
    return fZ(Q ? Object.entries(Q) : void 0, q ? Object.entries(q) : void 0, $);
  }
  var bZ = new Uint8Array(16);
  function d4() {
    return crypto.getRandomValues(bZ);
  }
  var k0 = [];
  for (let Q = 0; Q < 256; ++Q) k0.push((Q + 256).toString(16).slice(1));
  function _X(Q, q = 0) {
    return (k0[Q[q + 0]] + k0[Q[q + 1]] + k0[Q[q + 2]] + k0[Q[q + 3]] + "-" + k0[Q[q + 4]] + k0[Q[q + 5]] + "-" + k0[Q[q + 6]] + k0[Q[q + 7]] + "-" + k0[Q[q + 8]] + k0[Q[q + 9]] + "-" + k0[Q[q + 10]] + k0[Q[q + 11]] + k0[Q[q + 12]] + k0[Q[q + 13]] + k0[Q[q + 14]] + k0[Q[q + 15]]).toLowerCase();
  }
  function uZ(Q, q, $) {
    if (!q && !Q && crypto.randomUUID) return crypto.randomUUID();
    return cZ(Q, q, $);
  }
  function cZ(Q, q, $) {
    Q = Q || {};
    let X = Q.random ?? Q.rng?.() ?? d4();
    if (X.length < 16) throw Error("Random bytes length must be >= 16");
    if (X[6] = X[6] & 15 | 64, X[8] = X[8] & 63 | 128, q) {
      if ($ = $ || 0, $ < 0 || $ + 16 > q.length) throw RangeError(`UUID byte range ${$}:${$ + 15} is out of buffer bounds`);
      for (let Y = 0; Y < 16; ++Y) q[$ + Y] = X[Y];
      return q;
    }
    return _X(X);
  }
  var n1 = uZ;
  var I2 = class extends Error {
    field;
    regex;
    constructor(Q, q, $) {
      super($);
      this.field = Q, this.regex = q;
    }
  };
  var k6 = class extends Error {
    hash;
    constructor(Q) {
      super(`'${Q}' not found in the root hash`);
      this.hash = Q;
    }
  };
  var l4 = class extends Map {
    #Q;
    #q = 0;
    constructor(Q, q = []) {
      super();
      this.#Q = Q;
      for (let [$, X] of q) this.set($, X);
    }
    get(Q) {
      let q = super.get(Q);
      if (q !== void 0) super.delete(Q), super.set(Q, q);
      return q;
    }
    set(Q, q) {
      let $ = super.get(Q);
      if ($ === void 0) this.#q += Q.length;
      else if ($ !== null) this.#q -= $.length;
      if (q !== null) this.#q += q.length;
      super.delete(Q);
      let X;
      while (this.#q > this.#Q && (X = this.entries().next().value)) {
        let [Y, J] = X;
        if (super.delete(Y), this.#q -= Y.length, J !== null) this.#q -= J.length;
      }
      return super.set(Q, q), this;
    }
    delete(Q) {
      let q = super.get(Q);
      if (q === void 0) return false;
      if (super.delete(Q), q !== null) this.#q -= q.length;
      return this.#q -= Q.length, true;
    }
    clear() {
      super.clear(), this.#q = 0;
    }
  };
  var eK = V5(uX(), 1);
  function cX(Q) {
    let q = Q.reduce((Y, J) => Y + J.length, 0), $ = new Uint8Array(q), X = 0;
    for (let Y of Q) $.set(Y, X), X += Y.length;
    return $;
  }
  var kC = V5(sK(), 1);
  var $5 = /^[0-9a-f]{64}$/;
  var QU = C0({ name: F0(), timestamp: O0() }, void 0, true);
  var xw = C0({ name: F0(), pageId: F0(), timestamp: O0() }, void 0, true);
  var Tw = C0(void 0, { authors: h0(F0()), title: F0(), publicationDate: F0(), publisher: F0() }, true);
  var vw = C0({ id: F0(), idx: C0({ timestamp: F0(), value: F0() }, void 0, true) }, { template: C0({ timestamp: F0(), value: F0() }, void 0, true), redir: C0({ timestamp: F0(), value: z2() }, void 0, true), scrollTime: C0({ timestamp: F0(), value: vX() }, void 0, true), verticalScroll: C0({ timestamp: F0(), value: O0() }, void 0, true), deleted: C0({ timestamp: F0(), value: z2() }, void 0, true) }, true);
  var Ew = C0({ lastOpened: C0({ timestamp: F0(), value: F0() }, void 0, true), original: C0({ timestamp: F0(), value: z2() }, void 0, true), pages: h0(vw), uuids: E6(h0(C0({ first: F0(), second: o1() }, void 0, true))) }, void 0, true);
  var Sw = C0(void 0, { tags: h0(QU) });
  var kw = C0(void 0, { tags: h0(F0()) });
  var qU = { coverPageNumber: z2(), documentMetadata: Tw, extraMetadata: S6(F0()), fileType: C2("epub", "notebook", "pdf"), fontName: F0(), lineHeight: z2(), orientation: C2("portrait", "landscape"), pageCount: o1(), textAlignment: C2("", "justify", "left"), textScale: O0() };
  var $U = { cPages: Ew, customZoomCenterX: O0(), customZoomCenterY: O0(), customZoomOrientation: C2("portrait", "landscape"), customZoomPageHeight: O0(), customZoomPageWidth: O0(), customZoomScale: O0(), dummyDocument: w1(), formatVersion: y8(), keyboardMetadata: C0({ count: o1(), timestamp: O0() }, void 0, true), lastOpenedPage: z2(), margins: o1(), originalPageCount: z2(), pages: E6(h0(F0())), pageTags: h0(xw), redirectionPageMap: h0(z2()), sizeInBytes: F0(), transform: C0(void 0, { m11: O0(), m12: O0(), m13: O0(), m21: O0(), m22: O0(), m23: O0(), m31: O0(), m32: O0(), m33: O0() }, true), viewBackgroundFilter: C2("off", "fullpage"), zoomMode: C2("bestFit", "customFit", "fitToHeight", "fitToWidth") };
  var gw = C0(qU, { ...$U, tags: h0(QU) }, true);
  var yw = C0(qU, { ...$U, tags: h0(F0()) }, true);
  var fw = C0({ name: F0(), author: F0(), iconData: F0(), categories: h0(F0()), labels: h0(F0()), orientation: C2("portrait", "landscape"), templateVersion: F0(), supportedScreens: h0(C2("rm2", "rmPP")), constants: h0(S6(z2())), items: h0(AX()) }, { formatVersion: y8() });
  var hw = C0({ lastModified: F0(), parent: F0(), pinned: w1(), type: C2("DocumentType", "CollectionType", "TemplateType"), visibleName: F0() }, { lastOpened: F0(), lastOpenedPage: z2(), createdTime: F0(), deleted: w1(), metadatamodified: w1(), modified: w1(), synced: w1(), version: o1() }, true);
  var _w = C0({ hash: F0(), generation: O0() }, void 0, true);
  var bw = C0({ hash: F0(), generation: O0(), schemaVersion: y8() }, void 0, true);
  var uw = C0({ docID: F0(), hash: F0() }, void 0, true);
  async function dQ(Q) {
    let q = await crypto.subtle.digest("SHA-256", Q);
    return new Uint8Array(q).toHex();
  }
  function tK(Q) {
    let [q, $, X, Y, J] = Q.split(":");
    if (q === void 0 || $ === void 0 || X === void 0 || Y === void 0 || J === void 0) throw Error(`line '${Q}' was not formatted correctly`);
    else if ($ === "80000000" || $ === "0") return { hash: q, type: $ === "0" ? 0 : 8e7, id: X, subfiles: parseInt(Y, 10), size: parseInt(J, 10) };
    else throw Error(`line '${Q}' was not formatted correctly`);
  }
  var lQ = class {
    #Q;
    #q;
    #$;
    #X;
    constructor(Q, q, $, X) {
      this.#Q = Q, this.#X = q, this.#q = $, this.#$ = X;
    }
    async getRootHash() {
      let q = await (await this.#Q("GET", `${this.#q}/sync/v4/root`)).text(), $ = JSON.parse(q);
      if (!bw.guardAssert($)) throw Error("invalid root hash");
      let { hash: X, generation: Y, schemaVersion: J } = $;
      if (J !== 3 && J !== 4) throw Error(`schema version ${J} not supported`);
      else if (!Number.isSafeInteger(Y)) throw Error(`generation ${Y} was not a safe integer; please file a bug report`);
      else return [X, Y, J];
    }
    async #Y(Q, q) {
      if (!$5.test(q)) throw new I2(q, $5, "hash was not a valid hash");
      let X = await (await this.#Q("GET", `${this.#q}/sync/v3/files/${q}`, { headers: { "rm-filename": Q } })).arrayBuffer();
      return new Uint8Array(X);
    }
    async getHash(Q, q) {
      let $ = this.#X.get(q);
      if ($ != null) return new TextEncoder().encode($);
      else {
        let X = await this.#Y(Q, q);
        if (this.#X.get(q) === void 0) this.#X.set(q, null);
        return X;
      }
    }
    async getText(Q, q) {
      let $ = this.#X.get(q);
      if ($ != null) return $;
      else {
        let X = await this.#Y(Q, q), J = new TextDecoder().decode(X);
        return this.#X.set(q, J), J;
      }
    }
    async getEntries(Q, q) {
      let $ = await this.getText(Q, q), [X, ...Y] = $.slice(0, -1).split(`
`);
      if (X === "3") return { entries: Y.map(tK) };
      else if (X === "4") {
        let [J, ...K] = Y;
        if (!J) throw Error("missing info line for schema version 4");
        let [U, G, V, z] = J.split(":");
        if (U !== "0" || G === void 0 || V === void 0 || z === void 0) throw Error(`schema 4 info line '${J}' was not formatted correctly`);
        let H = K.map(tK);
        if (parseInt(V, 10) !== H.length) throw Error(`schema 4 expected ${V} entries, but found ${H.length}`);
        else return { entries: H, id: G, size: parseInt(z, 10) };
      } else throw Error(`schema version ${X} not supported`);
    }
    async getContent(Q, q) {
      let $ = await this.getText(Q, q), X = JSON.parse($), Y = [];
      for (let [K, U] of [["collection", Sw], ["legacy collection", kw], ["template", fw], ["document", gw], ["legacy document", yw]]) try {
        if (U.guardAssert(X)) return X;
      } catch (G) {
        let V = G instanceof Error ? G.message : "unknown error type";
        Y.push(`Couldn't validate as ${K} because:
${V}`);
      }
      let J = Y.join(`

or

`);
      throw Error(`invalid content: ${J}`);
    }
    async getMetadata(Q, q) {
      let $ = await this.getText(Q, q), X = JSON.parse($);
      if (!hw.guardAssert(X)) throw Error("invalid metadata");
      return X;
    }
    async putRootHash(Q, q, $ = true) {
      if (!Number.isSafeInteger(q)) throw Error(`generation ${q} was not a safe integer`);
      else if (!$5.test(Q)) throw new I2(Q, $5, "rootHash was not a valid hash");
      let X = JSON.stringify({ hash: Q, generation: q, broadcast: $ }), J = await (await this.#Q("PUT", `${this.#q}/sync/v3/root`, { body: X })).text(), K = JSON.parse(J);
      if (!_w.guardAssert(K)) throw Error("invalid root hash");
      let { hash: U, generation: G } = K;
      if (Number.isSafeInteger(G)) return [U, G];
      else throw Error(`new generation ${G} was not a safe integer; please file a bug report`);
    }
    async #J(Q, q, $) {
      if (!this.#X.has(q)) {
        let X = eK.default.buf($, 0), Y = new ArrayBuffer(4);
        new DataView(Y).setInt32(0, X, false);
        let J = new Uint8Array(Y).toBase64();
        if (await this.#Q("PUT", `${this.#q}/sync/v3/files/${q}`, { body: $, headers: { "rm-filename": Q, "x-goog-hash": `crc32c=${J}` } }), this.#X.get(q) === void 0) this.#X.set(q, null);
      }
    }
    async putFile(Q, q) {
      let $ = await dQ(q);
      return [{ id: Q, hash: $, type: 0, subfiles: 0, size: q.length }, this.#J(Q, $, q)];
    }
    async putText(Q, q) {
      let X = new TextEncoder().encode(q), [Y, J] = await this.putFile(Q, X);
      return [Y, J.then(() => {
        this.#X.set(Y.hash, q);
      })];
    }
    async putContent(Q, q) {
      if (!Q.endsWith(".content")) throw Error(`id ${Q} did not end with '.content'`);
      else return await this.putText(Q, JSON.stringify(q));
    }
    async putMetadata(Q, q) {
      if (!Q.endsWith(".metadata")) throw Error(`id ${Q} did not end with '.metadata'`);
      else return await this.putText(Q, JSON.stringify(q));
    }
    async putEntries(Q, q, $) {
      if (Q === "root" && $ === 3) console.warn('writing a schema 3 root index, which reMarkable rejects with a 400 "Software must be updated" error; write the root index with schema version 4 instead');
      q.sort((V, z) => V.id.localeCompare(z.id));
      let X = q.reduce((V, z) => V + z.size, 0), Y = [`${$}
`];
      if ($ === 4) {
        let V = Q === "root" ? "." : Q;
        Y.push(`0:${V}:${q.length}:${X}
`);
      }
      for (let { hash: V, type: z, id: H, subfiles: j, size: Z } of q) {
        let h = $ === 4 ? 0 : z;
        Y.push(`${V}:${h}:${H}:${j}:${Z}
`);
      }
      let K = new TextEncoder().encode(Y.join("")), U;
      if ($ === 3) {
        let V = [];
        for (let { hash: z } of q) V.push(Uint8Array.fromHex(z));
        U = await dQ(cX(V));
      } else if ($ === 4) U = await dQ(K);
      else throw Error(`unsupported schema version ${$}`);
      return [{ id: Q, hash: U, type: $ > 3 ? 0 : 8e7, subfiles: q.length, size: X }, this.#J(`${Q}.docSchema`, U, K)];
    }
    async uploadFile(Q, q, $) {
      let Y = new TextEncoder().encode(JSON.stringify({ file_name: Q })).toBase64(), K = await (await this.#Q("POST", `${this.#$}/doc/v2/files`, { body: q, headers: { "Content-Type": $, "rm-meta": Y, "rm-source": "RoR-Browser" } })).json();
      if (!uw.guardAssert(K)) throw Error("invalid upload response");
      let { docID: U, hash: G } = K;
      return { id: U, hash: G };
    }
    dumpCache() {
      return JSON.stringify(Object.fromEntries(this.#X));
    }
    clearCache() {
      this.#X.clear();
    }
  };
  var YU = "https://webapp-prod.cloud.remarkable.engineering";
  var cw = "https://eu.tectonic.remarkable.com";
  var pw = "https://internal.cloud.remarkable.com";
  var t2 = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}||trash)$/;
  var iQ = class extends Error {
    constructor() {
      super("root generation was stale; try put again");
    }
  };
  var oQ = class extends Error {
    status;
    statusText;
    constructor(Q, q, $) {
      super($);
      this.status = Q, this.statusText = q;
    }
  };
  async function uC(Q, { deviceDesc: q = "browser-chrome", uuid: $ = n1(), authHost: X = YU } = {}) {
    if (Q.length !== 8) throw Error(`code should be length 8, but was ${Q.length}`);
    let Y = await fetch(`${X}/token/json/2/device/new`, { method: "POST", headers: { Authorization: "Bearer" }, body: JSON.stringify({ code: Q, deviceDesc: q, deviceID: $ }) });
    if (!Y.ok) throw new oQ(Y.status, Y.statusText, "couldn't register api");
    else return await Y.text();
  }
  var JU = class {
    #Q;
    #q;
    raw;
    #$;
    constructor(Q, q, $, X) {
      this.#Q = Q, this.#q = X, this.raw = new lQ((Y, J, { body: K, headers: U } = {}) => this.#J(J, { method: Y, body: K, headers: U }), X, q, $);
    }
    async #X(Q = false) {
      if (Q || this.#$ === void 0) this.#$ = await this.raw.getRootHash();
      return this.#$;
    }
    async #Y(Q, q) {
      try {
        let [$, X] = await this.raw.putRootHash(Q, q), [, , Y] = this.#$;
        this.#$ = [$, X, Y];
      } catch ($) {
        if ($ instanceof iQ) this.#$ = void 0;
        throw $;
      }
    }
    async #J(Q, { body: q, method: $ = "POST", headers: X = {} }) {
      let Y = await fetch(Q, { method: $, headers: { Authorization: `Bearer ${this.#Q}`, ...X }, body: q });
      if (!Y.ok) {
        let J = await Y.text();
        if (J === `{"message":"precondition failed"}
`) throw new iQ();
        else throw new oQ(Y.status, Y.statusText, `failed reMarkable request: ${J}`);
      } else return Y;
    }
    async #G({ hash: Q, id: q }) {
      let { entries: $ } = await this.raw.getEntries(`${q}.docSchema`, Q), X = $.find((Z) => Z.id.endsWith(".metadata")), Y = $.find((Z) => Z.id.endsWith(".content"));
      if (X === void 0) throw Error(`couldn't find metadata for hash ${Q}`);
      let [{ visibleName: J, lastModified: K, pinned: U, parent: G, lastOpened: V, new: z, source: H }, j] = await Promise.all([this.raw.getMetadata(X.id, X.hash), Y === void 0 ? Promise.resolve({ fileType: void 0, tags: void 0 }) : this.raw.getContent(Y.id, Y.hash)]);
      if ("templateVersion" in j) return { id: q, hash: Q, visibleName: J, lastModified: K, new: z, pinned: U, source: H, parent: G, type: "TemplateType" };
      else if (j.fileType === void 0) return { id: q, hash: Q, visibleName: J, lastModified: K, pinned: U, parent: G, tags: j.tags, type: "CollectionType" };
      else return { id: q, hash: Q, visibleName: J, lastModified: K, pinned: U, parent: G, tags: j.tags, lastOpened: V ?? "", fileType: j.fileType, type: "DocumentType" };
    }
    async listItems(Q = false) {
      let q = await this.listIds(Q);
      return await Promise.all(q.map(($) => this.#G($)));
    }
    async listIds(Q = false) {
      let [q] = await this.#X(Q), { entries: $ } = await this.raw.getEntries("root.docSchema", q);
      return $.map(({ id: X, hash: Y }) => ({ id: X, hash: Y }));
    }
    async getContent(Q, q) {
      let { entries: $ } = await this.raw.getEntries(`${Q}.docSchema`, q), [X] = $.filter((Y) => Y.id.endsWith(".content"));
      if (X === void 0) throw Error(`couldn't find contents for hash ${q}`);
      else return await this.raw.getContent(X.id, X.hash);
    }
    async getMetadata(Q, q) {
      let { entries: $ } = await this.raw.getEntries(`${Q}.docSchema`, q), [X] = $.filter((Y) => Y.id.endsWith(".metadata"));
      if (X === void 0) throw Error(`couldn't find metadata for hash ${q}`);
      else return await this.raw.getMetadata(X.id, X.hash);
    }
    async getPdf(Q, q) {
      let { entries: $ } = await this.raw.getEntries(`${Q}.docSchema`, q), [X] = $.filter((Y) => Y.id.endsWith(".pdf"));
      if (X === void 0) throw Error(`couldn't find pdf for hash ${q}`);
      else return await this.raw.getHash(X.id, X.hash);
    }
    async getEpub(Q, q) {
      let { entries: $ } = await this.raw.getEntries(`${Q}.docSchema`, q), [X] = $.filter((Y) => Y.id.endsWith(".epub"));
      if (X === void 0) throw Error(`couldn't find epub for hash ${q}`);
      else return await this.raw.getHash(X.id, X.hash);
    }
    async getDocument(Q, q) {
      let { entries: $ } = await this.raw.getEntries(`${Q}.docSchema`, q), X = new XU.default();
      for (let Y of $) X.file(Y.id, this.raw.getHash(Y.id, Y.hash));
      return X.generateAsync({ type: "uint8array" });
    }
    async #V(Q, q, $, { refresh: X, parent: Y = "", pinned: J = false, zoomMode: K = "bestFit", viewBackgroundFilter: U, textScale: G = 1, textAlignment: V = "justify", fontName: z = "", coverPageNumber: H = -1, authors: j, title: Z, publicationDate: h, publisher: g, extraMetadata: C = {}, lineHeight: N = -1, margins: W = 125, orientation: M = "portrait", tags: w }) {
      if (Y && !t2.test(Y)) throw new I2(Y, t2, "parent must be a valid document id");
      let I = n1(), f = /* @__PURE__ */ new Date(), E = { parent: Y, pinned: J, lastModified: (+f).toFixed(), createdTime: (+f).toFixed(), type: "DocumentType", visibleName: Q, lastOpened: "0", lastOpenedPage: 0 }, d = { coverPageNumber: H, documentMetadata: { authors: j, title: Z, publicationDate: h, publisher: g }, extraMetadata: C, lineHeight: N, margins: W, orientation: M, fileType: q, formatVersion: 1, tags: w?.map((u) => ({ name: u, timestamp: +f })) ?? [], fontName: z, textAlignment: V, textScale: G, zoomMode: K, viewBackgroundFilter: U, originalPageCount: 1, pageCount: 1, pageTags: [], pages: [n1()], redirectionPageMap: [0], sizeInBytes: $.length.toFixed() }, [[R, x], [D, L], [S, y], [v, a], [Q0, Y0, B0]] = await Promise.all([this.raw.putContent(`${I}.content`, d), this.raw.putMetadata(`${I}.metadata`, E), this.raw.putText(`${I}.pagedata`, `
`), this.raw.putFile(`${I}.${q}`, $), this.#X(X)]), [[c, U0], { entries: P }] = await Promise.all([this.raw.putEntries(I, [R, D, S, v], B0), this.raw.getEntries("root.docSchema", Q0)]);
      P.push(c);
      let [l, $0] = await this.raw.putEntries("root", P, 4);
      return await Promise.all([x, L, y, a, U0, $0]), await this.#Y(l.hash, Y0), { id: I, hash: c.hash };
    }
    async putPdf(Q, q, $ = {}) {
      return await this.#V(Q, "pdf", q, $);
    }
    async putEpub(Q, q, $ = {}) {
      return await this.#V(Q, "epub", q, $);
    }
    async putFolder(Q, { parent: q = "" } = {}, $ = false) {
      if (q && !t2.test(q)) throw new I2(q, t2, "parent must be a valid document id");
      let X = n1(), Y = /* @__PURE__ */ new Date(), J = { tags: [] }, K = { lastModified: (+Y).toFixed(), createdTime: (+Y).toFixed(), parent: q, pinned: false, type: "CollectionType", visibleName: Q }, [[U, G], [V, z], [H, j, Z]] = await Promise.all([this.raw.putContent(`${X}.content`, J), this.raw.putMetadata(`${X}.metadata`, K), this.#X($)]), [[h, g], { entries: C }] = await Promise.all([this.raw.putEntries(X, [U, V], Z), this.raw.getEntries("root.docSchema", H)]);
      C.push(h);
      let [N, W] = await this.raw.putEntries("root", C, 4);
      return await Promise.all([G, z, g, W]), await this.#Y(N.hash, j), { id: X, hash: h.hash };
    }
    async uploadEpub(Q, q) {
      return await this.raw.uploadFile(Q, q, "application/epub+zip");
    }
    async uploadPdf(Q, q) {
      return await this.raw.uploadFile(Q, q, "application/pdf");
    }
    async uploadFolder(Q) {
      return await this.raw.uploadFile(Q, new Uint8Array(0), "folder");
    }
    async #W(Q, q, $, X) {
      let { entries: Y } = await this.raw.getEntries(`${Q}.docSchema`, q), J = Y.findIndex((Z) => Z.id.endsWith(".content")), K = Y[J];
      if (K === void 0) throw Error("internal error: couldn't find content in entry hash");
      let U = await this.raw.getContent(K.id, K.hash);
      Object.assign(U, $);
      let [G, V] = await this.raw.putContent(K.id, U);
      Y[J] = G;
      let [z, H] = await this.raw.putEntries(Q, Y, X), j = Promise.all([V, H]);
      return [z, j];
    }
    async #K(Q, q, $, X) {
      let [Y, J, K] = await this.#X(X), { entries: U } = await this.raw.getEntries("root.docSchema", Y), G = U.findIndex((g) => g.hash === Q), V = U[G];
      if (V === void 0) throw new k6(Q);
      let [[z, H], j] = await Promise.all([this.#W(V.id, Q, q, K), this.getMetadata(V.id, Q)]);
      if (j.type !== $) throw Error(`expected type ${$} but got ${j.type} for hash ${Q}`);
      U[G] = z;
      let [Z, h] = await this.raw.putEntries("root", U, 4);
      return await Promise.all([H, h]), await this.#Y(Z.hash, J), { hash: z.hash };
    }
    async updateDocument(Q, q, $ = false) {
      return await this.#K(Q, q, "DocumentType", $);
    }
    async updateCollection(Q, q, $ = false) {
      return await this.#K(Q, q, "CollectionType", $);
    }
    async updateTemplate(Q, q, $ = false) {
      return await this.#K(Q, q, "TemplateType", $);
    }
    async #z(Q, q, $, X) {
      let { entries: Y } = await this.raw.getEntries(`${Q}.docSchema`, q), J = Y.findIndex((Z) => Z.id.endsWith(".metadata")), K = Y[J];
      if (K === void 0) throw Error("internal error: couldn't find metadata in entry hash");
      let U = await this.raw.getMetadata(K.id, K.hash);
      Object.assign(U, $);
      let [G, V] = await this.raw.putMetadata(K.id, U);
      Y[J] = G;
      let [z, H] = await this.raw.putEntries(Q, Y, X), j = Promise.all([V, H]);
      return [z, j];
    }
    async #U(Q, q, $ = false) {
      let [X, Y, J] = await this.#X($), { entries: K } = await this.raw.getEntries("root.docSchema", X), U = K.findIndex((Z) => Z.hash === Q), G = K[U];
      if (G === void 0) throw new k6(Q);
      let [V, z] = await this.#z(G.id, Q, q, J);
      K[U] = V;
      let [H, j] = await this.raw.putEntries("root", K, 4);
      return await Promise.all([z, j]), await this.#Y(H.hash, Y), { hash: V.hash };
    }
    async move(Q, q, $ = false) {
      if (!t2.test(q)) throw new I2(q, t2, "parent must be a valid document id");
      return await this.#U(Q, { parent: q }, $);
    }
    async delete(Q, q = false) {
      return await this.move(Q, "trash", q);
    }
    async rename(Q, q, $ = false) {
      return await this.#U(Q, { visibleName: q }, $);
    }
    async stared(Q, q, $ = false) {
      return await this.#U(Q, { pinned: q }, $);
    }
    async bulkMove(Q, q, $ = false) {
      if (!t2.test(q)) throw new I2(q, t2, "parent must be a valid document id");
      let [X, Y, J] = await this.#X($), { entries: K } = await this.raw.getEntries("root.docSchema", X), U = new Set(Q), G = [], V = [];
      for (let g of K) (U.has(g.hash) ? G : V).push(g);
      let z = await Promise.all(G.map(({ id: g, hash: C }) => this.#z(g, C, { parent: q }, J))), H = [], j = {};
      for (let [g, [C, N]] of z.entries()) V.push(C), H.push(N), j[G[g].hash] = C.hash;
      let [Z, h] = await this.raw.putEntries("root", V, 4);
      return await Promise.all([Promise.all(H), h]), await this.#Y(Z.hash, Y), { hashes: j };
    }
    async bulkDelete(Q, q = false) {
      return await this.bulkMove(Q, "trash", q);
    }
    dumpCache() {
      return this.raw.dumpCache();
    }
    async pruneCache(Q) {
      let [q] = await this.#X(Q), $ = new Set(this.#q.keys()), Y = [(await this.raw.getEntries("root.docSchema", q)).entries], J = [];
      while (Y.length) {
        for (let U of Y) for (let { hash: G, type: V, id: z } of U) if ($.add(G), V === 8e7) J.push(this.raw.getEntries(`${z}.docSchema`, G));
        Y = (await Promise.all(J)).map((U) => U.entries), J = [];
      }
      for (let K of $) this.#q.delete(K);
    }
    clearCache() {
      this.raw.clearCache();
    }
  };
  var mw = S6(E6(F0()));
  async function dw(Q, { authHost: q = YU } = {}) {
    let $ = await fetch(`${q}/token/json/2/user/new`, { method: "POST", headers: { Authorization: `Bearer ${Q}` } });
    if (!$.ok) throw Error(`couldn't fetch auth token: ${$.statusText}`);
    return await $.text();
  }
  function lw(Q, { rawHost: q = cw, uploadHost: $ = pw, cache: X, maxCacheSize: Y = 1 / 0 } = {}) {
    let J = JSON.parse(X ?? "{}");
    if (mw.guard(J)) {
      let K = Object.entries(J), U = Y === 1 / 0 ? new Map(K) : new l4(Y, K);
      return new JU(Q, q, $, U);
    }
    throw Error("cache was not a valid cache (json string mapping); your cache must be corrupted somehow. Either initialize remarkable without a cache, or fix its format.");
  }
  async function cC(Q, q = {}) {
    let { authHost: $, rawHost: X, uploadHost: Y, cache: J, maxCacheSize: K, syncHost: U } = q ?? {}, G = await dw(Q, { authHost: $ });
    return lw(G, { rawHost: X, uploadHost: Y, cache: J, maxCacheSize: K, syncHost: U });
  }

  // build/rmapi-entry.js
  globalThis.RMAPI = { register: uC, remarkable: cC };
})();
/*! Bundled license information:

rmapi-js/dist/rmapi-js.esm.min.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  (*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com *)
*/
