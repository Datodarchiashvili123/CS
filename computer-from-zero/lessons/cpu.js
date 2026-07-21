(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "cpu",
    title: "CPU-ის საფუძვლები",
    shortTitle: "CPU",
    theory: "CPU-ის გული სამი ნაწილია: რეგისტრები ინახავენ რიცხვებს, ALU ამუშავებს მათ და შედეგი ბრუნდება. აქ ვხედავთ ერთ ოპერაციას — 5 + 3; ხოლო როგორ მიჰყვება CPU მთელ პროგრამას, შემდეგ გაკვეთილშია.",
    analogy: "CPU პატარა სახელოსნოს ჰგავს: რეგისტრები სამუშაო მაგიდაა, ALU კი ხელსაწყო, რომელიც შეკრებას ან სხვა მოქმედებას აკეთებს.",
    physical: "რეგისტრებში ბიტები ინახება ელექტრული მდგომარეობებით. ALU ლოგიკური კარიბჭეების დიდი ქსელია (როგორც შემკრები), რომელიც ამ ბიტებზე მოქმედებებს ასრულებს.",
    challenge: "გაუშვი 5 + 3 და მიიყვანე შედეგი 8-მდე.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let cancelled = false;

      const diagram = buildDatapath();
      const log = CFZ.el("p", { className: "cpu-log", text: "პროგრამა მზად არის: 5 + 3." });
      const runButton = CFZ.createButton("გაშვება", "primary", runProgram);

      function reset() {
        diagram.setValue("valA", "–");
        diagram.setValue("valB", "–");
        diagram.setValue("valAlu", "–");
        diagram.setValue("valOut", "–");
        diagram.clearActive();
      }

      async function runProgram() {
        runButton.disabled = true;
        reset();
        setChallengeResult(false, "CPU მუშაობს: მონაცემები ჯერ რეგისტრებში უნდა ჩავიდეს.");

        await CFZ.wait(450);
        if (cancelled) return;
        diagram.setValue("valA", "5");
        diagram.setActive("net-a");
        log.textContent = "Register A მიიღო 5.";

        await CFZ.wait(650);
        if (cancelled) return;
        diagram.setValue("valB", "3");
        diagram.setActive("net-b");
        log.textContent = "Register B მიიღო 3.";

        await CFZ.wait(650);
        if (cancelled) return;
        diagram.setValue("valAlu", "5+3");
        diagram.setActive("net-alu");
        log.textContent = "ALU იღებს ორ რიცხვს და შეკრებას ასრულებს.";

        await CFZ.wait(900);
        if (cancelled) return;
        diagram.setValue("valOut", "8");
        diagram.setActive("net-out");
        log.textContent = "შედეგი დაბრუნდა Output-ში: 8.";
        setChallengeResult(true, "შესრულებულია: CPU-მ 5 + 3 გამოთვალა და მიიღო 8.");
        runButton.disabled = false;
      }

      container.append(
        diagram.element,
        CFZ.el("div", { className: "control-row" }, [runButton]),
        log,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რა არის თითოეული ნაწილი" }),
          CFZ.el("div", { className: "part-legend" }, [
            partItem(
              "Register A და Register B",
              "პატარა, ძალიან სწრაფი „უჯრები“. აქ ინახება ის რიცხვები, რომლებზეც CPU ახლა მუშაობს (აქ — 5 და 3). ბიტები ინახება ელექტრული მდგომარეობებით."
            ),
            partItem(
              "ALU (არითმეტიკულ-ლოგიკური ბლოკი)",
              "CPU-ის „კალკულატორი“. ის რიცხვებზე მოქმედებებს ასრულებს — შეკრება, გამოკლება, შედარება, AND/OR/NOT. შიგნით სწორედ ისეთი შემკრებებისა და კარიბჭეებისგან შედგება, როგორიც წინა გაკვეთილებში ავაწყვეთ."
            ),
            partItem("Output", "ადგილი, სადაც ALU-ს შედეგი ბრუნდება (აქ — 8)."),
          ]),
          CFZ.el("h4", { text: "რით განსხვავდება Full Adder-ისგან" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "Full Adder მხოლოდ ბიტებს კრებს — ერთი მუდმივი წრედია. მისგან იკრიბება ALU (წინა გაკვეთილი), რომელიც უკვე მრავალ ოპერაციას აკეთებს. CPU კი ALU-ს გარშემოა აშენებული და ბევრად მეტია:",
          }),
          CFZ.el("ul", { className: "diff-list" }, [
            CFZ.el("li", { text: "აქვს მეხსიერება (რეგისტრები), სადაც რიცხვები ინახება." }),
            CFZ.el("li", { text: "მისი ALU მრავალ ოპერაციას აკეთებს, არა მხოლოდ შეკრებას." }),
            CFZ.el("li", { text: "ის ინსტრუქციებს (პროგრამას) მიჰყვება და ირჩევს, რომელი ოპერაცია შეასრულოს — ანუ პროგრამირებადია." }),
          ]),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "მოკლედ: Full Adder ერთი ხელსაწყოა; CPU მთელი სახელოსნოა, სადაც შემკრები ALU-ს შიგნით ზის და პროგრამა მართავს, რომელი ხელსაწყო აამუშაოს.",
          }),
        ])
      );

      return function () {
        cancelled = true;
      };

      function partItem(title, text) {
        return CFZ.el("div", { className: "part-legend-item" }, [
          CFZ.el("strong", { text: title }),
          CFZ.el("p", { text: text }),
        ]);
      }

      function buildDatapath() {
        const svgMarkup =
          '<svg class="datapath" viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CPU-ის მონაცემთა გზა">' +
          // wires
          '<path class="wire net-a" d="M105,84 V118 H170 V150"/>' +
          '<path class="wire net-b" d="M315,84 V118 H250 V150"/>' +
          '<path class="wire net-alu" d="M210,214 V250"/>' +
          '<path class="wire-arrow net-a" d="M166,143 L174,143 L170,150 Z"/>' +
          '<path class="wire-arrow net-b" d="M246,143 L254,143 L250,150 Z"/>' +
          '<path class="wire-arrow net-alu" d="M206,243 L214,243 L210,250 Z"/>' +
          // Register A
          '<rect class="node net-a" x="30" y="20" width="150" height="64" rx="8"/>' +
          '<text class="node-label" x="105" y="44" text-anchor="middle">Register A</text>' +
          '<text class="node-val net-a-val" id="valA" x="105" y="70" text-anchor="middle">–</text>' +
          // Register B
          '<rect class="node net-b" x="240" y="20" width="150" height="64" rx="8"/>' +
          '<text class="node-label" x="315" y="44" text-anchor="middle">Register B</text>' +
          '<text class="node-val net-b-val" id="valB" x="315" y="70" text-anchor="middle">–</text>' +
          // ALU
          '<rect class="node net-alu" x="110" y="150" width="200" height="64" rx="8"/>' +
          '<text class="node-label" x="210" y="174" text-anchor="middle">ALU</text>' +
          '<text class="node-val net-alu-val" id="valAlu" x="210" y="200" text-anchor="middle">–</text>' +
          // Output
          '<rect class="node net-out" x="110" y="250" width="200" height="54" rx="8"/>' +
          '<text class="node-label" x="210" y="272" text-anchor="middle">Output</text>' +
          '<text class="node-val net-out-val" id="valOut" x="210" y="296" text-anchor="middle">–</text>' +
          "</svg>";

        const wrap = document.createElement("div");
        wrap.innerHTML = svgMarkup.trim();
        const svg = wrap.firstChild;

        return {
          element: svg,
          setValue: function (id, text) {
            const node = svg.querySelector("#" + id);
            if (node) {
              node.textContent = text;
            }
          },
          setActive: function (cls) {
            svg.querySelectorAll("." + cls).forEach(function (node) {
              node.classList.add("on");
            });
          },
          clearActive: function () {
            svg.querySelectorAll(".on").forEach(function (node) {
              node.classList.remove("on");
            });
          },
        };
      }
    },
  });
})();
