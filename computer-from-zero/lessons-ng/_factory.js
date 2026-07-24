// Angular თავის ფაბრიკა.
(function () {
  window.AngularLessons = window.AngularLessons || [];

  window.ngLesson = function (cfg) {
    window.AngularLessons.push({
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

        const pg = CFZ.createAngularPlayground(cfg.starter, cfg.test, function (ok, message) {
          setChallengeResult(
            ok,
            ok ? cfg.done || "შესრულებულია! ✅" : message || cfg.hint || "ჯერ არ არის სწორი — სცადე კიდევ."
          );
        });

        container.append(pg.element);

        container.append(
          CFZ.el("div", { className: "breakdown-panel" }, [
            CFZ.el("h4", { text: cfg.noteTitle || "დამატებით" }),
            CFZ.el("p", { className: "breakdown-note", text: cfg.note || "" }),
            CFZ.el("p", {
              className: "state-note",
              text:
                "ℹ ეს სასწავლო მინი-Angular-ია: @Component, შაბლონები, {{ }}, [prop], (event), *ngIf, *ngFor, " +
                "signal/computed, @Input, @Output და inject() მართლა მუშაობს. " +
                "ნამდვილი Angular ბევრად დიდია — CLI-ით შექმნილ პროექტში სცადე.",
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
