(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-structure",
    title: "დოკუმენტის ჩონჩხი",
    shortTitle: "ჩონჩხი",
    theory: "ყოველი HTML გვერდი ერთი და იმავე ჩონჩხით იწყება: <!DOCTYPE html> ეუბნება ბრაუზერს, რომ ეს HTML5-ია; <html> მთელ დოკუმენტს ფარავს; <head> შეიცავს ინფორმაციას გვერდზე (ეკრანზე არ ჩანს); <body> კი ყველაფერს, რაც მომხმარებელს უჩანს.",
    analogy: "წიგნი: ყდა, სათაური და გამომცემლობის მონაცემები (head) — და თავად ტექსტი, რომელსაც კითხულობ (body).",
    physicalLabel: "სავალდებულო მინიმუმი",
    physical: "<meta charset=\"utf-8\"> — ამის გარეშე ქართული ასოები აირევა. <title> — ჩანართის სახელი და საძიებო შედეგის სათაური. <meta name=\"viewport\"> — მობილურზე სწორი მასშტაბისთვის. ეს სამი თითქმის ყოველთვის გჭირდება.",
    challenge: "ააწყვე სრული ჩონჩხი: DOCTYPE, html, head (charset + title) და body ერთი <h1>-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<!DOCTYPE html>\n" +
        '<html lang="ka">\n' +
        "  <head>\n" +
        '    <meta charset="utf-8">\n' +
        "    <title>ჩემი გვერდი</title>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    <h1>გამარჯობა</h1>\n" +
        "  </body>\n" +
        "</html>";

      const pg = CFZ.createCodePlayground(
        start,
        function (doc, code) {
          const hasDoctype = /<!doctype\s+html>/i.test(code);
          const hasCharset = Boolean(doc.querySelector("meta[charset]"));
          const hasTitle = Boolean(doc.querySelector("head title"));
          const hasH1 = Boolean(doc.querySelector("body h1"));
          const ok = hasDoctype && hasCharset && hasTitle && hasH1;

          const missing = [];
          if (!hasDoctype) missing.push("DOCTYPE");
          if (!hasCharset) missing.push("meta charset");
          if (!hasTitle) missing.push("title");
          if (!hasH1) missing.push("body-ში h1");

          setChallengeResult(
            ok,
            ok
              ? "შესრულებულია: სრული და სწორი ჩონჩხი გაქვს."
              : "აკლია: " + missing.join(", ") + "."
          );
        },
        { fullDocument: true }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "head vs body" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "head-ში წერია ინფორმაცია გვერდის შესახებ — სათაური, კოდირება, სტილების და სკრიპტების მისამართები. body-ში კი თავად შიგთავსი. სცადე: წაშალე <meta charset=\"utf-8\"> და ნახე, როგორ შეიძლება აირიოს ქართული ტექსტი.",
          }),
        ])
      );
    },
  });
})();
