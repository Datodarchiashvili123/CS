(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "or-gate",
    title: "OR კარიბჭე",
    shortTitle: "OR",
    theory: "OR კარიბჭე 1-ს აბრუნებს მაშინ, როცა მინიმუმ ერთი შესასვლელი მაინც 1 არის.",
    analogy: "წარმოიდგინე ორი ჩამრთველი, თითო თავის მავთულზე, პარალელურად. ნათურა აინთება, თუ ერთი მაინც ჩართულია.",
    physical: "OR იკრიბება ორი ტრანზისტორით, რომლებიც გვერდიგვერდ (პარალელურად) დგანან. თითოეული თავისთვის ქმნის გზას კვებიდან Output-მდე, ამიტომ ერთი ღია გზაც საკმარისია, რომ Output გახდეს 1.",
    challenge: "ჩართე მინიმუმ ერთი შესასვლელი და Output გახადე 1.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const circuit = buildCircuit();

      const stepParallel = CFZ.createBreakdownStep(
        "პარალელური განშტოება",
        "A და B ტრანზისტორები გვერდიგვერდ დგანან. თითოეული ცალკე ქმნის გზას VDD-დან Output-მდე, ამიტომ ერთი ღია გზაც საკმარისია."
      );
      const stepPull = CFZ.createBreakdownStep(
        "პულ-დაუნ წინაღობა",
        "თუ ორივე ტრანზისტორი გამორთულია, გზა არ არსებობს და წინაღობა Output-ს 0-ზე ამაგრებს."
      );

      const table = CFZ.createTruthTable(["A", "B", "Output"], [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const a = switchA.getValue();
        const b = switchB.getValue();
        const eitherOn = a === 1 || b === 1;
        const result = eitherOn ? 1 : 0;
        const activeRow = a * 2 + b;

        output.setValue(result);
        circuit.setValues({ a: a, b: b, either: eitherOn, result: result });

        stepParallel.setActive(eitherOn);
        stepPull.setActive(!eitherOn);
        stepParallel.setValue(eitherOn ? "გზა ღიაა → Output = 1" : "გზა არ არის");
        stepPull.setValue(!eitherOn ? "Output = 0" : "");

        table.setActive(activeRow);
        note.textContent = eitherOn
          ? "A = " + a + ", B = " + b + ": მინიმუმ ერთი ტრანზისტორი ღიაა, დენი Output-მდე აღწევს → Output = 1."
          : "A = 0 და B = 0: ორივე გზა დახურულია, წინაღობა Output-ს 0-ზე ამაგრებს.";

        setChallengeResult(
          result === 1,
          result === 1
            ? "შესრულებულია: OR-ს ერთი სიგნალიც ჰყოფნის."
            : "მიზანი: ჩართე მინიმუმ ერთი შესასვლელი."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [switchA.element, switchB.element]),
          CFZ.el("div", { className: "gate-symbol" }, [
            CFZ.svgSymbol("orGate"),
            CFZ.el("span", { className: "gate-symbol-label", text: "OR" }),
          ]),
          output.element,
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ იწყობა ტრანზისტორებისგან — პარალელურად" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ორი ტრანზისტორ-ჩამრთველი გვერდიგვერდ (პარალელურად) დგას — თითო თავის გზაზე. ერთი ღია გზაც საკმარისია, რომ დენმა Output-მდე მიაღწიოს.",
          }),
          circuit.element,
          CFZ.el("div", { className: "breakdown-flow" }, [stepParallel.element, stepPull.element]),
        ]),
        table.element,
        note
      );
      update();

      function buildCircuit() {
        // ჩამრთველი მოცემულ (x,y)-ზე; gateDir: -1 ზემოთ, +1 ქვემოთ
        function sw(cls, x, y, gateDir) {
          const mid = x + 20;
          const gy1 = y + gateDir * 6;
          const gy2 = y + gateDir * 22;
          return (
            '<g class="sw ' + cls + '">' +
            '<line class="lever lever-open" x1="' + x + '" y1="' + y + '" x2="' + (x + 32) + '" y2="' + (y - 14) + '"/>' +
            '<line class="lever lever-closed" x1="' + x + '" y1="' + y + '" x2="' + (x + 40) + '" y2="' + y + '"/>' +
            '<line class="gate" x1="' + mid + '" y1="' + gy1 + '" x2="' + mid + '" y2="' + gy2 + '"/>' +
            '<circle class="contact" cx="' + x + '" cy="' + y + '" r="3.5"/>' +
            '<circle class="contact" cx="' + (x + 40) + '" cy="' + y + '" r="3.5"/>' +
            "</g>"
          );
        }

        const svgMarkup =
          '<svg class="circuit-svg" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OR პარალელური ტრანზისტორული წრედი">' +
          // shared: VDD → split ... merge → node → Output
          '<path class="wire net-flow" d="M30,90 H90"/>' +
          '<path class="wire net-flow" d="M210,90 H250"/>' +
          '<path class="wire net-flow" d="M250,90 H316"/>' +
          // branch A (top)
          '<path class="wire net-a" d="M90,90 V60"/>' +
          '<path class="wire net-a" d="M90,60 H130"/>' +
          '<path class="wire net-a" d="M170,60 H210"/>' +
          '<path class="wire net-a" d="M210,60 V90"/>' +
          // branch B (bottom)
          '<path class="wire net-b" d="M90,90 V120"/>' +
          '<path class="wire net-b" d="M90,120 H130"/>' +
          '<path class="wire net-b" d="M170,120 H210"/>' +
          '<path class="wire net-b" d="M210,120 V90"/>' +
          // pull-down
          '<path class="wire net-pull" d="M250,90 V118"/>' +
          '<path class="wire net-pull" d="M250,118 L242,124 L258,132 L242,140 L258,148 L250,154"/>' +
          '<path class="wire net-pull" d="M250,154 V176"/>' +
          // VDD symbol
          '<path class="part" d="M16,54 H44"/>' +
          '<path class="part" d="M30,54 V90"/>' +
          // GND symbol
          '<path class="part" d="M240,176 H260"/>' +
          '<path class="part" d="M245,182 H255"/>' +
          '<path class="part" d="M249,188 H251"/>' +
          // split + merge + node dots
          '<circle class="contact net-flow" cx="90" cy="90" r="3.5"/>' +
          '<circle class="contact net-flow" cx="210" cy="90" r="3.5"/>' +
          '<circle class="contact net-flow" cx="250" cy="90" r="3.5"/>' +
          // switches
          sw("sw net-a", 130, 60, -1) +
          sw("sw net-b", 130, 120, 1) +
          // labels
          '<text class="lbl-sm" x="30" y="46" text-anchor="middle">VDD · 1</text>' +
          '<text class="lbl" x="150" y="30" text-anchor="middle">A</text>' +
          '<text class="lbl" x="150" y="160" text-anchor="middle">B</text>' +
          '<text class="lbl-sm" x="272" y="182">GND · 0</text>' +
          '<text class="val" id="orOut" x="322" y="94">0</text>' +
          '<text class="lbl-sm" x="322" y="112">Output</text>' +
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
            setNet("net-a", v.a === 1);
            setNet("net-b", v.b === 1);
            setNet("net-flow", v.either);
            setNet("net-pull", !v.either);
            const out = svg.querySelector("#orOut");
            out.textContent = String(v.result);
            out.classList.toggle("on", v.result === 1);
          },
        };
      }
    },
  });
})();
