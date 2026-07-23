// Node.js თავის ფაბრიკა.
(function () {
  window.NodeLessons = window.NodeLessons || [];

  window.nodeLesson = function (cfg) {
    window.NodeLessons.push({
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

        const pg = CFZ.createNodePlayground(cfg.starter, cfg.test, function (ok, message) {
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
                "ℹ გამშვებში Node-ის სასწავლო გარემოა: fs, path, os, events, http და express მუშაობს, " +
                "ფაილები კი მეხსიერებაშია (/app/data.txt, /app/users.json, /app/notes/). " +
                "სერვერზე მოთხოვნის გასაგზავნად გამოიყენე __request(\"GET\", \"/\").",
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
