(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-recap",
    title: "რეკაპი — ერთი სრული გვერდი",
    shortTitle: "რეკაპი",
    theory: "ყველაფერი, რაც ამ თავში ვისწავლეთ, ერთ გვერდზე: ჩონჩხი, სემანტიკური კარკასი, სათაურები და ტექსტი, სია, ბმული და სურათი, ცხრილი და ფორმა. ეს არის მინიმუმი, რომლითაც უკვე ნამდვილი ვებგვერდი იწერება.",
    analogy: "როგორც სახლის კარკასი: ჯერ ჩონჩხი და ოთახები, მერე ავეჯი. HTML სწორედ კარკასი და ოთახებია — CSS და JavaScript მოგვიანებით მოვა.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "HTML სტრუქტურას აღწერს, CSS — გარეგნობას, JavaScript — ქცევას. სამივე ერთ გვერდზე მუშაობს ერთად. სანამ CSS-ზე გადახვალ, დარწმუნდი რომ სტრუქტურა სწორია — ლამაზი, მაგრამ არასწორად აგებული გვერდი ცუდად მუშაობს.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად — ან შეცვალე ქვემოთ მოცემული სრული გვერდი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const topics = [
        { to: "html-intro", title: "რა არის HTML", desc: "ტეგი, ელემენტი, ატრიბუტი" },
        { to: "html-structure", title: "დოკუმენტის ჩონჩხი", desc: "DOCTYPE, html, head, body" },
        { to: "html-text", title: "ტექსტი და სიები", desc: "h1–h6, p, strong, ul, ol, li" },
        { to: "html-links-images", title: "ბმული და სურათი", desc: "a href, img src, alt" },
        { to: "html-semantics", title: "სემანტიკა", desc: "header, nav, main, article, footer" },
        { to: "html-tables", title: "ცხრილი", desc: "table, tr, th, td" },
        { to: "html-forms", title: "ფორმა", desc: "form, label, input, button" },
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

      const full =
        "<!DOCTYPE html>\n" +
        '<html lang="ka">\n' +
        "<head>\n" +
        '  <meta charset="utf-8">\n' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
        "  <title>ჩემი გვერდი</title>\n" +
        "</head>\n" +
        "<body>\n" +
        "  <header><h1>ჩემი პორტფოლიო</h1></header>\n\n" +
        '  <nav><a href="#about">ჩემ შესახებ</a></nav>\n\n' +
        "  <main>\n" +
        '    <section id="about">\n' +
        "      <h2>ჩემ შესახებ</h2>\n" +
        "      <p>ვსწავლობ <strong>ვებ-დეველოპმენტს</strong>.</p>\n" +
        "      <ul>\n" +
        "        <li>HTML</li>\n" +
        "        <li>CSS</li>\n" +
        "      </ul>\n" +
        "    </section>\n\n" +
        "    <form>\n" +
        '      <label for="mail">დამიკავშირდი</label>\n' +
        '      <input type="email" id="mail" required>\n' +
        "      <button>გაგზავნა</button>\n" +
        "    </form>\n" +
        "  </main>\n\n" +
        "  <footer><p>© 2026</p></footer>\n" +
        "</body>\n" +
        "</html>";

      const pg = CFZ.createCodePlayground(full, null, { fullDocument: true });

      container.append(
        CFZ.el("p", {
          className: "breakdown-note",
          text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი სრული გვერდია — შეცვალე და ნახე შედეგი.",
        }),
        stack,
        CFZ.el("h4", { text: "სრული გვერდი — ითამაშე" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: HTML-ის საფუძვლები გაიარე. 🎉");
    },
  });
})();
