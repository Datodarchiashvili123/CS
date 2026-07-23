(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  // ამ თავის („კომპიუტერი ნულიდან“) დამატებითი რესურსები, კატეგორიებად.
  const GROUPS = [
    {
      title: "🎬 ვიდეო — ნახე და გაიგე",
      items: [
        {
          label: "Ben Eater — 8-ბიტიანი კომპიუტერი ნულიდან",
          desc: "ბრედბორდზე ნაბიჯ-ნაბიჯ აწყობს რეალურ CPU-ს. ამ კურსის საუკეთესო გაგრძელება.",
          href: "https://eater.net/8bit",
        },
        {
          label: "Ben Eater — YouTube არხი",
          desc: "ტრანზისტორები, კარიბჭეები, მეხსიერება, საათი — ყველაფერი ხელით აწყობილი.",
          href: "https://www.youtube.com/@BenEater",
        },
        {
          label: "Crash Course — Computer Science",
          desc: "40-ზე მეტი მოკლე ეპიზოდი: ელექტრონიდან ოპერაციულ სისტემებამდე.",
          href: "https://thecrashcourse.com/topic/computerscience/",
        },
        {
          label: "Sebastian Lague — YouTube არხი",
          desc: "ულამაზესი ვიზუალური ახსნები, მათ შორის ლოგიკური კარიბჭეებისა და ჩიპების აწყობა.",
          href: "https://www.youtube.com/@SebastianLague",
        },
      ],
    },
    {
      title: "🕹 ინტერაქტიული — ააწყვე შენით",
      items: [
        {
          label: "NandGame",
          desc: "ბრაუზერში, NAND კარიბჭიდან იწყებ და მთელ კომპიუტერს აწყობ. ზუსტად ამ თავის პრაქტიკა.",
          href: "https://nandgame.com/",
        },
        {
          label: "Turing Complete (თამაში)",
          desc: "იგივე იდეა თამაშად: კარიბჭეებიდან საკუთარ პროცესორამდე და ასემბლერამდე.",
          href: "https://turingcomplete.game/",
        },
        {
          label: "CircuitVerse",
          desc: "ონლაინ ციფრული სქემების სიმულატორი — ააწყვე half adder, full adder, რეგისტრი.",
          href: "https://circuitverse.org/",
        },
        {
          label: "Falstad — წრედების სიმულატორი",
          desc: "ანალოგი და ციფრული წრედები ანიმაციით: ნახავ, როგორ მოძრაობს დენი.",
          href: "https://www.falstad.com/circuit/",
        },
        {
          label: "Logisim Evolution",
          desc: "უფასო desktop პროგრამა ციფრული სქემების ასაწყობად (ღია კოდი).",
          href: "https://github.com/logisim-evolution/logisim-evolution",
        },
      ],
    },
    {
      title: "🎓 სრული კურსები",
      items: [
        {
          label: "Nand2Tetris",
          desc: "კლასიკა: NAND კარიბჭიდან ოპერაციულ სისტემამდე, 12 პროექტი. უფასო მასალა.",
          href: "https://www.nand2tetris.org/",
        },
        {
          label: "Nand2Tetris — Coursera",
          desc: "იგივე კურსი ვიდეო-ლექციებით და ავტომატური შემოწმებით.",
          href: "https://www.coursera.org/learn/build-a-computer",
        },
        {
          label: "CS50x — Harvard",
          desc: "კომპიუტერული მეცნიერების შესავალი; პირველი ლექციები სწორედ ორობითსა და ლოგიკაზეა.",
          href: "https://cs50.harvard.edu/x/",
        },
      ],
    },
    {
      title: "📖 წიგნი",
      items: [
        {
          label: "Code — Charles Petzold",
          desc: "„კომპიუტერის დაფარული ენა“: მორზეს ანბანიდან პროცესორამდე, ძალიან მარტივი ენით.",
          href: "https://www.charlespetzold.com/code/",
        },
      ],
    },
    {
      title: "📚 საცნობარო — თითო თემა ცალკე",
      items: [
        { label: "ტრანზისტორი", desc: "როგორ მუშაობს და რა ტიპები არსებობს.", href: "https://en.wikipedia.org/wiki/Transistor" },
        { label: "ლოგიკური კარიბჭე", desc: "NOT, AND, OR, XOR და მათი ცხრილები.", href: "https://en.wikipedia.org/wiki/Logic_gate" },
        { label: "შემკრები (Adder)", desc: "Half adder, full adder, ripple carry.", href: "https://en.wikipedia.org/wiki/Adder_(electronics)" },
        { label: "ტრიგერი (Flip-flop)", desc: "როგორ ინახება ერთი ბიტი.", href: "https://en.wikipedia.org/wiki/Flip-flop_(electronics)" },
        { label: "ALU", desc: "არითმეტიკულ-ლოგიკური ბლოკი.", href: "https://en.wikipedia.org/wiki/Arithmetic_logic_unit" },
        { label: "CPU ქეში", desc: "L1, L2, L3 — რატომ და როგორ.", href: "https://en.wikipedia.org/wiki/CPU_cache" },
        { label: "ფონ ნეიმანის არქიტექტურა", desc: "პროგრამა და მონაცემები ერთ მეხსიერებაში.", href: "https://en.wikipedia.org/wiki/Von_Neumann_architecture" },
      ],
    },
  ];

  lessons.push({
    id: "extra-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "ეს თავი დაასრულე — მაგრამ სწავლა აქ არ მთავრდება. ქვემოთ შეკრებილია საუკეთესო რესურსები, რომლებიც ზუსტად ამ თემებს აღრმავებს: ელექტრონიდან და ტრანზისტორიდან CPU-მდე, ქეშამდე და პროგრამამდე.",
    analogy: "როგორც რუკა მოგზაურობის შემდეგ — ახლა უკვე იცი სად ხარ და შეგიძლია აირჩიო, რომელი გზით წახვიდე შემდეგ.",
    physical: "ყველა ჩამონათვალი უფასოა ან თავისუფლად ხელმისაწვდომი: ვიდეოები, ინტერაქტიული სიმულატორები, სრული კურსები, ერთი წიგნი და საცნობარო სტატიები თითო თემაზე.",
    challenge: "აირჩიე ერთი რესურსი და გახსენი — დაიწყე იქიდან, რაც ყველაზე გაინტერესებს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      function onOpen() {
        setChallengeResult(true, "შესრულებულია: რესურსი გახსენი — გააგრძელე სწავლა. 🚀");
      }

      GROUPS.forEach(function (group) {
        const cards = group.items.map(function (item) {
          return CFZ.el(
            "a",
            {
              className: "resource-card",
              attrs: { href: item.href, target: "_blank", rel: "noopener noreferrer" },
              on: { click: onOpen },
            },
            [
              CFZ.el("strong", { text: item.label }),
              CFZ.el("span", { className: "resource-desc", text: item.desc }),
              CFZ.el("span", {
                className: "resource-arrow",
                attrs: { "aria-hidden": "true" },
                text: "↗",
              }),
            ]
          );
        });

        container.append(
          CFZ.el("div", { className: "res-group" }, [
            CFZ.el("h4", { text: group.title }),
            CFZ.el("div", { className: "resource-grid" }, cards),
          ])
        );
      });

      container.append(
        CFZ.el("p", {
          className: "state-note",
          text: "რჩევა: თუ პრაქტიკა გირჩევნია — დაიწყე NandGame-ით; თუ ვიდეო — Ben Eater-ით; თუ სისტემური კურსი — Nand2Tetris-ით.",
        })
      );

      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
