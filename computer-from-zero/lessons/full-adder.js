(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "full-adder",
    title: "სრული შემკრები",
    shortTitle: "Full Adder",
    theory: "სრული შემკრები ამატებს სამ ბიტს: A, B და Carry In. სწორედ Carry In-ის მიღების უნარი განასხვავებს მას ნახევრად შემკრებისგან — ამის წყალობით შემკრებების ჯაჭვად მიბმა და დიდი რიცხვების შეკრება ხდება. ეს ჯაჭვი შემდეგ ALU-ს შიგნით მუშაობს.",
    analogy: "ქაღალდზე სვეტებად შეკრებისას წინიდან გადმოსული 1 უნდა გაითვალისწინო. Carry In სწორედ ეს გადმოსული 1-ია.",
    physical: "სრული შემკრები ორი XOR-ით, ორი AND-ითა და ერთი OR-ით აერთიანებს მიმდინარე ბიტებსა და წინა გადატანას.",
    challenge: "დააყენე A = 1, B = 1 და Carry In = 1, რომ მიიღო პასუხი 11.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const switchCarryIn = CFZ.createSwitch("Carry In", false, update);
      const sumOutput = CFZ.createBitOutput("SUM");
      const carryOutput = CFZ.createBitOutput("CARRY");
      const diagram = buildDiagram();

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
        const s1 = a !== b ? 1 : 0;
        const c1 = a === 1 && b === 1 ? 1 : 0;
        const sum = s1 !== carryIn ? 1 : 0;
        const c2 = s1 === 1 && carryIn === 1 ? 1 : 0;
        const carry = c1 === 1 || c2 === 1 ? 1 : 0;
        const total = a + b + carryIn;
        const activeRow = a * 4 + b * 2 + carryIn;

        sumOutput.setValue(sum);
        carryOutput.setValue(carry);
        diagram.setValues({
          a: a,
          b: b,
          cin: carryIn,
          s1: s1,
          c1: c1,
          sum: sum,
          c2: c2,
          carry: carry,
        });
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
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ იწყობა კარიბჭეებისგან" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ორი XOR ითვლის SUM-ს (A, B და Carry In), ორი AND და ერთი OR კი ქმნიან CARRY-ს. აქტიური მავთულები მწვანედ ინთება.",
          }),
          diagram.element,
        ]),
        table.element,
        note
      );
      update();

      function buildDiagram() {
        const xor1 = CFZ.schematicGate("xor", 150, 63, "gate net-s1");
        const and1 = CFZ.schematicGate("and", 150, 135, "gate net-c1");
        const xor2 = CFZ.schematicGate("xor", 330, 105, "gate net-sum");
        const and2 = CFZ.schematicGate("and", 330, 180, "gate net-c2");
        const orGate = CFZ.schematicGate("or", 440, 220, "gate net-carry");

        const svgMarkup =
          '<svg class="schematic-diagram" viewBox="0 0 540 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="სრული შემკრების სქემა">' +
          // A net
          '<path class="wire net-a" d="M20,54 H153"/>' +
          '<path class="wire net-a" d="M50,54 V126 H150"/>' +
          // B net
          '<path class="wire net-b" d="M20,72 H153"/>' +
          '<path class="wire net-b" d="M70,72 V144 H150"/>' +
          // s1 net (xor1 out → xor2, and2)
          '<path class="wire net-s1" d="M190,63 H250"/>' +
          '<path class="wire net-s1" d="M250,63 V171"/>' +
          '<path class="wire net-s1" d="M250,96 H333"/>' +
          '<path class="wire net-s1" d="M250,171 H330"/>' +
          // Cin net
          '<path class="wire net-cin" d="M20,250 H290"/>' +
          '<path class="wire net-cin" d="M290,250 V114"/>' +
          '<path class="wire net-cin" d="M290,114 H333"/>' +
          '<path class="wire net-cin" d="M290,189 H330"/>' +
          // c1 net (and1 out → or top)
          '<path class="wire net-c1" d="M186,135 V211 H443"/>' +
          // c2 net (and2 out → or bottom)
          '<path class="wire net-c2" d="M366,180 H410 V229 H443"/>' +
          // outputs
          '<path class="wire net-sum" d="M370,105 H500"/>' +
          '<path class="wire net-carry" d="M480,220 H512"/>' +
          // gates
          xor1.markup +
          and1.markup +
          xor2.markup +
          and2.markup +
          orGate.markup +
          // junction dots
          '<circle class="dot net-a" cx="20" cy="54" r="3.5"/>' +
          '<circle class="dot net-b" cx="20" cy="72" r="3.5"/>' +
          '<circle class="dot net-cin" cx="20" cy="250" r="3.5"/>' +
          '<circle class="dot net-a" cx="50" cy="54" r="3"/>' +
          '<circle class="dot net-b" cx="70" cy="72" r="3"/>' +
          '<circle class="dot net-s1" cx="250" cy="96" r="3"/>' +
          '<circle class="dot net-cin" cx="290" cy="189" r="3"/>' +
          // labels
          '<text class="lbl" x="4" y="58">A</text>' +
          '<text class="lbl" x="4" y="76">B</text>' +
          '<text class="lbl" x="0" y="254">Cin</text>' +
          '<text class="lbl" x="486" y="101">SUM</text>' +
          '<text class="lbl" x="486" y="224">CARRY</text>' +
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
            setNet("net-cin", v.cin === 1);
            setNet("net-s1", v.s1 === 1);
            setNet("net-c1", v.c1 === 1);
            setNet("net-sum", v.sum === 1);
            setNet("net-c2", v.c2 === 1);
            setNet("net-carry", v.carry === 1);
          },
        };
      }
    },
  });
})();
