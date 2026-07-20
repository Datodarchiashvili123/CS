(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "not-gate",
    title: "NOT კარიბჭე",
    shortTitle: "NOT",
    theory: "NOT კარიბჭე შემოსულ ბიტს აბრუნებს საპირისპიროდ: თუ შევიდა 0, გამოვა 1; თუ შევიდა 1, გამოვა 0.",
    analogy: "ეს ჰგავს საპირისპირო პასუხს: როცა ამბობ არა, ის ამბობს კი; როცა ამბობ კი, ის ამბობს არა.",
    physical: "NOT იწყობა ერთი ტრანზისტორითა და ერთი წინაღობით. წინაღობა Output-ს სუსტად აბამს 1-ზე; ტრანზისტორი კი, როცა Input = 1, იხსნება და Output-ს ძლიერად აბამს 0-ზე.",
    challenge: "შეიყვანე 1 და ნახე, როგორ აბრუნებს NOT კარიბჭე 0-ს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const inputSwitch = CFZ.createSwitch("Input", false, update);
      const output = CFZ.createBitOutput("Output");

      // ტრანზისტორის სქემა კონვენციური სიმბოლოებით: VDD → R → Output → MOSFET → GND.
      const powerPart = CFZ.createSchematicPart("vdd", "კვება", "VDD · 1");
      const resistorPart = CFZ.createSchematicPart("resistor", "წინაღობა", "R");
      const topTrack = CFZ.createElectronTrack("vertical");
      const bottomTrack = CFZ.createElectronTrack("vertical");
      const transistorPart = CFZ.createSchematicPart("transistor", "ტრანზისტორი", "MOSFET");
      const groundPart = CFZ.createSchematicPart("ground", "მიწა", "GND · 0");

      const nodeValue = CFZ.el("div", { className: "output-digit is-one", text: "1" });
      const circuitNode = CFZ.el("div", { className: "inverter-node" }, [
        CFZ.el("span", { className: "inverter-node-label", text: "Output კვანძი" }),
        nodeValue,
      ]);

      const step0 = CFZ.createBreakdownStep(
        "Input = 0",
        "ტრანზისტორი დახურულია. მარტო წინაღობა მოქმედებს და Output-ს კვებას (1) აბამს."
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

        nodeValue.textContent = String(result);
        nodeValue.classList.toggle("is-one", result === 1);

        // აქტიური კავშირი: 0-ზე ტოპ-გზა (წინაღობა→1), 1-ზე ქვედა გზა (ტრანზისტორი→0).
        topTrack.setFlowing(input === 0);
        bottomTrack.setFlowing(conducting);
        transistorPart.setActive(conducting);

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
            text: "NOT-ს სჭირდება ერთი ტრანზისტორი (ის, რაც ვისწავლეთ) და ერთი წინაღობა. წინაღობა არის დეტალი, რომელიც დენს ზღუდავს — ვიწრო მილივით ატარებს, მაგრამ ცოტას.",
          }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "სწორედ ამიტომ წინაღობა Output-ს სუსტად ეწევა 1-კენ; ტრანზისტორი კი, როცა იხსნება, ძლიერად აბამს 0-ზე და იმარჯვებს. წინაღობა ასევე იცავს სქემას მოკლე ჩართვისგან.",
          }),
          CFZ.el("div", { className: "inverter-layout" }, [
            CFZ.el("div", { className: "wire-stack" }, [
              powerPart.element,
              resistorPart.element,
              topTrack.element,
              circuitNode,
              bottomTrack.element,
              transistorPart.element,
              groundPart.element,
            ]),
            CFZ.el("div", { className: "breakdown-flow" }, [step0.element, step1.element]),
          ]),
        ]),
        table.element,
        note
      );
      update();
    },
  });
})();
