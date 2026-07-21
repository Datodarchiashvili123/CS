(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "recap",
    title: "რეკაპი — მთელი კომპიუტერი",
    shortTitle: "რეკაპი",
    theory: "ეს ყველაფერი ერთ სურათად: ელექტრონებიდან სრულ კომპიუტერამდე. თითო ფენა დგას იმაზე, რაც ქვემოთ ავაწყვეთ.",
    analogy: "როგორც კიბე — თითო საფეხური მდგრადია მხოლოდ იმის წყალობით, რაც ქვემოთაა.",
    physical: "რეალურ ჩიპში ეს ფენები მილიარდობით ტრანზისტორადაა შეკუმშული ერთ პაწია სილიციუმის კრისტალზე.",
    challenge: "გილოცავ — ნულიდან ავაწყვეთ კომპიუტერი! დააჭირე ნებისმიერ ფენას გასამეორებლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      // ზემოდან (მაღალი აბსტრაქცია) ქვემოთ (საფუძველი)
      const layers = [
        { to: "cache", title: "ქეში (L1/L2/L3)", desc: "სწრაფი მეხსიერება CPU-სთან ახლოს" },
        { to: "program", title: "პროგრამა და საათი", desc: "ინსტრუქციები: fetch → decode → execute" },
        { to: "cpu", title: "CPU", desc: "რეგისტრები + ALU + მართვა" },
        { to: "alu", title: "ALU", desc: "მრავალი ოპერაცია + სელექტორი" },
        { to: "memory", title: "მეხსიერება", desc: "ბიტის დამახსოვრება (ტრიგერი)" },
        { to: "full-adder", title: "შემკრებები", desc: "ბიტების შეკრება (half + full adder)" },
        { to: "and-gate", title: "ლოგიკური კარიბჭეები", desc: "NOT, AND, OR, XOR — ლოგიკა ბიტებზე" },
        { to: "transistor", title: "ტრანზისტორი", desc: "პაწია ელექტრონული ჩამრთველი" },
        { to: "binary", title: "ორობითი სისტემა", desc: "0 და 1 — ბიტები" },
        { to: "electricity", title: "ელექტრობა", desc: "დენი: ელექტრონების მოძრაობა" },
      ];

      const stack = CFZ.el(
        "div",
        { className: "recap-stack" },
        layers.map(function (layer, i) {
          return CFZ.el(
            "button",
            {
              className: "recap-layer",
              attrs: { type: "button" },
              on: {
                click: function () {
                  CFZ.goToLesson(layer.to);
                },
              },
            },
            [
              CFZ.el("span", { className: "recap-layer-num", text: String(layers.length - i) }),
              CFZ.el("span", { className: "recap-layer-body" }, [
                CFZ.el("strong", { className: "recap-layer-title", text: layer.title }),
                CFZ.el("span", { className: "recap-layer-desc", text: layer.desc }),
              ]),
              CFZ.el("span", { className: "recap-layer-arrow", attrs: { "aria-hidden": "true" }, text: "→" }),
            ]
          );
        })
      );

      container.append(
        CFZ.el("p", {
          className: "breakdown-note",
          text: "ზემოთ — მაღალი აბსტრაქცია; ქვემოთ — საფუძველი. თითო ფენა წინა გაკვეთილებზე დგას. დააჭირე ფენას, რომ იმ გაკვეთილს დაუბრუნდე.",
        }),
        stack,
        CFZ.el("p", {
          className: "state-note",
          text: "ელექტრონი → ბიტი → ტრანზისტორი → კარიბჭე → შეკრება → მეხსიერება → ALU → CPU → პროგრამა. ეს არის კომპიუტერი ნულიდან.",
        })
      );

      setChallengeResult(true, "შესრულებულია: შენ გაიარე მთელი გზა ელექტრონიდან CPU-მდე. 🎉");
    },
  });
})();
