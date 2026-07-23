(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  // ---------- 1. id და class ----------
  lessons.push({
    id: "html-id-class",
    title: "id, class და კავშირი CSS/JS-თან",
    shortTitle: "id და class",
    theory: "id ელემენტის უნიკალური სახელია — ერთ გვერდზე ერთხელ. class კი ჯგუფის სახელია და რამდენ ელემენტსაც გინდა, იმდენს მიაწერ. ერთ ელემენტს რამდენიმე კლასიც შეიძლება ჰქონდეს, ერთმანეთისგან ჰარით გამოყოფილი.",
    analogy: "id — პირადი ნომერი (მხოლოდ შენი). class — პროფესია: „მასწავლებელი“ ბევრს აქვს და ყველას ერთნაირად ეხება.",
    physicalLabel: "რისთვის გჭირდება",
    physical: "ეს ორი ატრიბუტი არის „სახელური“, რომლითაც CSS და JavaScript ელემენტს იჭერს: CSS-ში #saxeli id-ს ირჩევს, .saxeli კლასს; JavaScript-ში document.getElementById და querySelector. id ღუზისთვისაც გამოიყენება (<a href=\"#saxeli\">) და <label for=\"…\">-ისთვისაც.",
    challenge: "შექმენი ერთი ელემენტი id-ით და ორი ელემენტი, რომლებსაც ერთი და იგივე class აქვთ.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        '<h1 id="mtavari">მთავარი სათაური</h1>\n\n' +
        '<p class="shenishvna">პირველი შენიშვნა.</p>\n' +
        '<p class="shenishvna">მეორე შენიშვნა.</p>';

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const withId = doc.querySelector("[id]");
        const classCount = {};
        Array.prototype.slice.call(doc.querySelectorAll("[class]")).forEach(function (node) {
          node.getAttribute("class").split(/\s+/).forEach(function (c) {
            if (c) classCount[c] = (classCount[c] || 0) + 1;
          });
        });
        const shared = Object.keys(classCount).some(function (c) {
          return classCount[c] >= 2;
        });
        const ok = Boolean(withId && shared);
        const missing = [];
        if (!withId) missing.push("ელემენტი id-ით");
        if (!shared) missing.push("ორი ელემენტი ერთი და იმავე class-ით");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: id უნიკალურია, class კი გაზიარებული." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სახელების შერჩევა" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "დაარქვი დანიშნულების მიხედვით, არა გარეგნობის: class=\"gafrtxileba\" სჯობს class=\"witeli\"-ს — ფერი ხვალ შეიძლება შეიცვალოს, დანიშნულება კი არა. სახელში ჰარი არ შეიძლება; სიტყვები დეფისით გამოყავი: main-menu.",
          }),
        ])
      );
    },
  });

  // ---------- 2. სპეციალური სიმბოლოები ----------
  lessons.push({
    id: "html-entities",
    title: "სპეციალური სიმბოლოები",
    shortTitle: "სიმბოლოები",
    theory: "ზოგი სიმბოლო HTML-ს თავად ეკუთვნის: < ტეგს იწყებს, & კი სპეციალურ ჩანაწერს. თუ მათ ეკრანზე ტექსტად გინდა, ჩანაცვლებით ჩაწერე: &lt; არის <, &gt; არის >, &amp; არის &, &quot; არის \".",
    analogy: "როგორც ბრჭყალები ციტატის შიგნით — უნდა „გაექცე“ სიმბოლოს, რომ პროგრამამ ტექსტად აღიქვას და არა ბრძანებად.",
    physicalLabel: "ხშირად საჭირო",
    physical: "&nbsp; — ჰარი, რომელზეც ხაზი არ გადაიტანება (გამოსადეგია „10 კგ“-ში). &copy; = ©, &mdash; = —, &hellip; = …, &times; = ×. თანამედროვე UTF-8 გვერდზე ემოჯისა და ქართულისთვის ჩანაცვლება არ სჭირდება — მხოლოდ < > & \" -ისთვის.",
    challenge: "აჩვენე ეკრანზე ტექსტი <p> (როგორც ტექსტი, არა ტეგი) და გამოიყენე &copy;.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<p>აბზაცის ტეგი იწერება ასე: &lt;p&gt;</p>\n" +
        "<p>&copy; 2026 ჩემი საიტი &mdash; ყველა უფლება დაცულია.</p>";

      const pg = CFZ.createCodePlayground(start, function (doc, code) {
        const hasEscaped = /&lt;/.test(code) && /&gt;/.test(code);
        const hasCopy = /&copy;/.test(code) || /©/.test(code);
        const rendered = doc.body ? doc.body.textContent : "";
        const showsTag = rendered.indexOf("<p>") !== -1;
        const ok = Boolean(hasEscaped && hasCopy && showsTag);
        const missing = [];
        if (!hasEscaped) missing.push("&lt; და &gt;");
        if (!showsTag) missing.push("ეკრანზე ტექსტი <p> უნდა ჩანდეს");
        if (!hasCopy) missing.push("&copy;");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: სიმბოლოები სწორად ჩაანაცვლე." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "წაშალე ჩანაცვლება და ჩაწერე პირდაპირ <p> — ბრაუზერი მას ტეგად აღიქვამს და ეკრანზე აღარაფერი გამოჩნდება. ეს ხშირი შეცდომაა, როცა კოდის მაგალითს გვერდზე აჩვენებ.",
          }),
        ])
      );
    },
  });

  // ---------- 3. ხელმისაწვდომობა ----------
  lessons.push({
    id: "html-accessibility",
    title: "ხელმისაწვდომობა (a11y)",
    shortTitle: "ხელმისაწვდომობა",
    theory: "გვერდი ყველასთვის უნდა მუშაობდეს — მათ შორის მათთვის, ვინც ეკრანის წამკითხველს იყენებს ან მხოლოდ კლავიატურით ნავიგირებს. კარგი ამბავი: სწორად დაწერილი HTML თითქმის ყველაფერს თავად აგვარებს.",
    analogy: "პანდუსი შენობასთან: ის არავის უშლის ხელს, მაგრამ ზოგისთვის შესვლის ერთადერთი გზაა.",
    physicalLabel: "ხუთი წესი",
    physical: "1) ყველა სურათს alt. 2) ყველა ველს <label>. 3) სათაურები რიგზე, დონის გამოტოვების გარეშე. 4) <html lang=\"ka\"> — რომ წამკითხველმა სწორი ენით წაიკითხოს. 5) ღილაკი ღილაკი იყოს (<button>), არა დაწკაპუნებადი <div> — მაშინ კლავიატურაც იმუშავებს. თუ ღილაკზე მხოლოდ იკონაა, დაამატე aria-label.",
    challenge: "ააწყვე ხელმისაწვდომი ფრაგმენტი: სურათი alt-ით, ველი label-ით და იკონა-ღილაკი aria-label-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        '<img src="logo.png" alt="კომპანიის ლოგო" width="80">\n\n' +
        '<label for="dzieba">ძებნა</label>\n' +
        '<input type="search" id="dzieba" name="q">\n\n' +
        '<button aria-label="ძებნის დაწყება">🔍</button>';

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const img = doc.querySelector("img");
        const imgOk = img && img.getAttribute("alt") !== null;
        const input = doc.querySelector("input[id]");
        const labelOk = input && doc.querySelector('label[for="' + input.id + '"]');
        const btn = doc.querySelector("button[aria-label]");
        const ok = Boolean(imgOk && labelOk && btn);
        const missing = [];
        if (!imgOk) missing.push("სურათი alt-ით");
        if (!labelOk) missing.push("ველი დაკავშირებული label-ით");
        if (!btn) missing.push("ღილაკი aria-label-ით");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: ფრაგმენტი ხელმისაწვდომია." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "შეამოწმე კლავიატურით" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "უმარტივესი ტესტი: მოაშორე ხელი მაუსს და Tab-ით გაიარე გვერდი. თუ ყველა ღილაკსა და ბმულს მიაღწევ და ხედავ, სად ხარ — გვერდი კარგ ფორმაშია. თუ სადმე „ჩაიკარგე“, იქ პრობლემაა.",
          }),
        ])
      );
    },
  });

  // ---------- 4. meta და SEO ----------
  lessons.push({
    id: "html-meta-seo",
    title: "meta ტეგები, SEO და გაზიარება",
    shortTitle: "meta და SEO",
    theory: "<head>-ში მოთავსებული meta ტეგები ეკრანზე არ ჩანს, მაგრამ განსაზღვრავს, როგორ გამოჩნდება გვერდი Google-ის შედეგებში, სოციალურ ქსელში გაზიარებისას და მობილურ ეკრანზე.",
    analogy: "წიგნის ყდა და ანოტაცია: თავად ტექსტს არ ცვლის, მაგრამ სწორედ ისინი წყვეტენ, აიღებს თუ არა ვინმე წიგნს თაროდან.",
    physicalLabel: "აუცილებელი მინიმუმი",
    physical: "<title> — ჩანართისა და საძიებო შედეგის სათაური (50–60 სიმბოლო). <meta name=\"description\"> — მოკლე აღწერა შედეგებში (~150 სიმბოლო). <meta name=\"viewport\"> — მობილურზე სწორი მასშტაბი. <html lang=\"ka\"> — ენა. გაზიარებისთვის: og:title, og:description, og:image.",
    challenge: "ააწყვე head: title, meta description, viewport და ერთი og: ტეგი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<!DOCTYPE html>\n" +
        '<html lang="ka">\n' +
        "<head>\n" +
        '  <meta charset="utf-8">\n' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        "  <title>TSRE — ისწავლე ვები ნულიდან</title>\n" +
        '  <meta name="description" content="ინტერაქტიული კურსი: HTML, CSS და JavaScript ქართულად.">\n' +
        '  <meta property="og:title" content="TSRE — ისწავლე ვები ნულიდან">\n' +
        "</head>\n" +
        "<body>\n" +
        "  <h1>მთავარი გვერდი</h1>\n" +
        "</body>\n" +
        "</html>";

      const pg = CFZ.createCodePlayground(
        start,
        function (doc) {
          const title = doc.querySelector("head title");
          const desc = doc.querySelector('meta[name="description"][content]');
          const viewport = doc.querySelector('meta[name="viewport"]');
          const og = doc.querySelector('meta[property^="og:"]');
          const ok = Boolean(title && desc && viewport && og);
          const missing = [];
          if (!title) missing.push("title");
          if (!desc) missing.push("meta description");
          if (!viewport) missing.push("meta viewport");
          if (!og) missing.push("og: ტეგი");
          setChallengeResult(
            ok,
            ok ? "შესრულებულია: head სრულად აღჭურვილია." : "აკლია: " + missing.join(", ") + "."
          );
        },
        { fullDocument: true }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რატომ ჩანს გადახედვა თითქმის ცარიელი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "იმიტომ, რომ head-ის შიგთავსი ეკრანზე არ იხატება — მისი მკითხველი ბრაუზერი, საძიებო სისტემა და სოციალური ქსელია. სწორედ ამიტომ ადვილი დასავიწყებელია და ამიტომვე ბევრ საიტს გაზიარებისას მახინჯი ბმული აქვს.",
          }),
        ])
      );
    },
  });

  // ---------- 5. ვალიდაცია და გამართვა ----------
  lessons.push({
    id: "html-debugging",
    title: "ვალიდაცია და გამართვა",
    shortTitle: "გამართვა",
    theory: "ბრაუზერი შემცდარ HTML-ს არ გაჩვენებს შეცდომას — ის ცდილობს გამოასწოროს და ხატავს რაღაცას. სწორედ ამიტომ სჭირდება ვალიდატორი: W3C-ის შემმოწმებელი კოდს კითხულობს და ზუსტად გეუბნება, სად რა შეცდომაა.",
    analogy: "მართლწერის შემმოწმებელი: ტექსტი მის გარეშეც იკითხება, მაგრამ შეცდომებს ვერ ამჩნევ, სანამ არ გაატარებ.",
    physicalLabel: "ხშირი შეცდომები",
    physical: "დაუხურავი ტეგი; არასწორი ჩალაგება (<p><div></p></div>); ერთი id ორჯერ; სურათი alt-ის გარეშე; <li> სიის გარეთ; ბრჭყალების დავიწყება ატრიბუტში. DevTools-ის Elements ჩანართში ხედავ, როგორ გაიგო ბრაუზერმა შენი კოდი — ხშირად სწორედ იქ ჩანს, სად „გადაიხარა“ სტრუქტურა.",
    challenge: "გაასწორე ქვემოთ მოცემული შემცდარი კოდი: დახურე ტეგები, სურათს დაამატე alt და <b>-ის ნაცვლად გამოიყენე <strong>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const broken =
        "<h1>ჩემი გვერდი\n" +
        "<p>ეს აბზაცი <b>დაუხურავია</b>\n" +
        '<img src="foto.jpg">\n' +
        "<ul>\n" +
        "  <li>პირველი\n" +
        "  <li>მეორე\n" +
        "</ul>";

      const pg = CFZ.createCodePlayground(broken, function (doc, code) {
        const h1 = doc.querySelector("h1");
        const img = doc.querySelector("img");
        const altOk = img && img.getAttribute("alt") !== null;
        const noB = !/<b>|<i>/i.test(code);
        const hasStrong = Boolean(doc.querySelector("strong"));
        const closedH1 = /<\/h1>/i.test(code);
        const closedP = /<\/p>/i.test(code);
        const closedLi = (code.match(/<\/li>/gi) || []).length >= 2;
        const ok = Boolean(h1 && altOk && noB && hasStrong && closedH1 && closedP && closedLi);

        const missing = [];
        if (!closedH1) missing.push("დახურე </h1>");
        if (!closedP) missing.push("დახურე </p>");
        if (!closedLi) missing.push("დახურე ორივე </li>");
        if (!altOk) missing.push("სურათს alt");
        if (!noB || !hasStrong) missing.push("<b> შეცვალე <strong>-ით");

        setChallengeResult(
          ok,
          ok ? "შესრულებულია: კოდი გაასწორე — სუფთა და ვალიდურია." : "დარჩა: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "შეამოწმე ნამდვილ ვალიდატორში" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "როცა გვერდს დაწერ, გაატარე validator.w3.org-ზე — ჩასვამ კოდს ან მისამართს და მიიღებ შეცდომების სიას ხაზების ნომრებით. ეს ერთი ჩვევა კოდის ხარისხს დრამატულად აუმჯობესებს.",
          }),
        ])
      );
    },
  });
})();
