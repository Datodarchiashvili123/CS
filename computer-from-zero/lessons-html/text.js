(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-text",
    title: "ტექსტი, სათაურები და სიები",
    shortTitle: "ტექსტი და სიები",
    theory: "სათაურები <h1>-დან <h6>-მდე იერარქიას ქმნიან: <h1> გვერდის მთავარი სათაურია (ჩვეულებრივ ერთი), <h2> — ქვეთავი და ასე შემდეგ. <p> აბზაცია. <strong> მნიშვნელოვანს ნიშნავს, <em> — ხაზგასმას. სიები ორია: <ul> უნომრო და <ol> დანომრილი, თითო პუნქტი კი <li>.",
    analogy: "ზუსტად ისე, როგორც Word-ში: „სათაური 1“, „სათაური 2“, ჩვეულებრივი ტექსტი და ჩამონათვალი. HTML-ში მათ ტეგებით აღნიშნავ.",
    physicalLabel: "მნიშვნელოვანი დეტალი",
    physical: "<strong> და <em> მნიშვნელობას ატარებს — ეკრანის წამკითხველი მათ ინტონაციით გამოყოფს. <b> და <i> კი მხოლოდ გარეგნობას ცვლის. ამიტომ ჯობია პირველი წყვილი. სათაურები ზომისთვის არ გამოიყენო — ზომას CSS არეგულირებს, სათაური კი სტრუქტურაა.",
    challenge: "დაწერე <h1> სათაური, ერთი აბზაცი და 3-პუნქტიანი დანომრილი სია (<ol>).",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<h1>ჩემი რეცეპტი</h1>\n" +
        "<p>უმარტივესი ომლეტი <em>5 წუთში</em>.</p>\n" +
        "<ol>\n" +
        "  <li>ააჭყლიტე კვერცხი</li>\n" +
        "  <li>დაამატე მარილი</li>\n" +
        "  <li>შეწვი ტაფაზე</li>\n" +
        "</ol>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const h1 = doc.querySelector("h1");
        const p = doc.querySelector("p");
        const ol = doc.querySelector("ol");
        const items = ol ? ol.querySelectorAll("li").length : 0;
        const ok = Boolean(h1 && p && ol && items >= 3);

        const missing = [];
        if (!h1) missing.push("h1");
        if (!p) missing.push("p");
        if (!ol) missing.push("ol");
        else if (items < 3) missing.push("ol-ში მინიმუმ 3 li (ახლა " + items + ")");

        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: სათაური, აბზაცი და დანომრილი სია გაქვს."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ul თუ ol?" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "<ol> გამოიყენე, როცა თანმიმდევრობას მნიშვნელობა აქვს (რეცეპტის ნაბიჯები, ინსტრუქცია). <ul> — როცა არა (ინგრედიენტები, თვისებები). სცადე: შეცვალე <ol> <ul>-ით და ნახე, როგორ იცვლება ნიშნები.",
          }),
        ])
      );
    },
  });
})();
