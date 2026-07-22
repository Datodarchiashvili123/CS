(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "multibit",
    title: "მრავალბიტიანი — ბაიტი, შემკრები, რეგისტრი",
    shortTitle: "მრავალბიტი",
    theory: "ერთი Full Adder ერთ ბიტს კრებს, ერთი ტრიგერი ერთ ბიტს ინახავს. რეალურ რიცხვს კი ბევრი ბიტი აქვს — 8 ბიტი = 1 ბაიტი. ამიტომ ერთბიტიან ბლოკებს ჯაჭვად ვაბამთ: N Full Adder რიგში = N-ბიტიანი შემკრები (თითოს CARRY შემდეგს გადაეცემა — ამას ჰქვია ripple carry); N ტრიგერი გვერდიგვერდ = N-ბიტიანი რეგისტრი, რომელიც მთელ რიცხვს ინახავს.",
    analogy: "ზუსტად სვეტებად შეკრებაა: მარჯვნიდან მარცხნივ მიდიხარ და თითო სვეტის გადატანას შემდეგ სვეტს აძლევ. რეგისტრი კი პატარა ყუთების რიგია — თითო ბიტს თავისი ყუთი.",
    physical: "ripple carry-ში CARRY „მოგზაურობს“ მარჯვნიდან მარცხნივ, ბიტ-ბიტ, ამიტომ საბოლოო შედეგი მზადაა მხოლოდ მას შემდეგ, რაც ბოლო გადატანა ჩამოვა. რეგისტრში ერთი Write სიგნალი ერთდროულად ყველა ტრიგერს ჩააწერს ახალ ბიტებს.",
    challenge: "დააყენე A = 0101 (5) და B = 0011 (3) და მიიღე შედეგი 1000 (8).",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const BITS = 4;

      // --- შესასვლელები: [0] = MSB (A3) ... [BITS-1] = LSB (A0) ---
      const aSwitches = [];
      const bSwitches = [];
      for (let i = 0; i < BITS; i++) {
        aSwitches.push(CFZ.createSwitch("A" + (BITS - 1 - i), false, update));
        bSwitches.push(CFZ.createSwitch("B" + (BITS - 1 - i), false, update));
      }

      // გადატანის ჯაჭვი: C4 C3 C2 C1 C0 (მარცხნიდან მარჯვნივ = MSB→LSB)
      const carryChips = [];
      for (let i = BITS; i >= 0; i--) {
        carryChips.push({ index: i, chip: CFZ.createSignalChip("C" + i, 0) });
      }
      // ჯამის ბიტები: S3 S2 S1 S0
      const sumChips = [];
      for (let i = 0; i < BITS; i++) {
        sumChips.push(CFZ.createSignalChip("S" + (BITS - 1 - i), 0));
      }
      const coutChip = CFZ.createSignalChip("Carry Out", 0);
      const decNote = CFZ.el("p", { className: "state-note" });

      function bitsToNum(switches) {
        let n = 0;
        for (let i = 0; i < BITS; i++) {
          n = n * 2 + switches[i].getValue();
        }
        return n;
      }

      function update() {
        let carry = 0;
        const sum = new Array(BITS).fill(0);
        const carryOut = {}; // carryOut[pos] = carry გამომავალი pos-იდან (pos 0 = LSB)

        for (let pos = 0; pos < BITS; pos++) {
          const idx = BITS - 1 - pos; // მასივის ინდექსი ამ ბიტისთვის
          const a = aSwitches[idx].getValue();
          const b = bSwitches[idx].getValue();
          const s = a ^ b ^ carry;
          const c = (a & b) | (carry & (a ^ b));
          sum[idx] = s;
          carryOut[pos + 1] = c;
          carry = c;
        }
        carryOut[0] = 0;

        carryChips.forEach(function (item) {
          item.chip.setValue(carryOut[item.index] || 0);
        });
        for (let i = 0; i < BITS; i++) {
          sumChips[i].setValue(sum[i]);
        }
        coutChip.setValue(carry);

        const aVal = bitsToNum(aSwitches);
        const bVal = bitsToNum(bSwitches);
        const total = aVal + bVal;
        const resultStr = (carry ? "1" : "") + sum.join("");
        decNote.textContent =
          aVal + " + " + bVal + " = " + total + "  (ორობითად " + resultStr +
          "). CARRY მარჯვნიდან მარცხნივ გადადის.";

        const done = aVal === 5 && bVal === 3;
        setChallengeResult(
          done,
          done
            ? "შესრულებულია: 0101 + 0011 = 1000 (5 + 3 = 8)."
            : "მიზანი: A = 0101 (5), B = 0011 (3)."
        );
      }

      function bitRow(label, switches) {
        return CFZ.el("div", { className: "mb-row" }, [
          CFZ.el("span", { className: "mb-row-label", text: label }),
          CFZ.el("div", { className: "mb-bits" }, switches.map(function (s) {
            return s.element;
          })),
        ]);
      }

      container.append(
        CFZ.el("div", { className: "mb-adder" }, [
          CFZ.el("h4", { text: "4-ბიტიანი შემკრები (ripple carry)" }),
          bitRow("A", aSwitches),
          bitRow("B", bSwitches),
          CFZ.el("div", { className: "mb-row" }, [
            CFZ.el("span", { className: "mb-row-label", text: "CARRY" }),
            CFZ.el("div", { className: "mb-chain" }, carryChips.map(function (item) {
              return item.chip.element;
            })),
          ]),
          CFZ.el("div", { className: "mb-row" }, [
            CFZ.el("span", { className: "mb-row-label", text: "ჯამი" }),
            CFZ.el("div", { className: "mb-bits" }, [coutChip.element].concat(
              sumChips.map(function (c) {
                return c.element;
              })
            )),
          ]),
          decNote,
        ]),
        buildRegister()
      );

      update();

      // --- რეგისტრი = 4 ტრიგერი ---
      function buildRegister() {
        const dataSwitches = [];
        for (let i = 0; i < BITS; i++) {
          dataSwitches.push(CFZ.createSwitch("D" + (BITS - 1 - i), false, function () {}));
        }
        const storedChips = [];
        for (let i = 0; i < BITS; i++) {
          storedChips.push(CFZ.createSignalChip("Q" + (BITS - 1 - i), 0));
        }
        const regNote = CFZ.el("p", {
          className: "state-note",
          text: "რეგისტრი ცარიელია (0000). დააყენე ბიტები და დააჭირე „ჩაწერას“.",
        });

        function renderStored(vals) {
          for (let i = 0; i < BITS; i++) {
            storedChips[i].setValue(vals[i]);
          }
        }
        renderStored([0, 0, 0, 0]);

        const writeBtn = CFZ.createButton("⬇ ჩაწერა (Write)", "primary", function () {
          const vals = dataSwitches.map(function (s) {
            return s.getValue();
          });
          renderStored(vals);
          let n = 0;
          for (let i = 0; i < BITS; i++) {
            n = n * 2 + vals[i];
          }
          regNote.textContent =
            "ჩაიწერა " + vals.join("") + " (= " + n + "). ახლა შეცვალე D ბიტები — Q არ იცვლება, სანამ თავიდან არ ჩაწერ.";
        });

        return CFZ.el("div", { className: "mb-register" }, [
          CFZ.el("h4", { text: "4-ბიტიანი რეგისტრი (Write → ინახავს)" }),
          CFZ.el("div", { className: "mb-row" }, [
            CFZ.el("span", { className: "mb-row-label", text: "Data" }),
            CFZ.el("div", { className: "mb-bits" }, dataSwitches.map(function (s) {
              return s.element;
            })),
          ]),
          CFZ.el("div", { className: "control-row" }, [writeBtn]),
          CFZ.el("div", { className: "mb-row" }, [
            CFZ.el("span", { className: "mb-row-label", text: "შენახული Q" }),
            CFZ.el("div", { className: "mb-bits" }, storedChips.map(function (c) {
              return c.element;
            })),
          ]),
          regNote,
        ]);
      }
    },
  });
})();
