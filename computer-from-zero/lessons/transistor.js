(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "transistor",
    title: "ტრანზისტორი",
    shortTitle: "ტრანზისტორი",
    theory: "ტრანზისტორი არის ძალიან პატარა ელექტრონული ჩამრთველი. პატარა სიგნალი მართავს, გავა თუ არა დენი დიდ გზაზე.",
    analogy: "წარმოიდგინე ონკანი: სახელურს ოდნავ ატრიალებ და წყალს გზას უხსნი. ტრანზისტორი ელექტრონებს უხსნის გზას.",
    physical: "როცა შესასვლელზე სიგნალი 1 მოდის, ტრანზისტორი ატარებს დენს. როცა სიგნალი 0 არის, დენი ჩერდება.",
    challenge: "ჩართე შესასვლელი სიგნალი და აანთე ნათურა ტრანზისტორის გავლით.",

    illustration:
      '<svg viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ტრანზისტორი: 0 კეტავს, 1 ხსნის გზას">' +
      '<g>' +
      '<text x="10" y="24" font-size="14" font-weight="700" fill="var(--muted)">Input = 0 — გზა დაკეტილია</text>' +
      '<path d="M14,120 H86" stroke="var(--border)" stroke-width="10" stroke-linecap="round" fill="none"/>' +
      '<path d="M124,120 H196" stroke="var(--border)" stroke-width="10" stroke-linecap="round" fill="none"/>' +
      '<rect x="92" y="88" width="26" height="64" rx="5" fill="var(--surface)" stroke="var(--danger)" stroke-width="3"/>' +
      '<path d="M99,130 L111,110 M99,110 L111,130" stroke="var(--danger)" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M105,52 V84" stroke="var(--muted)" stroke-width="3" stroke-dasharray="5 4" fill="none"/>' +
      '<text x="98" y="46" font-size="15" font-weight="800" fill="var(--muted)">0</text>' +
      '<text x="10" y="176" font-size="12" fill="var(--muted)">ნათურა ჩამქრალია</text>' +
      '</g>' +
      '<g transform="translate(228,0)">' +
      '<text x="10" y="24" font-size="14" font-weight="700" fill="var(--accent)">Input = 1 — დენი გადის</text>' +
      '<path d="M14,120 H196" stroke="var(--electron)" stroke-width="10" stroke-linecap="round" fill="none"/>' +
      '<rect x="92" y="88" width="26" height="64" rx="5" fill="var(--surface)" stroke="var(--electron)" stroke-width="3"/>' +
      '<path d="M105,52 V84" stroke="var(--accent)" stroke-width="3" fill="none"/>' +
      '<text x="98" y="46" font-size="15" font-weight="800" fill="var(--accent)">1</text>' +
      '<circle cx="40" cy="120" r="4" fill="var(--surface)"/>' +
      '<circle cx="70" cy="120" r="4" fill="var(--surface)"/>' +
      '<circle cx="150" cy="120" r="4" fill="var(--surface)"/>' +
      '<circle cx="178" cy="120" r="4" fill="var(--surface)"/>' +
      '<text x="10" y="176" font-size="12" fill="var(--accent)">ნათურა ანთია</text>' +
      '</g>' +
      "</svg>",

    photo: {
      src: "img/transistor.jpg",
      alt: "რამდენიმე დისკრეტული ტრანზისტორი სხვადასხვა კორპუსში",
      caption: "რეალური ტრანზისტორები: სიმძლავრის (2N3055, BD178) და სიგნალის (BC327). სამი ფეხი — ორი დენის გზისთვის, ერთი მართვისთვის.",
      credit: "Daniel Ryde, CC BY-SA 3.0",
      creditUrl: "https://commons.wikimedia.org/wiki/File:Transistorer.jpg",
    },

    examples: [
      "შენს ტელეფონის ჩიპში დაახლოებით 15–20 მილიარდი ტრანზისტორია — თითოეული ასეთივე პაწია ჩამრთველი.",
      "ტრანზისტორი მხოლოდ ჩამრთველი არაა: სუსტი სიგნალის გასაძლიერებლადაც გამოიყენება — მაგალითად, დინამიკის გამაძლიერებელში.",
      "1947 წელს პირველი ტრანზისტორი ხელისგულის ზომის იყო; დღეს ერთ ტრანზისტორს რამდენიმე ნანომეტრი უჭირავს — ადამიანის თმა ~50 000-ჯერ სქელია.",
      "როცა კომპიუტერი ცხელდება, ეს სწორედ მილიარდობით ტრანზისტორის გადართვის შედეგია — თითო გადართვა ცოტა ენერგიას კარგავს.",
    ],

    resources: [
      { label: "Ben Eater — Transistors (ვიდეო)", href: "https://www.youtube.com/watch?v=DXvAlwMAxiA" },
      { label: "Wikipedia — ტრანზისტორი", href: "https://en.wikipedia.org/wiki/Transistor" },
      { label: "Nand2Tetris — ლოგიკიდან კომპიუტერამდე", href: "https://www.nand2tetris.org/" },
    ],

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const inputSwitch = CFZ.createSwitch("Input", false, update);
      const topTrack = CFZ.createElectronTrack("vertical");
      const bottomTrack = CFZ.createElectronTrack("vertical");
      const lamp = CFZ.createLamp("ნათურა");
      const transistorPart = CFZ.createSchematicPart("transistor", "ტრანზისტორი", "MOSFET");
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const isOn = inputSwitch.getValue() === 1;
        topTrack.setFlowing(isOn);
        bottomTrack.setFlowing(isOn);
        lamp.setOn(isOn);
        transistorPart.setActive(isOn);
        note.textContent = isOn
          ? "ON: ტრანზისტორმა გზა გახსნა, ელექტრონები გადიან და ნათურა ანათებს."
          : "OFF: ტრანზისტორი გზას კეტავს და დენი არ მიედინება.";

        setChallengeResult(
          isOn,
          isOn
            ? "შესრულებულია: სიგნალმა ტრანზისტორი ჩართო."
            : "მიზანი: ჩართე Input, რომ დენი გავიდეს."
        );
      }

      container.append(
        CFZ.el("div", { className: "control-row" }, [inputSwitch.element]),
        CFZ.el("div", { className: "wire-stack" }, [
          CFZ.el("div", { className: "part-label", text: "დენის წყარო" }),
          topTrack.element,
          transistorPart.element,
          bottomTrack.element,
          lamp.element,
        ]),
        note
      );
      update();
    },
  });
})();
