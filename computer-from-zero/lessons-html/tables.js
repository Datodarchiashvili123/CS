(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-tables",
    title: "ცხრილები",
    shortTitle: "ცხრილი",
    theory: "ცხრილი მონაცემებისთვისაა — არა გვერდის განლაგებისთვის. <table> მთელი ცხრილია, <tr> ერთი სტრიქონი, <th> სათაურის უჯრა, <td> კი ჩვეულებრივი უჯრა. სტრიქონები ერთმანეთის ქვემოთ დგება, უჯრები — გვერდიგვერდ.",
    analogy: "Excel-ის ფურცელი: სტრიქონები და სვეტები. პირველი სტრიქონი ჩვეულებრივ სვეტების სახელებია.",
    physicalLabel: "სტრუქტურა",
    physical: "<thead> და <tbody> სათაურს შიგთავსისგან ჰყოფს. <th> ავტომატურად გამუქებული და ცენტრშია — და, რაც მთავარია, ეკრანის წამკითხველს ეუბნება, რომ ეს სვეტის სახელია. colspan და rowspan უჯრებს აერთიანებს.",
    challenge: "ააწყვე ცხრილი 2 სვეტით: სათაურის სტრიქონი <th>-ებით და ქვემოთ 2 სტრიქონი მონაცემებით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<table>\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th>ენა</th>\n" +
        "      <th>დანიშნულება</th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr>\n" +
        "      <td>HTML</td>\n" +
        "      <td>სტრუქტურა</td>\n" +
        "    </tr>\n" +
        "    <tr>\n" +
        "      <td>CSS</td>\n" +
        "      <td>გარეგნობა</td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const table = doc.querySelector("table");
        const ths = table ? table.querySelectorAll("th").length : 0;
        const rows = table ? table.querySelectorAll("tr").length : 0;
        const ok = Boolean(table && ths >= 2 && rows >= 3);

        const missing = [];
        if (!table) missing.push("table");
        else {
          if (ths < 2) missing.push("მინიმუმ 2 th (ახლა " + ths + ")");
          if (rows < 3) missing.push("სულ მინიმუმ 3 tr (ახლა " + rows + ")");
        }

        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: ცხრილს სათაურიც აქვს და მონაცემებიც."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "როდის არ გამოიყენო ცხრილი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ადრე გვერდის განლაგებას ცხრილებით აკეთებდნენ — დღეს ეს შეცდომაა. განლაგებისთვის CSS არსებობს (Grid და Flexbox). ცხრილი მხოლოდ მაშინ, როცა მონაცემები მართლა ცხრილურია: ფასები, განრიგი, სტატისტიკა.",
          }),
        ])
      );
    },
  });
})();
