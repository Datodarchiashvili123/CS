// JS თავის საერთო ფაბრიკა — თითო გაკვეთილი კონფიგურაციით იწერება.
(function () {
  window.JsLessons = window.JsLessons || [];

  window.jsLesson = function (cfg) {
    window.JsLessons.push({
      id: cfg.id,
      title: cfg.title,
      shortTitle: cfg.short || cfg.title,
      theory: cfg.theory,
      analogy: cfg.analogy,
      physicalLabel: cfg.label || "სინტაქსი",
      physical: cfg.syntax,
      challenge: cfg.challenge,

      createSimulation: function (container, setChallengeResult) {
        const CFZ = window.CFZ;

        const pg = CFZ.createJsPlayground(
          cfg.starter,
          cfg.test,
          function (ok, message) {
            setChallengeResult(
              ok,
              ok
                ? cfg.done || "შესრულებულია! ✅"
                : message || cfg.hint || "ჯერ არ არის სწორი — სცადე კიდევ."
            );
          },
          cfg.html ? { html: cfg.html } : undefined
        );

        container.append(pg.element);

        if (cfg.note) {
          container.append(
            CFZ.el("div", { className: "breakdown-panel" }, [
              CFZ.el("h4", { text: cfg.noteTitle || "დამატებით" }),
              CFZ.el("p", { className: "breakdown-note", text: cfg.note }),
            ])
          );
        }

        return function () {
          pg.destroy();
        };
      },
    });
  };
})();
