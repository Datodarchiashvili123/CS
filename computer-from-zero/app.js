(function () {
  const appMain = document.getElementById("appMain");
  const topNav = document.getElementById("topNav");
  const brandBtn = document.getElementById("brandBtn");

  const exercises = window.CFZExercises || {};

  // თითო თავს თავისი გაკვეთილების რეესტრი აქვს.
  const COURSES = {
    cfz: window.ComputerFromZeroLessons || [],
    html: window.HtmlLessons || [],
  };
  function lessonsFor(chapterId) {
    return COURSES[chapterId] || [];
  }

  const authUser =
    window.CFZAuth && typeof window.CFZAuth.current === "function"
      ? window.CFZAuth.current()
      : null;
  const STORAGE_KEY =
    "computer-from-zero:completed:" + (authUser ? authUser.id : "guest");

  // თავები — თავი 1 = კომპიუტერი ნულიდან (არსებული კურსი), დანარჩენი მალე.
  const CHAPTERS = [
    { id: "cfz", title: "კომპიუტერი ნულიდან", available: true },
    { id: "html", title: "HTML", available: true },
    { id: "css", title: "CSS", available: false },
    { id: "js", title: "JavaScript", available: false },
  ];

  const NAV = [
    { id: "home", label: "მთავარი" },
    { id: "course", label: "კურსი" },
    { id: "assignments", label: "დავალებები" },
    { id: "resources", label: "რესურსები" },
  ];

  let cleanupCurrentLesson = null;
  let refreshSidebar = null;
  const completedLessons = loadProgress();

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
      if (isActive && ch.available && chLessons.length) {
        const sub = el("ul", { className: "lesson-sublist" });
        chLessons.forEach(function (lesson, li) {
          const done = completedLessons.has(lesson.id);
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
    if (mode === "course" && lessonsFor(activeChapter).length) {
      aside.append(renderProgressSummary(activeChapter));
    }
    aside.append(list);
    return aside;
  }

  function renderProgressSummary(chapterId) {
    const chLessons = lessonsFor(chapterId);
    const total = chLessons.length;
    const done = chLessons.filter(function (l) {
      return completedLessons.has(l.id);
    }).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    const fill = el("div", { className: "progress-fill" });
    fill.style.width = percent + "%";
    return el("div", { className: "progress-summary" }, [
      el("div", {
        className: "progress-track",
        attrs: { role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(percent), "aria-label": "პროგრესი" },
      }, [fill]),
      el("p", { className: "progress-caption", text: done + " / " + total + " დასრულებული" }),
      el("button", {
        className: "progress-reset",
        attrs: { type: "button" },
        text: "პროგრესის განულება",
        on: {
          click: function () {
            completedLessons.clear();
            saveProgress();
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

  function renderLessonPanel(lesson, index, chLessons, chapterId) {
    const simulationHost = el("div", { className: "sim-card" }, []);
    const challengeStatus = el("p", { className: "challenge-status", text: "დავალება ჯერ შესასრულებელია." }, []);

    const setChallengeResult = function (isDone, message) {
      challengeStatus.classList.toggle("is-done", Boolean(isDone));
      challengeStatus.textContent = message;
      if (isDone) {
        markLessonComplete(lesson.id);
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

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      return new Set();
    }
  }

  function saveProgress() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedLessons)));
    } catch (error) {
      /* storage unavailable */
    }
  }

  function markLessonComplete(id) {
    if (!id || completedLessons.has(id)) return;
    completedLessons.add(id);
    saveProgress();
    if (refreshSidebar) refreshSidebar();
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
