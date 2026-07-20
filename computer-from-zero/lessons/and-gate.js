(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "and-gate",
    title: "AND კარიბჭე",
    shortTitle: "AND",
    theory: "AND კარიბჭე 1-ს აბრუნებს მხოლოდ მაშინ, როცა ორივე შესასვლელი 1 არის.",
    analogy: "წარმოიდგინე ორი გასაღები ერთ კარზე: კარი გაიღება მხოლოდ მაშინ, როცა ორივე გასაღები ჩართულია.",
    physical: "ჩიპებში AND ხშირად იკრიბება ასე: ტრანზისტორებით ჯერ NAND კეთდება, შემდეგ NOT აბრუნებს მას და ვიღებთ AND-ს.",
    challenge: "ჩართე A და B ერთად, რომ Output გახდეს 1.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const chipA = CFZ.createSignalChip("A", 0);
      const chipB = CFZ.createSignalChip("B", 0);
      const nandChip = CFZ.createSignalChip("NAND შუალედი", 1);
      const outputChip = CFZ.createSignalChip("AND Output", 0);
      const pullDownStep = CFZ.createBreakdownStep(
        "ქვედა სერიული გზა",
        "N-ტიპის ორი ტრანზისტორი რიგში დგას. დენი მიწისკენ გაივლის მხოლოდ მაშინ, როცა A = 1 და B = 1."
      );
      const pullUpStep = CFZ.createBreakdownStep(
        "ზედა პარალელური გზა",
        "P-ტიპის ტრანზისტორებიდან ერთი ღია გზაც საკმარისია, რომ NAND დარჩეს 1-ზე."
      );
      const notStep = CFZ.createBreakdownStep(
        "ბოლო NOT",
        "NAND-ის შედეგი ინვერტორში შედის და ასე ვიღებთ AND-ს."
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
        const result = a === 1 && b === 1 ? 1 : 0;
        const nand = result === 1 ? 0 : 1;
        const bothSignals = result === 1;
        const activeRow = a * 2 + b;

        output.setValue(result);
        chipA.setValue(a);
        chipB.setValue(b);
        nandChip.setValue(nand);
        outputChip.setValue(result);
        pullDownStep.setActive(bothSignals);
        pullUpStep.setActive(!bothSignals);
        notStep.setActive(true);
        pullDownStep.setValue(bothSignals ? "NAND = 0" : "დახურულია");
        pullUpStep.setValue(!bothSignals ? "NAND = 1" : "დახურულია");
        notStep.setValue("AND = " + result);
        table.setActive(activeRow);
        note.textContent =
          "A = " +
          a +
          ", B = " +
          b +
          ". ტრანზისტორების პირველი ფენა ქმნის NAND = " +
          nand +
          "-ს, ბოლო NOT კი აბრუნებს მას და იღებს AND = " +
          result +
          ".";
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
          CFZ.el("h4", { text: "ტრანზისტორებიდან აგება" }),
          CFZ.el("p", {
            className: "formula-line",
            text: "AND = NOT(NAND)",
          }),
          CFZ.el("div", { className: "signal-grid" }, [
            chipA.element,
            chipB.element,
            nandChip.element,
            outputChip.element,
          ]),
          CFZ.el("div", { className: "breakdown-flow" }, [
            pullDownStep.element,
            pullUpStep.element,
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
