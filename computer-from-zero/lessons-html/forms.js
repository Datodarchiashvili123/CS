(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-forms",
    title: "ფორმები",
    shortTitle: "ფორმა",
    theory: "ფორმა მომხმარებლისგან იღებს მონაცემს. <form> ყველაფერს აერთიანებს, <input> ერთი ველია (type განსაზღვრავს სახეს: text, email, password, number, checkbox, radio, date), <label> ველის წარწერაა, <button> კი გაგზავნის ღილაკი. <textarea> გრძელი ტექსტისთვისაა, <select> — ჩამოსაშლელი სიისთვის.",
    analogy: "ქაღალდის ანკეტა: თითო გრაფას თავისი წარწერა აქვს, ბოლოს კი ხელს აწერ და აბარებ.",
    physicalLabel: "წესები",
    physical: "<label for=\"email\"> უნდა ემთხვეოდეს <input id=\"email\">-ს — მაშინ წარწერაზე დაჭერა ველს აქტიურს ხდის (და ეკრანის წამკითხველიც სწორად წაიკითხავს). name ატრიბუტით მონაცემი სერვერზე იგზავნება. required ველს სავალდებულოს ხდის, type=\"email\" კი ბრაუზერს თავად ამოწმებინებს ფორმატს.",
    challenge: "შექმენი ფორმა: <label> დაკავშირებული <input type=\"email\">-თან (for და id ერთი და იგივე) და გაგზავნის <button>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<form>\n" +
        '  <label for="email">ელფოსტა</label>\n' +
        '  <input type="email" id="email" name="email" required>\n' +
        "\n" +
        "  <button type=\"submit\">გაგზავნა</button>\n" +
        "</form>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const form = doc.querySelector("form");
        const input = doc.querySelector('input[type="email"][id]');
        const button = doc.querySelector("button");
        let linked = false;
        if (input) {
          const label = doc.querySelector('label[for="' + input.id + '"]');
          linked = Boolean(label);
        }
        const ok = Boolean(form && input && button && linked);

        const missing = [];
        if (!form) missing.push("form");
        if (!input) missing.push('input type="email" id-ით');
        else if (!linked) missing.push("label for=\"" + input.id + "\"");
        if (!button) missing.push("button");

        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: ველი, დაკავშირებული წარწერა და ღილაკი გაქვს."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე გადახედვაში" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ჩაწერე ველში არასწორი ელფოსტა (მაგ. „abc“) და დააჭირე გაგზავნას — ბრაუზერი თავად გაჩვენებს შეცდომას, ერთი სტრიქონი JavaScript-ის გარეშე. სცადე type=\"email\"-ის შეცვლა type=\"text\"-ით და ნახე განსხვავება.",
          }),
        ])
      );
    },
  });
})();
