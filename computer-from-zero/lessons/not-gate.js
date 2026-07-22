(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "not-gate",
    title: "NOT კარიბჭე",
    shortTitle: "NOT",
    theory: "ტრანზისტორებისგან ვაწყობთ ლოგიკურ კარიბჭეებს — პაწია სქემებს, რომლებიც ბიტებზე მარტივ ლოგიკურ გადაწყვეტილებას იღებენ. უმარტივესი მათგანია NOT: შემოსულ ბიტს აბრუნებს საპირისპიროდ — თუ შევიდა 0, გამოვა 1; თუ შევიდა 1, გამოვა 0.",
    analogy: "ეს ჰგავს საპირისპირო პასუხს: როცა ამბობ არა, ის ამბობს კი; როცა ამბობ კი, ის ამბობს არა.",
    physical: "NOT იწყობა ერთი ტრანზისტორითა და ერთი წინაღობით. წინაღობა Output-ს სუსტად აბამს 1-ზე; ტრანზისტორი კი, როცა Input = 1, იხსნება და Output-ს ძლიერად აბამს 0-ზე.",
    challenge: "შეიყვანე 1 და ნახე, როგორ აბრუნებს NOT კარიბჭე 0-ს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const inputSwitch = CFZ.createSwitch("Input", false, update);
      const output = CFZ.createBitOutput("Output");
      const circuit = buildCircuit();

      const step0 = CFZ.createBreakdownStep(
        "Input = 0",
        "ტრანზისტორი დახურულია (გზა მიწისკენ არ არის). მარტო წინაღობა მოქმედებს და Output-ს კვებას (1) აბამს."
      );
      const step1 = CFZ.createBreakdownStep(
        "Input = 1",
        "ტრანზისტორი იხსნება და Output-ს პირდაპირ მიწას (0) აერთებს. ძლიერი კავშირი წინაღობას სჯობნის."
      );

      const table = CFZ.createTruthTable(["Input", "Output"], [
        [0, 1],
        [1, 0],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const input = inputSwitch.getValue();
        const result = input === 1 ? 0 : 1;
        const conducting = input === 1;

        output.setValue(result);
        circuit.setValues({ input: input, result: result });

        step0.setActive(input === 0);
        step1.setActive(conducting);
        step0.setValue(input === 0 ? "აქტიური → Output = 1" : "დახურულია");
        step1.setValue(conducting ? "აქტიური → Output = 0" : "დახურულია");

        table.setActive(input);
        note.textContent = conducting
          ? "მაგალითი: Input = 1. ტრანზისტორმა გახსნა გზა მიწისკენ, Output დაუკავშირდა 0-ს → Output = 0."
          : "მაგალითი: Input = 0. ტრანზისტორი დახურულია, წინაღობა Output-ს 1-ზე ამაგრებს → Output = 1.";

        setChallengeResult(
          input === 1 && result === 0,
          input === 1
            ? "შესრულებულია: 1 შევიდა და 0 გამოვიდა."
            : "მიზანი: ჩართე Input, რომ NOT-მა 0 დააბრუნოს."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [inputSwitch.element]),
          CFZ.el("div", { className: "gate-symbol" }, [
            CFZ.svgSymbol("notGate"),
            CFZ.el("span", { className: "gate-symbol-label", text: "NOT" }),
          ]),
          output.element,
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ იწყობა ერთი ტრანზისტორისგან" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "NOT-ს სჭირდება ერთი ტრანზისტორი და ერთი წინაღობა. წინაღობა Output-ს სუსტად ეწევა 1-კენ; ტრანზისტორი კი, როცა Input = 1, იხსნება და Output-ს ძლიერად აბამს 0-ზე. აქტიური გზა მწვანედ ინთება.",
          }),
          circuit.element,
          CFZ.el("div", { className: "breakdown-flow" }, [step0.element, step1.element]),
        ]),
        table.element,
        note
      );
      update();

      function buildCircuit() {
        // ერთი ტრანზისტორი-ჩამრთველი (ჰორიზონტალური): node → switch → GND
        function sw(cls, x) {
          const mid = x + 20;
          return (
            '<g class="sw ' + cls + '">' +
            '<line class="lever lever-open" x1="' + x + '" y1="64" x2="' + (x + 32) + '" y2="50"/>' +
            '<line class="lever lever-closed" x1="' + x + '" y1="64" x2="' + (x + 40) + '" y2="64"/>' +
            '<line class="gate" x1="' + mid + '" y1="70" x2="' + mid + '" y2="88"/>' +
            '<circle class="contact" cx="' + x + '" cy="64" r="3.5"/>' +
            '<circle class="contact" cx="' + (x + 40) + '" cy="64" r="3.5"/>' +
            "</g>"
          );
        }

        const svgMarkup =
          '<svg class="circuit-svg" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NOT ტრანზისტორული წრედი">' +
          // pull-up path: VDD → R → node → (Output)
          '<path class="wire net-up" d="M30,64 H62"/>' +
          '<path class="wire net-up" d="M62,64 L70,58 L78,70 L86,58 L94,70 L102,58 L110,64"/>' +
          '<path class="wire net-up" d="M110,64 H152"/>' +
          '<path class="wire net-up" d="M152,64 V96"/>' +
          // pull-down path: node → switch → GND
          '<path class="wire net-down" d="M152,64 H178"/>' +
          '<path class="wire net-down" d="M218,64 H250"/>' +
          // VDD symbol
          '<path class="part" d="M16,46 H44"/>' +
          '<path class="part" d="M30,46 V64"/>' +
          // GND symbol
          '<path class="part" d="M250,64 V72"/>' +
          '<path class="part" d="M240,72 H260"/>' +
          '<path class="part" d="M245,78 H255"/>' +
          '<path class="part" d="M249,84 H251"/>' +
          // node dot
          '<circle class="contact net-up" cx="152" cy="64" r="3.5"/>' +
          // switch (transistor)
          sw("sw-in", 178) +
          // labels
          '<text class="lbl-sm" x="30" y="38" text-anchor="middle">VDD · 1</text>' +
          '<text class="lbl-sm" x="86" y="50" text-anchor="middle">R</text>' +
          '<text class="lbl" x="198" y="106" text-anchor="middle">Input</text>' +
          '<text class="lbl-sm" x="272" y="80">GND · 0</text>' +
          '<text class="val" id="notOut" x="152" y="114" text-anchor="middle">1</text>' +
          '<text class="lbl-sm" x="152" y="132" text-anchor="middle">Output</text>' +
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
            setNet("net-up", v.input === 0);
            setNet("sw-in", v.input === 1);
            setNet("net-down", v.input === 1);
            const out = svg.querySelector("#notOut");
            out.textContent = String(v.result);
            out.classList.toggle("on", v.result === 1);
          },
        };
      }
    },
  });
})();
