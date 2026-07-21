(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "and-gate",
    title: "AND კარიბჭე",
    shortTitle: "AND",
    theory: "AND კარიბჭე 1-ს აბრუნებს მხოლოდ მაშინ, როცა ორივე შესასვლელი 1 არის.",
    analogy: "წარმოიდგინე ორი ჩამრთველი ერთ მავთულზე, ერთმანეთის მიყოლებით. ნათურა აინთება მხოლოდ მაშინ, როცა ორივე ჩართულია.",
    physical: "AND იკრიბება ორი ტრანზისტორით, რომლებიც ერთმანეთის მიყოლებით (სერიულად) დგანან. დენი კვებიდან Output-მდე მხოლოდ მაშინ აღწევს, როცა ორივე ტრანზისტორი ჩართულია — ანუ A = 1 და B = 1.",
    challenge: "ჩართე A და B ერთად, რომ Output გახდეს 1.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const circuit = buildCircuit();

      const stepChain = CFZ.createBreakdownStep(
        "სერიული ჯაჭვი",
        "A და B ტრანზისტორები ერთმანეთის მიყოლებით დგანან. დენი VDD-დან Output-მდე მხოლოდ მაშინ გაივლის, თუ ორივე ჩართულია."
      );
      const stepPull = CFZ.createBreakdownStep(
        "პულ-დაუნ წინაღობა",
        "თუ ერთი ტრანზისტორი მაინც გამორთულია, ჯაჭვი წყდება და წინაღობა Output-ს 0-ზე ამაგრებს."
      );

      const table = CFZ.createTruthTable(["A", "B", "Output"], [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const a = switchA.getValue();
        const b = switchB.getValue();
        const bothOn = a === 1 && b === 1;
        const result = bothOn ? 1 : 0;
        const activeRow = a * 2 + b;

        output.setValue(result);
        circuit.setValues({ a: a, b: b, both: bothOn, result: result });

        stepChain.setActive(bothOn);
        stepPull.setActive(!bothOn);
        stepChain.setValue(bothOn ? "ჯაჭვი ღიაა → Output = 1" : "ჯაჭვი წყდება");
        stepPull.setValue(!bothOn ? "Output = 0" : "");

        table.setActive(activeRow);
        note.textContent = bothOn
          ? "A = 1 და B = 1: ორივე ტრანზისტორი ჩართულია, დენი VDD-დან გადის და Output = 1."
          : "A = " + a + ", B = " + b + ": ჯაჭვი წყვეტილია, წინაღობა Output-ს 0-ზე ამაგრებს.";

        setChallengeResult(
          result === 1,
          result === 1
            ? "შესრულებულია: AND-ს ორივე სიგნალი სჭირდება."
            : "მიზანი: ორივე შესასვლელი გახადე 1."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [switchA.element, switchB.element]),
          CFZ.el("div", { className: "gate-symbol" }, [
            CFZ.svgSymbol("andGate"),
            CFZ.el("span", { className: "gate-symbol-label", text: "AND" }),
          ]),
          output.element,
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ იწყობა ტრანზისტორებისგან — სერიულად" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ორი ტრანზისტორ-ჩამრთველი ერთმანეთის მიყოლებით დგას. დენი ბოლომდე მაშინ გადის, როცა ორივე დახურულია (ჩართული).",
          }),
          circuit.element,
          CFZ.el("div", { className: "breakdown-flow" }, [stepChain.element, stepPull.element]),
        ]),
        table.element,
        note
      );
      update();

      function buildCircuit() {
        function sw(cls, x) {
          const mid = x + 20;
          return (
            '<g class="sw ' + cls + '">' +
            '<line class="lever lever-open" x1="' + x + '" y1="70" x2="' + (x + 32) + '" y2="56"/>' +
            '<line class="lever lever-closed" x1="' + x + '" y1="70" x2="' + (x + 40) + '" y2="70"/>' +
            '<line class="gate" x1="' + mid + '" y1="76" x2="' + mid + '" y2="94"/>' +
            '<circle class="contact" cx="' + x + '" cy="70" r="3.5"/>' +
            '<circle class="contact" cx="' + (x + 40) + '" cy="70" r="3.5"/>' +
            "</g>"
          );
        }

        const svgMarkup =
          '<svg class="circuit-svg" viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AND სერიული ტრანზისტორული წრედი">' +
          // main (series) wires
          '<path class="wire net-flow" d="M40,70 H80"/>' +
          '<path class="wire net-flow" d="M120,70 H160"/>' +
          '<path class="wire net-flow" d="M200,70 H260"/>' +
          '<path class="wire net-flow" d="M260,70 H316"/>' +
          // pull-down branch
          '<path class="wire net-pull" d="M260,70 V100"/>' +
          '<path class="wire net-pull" d="M260,100 L252,106 L268,114 L252,122 L268,130 L260,136"/>' +
          '<path class="wire net-pull" d="M260,136 V160"/>' +
          // VDD symbol
          '<path class="part" d="M24,48 H56"/>' +
          '<path class="part" d="M40,48 V70"/>' +
          // GND symbol
          '<path class="part" d="M247,160 H273"/>' +
          '<path class="part" d="M252,166 H268"/>' +
          '<path class="part" d="M257,172 H263"/>' +
          // node dot
          '<circle class="contact net-flow" cx="260" cy="70" r="3.5"/>' +
          // switches
          sw("sw-a", 80) +
          sw("sw-b", 160) +
          // labels
          '<text class="lbl-sm" x="40" y="40" text-anchor="middle">VDD · 1</text>' +
          '<text class="lbl" x="100" y="112" text-anchor="middle">A</text>' +
          '<text class="lbl" x="180" y="112" text-anchor="middle">B</text>' +
          '<text class="lbl-sm" x="278" y="120">R</text>' +
          '<text class="lbl-sm" x="278" y="170">GND · 0</text>' +
          '<text class="val" id="andOut" x="324" y="66">0</text>' +
          '<text class="lbl-sm" x="324" y="84">Output</text>' +
          "</svg>";

        const wrap = document.createElement("div");
        wrap.innerHTML = svgMarkup.trim();
        const svg = wrap.firstChild;
        function setNet(cls, on) {
          svg.querySelectorAll("." + cls).forEach(function (node) {
            node.classList.toggle("on", on);
          });
        }
        return {
          element: svg,
          setValues: function (v) {
            setNet("sw-a", v.a === 1);
            setNet("sw-b", v.b === 1);
            setNet("net-flow", v.both);
            setNet("net-pull", !v.both);
            const out = svg.querySelector("#andOut");
            out.textContent = String(v.result);
            out.classList.toggle("on", v.result === 1);
          },
        };
      }
    },
  });
})();
