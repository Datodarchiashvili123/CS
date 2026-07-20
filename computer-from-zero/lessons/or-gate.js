(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "or-gate",
    title: "OR კარიბჭე",
    shortTitle: "OR",
    theory: "OR კარიბჭე 1-ს აბრუნებს მაშინ, როცა მინიმუმ ერთი შესასვლელი მაინც 1 არის.",
    analogy: "ეს ჰგავს ორ კარზე შესვლას: თუ ერთი კარი მაინც ღიაა, ოთახში შეხვალ.",
    physical: "ჩიპებში OR ხშირად იკრიბება ასე: ტრანზისტორებით ვაკეთებთ NOR-ს, შემდეგ კი NOT კარიბჭე მას აბრუნებს და ვიღებთ OR-ს.",
    challenge: "ჩართე მხოლოდ ერთი შესასვლელი და Output გახადე 1.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const chipA = CFZ.createSignalChip("A", 0);
      const chipB = CFZ.createSignalChip("B", 0);
      const norChip = CFZ.createSignalChip("NOR შუალედი", 1);
      const outputChip = CFZ.createSignalChip("OR Output", 0);
      const pullUpStep = CFZ.createBreakdownStep(
        "ზედა სერიული გზა",
        "P-ტიპის ტრანზისტორები NOR-ს 1-ზე აბამს მხოლოდ მაშინ, როცა A = 0 და B = 0."
      );
      const pullDownStep = CFZ.createBreakdownStep(
        "ქვედა პარალელური გზა",
        "N-ტიპის ტრანზისტორებიდან ერთი გახსნილი გზაც საკმარისია, რომ NOR ჩამოვიდეს 0-ზე."
      );
      const notStep = CFZ.createBreakdownStep(
        "ბოლო NOT",
        "NOR-ის შედეგს ვაბრუნებთ საპირისპიროდ და ასე ვიღებთ OR-ს."
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
        const result = a === 1 || b === 1 ? 1 : 0;
        const nor = result === 1 ? 0 : 1;
        const hasAnySignal = result === 1;
        const activeRow = a * 2 + b;

        output.setValue(result);
        chipA.setValue(a);
        chipB.setValue(b);
        norChip.setValue(nor);
        outputChip.setValue(result);
        pullUpStep.setActive(!hasAnySignal);
        pullDownStep.setActive(hasAnySignal);
        notStep.setActive(true);
        pullUpStep.setValue(!hasAnySignal ? "NOR = 1" : "დახურულია");
        pullDownStep.setValue(hasAnySignal ? "NOR = 0" : "დახურულია");
        notStep.setValue("OR = " + result);
        table.setActive(activeRow);
        note.textContent =
          "A = " +
          a +
          ", B = " +
          b +
          ". ტრანზისტორების პირველი ფენა ქმნის NOR = " +
          nor +
          "-ს, ბოლო NOT კი აბრუნებს მას და იღებს OR = " +
          result +
          ".";
        setChallengeResult(
          result === 1 && a + b === 1,
          result === 1 && a + b === 1
            ? "შესრულებულია: ერთი სიგნალიც საკმარისია."
            : "მიზანი: ზუსტად ერთი შესასვლელი ჩართე."
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
          CFZ.el("h4", { text: "ტრანზისტორებიდან აგება" }),
          CFZ.el("p", {
            className: "formula-line",
            text: "OR = NOT(NOR)",
          }),
          CFZ.el("div", { className: "signal-grid" }, [
            chipA.element,
            chipB.element,
            norChip.element,
            outputChip.element,
          ]),
          CFZ.el("div", { className: "breakdown-flow" }, [
            pullUpStep.element,
            pullDownStep.element,
            notStep.element,
          ]),
        ]),
        table.element,
        note
      );
      update();
    },
  });
})();
