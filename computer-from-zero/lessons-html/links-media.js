(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  // ---------- 1. ბმულები ----------
  lessons.push({
    id: "html-links",
    title: "ბმულები",
    shortTitle: "ბმულები",
    theory: "ბმული ვებს ვებად აქცევს: <a href=\"მისამართი\">ტექსტი</a>. href-ს რამდენიმე სახე აქვს: სრული URL (https://example.com), ფარდობითი მისამართი იმავე საიტზე (about.html, ../index.html), ღუზა იმავე გვერდზე (#კონტაქტი), ელფოსტა (mailto:), ტელეფონი (tel:).",
    analogy: "სრული URL — სრული საფოსტო მისამართი სხვა ქალაქში; ფარდობითი — „მეზობელი კარი“; ღუზა — მითითება იმავე ოთახის კუთხეზე.",
    physicalLabel: "წესები",
    physical: "target=\"_blank\" ახალ ჩანართში ხსნის — თან დაწერე rel=\"noopener\" უსაფრთხოებისთვის. ღუზისთვის სამიზნე ელემენტს id უნდა ჰქონდეს: <a href=\"#kontakti\"> → <section id=\"kontakti\">. download ატრიბუტი ფაილს ჩამოტვირთვაზე გადაამისამართებს.",
    challenge: "დაამატე სამი სხვადასხვა ბმული: გარე (ახალი ჩანართით), ღუზა იმავე გვერდზე და mailto.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<p>\n" +
        '  <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN (ახალი ჩანართი)</a> ·\n' +
        '  <a href="#kontakti">კონტაქტზე გადასვლა</a> ·\n' +
        '  <a href="mailto:info@tsre.in">მოგვწერე</a>\n' +
        "</p>\n\n" +
        '<section id="kontakti">\n' +
        "  <h2>კონტაქტი</h2>\n" +
        "  <p>აქ არის ღუზის სამიზნე.</p>\n" +
        "</section>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const ext = doc.querySelector('a[href^="http"][target="_blank"]');
        const anchorLink = doc.querySelector('a[href^="#"]');
        const mail = doc.querySelector('a[href^="mailto:"]');
        let anchorOk = false;
        if (anchorLink) {
          const id = anchorLink.getAttribute("href").slice(1);
          anchorOk = Boolean(id && doc.getElementById(id));
        }
        const ok = Boolean(ext && anchorOk && mail);
        const missing = [];
        if (!ext) missing.push('გარე ბმული target="_blank"-ით');
        if (!anchorLink) missing.push("ღუზა #-ით");
        else if (!anchorOk) missing.push("ღუზის სამიზნე id ვერ მოიძებნა");
        if (!mail) missing.push("mailto: ბმული");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: სამივე ტიპის ბმული გაქვს." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ფარდობითი მისამართები" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "page.html — იმავე საქაღალდეში; images/foto.jpg — ქვესაქაღალდეში; ../index.html — ერთი დონით ზემოთ; /about.html — საიტის ფესვიდან. ფარდობითი მისამართი სჯობს, რადგან საიტის გადატანისას არ ტყდება.",
          }),
        ])
      );
    },
  });

  // ---------- 2. სურათები ----------
  lessons.push({
    id: "html-images",
    title: "სურათები",
    shortTitle: "სურათები",
    theory: "<img src=\"ფაილი\" alt=\"აღწერა\"> — სურათი. src მისამართია, alt კი სიტყვიერი აღწერა. სურათს დამხურავი ტეგი არ აქვს. თუ სურათს წარწერა სჭირდება, შეფუთე <figure>-ში და წარწერა <figcaption>-ში ჩაწერე.",
    analogy: "alt არის სურათის აღწერა ტელეფონში მეგობრისთვის: „ფოტოზე ორი ტრანზისტორია მაგიდაზე“. თუ სურათი არ ჩაიტვირთა ან მომხმარებელი ვერ ხედავს — მხოლოდ ეს რჩება.",
    physicalLabel: "პრაქტიკული წესები",
    physical: "დაწერე width და height — მაშინ ბრაუზერი ადგილს წინასწარ დაიტოვებს და ჩატვირთვისას გვერდი არ „ახტება“. loading=\"lazy\" სურათს მხოლოდ მაშინ ტვირთავს, როცა მასთან მიაღწევ. ფორმატები: JPG — ფოტო, PNG — გამჭვირვალობა, SVG — ლოგო/იკონა, WebP — თანამედროვე და მსუბუქი.",
    challenge: "ჩასვი სურათი <figure>-ში: <img> alt-ითა და loading=\"lazy\"-ით, ქვემოთ კი <figcaption>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<figure>\n" +
        '  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/160px-HTML5_logo_and_wordmark.svg.png"\n' +
        '       alt="HTML5-ის ოფიციალური ლოგო"\n' +
        '       width="160" height="160" loading="lazy">\n' +
        "  <figcaption>HTML5-ის ლოგო</figcaption>\n" +
        "</figure>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const fig = doc.querySelector("figure");
        const img = doc.querySelector("figure img[src]");
        const alt = img && img.getAttribute("alt");
        const lazy = img && img.getAttribute("loading") === "lazy";
        const cap = doc.querySelector("figure figcaption");
        const ok = Boolean(fig && img && alt && lazy && cap);
        const missing = [];
        if (!fig) missing.push("figure");
        if (!img) missing.push("img figure-ის შიგნით");
        else {
          if (!alt) missing.push("alt აღწერა");
          if (!lazy) missing.push('loading="lazy"');
        }
        if (!cap) missing.push("figcaption");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: სურათი წარწერითა და სწორი ატრიბუტებით." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როგორი alt დავწერო" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "აღწერე შინაარსი, არა ფაილი: alt=\"წითელი ველოსიპედი ხიდზე\" და არა alt=\"IMG_1234.jpg\". არ დაიწყო „სურათი…“-თი — წამკითხველი თავად ამბობს, რომ ეს სურათია. თუ სურათი წმინდა დეკორატიულია, დატოვე ცარიელი: alt=\"\".",
          }),
        ])
      );
    },
  });

  // ---------- 3. მედია ----------
  lessons.push({
    id: "html-media",
    title: "ვიდეო, აუდიო და ჩაშენება",
    shortTitle: "მედია",
    theory: "<video> და <audio> მედიას პირდაპირ გვერდზე ატარებს. controls ატრიბუტის გარეშე დამკვრელი არ გამოჩნდება. <iframe> კი სხვა გვერდს ჩასვამს შენს გვერდში — ასე ჩნდება YouTube-ის ვიდეო ან რუკა.",
    analogy: "video/audio — შენი საკუთარი დამკვრელი; iframe — ფანჯარა, რომელშიც სხვისი გვერდი ჩანს.",
    physicalLabel: "წესები",
    physical: "<video controls poster=\"…\"> — poster არის სურათი დაკვრამდე. autoplay მხოლოდ muted-თან ერთად მუშაობს (ბრაუზერები ხმაურიან ავტოდაკვრას ბლოკავენ). <iframe>-ს აუცილებლად მიაწერე title — ეკრანის წამკითხველი ასე იგებს, რა არის ფანჯარაში.",
    challenge: "დაამატე <video> controls-ით და ერთი <iframe> title ატრიბუტით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<video controls width=\"320\" poster=\"\">\n" +
        '  <source src="movie.mp4" type="video/mp4">\n' +
        "  შენი ბრაუზერი ვიდეოს ვერ უჭერს მხარს.\n" +
        "</video>\n\n" +
        "<audio controls>\n" +
        '  <source src="sound.mp3" type="audio/mpeg">\n' +
        "</audio>\n\n" +
        '<iframe src="about:blank" title="ჩაშენებული გვერდი" width="300" height="150"></iframe>';

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const video = doc.querySelector("video[controls]");
        const frame = doc.querySelector("iframe[title]");
        const ok = Boolean(video && frame);
        const missing = [];
        if (!video) missing.push("video controls-ით");
        if (!frame) missing.push("iframe title-ით");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: მედიაც გაქვს და ჩაშენებაც." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რატომ არ ჩანს ვიდეო აქ" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "გადახედვის ფანჯარა უსაფრთხოების მიზნით იზოლირებულია და გარე ფაილებს არ ტვირთავს — ამიტომ დამკვრელი ცარიელია. კოდის სტრუქტურა კი სწორია და ნამდვილ გვერდზე იმუშავებს. სცადე: მოხსენი controls და ნახე, როგორ ქრება დამკვრელი.",
          }),
        ])
      );
    },
  });
})();
