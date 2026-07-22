(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "half-adder",
    title: "ნახევრად შემკრები",
    shortTitle: "Half Adder",
    theory: "ნახევრად შემკრები (Half Adder) მხოლოდ ორ ბიტს კრებს — A და B. მას აქვს ორი გამოსავალი: SUM (ერთეულების ადგილი) და CARRY (შემდეგ სვეტში გადასატანი). სახელი „ნახევრად“ ზუსტად იმას ნიშნავს, რომ ის საქმის მხოლოდ ნახევარს აკეთებს: ითვლის მხოლოდ A + B-ს და წინა სვეტიდან მოსული გადატანის (Carry In) მიღება არ შეუძლია. სწორედ ამიტომ მარტო მრავალბიტიან შეკრებას ვერ აწყობს.",
    analogy: "ეს ჩვეულებრივი, სვეტებად შეკრებაა: 1 + 1 = 10 — ერთეულების ადგილზე იწერება 0, ხოლო 1 გადადის შემდეგ სვეტში. ეს გადასული 1 არის სწორედ CARRY.",
    physical: "ორი კარიბჭე კმარა: SUM = A XOR B (1 გამოდის მხოლოდ მაშინ, როცა ბიტები განსხვავდება), CARRY = A AND B (გადატანა ჩნდება მხოლოდ მაშინ, როცა ორივე ბიტი 1-ია).",
    challenge: "დააყენე A = 1 და B = 1, რომ მიიღო ორობითი პასუხი 10.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const sumOutput = CFZ.createBitOutput("SUM");
      const carryOutput = CFZ.createBitOutput("CARRY");
      const diagram = buildDiagram();

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
        diagram.setValues({ a: a, b: b, sum: sum, carry: carry });
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
          CFZ.el("div", { className: "adder-core" }, [
            CFZ.el("span", { className: "adder-core-symbol", text: "Σ" }),
            CFZ.el("span", { className: "adder-core-label", text: "ნახევრად შემკრები" }),
          ]),
          CFZ.el("div", { className: "logic-inputs" }, [carryOutput.element, sumOutput.element]),
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ იწყობა კარიბჭეებისგან" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "A და B ორივე შედის XOR-სა და AND-ში. XOR იძლევა SUM-ს, AND — CARRY-ს. ერთ წინადადებად: Half Adder = A + B (წინა Carry-ს არ ითვალისწინებს) — სწორედ ამ ნაკლს ავსებს Full Adder. აქტიური მავთულები მწვანედ ინთება.",
          }),
          diagram.element,
        ]),
        table.element,
        note
      );
      update();

      function buildDiagram() {
        const xor = CFZ.schematicGate("xor", 200, 66, "gate net-sum");
        const and = CFZ.schematicGate("and", 200, 158, "gate net-carry");
        const svgMarkup =
          '<svg class="schematic-diagram" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ნახევრად შემკრების სქემა">' +
          '<text class="lbl" x="6" y="61">A</text>' +
          '<text class="lbl" x="6" y="171">B</text>' +
          '<circle class="dot net-a" cx="24" cy="57" r="3.5"/>' +
          '<circle class="dot net-b" cx="24" cy="167" r="3.5"/>' +
          '<circle class="dot net-a" cx="80" cy="57" r="3"/>' +
          '<circle class="dot net-b" cx="100" cy="167" r="3"/>' +
          '<path class="wire net-a" d="M24,57 H203"/>' +
          '<path class="wire net-a" d="M80,57 V149 H200"/>' +
          '<path class="wire net-b" d="M24,167 H200"/>' +
          '<path class="wire net-b" d="M100,167 V75 H203"/>' +
          '<path class="wire net-sum" d="M240,66 H330"/>' +
          '<path class="wire net-carry" d="M236,158 H330"/>' +
          xor.markup +
          and.markup +
          '<text class="lbl" x="336" y="62">SUM</text>' +
          '<text class="lbl" x="336" y="162">CARRY</text>' +
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
            setNet("net-sum", v.sum === 1);
            setNet("net-carry", v.carry === 1);
          },
        };
      }
    },
  });
})();
