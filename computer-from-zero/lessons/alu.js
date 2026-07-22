(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "alu",
    title: "ALU — არითმეტიკულ-ლოგიკური ბლოკი",
    shortTitle: "ALU",
    theory: "ALU არის CPU-ის ნაწილი, რომელიც რიცხვებზე მოქმედებებს ასრულებს. ის დგას წინა გაკვეთილის მრავალბიტიან ბლოკებზე — შემკრებსა და რეგისტრებზე. ALU ერთდროულად ითვლის რამდენიმე ოპერაციას (შეკრება, AND, OR, XOR...) და „სელექტორი“ ირჩევს, რომელი შედეგი გამოიტანოს.",
    analogy: "ALU მრავალფუნქციურ ხელსაწყოს ჰგავს — შიგნით ბევრი „დანა“ ზის, სელექტორი კი ირჩევს, რომელი გამოიყენოს ახლა.",
    physical: "შიგნით ALU შედგება შემკრებისგან (ჯაჭვად მიბმული სრული შემკრებები), AND/OR/XOR კარიბჭეების რიგებისგან და მულტიპლექსორისგან, რომელიც ოპერაციის კოდის მიხედვით ერთ შედეგს ატარებს გამოსავალზე.",
    challenge: "აირჩიე ოპერაცია + , დააყენე A = 5 და B = 3 და მიიღე 8.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const ops = [
        { key: "ADD", sym: "+", fn: function (a, b) { return a + b; } },
        { key: "AND", sym: "AND", fn: function (a, b) { return a & b; } },
        { key: "OR", sym: "OR", fn: function (a, b) { return a | b; } },
        { key: "XOR", sym: "XOR", fn: function (a, b) { return a ^ b; } },
      ];
      let currentOp = "ADD";

      const stepperA = createStepper("A", 7, update);
      const stepperB = createStepper("B", 7, update);

      const resultDecimal = CFZ.el("strong", { className: "alu-result-decimal", text: "0" });
      const resultBinary = CFZ.el("span", { className: "alu-result-binary", text: "0" });

      const opButtons = ops.map(function (op) {
        const element = CFZ.el("button", {
          className: "op-button",
          attrs: { type: "button" },
          text: op.sym,
          on: {
            click: function () {
              currentOp = op.key;
              update();
            },
          },
        });
        return { op: op, element: element };
      });

      const opUnits = ops.map(function (op) {
        const value = CFZ.el("span", { className: "op-unit-value", text: "0" });
        const element = CFZ.el("div", { className: "op-unit" }, [
          CFZ.el("span", { className: "op-unit-name", text: op.sym }),
          value,
        ]);
        return { op: op, value: value, element: element };
      });

      const note = CFZ.el("p", { className: "state-note" });

      function currentSym() {
        for (let i = 0; i < ops.length; i++) {
          if (ops[i].key === currentOp) {
            return ops[i].sym;
          }
        }
        return "";
      }

      function update() {
        const a = stepperA.getValue();
        const b = stepperB.getValue();
        const results = {};
        ops.forEach(function (op) {
          results[op.key] = op.fn(a, b);
        });
        const r = results[currentOp];

        resultDecimal.textContent = String(r);
        resultBinary.textContent = r.toString(2);

        opButtons.forEach(function (ob) {
          ob.element.classList.toggle("is-active", ob.op.key === currentOp);
        });
        opUnits.forEach(function (u) {
          u.value.textContent = String(results[u.op.key]);
          u.element.classList.toggle("is-active", u.op.key === currentOp);
        });

        const sym = currentSym();
        note.textContent =
          "A = " + a + ", B = " + b + ", ოპერაცია " + sym + " → შედეგი " + r +
          " (" + r.toString(2) + " ორობითში). ALU ყველა ოპერაციას ითვლის, სელექტორმა კი " + sym + " აირჩია.";

        setChallengeResult(
          currentOp === "ADD" && a === 5 && b === 3 && r === 8,
          currentOp === "ADD" && a === 5 && b === 3 && r === 8
            ? "შესრულებულია: ALU-მ 5 + 3 გამოთვალა და მიიღო 8 (როგორც CPU-ში)."
            : "მიზანი: ოპერაცია + , A = 5, B = 3 → 8."
        );
      }

      container.append(
        CFZ.el("div", { className: "alu-controls" }, [
          CFZ.el("div", { className: "alu-inputs" }, [stepperA.element, stepperB.element]),
          CFZ.el("div", { className: "op-selector" }, [
            CFZ.el("span", { className: "switch-label", text: "ოპერაცია (სელექტორი)" }),
            CFZ.el("div", { className: "op-button-row" }, opButtons.map(function (o) { return o.element; })),
          ]),
          CFZ.el("div", { className: "alu-result" }, [
            CFZ.el("span", { className: "alu-result-label", text: "შედეგი" }),
            resultDecimal,
            CFZ.el("span", { className: "alu-result-bin-label", text: "ორობითში" }),
            resultBinary,
          ]),
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ მუშაობს ALU შიგნით" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ALU ერთდროულად ითვლის ყველა ოპერაციას. მერე სელექტორი (მულტიპლექსორი) მხოლოდ არჩეული ოპერაციის შედეგს ატარებს გამოსავალზე. რომელი ოპერაცია აირჩევა, ამას CPU-ს ინსტრუქცია განსაზღვრავს (ოპერაციის კოდი). აქტიური ბლოკი მწვანედ ინთება.",
          }),
          CFZ.el("div", { className: "op-units" }, opUnits.map(function (u) { return u.element; })),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "შიგნით: „+“ არის ჯაჭვად მიბმული სრული შემკრებები (წინა გაკვეთილი); AND/OR/XOR კი კარიბჭეების რიგებია. რეალურ ALU-ს კიდევ აქვს გამოკლება და შედარება. სწორედ ეს ALU ზის CPU-ს შიგნით.",
          }),
        ]),
        note
      );
      update();

      function createStepper(label, max, onChange) {
        let value = 0;
        const valueEl = CFZ.el("span", { className: "stepper-value", text: "0" });
        const dec = CFZ.el("button", {
          className: "stepper-btn",
          attrs: { type: "button", "aria-label": label + " შემცირება" },
          text: "−",
          on: {
            click: function () {
              if (value > 0) {
                value -= 1;
                valueEl.textContent = String(value);
                onChange();
              }
            },
          },
        });
        const inc = CFZ.el("button", {
          className: "stepper-btn",
          attrs: { type: "button", "aria-label": label + " გაზრდა" },
          text: "+",
          on: {
            click: function () {
              if (value < max) {
                value += 1;
                valueEl.textContent = String(value);
                onChange();
              }
            },
          },
        });
        const wrapper = CFZ.el("div", { className: "stepper" }, [
          CFZ.el("span", { className: "switch-label", text: label }),
          CFZ.el("div", { className: "stepper-row" }, [dec, valueEl, inc]),
        ]);
        return {
          element: wrapper,
          getValue: function () {
            return value;
          },
        };
      }
    },
  });
})();
