// TypeScript თავის ფაბრიკა.
(function () {
  window.TsLessons = window.TsLessons || [];

  window.tsLesson = function (cfg) {
    window.TsLessons.push({
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

        const pg = CFZ.createTsPlayground(cfg.starter, cfg.test, function (ok, message) {
          setChallengeResult(
            ok,
            ok ? cfg.done || "შესრულებულია! ✅" : message || cfg.hint || "ჯერ არ არის სწორი — სცადე კიდევ."
          );
        });

        container.append(pg.element);

        container.append(
          CFZ.el("div", { className: "breakdown-panel" }, [
            CFZ.el("h4", { text: cfg.noteTitle || "დამატებით" }),
            CFZ.el("p", {
              className: "breakdown-note",
              text: cfg.note || "",
            }),
            CFZ.el("p", {
              className: "state-note",
              text: "ℹ გამშვები ტიპებს ჭრის და კოდს JavaScript-ად უშვებს — ამიტომ აქ ტიპის შეცდომას ვერ დაინახავ. ნამდვილი შემოწმება რედაქტორში (VS Code) და tsc-ით ხდება; სცადე TypeScript Playground-იც.",
            }),
          ])
        );

        return function () {
          pg.destroy();
        };
      },
    });
  };
})();
