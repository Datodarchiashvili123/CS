(function () {
  const lessons = window.CssLessons || (window.CssLessons = []);

  // ---------- 1 ----------
  lessons.push({
    id: "css-intro",
    title: "რა არის CSS",
    shortTitle: "რა არის CSS",
    theory: "HTML ამბობს, რა არის ელემენტი; CSS ამბობს, როგორ გამოიყურება ის. წესი სამი ნაწილისგან შედგება: სელექტორი ირჩევს ელემენტს, თვისება ამბობს რას ვცვლით, მნიშვნელობა კი — რაზე. მაგალითად: h1 { color: red; }",
    analogy: "HTML — სახლის კარკასი და ოთახები; CSS — შეღებვა, ავეჯი და განათება. ერთი და იგივე კარკასი სულ სხვანაირად შეიძლება გამოიყურებოდეს.",
    physicalLabel: "სამი გზა მიბმისთვის",
    physical: "1) გარე ფაილი — <link rel=\"stylesheet\" href=\"style.css\"> (საუკეთესო, ერთი ფაილი ბევრ გვერდს ემსახურება). 2) <style> ტეგი head-ში. 3) inline — style=\"…\" თავად ელემენტზე (ყველაზე ცუდი, არ მეორდება). თითქმის ყოველთვის პირველი აირჩიე.",
    challenge: "შეღებე სათაური ლურჯად და აბზაცის ტექსტი გაზარდე 20px-მდე.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = "<h1>გამარჯობა, CSS</h1>\n<p>ეს აბზაცია.</p>";

      const pg = CFZ.createStylePlayground(html, "h1 {\n  color: blue;\n}\n\np {\n  font-size: 20px;\n}", function (doc, win) {
        const h1 = doc.querySelector("h1");
        const p = doc.querySelector("p");
        if (!h1 || !p) return;
        const blue = CFZ.isColorNear(win.getComputedStyle(h1).color, 0, 0, 255, 90);
        const size = parseFloat(win.getComputedStyle(p).fontSize) >= 20;
        const ok = blue && size;
        const missing = [];
        if (!blue) missing.push("სათაური ლურჯი");
        if (!size) missing.push("აბზაცი 20px-ზე დიდი");
        setChallengeResult(ok, ok ? "შესრულებულია: სტილი გამოიყენა." : "აკლია: " + missing.join(", ") + ".");
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "წესის აგებულება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "h1 { color: red; } — „h1“ სელექტორია, ფიგურულ ფრჩხილებში დეკლარაციები წერია, „color“ თვისებაა, „red“ მნიშვნელობა. თითო დეკლარაცია წერტილმძიმით მთავრდება. სცადე: შეცვალე blue → green.",
          }),
        ])
      );
    },
  });

  // ---------- 2 ----------
  lessons.push({
    id: "css-selectors",
    title: "სელექტორები — საფუძვლები",
    shortTitle: "სელექტორები",
    theory: "სელექტორი ირჩევს, რომელ ელემენტებს შეეხოს წესი. ტიპის სელექტორი — p (ყველა აბზაცი). კლასის — .karti (ყველა, ვისაც class=\"karti\" აქვს). id-ის — #mtavari (ერთი კონკრეტული). რამდენიმე სელექტორი მძიმით გაერთიანდება: h1, h2 { … }.",
    analogy: "ტიპი — „ყველა მოსწავლე“; კლასი — „ყველა, ვინც ფეხბურთის სექციაშია“; id — „კონკრეტულად გიორგი“.",
    physicalLabel: "პრაქტიკა",
    physical: "ყოველდღიურ მუშაობაში 90% კლასის სელექტორია. id სტილისთვის იშვიათად გამოიყენება (ძალიან „ძლიერია“ და არ მეორდება). * ყველა ელემენტს ირჩევს — ჩვეულებრივ მხოლოდ საწყისი პარამეტრებისთვის.",
    challenge: "კლასით .highlight შეღებე ფონი ყვითლად, id-ით #title კი ტექსტი წითლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<h1 id="title">სათაური</h1>\n' +
        '<p class="highlight">მონიშნული აბზაცი</p>\n' +
        "<p>ჩვეულებრივი აბზაცი</p>";

      const pg = CFZ.createStylePlayground(html, ".highlight {\n  background: yellow;\n}\n\n#title {\n  color: red;\n}", function (doc, win) {
        const hl = doc.querySelector(".highlight");
        const title = doc.querySelector("#title");
        if (!hl || !title) return;
        const bg = CFZ.isColorNear(win.getComputedStyle(hl).backgroundColor, 255, 255, 0, 70);
        const red = CFZ.isColorNear(win.getComputedStyle(title).color, 255, 0, 0, 90);
        const ok = bg && red;
        const missing = [];
        if (!bg) missing.push(".highlight-ს ყვითელი ფონი");
        if (!red) missing.push("#title-ს წითელი ტექსტი");
        setChallengeResult(ok, ok ? "შესრულებულია: ორივე სელექტორი მუშაობს." : "აკლია: " + missing.join(", ") + ".");
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ატრიბუტის სელექტორი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "შეიძლება ატრიბუტითაც არჩევა: a[target=\"_blank\"] — მხოლოდ ის ბმულები, რომლებიც ახალ ჩანართში იხსნება; input[type=\"email\"] — მხოლოდ ელფოსტის ველი. ეს ძალიან გამოსადეგია ფორმებთან მუშაობისას.",
          }),
        ])
      );
    },
  });

  // ---------- 3 ----------
  lessons.push({
    id: "css-combinators",
    title: "კომბინატორები",
    shortTitle: "კომბინატორები",
    theory: "კომბინატორი ეუბნება CSS-ს, სად ეძებოს ელემენტი სხვასთან მიმართებით. „nav a“ — ყველა ბმული nav-ის შიგნით (ნებისმიერ სიღრმეზე). „nav > a“ — მხოლოდ პირდაპირი შვილი. „h2 + p“ — h2-ის მომდევნო აბზაცი. „h2 ~ p“ — ყველა მომდევნო აბზაცი იმავე დონეზე.",
    analogy: "ოჯახური კავშირები: შთამომავალი (ნებისმიერი სიღრმე), შვილი (პირდაპირი), უახლოესი და ყველა შემდეგი და-ძმა.",
    physicalLabel: "ხრიკი",
    physical: "ჰარი მნიშვნელოვანია: „.karti .title“ (ორი ელემენტი, ერთი მეორეში) სულ სხვაა, ვიდრე „.karti.title“ (ერთი ელემენტი ორივე კლასით). ეს ერთ-ერთი ყველაზე ხშირი შეცდომაა დამწყებებში.",
    challenge: "მხოლოდ სიაში მდებარე ბმულები (ul-ის შიგნით) გახადე მწვანე — გარეთ მყოფი ბმული არ უნდა შეიცვალოს.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<a href="#">გარე ბმული</a>\n' +
        "<ul>\n" +
        '  <li><a href="#">სიის ბმული 1</a></li>\n' +
        '  <li><a href="#">სიის ბმული 2</a></li>\n' +
        "</ul>";

      const pg = CFZ.createStylePlayground(html, "ul a {\n  color: green;\n}", function (doc, win) {
        const inside = doc.querySelector("ul a");
        const outside = doc.querySelector("body > a");
        if (!inside || !outside) return;
        const insideGreen = CFZ.isColorNear(win.getComputedStyle(inside).color, 0, 128, 0, 80);
        const outsideGreen = CFZ.isColorNear(win.getComputedStyle(outside).color, 0, 128, 0, 80);
        const ok = insideGreen && !outsideGreen;
        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: მხოლოდ სიის ბმულები შეიცვალა."
            : !insideGreen
            ? "სიის ბმულები ჯერ არ არის მწვანე."
            : "გარე ბმულიც შეიცვალა — სელექტორი ძალიან ფართოა."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე შეცდომა" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "დაწერე უბრალოდ „a { color: green; }“ და ნახე — გარე ბმულიც გამწვანდება და დავალება ვერ შესრულდება. სწორედ ამიტომ სჭირდება კონტექსტი სელექტორს.",
          }),
        ])
      );
    },
  });

  // ---------- 4 ----------
  lessons.push({
    id: "css-pseudo-classes",
    title: "ფსევდო-კლასები",
    shortTitle: "ფსევდო-კლასები",
    theory: "ფსევდო-კლასა ირჩევს ელემენტს მისი მდგომარეობის ან პოზიციის მიხედვით: :hover (მაუსი მიტანილია), :focus (ფოკუსშია), :first-child / :last-child, :nth-child(2n) (ლუწი), :not(.klasi) (გამონაკლისი).",
    analogy: "„ყველა მოსწავლე, ვინც ახლა ხელს იწევს“ — იგივე ადამიანები, ოღონდ კონკრეტულ მდგომარეობაში.",
    physicalLabel: "აუცილებელი წყვილი",
    physical: ":hover მხოლოდ მაუსით მუშაობს — კლავიატურის მომხმარებლისთვის აუცილებლად დაწერე :focus-იც. ხშირად ორივეს ერთად წერენ: a:hover, a:focus { … }. :nth-child(odd/even) ცხრილის სტრიქონების მონაცვლეობით შეღებვისთვის გამოიყენება.",
    challenge: "სიის ლუწი პუნქტები შეღებე ნაცრისფერი ფონით (:nth-child) და ბმულს :hover-ზე მოაშორე ხაზი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        "<ul>\n  <li>ერთი</li>\n  <li>ორი</li>\n  <li>სამი</li>\n  <li>ოთხი</li>\n</ul>\n" +
        '<a href="#">ბმული</a>';

      const pg = CFZ.createStylePlayground(
        html,
        "li:nth-child(even) {\n  background: #ddd;\n}\n\na:hover {\n  text-decoration: none;\n}",
        function (doc, win, css) {
          const second = doc.querySelectorAll("li")[1];
          if (!second) return;
          const striped = win.getComputedStyle(second).backgroundColor !== "rgba(0, 0, 0, 0)";
          const hasHover = /:hover\s*\{[^}]*text-decoration\s*:\s*none/.test(css);
          const ok = striped && hasHover;
          const missing = [];
          if (!striped) missing.push("ლუწი <li> ფონით");
          if (!hasHover) missing.push("a:hover { text-decoration: none }");
          setChallengeResult(ok, ok ? "შესრულებულია: ორივე ფსევდო-კლასი დაწერე." : "აკლია: " + missing.join(", ") + ".");
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე გადახედვაში" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "მიიტანე მაუსი ბმულთან — ხაზი გაქრება. ეს არის :hover მოქმედებაში. სცადე nth-child(even) → nth-child(odd) და ნახე, როგორ გადაინაცვლებს ზოლები.",
          }),
        ])
      );
    },
  });

  // ---------- 5 ----------
  lessons.push({
    id: "css-pseudo-elements",
    title: "ფსევდო-ელემენტები",
    shortTitle: "ფსევდო-ელემენტები",
    theory: "ფსევდო-ელემენტი ქმნის ან ირჩევს ელემენტის ნაწილს, რომელიც HTML-ში არ წერია: ::before და ::after ამატებს შიგთავსს ელემენტის დასაწყისში ან ბოლოს, ::first-line და ::first-letter კი ტექსტის ნაწილს ირჩევს.",
    analogy: "როგორც ბეჭედი დოკუმენტზე: თავად ტექსტში არ წერია, მაგრამ ყოველთვის ჩნდება გვერდის თავში ან ბოლოს.",
    physicalLabel: "აუცილებელი წესი",
    physical: "::before და ::after არ იმუშავებს content თვისების გარეშე — თუნდაც ცარიელი: content: \"\". ისინი დეკორაციისთვისაა (იკონა, ისარი, ბრჭყალი) — მნიშვნელოვანი ტექსტი აქ არ ჩაწერო, რადგან ის კოპირებისას და ზოგ წამკითხველში იკარგება.",
    challenge: "დაამატე ::before, რომელიც ყოველი .rcheva პუნქტის წინ ჩასვამს ნიშანს „→ “.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html =
        '<p class="rcheva">დაწერე სუფთა კოდი</p>\n' +
        '<p class="rcheva">შეამოწმე ვალიდატორით</p>';

      const pg = CFZ.createStylePlayground(
        html,
        '.rcheva::before {\n  content: "→ ";\n  color: #3867d6;\n}',
        function (doc, win, css) {
          const target = doc.querySelector(".rcheva");
          if (!target) return;
          const before = win.getComputedStyle(target, "::before").content;
          const ok = Boolean(before && before !== "none" && before !== "normal") && /::before/.test(css);
          setChallengeResult(
            ok,
            ok ? "შესრულებულია: ::before-მა შიგთავსი დაამატა." : "საჭიროა .rcheva::before { content: \"→ \"; }"
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სად გამოგადგება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "სავალდებულო ველის ვარსკვლავი (label::after { content: \" *\"; color: red; }), გარე ბმულის ისარი, ციტატის ბრჭყალები, დეკორატიული ხაზი სათაურის ქვეშ — ეს ყველაფერი ::before/::after-ით კეთდება, HTML-ის დამატებითი ტეგების გარეშე.",
          }),
        ])
      );
    },
  });
})();
