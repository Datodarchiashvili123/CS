(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "xor-gate",
    title: "XOR კარიბჭე",
    shortTitle: "XOR",
    theory: "XOR კარიბჭე 1-ს აბრუნებს მხოლოდ მაშინ, როცა აქტიურია ზუსტად ერთი შესასვლელი.",
    analogy: "წარმოიდგინე არჩევანი: შეგიძლია აირჩიო მარცხენა ან მარჯვენა, მაგრამ არა ორივე ერთად.",
    physical: "XOR იკრიბება პატარა კარიბჭეებისგან: ჯერ A-სა და B-ს საპირისპიროები მზადდება, შემდეგ ორი AND გზა მოწმდება და ბოლოს OR აერთიანებს მათ.",
    challenge: "ჩართე ზუსტად ერთი შესასვლელი. ორივე ერთად XOR-ს გამორთავს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const chipA = CFZ.createSignalChip("A", 0);
      const chipB = CFZ.createSignalChip("B", 0);
      const chipNotA = CFZ.createSignalChip("NOT A", 1);
      const chipNotB = CFZ.createSignalChip("NOT B", 1);
      const chipLeft = CFZ.createSignalChip("A AND NOT B", 0);
      const chipRight = CFZ.createSignalChip("NOT A AND B", 0);
      const chipOutput = CFZ.createSignalChip("XOR Output", 0);
      const notStep = CFZ.createBreakdownStep(
        "1. NOT ფენა",
        "ორი ინვერტორი ტრანზისტორებით ქმნის NOT A-ს და NOT B-ს."
      );
      const leftStep = CFZ.createBreakdownStep(
        "2. მარცხენა AND",
        "ეს გზა აქტიურია მხოლოდ მაშინ, როცა A = 1 და B = 0."
      );
      const rightStep = CFZ.createBreakdownStep(
        "3. მარჯვენა AND",
        "ეს გზა აქტიურია მხოლოდ მაშინ, როცა A = 0 და B = 1."
      );
      const orStep = CFZ.createBreakdownStep(
        "4. OR გაერთიანება",
        "თუ რომელიმე AND გზა გახდა 1, საბოლოო XOR Output ხდება 1."
      );
      const table = CFZ.createTruthTable(["A", "B", "Output"], [
        [0, 0, 0],
        [0, 1, 1],
        [1, 0, 1],
        [1, 1, 0],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const a = switchA.getValue();
        const b = switchB.getValue();
        const notA = a === 1 ? 0 : 1;
        const notB = b === 1 ? 0 : 1;
        const leftPath = a === 1 && notB === 1 ? 1 : 0;
        const rightPath = notA === 1 && b === 1 ? 1 : 0;
        const result = a !== b ? 1 : 0;
        const activeRow = a * 2 + b;

        output.setValue(result);
        chipA.setValue(a);
        chipB.setValue(b);
        chipNotA.setValue(notA);
        chipNotB.setValue(notB);
        chipLeft.setValue(leftPath);
        chipRight.setValue(rightPath);
        chipOutput.setValue(result);
        notStep.setActive(true);
        leftStep.setActive(leftPath === 1);
        rightStep.setActive(rightPath === 1);
        orStep.setActive(result === 1);
        notStep.setValue("NOT A = " + notA + ", NOT B = " + notB);
        leftStep.setValue("გზა = " + leftPath);
        rightStep.setValue("გზა = " + rightPath);
        orStep.setValue("XOR = " + result);
        table.setActive(activeRow);
        note.textContent =
          "A = " +
          a +
          ", B = " +
          b +
          ". XOR ამოწმებს ორ გზას: A AND NOT B = " +
          leftPath +
          " და NOT A AND B = " +
          rightPath +
          ". საბოლოო Output = " +
          result +
          ".";
        setChallengeResult(
          result === 1,
          result === 1
            ? "შესრულებულია: XOR-ს ზუსტად ერთი აქტიური შესასვლელი უნდა."
            : "მიზანი: ჩართე მხოლოდ A ან მხოლოდ B."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [switchA.element, switchB.element]),
          CFZ.el("div", { className: "gate-symbol" }, [
            CFZ.svgSymbol("xorGate"),
            CFZ.el("span", { className: "gate-symbol-label", text: "XOR" }),
          ]),
          output.element,
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ტრანზისტორებიდან აგება" }),
          CFZ.el("p", {
            className: "formula-line",
            text: "XOR = (A AND NOT B) OR (NOT A AND B)",
          }),
          CFZ.el("div", { className: "signal-grid" }, [
            chipA.element,
            chipB.element,
            chipNotA.element,
            chipNotB.element,
            chipLeft.element,
            chipRight.element,
            chipOutput.element,
          ]),
          CFZ.el("div", { className: "breakdown-flow" }, [
            notStep.element,
            leftStep.element,
            rightStep.element,
            orStep.element,
          ]),
        ]),
        table.element,
        note
      );
      update();
    },
  });
})();
