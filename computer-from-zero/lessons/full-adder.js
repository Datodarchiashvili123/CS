(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "full-adder",
    title: "სრული შემკრები",
    shortTitle: "Full Adder",
    theory: "სრული შემკრები ამატებს სამ ბიტს: A, B და Carry In. ასე შეიძლება მრავალი შემკრების მიბმა და უფრო დიდი რიცხვების შეკრება.",
    analogy: "ქაღალდზე სვეტებად შეკრებისას წინიდან გადმოსული 1 უნდა გაითვალისწინო. Carry In სწორედ ეს გადმოსული 1-ია.",
    physical: "სრული შემკრები რამდენიმე XOR, AND და OR კარიბჭით აერთიანებს მიმდინარე ბიტებს და წინა გადატანას.",
    challenge: "დააყენე A = 1, B = 1 და Carry In = 1, რომ მიიღო პასუხი 11.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const switchCarryIn = CFZ.createSwitch("Carry In", false, update);
      const sumOutput = CFZ.createBitOutput("SUM");
      const carryOutput = CFZ.createBitOutput("CARRY");
      const table = CFZ.createTruthTable(["A", "B", "Cin", "CARRY", "SUM"], [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 0],
        [1, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
      ]);
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const a = switchA.getValue();
        const b = switchB.getValue();
        const carryIn = switchCarryIn.getValue();
        const total = a + b + carryIn;
        const sum = total % 2;
        const carry = total >= 2 ? 1 : 0;
        const activeRow = a * 4 + b * 2 + carryIn;

        sumOutput.setValue(sum);
        carryOutput.setValue(carry);
        table.setActive(activeRow);
        note.textContent =
          "A + B + Carry In = " + total + ". ორობითი შედეგი არის " + carry + sum + ".";

        setChallengeResult(
          total === 3,
          total === 3
            ? "შესრულებულია: სამი ერთიანი გახდა 11 ორობითად."
            : "მიზანი: სამივე შესასვლელი გახადე 1."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [
            switchA.element,
            switchB.element,
            switchCarryIn.element,
          ]),
          CFZ.el("div", { className: "adder-core" }, [
            CFZ.el("span", { className: "adder-core-symbol", text: "Σ" }),
            CFZ.el("span", { className: "adder-core-label", text: "სრული შემკრები" }),
          ]),
          CFZ.el("div", { className: "logic-inputs" }, [carryOutput.element, sumOutput.element]),
        ]),
        CFZ.el("div", { className: "adder-grid" }, [
          CFZ.el("div", { className: "adder-path" }, [
            CFZ.el("strong", { text: "პირველი ნახევრად შემკრები" }),
            CFZ.el("span", { text: "A + B ქმნის შუალედურ SUM-ს და CARRY-ს." }),
          ]),
          CFZ.el("div", { className: "adder-path" }, [
            CFZ.el("strong", { text: "მეორე ნახევრად შემკრები" }),
            CFZ.el("span", { text: "შუალედურ SUM-ს ემატება Carry In." }),
          ]),
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რომელი კარიბჭეებისგან შედგება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "სრული შემკრები ამ სამი კარიბჭის კომბინაციაა — XOR ითვლის SUM-ს, AND და OR კი ერთად ქმნიან CARRY-ს.",
          }),
          CFZ.el("div", { className: "gate-legend" }, [
            CFZ.el("div", { className: "gate-symbol" }, [
              CFZ.svgSymbol("xorGate"),
              CFZ.el("span", { className: "gate-symbol-label", text: "XOR" }),
            ]),
            CFZ.el("div", { className: "gate-symbol" }, [
              CFZ.svgSymbol("andGate"),
              CFZ.el("span", { className: "gate-symbol-label", text: "AND" }),
            ]),
            CFZ.el("div", { className: "gate-symbol" }, [
              CFZ.svgSymbol("orGate"),
              CFZ.el("span", { className: "gate-symbol-label", text: "OR" }),
            ]),
          ]),
        ]),
        table.element,
        note
      );
      update();
    },
  });
})();
