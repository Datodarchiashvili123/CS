(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "half-adder",
    title: "ნახევრად შემკრები",
    shortTitle: "Half Adder",
    theory: "ნახევრად შემკრები ორ ბიტს უმატებს. SUM ითვლის ერთეულების ადგილს, CARRY კი გადატანას შემდეგ ადგილას.",
    analogy: "როცა 1 + 1 გაქვს, ერთეულების ადგილზე 0 იწერება და 1 გადადის შემდეგ სვეტში, როგორც ჩვეულებრივ შეკრებაში.",
    physical: "SUM-ს XOR კარიბჭე ქმნის, რადგან 1 გამოდის მხოლოდ განსხვავებული ბიტების დროს. CARRY-ს AND ქმნის, რადგან გადატანა მაშინ ჩნდება, როცა ორივე ბიტი 1 არის.",
    challenge: "დააყენე A = 1 და B = 1, რომ მიიღო ორობითი პასუხი 10.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const sumOutput = CFZ.createBitOutput("SUM");
      const carryOutput = CFZ.createBitOutput("CARRY");
      const table = CFZ.createTruthTable(["A", "B", "CARRY", "SUM"], [
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const a = switchA.getValue();
        const b = switchB.getValue();
        const sum = a !== b ? 1 : 0;
        const carry = a === 1 && b === 1 ? 1 : 0;
        const activeRow = a * 2 + b;

        sumOutput.setValue(sum);
        carryOutput.setValue(carry);
        table.setActive(activeRow);
        note.textContent =
          a + " + " + b + " = " + carry + sum + " ორობითად. XOR ქმნის SUM-ს, AND ქმნის CARRY-ს.";

        setChallengeResult(
          a === 1 && b === 1,
          a === 1 && b === 1
            ? "შესრულებულია: 1 + 1 = 10 ორობითად."
            : "მიზანი: ორივე ბიტი გახადე 1."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [switchA.element, switchB.element]),
          CFZ.el("div", { className: "adder-gates" }, [
            CFZ.el("div", { className: "adder-gate" }, [
              CFZ.svgSymbol("xorGate"),
              CFZ.el("span", { className: "gate-symbol-label", text: "XOR → SUM" }),
            ]),
            CFZ.el("div", { className: "adder-gate" }, [
              CFZ.svgSymbol("andGate"),
              CFZ.el("span", { className: "gate-symbol-label", text: "AND → CARRY" }),
            ]),
          ]),
          CFZ.el("div", { className: "logic-inputs" }, [carryOutput.element, sumOutput.element]),
        ]),
        CFZ.el("div", { className: "adder-grid" }, [
          CFZ.el("div", { className: "adder-path" }, [
            CFZ.el("strong", { text: "XOR გზა" }),
            CFZ.el("span", { text: "A და B განსხვავდება → SUM = 1" }),
          ]),
          CFZ.el("div", { className: "adder-path" }, [
            CFZ.el("strong", { text: "AND გზა" }),
            CFZ.el("span", { text: "A და B ორივე 1 არის → CARRY = 1" }),
          ]),
        ]),
        table.element,
        note
      );
      update();
    },
  });
})();
