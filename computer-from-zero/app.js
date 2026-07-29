(function () {
  const appMain = document.getElementById("appMain");
  const topNav = document.getElementById("topNav");
  const brandBtn = document.getElementById("brandBtn");

  const exercises = window.CFZExercises || {};

  // თითო თავს თავისი გაკვეთილების რეესტრი აქვს.
  const COURSES = {
    cfz: window.ComputerFromZeroLessons || [],
    html: window.HtmlLessons || [],
    css: window.CssLessons || [],
    scss: window.ScssLessons || [],
    js: window.JsLessons || [],
    ts: window.TsLessons || [],
    node: window.NodeLessons || [],
    ng: window.AngularLessons || [],
  };
  function lessonsFor(chapterId) {
    return COURSES[chapterId] || [];
  }

  const authUser =
    window.CFZAuth && typeof window.CFZAuth.current === "function"
      ? window.CFZAuth.current()
      : null;
  const USER_ID = authUser ? authUser.id : "guest";
  const STORAGE_KEY = "computer-from-zero:completed:" + USER_ID;
  const ASSIGN_KEY = "computer-from-zero:assignments:" + USER_ID;

  // თავები — თავი 1 = კომპიუტერი ნულიდან (არსებული კურსი), დანარჩენი მალე.
  const CHAPTERS = [
    { id: "cfz", title: "კომპიუტერი ნულიდან", available: true },
    { id: "html", title: "HTML", available: true },
    { id: "css", title: "CSS", available: true },
    { id: "scss", title: "SCSS", available: true },
    { id: "js", title: "JavaScript", available: true },
    { id: "ts", title: "TypeScript", available: true },
    { id: "node", title: "Node.js", available: true },
    { id: "ng", title: "Angular", available: true },
  ];

  const NAV = [
    { id: "home", label: "მთავარი" },
    { id: "course", label: "კურსი" },
    { id: "assignments", label: "დავალებები" },
    { id: "resources", label: "რესურსები" },
  ];

  let cleanupCurrentLesson = null;
  let refreshSidebar = null;
  const completedLessons = loadSet(STORAGE_KEY);
  const completedAssignments = loadSet(ASSIGN_KEY);

  window.CFZ = {
    el,
    createButton,
    createSwitch,
    createLamp,
    createBitOutput,
    createElectronTrack,
    createSignalChip,
    createBreakdownStep,
    createTruthTable,
    svgSymbol,
    createSchematicPart,
    schematicGate,
    createCodePlayground,
    createStylePlayground,
    createScssPlayground,
    createJsPlayground,
    createTsPlayground,
    createNodePlayground,
    createAngularPlayground,
    stripTypes,
    rgbOf,
    isColorNear,
    goToLesson,
    wait,
  };

  function chapterOfLesson(id) {
    const found = Object.keys(COURSES).find(function (key) {
      return COURSES[key].some(function (l) {
        return l.id === id;
      });
    });
    return found || "cfz";
  }

  function goToLesson(id) {
    navigate("course", chapterOfLesson(id), id);
  }

  // ==================== ვიჯეტები (უცვლელი) ====================

  const SYMBOL_MARKUP = {
    vdd:
      '<svg class="symbol-svg symbol-vdd" viewBox="0 0 44 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" role="img" aria-label="კვება">' +
      '<path d="M22 37 V15"/><path d="M6 15 H38"/></svg>',
    battery:
      '<svg class="symbol-svg symbol-battery" viewBox="0 0 66 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" role="img" aria-label="ბატარეა">' +
      '<path d="M3 20 H16"/><path d="M18 5 V35"/><path d="M27 13 V27" stroke-width="6"/>' +
      '<path d="M36 5 V35"/><path d="M45 13 V27" stroke-width="6"/><path d="M50 20 H63"/></svg>',
    lamp:
      '<svg class="symbol-svg symbol-lamp" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="ნათურა">' +
      '<circle cx="24" cy="24" r="16"/><path d="M13 13 L35 35"/><path d="M35 13 L13 35"/></svg>',
    ground:
      '<svg class="symbol-svg symbol-ground" viewBox="0 0 44 40" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" role="img" aria-label="მიწა">' +
      '<path d="M22 3 V17"/><path d="M6 17 H38"/><path d="M12 25 H32"/><path d="M18 33 H26"/></svg>',
    resistor:
      '<svg class="symbol-svg symbol-resistor" viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="წინაღობა">' +
      '<path d="M20 3 V22 L8 28 L32 36 L8 44 L32 52 L20 58 V77"/></svg>',
    transistor:
      '<svg class="symbol-svg symbol-transistor" viewBox="0 0 64 84" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="ტრანზისტორი">' +
      '<path d="M4 42 H24"/><path d="M24 24 V60"/><path d="M32 22 V62"/>' +
      '<path d="M32 32 H48 V6"/><path d="M32 52 H48 V78"/>' +
      '<path d="M48 48 L40 52 L48 56 Z" fill="currentColor" stroke="none"/></svg>',
    notGate:
      '<svg class="symbol-svg symbol-gate" viewBox="0 0 96 60" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="NOT კარიბჭე">' +
      '<path d="M6 30 H24"/><path d="M24 10 L62 30 L24 50 Z" fill="var(--surface)"/>' +
      '<circle cx="69" cy="30" r="7" fill="var(--surface)"/><path d="M76 30 H90"/></svg>',
    andGate:
      '<svg class="symbol-svg symbol-gate" viewBox="0 0 96 60" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="AND კარიბჭე">' +
      '<path d="M6 18 H26"/><path d="M6 42 H26"/>' +
      '<path d="M26 8 H50 A22 22 0 0 1 50 52 H26 Z" fill="var(--surface)"/><path d="M72 30 H90"/></svg>',
    orGate:
      '<svg class="symbol-svg symbol-gate" viewBox="0 0 96 60" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="OR კარიბჭე">' +
      '<path d="M8 18 H26"/><path d="M8 42 H26"/>' +
      '<path d="M22 8 Q44 8 66 30 Q44 52 22 52 Q32 30 22 8 Z" fill="var(--surface)"/><path d="M66 30 H90"/></svg>',
    xorGate:
      '<svg class="symbol-svg symbol-gate" viewBox="0 0 96 60" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" role="img" aria-label="XOR კარიბჭე">' +
      '<path d="M10 18 H28"/><path d="M10 42 H28"/><path d="M16 8 Q26 30 16 52"/>' +
      '<path d="M26 8 Q48 8 70 30 Q48 52 26 52 Q36 30 26 8 Z" fill="var(--surface)"/><path d="M70 30 H90"/></svg>',
  };

  function svgSymbol(name) {
    const markup = SYMBOL_MARKUP[name];
    if (!markup) {
      return el("span", {}, []);
    }
    const wrapper = document.createElement("div");
    wrapper.innerHTML = markup.trim();
    return wrapper.firstChild;
  }

  function schematicGate(type, x, y, className) {
    const cls = className || "gate";
    let markup = "";
    const ports = {};
    if (type === "and") {
      markup =
        '<path class="' + cls + '" d="M' + x + "," + (y - 18) + " H" + (x + 18) +
        " A18 18 0 0 1 " + (x + 18) + "," + (y + 18) + " H" + x + ' Z"/>';
      ports.a = { x: x, y: y - 9 };
      ports.b = { x: x, y: y + 9 };
      ports.out = { x: x + 36, y: y };
    } else if (type === "or" || type === "xor") {
      let extra = "";
      if (type === "xor") {
        extra =
          '<path class="' + cls + '" d="M' + (x - 6) + "," + (y - 18) +
          " Q" + (x + 4) + "," + y + " " + (x - 6) + "," + (y + 18) + '"/>';
      }
      markup =
        extra +
        '<path class="' + cls + '" d="M' + x + "," + (y - 18) +
        " Q" + (x + 22) + "," + (y - 18) + " " + (x + 40) + "," + y +
        " Q" + (x + 22) + "," + (y + 18) + " " + x + "," + (y + 18) +
        " Q" + (x + 12) + "," + y + " " + x + "," + (y - 18) + ' Z"/>';
      ports.a = { x: x + 3, y: y - 9 };
      ports.b = { x: x + 3, y: y + 9 };
      ports.out = { x: x + 40, y: y };
    } else if (type === "not") {
      markup =
        '<path class="' + cls + '" d="M' + x + "," + (y - 12) + " L" + (x + 26) + "," + y +
        " L" + x + "," + (y + 12) + ' Z"/>' +
        '<circle class="' + cls + '" cx="' + (x + 31) + '" cy="' + y + '" r="5"/>';
      ports.in = { x: x, y: y };
      ports.out = { x: x + 36, y: y };
    }
    return { markup: markup, ports: ports };
  }

  function createSchematicPart(symbolName, word, code) {
    const element = el("div", { className: "schematic-part" }, [
      svgSymbol(symbolName),
      el("span", { className: "part-word", text: word }, []),
      el("span", { className: "part-code", text: code }, []),
    ]);
    return {
      element,
      setActive: function (isActive) {
        element.classList.toggle("is-conducting", Boolean(isActive));
      },
    };
  }

  function el(tag, options, children) {
    const node = document.createElement(tag);
    const settings = options || {};
    const childList = children || [];

    if (settings.className) {
      node.className = settings.className;
    }
    if (settings.text !== undefined) {
      node.textContent = settings.text;
    }
    if (settings.attrs) {
      Object.keys(settings.attrs).forEach(function (name) {
        node.setAttribute(name, settings.attrs[name]);
      });
    }
    if (settings.on) {
      Object.keys(settings.on).forEach(function (eventName) {
        node.addEventListener(eventName, settings.on[eventName]);
      });
    }
    childList.forEach(function (child) {
      if (typeof child === "string") {
        node.append(document.createTextNode(child));
      } else if (child) {
        node.append(child);
      }
    });
    return node;
  }

  function createButton(label, kind, onClick) {
    return el(
      "button",
      {
        className: kind === "secondary" ? "secondary-button" : "primary-button",
        attrs: { type: "button" },
        text: label,
        on: { click: onClick },
      },
      []
    );
  }

  function createSwitch(label, initialValue, onChange) {
    let value = Boolean(initialValue);
    const stateText = el("span", { className: "switch-text" }, []);
    const bitBadge = el("span", { className: "bit-badge" }, []);
    const button = el(
      "button",
      {
        className: "switch-button",
        attrs: { type: "button", role: "switch", "aria-checked": "false", "aria-label": label },
      },
      [el("span", { className: "switch-knob", attrs: { "aria-hidden": "true" } }, []), stateText]
    );
    const wrapper = el("div", { className: "switch-control" }, [
      el("span", { className: "switch-label", text: label }, []),
      button,
      bitBadge,
    ]);
    button.addEventListener("click", function () {
      value = !value;
      render(true);
    });
    function render(shouldNotify) {
      button.dataset.on = String(value);
      button.setAttribute("aria-checked", String(value));
      stateText.textContent = value ? "ON" : "OFF";
      bitBadge.textContent = value ? "1" : "0";
      if (shouldNotify && onChange) {
        onChange(value);
      }
    }
    render(false);
    return {
      element: wrapper,
      getValue: function () {
        return value ? 1 : 0;
      },
      setValue: function (nextValue) {
        value = Boolean(nextValue);
        render(true);
      },
    };
  }

  function createLamp(label) {
    const bulb = el("div", { className: "lamp-bulb", text: "💡" }, []);
    const caption = el("span", { className: "lamp-caption", text: label }, []);
    const element = el("div", { className: "lamp-widget" }, [bulb, caption]);
    return {
      element,
      setOn: function (isOn) {
        bulb.classList.toggle("is-on", Boolean(isOn));
      },
    };
  }

  function createBitOutput(label) {
    const digit = el("div", { className: "output-digit", text: "0" }, []);
    const lamp = createLamp(label);
    const element = el("div", { className: "logic-output" }, [digit, lamp.element]);
    return {
      element,
      setValue: function (value) {
        digit.textContent = String(value);
        digit.classList.toggle("is-one", value === 1);
        lamp.setOn(value === 1);
      },
    };
  }

  function createElectronTrack(direction) {
    const className = direction === "vertical" ? "electron-track vertical" : "electron-track";
    const track = el("div", { className }, [
      el("span", { className: "wire-line" }, []),
      el("span", { className: "electron" }, []),
      el("span", { className: "electron" }, []),
      el("span", { className: "electron" }, []),
      el("span", { className: "electron" }, []),
    ]);
    return {
      element: track,
      setFlowing: function (isFlowing) {
        track.classList.toggle("is-flowing", Boolean(isFlowing));
      },
    };
  }

  function createSignalChip(label, initialValue) {
    const valueNode = el("span", { className: "signal-value", text: String(initialValue) }, []);
    const chip = el("div", { className: "signal-chip" }, [
      el("span", { className: "signal-label", text: label }, []),
      valueNode,
    ]);
    return {
      element: chip,
      setValue: function (value) {
        valueNode.textContent = String(value);
        chip.classList.toggle("is-one", value === 1);
        chip.classList.toggle("is-zero", value === 0);
      },
    };
  }

  function createBreakdownStep(title, detail) {
    const valueNode = el("span", { className: "step-value", text: "" }, []);
    const step = el("div", { className: "breakdown-step" }, [
      el("strong", { text: title }, []),
      el("p", { text: detail }, []),
      valueNode,
    ]);
    return {
      element: step,
      setActive: function (isActive) {
        step.classList.toggle("is-active", Boolean(isActive));
      },
      setValue: function (label) {
        valueNode.textContent = label;
      },
    };
  }

  function createTruthTable(headers, rows) {
    const bodyRows = [];
    const table = el("table", { className: "truth-table" }, [
      el("thead", {}, [
        el("tr", {}, headers.map(function (header) {
          return el("th", { text: header }, []);
        })),
      ]),
      el("tbody", {}, rows.map(function (row) {
        const tr = el("tr", {}, row.map(function (cell) {
          return el("td", { text: String(cell) }, []);
        }));
        bodyRows.push(tr);
        return tr;
      })),
    ]);
    return {
      element: table,
      setActive: function (activeIndex) {
        bodyRows.forEach(function (row, index) {
          row.classList.toggle("is-active", index === activeIndex);
        });
      },
    };
  }

  function wait(milliseconds) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, milliseconds);
    });
  }

  // ცოცხალი HTML რედაქტორი + გადახედვა. onCheck(doc, code) ყოველ ცვლილებაზე.
  function createCodePlayground(initialCode, onCheck, options) {
    const opts = options || {};
    const textarea = el("textarea", {
      className: "code-editor",
      attrs: { spellcheck: "false", rows: "12", "aria-label": "HTML კოდი" },
    });
    textarea.value = initialCode || "";

    const frame = el("iframe", {
      className: "code-preview",
      attrs: { title: "შედეგი", sandbox: "" },
    });

    const element = el("div", { className: "playground" }, [
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "HTML კოდი — შეცვალე და ნახე შედეგი" }),
        textarea,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "შედეგი (ბრაუზერი)" }),
        frame,
      ]),
    ]);

    const BASE_STYLE =
      "<style>body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;padding:14px;margin:0;" +
      "color:#172033;background:#fff;line-height:1.55}img{max-width:100%}" +
      "table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:6px 10px}" +
      "label{display:block;margin:6px 0 2px}input,select,textarea{padding:6px;margin-bottom:8px}</style>";

    function render() {
      const code = textarea.value;
      frame.srcdoc = opts.fullDocument
        ? code
        : "<!doctype html><html><head><meta charset='utf-8'>" + BASE_STYLE + "</head><body>" + code + "</body></html>";
      if (onCheck) {
        const parsed = opts.fullDocument
          ? new DOMParser().parseFromString(code, "text/html")
          : new DOMParser().parseFromString("<body>" + code + "</body>", "text/html");
        onCheck(parsed, code);
      }
    }

    textarea.addEventListener("input", render);
    window.setTimeout(render, 0);

    return {
      element: element,
      getCode: function () {
        return textarea.value;
      },
      setCode: function (value) {
        textarea.value = value;
        render();
      },
      refresh: render,
    };
  }

  // CSS პლეიგრაუნდი: მარკაპი + ცოცხალი სტილი. onCheck(doc, win, cssText)
  // გამოთვლილ სტილზე მუშაობს, ამიტომ ამოწმებს, მართლა გამოიყენა თუ არა წესი.
  // ===== ჩაშენებული მინი-SCSS→CSS კომპილატორი (სასწავლო) =====
  const compileScss = (function () {
    "use strict";


  // ---------- მნიშვნელობის ტიპები ----------
  function num(v, u) { return { t: "num", v: v, u: u || "" }; }
  function str(v, q) { return { t: "str", v: v, q: q || "" }; }
  function color(r, g, b, a, src) { return { t: "color", r: clamp(r), g: clamp(g), b: clamp(b), a: a === undefined ? 1 : a, src: src || null }; }
  function list(items, sep) { return { t: "list", items: items, sep: sep || " " }; }
  function map(pairs) { return { t: "map", pairs: pairs }; }
  function ident(v) { return { t: "ident", v: v }; }
  function clamp(n) { return Math.max(0, Math.min(255, Math.round(n))); }

  // ---------- comment strip ----------
  function stripComments(src) {
    var out = "";
    for (var i = 0; i < src.length; i++) {
      var c = src[i];
      if (c === '"' || c === "'") {
        var q = c; out += c; i++;
        while (i < src.length && src[i] !== q) { out += src[i]; i++; }
        out += src[i] || ""; continue;
      }
      if (c === "/" && src[i + 1] === "/") { while (i < src.length && src[i] !== "\n") i++; out += "\n"; continue; }
      if (c === "/" && src[i + 1] === "*") { i += 2; while (i < src.length && !(src[i] === "*" && src[i + 1] === "/")) i++; i++; continue; }
      out += c;
    }
    return out;
  }

  // ---------- statement splitter (nested blocks) ----------
  // აბრუნებს სტეიტმენტების მასივს: {kind:'block', head, body} ან {kind:'stmt', text}
  function parseStatements(src) {
    var stmts = [];
    var i = 0, buf = "", depth = 0, str = null;
    while (i < src.length) {
      var c = src[i];
      if (str) { buf += c; if (c === str && src[i - 1] !== "\\") str = null; i++; continue; }
      if (c === '"' || c === "'") { str = c; buf += c; i++; continue; }
      if (c === "#" && src[i + 1] === "{") {
        // interpolation — ჩავყლაპოთ, რომ { არ ჩაითვალოს ბლოკად
        buf += "#{"; i += 2; var d = 1;
        while (i < src.length && d > 0) { if (src[i] === "{") d++; else if (src[i] === "}") d--; if (d > 0) buf += src[i]; i++; }
        buf += "}"; continue;
      }
      if (c === "{") {
        var head = buf.trim(); buf = ""; i++;
        var d2 = 1, body = "", s2 = null;
        while (i < src.length && d2 > 0) {
          var cc = src[i];
          if (s2) { body += cc; if (cc === s2 && src[i - 1] !== "\\") s2 = null; i++; continue; }
          if (cc === '"' || cc === "'") { s2 = cc; body += cc; i++; continue; }
          if (cc === "#" && src[i + 1] === "{") { body += "#{"; i += 2; var d3 = 1; while (i < src.length && d3 > 0) { if (src[i] === "{") d3++; else if (src[i] === "}") d3--; if (d3 > 0) body += src[i]; i++; } body += "}"; continue; }
          if (cc === "{") d2++;
          else if (cc === "}") { d2--; if (d2 === 0) { i++; break; } }
          body += cc; i++;
        }
        stmts.push({ kind: "block", head: head, body: body });
        continue;
      }
      if (c === ";") { if (buf.trim()) stmts.push({ kind: "stmt", text: buf.trim() }); buf = ""; i++; continue; }
      buf += c; i++;
    }
    if (buf.trim()) stmts.push({ kind: "stmt", text: buf.trim() });
    return stmts;
  }

  // ---------- scope ----------
  function Scope(parent) { this.vars = {}; this.parent = parent; }
  Scope.prototype.get = function (name) {
    if (name in this.vars) return this.vars[name];
    if (this.parent) return this.parent.get(name);
    return undefined;
  };
  Scope.prototype.has = function (name) {
    if (name in this.vars) return true;
    return this.parent ? this.parent.has(name) : false;
  };
  Scope.prototype.set = function (name, val) { this.vars[name] = val; };
  Scope.prototype.setNearest = function (name, val) {
    var s = this;
    while (s) { if (name in s.vars) { s.vars[name] = val; return; } s = s.parent; }
    this.vars[name] = val;
  };

  // ---------- value formatting ----------
  function fmt(v) {
    if (!v || typeof v !== "object") return String(v);
    switch (v.t) {
      case "num": {
        var n = Math.round(v.v * 1000) / 1000;
        return (Object.is(n, -0) ? 0 : n) + v.u;
      }
      case "str": return v.q ? v.q + v.v + v.q : v.v;
      case "ident": return v.v;
      case "color": return colorStr(v);
      case "list": return v.items.map(fmt).join(v.sep === "," ? ", " : " ");
      case "map": return "(" + v.pairs.map(function (p) { return fmt(p[0]) + ": " + fmt(p[1]); }).join(", ") + ")";
    }
    return String(v);
  }
  function colorStr(c) {
    if (c.a < 1) return "rgba(" + c.r + ", " + c.g + ", " + c.b + ", " + (Math.round(c.a * 100) / 100) + ")";
    if (c.src) return c.src;
    return "#" + hex(c.r) + hex(c.g) + hex(c.b);
  }
  function hex(n) { var s = n.toString(16); return s.length === 1 ? "0" + s : s; }

  // ---------- color parsing ----------
  var NAMED = { black: [0,0,0], white: [255,255,255], red: [255,0,0], green: [0,128,0], blue: [0,0,255], gray: [128,128,128], grey: [128,128,128] };
  function parseColorToken(tok) {
    if (tok[0] === "#") {
      var h = tok.slice(1);
      if (h.length === 3) return color(parseInt(h[0]+h[0],16), parseInt(h[1]+h[1],16), parseInt(h[2]+h[2],16), 1, tok);
      if (h.length === 6) return color(parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16), 1, tok);
    }
    return null;
  }

  // ---------- HSL helpers ----------
  function rgbToHsl(c) {
    var r = c.r/255, g = c.g/255, b = c.b/255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b), h, s, l = (max+min)/2;
    if (max === min) { h = s = 0; }
    else {
      var d = max-min;
      s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      if (max === r) h = (g-b)/d + (g < b ? 6 : 0);
      else if (max === g) h = (b-r)/d + 2;
      else h = (r-g)/d + 4;
      h /= 6;
    }
    return { h: h*360, s: s*100, l: l*100, a: c.a };
  }
  function hslToRgb(h, s, l, a) {
    h = ((h % 360) + 360) % 360 / 360; s = Math.max(0,Math.min(100,s))/100; l = Math.max(0,Math.min(100,l))/100;
    var r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      var hue2rgb = function (p, q, t) {
        if (t < 0) t += 1; if (t > 1) t -= 1;
        if (t < 1/6) return p + (q-p)*6*t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q-p)*(2/3-t)*6;
        return p;
      };
      var q = l < 0.5 ? l*(1+s) : l+s-l*s;
      var p = 2*l-q;
      r = hue2rgb(p,q,h+1/3); g = hue2rgb(p,q,h); b = hue2rgb(p,q,h-1/3);
    }
    return color(r*255, g*255, b*255, a === undefined ? 1 : a);
  }

  // ---------- expression evaluator ----------
  function evalExpr(text, scope, funcs) {
    var toks = tokenizeExpr(text);
    var pos = 0;
    function peek() { return toks[pos]; }
    function next() { return toks[pos++]; }

    function parseList() {
      // comma-separated
      var parts = [parseSpaceList()];
      while (peek() && peek().type === "op" && peek().v === ",") { next(); parts.push(parseSpaceList()); }
      if (parts.length === 1) return parts[0];
      return list(parts, ",");
    }
    function parseSpaceList() {
      var items = [parseAdd()];
      while (peek() && !(peek().type === "op" && (peek().v === "," || peek().v === ")"))) {
        // space-separated value list (e.g. 1px solid red)
        if (peek().type === "op" && "+-*/%<>=!".indexOf(peek().v[0]) !== -1) break;
        items.push(parseAdd());
      }
      if (items.length === 1) return items[0];
      return list(items, " ");
    }
    function parseAdd() {
      var left = parseMul();
      while (peek() && peek().type === "op" && (peek().v === "+" || peek().v === "-")) {
        var op = next().v; var right = parseMul();
        left = applyMath(op, left, right);
      }
      return left;
    }
    function parseMul() {
      var left = parseCmp();
      while (peek() && peek().type === "op" && (peek().v === "*" || peek().v === "/" || peek().v === "%")) {
        var op = next().v; var right = parseCmp();
        left = applyMath(op, left, right);
      }
      return left;
    }
    function parseCmp() {
      var left = parseUnary();
      while (peek() && peek().type === "op" && ["==","!=","<",">","<=",">="].indexOf(peek().v) !== -1) {
        var op = next().v; var right = parseUnary();
        left = ident(compare(op, left, right) ? "true" : "false");
      }
      // logical
      while (peek() && peek().type === "word" && (peek().v === "and" || peek().v === "or")) {
        var lop = next().v; var r2 = parseUnary();
        var lv = truthy(left), rv = truthy(r2);
        left = ident((lop === "and" ? (lv && rv) : (lv || rv)) ? "true" : "false");
      }
      return left;
    }
    function parseUnary() {
      if (peek() && peek().type === "op" && peek().v === "-") { next(); var v = parsePrimary(); if (v.t === "num") return num(-v.v, v.u); return v; }
      if (peek() && peek().type === "word" && peek().v === "not") { next(); return ident(truthy(parseUnary()) ? "false" : "true"); }
      return parsePrimary();
    }
    function parsePrimary() {
      var t = peek();
      if (!t) return str("");
      if (t.type === "op" && t.v === "(") {
        next();
        // შეიძლება map იყოს: (a: 1, b: 2)
        var saved = pos;
        var mp = tryParseMap();
        if (mp) return mp;
        pos = saved;
        var e = parseList();
        if (peek() && peek().type === "op" && peek().v === ")") next();
        return e;
      }
      if (t.type === "num") { next(); return num(parseFloat(t.v), t.u || ""); }
      if (t.type === "string") { next(); return str(t.v, t.q); }
      if (t.type === "var") { next(); var val = scope.get(t.v); return val === undefined ? ident("null") : val; }
      if (t.type === "hash") { next(); var col = parseColorToken(t.v); return col || ident(t.v); }
      if (t.type === "interp") { next(); return str(interpolate("#{" + t.v + "}", scope, funcs), ""); }
      if (t.type === "word") {
        next();
        // function call?
        if (peek() && peek().type === "op" && peek().v === "(") {
          next();
          var args = [];
          if (!(peek() && peek().type === "op" && peek().v === ")")) {
            args.push(parseSpaceOrValue());
            while (peek() && peek().type === "op" && peek().v === ",") { next(); args.push(parseSpaceOrValue()); }
          }
          if (peek() && peek().type === "op" && peek().v === ")") next();
          return callFunction(t.v, args, scope, funcs);
        }
        if (t.v === "true" || t.v === "false" || t.v === "null") return ident(t.v);
        return ident(t.v);
      }
      next();
      return ident(t.v || "");
    }
    function parseSpaceOrValue() {
      // ფუნქციის არგუმენტი — შეიძლება იყოს space-list
      return parseSpaceList();
    }
    function tryParseMap() {
      // უკვე ( -ს შემდეგ ვართ
      var pairs = [];
      if (peek() && peek().type === "op" && peek().v === ")") { next(); return map([]); }
      while (true) {
        var keyStart = pos;
        var key = parseAdd();
        if (!(peek() && peek().type === "op" && peek().v === ":")) { return null; }
        next();
        var val = parseSpaceList();
        pairs.push([key, val]);
        if (peek() && peek().type === "op" && peek().v === ",") { next(); continue; }
        if (peek() && peek().type === "op" && peek().v === ")") { next(); break; }
        return null;
      }
      return map(pairs);
    }

    var result = parseList();
    return result;
  }

  function tokenizeExpr(text) {
    var toks = [], i = 0;
    while (i < text.length) {
      var c = text[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === "#" && text[i + 1] === "{") { i += 2; var d = 1, b = ""; while (i < text.length && d > 0) { if (text[i] === "{") d++; else if (text[i] === "}") { d--; if (d === 0) break; } b += text[i]; i++; } i++; toks.push({ type: "interp", v: b }); continue; }
      if (c === "#") { var h = "#"; i++; while (i < text.length && /[0-9a-fA-F]/.test(text[i])) { h += text[i]; i++; } toks.push({ type: "hash", v: h }); continue; }
      if (c === "$") { var nm = ""; i++; while (i < text.length && /[\w-]/.test(text[i])) { nm += text[i]; i++; } toks.push({ type: "var", v: nm }); continue; }
      if (c === '"' || c === "'") { var q = c; i++; var sv = ""; while (i < text.length && text[i] !== q) { sv += text[i]; i++; } i++; toks.push({ type: "string", v: sv, q: q }); continue; }
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(text[i + 1]))) {
        var nnum = ""; while (i < text.length && /[0-9.]/.test(text[i])) { nnum += text[i]; i++; }
        var unit = ""; while (i < text.length && /[a-zA-Z%]/.test(text[i])) { unit += text[i]; i++; }
        toks.push({ type: "num", v: nnum, u: unit }); continue;
      }
      if (/[a-zA-Z_-]/.test(c)) { var w = ""; while (i < text.length && /[\w-]/.test(text[i])) { w += text[i]; i++; }
        // dotted (math.div)
        if (text[i] === ".") { w += "."; i++; while (i < text.length && /[\w-]/.test(text[i])) { w += text[i]; i++; } }
        toks.push({ type: "word", v: w }); continue; }
      // multi-char ops
      var two = text.substr(i, 2);
      if (["==","!=","<=",">="].indexOf(two) !== -1) { toks.push({ type: "op", v: two }); i += 2; continue; }
      toks.push({ type: "op", v: c }); i++;
    }
    return toks;
  }

  function applyMath(op, a, b) {
    if (a.t === "num" && b.t === "num") {
      var u = a.u || b.u;
      if (op === "+") return num(a.v + b.v, u);
      if (op === "-") return num(a.v - b.v, u);
      if (op === "*") return num(a.v * b.v, a.u || b.u);
      if (op === "/") return num(b.v === 0 ? 0 : a.v / b.v, a.u === b.u ? "" : (a.u || b.u));
      if (op === "%") return num(a.v % b.v, u);
    }
    if (op === "+" && (a.t === "str" || b.t === "str" || a.t === "ident" || b.t === "ident")) {
      return str(plain(a) + plain(b), a.q || "");
    }
    if (op === "/") return str(plain(a) + "/" + plain(b), "");
    if (op === "-") return str(plain(a) + "-" + plain(b), "");
    return str(plain(a) + plain(b), "");
  }
  function plain(v) { return v.t === "str" ? v.v : (v.t === "color" ? colorStr(v) : fmt(v)); }

  function compare(op, a, b) {
    var an = a.t === "num" ? a.v : parseFloat(a.v);
    var bn = b.t === "num" ? b.v : parseFloat(b.v);
    if (op === "==") return fmt(a) === fmt(b);
    if (op === "!=") return fmt(a) !== fmt(b);
    if (op === "<") return an < bn;
    if (op === ">") return an > bn;
    if (op === "<=") return an <= bn;
    if (op === ">=") return an >= bn;
    return false;
  }
  function truthy(v) {
    if (!v) return false;
    if (v.t === "ident") return v.v !== "false" && v.v !== "null";
    if (v.t === "num") return v.v !== 0;
    if (v.t === "str") return v.v !== "";
    return true;
  }

  // ---------- built-in functions ----------
  function callFunction(name, args, scope, funcs) {
    var lname = name.toLowerCase();
    if (funcs.user[name]) return callUserFunction(funcs.user[name], args, scope, funcs);
    switch (lname) {
      case "rgb": return color(nv(args[0]), nv(args[1]), nv(args[2]));
      case "rgba": {
        if (args.length === 2) { var c = toColor(args[0]); return color(c.r, c.g, c.b, nv(args[1])); }
        return color(nv(args[0]), nv(args[1]), nv(args[2]), nv(args[3]));
      }
      case "hsl": return hslToRgb(nv(args[0]), nv(args[1]), nv(args[2]));
      case "hsla": return hslToRgb(nv(args[0]), nv(args[1]), nv(args[2]), nv(args[3]));
      case "lighten": { var h1 = rgbToHsl(toColor(args[0])); return hslToRgb(h1.h, h1.s, h1.l + nv(args[1]), h1.a); }
      case "darken": { var h2 = rgbToHsl(toColor(args[0])); return hslToRgb(h2.h, h2.s, h2.l - nv(args[1]), h2.a); }
      case "saturate": { var h3 = rgbToHsl(toColor(args[0])); return hslToRgb(h3.h, h3.s + nv(args[1]), h3.l, h3.a); }
      case "desaturate": { var h4 = rgbToHsl(toColor(args[0])); return hslToRgb(h4.h, h4.s - nv(args[1]), h4.l, h4.a); }
      case "adjust-hue": { var h5 = rgbToHsl(toColor(args[0])); return hslToRgb(h5.h + nv(args[1]), h5.s, h5.l, h5.a); }
      case "mix": {
        var c1 = toColor(args[0]), c2 = toColor(args[1]), w = args[2] ? nv(args[2]) / 100 : 0.5;
        return color(c1.r*w + c2.r*(1-w), c1.g*w + c2.g*(1-w), c1.b*w + c2.b*(1-w), (c1.a||1)*w + (c2.a||1)*(1-w));
      }
      case "rgba-a":
      case "opacity": return num(args[0].a === undefined ? 1 : args[0].a);
      case "percentage": return num(nv(args[0]) * 100, "%");
      case "round": return num(Math.round(nv(args[0])), args[0].u);
      case "floor": return num(Math.floor(nv(args[0])), args[0].u);
      case "ceil": return num(Math.ceil(nv(args[0])), args[0].u);
      case "abs": return num(Math.abs(nv(args[0])), args[0].u);
      case "min": return num(Math.min.apply(null, args.map(nv)), args[0].u);
      case "max": return num(Math.max.apply(null, args.map(nv)), args[0].u);
      case "math.div": return num(nv(args[1]) === 0 ? 0 : nv(args[0]) / nv(args[1]), args[0].u === args[1].u ? "" : args[0].u);
      case "math.round": return num(Math.round(nv(args[0])), args[0].u);
      case "math.ceil": return num(Math.ceil(nv(args[0])), args[0].u);
      case "math.floor": return num(Math.floor(nv(args[0])), args[0].u);
      case "map-get": case "map.get": return mapGet(args[0], args[1]);
      case "map-has-key": case "map.has-key": return ident(mapGet(args[0], args[1]).t !== "ident" || mapGet(args[0], args[1]).v !== "null" ? "true" : "false");
      case "length": case "list.length": return num(args[0].t === "list" ? args[0].items.length : (args[0].t === "map" ? args[0].pairs.length : 1));
      case "nth": case "list.nth": { var l = args[0]; var idx = nv(args[1]) - 1; return l.t === "list" ? l.items[idx] : l; }
      case "to-upper-case": case "string.to-upper-case": return str(plain(args[0]).toUpperCase(), args[0].q);
      case "to-lower-case": case "string.to-lower-case": return str(plain(args[0]).toLowerCase(), args[0].q);
      case "str-length": case "string.length": return num(plain(args[0]).length);
      case "quote": return str(plain(args[0]), '"');
      case "unquote": return str(plain(args[0]), "");
      case "if": return truthy(args[0]) ? args[1] : args[2];
      case "type-of": return str(args[0].t, "");
      case "calc": return str("calc(" + args.map(function(a){return plain(a);}).join(", ") + ")", "");
      default:
        // უცნობი ფუნქცია — დავტოვოთ როგორც CSS ფუნქცია
        return str(name + "(" + args.map(function (a) { return plain(a); }).join(", ") + ")", "");
    }
  }
  function nv(v) { return v && v.t === "num" ? v.v : parseFloat(v && v.v) || 0; }
  function toColor(v) {
    if (!v) return color(0,0,0);
    if (v.t === "color") return v;
    if (v.t === "ident") { var n = NAMED[v.v.toLowerCase()]; if (n) return color(n[0],n[1],n[2]); if (v.v[0] === "#") { var c = parseColorToken(v.v); if (c) return c; } }
    if (v.t === "str" && v.v[0] === "#") { var c2 = parseColorToken(v.v); if (c2) return c2; }
    return color(0,0,0);
  }
  function mapGet(m, key) {
    if (m.t !== "map") return ident("null");
    var k = fmt(key);
    for (var i = 0; i < m.pairs.length; i++) { if (fmt(m.pairs[i][0]) === k) return m.pairs[i][1]; }
    return ident("null");
  }
  function callUserFunction(fn, args, scope, funcs) {
    var local = new Scope(scope);
    bindArgs(fn.params, args, local, scope, funcs);
    var ret = ident("null");
    execStatements(parseStatements(fn.body), local, { css: [], funcs: funcs, retBox: function (v) { ret = v; } }, true);
    return ret;
  }

  function bindArgs(params, args, local, callerScope, funcs) {
    params.forEach(function (p, i) {
      if (i < args.length && args[i] !== undefined) local.set(p.name, args[i]);
      else if (p.def !== null) local.set(p.name, evalExpr(p.def, callerScope, funcs));
      else local.set(p.name, ident("null"));
    });
  }

  // ---------- interpolation ----------
  function interpolate(text, scope, funcs) {
    return text.replace(/#\{([^}]*)\}/g, function (m, expr) {
      var v = evalExpr(expr, scope, funcs);
      return plain(v);
    });
  }

  // ---------- selector resolution ----------
  function resolveSelector(sel, parents) {
    var parts = splitTop(sel, ",").map(function (s) { return s.trim(); });
    var out = [];
    parts.forEach(function (part) {
      if (parents.length === 0) { out.push(part); return; }
      parents.forEach(function (par) {
        if (part.indexOf("&") !== -1) out.push(part.replace(/&/g, par));
        else out.push(par + " " + part);
      });
    });
    return out;
  }
  function splitTop(s, ch) {
    var res = [], buf = "", d = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === "(" || c === "[") d++;
      else if (c === ")" || c === "]") d--;
      if (c === ch && d === 0) { res.push(buf); buf = ""; }
      else buf += c;
    }
    res.push(buf);
    return res;
  }

  // ---------- executor ----------
  function execStatements(stmts, scope, ctx, inFunction) {
    for (var i = 0; i < stmts.length; i++) {
      var st = stmts[i];
      if (st.kind === "stmt") {
        var text = st.text;
        if (text[0] === "$") { // variable assignment
          var eq = text.indexOf(":");
          var name = text.slice(1, eq).trim();
          var rest = text.slice(eq + 1).trim();
          var isDefault = /!default\s*$/.test(rest);
          var isGlobal = /!global\s*$/.test(rest);
          rest = rest.replace(/!default\s*$/, "").replace(/!global\s*$/, "").trim();
          if (isDefault && scope.has(name) && fmt(scope.get(name)) !== fmt(ident("null"))) continue;
          var val = evalExpr(rest, scope, ctx.funcs);
          if (isGlobal) scope.setNearest(name, val); else scope.set(name, val);
          continue;
        }
        if (text[0] === "@") {
          var sp = text.indexOf(" ");
          var at = sp === -1 ? text.slice(1) : text.slice(1, sp);
          var params = sp === -1 ? "" : text.slice(sp + 1).trim();
          if (at === "return" && inFunction) { ctx.retBox(evalExpr(params, scope, ctx.funcs)); return "return"; }
          if (at === "include") { doInclude(params, null, scope, ctx); continue; }
          if (at === "extend") { ctx.pendingExtend && ctx.pendingExtend(params.trim()); continue; }
          if (at === "content") { if (ctx.contentBlock) execStatements(ctx.contentBlock.stmts, ctx.contentBlock.scope, ctx); continue; }
          if (at === "debug" || at === "warn") continue;
          continue;
        }
        // declaration prop: value
        var ci = firstColon(text);
        if (ci !== -1 && ctx.rule) {
          var prop = interpolate(text.slice(0, ci).trim(), scope, ctx.funcs);
          var valText = text.slice(ci + 1).trim();
          var v2 = evalExpr(valText, scope, ctx.funcs);
          ctx.rule.decls.push(prop + ": " + fmt(v2) + ";");
        }
        continue;
      }

      // block
      var head = st.head;
      if (head[0] === "@") {
        var r = execAtBlock(head, st.body, scope, ctx, inFunction);
        if (r === "return") return "return";
        continue;
      }
      if (head[0] === "%") { // placeholder def
        ctx.placeholders[head.trim()] = st.body;
        continue;
      }
      // nested property block: `font: { ... }`
      if (/:\s*$/.test(head) && ctx.rule) {
        var prefix = head.replace(/:\s*$/, "").trim();
        var subStmts = parseStatements(st.body);
        subStmts.forEach(function (ss) {
          if (ss.kind === "stmt") {
            var c2 = ss.text.indexOf(":");
            var p = ss.text.slice(0, c2).trim();
            var vv = evalExpr(ss.text.slice(c2 + 1).trim(), scope, ctx.funcs);
            ctx.rule.decls.push(prefix + "-" + p + ": " + fmt(vv) + ";");
          }
        });
        continue;
      }

      // normal rule
      var selText = interpolate(head, scope, ctx.funcs);
      var selectors = resolveSelector(selText, ctx.parents);
      var rule = { selectors: selectors, decls: [], media: ctx.media };
      ctx.css.push(rule);
      var childCtx = Object.assign({}, ctx, { rule: rule, parents: selectors, pendingExtend: function (ph) {
        // @extend %x — მოვძებნოთ placeholder და გავამრავლოთ სელექტორები
        applyExtend(ph, selectors, ctx);
      } });
      var childScope = new Scope(scope);
      execStatements(parseStatements(st.body), childScope, childCtx, inFunction);
    }
  }

  function firstColon(text) {
    // პირველი ორწერტილი, რომელიც არ არის ფსევდო-სელექტორის შიგნით
    var d = 0;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (c === "(") d++; else if (c === ")") d--;
      if (c === ":" && d === 0) return i;
    }
    return -1;
  }

  function execAtBlock(head, body, scope, ctx, inFunction) {
    var sp = head.indexOf(" ");
    var name = (sp === -1 ? head : head.slice(0, sp)).slice(1);
    var params = sp === -1 ? "" : head.slice(sp + 1).trim();

    if (name === "mixin") {
      var mm = /^([\w-]+)\s*(?:\(([\s\S]*)\))?/.exec(params);
      ctx.funcs.mixins[mm[1]] = { params: parseParams(mm[2] || ""), body: body };
      return;
    }
    if (name === "function") {
      var fm = /^([\w-]+)\s*(?:\(([\s\S]*)\))?/.exec(params);
      ctx.funcs.user[fm[1]] = { params: parseParams(fm[2] || ""), body: body };
      return;
    }
    if (name === "include") {
      doInclude(params, { stmts: parseStatements(body), scope: scope }, scope, ctx);
      return;
    }
    if (name === "if") {
      var cond = evalExpr(params, scope, ctx.funcs);
      if (truthy(cond)) return execStatements(parseStatements(body), new Scope(scope), ctx, inFunction);
      // else chain — შემდეგი @else ცალკე ბლოკია; ჩვენ მას აქ ვერ ვხედავთ.
      ctx.lastIf = false;
      return;
    }
    if (name === "else") {
      // params: "if <cond>" ან ""
      if (ctx.lastIf === false) {
        var m = /^if\s+([\s\S]+)$/.exec(params);
        if (m) {
          if (truthy(evalExpr(m[1], scope, ctx.funcs))) { ctx.lastIf = undefined; return execStatements(parseStatements(body), new Scope(scope), ctx, inFunction); }
          ctx.lastIf = false; return;
        }
        ctx.lastIf = undefined;
        return execStatements(parseStatements(body), new Scope(scope), ctx, inFunction);
      }
      return;
    }
    if (name === "each") {
      var em = /^(\$[\w-]+(?:\s*,\s*\$[\w-]+)?)\s+in\s+([\s\S]+)$/.exec(params);
      var varNames = em[1].split(",").map(function (s) { return s.trim().slice(1); });
      var listVal = evalExpr(em[2], scope, ctx.funcs);
      var items = listVal.t === "list" ? listVal.items : (listVal.t === "map" ? listVal.pairs : [listVal]);
      for (var k = 0; k < items.length; k++) {
        var ls = new Scope(scope);
        if (listVal.t === "map") { ls.set(varNames[0], items[k][0]); if (varNames[1]) ls.set(varNames[1], items[k][1]); }
        else if (varNames.length === 2 && items[k].t === "list") { ls.set(varNames[0], items[k].items[0]); ls.set(varNames[1], items[k].items[1]); }
        else ls.set(varNames[0], items[k]);
        var rr = execStatements(parseStatements(body), ls, ctx, inFunction);
        if (rr === "return") return "return";
      }
      return;
    }
    if (name === "for") {
      var fm2 = /^\$([\w-]+)\s+from\s+(.+?)\s+(through|to)\s+(.+)$/.exec(params);
      var vn = fm2[1];
      var start = nv(evalExpr(fm2[2], scope, ctx.funcs));
      var through = fm2[3] === "through";
      var end = nv(evalExpr(fm2[4], scope, ctx.funcs));
      for (var x = start; through ? x <= end : x < end; x++) {
        var fs = new Scope(scope); fs.set(vn, num(x));
        var rr2 = execStatements(parseStatements(body), fs, ctx, inFunction);
        if (rr2 === "return") return "return";
      }
      return;
    }
    if (name === "media") {
      var mediaQ = "@media " + interpolate(params, scope, ctx.funcs);
      var mctx = Object.assign({}, ctx, { media: mediaQ });
      return execStatements(parseStatements(body), new Scope(scope), mctx, inFunction);
    }
    // უცნობი at-rule ბლოკით — გამოვიტანოთ როგორც არის
    return;
  }

  function parseParams(str) {
    if (!str.trim()) return [];
    return splitTop(str, ",").map(function (p) {
      p = p.trim();
      var colon = p.indexOf(":");
      if (colon !== -1) return { name: p.slice(1, colon).trim(), def: p.slice(colon + 1).trim() };
      return { name: p.replace(/^\$/, "").replace(/\.\.\.$/, ""), def: null };
    });
  }

  function doInclude(params, contentBlock, scope, ctx) {
    var mm = /^([\w-]+)\s*(?:\(([\s\S]*)\))?/.exec(params.trim());
    var mix = ctx.funcs.mixins[mm[1]];
    if (!mix) return;
    var argTexts = mm[2] ? splitTop(mm[2], ",") : [];
    var args = argTexts.map(function (a) { return evalExpr(a.trim(), scope, ctx.funcs); });
    var local = new Scope(scope);
    bindArgs(mix.params, args, local, scope, ctx.funcs);
    var incCtx = Object.assign({}, ctx, { contentBlock: contentBlock });
    execStatements(parseStatements(mix.body), local, incCtx);
  }

  function applyExtend(placeholderName, selectors, ctx) {
    // placeholderName მაგ. "%card"
    var body = ctx.placeholders[placeholderName];
    if (body === undefined) return;
    // ვქმნით/ვპოულობთ პლეისჰოლდერის წესს და ვამატებთ ჩვენს სელექტორებს
    var key = "__ph__" + placeholderName;
    if (!ctx.phRules[key]) {
      var rule = { selectors: [], decls: [], media: ctx.media };
      ctx.phRules[key] = rule;
      ctx.css.push(rule);
      var childScope = new Scope(ctx.rootScope);
      execStatements(parseStatements(body), childScope, Object.assign({}, ctx, { rule: rule, parents: [], pendingExtend: function(){} }));
    }
    selectors.forEach(function (s) {
      if (ctx.phRules[key].selectors.indexOf(s) === -1) ctx.phRules[key].selectors.push(s);
    });
  }

  // ---------- top-level ----------
  function compile(scss) {
    var src = stripComments(scss);
    var scope = new Scope(null);
    var funcs = { mixins: {}, user: {}, };
    var ctx = {
      css: [], funcs: funcs, rule: null, parents: [], media: null,
      placeholders: {}, phRules: {}, rootScope: scope, lastIf: undefined,
    };
    // ვამუშავებთ top-level-ს ხელით, რომ @else-მ წინა @if-ის შედეგი დაინახოს
    execTopLevel(parseStatements(src), scope, ctx);
    return renderCss(ctx.css);
  }

  function execTopLevel(stmts, scope, ctx) {
    // იგივე რაც execStatements, ოღონდ top-level (ctx.rule === null)
    execStatements(stmts, scope, ctx, false);
  }

  function renderCss(rules) {
    var byMedia = {};
    var order = [];
    rules.forEach(function (r) {
      if (!r.selectors.length || !r.decls.length) return;
      var m = r.media || "";
      if (!byMedia[m]) { byMedia[m] = []; order.push(m); }
      byMedia[m].push(r);
    });
    var out = "";
    order.forEach(function (m) {
      var block = byMedia[m].map(function (r) {
        return r.selectors.join(",\n") + " {\n  " + r.decls.join("\n  ") + "\n}";
      }).join("\n\n");
      if (m) out += m + " {\n" + block.replace(/^/gm, "  ") + "\n}\n\n";
      else out += block + "\n\n";
    });
    return out.trim() + "\n";
  }
    return compile;
  })();

  // SCSS პლეიგრაუნდი: მომხმარებელი წერს SCSS-ს, ჩვენ ვაკომპილირებთ CSS-ად,
  // ვაჩვენებთ კომპილირებულ CSS-ს ცალკე პანელში და ვხატავთ შედეგს iframe-ში.
  function createScssPlayground(html, scss, onCheck, options) {
    const opts = options || {};

    const scssArea = el("textarea", {
      className: "code-editor",
      attrs: { spellcheck: "false", rows: "14", "aria-label": "SCSS კოდი" },
    });
    scssArea.value = scss || "";

    const cssView = el("pre", { className: "scss-output", text: "" });
    const frame = el("iframe", {
      className: "code-preview",
      attrs: { title: "შედეგი", sandbox: "allow-same-origin" },
    });

    const RESET =
      "*{box-sizing:border-box}body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;" +
      "margin:0;padding:14px;color:#172033;background:#fff;line-height:1.55}";

    let lastCss = "";

    function compileNow() {
      try {
        lastCss = compileScss(scssArea.value);
        cssView.textContent = lastCss;
        cssView.classList.remove("has-error");
        return true;
      } catch (error) {
        lastCss = "";
        cssView.textContent = "⚠️ კომპილაციის შეცდომა: " + (error && error.message ? error.message : error);
        cssView.classList.add("has-error");
        return false;
      }
    }

    function render() {
      const ok = compileNow();
      frame.srcdoc =
        "<!doctype html><html><head><meta charset='utf-8'><style>" +
        RESET +
        "</style><style>" +
        (ok ? lastCss : "") +
        "</style></head><body>" +
        (html || "") +
        "</body></html>";
    }

    frame.addEventListener("load", function () {
      if (!onCheck) return;
      try {
        const doc = frame.contentDocument;
        if (doc) onCheck(doc, frame.contentWindow, lastCss, scssArea.value);
      } catch (error) {
        /* გადახედვა ჯერ არ არის მზად */
      }
    });

    scssArea.addEventListener("input", render);
    window.setTimeout(render, 0);

    const panes = [
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: opts.label || "SCSS — დაწერე აქ" }),
        scssArea,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "→ კომპილირებული CSS" }),
        cssView,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "შედეგი" }),
        frame,
      ]),
    ];

    return {
      element: el("div", { className: "playground playground-scss" }, panes),
      getScss: function () { return scssArea.value; },
      getCss: function () { return lastCss; },
      setScss: function (value) { scssArea.value = value; render(); },
      refresh: render,
    };
  }

  function createStylePlayground(html, css, onCheck, options) {
    const opts = options || {};

    const cssArea = el("textarea", {
      className: "code-editor",
      attrs: { spellcheck: "false", rows: "12", "aria-label": "CSS კოდი" },
    });
    cssArea.value = css || "";

    const htmlArea = opts.editableHtml
      ? el("textarea", {
          className: "code-editor",
          attrs: { spellcheck: "false", rows: "6", "aria-label": "HTML კოდი" },
        })
      : el("pre", { className: "markup-view" });
    if (opts.editableHtml) {
      htmlArea.value = html || "";
    } else {
      htmlArea.textContent = html || "";
    }

    const frame = el("iframe", {
      className: "code-preview",
      attrs: { title: "შედეგი", sandbox: "allow-same-origin" },
    });

    const RESET =
      "*{box-sizing:border-box}body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;" +
      "margin:0;padding:14px;color:#172033;background:#fff;line-height:1.55}";

    function currentHtml() {
      return opts.editableHtml ? htmlArea.value : html || "";
    }

    function render() {
      frame.srcdoc =
        "<!doctype html><html><head><meta charset='utf-8'><style>" +
        RESET +
        "</style><style>" +
        cssArea.value +
        "</style></head><body>" +
        currentHtml() +
        "</body></html>";
    }

    frame.addEventListener("load", function () {
      if (!onCheck) return;
      try {
        const doc = frame.contentDocument;
        if (doc) onCheck(doc, frame.contentWindow, cssArea.value);
      } catch (error) {
        /* გადახედვა ჯერ არ არის მზად */
      }
    });

    cssArea.addEventListener("input", render);
    if (opts.editableHtml) htmlArea.addEventListener("input", render);
    window.setTimeout(render, 0);

    const panes = [
      el("div", { className: "playground-pane" }, [
        el("span", {
          className: "playground-label",
          text: opts.editableHtml ? "HTML — შეგიძლია შეცვალო" : "HTML (მოცემულია)",
        }),
        htmlArea,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "CSS — დაწერე აქ" }),
        cssArea,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "შედეგი" }),
        frame,
      ]),
    ];

    return {
      element: el("div", { className: "playground playground-css" }, panes),
      getCss: function () {
        return cssArea.value;
      },
      setCss: function (value) {
        cssArea.value = value;
        render();
      },
      refresh: render,
    };
  }

  // JS პლეიგრაუნდი: კოდი სრულდება იზოლირებულ iframe-ში (allow-scripts, same-origin გარეშე).
  // შედეგი და console.log უკან postMessage-ით ბრუნდება. testSource იმავე სკოუპში სრულდება.
  let jsPlaygroundSeq = 0;
  function createJsPlayground(starter, testSource, onResult, options) {
    const opts = options || {};
    const frameId = "cfzjs" + ++jsPlaygroundSeq;

    const editor = el("textarea", {
      className: "code-editor",
      attrs: { spellcheck: "false", rows: "12", "aria-label": "JavaScript კოდი" },
    });
    editor.value = starter || "";

    const output = el("pre", { className: "js-output", text: "▶ დააჭირე „გაშვებას“" });
    const frame = el("iframe", {
      className: "js-runner",
      attrs: { title: "გამშვები", sandbox: "allow-scripts", "aria-hidden": "true" },
    });

    let timer = null;

    function run() {
      output.textContent = "⏳ სრულდება…";
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        output.textContent = "⏱ კოდი ძალიან დიდხანს სრულდება — შესაძლოა უსასრულო ციკლია.";
        if (onResult) onResult(false, "კოდი ვერ დასრულდა (შეამოწმე ციკლი).", []);
      }, 6000);

      // სამი ცალკე სკრიპტი: თუ მომხმარებლის კოდს სინტაქსური შეცდომა აქვს,
      // მეორე ბლოკი საერთოდ არ გაიშვება — მესამე კი მაინც გაიშვება და შეცდომას დააბრუნებს.
      const S = "window.__cfz";
      const harness =
        "<!doctype html><html><body>" + (opts.html || "") +
        "<scr" + "ipt>" +
        S + "={logs:[],ok:false,msg:'',err:null,ran:false};" +
        "window.onerror=function(m){if(!" + S + ".err)" + S + ".err=m;return true;};" +
        "</scr" + "ipt>" +
        "<scr" + "ipt>(function(){var S=" + S + ";" +
        "function __fmt(v){try{if(typeof v==='string')return v;" +
        "if(v===undefined)return 'undefined';if(v===null)return 'null';" +
        "if(typeof v==='function')return '[function]';" +
        "return JSON.stringify(v);}catch(e){return String(v);}}" +
        "function __push(){S.logs.push([].slice.call(arguments).map(__fmt).join(' '));}" +
        "var console={log:__push,info:__push,warn:__push,error:__push,debug:__push};" +
        (opts.preamble || "") +
        (opts.exposeSource ? "var __src=" + JSON.stringify(editor.value) + ";" : "") +
        "try{\n" + (opts.transform ? opts.transform(editor.value) : editor.value) + "\n;" +
        "try{var __r=(function(){\n" + (testSource || "return true;") + "\n})();" +
        "if(__r&&typeof __r.then==='function'){S.pending=__r;}" +
        "else if(__r&&typeof __r==='object'){S.ok=!!__r.ok;S.msg=__r.message||'';}else{S.ok=!!__r;}" +
        "}catch(e){S.ok=false;S.msg='შემოწმება ვერ შესრულდა: '+e.message;}" +
        "}catch(e){S.err=e.message;}" +
        "S.ran=true;})();</scr" + "ipt>" +
        "<scr" + "ipt>(function(){var S=" + S + ";" +
        "if(!S.ran&&!S.err){S.err='სინტაქსური შეცდომა — შეამოწმე ფრჩხილები და წერტილმძიმეები';}" +
        "function __report(){parent.postMessage({cfz:'" + frameId + "',logs:S.logs,ok:S.ok,msg:S.msg,err:S.err},'*');}" +
        "if(S.pending){S.pending.then(function(v){" +
        "if(v&&typeof v==='object'){S.ok=!!v.ok;S.msg=v.message||'';}else{S.ok=!!v;}" +
        "},function(e){S.ok=false;S.msg='შემოწმება ჩავარდა: '+(e&&e.message?e.message:e);})" +
        ".then(function(){setTimeout(__report,5);});}" +
        "else{setTimeout(__report,5);}" +
        "})();</scr" + "ipt></body></html>";

      frame.srcdoc = harness;
    }

    function onMessage(event) {
      const data = event.data;
      if (!data || data.cfz !== frameId) return;
      window.clearTimeout(timer);

      const lines = [];
      if (data.logs && data.logs.length) lines.push(data.logs.join("\n"));
      if (data.err) lines.push("❌ შეცდომა: " + data.err);
      output.textContent = lines.length ? lines.join("\n") : "(კონსოლი ცარიელია)";

      if (onResult) {
        onResult(Boolean(data.ok) && !data.err, data.err ? "შეასწორე შეცდომა: " + data.err : data.msg || "", data.logs || []);
      }
    }

    window.addEventListener("message", onMessage);

    const runBtn = createButton("▶ გაშვება", "primary", run);
    const resetBtn = createButton("თავიდან", "secondary", function () {
      editor.value = starter || "";
      run();
    });

    const element = el("div", { className: "js-playground" }, [
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: opts.label || "JavaScript — დაწერე და გაუშვი" }),
        editor,
      ]),
      el("div", { className: "playground-pane" }, [
        el("span", { className: "playground-label", text: "კონსოლი" }),
        output,
      ]),
      el("div", { className: "control-row" }, [runBtn, resetBtn]),
      frame,
    ]);

    window.setTimeout(run, 0);

    return {
      element: element,
      run: run,
      getCode: function () {
        return editor.value;
      },
      destroy: function () {
        window.clearTimeout(timer);
        window.removeEventListener("message", onMessage);
      },
    };
  }

  // TypeScript-ის ტიპების ამომჭრელი — სასწავლო ქვესიმრავლისთვის.
  // სკანერი: სტრიქონებსა და კომენტარებს გვერდს უვლის, ობიექტის ლიტერალებს იცავს.
  function stripTypes(src) {
    let s = src;

    // 1) interface ბლოკები — ფრჩხილების დათვლით
    s = removeBlocks(s, /\binterface\s+[A-Za-z_$][\w$]*\s*(?:extends\s+[^{]+?)?\{/g);

    // 2) type ალიასები (მრავალხაზოვანიც)
    s = removeTypeAliases(s);

    // 3) enum -> const ობიექტი
    s = s.replace(/\benum\s+([A-Za-z_$][\w$]*)\s*\{([\s\S]*?)\}/g, function (m, name, body) {
      let auto = 0;
      const parts = body
        .split(",")
        .map(function (x) { return x.trim(); })
        .filter(Boolean)
        .map(function (x) {
          const eq = x.indexOf("=");
          if (eq === -1) return x + ": " + auto++;
          const k = x.slice(0, eq).trim();
          const v = x.slice(eq + 1).trim();
          const n = Number(v);
          if (!isNaN(n)) auto = n + 1;
          return k + ": " + v;
        });
      return "const " + name + " = { " + parts.join(", ") + " };";
    });

    // 4) declare / export type|interface ნაშთები
    s = s.replace(/^\s*declare\s+.*$/gm, "");

    // 5) implements ... (კლასის სათაურში)
    s = s.replace(/\s+implements\s+[A-Za-z_$][\w$\s,<>]*(?=\{)/g, " ");

    // 5.5) კონსტრუქტორის პარამეტრ-თვისებები: constructor(private s: number) -> this.s = s
    s = s.replace(/constructor\s*\(([^)]*)\)\s*\{/g, function (m, params) {
      const names = [];
      params.split(",").forEach(function (p) {
        const mm = p.match(/^\s*(?:public|private|protected)\s+(?:readonly\s+)?([A-Za-z_$][\w$]*)/)
          || p.match(/^\s*readonly\s+([A-Za-z_$][\w$]*)/);
        if (mm) names.push(mm[1]);
      });
      const assigns = names.map(function (n) { return "this." + n + " = " + n + ";"; }).join(" ");
      return "constructor(" + params + ") {" + (assigns ? " " + assigns : "");
    });

    // 6) წვდომის მოდიფიკატორები
    s = s.replace(/\b(public|private|protected|readonly)\s+/g, "");

    // 7) as Type / satisfies Type
    s = s.replace(/\s+(?:as|satisfies)\s+(?:const\b|[A-Za-z_$][\w$]*(?:\s*<[^>]*>)?(?:\s*\[\s*\])*(?:\s*\|\s*[A-Za-z_$][\w$]*)*)/g, "");

    // 8) non-null assertion
    s = s.replace(/!(\s*[.)\],;])/g, "$1");

    // 9) გენერიკები გამოცხადებებში
    s = s.replace(/\b(function\s+[A-Za-z_$][\w$]*)\s*<[^<>()]*>/g, "$1");
    s = s.replace(/\b(class\s+[A-Za-z_$][\w$]*)\s*<[^<>()]*>/g, "$1");
    s = s.replace(/(=\s*)<([A-Za-z_$][\w$,\s]*)>(\s*\()/g, "$1$3");
    // გამოძახების გენერიკები: foo<Type>(...)
    s = s.replace(/\b([A-Za-z_$][\w$]*)\s*<\s*[A-Za-z_$][\w$,\s\[\]<>|]*\s*>\s*\(/g, "$1(");

    // 10) ანოტაციების ამოჭრა სკანერით
    s = scanStrip(s);

    return s;
  }

  function removeBlocks(src, startRe) {
    let out = src;
    let m;
    startRe.lastIndex = 0;
    while ((m = startRe.exec(out))) {
      const open = out.indexOf("{", m.index);
      if (open === -1) break;
      let depth = 0, i = open;
      for (; i < out.length; i++) {
        if (out[i] === "{") depth++;
        else if (out[i] === "}") { depth--; if (depth === 0) break; }
      }
      out = out.slice(0, m.index) + out.slice(i + 1);
      startRe.lastIndex = 0;
    }
    return out;
  }

  function removeTypeAliases(src) {
    const re = /\btype\s+[A-Za-z_$][\w$]*\s*(?:<[^>]*>)?\s*=/g;
    let out = src, m;
    while ((m = re.exec(out))) {
      let i = m.index + m[0].length;
      let depth = 0;
      for (; i < out.length; i++) {
        const c = out[i];
        if (c === "{" || c === "(" || c === "[" || c === "<") depth++;
        else if (c === "}" || c === ")" || c === "]" || c === ">") depth--;
        else if (c === ";" && depth <= 0) { i++; break; }
        else if (c === "\n" && depth <= 0) {
          const rest = out.slice(i + 1).match(/^\s*[|&]/);
          if (!rest) break;
        }
      }
      out = out.slice(0, m.index) + out.slice(i);
      re.lastIndex = 0;
    }
    return out;
  }

  // კონტექსტის მიხედვით ჭრის ": ტიპს" — ობიექტის ლიტერალს არ ეხება.
  function scanStrip(src) {
    let out = "";
    const stack = [{ type: "root", ternary: 0 }];
    let i = 0;
    let tail = ""; // ბოლო არა-ჰარი სიმბოლოები კონტექსტის ამოსაცნობად

    function push(ch) {
      tail = (tail + ch).slice(-12);
    }

    function objContext() {
      return /[=(,:\[?&|]$/.test(tail) || /=>$/.test(tail) || /\breturn$/.test(tail);
    }

    while (i < src.length) {
      const c = src[i];

      if (c === '"' || c === "'" || c === "`") {
        const q = c;
        let j = i + 1;
        while (j < src.length && (src[j] !== q || src[j - 1] === "\\")) j++;
        out += src.slice(i, j + 1);
        push(q);
        i = j + 1;
        continue;
      }
      if (c === "/" && src[i + 1] === "/") {
        const j = src.indexOf("\n", i);
        const end = j === -1 ? src.length : j;
        out += src.slice(i, end);
        i = end;
        continue;
      }
      if (c === "/" && src[i + 1] === "*") {
        const j = src.indexOf("*/", i);
        const end = j === -1 ? src.length : j + 2;
        out += src.slice(i, end);
        i = end;
        continue;
      }

      if (c === "{") { stack.push({ type: objContext() ? "obj" : "block", ternary: 0 }); out += c; push("{"); i++; continue; }
      if (c === "}") { if (stack.length > 1) stack.pop(); out += c; push("}"); i++; continue; }
      if (c === "(") { stack.push({ type: "paren", ternary: 0 }); out += c; push("("); i++; continue; }
      if (c === ")") { if (stack.length > 1) stack.pop(); out += c; push(")"); i++; continue; }
      if (c === "[") { stack.push({ type: "brack", ternary: 0 }); out += c; push("["); i++; continue; }
      if (c === "]") { if (stack.length > 1) stack.pop(); out += c; push("]"); i++; continue; }

      const frame = stack[stack.length - 1];

      if (c === "?") {
        // ?. და ?? — ჩვეულებრივი ოპერატორები
        if (src[i + 1] === "." || src[i + 1] === "?") { out += c; push(c); i++; continue; }
        // არჩევითი თვისების მარკერი: name?:
        if (/^\s*:/.test(src.slice(i + 1, i + 4)) && frame.type !== "obj") { i++; continue; }
        // დანარჩენი — ტერნარული
        frame.ternary++;
        out += c; push(c); i++; continue;
      }

      if (c === ":") {
        if (frame.ternary > 0) { frame.ternary--; out += c; push(":"); i++; continue; }
        // ")" -ის შემდეგ ":" ყოველთვის დაბრუნების ტიპია (მეთოდი ობიექტში/კლასში)
        if (frame.type === "obj" && !/\)$/.test(tail)) { out += c; push(":"); i++; continue; }
        let j = i + 1;
        let d = 0;
        let consumedAny = false;
        while (j < src.length) {
          const ch = src[j];
          if (ch === "{") {
            if (d === 0 && consumedAny) break; // ფუნქციის სხეული იწყება
            d++;
          } else if (ch === "<" || ch === "(" || ch === "[") d++;
          else if (ch === ">" || ch === ")" || ch === "]" || ch === "}") {
            if (d === 0) break;
            d--;
          } else if (d === 0 && (ch === "," || ch === ";" || ch === "=")) break;
          else if (d === 0 && ch === "\n") break;
          if (!/\s/.test(ch)) consumedAny = true;
          j++;
        }
        i = j;
        continue;
      }

      if (!/\s/.test(c)) push(c);
      out += c;
      i++;
    }
    return out;
  }

  // კლასის დეკორატორები: @Component({...}) class X {}  ->  class X {}; X.__meta = {...};
  function stripDecorators(src) {
    let s = src;

    // წევრის დეკორატორები: @Input() x = 1;  @Output() y = ...;  @ViewChild(...) z;
    s = s.replace(/@(Input|Output|ViewChild|ViewChildren|HostListener|HostBinding)\s*\([^)]*\)\s*/g, "");

    // კლასის დეკორატორები
    const re = /@([A-Z][\w$]*)\s*\(/g;
    let m;
    while ((m = re.exec(s))) {
      const decoName = m[1];
      const argStart = m.index + m[0].length - 1; // "(" -ზე
      // დავითვალოთ დაბალანსებული ფრჩხილები
      let d = 0, i = argStart, inStr = null;
      for (; i < s.length; i++) {
        const c = s[i];
        if (inStr) { if (c === inStr && s[i - 1] !== "\\") inStr = null; continue; }
        if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
        if (c === "(") d++;
        else if (c === ")") { d--; if (d === 0) break; }
      }
      const argsRaw = s.slice(argStart + 1, i).trim();
      // დეკორატორის შემდეგ უნდა მოდიოდეს (export)? class Name
      const after = s.slice(i + 1);
      const cm = after.match(/^\s*(?:export\s+)?(?:default\s+)?class\s+([A-Za-z_$][\w$]*)/);
      if (!cm) { re.lastIndex = i + 1; continue; }

      const className = cm[1];
      const classStart = i + 1 + cm.index + cm[0].length - ("class " + className).length;
      // ვიპოვოთ კლასის სხეულის დასასრული
      const bodyOpen = s.indexOf("{", i + 1 + cm.index + cm[0].length);
      let bd = 0, j = bodyOpen;
      for (; j < s.length; j++) {
        if (s[j] === "{") bd++;
        else if (s[j] === "}") { bd--; if (bd === 0) break; }
      }
      const classSrc = s.slice(i + 1 + cm.index, j + 1).replace(/^\s*(?:export\s+)?(?:default\s+)?/, "");
      const meta = argsRaw ? argsRaw : "{}";
      const replacement = classSrc + "\n" + className + ".__meta = " + meta + ";\n" +
        className + ".__deco = " + JSON.stringify(decoName) + ";" +
        (decoName === "Component" ? "\nif (typeof __register === \"function\") __register(" + className + ");" : "");
      s = s.slice(0, m.index) + replacement + s.slice(j + 1);
      re.lastIndex = 0;
    }
    return s;
  }

  // მინი-Angular — სასწავლო runtime (კომპონენტები, შაბლონები, სიგნალები, DI).
  const NG_PREAMBLE = `
var __ng = (function () {
  var __dirty = false;
  var __roots = [];

  function scheduleRender() {
    if (__dirty) return;
    __dirty = true;
    Promise.resolve().then(function () { __dirty = false; __roots.forEach(function (r) { r.render(); }); });
  }

  // Angular-ის ახალი კონტროლის ნაკადი -> შიდა დირექტივები
  function compileControlFlow(tpl) {
    var s = String(tpl);
    var guard = 0;
    while (/@(if|for|switch)\\s*\\(/.test(s) && guard++ < 50) {
      s = compileOne(s);
    }
    return s;
  }

  function findBlock(s, from) {
    // from — "{" -ის ინდექსი; აბრუნებს [start, end] სხეულისთვის
    var d = 0, i = from, inStr = null;
    for (; i < s.length; i++) {
      var c = s[i];
      if (inStr) { if (c === inStr && s[i - 1] !== "\\\\") inStr = null; continue; }
      if (c === '"' || c === "'") { inStr = c; continue; }
      if (c === "{") d++;
      else if (c === "}") { d--; if (d === 0) return [from + 1, i]; }
    }
    return null;
  }

  function matchParen(s, from) {
    var d = 0, i = from, inStr = null;
    for (; i < s.length; i++) {
      var c = s[i];
      if (inStr) { if (c === inStr && s[i - 1] !== "\\\\") inStr = null; continue; }
      if (c === '"' || c === "'") { inStr = c; continue; }
      if (c === "(") d++;
      else if (c === ")") { d--; if (d === 0) return [from + 1, i]; }
    }
    return null;
  }

  function skipWs(s, i) { while (i < s.length && /\\s/.test(s[i])) i++; return i; }

  function compileOne(s) {
    var m = /@(if|for|switch)\\s*\\(/.exec(s);
    if (!m) return s;
    var kind = m[1];
    var parenStart = m.index + m[0].length - 1;
    var pr = matchParen(s, parenStart);
    if (!pr) return s;
    var head = s.slice(pr[0], pr[1]).trim();
    var bodyOpen = skipWs(s, pr[1] + 1);
    if (s[bodyOpen] !== "{") return s;
    var br = findBlock(s, bodyOpen);
    if (!br) return s;
    var body = s.slice(br[0], br[1]);
    var rest = br[1] + 1;
    var out = "";

    if (kind === "if") {
      var conds = [head];
      var bodies = [body];
      var elseBody = null;
      var k = skipWs(s, rest);
      while (s.slice(k, k + 5) === "@else") {
        var afterElse = skipWs(s, k + 5);
        if (s.slice(afterElse, afterElse + 3) === "if " || s.slice(afterElse, afterElse + 3) === "if(") {
          var ep = s.indexOf("(", afterElse);
          var epr = matchParen(s, ep);
          conds.push(s.slice(epr[0], epr[1]).trim());
          var eo = skipWs(s, epr[1] + 1);
          var ebr = findBlock(s, eo);
          bodies.push(s.slice(ebr[0], ebr[1]));
          k = skipWs(s, ebr[1] + 1);
        } else {
          var ebr2 = findBlock(s, afterElse);
          elseBody = s.slice(ebr2[0], ebr2[1]);
          k = skipWs(s, ebr2[1] + 1);
          break;
        }
      }
      rest = k;
      var prev = [];
      for (var i = 0; i < conds.length; i++) {
        var guardExpr = prev.length ? prev.map(function (c) { return "!__u(" + c + ")"; }).join(" && ") + " && __u(" + conds[i] + ")" : "__u(" + conds[i] + ")";
        out += '<ng-b *ngIf="' + esc(guardExpr) + '">' + bodies[i] + "</ng-b>";
        prev.push(conds[i]);
      }
      if (elseBody !== null) {
        var elseGuard = prev.map(function (c) { return "!__u(" + c + ")"; }).join(" && ");
        out += '<ng-b *ngIf="' + esc(elseGuard) + '">' + elseBody + "</ng-b>";
      }
    } else if (kind === "for") {
      // "item of items; track item.id"
      var parts = head.split(";");
      var loop = parts[0].trim().replace(/^let\\s+/, "");
      var mm = /^([A-Za-z_$][\\w$]*)\\s+of\\s+([\\s\\S]+)$/.exec(loop);
      if (!mm) return s.slice(0, m.index) + s.slice(rest);
      var itemName = mm[1];
      var listExpr = mm[2].trim();
      var emptyBody = null;
      var k2 = skipWs(s, rest);
      if (s.slice(k2, k2 + 6) === "@empty") {
        var eo2 = skipWs(s, k2 + 6);
        var ebr3 = findBlock(s, eo2);
        emptyBody = s.slice(ebr3[0], ebr3[1]);
        k2 = skipWs(s, ebr3[1] + 1);
      }
      rest = k2;
      out += '<ng-b *ngFor="let ' + itemName + " of " + esc(listExpr) + '">' + body + "</ng-b>";
      if (emptyBody !== null) {
        out += '<ng-b *ngIf="__empty(' + esc(listExpr) + ')">' + emptyBody + "</ng-b>";
      }
    } else if (kind === "switch") {
      var cases = [];
      var defBody = null;
      var inner = body;
      var pos = 0;
      while (pos < inner.length) {
        var cm = /@(case|default)\\s*/.exec(inner.slice(pos));
        if (!cm) break;
        var abs = pos + cm.index;
        if (cm[1] === "case") {
          var cp = inner.indexOf("(", abs);
          var cpr = matchParen(inner, cp);
          var val = inner.slice(cpr[0], cpr[1]).trim();
          var co = skipWs(inner, cpr[1] + 1);
          if (inner[co] !== "{") { cases.push({ v: val, body: null }); pos = co; continue; }
          var cbr = findBlock(inner, co);
          cases.push({ v: val, body: inner.slice(cbr[0], cbr[1]) });
          pos = cbr[1] + 1;
        } else {
          var dOpen = skipWs(inner, abs + cm[0].length);
          var dbr = findBlock(inner, dOpen);
          defBody = inner.slice(dbr[0], dbr[1]);
          pos = dbr[1] + 1;
        }
      }
      var allVals = [];
      var pending = [];
      cases.forEach(function (c) {
        pending.push(c.v);
        allVals.push(c.v);
        if (c.body === null) return;
        var cond = pending.map(function (v) { return "__u(" + head + ") === " + v; }).join(" || ");
        out += '<ng-b *ngIf="' + esc(cond) + '">' + c.body + "</ng-b>";
        pending = [];
      });
      if (defBody !== null) {
        var dCond = allVals.map(function (v) { return "__u(" + head + ") !== " + v; }).join(" && ") || "true";
        out += '<ng-b *ngIf="' + esc(dCond) + '">' + defBody + "</ng-b>";
      }
    }
    return s.slice(0, m.index) + out + s.slice(rest);
  }

  function esc(v) { return String(v).replace(/"/g, "&quot;"); }

  // ---------- სიგნალები ----------
  function signal(initial) {
    var value = initial;
    var s = function () { return value; };
    s.set = function (v) { value = v; scheduleRender(); };
    s.update = function (fn) { s.set(fn(value)); };
    s.__signal = true;
    return s;
  }
  function computed(fn) {
    var c = function () { return fn(); };
    c.__signal = true;
    c.__computed = true;
    return c;
  }
  function effect(fn) { fn(); return { destroy: function () {} }; }

  // სიგნალის გახსნა (თუ ფუნქციაა — გამოვიძახოთ)
  function __u(v) { return typeof v === "function" ? v() : v; }
  function __empty(v) {
    var list = __u(v);
    return !list || list.length === 0;
  }

  // ---------- სიგნალური input / output / model ----------
  function input(initial) {
    var s = signal(initial);
    var reader = function () { return s(); };
    reader.__signal = true;
    reader.__input = true;
    reader.set = function (v) { s.set(v); };
    return reader;
  }
  input.required = function () {
    var r = input(undefined);
    r.__required = true;
    return r;
  };
  function output() {
    var em = new EventEmitter();
    var fn = function () { return em; };
    fn.__output = true;
    fn.emit = function (v) { em.emit(v); };
    fn.subscribe = function (cb) { return em.subscribe(cb); };
    return fn;
  }
  function model(initial) {
    var s = signal(initial);
    var reader = function () { return s(); };
    reader.__signal = true;
    reader.__model = true;
    reader.set = function (v) { s.set(v); };
    reader.update = function (f) { s.set(f(s())); };
    return reader;
  }

  // ---------- DI ----------
  var __instances = new Map();
  function inject(token) {
    if (!__instances.has(token)) __instances.set(token, new token());
    return __instances.get(token);
  }
  function provide(token, instance) { __instances.set(token, instance); }
  function __resetDI() { __instances = new Map(); }

  // ---------- EventEmitter ----------
  function EventEmitter() { this.__subs = []; }
  EventEmitter.prototype.subscribe = function (fn) {
    this.__subs.push(fn);
    var self = this;
    return { unsubscribe: function () { self.__subs = self.__subs.filter(function (f) { return f !== fn; }); } };
  };
  EventEmitter.prototype.emit = function (v) {
    this.__subs.slice().forEach(function (f) { f(v); });
  };

  // ---------- გამოსახულების გამოთვლა ----------
  function evaluate(expr, ctx, locals) {
    try {
      var fn = new Function("__ctx", "__locals",
        "with (__locals) { with (__ctx) { return (" + expr + "); } }");
      return fn(ctx, locals || {});
    } catch (e) { return undefined; }
  }
  function runStatement(expr, ctx, locals) {
    try {
      var fn = new Function("__ctx", "__locals", "$event",
        "with (__locals) { with (__ctx) { " + expr + "; } }");
      return fn(ctx, locals || {}, arguments[3]);
    } catch (e) { console.log("შეცდომა შაბლონში:", e.message); }
  }

  function interpolate(text, ctx, locals) {
    return text.replace(/\\{\\{([^}]+)\\}\\}/g, function (m, expr) {
      var v = evaluate(expr.trim(), ctx, locals);
      if (v === undefined || v === null) return "";
      if (typeof v === "object") { try { return JSON.stringify(v); } catch (e) { return String(v); } }
      return String(v);
    });
  }

  // ---------- კომპონენტების რეესტრი ----------
  var __components = [];
  // შვილი კომპონენტების ინსტანციები ინახება, რომ რენდერზე მდგომარეობა არ დაიკარგოს
  var __childInstances = {};
  var __childCounter = {};
  function registerComponent(cls) {
    if (cls && cls.__meta && cls.__meta.selector) __components.push(cls);
  }
  function findComponent(tagName) {
    var t = String(tagName).toLowerCase();
    for (var i = 0; i < __components.length; i++) {
      if (String(__components[i].__meta.selector).toLowerCase() === t) return __components[i];
    }
    return null;
  }

  // ---------- რენდერი ----------
  function renderInto(host, tpl, ctx, locals) {
    host.innerHTML = compileControlFlow(tpl);
    processChildren(host, ctx, locals || {});
    unwrapBlocks(host);
  }

  // <ng-b> მხოლოდ შიდა ჩარჩოა — შედეგში არ უნდა დარჩეს
  function unwrapBlocks(root) {
    var blocks = [].slice.call(root.querySelectorAll("ng-b"));
    blocks.forEach(function (b) {
      var parent = b.parentNode;
      if (!parent) return;
      while (b.firstChild) parent.insertBefore(b.firstChild, b);
      parent.removeChild(b);
    });
  }

  function processChildren(parent, ctx, locals) {
    var nodes = [].slice.call(parent.childNodes);
    nodes.forEach(function (node) { processNode(node, ctx, locals); });
  }

  function processNode(node, ctx, locals) {
    if (node.nodeType === 3) {
      if (node.nodeValue.indexOf("{{") !== -1) {
        node.nodeValue = interpolate(node.nodeValue, ctx, locals);
      }
      return;
    }
    if (node.nodeType !== 1) return;

    // *ngFor
    var forExpr = node.getAttribute && node.getAttribute("*ngFor");
    if (forExpr) {
      node.removeAttribute("*ngFor");
      var m = forExpr.match(/let\\s+([A-Za-z_$][\\w$]*)\\s+of\\s+(.+)/);
      if (m) {
        var itemName = m[1];
        var listExpr = m[2].trim();
        var list = evaluate(listExpr, ctx, locals) || [];
        if (typeof list === "function") list = list();
        var parentEl = node.parentNode;
        var frag = document.createDocumentFragment();
        [].slice.call(list).forEach(function (item, index) {
          var clone = node.cloneNode(true);
          var childLocals = Object.create(locals);
          childLocals[itemName] = item;
          childLocals["$index"] = index;
          processNode(clone, ctx, childLocals);
          frag.appendChild(clone);
        });
        parentEl.replaceChild(frag, node);
      }
      return;
    }

    // *ngIf
    var ifExpr = node.getAttribute && node.getAttribute("*ngIf");
    if (ifExpr) {
      node.removeAttribute("*ngIf");
      var cond = evaluate(ifExpr, ctx, locals);
      if (typeof cond === "function") cond = cond();
      if (!cond) { node.parentNode.removeChild(node); return; }
    }

    // ატრიბუტები: [prop]="expr" და (event)="stmt"
    var attrs = [].slice.call(node.attributes || []);
    attrs.forEach(function (a) {
      var name = a.name;
      var val = a.value;
      if (name[0] === "[" && name[name.length - 1] === "]") {
        var prop = name.slice(1, -1);
        var v = evaluate(val, ctx, locals);
        if (typeof v === "function" && v.__signal) v = v();
        node.removeAttribute(name);
        if (prop.indexOf("class.") === 0) {
          var cls = prop.slice(6);
          if (v) node.classList.add(cls); else node.classList.remove(cls);
          return;
        }
        if (prop.indexOf("style.") === 0) {
          var rest = prop.slice(6).split(".");
          var styleProp = rest[0];
          var unit = rest[1] || "";
          try { node.style[styleProp] = (v === undefined || v === null) ? "" : v + unit; } catch (e) {}
          return;
        }
        if (prop === "class" || prop === "id" || prop === "src" || prop === "href" || prop === "title" || prop === "alt") {
          if (v !== undefined && v !== null) node.setAttribute(prop, v);
        } else if (prop === "disabled" || prop === "checked") {
          if (v) node.setAttribute(prop, ""); else node.removeAttribute(prop);
          node[prop] = !!v;
        } else {
          try { node[prop] = v; } catch (e) { node.setAttribute(prop, v); }
        }
        node.__bound = node.__bound || {};
        node.__bound[prop] = v;
      } else if (name[0] === "(" && name[name.length - 1] === ")") {
        var ev = name.slice(1, -1);
        node.removeAttribute(name);
        (function (statement, evName) {
          node.addEventListener(evName, function (e) {
            runStatement(statement, ctx, locals, e);
            scheduleRender();
          });
        })(val, ev);
      } else if (val && val.indexOf("{{") !== -1) {
        node.setAttribute(name, interpolate(val, ctx, locals));
      }
    });

    // შვილი კომპონენტი
    var childCls = findComponent(node.tagName);
    if (childCls) {
      var __sel = String(childCls.__meta.selector).toLowerCase();
      var __idx = (__childCounter[__sel] = (__childCounter[__sel] || 0) + 1) - 1;
      var __key = __sel + "#" + __idx;
      var instance = __childInstances[__key];
      var __isNew = !instance;
      if (__isNew) {
        instance = new childCls();
        __childInstances[__key] = instance;
      }
      // @Input-ები [prop] ბმულებიდან
      if (node.__bound) {
        Object.keys(node.__bound).forEach(function (k) {
          var cur = instance[k];
          var incoming = node.__bound[k];
          instance.__lastBound = instance.__lastBound || {};
          if (typeof cur === "function" && (cur.__input || cur.__model)) {
            // ვაწესებთ მხოლოდ მაშინ, როცა მშობლის მნიშვნელობა შეიცვალა —
            // თორემ model()-ის შიდა ცვლილებას ყოველ რენდერზე გადავაწერდით
            if (!(k in instance.__lastBound) || instance.__lastBound[k] !== incoming) {
              instance.__lastBound[k] = incoming;
              if (cur() !== incoming) cur.set(incoming);
            }
          } else {
            instance[k] = incoming;
          }
        });
      }
      if (__isNew && typeof instance.ngOnInit === "function") instance.ngOnInit();
      renderInto(node, childCls.__meta.template || "", instance, {});
      return;
    }

    processChildren(node, ctx, locals);
  }

  // ---------- bootstrap ----------
  function bootstrap(cls, hostSelector) {
    var host = document.querySelector(hostSelector || "#app");
    if (!host) { console.log("ჰოსტი ვერ მოიძებნა:", hostSelector); return null; }
    __childInstances = {};
    __childCounter = {};
    var instance = new cls();
    if (typeof instance.ngOnInit === "function") instance.ngOnInit();
    var root = {
      instance: instance,
      render: function () {
        __childCounter = {};
        renderInto(host, cls.__meta.template || "", instance, {});
      }
    };
    __roots = [root];
    root.render();
    return instance;
  }

  function __html(sel) {
    var el = document.querySelector(sel || "#app");
    return el ? el.innerHTML.replace(/\\s+/g, " ").trim() : "";
  }
  function __text(sel) {
    var el = document.querySelector(sel || "#app");
    return el ? el.textContent.replace(/\\s+/g, " ").trim() : "";
  }
  function __flush() {
    // რენდერი მიკროამოცანაა — რამდენიმე ბიჯი საკმარისია (ტაიმერს არ ველოდებით)
    return Promise.resolve().then(function () {}).then(function () {}).then(function () {});
  }
  function __click(sel) {
    var el = document.querySelector(sel);
    if (el) el.click();
    return __flush();
  }
  function __tick() { return __flush(); }

  return {
    signal: signal, computed: computed, effect: effect,
    input: input, output: output, model: model, u: __u, empty: __empty,
    inject: inject, provide: provide, resetDI: __resetDI,
    EventEmitter: EventEmitter,
    registerComponent: registerComponent,
    bootstrap: bootstrap,
    html: __html, text: __text, click: __click, tick: __tick
  };
})();

var signal = __ng.signal;
var computed = __ng.computed;
var effect = __ng.effect;
var input = __ng.input;
var output = __ng.output;
var model = __ng.model;
// შაბლონის გამოსახულებები new Function-ით სრულდება, რომელიც მხოლოდ გლობალურ სკოუპს ხედავს
window.__u = __ng.u;
window.__empty = __ng.empty;
var __u = window.__u;
var __empty = window.__empty;
var inject = __ng.inject;
var provide = __ng.provide;
var EventEmitter = __ng.EventEmitter;
var bootstrapApplication = function (cls, host) { return __ng.bootstrap(cls, host); };
var __html = __ng.html;
var __text = __ng.text;
var __click = __ng.click;
var __tick = __ng.tick;
var __register = __ng.registerComponent;
`;

  function createAngularPlayground(starter, testSource, onResult) {
    return createJsPlayground(starter, testSource, onResult, {
      preamble: NG_PREAMBLE,
      transform: function (code) { return stripTypes(stripDecorators(code)); },
      exposeSource: true,
      html: '<div id="app"></div>',
      label: "Angular — დაწერე და გაუშვი",
    });
  }

  // Node.js-ის სიმულატორი — ბრაუზერში fs/http/require არ არსებობს, ამიტომ ვქმნით სასწავლო გარემოს.
  const NODE_PREAMBLE = `
var __node = (function(){
var __files = {
  "/app/data.txt": "გამარჯობა, Node!",
  "/app/users.json": '[{"saxeli":"ელენე","asaki":20},{"saxeli":"ნატალი","asaki":22}]',
  "/app/notes/todo.txt": "1. ისწავლე Node"
};
var __dirs = { "/app": true, "/app/notes": true };

function __norm(p) {
  p = String(p);
  if (p.indexOf("/") !== 0) p = "/app/" + p.replace(/^\\.\\//, "");
  return p.replace(/\\/+/g, "/");
}
function __enoent(p, op) {
  var e = new Error("ENOENT: no such file or directory, " + op + " '" + p + "'");
  e.code = "ENOENT";
  return e;
}

var path = {
  sep: "/",
  join: function () {
    var parts = [].slice.call(arguments).filter(Boolean);
    var joined = parts.join("/").replace(/\\/+/g, "/");
    var out = [];
    joined.split("/").forEach(function (seg) {
      if (seg === "..") out.pop();
      else if (seg !== "." ) out.push(seg);
    });
    return out.join("/");
  },
  basename: function (p, ext) {
    var b = String(p).split("/").pop();
    if (ext && b.slice(-ext.length) === ext) b = b.slice(0, -ext.length);
    return b;
  },
  extname: function (p) {
    var b = String(p).split("/").pop();
    var i = b.lastIndexOf(".");
    return i > 0 ? b.slice(i) : "";
  },
  dirname: function (p) {
    var parts = String(p).split("/");
    parts.pop();
    return parts.join("/") || "/";
  },
  resolve: function () {
    var p = [].slice.call(arguments).join("/");
    return __norm(p);
  }
};

var fs = {
  readFileSync: function (p, enc) {
    var f = __norm(p);
    if (!(f in __files)) throw __enoent(f, "open");
    return __files[f];
  },
  writeFileSync: function (p, data) { __files[__norm(p)] = String(data); },
  appendFileSync: function (p, data) {
    var f = __norm(p);
    __files[f] = (__files[f] || "") + String(data);
  },
  existsSync: function (p) { var f = __norm(p); return (f in __files) || (f in __dirs); },
  unlinkSync: function (p) { delete __files[__norm(p)]; },
  mkdirSync: function (p) { __dirs[__norm(p)] = true; },
  readdirSync: function (p) {
    var d = __norm(p).replace(/\\/$/, "");
    var out = [];
    Object.keys(__files).forEach(function (f) {
      if (path.dirname(f) === d) out.push(path.basename(f));
    });
    Object.keys(__dirs).forEach(function (f) {
      if (f !== d && path.dirname(f) === d) out.push(path.basename(f));
    });
    return out.sort();
  },
  readFile: function (p, enc, cb) {
    if (typeof enc === "function") { cb = enc; }
    setTimeout(function () {
      var f = __norm(p);
      if (!(f in __files)) return cb(__enoent(f, "open"), null);
      cb(null, __files[f]);
    }, 0);
  },
  writeFile: function (p, data, cb) {
    if (typeof cb !== "function") cb = function () {};
    setTimeout(function () { __files[__norm(p)] = String(data); cb(null); }, 0);
  },
  promises: {
    readFile: function (p) {
      return new Promise(function (res, rej) {
        var f = __norm(p);
        if (!(f in __files)) rej(__enoent(f, "open")); else res(__files[f]);
      });
    },
    writeFile: function (p, data) {
      return new Promise(function (res) { __files[__norm(p)] = String(data); res(); });
    },
    readdir: function (p) { return Promise.resolve(fs.readdirSync(p)); }
  }
};

var os = {
  platform: function () { return "linux"; },
  homedir: function () { return "/home/user"; },
  cpus: function () { return [{}, {}, {}, {}]; },
  totalmem: function () { return 8589934592; },
  EOL: "\\n"
};

function EventEmitter() { this._e = {}; }
EventEmitter.prototype.on = function (n, f) { (this._e[n] = this._e[n] || []).push(f); return this; };
EventEmitter.prototype.once = function (n, f) {
  var self = this;
  function g() { self.off(n, g); f.apply(null, arguments); }
  return this.on(n, g);
};
EventEmitter.prototype.off = function (n, f) {
  this._e[n] = (this._e[n] || []).filter(function (x) { return x !== f; });
  return this;
};
EventEmitter.prototype.emit = function (n) {
  var args = [].slice.call(arguments, 1);
  (this._e[n] || []).slice().forEach(function (f) { f.apply(null, args); });
  return (this._e[n] || []).length > 0;
};
EventEmitter.prototype.listenerCount = function (n) { return (this._e[n] || []).length; };
var events = { EventEmitter: EventEmitter };

var __server = null;
var http = {
  createServer: function (handler) {
    __server = handler;
    return {
      listen: function (port, cb) { if (typeof cb === "function") cb(); return this; },
      close: function () { __server = null; }
    };
  },
  STATUS_CODES: { 200: "OK", 404: "Not Found", 500: "Internal Server Error" }
};

// მოთხოვნის სიმულაცია სერვერზე (ტესტებისთვისაც და სასწავლოდაც)
function __request(method, url, body) {
  return new Promise(function (resolve) {
    var chunks = [];
    var res = {
      statusCode: 200,
      _headers: {},
      setHeader: function (k, v) { this._headers[k.toLowerCase()] = v; },
      getHeader: function (k) { return this._headers[k.toLowerCase()]; },
      writeHead: function (code, headers) {
        this.statusCode = code;
        if (headers) for (var k in headers) this._headers[k.toLowerCase()] = headers[k];
        return this;
      },
      write: function (c) { chunks.push(String(c)); return true; },
      end: function (c) {
        if (c !== undefined) chunks.push(String(c));
        resolve({ status: this.statusCode, headers: this._headers, body: chunks.join("") });
      },
      json: function (o) {
        this._headers["content-type"] = "application/json";
        this.end(JSON.stringify(o));
      },
      send: function (c) { this.end(typeof c === "object" ? JSON.stringify(c) : c); },
      status: function (c) { this.statusCode = c; return this; }
    };
    var req = {
      method: (method || "GET").toUpperCase(),
      url: url || "/",
      headers: { host: "localhost:3000" },
      body: body,
      _data: body === undefined ? "" : (typeof body === "string" ? body : JSON.stringify(body)),
      on: function (ev, cb) {
        var self = this;
        if (ev === "data") { if (self._data) setTimeout(function () { cb(self._data); }, 0); }
        if (ev === "end") setTimeout(function () { cb(); }, 1);
        return this;
      }
    };
    if (__expressApp) { __expressApp.__handle(req, res); }
    else if (__server) { __server(req, res); }
    else { resolve({ status: 0, headers: {}, body: "სერვერი არ არის შექმნილი" }); }
  });
}

// მინი-Express
var __expressApp = null;
function express() {
  var routes = [];
  var mws = [];
  var errMws = [];
  function app() {}
  ["get", "post", "put", "delete", "patch"].forEach(function (m) {
    app[m] = function (p, h) { routes.push({ m: m.toUpperCase(), p: p, h: h }); return app; };
  });
  app.use = function (a, b) {
    var h = typeof a === "function" ? a : b;
    var p = typeof a === "function" ? null : a;
    if (h && h.length === 4) errMws.push({ p: p, h: h });
    else mws.push({ p: p, h: h });
    return app;
  };
  app.listen = function (port, cb) { __expressApp = app; if (typeof cb === "function") cb(); return { close: function () {} }; };
  app.__handle = function (req, res) {
    var url = req.url.split("?")[0];
    var query = {};
    var qs = req.url.split("?")[1];
    if (qs) qs.split("&").forEach(function (kv) {
      var pair = kv.split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    });
    req.query = query;
    if (typeof req.body === "string" && req.headers["content-type"] === "application/json") {
      try { req.body = JSON.parse(req.body); } catch (e) {}
    }

    var i = 0;
    function fail(err) {
      var j = 0;
      function nextErr(e) {
        var current = e || err;
        while (j < errMws.length) {
          var mw = errMws[j++];
          if (mw.p && url.indexOf(mw.p) !== 0) continue;
          try { return mw.h(current, req, res, nextErr); }
          catch (thrown) { current = thrown; }
        }
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
      nextErr(err);
    }
    function nextMw(err) {
      if (err) return fail(err);
      if (i < mws.length) {
        var mw = mws[i++];
        if (mw.p && url.indexOf(mw.p) !== 0) return nextMw();
        try { return mw.h(req, res, nextMw); } catch (e) { return fail(e); }
      }
      dispatch();
    }
    function dispatch() {
      for (var k = 0; k < routes.length; k++) {
        var r = routes[k];
        if (r.m !== req.method) continue;
        var params = __match(r.p, url);
        if (params) {
          req.params = params;
          try { return r.h(req, res, nextMw); } catch (e) { return fail(e); }
        }
      }
      res.statusCode = 404;
      res.end("Cannot " + req.method + " " + url);
    }
    nextMw();
  };
  return app;
}
express.json = function () {
  return function (req, res, next) {
    if (typeof req.body === "string" && req.body) {
      try { req.body = JSON.parse(req.body); } catch (e) {}
    }
    next();
  };
};
express.Router = function () { return express(); };

function __match(pattern, url) {
  var pp = pattern.split("/").filter(Boolean);
  var up = url.split("/").filter(Boolean);
  if (pp.length !== up.length) return null;
  var params = {};
  for (var i = 0; i < pp.length; i++) {
    if (pp[i][0] === ":") params[pp[i].slice(1)] = decodeURIComponent(up[i]);
    else if (pp[i] !== up[i]) return null;
  }
  return params;
}

var process = {
  argv: ["node", "/app/index.js"],
  env: { NODE_ENV: "development", PORT: "3000" },
  platform: "linux",
  version: "v20.11.0",
  cwd: function () { return "/app"; },
  exit: function () {},
  on: function () {},
  memoryUsage: function () { return { heapUsed: 4194304 }; }
};

var module = { exports: {} };

// წინასწარ მომზადებული ლოკალური მოდულები
var __localModules = {
  "./math": (function () { var m = { exports: {} };
    m.exports.add = function (a, b) { return a + b; };
    m.exports.multiply = function (a, b) { return a * b; };
    return m.exports; })(),
  "./config": { port: 3000, host: "localhost" }
};

function __require(name) {
  switch (name) {
    case "fs": return fs;
    case "fs/promises": return fs.promises;
    case "path": return path;
    case "os": return os;
    case "events": return events;
    case "http": return http;
    case "express": return express;
    default:
      if (name in __localModules) return __localModules[name];
      var e = new Error("Cannot find module '" + name + "'");
      e.code = "MODULE_NOT_FOUND";
      throw e;
  }
}

return { require: __require, process: process, module: module, request: __request, files: __files };
})();

var require = __node.require;
var process = __node.process;
var module = __node.module;
var exports = module.exports;
var __request = __node.request;
var __files = __node.files;
var __dirname = "/app";
var __filename = "/app/index.js";
`;

  function createNodePlayground(starter, testSource, onResult) {
    return createJsPlayground(starter, testSource, onResult, {
      preamble: NODE_PREAMBLE,
      label: "Node.js — დაწერე და გაუშვი",
    });
  }

  // TypeScript პლეიგრაუნდი: ტიპებს ჭრის და შედეგს JS-ის გამშვებში უშვებს.
  // ტესტს ორიგინალი TS წყარო __src ცვლადში მიეწოდება — ტიპების შემოწმებისთვის.
  function createTsPlayground(starter, testSource, onResult) {
    return createJsPlayground(starter, testSource, onResult, {
      transform: stripTypes,
      exposeSource: true,
      label: "TypeScript — დაწერე და გაუშვი",
    });
  }

  // დამხმარეები CSS-ის შესამოწმებლად
  function rgbOf(color) {
    const m = String(color).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const parts = m[1].split(",").map(function (n) {
      return Math.round(parseFloat(n));
    });
    return { r: parts[0], g: parts[1], b: parts[2] };
  }

  function isColorNear(actual, r, g, b, tolerance) {
    const c = rgbOf(actual);
    if (!c) return false;
    const t = tolerance === undefined ? 40 : tolerance;
    return Math.abs(c.r - r) <= t && Math.abs(c.g - g) <= t && Math.abs(c.b - b) <= t;
  }

  function createInfoBox(title, text) {
    return el("div", { className: "info-box" }, [
      el("strong", { text: title }, []),
      el("p", { text }, []),
    ]);
  }

  // ==================== პლატფორმა: რაუტინგი და ხედები ====================

  function parseRoute() {
    const raw = (window.location.hash || "").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean);
    return { view: parts[0] || "home", chapter: parts[1] || null, lesson: parts[2] || null };
  }

  function setHash(view, chapter, lesson) {
    let h = "#/" + view;
    if (chapter) h += "/" + chapter;
    if (lesson) h += "/" + lesson;
    if (h !== window.location.hash) {
      try {
        window.history.replaceState(null, "", h);
      } catch (e) {
        window.location.hash = h.replace(/^#/, "");
      }
    }
  }

  function navigate(view, chapter, lesson) {
    setHash(view, chapter, lesson);
    render();
  }

  function lessonIndexById(chapterId, id) {
    return lessonsFor(chapterId).findIndex(function (l) {
      return l.id === id;
    });
  }

  function render() {
    if (cleanupCurrentLesson) {
      cleanupCurrentLesson();
      cleanupCurrentLesson = null;
    }
    refreshSidebar = null;

    const route = parseRoute();
    renderTopNav(route.view);
    appMain.innerHTML = "";
    appMain.className = "app-main view-" + route.view;

    if (route.view === "course") {
      appMain.append(renderCourseOrAssignments(route, "course"));
    } else if (route.view === "assignments") {
      appMain.append(renderCourseOrAssignments(route, "assignments"));
    } else if (route.view === "resources") {
      appMain.append(renderResources());
    } else {
      appMain.append(renderHome());
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function renderTopNav(active) {
    topNav.innerHTML = "";
    NAV.forEach(function (item) {
      topNav.append(
        el("button", {
          className: "top-nav-item" + (item.id === active ? " is-active" : ""),
          attrs: { type: "button" },
          text: item.label,
          on: {
            click: function () {
              if (item.id === "course" || item.id === "assignments") {
                navigate(item.id, "cfz", null);
              } else {
                navigate(item.id, null, null);
              }
            },
          },
        })
      );
    });
  }

  // ერთი მარცხენა ნავიგაცია — კურსსა და დავალებებში იდენტური.
  function renderChapterSidebar(mode, activeChapter, activeLesson) {
    const list = el("ol", { className: "chapter-list" });
    CHAPTERS.forEach(function (ch, i) {
      const isActive = ch.id === activeChapter;
      const head = el("button", {
        className:
          "chapter-head" + (isActive ? " is-active" : "") + (ch.available ? "" : " is-locked"),
        attrs: { type: "button" },
        on: {
          click: function () {
            navigate(mode, ch.id, null);
          },
        },
      }, [
        el("span", { className: "chapter-num", text: String(i + 1) }),
        el("span", { className: "chapter-name", text: ch.title }),
        ch.available ? null : el("span", { className: "chapter-lock", text: "მალე" }),
      ]);
      const item = el("li", { className: "chapter-item" }, [head]);

      const chLessons = lessonsFor(ch.id);
      const doneSet = mode === "assignments" ? completedAssignments : completedLessons;
      if (isActive && ch.available && chLessons.length) {
        const sub = el("ul", { className: "lesson-sublist" });
        chLessons.forEach(function (lesson, li) {
          const done = doneSet.has(lesson.id);
          const btn = el("button", {
            className:
              "lesson-subitem" +
              (lesson.id === activeLesson ? " is-active" : "") +
              (done ? " is-done" : ""),
            attrs: { type: "button" },
            on: {
              click: function () {
                navigate(mode, ch.id, lesson.id);
              },
            },
          }, [
            el("span", { className: "lesson-subnum", text: String(li + 1) }),
            el("span", { className: "lesson-subtitle", text: lesson.shortTitle || lesson.title }),
            done ? el("span", { className: "lesson-subcheck", attrs: { "aria-label": "დასრულებულია" }, text: "✓" }) : null,
          ]);
          sub.append(el("li", {}, [btn]));
        });
        item.append(sub);
      }
      list.append(item);
    });

    const aside = el("aside", { className: "chapter-sidebar", attrs: { "aria-label": "თავები" } });
    if (lessonsFor(activeChapter).length) {
      aside.append(renderProgressSummary(activeChapter, mode));
    }
    aside.append(list);
    return aside;
  }

  function renderProgressSummary(chapterId, mode) {
    const chLessons = lessonsFor(chapterId);
    const set = mode === "assignments" ? completedAssignments : completedLessons;
    const total = chLessons.length;
    const done = chLessons.filter(function (l) {
      return set.has(l.id);
    }).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const fill = el("div", { className: "progress-fill" });
    fill.style.width = percent + "%";
    const caption = mode === "assignments" ? " დავალება შესრულებული" : " გაკვეთილი დასრულებული";
    return el("div", { className: "progress-summary" }, [
      el("div", {
        className: "progress-track",
        attrs: { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(percent), "aria-label": "პროგრესი" },
      }, [fill]),
      el("p", { className: "progress-caption", text: done + " / " + total + caption }),
      el("button", {
        className: "progress-reset",
        attrs: { type: "button" },
        text: "პროგრესის განულება",
        on: {
          click: function () {
            if (mode === "assignments") {
              chLessons.forEach(function (l) { completedAssignments.delete(l.id); });
              saveAssignments();
            } else {
              chLessons.forEach(function (l) { completedLessons.delete(l.id); });
              saveProgress();
            }
            if (refreshSidebar) refreshSidebar();
          },
        },
      }),
    ]);
  }

  function renderCourseOrAssignments(route, mode) {
    const chapterId = route.chapter || "cfz";
    const chapter = CHAPTERS.find(function (c) {
      return c.id === chapterId;
    }) || CHAPTERS[0];

    const layout = el("div", { className: "platform-layout" });

    function buildSidebar() {
      return renderChapterSidebar(mode, chapterId, route.lesson);
    }
    let sidebarEl = buildSidebar();
    refreshSidebar = function () {
      const fresh = buildSidebar();
      sidebarEl.replaceWith(fresh);
      sidebarEl = fresh;
    };

    const chLessons = lessonsFor(chapterId);
    const index = route.lesson
      ? chLessons.findIndex(function (l) {
          return l.id === route.lesson;
        })
      : -1;

    let content;
    if (!chapter.available || !chLessons.length) {
      content = renderChapterPlaceholder(chapter, mode);
    } else if (index >= 0) {
      content =
        mode === "course"
          ? renderLessonPanel(chLessons[index], index, chLessons, chapterId)
          : renderExercisePanel(chLessons[index], index, chLessons, chapterId);
    } else {
      content = renderChapterOverview(mode, chapter, chLessons);
    }

    layout.append(sidebarEl, el("div", { className: "platform-content" }, [content]));
    return layout;
  }

  function renderChapterPlaceholder(chapter, mode) {
    return el("div", { className: "chapter-placeholder" }, [
      el("div", { className: "section-band" }, [
        el("p", { className: "lesson-kicker", text: "მალე დაემატება" }),
        el("h2", { text: chapter.title }),
        el("p", { className: "state-note", text: "ეს თავი ჯერ არ არის ხელმისაწვდომი. ამჟამად შეგიძლია გაიარო „კომპიუტერი ნულიდან“." }),
        createButton("კომპიუტერი ნულიდან", "primary", function () {
          navigate(mode, "cfz", null);
        }),
      ]),
    ]);
  }

  function renderChapterOverview(mode, chapter, chLessons) {
    const chapterNo = CHAPTERS.findIndex(function (c) {
      return c.id === chapter.id;
    }) + 1;
    const heading = mode === "course" ? "აირჩიე გაკვეთილი" : "აირჩიე გაკვეთილის დავალებები";
    const desc =
      mode === "course"
        ? chLessons.length + " ინტერაქტიული გაკვეთილი. აირჩიე გაკვეთილი მარცხნივ ან დაიწყე თავიდან."
        : "თითო გაკვეთილს აქვს თავისი დავალებები. აირჩიე გაკვეთილი მარცხენა ჩამონათვალიდან.";
    return el("div", { className: "chapter-overview" }, [
      el("div", { className: "section-band" }, [
        el("p", { className: "lesson-kicker", text: "თავი " + chapterNo + " · " + chapter.title }),
        el("h2", { text: heading }),
        el("p", { className: "state-note", text: desc }),
        chLessons[0]
          ? createButton("პირველი გაკვეთილი", "primary", function () {
              navigate(mode, chapter.id, chLessons[0].id);
            })
          : null,
      ]),
    ]);
  }

  function buildVisualBand(lesson) {
    if (!lesson.illustration && !lesson.photo) return null;
    const grid = el("div", { className: "visual-grid" });
    if (lesson.illustration) {
      const holder = el("div", { className: "lesson-illustration" });
      holder.innerHTML = lesson.illustration;
      grid.append(holder);
    }
    if (lesson.photo) {
      const p = lesson.photo;
      const img = el("img", {
        className: "lesson-photo-img",
        attrs: { src: p.src, alt: p.alt || "", loading: "lazy" },
      });
      const cap = el("figcaption", { className: "lesson-photo-cap" }, [
        el("span", { text: p.caption || "" }),
        p.credit
          ? el("span", { className: "photo-credit" }, [
              p.creditUrl
                ? el("a", {
                    attrs: { href: p.creditUrl, target: "_blank", rel: "noopener noreferrer" },
                    text: "📷 " + p.credit,
                  })
                : el("span", { text: "📷 " + p.credit }),
            ])
          : null,
      ]);
      grid.append(el("figure", { className: "lesson-photo" }, [img, cap]));
    }
    return el("section", { className: "section-band visual-band" }, [
      el("h3", { text: "ვიზუალი" }),
      grid,
    ]);
  }

  function buildExtras(lesson) {
    const hasEx = lesson.examples && lesson.examples.length;
    const hasRes = lesson.resources && lesson.resources.length;
    if (!hasEx && !hasRes) return null;
    const children = [el("h3", { text: "მაგალითები და რესურსები" })];
    if (hasEx) {
      children.push(
        el("div", { className: "extras-block" }, [
          el("h4", { text: "სად ხვდები რეალურ ცხოვრებაში" }),
          el("ul", { className: "examples-list" }, lesson.examples.map(function (x) {
            return el("li", { text: x });
          })),
        ])
      );
    }
    if (hasRes) {
      children.push(
        el("div", { className: "extras-block" }, [
          el("h4", { text: "ღრმად ჩასაწვდომად" }),
          el("ul", { className: "resource-links" }, lesson.resources.map(function (r) {
            return el("li", {}, [
              el("a", {
                attrs: { href: r.href, target: "_blank", rel: "noopener noreferrer" },
                text: r.label,
              }),
            ]);
          })),
        ])
      );
    }
    return el("section", { className: "section-band" }, children);
  }

  // დასრულების ბარი — ცხადი გადამრთველი გაკვეთილზეც და დავალებაზეც.
  function buildDoneBar(opts) {
    const status = el("div", { className: "done-status" }, [
      el("span", { className: "done-icon" }, []),
      el("span", { className: "done-text" }, []),
    ]);
    const button = createButton("", "primary", function () {
      const now = opts.onToggle();
      paint(now);
    });
    const bar = el("section", { className: "section-band done-bar" }, [status, button]);

    function paint(done) {
      bar.classList.toggle("is-done", done);
      status.querySelector(".done-icon").textContent = done ? "✓" : "○";
      status.querySelector(".done-text").textContent = done ? opts.doneText : opts.pendingText;
      button.textContent = done ? opts.unmarkLabel : opts.markLabel;
      button.className = done ? "secondary-button" : "primary-button";
    }
    paint(Boolean(opts.initial));
    return { element: bar, setDone: paint };
  }

  function renderLessonPanel(lesson, index, chLessons, chapterId) {
    const simulationHost = el("div", { className: "sim-card" }, []);
    const challengeStatus = el("p", { className: "challenge-status", text: "დავალება ჯერ შესასრულებელია." }, []);

    const doneBar = buildDoneBar({
      initial: completedLessons.has(lesson.id),
      doneText: "გაკვეთილი დასრულებულია",
      pendingText: "ჯერ არ დაგისრულებია ეს გაკვეთილი",
      markLabel: "✓ მონიშნე შესრულებულად",
      unmarkLabel: "მოხსენი მონიშვნა",
      onToggle: function () {
        return toggleLessonDone(lesson.id);
      },
    });

    const setChallengeResult = function (isDone, message) {
      challengeStatus.classList.toggle("is-done", Boolean(isDone));
      challengeStatus.textContent = message;
      if (isDone) {
        markLessonComplete(lesson.id);
        doneBar.setDone(true);
      }
    };

    const panelChildren = [
      el("header", { className: "lesson-heading" }, [
        el("p", { className: "lesson-kicker", text: "გაკვეთილი " + (index + 1) + " / " + chLessons.length }, []),
        el("h2", { text: lesson.title }, []),
      ]),
      el("section", { className: "section-band" }, [
        el("h3", { text: "ახსნა" }, []),
        el("div", { className: "explanation-grid" }, [
          createInfoBox("მოკლე თეორია", lesson.theory),
          createInfoBox("ანალოგია", lesson.analogy),
          createInfoBox(lesson.physicalLabel || "ფიზიკურად რა ხდება", lesson.physical),
        ]),
      ]),
    ];

    const visualBand = buildVisualBand(lesson);
    if (visualBand) panelChildren.push(visualBand);

    panelChildren.push(
      el("section", { className: "section-band" }, [
        el("h3", { text: "ინტერაქტიული სიმულაცია" }, []),
        el("div", { className: "simulation-layout" }, [
          simulationHost,
          el("aside", { className: "challenge-box" }, [
            el("h3", { text: "პატარა დავალება" }, []),
            el("p", { className: "challenge-prompt", text: lesson.challenge }, []),
            challengeStatus,
          ]),
        ]),
      ])
    );

    const extras = buildExtras(lesson);
    if (extras) panelChildren.push(extras);

    panelChildren.push(doneBar.element);

    panelChildren.push(
      el("nav", { className: "lesson-actions", attrs: { "aria-label": "გაკვეთილების მართვა" } }, [
        createButton("წინა", "secondary", function () {
          if (index > 0) navigate("course", chapterId, chLessons[index - 1].id);
        }),
        createButton(index === chLessons.length - 1 ? "დასასრული" : "შემდეგი", "primary", function () {
          if (index < chLessons.length - 1) navigate("course", chapterId, chLessons[index + 1].id);
        }),
      ])
    );

    const panel = el("article", { className: "lesson-panel" }, panelChildren);

    const prevButton = panel.querySelector(".lesson-actions .secondary-button");
    prevButton.disabled = index === 0;
    if (index === chLessons.length - 1) {
      panel.querySelector(".lesson-actions .primary-button").disabled = true;
    }

    cleanupCurrentLesson = lesson.createSimulation(simulationHost, setChallengeResult) || null;
    return panel;
  }

  function levelLabel(level) {
    return level === "hard" ? "🔴 რთული" : level === "medium" ? "🟡 საშუალო" : "🟢 მარტივი";
  }

  function renderExercisePanel(lesson, index, chLessons, chapterId) {
    const data = exercises[lesson.id];
    const panel = el("article", { className: "exercise-panel" }, [
      el("header", { className: "lesson-heading" }, [
        el("p", { className: "lesson-kicker", text: "დავალებები · გაკვეთილი " + (index + 1) }, []),
        el("h2", { text: lesson.title }, []),
      ]),
    ]);

    if (!data || !data.tasks || !data.tasks.length) {
      panel.append(
        el("section", { className: "section-band" }, [
          el("p", { className: "state-note", text: "ამ გაკვეთილის დავალებები მალე დაემატება." }),
        ])
      );
      return panel;
    }

    const list = el("ol", { className: "exercise-list" });
    data.tasks.forEach(function (t) {
      list.append(
        el("li", { className: "exercise-item" }, [
          el("span", { className: "exercise-level level-" + (t.level || "easy"), text: levelLabel(t.level) }),
          el("span", { className: "exercise-text", text: t.q }),
        ])
      );
    });
    panel.append(el("section", { className: "section-band" }, [el("h3", { text: "დავალებები" }), list]));

    if (data.answers && data.answers.length) {
      const ansList = el("ul", { className: "answer-list" });
      data.answers.forEach(function (a) {
        ansList.append(el("li", { text: a }));
      });
      panel.append(
        el("details", { className: "exercise-answers" }, [
          el("summary", { text: "პასუხები (გადასამოწმებლად)" }),
          ansList,
        ])
      );
    }

    const doneBar = buildDoneBar({
      initial: completedAssignments.has(lesson.id),
      doneText: "დავალება შესრულებულია",
      pendingText: "ჯერ არ შეგისრულებია ეს დავალება",
      markLabel: "✓ დავალება შევასრულე",
      unmarkLabel: "მოხსენი მონიშვნა",
      onToggle: function () {
        return toggleAssignmentDone(lesson.id);
      },
    });
    panel.append(doneBar.element);

    panel.append(
      el("nav", { className: "lesson-actions" }, [
        createButton("წინა", "secondary", function () {
          if (index > 0) navigate("assignments", chapterId, chLessons[index - 1].id);
        }),
        createButton(index === chLessons.length - 1 ? "დასასრული" : "შემდეგი", "primary", function () {
          if (index < chLessons.length - 1) navigate("assignments", chapterId, chLessons[index + 1].id);
        }),
      ])
    );
    const prev = panel.querySelector(".lesson-actions .secondary-button");
    prev.disabled = index === 0;
    if (index === chLessons.length - 1) {
      panel.querySelector(".lesson-actions .primary-button").disabled = true;
    }
    return panel;
  }

  function renderHome() {
    const hero = el("section", { className: "home-hero" }, [
      el("p", { className: "course-name", text: "TSRE · სასწავლო პლატფორმა" }),
      el("h1", { text: "ისწავლე ნულიდან" }),
      el("p", { className: "home-lead", text: "ინტერაქტიული კურსები — კომპიუტერის საფუძვლებიდან ვებ-დეველოპმენტამდე. თითო თავი ცოცხალი სიმულაციებით და დავალებებით." }),
      el("div", { className: "home-cta" }, [
        createButton("კურსის დაწყება", "primary", function () {
          const first = lessonsFor("cfz")[0];
          navigate("course", "cfz", first ? first.id : null);
        }),
        createButton("დავალებები", "secondary", function () {
          const first = lessonsFor("cfz")[0];
          navigate("assignments", "cfz", first ? first.id : null);
        }),
      ]),
    ]);

    const grid = el("div", { className: "home-chapters" });
    CHAPTERS.forEach(function (ch, i) {
      grid.append(
        el("button", {
          className: "home-chapter" + (ch.available ? "" : " is-locked"),
          attrs: { type: "button" },
          on: {
            click: function () {
              navigate("course", ch.id, null);
            },
          },
        }, [
          el("span", { className: "home-chapter-num", text: String(i + 1) }),
          el("span", { className: "home-chapter-title", text: ch.title }),
          el("span", { className: "home-chapter-meta", text: ch.available ? lessonsFor(ch.id).length + " გაკვეთილი" : "მალე" }),
        ])
      );
    });

    return el("div", { className: "home-view" }, [
      hero,
      el("section", { className: "home-section" }, [el("h2", { text: "თავები" }), grid]),
    ]);
  }

  function renderResources() {
    const links = [
      { title: "GitHub რეპოზიტორია", desc: "კურსის სრული კოდი", href: "https://github.com/Datodarchiashvili123/CS" },
      { title: "MDN Web Docs", desc: "HTML / CSS / JS ოფიციალური დოკუმენტაცია", href: "https://developer.mozilla.org/" },
      { title: "CS50 · Harvard", desc: "კომპიუტერული მეცნიერების შესავალი", href: "https://cs50.harvard.edu/" },
      { title: "Nand2Tetris", desc: "კომპიუტერის აგება ლოგიკური კარიბჭეებიდან", href: "https://www.nand2tetris.org/" },
      { title: "Ben Eater", desc: "ვიდეოები — CPU და ელექტრონიკა ნულიდან", href: "https://eater.net/" },
    ];
    const grid = el("div", { className: "resource-grid" });
    links.forEach(function (l) {
      grid.append(
        el("a", {
          className: "resource-card",
          attrs: { href: l.href, target: "_blank", rel: "noopener noreferrer" },
        }, [
          el("strong", { text: l.title }),
          el("span", { className: "resource-desc", text: l.desc }),
          el("span", { className: "resource-arrow", attrs: { "aria-hidden": "true" }, text: "↗" }),
        ])
      );
    });
    return el("div", { className: "resources-view" }, [
      el("header", { className: "lesson-heading" }, [
        el("p", { className: "lesson-kicker", text: "სასარგებლო ბმულები და მასალა" }),
        el("h2", { text: "რესურსები" }),
      ]),
      el("section", { className: "section-band" }, [grid]),
    ]);
  }

  // ==================== პროგრესი ====================

  function loadSet(key) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveSet(key, set) {
    try {
      window.localStorage.setItem(key, JSON.stringify(Array.from(set)));
    } catch (error) {
      /* storage unavailable */
    }
  }

  function saveProgress() {
    saveSet(STORAGE_KEY, completedLessons);
  }
  function saveAssignments() {
    saveSet(ASSIGN_KEY, completedAssignments);
  }

  function markLessonComplete(id) {
    if (!id || completedLessons.has(id)) return;
    completedLessons.add(id);
    saveProgress();
    if (refreshSidebar) refreshSidebar();
  }

  // ცხადი გადამრთველი გაკვეთილისთვის/დავალებისთვის — აბრუნებს ახალ მდგომარეობას (true/false).
  function toggleLessonDone(id) {
    if (completedLessons.has(id)) completedLessons.delete(id);
    else completedLessons.add(id);
    saveProgress();
    if (refreshSidebar) refreshSidebar();
    return completedLessons.has(id);
  }
  function toggleAssignmentDone(id) {
    if (completedAssignments.has(id)) completedAssignments.delete(id);
    else completedAssignments.add(id);
    saveAssignments();
    if (refreshSidebar) refreshSidebar();
    return completedAssignments.has(id);
  }

  // ==================== bootstrap ====================

  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    const tag = target && target.tagName ? target.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || (target && target.isContentEditable)) return;
    const route = parseRoute();
    if (route.view !== "course" || !route.lesson) return;
    const chLessons = lessonsFor(route.chapter);
    const index = lessonIndexById(route.chapter, route.lesson);
    if (index < 0) return;
    if (event.key === "ArrowRight" && index < chLessons.length - 1) {
      navigate("course", route.chapter, chLessons[index + 1].id);
    } else if (event.key === "ArrowLeft" && index > 0) {
      navigate("course", route.chapter, chLessons[index - 1].id);
    }
  });

  window.addEventListener("hashchange", render);

  if (brandBtn) {
    brandBtn.addEventListener("click", function () {
      navigate("home", null, null);
    });
  }

  render();
})();
