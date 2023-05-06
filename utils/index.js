let isRegisterConsole = false;

const formatArray = function (t) {
  for (var e = "", r = 0, n = t.length; r < n; r++)
    "string" == typeof t[r]
      ? (e += '"' + t[r] + '"')
      : Array.isArray(t[r])
      ? ((e += "Array ["), (e += formatArray(t[r])), (e += "]"))
      : (e += formatOutput(t[r])),
      r < t.length - 1 && (e += ", ");
  return e;
};

const formatObject = function (t) {
  var e = t.constructor ? t.constructor.name : t;
  if ("String" === e) return `String { "${t.valueOf()}" }`;
  if (t === JSON) return "JSON {}";
  if (e.match && e.match(/^(ArrayBuffer|SharedArrayBuffer|DataView)$/))
    return e + " {}";
  if (
    e.match &&
    e.match(
      /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|BigInt64Array|BigUint64Array)$/
    )
  )
    return t.length > 0 ? e + " [" + formatArray(t) + "]" : e + " []";
  if ("Symbol" === e && void 0 !== t) return t.toString();
  if ("Object" === e) {
    var r = "",
      n = !0;
    for (var o in t)
      t.hasOwnProperty(o) &&
        (n ? (n = !1) : (r += ", "), (r = r + o + ": " + formatOutput(t[o])));
    return e + " { " + r + " }";
  }
  if (!t.constructor && !t.prototype) {
    (r = ""), (n = !0);
    for (var o in t)
      n ? (n = !1) : (r += ", "), (r = r + o + ": " + formatOutput(t[o]));
    return "Object { " + r + " }";
  }
  return t;
};

const formatOutput = function (t) {
  "use strict";
  return void 0 === t || null === t || "boolean" == typeof t
    ? String(t)
    : "number" == typeof t
    ? Object.is(t, -0)
      ? "-0"
      : String(t)
    : "bigint" == typeof t
    ? String(t) + "n"
    : "string" == typeof t
    ? t.includes('"')
      ? "'" + t + "'"
      : '"' + t + '"'
    : Array.isArray(t)
    ? "Array [" + formatArray(t) + "]"
    : formatObject(t);
};

const writeOutput = function (t) {
  var e = document.querySelector("#console code"),
    r = e.textContent,
    n = "> " + t + "\n";
  console.warn(r);
  e.textContent = r + n;
};

export const applyLog = function () {
  const log = console.log;
  const error = console.error;
  if (isRegisterConsole) return;
  isRegisterConsole = true;
  console.log = function () {
    for (var t = [], n = 0, o = arguments.length; n < o; n++) {
      var i = formatOutput(arguments[n]);
      t.push(i);
    }
    var s = t.join(" ");
    writeOutput(s);
    console.warn(s);
    log.apply(console, arguments);
  };

  console.error = function (t) {
    writeOutput(t), error.apply(console, arguments);
  };
};

export function flattenTree(tree) {
  const result = [];

  function flatten(node) {
    if (node.length) {
      node.forEach((t) => {
        result.push(t);
        if (t.children?.length) {
          flatten(t.children);
        }
      });
    }
  }

  flatten(tree);

  return result;
}
