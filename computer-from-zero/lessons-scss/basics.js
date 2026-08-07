(function () {
  const lessons = window.ScssLessons || (window.ScssLessons = []);

  function rgbAlpha(str) {
    const m = /rgba?\(([^)]+)\)/.exec(str || "");
    if (!m) return 1;
    const parts = m[1].split(",");
    return parts.length >= 4 ? parseFloat(parts[3]) : 1;
  }

  // ---------- 1 ----------
  lessons.push({
    id: "scss-intro",
    title: "რა არის SCSS",
    shortTitle: "რა არის SCSS",
    theory:
      "Sass არის CSS-ის „ზედნაშენი“ (superset): ყველა ვალიდური CSS ასევე ვალიდური SCSS-ია, ოღონდ ემატება ცვლადები, ჩალაგება, ფუნქციები და ციკლები. ბრაუზერს SCSS პირდაპირ არ ესმის — ჯერ კომპილირდება ჩვეულებრივ CSS-ად (.scss → .css). SCSS არის Sass-ის სინტაქსი ფიგურული ფრჩხილებითა და წერტილმძიმეებით, ანუ ძალიან CSS-ს ჰგავს.",
    analogy:
      "SCSS — მშენებლის ჭკვიანი შაბლონები; CSS — საბოლოო ნახაზი, რომელსაც ხელოსანი (ბრაუზერი) კითხულობს. შენ შაბლონებით მუშაობ, კომპილატორი კი მათ სუფთა ნახაზად თარგმნის.",
    physicalLabel: "როგორ მუშაობს",
    physical:
      "ჩვეულებრივ ტერმინალში ერთი ბრძანება უყურებს ცვლილებებს: `sass style.scss style.css`. აქ, ამ პლატფორმაზე, კომპილაცია ბრაუზერშივე ხდება — მარჯვნივ ხედავ, რა CSS-ად იქცევა შენი SCSS.",
    challenge: "შექმენი ცვლადი $brand და შეღებე მისით სათაური.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = "<h1>ჩემი ბრენდი</h1>\n<p>SCSS მუშაობს.</p>";
      const pg = CFZ.createScssPlayground(
        html,
        "$brand: #6C4AB6;\n\nh1 {\n  color: $brand;\n}",
        function (doc, win) {
          const h1 = doc.querySelector("h1");
          if (!h1) return;
          const ok = CFZ.isColorNear(win.getComputedStyle(h1).color, 108, 74, 182, 40);
          setChallengeResult(ok, ok ? "შესრულებულია: ცვლადი გამოიყენე." : "სათაური $brand-ის ფერით უნდა შეიღებოს.");
        }
      );
      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "დააკვირდი" }),
          CFZ.el("p", { className: "breakdown-note", text: "მარცხნივ SCSS წერია, შუაში — რას იქცევა ის CSS-ად. $brand ერთხელ არის განსაზღვრული და ყველგან იმ ფერით ჩაანაცვლებს." }),
        ])
      );
    },
  });

  // ---------- 2 ----------
  lessons.push({
    id: "scss-variables",
    title: "ცვლადები ($)",
    shortTitle: "ცვლადები",
    theory:
      "ცვლადი იწყება $-ით: `$primary: #333;`. მისი მნიშვნელობა შეიძლება იყოს ფერი, ზომა, შრიფტი — რაც გინდა. ერთ ადგილას ცვლი და ყველგან განახლდება. ეს ინახავს „ჭეშმარიტების ერთ წყაროს“ — ბრენდის ფერებს, დაშორებებს, კუთხის რადიუსებს.",
    analogy:
      "ცვლადი — რეცეპტში „მთავარი სანელებელი“. თუ ერთ ჩანაწერს შეცვლი, მთელი კერძი შეიცვლება, თითოეულ სტრიქონს ხელით არ ეძებ.",
    physicalLabel: "სად გამოვიყენოთ",
    physical:
      "პრაქტიკაში ცვლადებში ინახავენ: ბრენდის ფერებს ($primary, $accent), დაშორებებს ($space-1: 8px), შრიფტებს, breakpoint-ებს. ეს რედიზაინს წუთების საქმედ აქცევს.",
    challenge: "შექმენი ცვლადები $accent (მწვანე) და $radius: 12px; მიანიჭე .box-ს ფონად და კუთხის რადიუსად.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">ბლოკი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "$accent: #16a34a;\n$radius: 12px;\n\n.box {\n  background: $accent;\n  border-radius: $radius;\n  color: white;\n  padding: 20px;\n}",
        function (doc, win) {
          const box = doc.querySelector(".box");
          if (!box) return;
          const cs = win.getComputedStyle(box);
          const green = CFZ.isColorNear(cs.backgroundColor, 22, 163, 74, 60);
          const radius = parseFloat(cs.borderTopLeftRadius) >= 12;
          const ok = green && radius;
          const miss = [];
          if (!green) miss.push("ფონი $accent-ით");
          if (!radius) miss.push("რადიუსი $radius-ით (12px)");
          setChallengeResult(ok, ok ? "შესრულებულია: ორივე ცვლადი გამოიყენე." : "აკლია: " + miss.join(", ") + ".");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 3 ----------
  lessons.push({
    id: "scss-nesting",
    title: "ჩალაგება (nesting)",
    shortTitle: "ჩალაგება",
    theory:
      "SCSS-ში წესები ერთმანეთში ილაგება — HTML-ის სტრუქტურის კვალდაკვალ. `.card { .title { … } }` კომპილირდება `.card .title`-ად. ეს ამცირებს გამეორებას და კოდი უფრო იკითხება. ოღონდ არ გადააჭარბო — ღრმა ჩალაგება (4+ დონე) ბადებს მყიფე, ზედმეტად ძლიერ სელექტორებს.",
    analogy:
      "ჩალაგება — მისამართის ჩაწერა: „ქალაქი → ქუჩა → სახლი“. თითო დონე წინას აზუსტებს. მაგრამ თუ ძალიან ჩაშლი, მისამართი გაუგებარი ხდება.",
    physicalLabel: "ოქროს წესი",
    physical:
      "შეეცადე 2-3 დონეზე მეტი არ ჩაალაგო. ღრმა ჩალაგება = მაღალი specificity = ძნელი გადაფარვა. თუ ჩალაგება ღრმავდება, ალბათ დროა ცალკე კლასი გამოყო.",
    challenge: "ჩააგე წესები ისე, რომ .menu-ის შიგნით a ბმულები შეიღებოს ლურჯად, hover-ის გარეშე.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<nav class="menu"><a href="#">ერთი</a> <a href="#">ორი</a></nav>';
      const pg = CFZ.createScssPlayground(
        html,
        ".menu {\n  padding: 10px;\n\n  a {\n    color: #2563eb;\n    text-decoration: none;\n  }\n}",
        function (doc, win) {
          const a = doc.querySelector(".menu a");
          if (!a) return;
          const ok = CFZ.isColorNear(win.getComputedStyle(a).color, 37, 99, 235, 50);
          setChallengeResult(ok, ok ? "შესრულებულია: ჩალაგებული სელექტორი იმუშავა." : "ბმულები .menu-ის შიგნით ლურჯი უნდა იყოს (ჩალაგებული a).");
        }
      );
      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "დააკვირდი კომპილაციას" }),
          CFZ.el("p", { className: "breakdown-note", text: "შუა პანელში ხედავ, რომ ჩალაგებული `a` იქცა `.menu a`-დ. სწორედ ამას აკეთებს კომპილატორი." }),
        ])
      );
    },
  });

  // ---------- 4 ----------
  lessons.push({
    id: "scss-parent",
    title: "& — მშობელი სელექტორი",
    shortTitle: "& მშობელი",
    theory:
      "`&` ნიშნავს „მშობელ სელექტორს“. `.btn { &:hover { … } }` კომპილირდება `.btn:hover`-ად — არა `.btn :hover`. `&` ასევე გამოდგება BEM-ისთვის: `.btn { &--primary { … } }` → `.btn--primary`, `&.is-active` → `.btn.is-active`.",
    analogy:
      "& — ნაცვალსახელი „ის თავად“. მშობელი ამბობს: „ჩემი hover-ის დროს…“, „ჩემი --primary ვარიანტი…“ — ისე, რომ სახელი აღარ გაიმეორო.",
    physicalLabel: "სად ბრწყინავს",
    physical:
      "& აუცილებელია მდგომარეობებისთვის (:hover, :focus), მოდიფიკატორებისთვის (--big, --primary) და კონტექსტისთვის (`.dark & { … }` = „როცა მშობელი .dark-შია“).",
    challenge: "დაუმატე .btn-ს მოდიფიკატორი &--primary მწვანე ფონით; ღილაკს .btn--primary კლასი უკვე აქვს.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<a class="btn btn--primary">ღილაკი</a>';
      const pg = CFZ.createScssPlayground(
        html,
        ".btn {\n  display: inline-block;\n  padding: 10px 18px;\n  color: white;\n  border-radius: 8px;\n\n  &--primary {\n    background: #16a34a;\n  }\n}",
        function (doc, win) {
          const b = doc.querySelector(".btn--primary");
          if (!b) return;
          const ok = CFZ.isColorNear(win.getComputedStyle(b).backgroundColor, 22, 163, 74, 60);
          setChallengeResult(ok, ok ? "შესრულებულია: &--primary → .btn--primary." : "&--primary-ს მწვანე ფონი უნდა მისცე.");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 5 ----------
  lessons.push({
    id: "scss-nested-props",
    title: "ჩალაგებული თვისებები",
    shortTitle: "ჩალაგ. თვისებები",
    theory:
      "საერთო პრეფიქსის მქონე თვისებები შეიძლება დაიჯგუფოს: `font: { family: serif; size: 20px; }` კომპილირდება `font-family: serif; font-size: 20px;`-ად. იგივე მუშაობს `border`, `margin`, `background` და სხვა პრეფიქსებზე.",
    analogy:
      "ეს — სიის სათაური: ერთხელ წერ „ფონტი:“ და ქვეშ ჩამოთვლი მის თვისებებს, ყოველ ჯერზე „font-“ პრეფიქსის გამეორების გარეშე.",
    physicalLabel: "როდის გამოვიყენოთ",
    physical:
      "მოსახერხებელია, როცა ერთ ელემენტს ერთი ოჯახის რამდენიმე თვისება აქვს (border-width/style/color). ცოტას თუ იყენებ, ჩვეულებრივი ჩაწერაც კარგია — გემოვნების საქმეა.",
    challenge: "გამოიყენე ჩალაგებული `border: { … }` — მიეცი .frame-ს 3px მყარი ლურჯი კიდე.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="frame">ჩარჩო</div>';
      const pg = CFZ.createScssPlayground(
        html,
        ".frame {\n  padding: 20px;\n\n  border: {\n    width: 3px;\n    style: solid;\n    color: #2563eb;\n  }\n}",
        function (doc, win) {
          const f = doc.querySelector(".frame");
          if (!f) return;
          const cs = win.getComputedStyle(f);
          const w = parseFloat(cs.borderTopWidth) >= 3;
          const solid = cs.borderTopStyle === "solid";
          const blue = CFZ.isColorNear(cs.borderTopColor, 37, 99, 235, 60);
          const ok = w && solid && blue;
          setChallengeResult(ok, ok ? "შესრულებულია: ჩალაგებული თვისებები გაიშალა." : "კიდე 3px მყარი ლურჯი უნდა იყოს (border: { … }).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 6 ----------
  lessons.push({
    id: "scss-mixin",
    title: "@mixin და @include",
    shortTitle: "@mixin",
    theory:
      "@mixin ინახავს ხელახლა გამოსაყენებელ სტილის ბლოკს; @include-ით ის ერთვება. `@mixin center { display: flex; justify-content: center; align-items: center; }` შემდეგ `.box { @include center; }`. ერთხელ წერ — მრავალჯერ იყენებ.",
    analogy:
      "mixin — შენახული „ბრძანებათა კრებული“. ნაცვლად ხუთი სტრიქონისა ყოველ ჯერზე, ერთი @include-ით მთელ ნაკრებს იძახებ.",
    physicalLabel: "mixin vs ცვლადი",
    physical:
      "ცვლადი ერთ მნიშვნელობას ინახავს (ფერს, ზომას); mixin — მთელ სტილის ბლოკს (რამდენიმე თვისებას ერთად). იმეორებად „ნიმუშებს“ (ცენტრირება, ღილაკის სტილი) mixin-ში ინახავენ.",
    challenge: "შექმენი @mixin center flex-ცენტრირებით და @include-ით მიუყენე .box-ს.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box"><span>ცენტრში</span></div>';
      const pg = CFZ.createScssPlayground(
        html,
        "@mixin center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.box {\n  @include center;\n  height: 90px;\n  background: #eef;\n}",
        function (doc, win) {
          const b = doc.querySelector(".box");
          if (!b) return;
          const cs = win.getComputedStyle(b);
          const ok = cs.display === "flex" && cs.justifyContent === "center" && cs.alignItems === "center";
          setChallengeResult(ok, ok ? "შესრულებულია: mixin ჩაერთო." : "@mixin center-მა flex + ორივე ცენტრირება უნდა მისცეს .box-ს.");
        }
      );
      container.append(pg.element);
    },
  });
})();
