(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "memory",
    title: "მეხსიერება — როგორ ინახება ბიტი",
    shortTitle: "მეხსიერება",
    theory: "აქამდე კარიბჭეები მხოლოდ ითვლიდნენ — გამოსავალი მხოლოდ ახლანდელ შესასვლელზეა დამოკიდებული (კომბინაციური ლოგიკა). მაგრამ კომპიუტერს ბიტის დამახსოვრებაც სჭირდება — ეს უკვე თანმიმდევრული ლოგიკაა. ამას აკეთებს პატარა უჯრედი — ტრიგერი (latch), რომელიც უკუკავშირით თავის მდგომარეობას ინახავს.",
    analogy: "ჰგავს ჩამრთველს, რომელიც მდგომარეობას ინარჩუნებს მას შემდეგაც, რაც ხელს აიღებ — ან ანთია, ან ჩამქრალი, სანამ თავად არ შეცვლი.",
    physical: "ტრიგერი ორი კარიბჭისგან იკრიბება, რომლებიც ერთმანეთს უკუკავშირით ასაზრდოებენ — გამოსავალი ბრუნდება შესასვლელზე და თავს „იჭერს“. Write სიგნალი უშვებს ახალ მნიშვნელობას; როცა Write გამორთულია, უჯრედი ბოლო მნიშვნელობას ინახავს.",
    challenge: "დაიმახსოვრე 1: ჩართე Write, Data = 1, მერე გამორთე Write — Q რჩება 1-ზე, თუნდაც Data შეცვალო.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let stored = 0;

      const dataSwitch = CFZ.createSwitch("Data", false, update);
      const writeSwitch = CFZ.createSwitch("Write (ჩაწერა)", false, update);
      const qOutput = CFZ.createBitOutput("Q (შენახული)");
      const circuit = buildCircuit();
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const data = dataSwitch.getValue();
        const write = writeSwitch.getValue();
        if (write === 1) {
          stored = data;
        }
        qOutput.setValue(stored);
        circuit.setValues({ stored: stored, write: write });

        note.textContent =
          write === 1
            ? "Write ჩართულია: უჯრედი იწერს Data-ს. Q = " + stored + " და მიჰყვება Data-ს."
            : "Write გამორთულია: უჯრედი ინახავს ბოლო მნიშვნელობას. Q = " + stored + ". Data-ს ცვლილება აღარ მოქმედებს — ეს არის დამახსოვრება.";

        setChallengeResult(
          write === 0 && stored === 1,
          write === 0 && stored === 1
            ? "შესრულებულია: უჯრედმა დაიმახსოვრა 1 — ეს არის მეხსიერება."
            : "მიზანი: ჩაწერე 1 (Write ჩართე, Data = 1), მერე გამორთე Write."
        );
      }

      container.append(
        CFZ.el("div", { className: "logic-row" }, [
          CFZ.el("div", { className: "logic-inputs" }, [dataSwitch.element, writeSwitch.element]),
          CFZ.el("div", { className: "unit-chip" }, [
            CFZ.el("span", { className: "unit-chip-title", text: "მეხსიერების" }),
            CFZ.el("span", { className: "unit-chip-sub", text: "1-ბიტიანი უჯრედი" }),
          ]),
          qOutput.element,
        ]),
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორ ინახავს ბიტს — უკუკავშირი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "უჯრედის გამოსავალი ბრუნდება უკან და თავს „იჭერს“. სანამ Write გამორთულია, ეს მარყუჟი მდგომარეობას უცვლელად ინახავს. მწვანე ნიშნავს შენახულ 1-ს.",
          }),
          circuit.element,
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ბევრი ასეთი უჯრედი გვერდიგვერდ ქმნის რეგისტრს (CPU-ს გაკვეთილი), მილიონობით კი — ოპერატიულ მეხსიერებას (RAM). ანუ CPU-ს „უჯრები“ და RAM სწორედ ასეთი ტრიგერებისგან შედგება.",
          }),
        ]),
        note
      );
      update();

      function buildCircuit() {
        const svgMarkup =
          '<svg class="circuit-svg" viewBox="0 0 360 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="1-ბიტიანი მეხსიერების უჯრედი">' +
          // Data → cell
          '<path class="wire net-q" d="M44,54 H120"/>' +
          // Write → cell (bottom-left)
          '<path class="wire" d="M44,110 H92 V78 H120"/>' +
          // Q output
          '<path class="wire net-q" d="M232,64 H320"/>' +
          // feedback loop (output → back to cell input)
          '<path class="wire net-q" d="M280,64 V140 H150 V94"/>' +
          // cell box
          '<rect class="cell net-q" x="120" y="38" width="112" height="52" rx="8"/>' +
          // dots
          '<circle class="contact net-q" cx="44" cy="54" r="3.5"/>' +
          '<circle class="contact" cx="44" cy="110" r="3.5"/>' +
          '<circle class="contact net-q" cx="280" cy="64" r="3"/>' +
          // labels
          '<text class="lbl" x="8" y="58">Data</text>' +
          '<text class="lbl" x="6" y="114">Write</text>' +
          '<text class="cell-label" x="176" y="60" text-anchor="middle">D LATCH</text>' +
          '<text class="val" id="qVal" x="176" y="80" text-anchor="middle">0</text>' +
          '<text class="lbl" x="326" y="68">Q</text>' +
          '<text class="lbl-sm" x="215" y="158" text-anchor="middle">უკუკავშირი — ინახავს მდგომარეობას</text>' +
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
            setNet("net-q", v.stored === 1);
            const q = svg.querySelector("#qVal");
            q.textContent = String(v.stored);
            q.classList.toggle("on", v.stored === 1);
          },
        };
      }
    },
  });
})();
