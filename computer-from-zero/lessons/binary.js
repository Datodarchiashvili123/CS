(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "binary",
    title: "ორობითი სისტემა",
    shortTitle: "ორობითი",
    theory: "წინა გაკვეთილში ვნახეთ, რომ თითო მავთული ორ მდგომარეობას იღებს — 0 ან 1. ახლა ვნახოთ, როგორ ავაწყოთ მთელი რიცხვი ბევრი ასეთი ბიტისგან. ათობითში ციფრი 10-ის ხარისხზეა: 342 = 3×10² + 4×10¹ + 2×10⁰. ორობითში იგივე პრინციპია, ოღონდ 2-ის ხარისხებით: 2³, 2², 2¹, 2⁰. თითო ბიტი (0 ან 1) ამბობს, ჩაითვალოს თუ არა ის ხარისხი.",
    analogy: "თითო ბიტს თავისი ხარისხი აქვს: 2³=8, 2²=4, 2¹=2, 2⁰=1. თუ ბიტი 1-ია, ამ ხარისხს ჯამში ვამატებთ; თუ 0 — არა. მარცხენა ბიტი ყველაზე დიდი ხარისხია.",
    physical: "მიკროსქემაში მაღალი ძაბვა იკითხება როგორც 1, დაბალი — როგორც 0. მარცხენა ბიტს ყველაზე მაღალი ხარისხი აქვს (2³=8), მარჯვენას — ყველაზე დაბალი (2⁰=1).",
    challenge: "დააყენე ბიტები ისე, რომ ორობითში მიიღო 1011. ეს ათობითში არის 11.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      // ოთხი ბიტის ადგილი: მარცხნიდან მარჯვნივ 2-ის ხარისხები.
      const places = [
        { power: "2³", value: 8 },
        { power: "2²", value: 4 },
        { power: "2¹", value: 2 },
        { power: "2⁰", value: 1 },
      ];

      const columns = places.map(function (place) {
        const bitSwitch = CFZ.createSwitch(place.power + " (" + place.value + ")", false, update);
        const contribution = CFZ.el("p", {
          className: "bin-contrib",
          text: "0 × " + place.power + " = 0",
        });
        const column = CFZ.el("div", { className: "bin-place" }, [
          CFZ.el("div", { className: "bin-power-head" }, [
            CFZ.el("span", { className: "bin-power", text: place.power }),
            CFZ.el("span", { className: "bin-power-eq", text: "= " + place.value }),
          ]),
          bitSwitch.element,
          contribution,
        ]);
        return { place: place, bitSwitch: bitSwitch, contribution: contribution, column: column };
      });

      const binaryWord = CFZ.el("strong", { className: "bin-word", text: "0000" });
      const decimalValue = CFZ.el("strong", { className: "bin-decimal", text: "0" });
      const formula = CFZ.el("p", {
        className: "formula-line",
        text: "0×2³ + 0×2² + 0×2¹ + 0×2⁰ = 0",
      });
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const bits = columns.map(function (col) {
          return col.bitSwitch.getValue();
        });
        const decimal = bits.reduce(function (sum, bit, index) {
          return sum + bit * places[index].value;
        }, 0);
        const word = bits.join("");

        columns.forEach(function (col, index) {
          const bit = bits[index];
          const part = bit * col.place.value;
          col.contribution.textContent = bit + " × " + col.place.power + " = " + part;
          col.contribution.classList.toggle("is-on", bit === 1);
          col.column.classList.toggle("is-on", bit === 1);
        });

        binaryWord.textContent = word;
        decimalValue.textContent = String(decimal);
        formula.textContent =
          bits[0] + "×2³ + " +
          bits[1] + "×2² + " +
          bits[2] + "×2¹ + " +
          bits[3] + "×2⁰ = " +
          decimal;
        note.textContent =
          "ორობითში ეს რიცხვია " +
          word +
          ". თითო ბიტს ვამრავლებთ თავის ხარისხზე და ვჯამავთ — ათობითში ვიღებთ " +
          decimal +
          "-ს.";

        setChallengeResult(
          word === "1011",
          word === "1011"
            ? "შესრულებულია: 1011 = 2³ + 2¹ + 2⁰ = 8 + 2 + 1 = 11."
            : "მიზანი: დააყენე ბიტები 1011-ზე, რომ მიიღო 11."
        );
      }

      container.append(
        CFZ.el("div", { className: "binary-lab" }, [
          CFZ.el("div", { className: "bin-analogy" }, [
            CFZ.el("p", {
              className: "breakdown-note",
              text: "ათობითში ამას უკვე აკეთებ — თითო ციფრი 10-ის ხარისხზეა:",
            }),
            CFZ.el("p", { className: "formula-line", text: "342 = 3×10² + 4×10¹ + 2×10⁰" }),
            CFZ.el("p", {
              className: "breakdown-note",
              text: "ორობითში იგივეა, ოღონდ 10-ის ნაცვლად 2-ის ხარისხები: 2³, 2², 2¹, 2⁰ (ანუ 8, 4, 2, 1). თითო ბიტს ვამრავლებთ თავის ხარისხზე და ვჯამავთ.",
            }),
          ]),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "თითო ჩამრთველი ერთი ბიტია: OFF = 0, ON = 1. ბიტის თავზე წერია მისი ხარისხი, ქვეშ კი — რამდენს ამატებს ჯამში.",
          }),
          CFZ.el(
            "div",
            { className: "bin-places" },
            columns.map(function (col) {
              return col.column;
            })
          ),
          CFZ.el("div", { className: "bin-summary" }, [
            CFZ.el("div", { className: "bin-summary-row" }, [
              CFZ.el("span", { className: "bin-summary-label", text: "ორობითი" }),
              binaryWord,
            ]),
            CFZ.el("div", { className: "bin-summary-row" }, [
              CFZ.el("span", { className: "bin-summary-label", text: "ათობითი" }),
              decimalValue,
            ]),
            formula,
          ]),
        ]),
        note
      );

      update();
    },
  });
})();
