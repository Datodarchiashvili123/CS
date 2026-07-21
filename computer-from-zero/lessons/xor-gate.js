(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "xor-gate",
    title: "XOR კარიბჭე",
    shortTitle: "XOR",
    theory: "XOR კარიბჭე 1-ს აბრუნებს მხოლოდ მაშინ, როცა აქტიურია ზუსტად ერთი შესასვლელი.",
    analogy: "წარმოიდგინე არჩევანი: შეგიძლია აირჩიო მარცხენა ან მარჯვენა, მაგრამ არა ორივე ერთად.",
    physical: "XOR პირდაპირ მარტივ ტრანზისტორ-განლაგებად არ იშლება, ამიტომ ის უკვე ნასწავლი კარიბჭეებისგან იკრიბება: ორი NOT ქმნის საპირისპიროებს, ორი AND ამოწმებს ორ გზას, ბოლოს კი OR აერთიანებს მათ.",
    challenge: "ჩართე ზუსტად ერთი შესასვლელი. ორივე ერთად XOR-ს გამორთავს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const switchA = CFZ.createSwitch("A", false, update);
      const switchB = CFZ.createSwitch("B", false, update);
      const output = CFZ.createBitOutput("Output");
      const diagram = buildDiagram();

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
        diagram.setValues({
          a: a,
          b: b,
          notA: notA,
          notB: notB,
          left: leftPath,
          right: rightPath,
          xor: result,
        });

        table.setActive(activeRow);
        note.textContent =
          "A = " +
          a +
          ", B = " +
          b +
          ". ორი გზა: A·(NOT B) = " +
          leftPath +
          " და (NOT A)·B = " +
          rightPath +
          ". OR აერთიანებს მათ → XOR = " +
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
          CFZ.el("h4", { text: "როგორ იწყობა კარიბჭეებისგან" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "XOR სამი სახის კარიბჭისგან იკრიბება. აქტიური მავთულები მწვანედ ინთება — ასე ხედავ, რომელი გზა მუშაობს ახლა.",
          }),
          diagram.element,
          CFZ.el("p", {
            className: "formula-line",
            text: "A ⊕ B = (A · NOT B) + (NOT A · B)",
          }),
        ]),
        table.element,
        note
      );
      update();

      function buildDiagram() {
        const svgMarkup =
          '<svg class="schematic-diagram" viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="XOR კარიბჭის სქემა">' +
          // input labels + dots
          '<text class="lbl" x="6" y="57">A</text>' +
          '<text class="lbl" x="6" y="213">B</text>' +
          '<circle class="dot net-a" cx="24" cy="52" r="3.5"/>' +
          '<circle class="dot net-b" cx="24" cy="208" r="3.5"/>' +
          '<circle class="dot net-a" cx="60" cy="52" r="3"/>' +
          '<circle class="dot net-b" cx="76" cy="208" r="3"/>' +
          // A net wires
          '<path class="wire net-a" d="M24,52 H250"/>' +
          '<path class="wire net-a" d="M60,52 V182 H150"/>' +
          // B net wires
          '<path class="wire net-b" d="M24,208 H250"/>' +
          '<path class="wire net-b" d="M76,208 V78 H150"/>' +
          // NOT outputs
          '<path class="wire net-notb" d="M186,78 H214 V70 H250"/>' +
          '<path class="wire net-nota" d="M186,182 H214 V191 H250"/>' +
          // AND outputs to OR
          '<path class="wire net-ab" d="M286,61 H320 V121 H354"/>' +
          '<path class="wire net-ab2" d="M286,200 H320 V139 H354"/>' +
          // OR output
          '<path class="wire net-xor" d="M392,130 H426"/>' +
          // NOT gates
          '<path class="gate net-notb" d="M150,66 L176,78 L150,90 Z"/>' +
          '<circle class="gate net-notb" cx="181" cy="78" r="5"/>' +
          '<path class="gate net-nota" d="M150,170 L176,182 L150,194 Z"/>' +
          '<circle class="gate net-nota" cx="181" cy="182" r="5"/>' +
          // AND gates
          '<path class="gate net-ab" d="M250,43 H268 A18 18 0 0 1 268,79 H250 Z"/>' +
          '<path class="gate net-ab2" d="M250,182 H268 A18 18 0 0 1 268,218 H250 Z"/>' +
          // OR gate
          '<path class="gate net-xor" d="M350,112 Q372,112 392,130 Q372,148 350,148 Q362,130 350,112 Z"/>' +
          // small algebraic labels
          '<text class="lbl-sm" x="192" y="72"><tspan text-decoration="overline">B</tspan></text>' +
          '<text class="lbl-sm" x="192" y="178"><tspan text-decoration="overline">A</tspan></text>' +
          '<text class="lbl-sm" x="292" y="52">A<tspan text-decoration="overline">B</tspan></text>' +
          '<text class="lbl-sm" x="292" y="214"><tspan text-decoration="overline">A</tspan>B</text>' +
          '<text class="lbl" x="398" y="124">A⊕B</text>' +
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
            setNet("net-nota", v.notA === 1);
            setNet("net-notb", v.notB === 1);
            setNet("net-ab", v.left === 1);
            setNet("net-ab2", v.right === 1);
            setNet("net-xor", v.xor === 1);
          },
        };
      }
    },
  });
})();
