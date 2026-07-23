(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  // ---------- 1. ველების ტიპები ----------
  lessons.push({
    id: "html-input-types",
    title: "ფორმის ველების ტიპები",
    shortTitle: "ველების ტიპები",
    theory: "<input>-ის სახეს type განსაზღვრავს: text, email, password, number, date, file, range, color. ცალკე ელემენტებია <textarea> (გრძელი ტექსტი) და <select> ჩამოსაშლელი სიისთვის <option>-ებით. არჩევანისთვის: checkbox (რამდენიმე) და radio (მხოლოდ ერთი).",
    analogy: "ანკეტის გრაფები: ერთსტრიქონიანი უჯრა, დიდი ველი კომენტარისთვის, ჩამოსაშლელი სია, გამრავლებადი კვადრატები და მრგვალი ღილაკები, სადაც მხოლოდ ერთის მონიშვნა შეიძლება.",
    physicalLabel: "მთავარი ხრიკი",
    physical: "radio ღილაკები ერთ ჯგუფად მაშინ იქცევა, როცა მათ ერთი და იგივე name აქვთ — მაშინ მხოლოდ ერთის არჩევა შეიძლება. checkbox-ს ეს არ სჭირდება. placeholder მინიშნებაა და <label>-ს ვერ ჩაანაცვლებს — ტექსტის აკრეფისას ის ქრება.",
    challenge: "ააწყვე ფორმა: ერთი radio ჯგუფი (2 ვარიანტი, ერთი name), <select> 3 <option>-ით და ერთი <textarea>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<form>\n" +
        "  <p>დონე:</p>\n" +
        '  <label><input type="radio" name="done" value="axali"> ახალბედა</label>\n' +
        '  <label><input type="radio" name="done" value="gamocdili"> გამოცდილი</label>\n\n' +
        '  <label for="qveyana">ქვეყანა</label>\n' +
        '  <select id="qveyana" name="qveyana">\n' +
        "    <option>საქართველო</option>\n" +
        "    <option>გერმანია</option>\n" +
        "    <option>საფრანგეთი</option>\n" +
        "  </select>\n\n" +
        '  <label for="komentari">კომენტარი</label>\n' +
        '  <textarea id="komentari" rows="3"></textarea>\n' +
        "</form>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const radios = Array.prototype.slice.call(doc.querySelectorAll('input[type="radio"]'));
        const names = {};
        radios.forEach(function (r) {
          const n = r.getAttribute("name");
          if (n) names[n] = (names[n] || 0) + 1;
        });
        const grouped = Object.keys(names).some(function (n) {
          return names[n] >= 2;
        });
        const options = doc.querySelectorAll("select option").length;
        const textarea = doc.querySelector("textarea");
        const ok = Boolean(grouped && options >= 3 && textarea);

        const missing = [];
        if (!grouped) missing.push("2 radio ერთი და იმავე name-ით");
        if (options < 3) missing.push("select 3 option-ით (ახლა " + options + ")");
        if (!textarea) missing.push("textarea");

        setChallengeResult(
          ok,
          ok ? "შესრულებულია: სამივე ტიპის ველი გაქვს." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე გადახედვაში" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "დააჭირე ორივე radio-ს — მხოლოდ ერთი რჩება მონიშნული, რადგან name ერთია. ახლა შეცვალე მეორის name და ისევ სცადე: ორივე მოინიშნება. სწორედ name აჯგუფებს მათ.",
          }),
        ])
      );
    },
  });

  // ---------- 2. ვალიდაცია ----------
  lessons.push({
    id: "html-validation",
    title: "ფორმის ვალიდაცია",
    shortTitle: "ვალიდაცია",
    theory: "ბრაუზერს თავად შეუძლია შეამოწმოს შევსებული ფორმა — JavaScript-ის გარეშე. required ველს სავალდებულოს ხდის, minlength/maxlength სიგრძეს ზღუდავს, min/max რიცხვის დიაპაზონს, pattern კი საკუთარ წესს აწესებს. type=\"email\" ან type=\"url\" ფორმატს ავტომატურად ამოწმებს.",
    analogy: "როგორც ანკეტის მიმღები, რომელიც ფურცელს არ იღებს, სანამ სავალდებულო გრაფები არ შეავსე — და აქვე გეუბნება, რომელი დარჩა ცარიელი.",
    physicalLabel: "მნიშვნელოვანი გაფრთხილება",
    physical: "ბრაუზერის ვალიდაცია მოხერხებულობაა, არა უსაფრთხოება — მისი გვერდის ავლა ადვილია. მონაცემი ყოველთვის სერვერზეც უნდა შემოწმდეს. novalidate ატრიბუტი ფორმაზე დროებით თიშავს შემოწმებას (გამართვისას გამოგადგება).",
    challenge: "შექმენი ველი, რომელიც არის required, აქვს minlength=\"3\" და ერთი ველი type=\"number\"-ით min/max-ის შეზღუდვით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        "<form>\n" +
        '  <label for="user">მომხმარებელი (მინ. 3 სიმბოლო)</label>\n' +
        '  <input type="text" id="user" name="user" required minlength="3">\n\n' +
        '  <label for="asaki">ასაკი (1–120)</label>\n' +
        '  <input type="number" id="asaki" name="asaki" min="1" max="120">\n\n' +
        "  <button>გაგზავნა</button>\n" +
        "</form>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const req = doc.querySelector("input[required][minlength]");
        const num = doc.querySelector('input[type="number"][min][max]');
        const ok = Boolean(req && num);
        const missing = [];
        if (!req) missing.push("ველი required + minlength-ით");
        if (!num) missing.push('input type="number" min და max-ით');
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: ვალიდაციის წესები დააყენე." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე — გატეხე ფორმა" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "გადახედვაში დატოვე პირველი ველი ცარიელი და დააჭირე გაგზავნას — ბრაუზერი მაშინვე გაჩვენებს შეტყობინებას. მერე ჩაწერე ორი ასო: გეტყვის, რომ მინიმუმ სამია საჭირო. ასაკში კი სცადე 200 — არ გაატარებს.",
          }),
        ])
      );
    },
  });
})();
