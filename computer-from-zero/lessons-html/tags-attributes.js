(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-tags",
    title: "ტეგები, ატრიბუტები, კომენტარები",
    shortTitle: "ტეგი და ატრიბუტი",
    theory: "ტეგი კუთხოვან ფრჩხილებში იწერება: <p>. ელემენტები ერთმანეთში ილაგება (ჩალაგება/nesting) და აუცილებლად სწორად უნდა დაიხუროს — რომელიც ბოლოს გაიხსნა, ის პირველი იხურება. ატრიბუტი გამხსნელ ტეგში წერია: სახელი=\"მნიშვნელობა\".",
    analogy: "ჩალაგება ყუთებივითაა: პატარა ყუთი დიდის შიგნით სრულად უნდა მოთავსდეს. ვერ დახურავ დიდს, სანამ პატარა ღიაა.",
    physicalLabel: "წესები",
    physical: "სწორია <p>ტექსტი <strong>მუქი</strong></p>, არასწორია <p>ტექსტი <strong>მუქი</p></strong>. ატრიბუტის მნიშვნელობა ბრჭყალებში ჩასვი. კომენტარი <!-- ასე --> ეკრანზე არ ჩანს, მაგრამ კოდში რჩება — შენიშვნებისთვისაა.",
    challenge: "დაწერე სია, რომლის ერთ პუნქტშიც <strong> იქნება ჩალაგებული, დაამატე title ატრიბუტი და ერთი კომენტარი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<!-- ეს კომენტარია — ეკრანზე არ ჩანს -->\n" +
        '<ul title="ჩემი სია">\n' +
        "  <li>ჩვეულებრივი პუნქტი</li>\n" +
        "  <li>პუნქტი <strong>მუქი</strong> სიტყვით</li>\n" +
        "</ul>";

      const pg = CFZ.createCodePlayground(start, function (doc, code) {
        const nested = doc.querySelector("li strong");
        const titled = doc.querySelector("[title]");
        const comment = /<!--[\s\S]*?-->/.test(code);
        const ok = Boolean(nested && titled && comment);

        const missing = [];
        if (!nested) missing.push("<strong> ჩალაგებული <li>-ში");
        if (!titled) missing.push("title ატრიბუტი");
        if (!comment) missing.push("კომენტარი <!-- -->");

        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: ჩალაგება, ატრიბუტი და კომენტარი გაქვს."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "გლობალური ატრიბუტები" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ზოგი ატრიბუტი ყველა ელემენტს აქვს: id (უნიკალური სახელი), class (ჯგუფი), title (მინიშნება მაუსის მიტანისას), lang (ენა), hidden (დამალვა). სცადე: მიიტანე მაუსი სიასთან და ნახე title-ის მინიშნება.",
          }),
        ])
      );
    },
  });
})();
