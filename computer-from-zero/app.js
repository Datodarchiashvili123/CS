(function () {
  const lessons = window.ComputerFromZeroLessons || [];
  const lessonRoot = document.getElementById("lessonRoot");
  const lessonList = document.getElementById("lessonList");
  const lessonCounter = document.getElementById("lessonCounter");
  const progressFill = document.getElementById("progressFill");
  const progressTrack = document.getElementById("progressTrack");
  const progressCaption = document.getElementById("progressCaption");
  const progressReset = document.getElementById("progressReset");

  const authUser =
    window.CFZAuth && typeof window.CFZAuth.current === "function"
      ? window.CFZAuth.current()
      : null;
  const STORAGE_KEY =
    "computer-from-zero:completed:" + (authUser ? authUser.id : "guest");

  let currentLessonIndex = 0;
  let cleanupCurrentLesson = null;
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
    goToLesson,
    wait,
  };

  function goToLesson(id) {
    const index = lessons.findIndex(function (lesson) {
      return lesson.id === id;
    });
    if (index >= 0) {
      showLesson(index);
    }
  }

  // კონვენციური სქემატური სიმბოლოები (stroke = currentColor, ფერს CSS აძლევს).
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

  // ერთი კარიბჭის SVG ფორმა მოცემულ (x,y) წერტილზე. x,y = მარცხენა-შუა (შესასვლელის დონე).
  // აბრუნებს { markup, ports } — ports აქვს a/b (შესასვლელები), out (გამოსავალი), in (NOT-ისთვის).
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

  // ერთი სქემატური ნაწილი: სიმბოლო + ქართული სიტყვა + კონვენციური აღნიშვნა.
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
    const element = el("div", { className: "logic-output" }, [
      digit,
      lamp.element,
    ]);

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
      el(
        "thead",
        {},
        [
          el(
            "tr",
            {},
            headers.map(function (header) {
              return el("th", { text: header }, []);
            })
          ),
        ]
      ),
      el(
        "tbody",
        {},
        rows.map(function (row) {
          const tr = el(
            "tr",
            {},
            row.map(function (cell) {
              return el("td", { text: String(cell) }, []);
            })
          );
          bodyRows.push(tr);
          return tr;
        })
      ),
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

  function renderLessonList() {
    lessonList.innerHTML = "";

    lessons.forEach(function (lesson, index) {
      const isComplete = completedLessons.has(lesson.id);
      const children = [
        el("span", { className: "lesson-tab-number", text: String(index + 1) }, []),
        el("span", { className: "lesson-tab-title", text: lesson.shortTitle || lesson.title }, []),
      ];
      if (isComplete) {
        children.push(
          el("span", { className: "lesson-tab-check", attrs: { "aria-label": "დასრულებულია" }, text: "✓" }, [])
        );
      }
      const button = el(
        "button",
        {
          className:
            "lesson-tab" +
            (index === currentLessonIndex ? " is-active" : "") +
            (isComplete ? " is-complete" : ""),
          attrs: { type: "button" },
          on: {
            click: function () {
              showLesson(index);
            },
          },
        },
        children
      );
      lessonList.append(el("li", {}, [button]));
    });
  }

  function showLesson(index) {
    if (index < 0 || index >= lessons.length) {
      return;
    }

    if (cleanupCurrentLesson) {
      cleanupCurrentLesson();
      cleanupCurrentLesson = null;
    }

    currentLessonIndex = index;
    const lesson = lessons[index];
    syncHash(lesson.id);
    lessonCounter.textContent = "გაკვეთილი " + (index + 1) + " / " + lessons.length;
    lessonRoot.innerHTML = "";

    const simulationHost = el("div", { className: "sim-card" }, []);
    const challengeStatus = el(
      "p",
      { className: "challenge-status", text: "დავალება ჯერ შესასრულებელია." },
      []
    );

    const setChallengeResult = function (isDone, message) {
      challengeStatus.classList.toggle("is-done", Boolean(isDone));
      challengeStatus.textContent = message;
      if (isDone) {
        markLessonComplete(lesson.id);
      }
    };

    const panel = el("article", { className: "lesson-panel" }, [
      el("header", { className: "lesson-heading" }, [
        el("p", { className: "lesson-kicker", text: "გაკვეთილი " + (index + 1) }, []),
        el("h2", { text: lesson.title }, []),
      ]),
      el("section", { className: "section-band" }, [
        el("h3", { text: "ახსნა" }, []),
        el("div", { className: "explanation-grid" }, [
          createInfoBox("მოკლე თეორია", lesson.theory),
          createInfoBox("ანალოგია", lesson.analogy),
          createInfoBox("ფიზიკურად რა ხდება", lesson.physical),
        ]),
      ]),
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
      ]),
      el("nav", { className: "lesson-actions", attrs: { "aria-label": "გაკვეთილების მართვა" } }, [
        createButton("წინა", "secondary", function () {
          showLesson(currentLessonIndex - 1);
        }),
        createButton(index === lessons.length - 1 ? "თავიდან დაწყება" : "შემდეგი", "primary", function () {
          showLesson(index === lessons.length - 1 ? 0 : currentLessonIndex + 1);
        }),
      ]),
    ]);

    lessonRoot.append(panel);
    const previousButton = panel.querySelector(".lesson-actions .secondary-button");
    previousButton.disabled = index === 0;

    cleanupCurrentLesson = lesson.createSimulation(simulationHost, setChallengeResult) || null;
    renderLessonList();
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function createInfoBox(title, text) {
    return el("div", { className: "info-box" }, [
      el("strong", { text: title }, []),
      el("p", { text }, []),
    ]);
  }

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return new Set();
      }
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
      /* storage may be unavailable (private mode, file://); progress stays in-memory. */
    }
  }

  function markLessonComplete(id) {
    if (!id || completedLessons.has(id)) {
      return;
    }
    completedLessons.add(id);
    saveProgress();
    updateProgressSummary();
    renderLessonList();
  }

  function updateProgressSummary() {
    const total = lessons.length;
    const done = lessons.filter(function (lesson) {
      return completedLessons.has(lesson.id);
    }).length;
    const percent = total ? Math.round((done / total) * 100) : 0;

    if (progressFill) {
      progressFill.style.width = percent + "%";
    }
    if (progressTrack) {
      progressTrack.setAttribute("aria-valuenow", String(percent));
    }
    if (progressCaption) {
      progressCaption.textContent = done + " / " + total + " დასრულებული";
    }
  }

  function lessonIndexFromHash() {
    const raw = (window.location.hash || "").replace(/^#/, "");
    if (!raw) {
      return 0;
    }
    const byId = lessons.findIndex(function (lesson) {
      return lesson.id === raw;
    });
    if (byId >= 0) {
      return byId;
    }
    const asNumber = parseInt(raw.replace(/^lesson-/, ""), 10);
    if (!isNaN(asNumber) && asNumber >= 1 && asNumber <= lessons.length) {
      return asNumber - 1;
    }
    return 0;
  }

  function syncHash(id) {
    if (!id || ("#" + id) === window.location.hash) {
      return;
    }
    try {
      window.history.replaceState(null, "", "#" + id);
    } catch (error) {
      window.location.hash = id;
    }
  }

  if (lessons.length === 0) {
    lessonRoot.textContent = "გაკვეთილები ვერ ჩაიტვირთა.";
    return;
  }

  document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    const target = event.target;
    const tag = target && target.tagName ? target.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || (target && target.isContentEditable)) {
      return;
    }
    if (event.key === "ArrowRight") {
      showLesson(currentLessonIndex + 1);
    } else if (event.key === "ArrowLeft") {
      showLesson(currentLessonIndex - 1);
    }
  });

  window.addEventListener("hashchange", function () {
    const index = lessonIndexFromHash();
    if (index !== currentLessonIndex) {
      showLesson(index);
    }
  });

  if (progressReset) {
    progressReset.addEventListener("click", function () {
      completedLessons.clear();
      saveProgress();
      updateProgressSummary();
      renderLessonList();
    });
  }

  updateProgressSummary();
  renderLessonList();
  showLesson(lessonIndexFromHash());
})();
