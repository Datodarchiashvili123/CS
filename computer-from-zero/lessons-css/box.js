(function () {
  const lessons = window.CssLessons || (window.CssLessons = []);

  // ---------- 12 ----------
  lessons.push({
    id: "css-box-model",
    title: "ბოქს-მოდელი",
    shortTitle: "ბოქს-მოდელი",
    theory: "ყოველი ელემენტი ოთხკუთხედია, რომელიც ოთხი ფენისგან შედგება — შიგნიდან გარეთ: content (შიგთავსი), padding (შიდა დაშორება), border (საზღვარი), margin (გარე დაშორება).",
    analogy: "ჩარჩოში ჩასმული ფოტო: სურათი (content), თეთრი პასპარტუ (padding), ჩარჩო (border), კედელზე მანძილი სხვა ჩარჩომდე (margin).",
    physicalLabel: "ერთი წესი, რომელიც ყველაფერს ცვლის",
    physical: "ნაგულისხმევად width მხოლოდ content-ს ზომავს — padding და border ზემოდან ემატება, ამიტომ 300px სიგანის ბლოკი რეალურად 340px ხდება. box-sizing: border-box ამას ასწორებს: სიგანეში padding-იც და border-იც შედის. ამიტომ თითქმის ყველა პროექტი იწყება წესით: * { box-sizing: border-box; }",
    challenge: "დააყენე ბლოკს padding, border და margin, და ჩართე box-sizing: border-box.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">ბლოკი</div>\n<div class="box">მეორე ბლოკი</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".box {\n  box-sizing: border-box;\n  width: 220px;\n  padding: 16px;\n  border: 3px solid #3867d6;\n  margin: 12px;\n  background: #eef3ff;\n}",
        function (doc, win) {
          const box = doc.querySelector(".box");
          if (!box) return;
          const st = win.getComputedStyle(box);
          const pad = parseFloat(st.paddingTop) > 0;
          const bor = parseFloat(st.borderTopWidth) > 0;
          const mar = parseFloat(st.marginTop) > 0;
          const bb = st.boxSizing === "border-box";
          const ok = pad && bor && mar && bb;
          const missing = [];
          if (!pad) missing.push("padding");
          if (!bor) missing.push("border");
          if (!mar) missing.push("margin");
          if (!bb) missing.push("box-sizing: border-box");
          setChallengeResult(ok, ok ? "შესრულებულია: ოთხივე ფენა დააყენე." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე განსხვავება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "წაშალე box-sizing სტრიქონი და დააკვირდი — ბლოკი გაგანიერდება, რადგან 220px-ს ზემოდან დაემატება padding (32px) და border (6px). დააბრუნე და ისევ 220px გახდება. სწორედ ეს არის border-box-ის მთელი აზრი.",
          }),
        ])
      );
    },
  });

  // ---------- 13 ----------
  lessons.push({
    id: "css-spacing",
    title: "margin, padding და shorthand",
    shortTitle: "დაშორებები",
    theory: "padding შიგნითაა (ფონის ქვეშ ხვდება), margin — გარეთ (ყოველთვის გამჭვირვალე). ორივეს აქვს შემოკლებული ჩაწერა: ერთი მნიშვნელობა — ოთხივე მხარეს; ორი — ვერტიკალი/ჰორიზონტალი; ოთხი — ზემოდან საათის ისრის მიმართულებით.",
    analogy: "padding — ღონისძიების დარბაზში სკამებსა და კედელს შორის სივრცე; margin — თავად შენობებს შორის მანძილი.",
    physicalLabel: "ორი ხრიკი",
    physical: "1) margin collapse: ვერტიკალური margin-ები ერწყმის ერთმანეთს — 20px და 30px გვერდიგვერდ 50px-ს კი არ იძლევა, არამედ 30px-ს. ჰორიზონტალურს ეს არ ემართება. 2) margin: 0 auto ბლოკს ჰორიზონტალურად აცენტრებს (თუ სიგანე მითითებულია).",
    challenge: "დააცენტრე ბლოკი გვერდზე margin: 0 auto-თი და მიეცი ვერტიკალური და ჰორიზონტალური padding სხვადასხვა მნიშვნელობით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="wrap">ცენტრირებული ბლოკი</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".wrap {\n  width: 240px;\n  margin: 0 auto;\n  padding: 12px 28px;\n  background: #dbeafe;\n}",
        function (doc, win) {
          const w = doc.querySelector(".wrap");
          if (!w) return;
          const st = win.getComputedStyle(w);
          const centered = st.marginLeft === st.marginRight && parseFloat(st.marginLeft) > 0;
          const padDiff = Math.abs(parseFloat(st.paddingTop) - parseFloat(st.paddingLeft)) > 1;
          const ok = centered && padDiff;
          const missing = [];
          if (!centered) missing.push("margin: 0 auto (და width)");
          if (!padDiff) missing.push("ვერტიკალური და ჰორიზონტალური padding სხვადასხვა");
          setChallengeResult(ok, ok ? "შესრულებულია: ცენტრირება და shorthand გამოიყენე." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "shorthand-ის რიგი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "padding: 10px 20px 30px 40px — ზემოთ, მარჯვნივ, ქვემოთ, მარცხნივ (საათის ისრით). padding: 10px 20px — ზემოთ/ქვემოთ 10, გვერდებზე 20. თანამედროვე ალტერნატივა: padding-block და padding-inline.",
          }),
        ])
      );
    },
  });

  // ---------- 14 ----------
  lessons.push({
    id: "css-borders",
    title: "საზღვრები, მომრგვალება, ჩრდილი",
    shortTitle: "საზღვრები",
    theory: "border სამი ნაწილისგან შედგება: სისქე, სტილი და ფერი — border: 2px solid #333. border-radius კუთხეებს ამრგვალებს (50% წრეს ქმნის). box-shadow ჩრდილს ამატებს: X Y გაბუნდოვნება ფერი.",
    analogy: "ჩარჩო სურათს, მომრგვალებული კუთხეები ბარათს და ჩრდილი, რომელიც ღილაკს „ასწევს“ ფურცლიდან.",
    physicalLabel: "დეტალები",
    physical: "border-style აუცილებელია — მხოლოდ სისქისა და ფერის მითითებით საზღვარი არ გამოჩნდება. outline border-ს ჰგავს, მაგრამ ადგილს არ იკავებს და განლაგებას არ ცვლის — ამიტომ ფოკუსის აღსანიშნავად სწორედ ის გამოიყენება (და არასდროს წაშალო outline ჩანაცვლების გარეშე). box-shadow-ს inset თუ დაამატებ, ჩრდილი შიგნით გადავა.",
    challenge: "გააკეთე ბარათი: მომრგვალებული კუთხეები, საზღვარი და რბილი ჩრდილი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="card">\n  <h3>ბარათი</h3>\n  <p>ჩრდილითა და მომრგვალებით.</p>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".card {\n  padding: 18px;\n  border: 1px solid #d8dee9;\n  border-radius: 14px;\n  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);\n  background: #fff;\n}",
        function (doc, win) {
          const card = doc.querySelector(".card");
          if (!card) return;
          const st = win.getComputedStyle(card);
          const radius = parseFloat(st.borderTopLeftRadius) > 0;
          const border = parseFloat(st.borderTopWidth) > 0 && st.borderTopStyle !== "none";
          const shadow = st.boxShadow && st.boxShadow !== "none";
          const ok = radius && border && shadow;
          const missing = [];
          if (!border) missing.push("border (სისქე + სტილი + ფერი)");
          if (!radius) missing.push("border-radius");
          if (!shadow) missing.push("box-shadow");
          setChallengeResult(ok, ok ? "შესრულებულია: ბარათი მზადაა." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "წრე ერთი ხაზით" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ავატარის წრედ ქცევა: width და height ერთნაირი + border-radius: 50%. ჩრდილი კი რაც უფრო დიდი გაბუნდოვნება და დაბალი გამჭვირვალობა აქვს, მით უფრო ბუნებრივია — მკვეთრი შავი ჩრდილი მოძველებულად გამოიყურება.",
          }),
        ])
      );
    },
  });

  // ---------- 15 ----------
  lessons.push({
    id: "css-backgrounds",
    title: "ფონები და გრადიენტი",
    shortTitle: "ფონები",
    theory: "background-color ფონის ფერია, background-image — სურათი ან გრადიენტი. მას აკონტროლებს: background-size (cover — ავსებს, contain — ეტევა), background-position (მაგ. center), background-repeat (no-repeat).",
    analogy: "კედლის შეღებვა vs ფოტოშპალერი: ერთი ერთფეროვანია, მეორეს კი უნდა უთხრა, როგორ გაიწელოს და გამეორდეს თუ არა.",
    physicalLabel: "გრადიენტი",
    physical: "გრადიენტი სურათია, არა ფერი — ამიტომ background-image-ში იწერება: linear-gradient(to right, #3867d6, #6d93ff). არსებობს radial-gradient (წრიული) და conic-gradient (კონუსური). შემოკლებული background ერთდროულად ყველა თვისებას აყენებს.",
    challenge: "დააყენე ბანერს გრადიენტული ფონი და ტექსტი გახადე თეთრი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="banner">\n  <h2>მოგესალმებით</h2>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".banner {\n  padding: 40px 20px;\n  background: linear-gradient(135deg, #3867d6, #6d93ff);\n  color: white;\n  border-radius: 12px;\n}",
        function (doc, win, css) {
          const b = doc.querySelector(".banner");
          if (!b) return;
          const st = win.getComputedStyle(b);
          const grad = /gradient\(/.test(css) && /gradient/.test(st.backgroundImage);
          const white = CFZ.isColorNear(st.color, 255, 255, 255, 30);
          const ok = grad && white;
          const missing = [];
          if (!grad) missing.push("გრადიენტული ფონი");
          if (!white) missing.push("თეთრი ტექსტი");
          setChallengeResult(ok, ok ? "შესრულებულია: ბანერი გრადიენტით." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "cover თუ contain" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "cover — სურათი მთელ ბლოკს ავსებს, კიდეები შეიძლება მოიჭრას (ჰერო-ბანერისთვის). contain — მთლიანად ეტევა, შეიძლება ცარიელი ადგილი დარჩეს (ლოგოსთვის). სცადე: შეცვალე გრადიენტის კუთხე 135deg → to right.",
          }),
        ])
      );
    },
  });

  // ---------- 16 ----------
  lessons.push({
    id: "css-display",
    title: "display — ელემენტის ქცევა",
    shortTitle: "display",
    theory: "display განსაზღვრავს, როგორ იქცევა ელემენტი: block (მთელი სიგანე, ახალი ხაზი), inline (ტექსტის ნაკადში, სიგანე/სიმაღლე არ მოქმედებს), inline-block (ნაკადში რჩება, მაგრამ ზომებს იღებს), none (მთლიანად ქრება), flex და grid (განლაგების რეჟიმები).",
    analogy: "block — აბზაცი, რომელიც მთელ ხაზს იკავებს; inline — სიტყვა წინადადებაში; inline-block — სიტყვა, რომელსაც საკუთარი ყუთი აქვს.",
    physicalLabel: "მნიშვნელოვანი განსხვავება",
    physical: "inline ელემენტს width, height და ვერტიკალური margin არ მოქმედებს — ეს ხშირი გაუგებრობის წყაროა (მაგ. <a>-ს ზომას ვერ აძლევ). გამოსავალი: display: inline-block ან block. display: none ელემენტს სრულად შლის ნაკადიდან; visibility: hidden კი მალავს, მაგრამ ადგილს უტოვებს.",
    challenge: "აქციე ბმულები ღილაკებად: მიეცი მათ inline-block, padding და ფონი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<a href="#" class="btn">პირველი</a>\n<a href="#" class="btn">მეორე</a>';

      const pg = CFZ.createStylePlayground(
        html,
        ".btn {\n  display: inline-block;\n  padding: 10px 18px;\n  background: #3867d6;\n  color: white;\n  text-decoration: none;\n  border-radius: 8px;\n}",
        function (doc, win) {
          const btn = doc.querySelector(".btn");
          if (!btn) return;
          const st = win.getComputedStyle(btn);
          const dsp = st.display === "inline-block" || st.display === "block";
          const pad = parseFloat(st.paddingTop) > 0;
          const bg = st.backgroundColor !== "rgba(0, 0, 0, 0)";
          const ok = dsp && pad && bg;
          const missing = [];
          if (!dsp) missing.push("display: inline-block");
          if (!pad) missing.push("padding");
          if (!bg) missing.push("ფონის ფერი");
          setChallengeResult(ok, ok ? "შესრულებულია: ბმულები ღილაკებად აქციე." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "შეცვალე inline-block → inline და დააკვირდი: ვერტიკალური padding ვიზუალურად გადაიფარება და ღილაკები ერთმანეთს „შეაწვება“. სწორედ ამიტომ ჭირდება ბმულს inline-block ღილაკად ქცევისას.",
          }),
        ])
      );
    },
  });

  // ---------- 17 ----------
  lessons.push({
    id: "css-position",
    title: "პოზიციონირება",
    shortTitle: "position",
    theory: "position განსაზღვრავს, როგორ განთავსდება ელემენტი: static (ნაგულისხმევი, ჩვეულებრივ ნაკადში), relative (თავისი ადგილიდან წანაცვლებული, ადგილი რჩება), absolute (ნაკადიდან ამოღებული, უახლოეს პოზიციონირებულ მშობელს მიება), fixed (ეკრანზე მიმაგრებული), sticky (გადახვევისას „ეწებება“).",
    analogy: "static — ადამიანი რიგში; relative — ნაბიჯი გვერდზე, ოღონდ ადგილი შენარჩუნებული; absolute — რიგიდან გასული და კონკრეტულ ადგილას მდგარი; fixed — მაგნიტით კედელზე მიმაგრებული.",
    physicalLabel: "მთავარი წესი",
    physical: "absolute ელემენტი უახლოეს წინაპარს ეძებს, რომელსაც position არა static აქვს — თუ ვერ იპოვა, მთელ გვერდს მიება. ამიტომ თითქმის ყოველთვის: მშობელს position: relative, შვილს position: absolute. top/right/bottom/left მხოლოდ არა-static ელემენტებზე მუშაობს. z-index ფენებს აწყობს — ისიც მხოლოდ პოზიციონირებულზე.",
    challenge: "მოათავსე ნიშანი (.badge) ბარათის მარჯვენა ზედა კუთხეში absolute-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="card">\n  <span class="badge">ახალი</span>\n  <h3>პროდუქტი</h3>\n  <p>აღწერა.</p>\n</div>';

      const pg = CFZ.createStylePlayground(
        html,
        ".card {\n  position: relative;\n  padding: 18px;\n  border: 1px solid #d8dee9;\n  border-radius: 12px;\n}\n\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #e63946;\n  color: white;\n  padding: 3px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}",
        function (doc, win) {
          const card = doc.querySelector(".card");
          const badge = doc.querySelector(".badge");
          if (!card || !badge) return;
          const cs = win.getComputedStyle(card);
          const bs = win.getComputedStyle(badge);
          const rel = cs.position === "relative";
          const abs = bs.position === "absolute";
          const placed = bs.top !== "auto" && bs.right !== "auto";
          const ok = rel && abs && placed;
          const missing = [];
          if (!rel) missing.push("ბარათს position: relative");
          if (!abs) missing.push("ნიშანს position: absolute");
          if (!placed) missing.push("top და right");
          setChallengeResult(ok, ok ? "შესრულებულია: ნიშანი კუთხეში დაჯდა." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "წაშალე .card-ის position: relative და ნახე — ნიშანი მთელი გვერდის კუთხეში გადახტება, რადგან პოზიციონირებული მშობელი აღარ არსებობს. ეს absolute-თან მუშაობის ყველაზე ხშირი შეცდომაა.",
          }),
        ])
      );
    },
  });
})();
