(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  const GROUPS = [
    {
      title: "📘 ოფიციალური დოკუმენტაცია",
      items: [
        {
          label: "MDN — HTML საფუძვლები",
          desc: "ვებ-სტანდარტების მთავარი წყარო. ქართულადაც ნაწილობრივ თარგმნილია.",
          href: "https://developer.mozilla.org/en-US/docs/Learn/HTML",
        },
        {
          label: "MDN — ყველა HTML ელემენტი",
          desc: "სრული ცნობარი: თითო ტეგი, მისი ატრიბუტები და მაგალითები.",
          href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
        },
        {
          label: "HTML Living Standard (WHATWG)",
          desc: "თავად სტანდარტი — საბოლოო ჭეშმარიტება სადავო შემთხვევებში.",
          href: "https://html.spec.whatwg.org/multipage/",
        },
      ],
    },
    {
      title: "🎓 უფასო კურსები",
      items: [
        {
          label: "freeCodeCamp — Responsive Web Design",
          desc: "პრაქტიკული, სავარჯიშოებზე აგებული კურსი სერტიფიკატით.",
          href: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        },
        {
          label: "web.dev — Learn HTML",
          desc: "Google-ის თანამედროვე კურსი: სემანტიკა, ფორმები, ხელმისაწვდომობა.",
          href: "https://web.dev/learn/html",
        },
        {
          label: "The Odin Project",
          desc: "სრული გზა ნულიდან დეველოპერამდე, HTML-ით დაწყებული.",
          href: "https://www.theodinproject.com/",
        },
      ],
    },
    {
      title: "🛠 ხელსაწყოები",
      items: [
        {
          label: "W3C Markup Validator",
          desc: "შეამოწმე შენი HTML შეცდომებზე — ჩასვი კოდი ან მისამართი.",
          href: "https://validator.w3.org/",
        },
        {
          label: "CodePen",
          desc: "ბრაუზერში წერე HTML/CSS/JS და მაშინვე ნახე შედეგი.",
          href: "https://codepen.io/",
        },
        {
          label: "Can I use",
          desc: "მუშაობს თუ არა კონკრეტული ტეგი/ატრიბუტი სხვადასხვა ბრაუზერში.",
          href: "https://caniuse.com/",
        },
        {
          label: "htmlreference.io",
          desc: "ვიზუალური ცნობარი — თითო ტეგი მაგალითით, ერთ გვერდზე.",
          href: "https://htmlreference.io/",
        },
      ],
    },
    {
      title: "♿ ხელმისაწვდომობა (a11y)",
      items: [
        {
          label: "MDN — Accessibility",
          desc: "როგორ დავწეროთ HTML ისე, რომ ყველასთვის მუშაობდეს.",
          href: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
        },
        {
          label: "The A11Y Project — Checklist",
          desc: "პრაქტიკული სია, რომლითაც გვერდს შეამოწმებ.",
          href: "https://www.a11yproject.com/checklist/",
        },
      ],
    },
  ];

  lessons.push({
    id: "html-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "HTML-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია ის რესურსები, რომლებიც ამ თემას აღრმავებს — ოფიციალური დოკუმენტაციიდან პრაქტიკულ კურსებამდე და ხელსაწყოებამდე.",
    analogy: "ლექსიკონი და სახელმძღვანელო ერთად: ცნობარს მაშინ უყურებ, როცა კონკრეტული ტეგი გჭირდება; კურსს — როცა სისტემურად გინდა სწავლა.",
    physicalLabel: "როგორ ისწავლო ეფექტურად",
    physical: "ნუ დაიმახსოვრებ ყველა ტეგს — მათი ასეულია. დაიმახსოვრე ძირითადი 20 და ისწავლე ცნობარში ძებნა. ყველაზე სწრაფად ისწავლი, თუ პატარა გვერდებს დაწერ და ვალიდატორით შეამოწმებ.",
    challenge: "აირჩიე ერთი რესურსი და გახსენი.",

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
              CFZ.el("span", { className: "resource-arrow", attrs: { "aria-hidden": "true" }, text: "↗" }),
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
          text: "რჩევა: დაიწყე web.dev-ის „Learn HTML“-ით, ტეგები კი MDN-ის ცნობარში მოძებნე. დაწერილი გვერდი ყოველთვის გაატარე W3C ვალიდატორში.",
        })
      );

      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
