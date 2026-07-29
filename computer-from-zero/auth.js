(function () {
  "use strict";

  // ⚠️ ლოკალური საკლასო შესვლა — არა რეალური უსაფრთხოება.
  // პაროლები ამ ფაილშია ხილული; შესაცვლელად უბრალოდ შეასწორე ეს ობიექტი.
  const USERS = {
    davit: { name: "დავითი", role: "lecturer", password: "lecturer" },
    elene: { name: "ელენე", role: "student", password: "elene" },
    natali: { name: "ნატალი", role: "student", password: "natali" },
  };

  const SESSION_KEY = "cfz:session";
  const PROGRESS_PREFIX = "computer-from-zero:completed:";
  const ASSIGN_PREFIX = "computer-from-zero:assignments:";

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function currentUser() {
    let id = null;
    try {
      id = sessionStorage.getItem(SESSION_KEY);
    } catch (e) {
      id = null;
    }
    if (id && USERS[id]) {
      return { id: id, name: USERS[id].name, role: USERS[id].role };
    }
    return null;
  }

  function login(id, password) {
    const user = USERS[id];
    if (!user) {
      return "აირჩიე პროფილი.";
    }
    if (user.password !== password) {
      return "პაროლი არასწორია.";
    }
    try {
      sessionStorage.setItem(SESSION_KEY, id);
    } catch (e) {
      /* sessionStorage unavailable */
    }
    return null;
  }

  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      /* ignore */
    }
    window.location.reload();
  }

  function countAt(key) {
    try {
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.length : 0;
    } catch (e) {
      return 0;
    }
  }
  function progressCount(id) {
    return countAt(PROGRESS_PREFIX + id);
  }
  function assignmentCount(id) {
    return countAt(ASSIGN_PREFIX + id);
  }
  // ყველა თავის გაკვეთილების საერთო რაოდენობა.
  function totalLessons() {
    const chapters = [
      window.ComputerFromZeroLessons,
      window.HtmlLessons,
      window.CssLessons,
      window.ScssLessons,
      window.JsLessons,
      window.TsLessons,
      window.NodeLessons,
      window.AngularLessons,
    ];
    return chapters.reduce(function (sum, list) {
      return sum + ((list && list.length) || 0);
    }, 0);
  }

  window.CFZAuth = {
    current: currentUser,
    progressKey: function (id) {
      return PROGRESS_PREFIX + id;
    },
    logout: logout,
  };

  // ---------- შესვლის ეკრანი ----------
  function renderLogin() {
    const screen = document.getElementById("loginScreen");
    if (!screen) {
      return;
    }
    screen.innerHTML = "";

    const card = el("div", "login-card");
    card.append(
      el("p", "course-name", "Computer From Zero"),
      el("h1", null, "კომპიუტერი ნულიდან"),
      el("p", "login-sub", "შედი შენი პროფილით")
    );

    const error = el("p", "login-error");
    const passwordInput = el("input", "login-password");
    passwordInput.type = "password";
    passwordInput.placeholder = "პაროლი";
    passwordInput.autocomplete = "off";

    let selected = null;
    const userButtons = {};
    const usersWrap = el("div", "login-users");
    Object.keys(USERS).forEach(function (id) {
      const user = USERS[id];
      const btn = el("button", "login-user");
      btn.type = "button";
      btn.append(
        el("span", "login-user-name", user.name),
        el("span", "login-user-role", user.role === "lecturer" ? "ლექტორი" : "სტუდენტი")
      );
      btn.addEventListener("click", function () {
        selected = id;
        Object.keys(userButtons).forEach(function (key) {
          userButtons[key].classList.toggle("is-selected", key === id);
        });
        error.textContent = "";
        passwordInput.focus();
      });
      userButtons[id] = btn;
      usersWrap.append(btn);
    });

    const field = el("label", "login-field");
    field.append(el("span", null, "პაროლი"), passwordInput);

    const submit = el("button", "primary-button login-submit", "შესვლა");
    submit.type = "button";
    function doLogin() {
      if (!selected) {
        error.textContent = "ჯერ აირჩიე პროფილი.";
        return;
      }
      const err = login(selected, passwordInput.value);
      if (err) {
        error.textContent = err;
        return;
      }
      window.location.reload();
    }
    submit.addEventListener("click", doLogin);
    passwordInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        doLogin();
      }
    });

    const note = el(
      "p",
      "login-note",
      "ℹ️ ეს ლოკალური საკლასო შესვლაა (ერთ ბრაუზერში). რეალური უსაფრთხოება არ არის — პაროლები კოდშია."
    );

    card.append(usersWrap, field, error, submit, note);
    screen.append(card);
  }

  // ---------- ავტორიზებული header ----------
  function setupHeader(user) {
    const host = document.getElementById("topBarUser");
    if (!host) {
      return;
    }
    host.innerHTML = "";

    const badge = el("div", "user-badge");
    badge.append(
      el("span", "user-badge-name", user.name),
      el("span", "user-badge-role", user.role === "lecturer" ? "ლექტორი" : "სტუდენტი")
    );
    host.append(badge);

    if (user.role === "lecturer") {
      const dashBtn = el("button", "secondary-button", "სტუდენტების პროგრესი");
      dashBtn.type = "button";
      dashBtn.addEventListener("click", openDashboard);
      host.append(dashBtn);
    }

    const out = el("button", "secondary-button", "გასვლა");
    out.type = "button";
    out.addEventListener("click", logout);
    host.append(out);
  }

  // ---------- ლექტორის დაფა ----------
  function bar(label, done, total) {
    const percent = total ? Math.round((done / total) * 100) : 0;
    const track = el("div", "dash-track");
    const fill = el("div", "dash-fill");
    fill.style.width = percent + "%";
    track.append(fill);
    const line = el("div", "dash-metric");
    line.append(
      el("span", "dash-metric-label", label),
      track,
      el("span", "dash-count", done + " / " + total)
    );
    return line;
  }

  function openDashboard() {
    const total = totalLessons() || 15;
    const overlay = el("div", "dash-overlay");
    const panel = el("div", "dash-panel");
    panel.append(el("h2", null, "სტუდენტების პროგრესი"));

    Object.keys(USERS).forEach(function (id) {
      if (USERS[id].role !== "student") {
        return;
      }
      const lessons = progressCount(id);
      const assignments = assignmentCount(id);
      const row = el("div", "dash-row");
      row.append(el("span", "dash-name", USERS[id].name));
      row.append(bar("გაკვეთილები", lessons, total));
      row.append(bar("დავალებები", assignments, total));
      panel.append(row);
    });

    panel.append(
      el("p", "login-note", "ℹ️ ჩანს მხოლოდ ამ ბრაუზერში შენახული პროგრესი (backend არ არის)."),
    );
    const close = el("button", "primary-button", "დახურვა");
    close.type = "button";
    close.addEventListener("click", function () {
      overlay.remove();
    });
    panel.append(close);

    overlay.append(panel);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
    document.body.append(overlay);
  }

  // ---------- init ----------
  const user = currentUser();
  if (user) {
    document.body.setAttribute("data-authed", "true");
    setupHeader(user);
  } else {
    renderLogin();
  }
})();
