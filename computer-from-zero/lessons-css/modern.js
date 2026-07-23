(function () {
  const lessons = window.CssLessons || (window.CssLessons = []);

  // ---------- 22 ----------
  lessons.push({
    id: "css-responsive",
    title: "რესპონსიული დიზაინი",
    shortTitle: "რესპონსიულობა",
    theory: "ერთი და იგივე გვერდი უნდა მუშაობდეს ტელეფონზეც და მონიტორზეც. ამას media query აკეთებს: @media (min-width: 700px) { … } — წესები მხოლოდ მაშინ ჩაირთვება, როცა ეკრანი მითითებულ ზღვარს გადააჭარბებს.",
    analogy: "ტანსაცმელი, რომელიც ზომას თავად ერგება: ვიწრო ადგილას ერთ სვეტად ეწყობა, ფართოში — ორად.",
    physicalLabel: "mobile-first",
    physical: "ჯერ დაწერე მობილურის სტილი (ვიწრო ეკრანი, ერთი სვეტი), მერე min-width-ით დაამატე დიდი ეკრანის წესები. ასე კოდი უფრო მარტივია. აუცილებელია <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> — მის გარეშე media query მობილურზე არ იმუშავებს.",
    challenge: "დაწერე media query, რომელიც ფართო ეკრანზე ბადეს ორ სვეტად აქცევს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="grid">\n  <div class="c">ერთი</div>\n  <div class="c">ორი</div>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n}\n\n.c {\n  padding: 16px;\n  background: #dbeafe;\n  border-radius: 8px;\n}\n\n@media (min-width: 500px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}",
        function (doc, win, css) {
          const hasMedia = /@media[^{]*\(\s*(min|max)-width/.test(css);
          const changesLayout = /@media[\s\S]*grid-template-columns|@media[\s\S]*flex-direction|@media[\s\S]*display/.test(css);
          const ok = hasMedia && changesLayout;
          const missing = [];
          if (!hasMedia) missing.push("@media (min-width: …)");
          if (!changesLayout) missing.push("media-ს შიგნით განლაგების ცვლილება");
          setChallengeResult(ok, ok ? "შესრულებულია: განლაგება ეკრანს ერგება." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "media query ეყრდნობა გადახედვის ფანჯრის სიგანეს — გაწიე ბრაუზერის ფანჯარა ან შეცვალე 500px უფრო პატარა რიცხვით და ნახე, როგორ გადაეწყობა ბლოკები ერთი სვეტიდან ორზე.",
          }),
        ])
      );
    },
  });

  // ---------- 23 ----------
  lessons.push({
    id: "css-variables",
    title: "CSS ცვლადები",
    shortTitle: "ცვლადები",
    theory: "ცვლადი (custom property) საშუალებას გაძლევს მნიშვნელობა ერთხელ დაასახელო და ბევრგან გამოიყენო: --main-color: #3867d6; მერე კი color: var(--main-color). ჩვეულებრივ :root-ში აცხადებ, რომ მთელ გვერდზე ხელმისაწვდომი იყოს.",
    analogy: "საღებავის ქილა სახელით „მთავარი ლურჯი“: ერთხელ ურევ და ყველგან იმას იყენებ. ფერის შეცვლა ერთ ადგილას საკმარისია.",
    physicalLabel: "რატომ არის ძლიერი",
    physical: "ცვლადები მემკვიდრეობს — ამიტომ შეგიძლია კომპონენტის შიგნით გადააწერო და მხოლოდ იქ შეიცვლება. სწორედ ამაზეა აგებული მუქი თემა: [data-theme=\"dark\"] { --bg: #0f141c; } — ერთი ბლოკი და მთელი საიტი გადაირთვება. var()-ს სათადარიგო მნიშვნელობაც აქვს: var(--x, blue).",
    challenge: "გამოაცხადე ორი ცვლადი :root-ში და გამოიყენე ორივე var()-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">\n  <h3>ბარათი</h3>\n  <p>ცვლადებით შეღებილი.</p>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ":root {\n  --main: #3867d6;\n  --radius: 12px;\n}\n\n.box {\n  background: var(--main);\n  border-radius: var(--radius);\n  color: white;\n  padding: 18px;\n}",
        function (doc, win, css) {
          const declared = (css.match(/--[\w-]+\s*:/g) || []).length;
          const used = (css.match(/var\(\s*--/g) || []).length;
          const ok = declared >= 2 && used >= 2;
          const missing = [];
          if (declared < 2) missing.push("ორი ცვლადის გამოცხადება (--სახელი: …)");
          if (used < 2) missing.push("ორივეს გამოყენება var()-ით");
          setChallengeResult(ok, ok ? "შესრულებულია: ცვლადები მუშაობს." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "შეცვალე --main-ის მნიშვნელობა ერთ ადგილას და ნახე, როგორ განახლდება ყველაფერი, სადაც var(--main) წერია. სწორედ ეს ხდის თემების გადართვას ასე მარტივს.",
          }),
        ])
      );
    },
  });

  // ---------- 24 ----------
  lessons.push({
    id: "css-transform",
    title: "გარდაქმნები (transform)",
    shortTitle: "transform",
    theory: "transform ელემენტს ვიზუალურად ცვლის ისე, რომ განლაგებას არ არღვევს: translate (გადაადგილება), rotate (შემობრუნება), scale (გადიდება/შემცირება), skew (დახრა). რამდენიმე ერთად იწერება: transform: translateY(-4px) scale(1.05).",
    analogy: "როგორც ფოტოს გადაადგილება და შემობრუნება ალბომში: მისი ადგილი ალბომში იგივე რჩება, უბრალოდ სხვანაირად ჩანს.",
    physicalLabel: "რატომ transform და არა margin",
    physical: "transform და opacity ბრაუზერისთვის „იაფია“ — მათ ვიდეობარათი ამუშავებს და გვერდის გადათვლა არ სჭირდება. margin-ის ან top-ის ანიმაცია კი მთელ განლაგებას თავიდან ათვლევინებს და ანიმაცია ეშლება. ამიტომ ანიმაციისთვის თითქმის ყოველთვის transform აირჩიე.",
    challenge: "მიეცი ბარათს transform, რომელიც მას ოდნავ ასწევს და გაადიდებს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="card">გარდაქმნილი ბარათი</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".card {\n  padding: 20px;\n  background: #dbeafe;\n  border-radius: 10px;\n  transform: translateY(-6px) scale(1.05);\n}",
        function (doc, win) {
          const card = doc.querySelector(".card");
          if (!card) return;
          const t = win.getComputedStyle(card).transform;
          const ok = Boolean(t && t !== "none");
          setChallengeResult(ok, ok ? "შესრულებულია: გარდაქმნა გამოიყენა." : "დაამატე transform (მაგ. translateY და scale).");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "თანმიმდევრობა მნიშვნელოვანია" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "transform: rotate(45deg) translateX(50px) და transform: translateX(50px) rotate(45deg) სხვადასხვა შედეგს იძლევა — ოპერაციები რიგზე სრულდება და ღერძებიც ბრუნავს. სცადე ორივე.",
          }),
        ])
      );
    },
  });

  // ---------- 25 ----------
  lessons.push({
    id: "css-transition",
    title: "გადასვლები (transition)",
    shortTitle: "transition",
    theory: "transition მნიშვნელობის ცვლილებას დროში წელავს — ნაცვლად უცებ გადახტომისა. ოთხი ნაწილი: რომელი თვისება, რამდენ ხანს, რა რიტმით (ease, linear), დაყოვნებით. მაგალითად: transition: background 0.3s ease.",
    analogy: "კარი, რომელიც ნელა იხურება ჰიდრავლიკური მექანიზმით — იმავე ადგილას მიდის, უბრალოდ რბილად.",
    physicalLabel: "სად დაწერო",
    physical: "transition ყოველთვის ჩვეულებრივ მდგომარეობაზე დაწერე, არა :hover-ზე — მაშინ ანიმაცია ორივე მიმართულებით რბილი იქნება (მიტანისას და მოშორებისასაც). transition: all მოსახერხებელია, მაგრამ ნელი — ჯობია კონკრეტული თვისებები ჩამოთვალო.",
    challenge: "დაამატე ღილაკს transition და :hover, რომელზეც ფონი და transform იცვლება.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<button class="btn">მიიტანე მაუსი</button>';

      const pg = CFZ.createStylePlayground(
        html,
        ".btn {\n  padding: 12px 22px;\n  border: none;\n  border-radius: 8px;\n  background: #3867d6;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n  transition: background 0.25s ease, transform 0.25s ease;\n}\n\n.btn:hover {\n  background: #274fb0;\n  transform: translateY(-2px);\n}",
        function (doc, win, css) {
          const btn = doc.querySelector(".btn");
          if (!btn) return;
          const dur = win.getComputedStyle(btn).transitionDuration;
          const hasTransition = dur && dur !== "0s";
          const hasHover = /:hover\s*\{/.test(css);
          const ok = hasTransition && hasHover;
          const missing = [];
          if (!hasTransition) missing.push("transition ჩვეულებრივ მდგომარეობაზე");
          if (!hasHover) missing.push(":hover წესი");
          setChallengeResult(ok, ok ? "შესრულებულია: გადასვლა რბილია." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "მიიტანე მაუსი ღილაკთან და მოაშორე — ორივე მიმართულებით რბილია. ახლა გადაიტანე transition სტრიქონი .btn-დან .btn:hover-ში: მიტანა რბილი დარჩება, დაბრუნება კი უცებ მოხდება.",
          }),
        ])
      );
    },
  });

  // ---------- 26 ----------
  lessons.push({
    id: "css-animation",
    title: "ანიმაციები (@keyframes)",
    shortTitle: "ანიმაცია",
    theory: "transition ორ მდგომარეობას შორის მუშაობს; @keyframes კი მრავალსაფეხურიან ანიმაციას აღწერს. ჯერ აღწერ საფეხურებს (from/to ან 0%/50%/100%), მერე ელემენტს მიაბამ: animation: სახელი 2s infinite.",
    analogy: "მულტფილმის კადრები: აღწერ საკვანძო კადრებს, შუალედს კი ბრაუზერი თავად ხატავს.",
    physicalLabel: "მოძრაობის ეთიკა",
    physical: "ზოგიერთ ადამიანს მოძრაობა თავბრუსხვევას იწვევს. პატივი ეცი მათ არჩევანს: @media (prefers-reduced-motion: reduce) { * { animation: none; transition: none; } }. ეს ერთი ბლოკი შენს საიტს ბევრად თავაზიანს ხდის.",
    challenge: "შექმენი @keyframes და მიაბი ელემენტს animation-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="dot"></div>\n<p>პულსირებადი წერტილი</p>';

      const pg = CFZ.createStylePlayground(
        html,
        "@keyframes pulse {\n  0%   { transform: scale(1);   opacity: 1;   }\n  50%  { transform: scale(1.4); opacity: 0.5; }\n  100% { transform: scale(1);   opacity: 1;   }\n}\n\n.dot {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #e63946;\n  animation: pulse 1.5s ease-in-out infinite;\n}",
        function (doc, win, css) {
          const dot = doc.querySelector(".dot");
          if (!dot) return;
          const hasKeyframes = /@keyframes\s+[\w-]+/.test(css);
          const name = win.getComputedStyle(dot).animationName;
          const applied = name && name !== "none";
          const ok = hasKeyframes && applied;
          const missing = [];
          if (!hasKeyframes) missing.push("@keyframes ბლოკი");
          if (!applied) missing.push("animation ელემენტზე");
          setChallengeResult(ok, ok ? "შესრულებულია: ანიმაცია მუშაობს." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "animation-ის ნაწილები" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "animation: სახელი ხანგრძლივობა რიტმი დაყოვნება რაოდენობა მიმართულება. infinite — უსასრულოდ; alternate — წინ და უკან. სცადე: დაამატე alternate და ნახე განსხვავება.",
          }),
        ])
      );
    },
  });

  // ---------- 27 ----------
  lessons.push({
    id: "css-organization",
    title: "ორგანიზაცია და საუკეთესო პრაქტიკა",
    shortTitle: "ორგანიზაცია",
    theory: "დიდი პროექტის CSS სწრაფად იქცევა ქაოსად. ამის წინააღმდეგ სამი ჩვევა მუშაობს: აზრიანი სახელები, კომპონენტებად დაყოფა და გამეორების თავიდან აცილება (ცვლადებით).",
    analogy: "სამზარეულოს ორგანიზება: თითო ნივთს თავისი ადგილი და გასაგები სახელი აქვს — მაშინ სხვაც იპოვის, რაც სჭირდება.",
    physicalLabel: "BEM და პრაქტიკა",
    physical: "BEM სახელების სისტემაა: .card (ბლოკი), .card__title (ელემენტი), .card--wide (მოდიფიკატორი). სელექტორი ზედმეტად გრძელი არ გახადო (.a .b .c .d) — ძნელი გადასაწერია. სტილი დაიწყე მცირე reset-ით და ცვლადებით, მერე კომპონენტები. ერთი კომპონენტი — ერთი ფაილი.",
    challenge: "დაწერე BEM-სტილის კლასები: ბლოკი, მისი ელემენტი და მოდიფიკატორი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<article class="card card--featured">\n' +
        '  <h3 class="card__title">სათაური</h3>\n' +
        '  <p class="card__text">ტექსტი.</p>\n' +
        "</article>";

      const pg = CFZ.createStylePlayground(
        html,
        ".card {\n  padding: 16px;\n  border: 1px solid #d8dee9;\n  border-radius: 10px;\n}\n\n.card__title {\n  margin: 0 0 6px;\n}\n\n.card--featured {\n  border-color: #3867d6;\n  background: #eef3ff;\n}",
        function (doc, win, css) {
          const block = /\.[\w-]+\s*\{/.test(css);
          const element = /\.[\w-]+__[\w-]+/.test(css);
          const modifier = /\.[\w-]+--[\w-]+/.test(css);
          const ok = block && element && modifier;
          const missing = [];
          if (!element) missing.push("ელემენტი (.ბლოკი__ელემენტი)");
          if (!modifier) missing.push("მოდიფიკატორი (.ბლოკი--მოდიფიკატორი)");
          setChallengeResult(ok, ok ? "შესრულებულია: BEM სტრუქტურა გაქვს." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რატომ BEM" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "სახელიდან მაშინვე ჩანს, სად ეკუთვნის კლასი: .card__title აშკარად ბარათის სათაურია. ეს სპეციფიკურობასაც აკონტროლებს — ყველა კლასი ერთი დონისაა, ამიტომ „!important-ის ომი“ არ იწყება.",
          }),
        ])
      );
    },
  });

  // ---------- 28 ----------
  lessons.push({
    id: "css-devtools",
    title: "გამართვა DevTools-ით",
    shortTitle: "გამართვა",
    theory: "როცა სტილი არ მუშაობს, გამოცნობა არ გჭირდება — ბრაუზერი ყველაფერს გიჩვენებს. მარჯვენა ღილაკი → Inspect ხსნის DevTools-ს, სადაც ხედავ რომელი წესი გამოიყენა, რომელი გადაიხაზა და საიდან მოვიდა.",
    analogy: "რენტგენი: ნაცვლად იმისა, რომ გამოიცნო რა სტკივა, უბრალოდ იყურები შიგნით.",
    physicalLabel: "სამი პანელი",
    physical: "Styles — ყველა წესი, რომელიც ელემენტს ეხება; გადახაზული ნიშნავს, რომ სხვამ გადაფარა. Computed — საბოლოო, გამოთვლილი მნიშვნელობა. Box model დიაგრამა — ზუსტი margin/padding/border რიცხვები. აქვე შეგიძლია მნიშვნელობა პირდაპირ შეცვალო და მაშინვე ნახო შედეგი.",
    challenge: "ქვემოთ სტილი არ მუშაობს — იპოვე მიზეზი და გაასწორე ისე, რომ ტექსტი გამწვანდეს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<p class="note">ეს ტექსტი მწვანე უნდა იყოს.</p>';

      const pg = CFZ.createStylePlayground(
        html,
        "/* ორი პრობლემაა: სელექტორი და სპეციფიკურობა. გაასწორე. */\n#note {\n  color: green;\n}\n\np {\n  color: #172033;\n}",
        function (doc, win) {
          const p = doc.querySelector(".note");
          if (!p) return;
          const green = CFZ.isColorNear(win.getComputedStyle(p).color, 0, 128, 0, 80);
          setChallengeResult(
            green,
            green
              ? "შესრულებულია: იპოვე შეცდომა და გაასწორე."
              : "მინიშნება: ელემენტს class=\"note\" აქვს, არა id — და მეორე წესი ფერს გადაფარავს."
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "შემოწმების სია" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "როცა წესი არ მუშაობს, თანმიმდევრობით შეამოწმე: 1) სელექტორი სწორია? (. თუ #) 2) სხვა წესი ხომ არ ჯაბნის? 3) წერტილმძიმე ხომ არ დაგავიწყდა? 4) თვისების სახელი სწორად წერია? 5) ფაილი მართლა მიბმულია?",
          }),
        ])
      );
    },
  });

  // ---------- 29 ----------
  lessons.push({
    id: "css-recap",
    title: "რეკაპი — გაფორმებული გვერდი",
    shortTitle: "რეკაპი",
    theory: "ყველაფერი ერთად: სელექტორები, კასკადი, ბოქს-მოდელი, Flexbox და Grid, ცვლადები, რესპონსიულობა და გადასვლები — ერთ პატარა, სრულფასოვან გვერდზე.",
    analogy: "როგორც სამზარეულოში: ცალკეული ტექნიკა ისწავლე, ახლა კი მთელი კერძი მოამზადე.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "HTML სტრუქტურაა, CSS — გარეგნობა, JavaScript — ქცევა. სამივე ერთად მუშაობს. სანამ JS-ზე გადახვალ, ივარჯიშე: აიღე ნებისმიერი მოწონებული საიტი და სცადე მისი ერთი ბლოკის გამეორება.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად — ან შეცვალე ქვემოთ მოცემული სრული სტილი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const topics = [
        { to: "css-selectors", title: "სელექტორები", desc: "ტიპი, კლასი, id" },
        { to: "css-cascade", title: "კასკადი", desc: "სპეციფიკურობა და რიგი" },
        { to: "css-box-model", title: "ბოქს-მოდელი", desc: "content, padding, border, margin" },
        { to: "css-display", title: "display", desc: "block, inline, inline-block" },
        { to: "css-position", title: "position", desc: "relative, absolute, sticky" },
        { to: "css-flex-basics", title: "Flexbox", desc: "ერთი ღერძი, gap, ცენტრირება" },
        { to: "css-grid-basics", title: "Grid", desc: "სვეტები, fr, ბადე" },
        { to: "css-responsive", title: "რესპონსიულობა", desc: "media query, mobile-first" },
        { to: "css-variables", title: "ცვლადები", desc: "--var და var()" },
        { to: "css-transition", title: "გადასვლები", desc: "transition და :hover" },
      ];

      const stack = CFZ.el(
        "div",
        { className: "recap-stack" },
        topics.map(function (t, i) {
          return CFZ.el(
            "button",
            {
              className: "recap-layer",
              attrs: { type: "button" },
              on: {
                click: function () {
                  CFZ.goToLesson(t.to);
                },
              },
            },
            [
              CFZ.el("span", { className: "recap-layer-num", text: String(i + 1) }),
              CFZ.el("span", { className: "recap-layer-body" }, [
                CFZ.el("strong", { className: "recap-layer-title", text: t.title }),
                CFZ.el("span", { className: "recap-layer-desc", text: t.desc }),
              ]),
              CFZ.el("span", { className: "recap-layer-arrow", attrs: { "aria-hidden": "true" }, text: "→" }),
            ]
          );
        })
      );

      const html =
        '<header class="site-header">\n' +
        '  <h1 class="site-header__title">ჩემი გვერდი</h1>\n' +
        "</header>\n" +
        '<main class="grid">\n' +
        '  <article class="card">\n    <h2 class="card__title">პირველი</h2>\n    <p>ტექსტი.</p>\n  </article>\n' +
        '  <article class="card">\n    <h2 class="card__title">მეორე</h2>\n    <p>ტექსტი.</p>\n  </article>\n' +
        '  <article class="card card--wide">\n    <h2 class="card__title">ფართო</h2>\n    <p>ტექსტი.</p>\n  </article>\n' +
        "</main>";

      const css =
        ":root {\n  --brand: #3867d6;\n  --radius: 12px;\n}\n\n" +
        "body {\n  font-family: system-ui, sans-serif;\n  line-height: 1.6;\n}\n\n" +
        ".site-header {\n  background: linear-gradient(135deg, var(--brand), #6d93ff);\n  color: white;\n  padding: 24px;\n  border-radius: var(--radius);\n}\n\n" +
        ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 14px;\n  margin-top: 16px;\n}\n\n" +
        ".card {\n  padding: 16px;\n  border: 1px solid #d8dee9;\n  border-radius: var(--radius);\n  transition: transform 0.2s ease;\n}\n\n" +
        ".card:hover {\n  transform: translateY(-4px);\n}\n\n" +
        ".card--wide {\n  grid-column: span 2;\n  background: #eef3ff;\n}";

      const pg = CFZ.createStylePlayground(html, css, null, { editableHtml: true });

      container.append(
        CFZ.el("p", {
          className: "breakdown-note",
          text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი სრული გვერდია — შეცვალე HTML-იც და CSS-იც.",
        }),
        stack,
        CFZ.el("h4", { text: "სრული გვერდი — ითამაშე" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: CSS-ის საფუძვლები გაიარე. 🎉");
    },
  });

  // ---------- 30 ----------
  const GROUPS = [
    {
      title: "📘 დოკუმენტაცია და ცნობარი",
      items: [
        { label: "MDN — CSS", desc: "ყველა თვისების ოფიციალური ცნობარი მაგალითებით.", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { label: "CSS-Tricks — Flexbox გზამკვლევი", desc: "ვიზუალური შპარგალკა ყველა flex თვისებაზე.", href: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
        { label: "CSS-Tricks — Grid გზამკვლევი", desc: "იგივე, Grid-ისთვის — ყველაზე ხშირად გახსნილი გვერდი.", href: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
      ],
    },
    {
      title: "🎮 ინტერაქტიული ვარჯიში",
      items: [
        { label: "Flexbox Froggy", desc: "თამაში, სადაც ბაყაყებს flex თვისებებით ალაგებ.", href: "https://flexboxfroggy.com/" },
        { label: "Grid Garden", desc: "იგივე იდეა CSS Grid-ისთვის — სტაფილოს რწყავ.", href: "https://cssgridgarden.com/" },
        { label: "CSS Diner", desc: "სელექტორების სავარჯიშო თამაში.", href: "https://flukeout.github.io/" },
      ],
    },
    {
      title: "🎓 კურსები",
      items: [
        { label: "web.dev — Learn CSS", desc: "Google-ის სისტემური, თანამედროვე კურსი.", href: "https://web.dev/learn/css" },
        { label: "freeCodeCamp — Responsive Web Design", desc: "პრაქტიკული სავარჯიშოები სერტიფიკატით.", href: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
        { label: "The Odin Project — CSS", desc: "სრული გზა პროექტებით.", href: "https://www.theodinproject.com/" },
      ],
    },
    {
      title: "🛠 ხელსაწყოები",
      items: [
        { label: "Can I use", desc: "მუშაობს თუ არა თვისება კონკრეტულ ბრაუზერში.", href: "https://caniuse.com/" },
        { label: "CodePen", desc: "სწრაფი ექსპერიმენტები და სხვისი ნამუშევრები.", href: "https://codepen.io/" },
        { label: "Coolors", desc: "ფერთა პალიტრის შერჩევა.", href: "https://coolors.co/" },
        { label: "WebAIM Contrast Checker", desc: "შეამოწმე ტექსტისა და ფონის კონტრასტი.", href: "https://webaim.org/resources/contrastchecker/" },
      ],
    },
  ];

  lessons.push({
    id: "css-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "CSS-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია რესურსები, რომლებიც ამ თემას აღრმავებს — ცნობარებიდან და თამაშებიდან სრულ კურსებამდე.",
    analogy: "ინსტრუმენტების ყუთი: ცნობარს მაშინ ხსნი, როცა კონკრეტული თვისება გჭირდება; თამაშს — როცა ვარჯიში გინდა.",
    physicalLabel: "როგორ ისწავლო ეფექტურად",
    physical: "CSS პრაქტიკით ისწავლება. საუკეთესო მეთოდი: აირჩიე მოწონებული საიტი, გახსენი DevTools და სცადე მისი ერთი ბლოკის ნულიდან გამეორება. Flexbox Froggy და Grid Garden ერთ საღამოში გაივლება და განლაგებას სამუდამოდ დაგამახსოვრებს.",
    challenge: "აირჩიე ერთი რესურსი და გახსენი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      function onOpen() {
        setChallengeResult(true, "შესრულებულია: რესურსი გახსენი — გააგრძელე ვარჯიში. 🚀");
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
          text: "რჩევა: დაიწყე Flexbox Froggy-თი და Grid Garden-ით — ერთ საღამოში განლაგებას აითვისებ. თვისებებს კი MDN-ში ეძებე.",
        })
      );

      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
