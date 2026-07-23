(function () {
  const lessons = window.CssLessons || (window.CssLessons = []);

  // ---------- 18 ----------
  lessons.push({
    id: "css-flex-basics",
    title: "Flexbox — საფუძვლები",
    shortTitle: "Flexbox 1",
    theory: "display: flex მშობელს „მოქნილ კონტეინერად“ აქცევს და მის შვილებს ერთ ხაზზე ალაგებს. მთავარი თვისებები: flex-direction (row ან column), justify-content (განაწილება მთავარი ღერძის გასწვრივ), align-items (სწორება განივი ღერძის გასწვრივ), gap (დაშორება).",
    analogy: "თარო, რომელზეც წიგნებს ალაგებ: შეგიძლია მარცხნივ მიაწყო, ცენტრში შეკრიბო, თანაბრად გაანაწილო ან კიდეებზე გაწიო.",
    physicalLabel: "ორი ღერძი",
    physical: "row (ნაგულისხმევი) რომ გაქვს, მთავარი ღერძი ჰორიზონტალურია — მაშინ justify-content მარცხნიდან მარჯვნივ ანაწილებს, align-items კი ვერტიკალურად ასწორებს. column-ზე გადასვლისას ისინი ადგილებს იცვლიან. სწორედ ეს ხრიკია ცენტრირების კლასიკური რეცეპტი: justify-content: center + align-items: center.",
    challenge: "დააწყვე ბარათები ერთ რიგში, დაშორებით (gap) და ვერტიკალურად ცენტრირებული.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<div class="row">\n' +
        '  <div class="item">მოკლე</div>\n' +
        '  <div class="item">უფრო გრძელი ტექსტი აქ</div>\n' +
        '  <div class="item">საშუალო</div>\n' +
        "</div>";

      const pg = CFZ.createStylePlayground(
        html,
        ".row {\n  display: flex;\n  gap: 12px;\n  align-items: center;\n}\n\n.item {\n  padding: 12px;\n  background: #dbeafe;\n  border-radius: 8px;\n}",
        function (doc, win) {
          const row = doc.querySelector(".row");
          if (!row) return;
          const st = win.getComputedStyle(row);
          const isFlex = st.display === "flex";
          const hasGap = parseFloat(st.columnGap || st.gap) > 0;
          const aligned = st.alignItems === "center";
          const ok = isFlex && hasGap && aligned;
          const missing = [];
          if (!isFlex) missing.push("display: flex");
          if (!hasGap) missing.push("gap");
          if (!aligned) missing.push("align-items: center");
          setChallengeResult(ok, ok ? "შესრულებულია: მოქნილი რიგი აეწყო." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე მნიშვნელობები" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "justify-content: flex-start | center | space-between | space-around | space-evenly. space-between კიდეებზე მიაწებებს პირველსა და ბოლოს — ეს ნავიგაციის ზოლის ყველაზე გავრცელებული რეცეპტია (ლოგო მარცხნივ, მენიუ მარჯვნივ).",
          }),
        ])
      );
    },
  });

  // ---------- 19 ----------
  lessons.push({
    id: "css-flex-advanced",
    title: "Flexbox — გაწელვა და გადატანა",
    shortTitle: "Flexbox 2",
    theory: "flex-wrap: wrap ელემენტებს ახალ ხაზზე გადაიტანს, როცა ადგილი აღარაა. flex-grow განსაზღვრავს, როგორ გაინაწილონ თავისუფალი სივრცე; flex-shrink — როგორ შეიკუმშონ; flex-basis — საწყისი ზომა. შემოკლება: flex: 1 ნიშნავს „დაიკავე დარჩენილი ადგილი თანაბრად“.",
    analogy: "მგზავრები სკამზე: wrap — ვინც არ ეტევა, შემდეგ რიგში გადადის; flex: 1 — ყველა თანაბრად ვრცელდება; flex-basis — რამდენი ადგილი უჭირავს თავიდან.",
    physicalLabel: "ყველაზე სასარგებლო ხრიკი",
    physical: "flex: 1 ერთ ელემენტზე მას აიძულებს, მთელი დარჩენილი სივრცე დაიკავოს — ასე ადვილად აკეთებ „მენიუ მარცხნივ, შიგთავსი გაწელილი“ განლაგებას. align-self ერთ კონკრეტულ ელემენტს სხვანაირად ასწორებს, ვიდრე დანარჩენებს. margin-left: auto ერთ ელემენტს მარჯვნივ მიაწებებს.",
    challenge: "ჩართე wrap და მიეცი შუა ელემენტს flex: 1, რომ დარჩენილი ადგილი დაიკავოს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<div class="bar">\n' +
        '  <div class="cell">მარცხენა</div>\n' +
        '  <div class="cell grow">შუა (იწელება)</div>\n' +
        '  <div class="cell">მარჯვენა</div>\n' +
        "</div>";

      const pg = CFZ.createStylePlayground(
        html,
        ".bar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.cell {\n  padding: 12px;\n  background: #e2e8f0;\n  border-radius: 8px;\n}\n\n.grow {\n  flex: 1;\n}",
        function (doc, win) {
          const bar = doc.querySelector(".bar");
          const grow = doc.querySelector(".grow");
          if (!bar || !grow) return;
          const bst = win.getComputedStyle(bar);
          const gst = win.getComputedStyle(grow);
          const wrap = bst.flexWrap === "wrap";
          const grows = parseFloat(gst.flexGrow) >= 1;
          const ok = bst.display === "flex" && wrap && grows;
          const missing = [];
          if (bst.display !== "flex") missing.push("display: flex");
          if (!wrap) missing.push("flex-wrap: wrap");
          if (!grows) missing.push("შუა ელემენტს flex: 1");
          setChallengeResult(ok, ok ? "შესრულებულია: შუა ელემენტი იწელება." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "flex: 1 რას ნიშნავს" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "flex: 1 არის შემოკლება flex-grow: 1; flex-shrink: 1; flex-basis: 0%. სწორედ basis: 0 იწვევს იმას, რომ ელემენტები თანაბრად იყოფენ სივრცეს, მიუხედავად შიგთავსის სიგრძისა. სცადე: მიეცი flex: 1 სამივე უჯრას.",
          }),
        ])
      );
    },
  });

  // ---------- 20 ----------
  lessons.push({
    id: "css-grid-basics",
    title: "Grid — საფუძვლები",
    shortTitle: "Grid 1",
    theory: "display: grid ორგანზომილებიან ბადეს ქმნის — ერთდროულად სვეტებსა და სტრიქონებს. grid-template-columns განსაზღვრავს სვეტებს: მაგ. 200px 1fr 1fr. ერთეული fr ნიშნავს „დარჩენილი სივრცის წილს“. gap უჯრებს შორის დაშორებაა.",
    analogy: "Flexbox — ერთი თარო (ერთი ხაზი); Grid — მთელი კარადა, სადაც ერთდროულად თაროებიც არის და სექციებიც.",
    physicalLabel: "fr და repeat",
    physical: "1fr 1fr 1fr იგივეა, რაც repeat(3, 1fr). 200px 1fr — პირველი სვეტი ფიქსირებულია, მეორე დანარჩენს იკავებს. grid-template-rows იგივეა სტრიქონებისთვის, მაგრამ ხშირად საჭირო არაა — სტრიქონები ავტომატურად ჩნდება.",
    challenge: "ააწყვე სამსვეტიანი ბადე repeat()-ითა და gap-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<div class="grid">\n' +
        '  <div class="cell">1</div>\n  <div class="cell">2</div>\n  <div class="cell">3</div>\n' +
        '  <div class="cell">4</div>\n  <div class="cell">5</div>\n  <div class="cell">6</div>\n' +
        "</div>";

      const pg = CFZ.createStylePlayground(
        html,
        ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n\n.cell {\n  padding: 18px;\n  background: #dbeafe;\n  border-radius: 8px;\n  text-align: center;\n}",
        function (doc, win) {
          const g = doc.querySelector(".grid");
          if (!g) return;
          const st = win.getComputedStyle(g);
          const isGrid = st.display === "grid";
          const cols = (st.gridTemplateColumns || "").split(/\s+/).filter(Boolean).length;
          const hasGap = parseFloat(st.columnGap || st.gap) > 0;
          const ok = isGrid && cols === 3 && hasGap;
          const missing = [];
          if (!isGrid) missing.push("display: grid");
          if (cols !== 3) missing.push("სამი სვეტი (ახლა " + cols + ")");
          if (!hasGap) missing.push("gap");
          setChallengeResult(ok, ok ? "შესრულებულია: სამსვეტიანი ბადე აეწყო." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "Grid თუ Flexbox" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ერთი მიმართულება (რიგი ან სვეტი) — Flexbox. ორივე ერთდროულად (მთელი გვერდის კარკასი, ბარათების ბადე) — Grid. ისინი კონკურენტები არ არიან: ხშირად გვერდის კარკასი Grid-ია, შიგნით კომპონენტები კი Flexbox.",
          }),
        ])
      );
    },
  });

  // ---------- 21 ----------
  lessons.push({
    id: "css-grid-advanced",
    title: "Grid — გაწელვა და ავტომატური ბადე",
    shortTitle: "Grid 2",
    theory: "ელემენტს შეუძლია რამდენიმე უჯრა დაიკავოს: grid-column: span 2. ავტომატურად მორგებადი ბადე კი ერთი ხაზით კეთდება: repeat(auto-fit, minmax(200px, 1fr)) — სვეტების რაოდენობა თავად მოერგება ეკრანს.",
    analogy: "ჟურნალის დაკაბადონება: ერთი სტატია ორ სვეტს იკავებს, დანარჩენები კი ავტომატურად ეწყობა დარჩენილ ადგილას.",
    physicalLabel: "ყველაზე სასარგებლო ხაზი CSS-ში",
    physical: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) ქმნის რესპონსიულ ბადეს media query-ის გარეშე: თითო სვეტი მინიმუმ 200px-ია, თუ ადგილი აღარაა — რაოდენობა თავად მცირდება. auto-fill მსგავსია, ოღონდ ცარიელ სვეტებს ინარჩუნებს.",
    challenge: "გააკეთე ავტომატურად მორგებადი ბადე minmax()-ით და პირველ უჯრას მიეცი span 2.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<div class="grid">\n' +
        '  <div class="cell wide">ფართო</div>\n' +
        '  <div class="cell">ბარათი</div>\n  <div class="cell">ბარათი</div>\n  <div class="cell">ბარათი</div>\n' +
        "</div>";

      const pg = CFZ.createStylePlayground(
        html,
        ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 12px;\n}\n\n.cell {\n  padding: 18px;\n  background: #e2e8f0;\n  border-radius: 8px;\n}\n\n.wide {\n  grid-column: span 2;\n  background: #bfdbfe;\n}",
        function (doc, win, css) {
          const g = doc.querySelector(".grid");
          const wide = doc.querySelector(".wide");
          if (!g || !wide) return;
          const isGrid = win.getComputedStyle(g).display === "grid";
          const auto = /minmax\(/.test(css) && /auto-fit|auto-fill/.test(css);
          const spans = /span\s+2/.test(css);
          const ok = isGrid && auto && spans;
          const missing = [];
          if (!isGrid) missing.push("display: grid");
          if (!auto) missing.push("repeat(auto-fit, minmax(...))");
          if (!spans) missing.push("grid-column: span 2");
          setChallengeResult(ok, ok ? "შესრულებულია: ბადე ავტომატურად ერგება." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "გადახედვის პანელი ვიწროა — შეამცირე minmax-ის პირველი რიცხვი 140px-დან 90px-მდე და ნახე, როგორ ემატება სვეტები. სწორედ ასე მუშაობს რესპონსიული ბადე ერთი media query-ის გარეშე.",
          }),
        ])
      );
    },
  });
})();
