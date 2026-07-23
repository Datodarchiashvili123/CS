(function () {
  const lessons = window.CssLessons || (window.CssLessons = []);

  // ---------- 6 ----------
  lessons.push({
    id: "css-cascade",
    title: "კასკადი და სპეციფიკურობა",
    shortTitle: "კასკადი",
    theory: "როცა ერთსა და იმავე ელემენტს რამდენიმე წესი ეხება, გამარჯვებულს სამი რამ წყვეტს: 1) სპეციფიკურობა — რამდენად „ზუსტია“ სელექტორი; 2) რიგი — თანაბარი სპეციფიკურობისას ბოლო წესი იმარჯვებს; 3) !important — ყველაფერს ჯაბნის.",
    analogy: "წესების იერარქია: სახლის წესი სჯაბნის ქალაქის წესს, ქალაქისა — ქვეყნისას. რაც უფრო კონკრეტულია, მით უფრო ძლიერია.",
    physicalLabel: "სპეციფიკურობის ქულა",
    physical: "id = 100, კლასი/ატრიბუტი/ფსევდო-კლასა = 10, ტეგი = 1. მაგალითად #menu a (101) სჯაბნის .nav a (11)-ს, ის კი — a (1)-ს. !important-ს გაურბოდე: ის კასკადს არღვევს და მოგვიანებით გამართვას ძალიან ართულებს. ჯობია სელექტორი გახადო უფრო ზუსტი.",
    challenge: "გააკეთე ისე, რომ აბზაცი წითელი გახდეს — არსებული წესის შეცვლის გარეშე, უფრო სპეციფიკური სელექტორის დამატებით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">\n  <p class="text">რა ფერი ვარ?</p>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        "p {\n  color: blue;\n}\n\n/* დაამატე უფრო სპეციფიკური წესი აქ */\n.box .text {\n  color: red;\n}",
        function (doc, win, css) {
          const p = doc.querySelector("p");
          if (!p) return;
          const red = CFZ.isColorNear(win.getComputedStyle(p).color, 255, 0, 0, 90);
          const noImportant = !/!important/.test(css);
          const ok = red && noImportant;
          setChallengeResult(
            ok,
            ok
              ? "შესრულებულია: სპეციფიკურობით მოიგე, !important-ის გარეშე."
              : !red
              ? "აბზაცი ჯერ არ არის წითელი."
              : "!important გამოიყენე — სცადე მის გარეშე, უფრო ზუსტი სელექტორით."
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "წაშალე „.box“ და დატოვე მხოლოდ „.text“ — ისევ იმუშავებს (10 > 1). ახლა კი სცადე მეორე წესი „p“-დ გადააკეთო: ორივე 1 ქულაა, ამიტომ ბოლო იმარჯვებს — გადაანაცვლე ზემოთ და ფერი შეიცვლება.",
          }),
        ])
      );
    },
  });

  // ---------- 7 ----------
  lessons.push({
    id: "css-inheritance",
    title: "მემკვიდრეობა",
    shortTitle: "მემკვიდრეობა",
    theory: "ზოგი თვისება მშობლიდან შვილს ავტომატურად გადაეცემა — ძირითადად ტექსტთან დაკავშირებული: color, font-family, font-size, line-height. სხვები (margin, padding, border, background) არ მემკვიდრეობით არ გადადის.",
    analogy: "ოჯახური თვისებები: თვალის ფერი გადადის, ავეჯის განლაგება — არა.",
    physicalLabel: "მართვის სიტყვები",
    physical: "inherit — აიღე მშობლის მნიშვნელობა; initial — დაუბრუნდი ნაგულისხმევს; unset — მემკვიდრეობითისთვის inherit, დანარჩენისთვის initial. სწორედ მემკვიდრეობის გამო წერენ body { font-family: … } ერთხელ — და მთელი გვერდი იღებს.",
    challenge: "დააყენე შრიფტი და ფერი მხოლოდ body-ზე ისე, რომ სამივე ელემენტმა მიიღოს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = "<h1>სათაური</h1>\n<p>აბზაცი</p>\n<ul><li>პუნქტი</li></ul>";

      const pg = CFZ.createStylePlayground(
        html,
        "body {\n  color: #2d6a4f;\n  font-family: Georgia, serif;\n}",
        function (doc, win, css) {
          const li = doc.querySelector("li");
          const h1 = doc.querySelector("h1");
          if (!li || !h1) return;
          const onlyBody = /body\s*\{/.test(css) && !/h1\s*\{|li\s*\{|p\s*\{/.test(css);
          const liColor = win.getComputedStyle(li).color;
          const h1Color = win.getComputedStyle(h1).color;
          const inherited = liColor === h1Color && !CFZ.isColorNear(liColor, 23, 32, 51, 10);
          const ok = onlyBody && inherited;
          setChallengeResult(
            ok,
            ok
              ? "შესრულებულია: ერთმა წესმა body-ზე მთელი გვერდი დაფარა."
              : !onlyBody
              ? "დაწერე მხოლოდ body წესი — ცალკე h1/p/li არ დასჭირდება."
              : "ფერი ჯერ არ შეცვლილა."
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რატომ არ მემკვიდრეობს ღილაკი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "<button>, <input> და <select> ბრაუზერის საკუთარ სტილს იყენებენ და შრიფტს ავტომატურად არ იღებენ. ამიტომ ხშირად წერენ: button, input { font: inherit; } — რომ ისინიც გვერდის შრიფტს დაემორჩილონ.",
          }),
        ])
      );
    },
  });

  // ---------- 8 ----------
  lessons.push({
    id: "css-colors",
    title: "ფერები",
    shortTitle: "ფერები",
    theory: "ფერის ჩაწერის რამდენიმე გზაა: სახელი (red), hex (#e63946), rgb(230, 57, 70), hsl(355, 78%, 56%). გამჭვირვალობისთვის — rgba(...) / hsla(...) ან ცალკე თვისება opacity.",
    analogy: "ერთი და იგივე ფერის სხვადასხვა ჩაწერა — როგორც ერთი მისამართი ქართულად, ინგლისურად და კოორდინატებით.",
    physicalLabel: "რომელი ავირჩიო",
    physical: "hex ყველაზე გავრცელებულია. hsl ყველაზე მოსახერხებელია ხელით რეგულირებისთვის: პირველი რიცხვი ტონია (0–360), მეორე — სიხასხასე, მესამე — სიკაშკაშე. ერთი ტონის ღია და მუქი ვარიანტების მიღება მხოლოდ მესამე რიცხვის შეცვლით შეიძლება. opacity მთელ ელემენტს გაამჭვირვალებს (შვილებთან ერთად), rgba კი მხოლოდ ამ ფერს.",
    challenge: "დააყენე ბარათს ფონი hsl-ით და ტექსტი თეთრად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="card">\n  <h2>ბარათი</h2>\n  <p>ტექსტი ბარათში.</p>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".card {\n  background: hsl(210, 70%, 45%);\n  color: white;\n  padding: 16px;\n  border-radius: 10px;\n}",
        function (doc, win, css) {
          const card = doc.querySelector(".card");
          if (!card) return;
          const usesHsl = /hsl\(/.test(css);
          const st = win.getComputedStyle(card);
          const white = CFZ.isColorNear(st.color, 255, 255, 255, 30);
          const hasBg = st.backgroundColor !== "rgba(0, 0, 0, 0)";
          const ok = usesHsl && white && hasBg;
          const missing = [];
          if (!usesHsl) missing.push("ფონი hsl()-ით");
          if (!hasBg) missing.push("ფონის ფერი");
          if (!white) missing.push("თეთრი ტექსტი");
          setChallengeResult(ok, ok ? "შესრულებულია: hsl ფონი და თეთრი ტექსტი." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "კონტრასტი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ტექსტსა და ფონს შორის კონტრასტი საკმარისი უნდა იყოს — სტანდარტი მოითხოვს მინიმუმ 4.5:1 ჩვეულებრივი ტექსტისთვის. სცადე: hsl-ის ბოლო რიცხვი (სიკაშკაშე) 45%-დან 80%-მდე აწიე და ნახე, როგორ ქრება თეთრი ტექსტი.",
          }),
        ])
      );
    },
  });

  // ---------- 9 ----------
  lessons.push({
    id: "css-units",
    title: "ერთეულები",
    shortTitle: "ერთეულები",
    theory: "px — ფიქსირებული წერტილი. % — მშობლის მიმართ. em — მიმდინარე ელემენტის შრიფტის მიმართ. rem — ფესვის (html) შრიფტის მიმართ. vw/vh — ეკრანის სიგანის/სიმაღლის პროცენტი.",
    analogy: "px — სახაზავი სანტიმეტრებში; rem — „ერთი ნაბიჯი“, სადაც ნაბიჯის სიგრძეს ერთხელ განსაზღვრავ; vw — „ოთახის სიგანის მეათედი“.",
    physicalLabel: "პრაქტიკული რჩევა",
    physical: "შრიფტისა და დაშორებისთვის rem გამოიყენე — მაშინ მომხმარებელს, ვინც ბრაუზერში შრიფტს ზრდის, მთელი გვერდი პროპორციულად გაეზრდება (px ამას არღვევს). em კარგია კომპონენტის შიგნით, სადაც დაშორება შრიფტს უნდა მიჰყვეს. ნაგულისხმევად 1rem = 16px.",
    challenge: "დააყენე .box-ის padding rem-ებში და სიგანე პროცენტებში.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">ბლოკი</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".box {\n  padding: 1.5rem;\n  width: 60%;\n  background: #dbeafe;\n}",
        function (doc, win, css) {
          const usesRem = /padding\s*:[^;]*rem/.test(css);
          const usesPercent = /width\s*:[^;]*%/.test(css);
          const ok = usesRem && usesPercent;
          const missing = [];
          if (!usesRem) missing.push("padding rem-ებში");
          if (!usesPercent) missing.push("width პროცენტებში");
          setChallengeResult(ok, ok ? "შესრულებულია: ფარდობითი ერთეულები გამოიყენე." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "em-ის ხაფანგი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "em მემკვიდრეობს და გროვდება: თუ .menu { font-size: 1.2em } და მის შიგნით კიდევ .item { font-size: 1.2em }, შედეგი 1.44em იქნება. ჩალაგებულ სიებში ეს ტექსტს უკონტროლოდ ზრდის — rem ამ პრობლემას არ ქმნის.",
          }),
        ])
      );
    },
  });

  // ---------- 10 ----------
  lessons.push({
    id: "css-text",
    title: "ტექსტი და ტიპოგრაფიკა",
    shortTitle: "ტექსტი",
    theory: "ტექსტის მთავარი თვისებები: font-family (შრიფტი), font-size (ზომა), font-weight (სისქე), line-height (სტრიქონებს შორის), letter-spacing (ასოებს შორის), text-align (სწორება), text-decoration (ხაზი), text-transform (რეგისტრი).",
    analogy: "ტიპოგრაფიკა კითხვადობის ხელოვნებაა: სწორად შერჩეული ზომა და სტრიქონთაშორისი მანძილი ტექსტს ორჯერ უფრო ადვილად საკითხავს ხდის.",
    physicalLabel: "ოქროს წესები",
    physical: "line-height დაწერე უერთეულოდ (1.5, არა 1.5em) — მაშინ სწორად გამრავლდება ნებისმიერ ზომაზე. ძირითადი ტექსტი 16px-ზე ნაკლები არ იყოს. სტრიქონის სიგრძე 45–75 სიმბოლო იდეალურია — ამას max-width: 65ch აკეთებს.",
    challenge: "დააყენე line-height 1.6, სტრიქონის მაქსიმალური სიგანე 65ch და სათაურს მოუმატე letter-spacing.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        "<h1>კითხვადი ტექსტი</h1>\n" +
        "<p>კარგი ტიპოგრაფიკა უხილავია: მკითხველი ვერ ამჩნევს, უბრალოდ ადვილად კითხულობს. სტრიქონი არც ძალიან გრძელი უნდა იყოს და არც ძალიან მოკლე.</p>";

      const pg = CFZ.createStylePlayground(
        html,
        "body {\n  line-height: 1.6;\n}\n\np {\n  max-width: 65ch;\n}\n\nh1 {\n  letter-spacing: 1px;\n}",
        function (doc, win, css) {
          const p = doc.querySelector("p");
          const h1 = doc.querySelector("h1");
          if (!p || !h1) return;
          const pst = win.getComputedStyle(p);
          const lh = parseFloat(pst.lineHeight) / parseFloat(pst.fontSize);
          const lhOk = lh >= 1.4 && lh <= 2;
          const chOk = /max-width\s*:[^;]*ch/.test(css);
          const lsOk = win.getComputedStyle(h1).letterSpacing !== "normal";
          const ok = lhOk && chOk && lsOk;
          const missing = [];
          if (!lhOk) missing.push("line-height ~1.6");
          if (!chOk) missing.push("max-width ch-ებში");
          if (!lsOk) missing.push("სათაურს letter-spacing");
          setChallengeResult(ok, ok ? "შესრულებულია: ტექსტი კითხვადია." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ch ერთეული" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "1ch არის „0“ სიმბოლოს სიგანე მიმდინარე შრიფტში. ამიტომ max-width: 65ch პირდაპირ ამბობს „დაახლოებით 65 სიმბოლო სტრიქონში“ — ზუსტად ის, რაც ტიპოგრაფიკაში ოპტიმალურად ითვლება.",
          }),
        ])
      );
    },
  });

  // ---------- 11 ----------
  lessons.push({
    id: "css-fonts",
    title: "ვებ-შრიფტები",
    shortTitle: "შრიფტები",
    theory: "font-family-ში რამდენიმე შრიფტს წერ რიგზე — ბრაუზერი პირველ ხელმისაწვდომს აირჩევს. ბოლოს ყოველთვის ზოგადი ოჯახი დაწერე: serif, sans-serif ან monospace. გარე შრიფტი @font-face-ით ან სერვისით (მაგ. Google Fonts) ჩაიტვირთება.",
    analogy: "სათადარიგო გეგმა: „თუ ეს შრიფტი არ არის — გამოიყენე ეს, თუ არც ის — მაშინ ნებისმიერი უსერიფო“.",
    physicalLabel: "ქართულის ნიუანსი",
    physical: "ყველა შრიფტს ქართული ასოები არ აქვს! თუ შრიფტს ქართული არ აქვს, ბრაუზერი მას ჩაანაცვლებს და ტექსტი სხვანაირად გამოჩნდება. სისტემური სტეკი — system-ui, -apple-system, „Segoe UI“, sans-serif — უსაფრთხოა, სწრაფია (არაფერი იტვირთება) და ქართულსაც კარგად აჩვენებს.",
    challenge: "დააყენე შრიფტების სტეკი, სადაც მინიმუმ 2 შრიფტია და ბოლოს ზოგადი ოჯახი (sans-serif ან serif).",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = "<h1>შრიფტების სტეკი</h1>\n<p>ქართული ტექსტი და English text ერთად.</p>";

      const pg = CFZ.createStylePlayground(
        html,
        'body {\n  font-family: system-ui, "Segoe UI", Roboto, sans-serif;\n}',
        function (doc, win, css) {
          const m = css.match(/font-family\s*:([^;}]+)/);
          if (!m) {
            setChallengeResult(false, "დაწერე font-family.");
            return;
          }
          const parts = m[1].split(",").map(function (s) {
            return s.trim();
          }).filter(Boolean);
          const generic = /(sans-serif|serif|monospace|system-ui|cursive)\s*$/.test(parts[parts.length - 1] || "");
          const ok = parts.length >= 2 && generic;
          setChallengeResult(
            ok,
            ok
              ? "შესრულებულია: სტეკი სათადარიგო შრიფტებით გაქვს."
              : parts.length < 2
              ? "დაამატე მინიმუმ ორი შრიფტი, მძიმით გამოყოფილი."
              : "ბოლოს დაამატე ზოგადი ოჯახი (sans-serif / serif)."
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სიჩქარის ფასი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "თითო გარე შრიფტი დამატებითი ფაილია — გვერდი ნელა იტვირთება და ტექსტი ერთ წამს უხილავი შეიძლება იყოს. ამიტომ: ჩატვირთე მხოლოდ ის სისქეები, რაც მართლა გჭირდება, და დაამატე font-display: swap, რომ ტექსტი მაშინვე გამოჩნდეს სათადარიგო შრიფტით.",
          }),
        ])
      );
    },
  });
})();
