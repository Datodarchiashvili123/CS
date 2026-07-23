(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);
  const CFZget = function () {
    return window.CFZ;
  };

  // ---------- 1. სათაურები და აბზაცები ----------
  lessons.push({
    id: "html-headings",
    title: "სათაურები და აბზაცები",
    shortTitle: "სათაურები",
    theory: "სათაურები <h1>-დან <h6>-მდე გვერდის იერარქიას ქმნიან: <h1> მთავარი სათაურია (ჩვეულებრივ ერთი გვერდზე), <h2> ქვეთავი, <h3> — ქვეთავის ქვეთავი. <p> აბზაცია. ეს არ არის ზომის, არამედ სტრუქტურის საკითხი.",
    analogy: "წიგნის სარჩევი: თავი → ქვეთავი → პარაგრაფი. თუ დონეს გამოტოვებ, სარჩევი აირევა.",
    physicalLabel: "წესები",
    physical: "დონე არ გამოტოვო: <h1>-ის შემდეგ <h3>-ზე ნუ გადახვალ. სათაური ზომისთვის არ გამოიყენო — ზომას CSS აწესებს. <br> ხაზს წყვეტს (მისამართში ან ლექსში), <hr> კი თემატურ ზღვარს ავლებს — მაგრამ აბზაცებს შორის დაშორებისთვის ნუ გამოიყენებ <br>-ს.",
    challenge: "ააწყვე იერარქია: ერთი <h1>, ერთი <h2> და მინიმუმ ორი აბზაცი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = CFZget();
      const start =
        "<h1>ვებ-დეველოპმენტი</h1>\n" +
        "<p>ეს გვერდი HTML-ის შესახებაა.</p>\n\n" +
        "<h2>რატომ HTML?</h2>\n" +
        "<p>იმიტომ, რომ ყველა ვებგვერდი მისით იწყება.</p>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const h1 = doc.querySelectorAll("h1").length;
        const h2 = doc.querySelectorAll("h2").length;
        const p = doc.querySelectorAll("p").length;
        const ok = h1 === 1 && h2 >= 1 && p >= 2;
        const notes = [];
        if (h1 !== 1) notes.push("ზუსტად ერთი h1 (ახლა " + h1 + ")");
        if (h2 < 1) notes.push("მინიმუმ ერთი h2");
        if (p < 2) notes.push("მინიმუმ ორი p (ახლა " + p + ")");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: სწორი იერარქია გაქვს." : "საჭიროა: " + notes.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "რატომ აქვს იერარქიას მნიშვნელობა" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ეკრანის წამკითხველის მომხმარებელი ხშირად სათაურებით ნავიგირებს — ერთი ღილაკით გადადის სათაურიდან სათაურზე. თუ დონეები აირია, გვერდის რუკაც აირევა. საძიებო სისტემებიც ასე იგებენ, რაზეა გვერდი.",
          }),
        ])
      );
    },
  });

  // ---------- 2. ტექსტის ფორმატირება ----------
  lessons.push({
    id: "html-formatting",
    title: "ტექსტის ფორმატირება",
    shortTitle: "ფორმატირება",
    theory: "ტექსტის შიგნით მნიშვნელობის მისაცემად: <strong> მნიშვნელოვანია, <em> ხაზგასმულია, <mark> მონიშნულია, <small> წვრილი შენიშვნაა, <del> წაშლილი, <ins> ჩამატებული, <sub>/<sup> ქვედა და ზედა ინდექსი. ციტატისთვის <blockquote> (გრძელი) და <q> (მოკლე), კოდისთვის <code> და <pre>.",
    analogy: "ტექსტის მარკერები: ყვითელი მარკერი (mark), ხაზგასმა (em), გამუქება (strong), გადახაზვა (del). თითოს თავისი აზრი აქვს, არა მხოლოდ ფერი.",
    physicalLabel: "სემანტიკა vs გარეგნობა",
    physical: "<strong> და <b> ერთნაირად გამოიყურება, მაგრამ <strong> მნიშვნელობას ატარებს — ეკრანის წამკითხველი მას ინტონაციით წაიკითხავს. იგივეა <em> და <i>. <code> კოდის ნაწყვეტს აღნიშნავს, <pre> კი ინახავს დაშორებებსა და ხაზის გადატანებს ისე, როგორც დაწერე.",
    challenge: "გამოიყენე ერთ აბზაცში მაინც <strong>, <em> და <mark>, და დაამატე ერთი <code>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = CFZget();
      const start =
        "<p>\n" +
        "  ეს <strong>მნიშვნელოვანია</strong>, ეს <em>ხაზგასმულია</em>,\n" +
        "  ეს კი <mark>მონიშნული</mark>.\n" +
        "</p>\n" +
        "<p>აბზაცის ტეგია <code>&lt;p&gt;</code>.</p>\n" +
        "<blockquote>კარგი კოდი თავად ხსნის თავს.</blockquote>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const need = ["strong", "em", "mark", "code"];
        const missing = need.filter(function (t) {
          return !doc.querySelector(t);
        });
        const ok = missing.length === 0;
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: ოთხივე ტეგი გამოიყენე." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "pre და code ერთად" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "კოდის ბლოკს ჩვეულებრივ ასე წერენ: <pre><code>…</code></pre> — <pre> ინახავს ფორმატს, <code> კი ამბობს, რომ ეს კოდია. სცადე: ჩასვი <pre> ტეგში რამდენიმე ხაზი დაშორებებით და ნახე, რომ შენარჩუნდება.",
          }),
        ])
      );
    },
  });

  // ---------- 3. სიები ----------
  lessons.push({
    id: "html-lists",
    title: "სიები",
    shortTitle: "სიები",
    theory: "სამი სახის სიაა: <ul> უნომრო (თანმიმდევრობა უმნიშვნელოა), <ol> დანომრილი (თანმიმდევრობა მნიშვნელოვანია) და <dl> — განმარტებების სია, სადაც <dt> ტერმინია და <dd> მისი განმარტება. <ul> და <ol> შიგნით მხოლოდ <li> იდგმება.",
    analogy: "ul — საყიდლების სია (რიგს მნიშვნელობა არ აქვს); ol — რეცეპტის ნაბიჯები (რიგი კრიტიკულია); dl — ლექსიკონი: სიტყვა და მისი მნიშვნელობა.",
    physicalLabel: "ჩალაგება",
    physical: "სია სიაში ილაგება, მაგრამ შვილობილი <ul> მშობელი <li>-ის შიგნით უნდა იყოს, არა მის გვერდით. <ol>-ს აქვს სასარგებლო ატრიბუტები: start=\"5\" ნუმერაციას სხვა რიცხვიდან იწყებს, reversed პირიქით ითვლის, type=\"a\" ასოებით ნომრავს.",
    challenge: "ააწყვე <ol>, რომლის ერთ პუნქტშიც ჩალაგებული <ul> იქნება, და დაამატე ერთი <dl> ტერმინითა და განმარტებით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = CFZget();
      const start =
        "<ol>\n" +
        "  <li>მოამზადე გარემო\n" +
        "    <ul>\n" +
        "      <li>რედაქტორი</li>\n" +
        "      <li>ბრაუზერი</li>\n" +
        "    </ul>\n" +
        "  </li>\n" +
        "  <li>დაწერე HTML</li>\n" +
        "</ol>\n\n" +
        "<dl>\n" +
        "  <dt>ტეგი</dt>\n" +
        "  <dd>ელემენტის აღმნიშვნელი კუთხოვან ფრჩხილებში.</dd>\n" +
        "</dl>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const nested = doc.querySelector("ol li ul li");
        const dl = doc.querySelector("dl");
        const dt = doc.querySelector("dl dt");
        const dd = doc.querySelector("dl dd");
        const ok = Boolean(nested && dl && dt && dd);
        const missing = [];
        if (!nested) missing.push("ol > li შიგნით ჩალაგებული ul");
        if (!dl || !dt || !dd) missing.push("dl ერთი dt და dd წყვილით");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: ჩალაგებული სიაც გაქვს და განმარტებების სიაც." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სია ნავიგაციისთვის" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "საიტის მენიუ თითქმის ყოველთვის სიაა: <nav><ul><li><a href=\"…\">…</a></li></ul></nav>. ასე ეკრანის წამკითხველი ამბობს „სია 5 პუნქტით“ და მომხმარებელი მაშინვე იგებს, რამდენი გვერდია მენიუში.",
          }),
        ])
      );
    },
  });
})();
