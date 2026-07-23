(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-semantics",
    title: "სემანტიკური სტრუქტურა",
    shortTitle: "სემანტიკა",
    theory: "<div> უბრალო ყუთია — მნიშვნელობა არ აქვს. სემანტიკური ტეგები კი ამბობენ, რა როლი აქვს ბლოკს: <header> (ზედა ნაწილი), <nav> (ნავიგაცია), <main> (მთავარი შიგთავსი), <article> (დამოუკიდებელი მასალა), <section> (თემატური ნაწილი), <aside> (გვერდითი), <footer> (ქვედა).",
    analogy: "გაზეთი: სათაურის ზოლი, სარჩევი, მთავარი სტატია, გვერდითი სვეტი და ქვედა კოლონტიტული. ყველა „ყუთია“, მაგრამ თითოს თავისი დანიშნულება აქვს.",
    physicalLabel: "რატომ აქვს მნიშვნელობა",
    physical: "ეკრანის წამკითხველები ამ ტეგებით ნავიგაციას აძლევენ უსინათლო მომხმარებელს („გადადი მთავარ შიგთავსზე“), საძიებო სისტემები კი გვერდის აგებულებას იგებენ. <main> გვერდზე ერთი უნდა იყოს. <div> მაშინ გამოიყენე, როცა ბლოკი მხოლოდ სტილისთვისაა საჭირო.",
    challenge: "ააწყვე გვერდის კარკასი ოთხი ტეგით: <header>, <nav>, <main> და <footer>.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        "<header>\n" +
        "  <h1>ჩემი საიტი</h1>\n" +
        "</header>\n\n" +
        "<nav>\n" +
        '  <a href="#">მთავარი</a> ·\n' +
        '  <a href="#">კურსები</a>\n' +
        "</nav>\n\n" +
        "<main>\n" +
        "  <article>\n" +
        "    <h2>პირველი სტატია</h2>\n" +
        "    <p>მოკლე ტექსტი.</p>\n" +
        "  </article>\n" +
        "</main>\n\n" +
        "<footer>\n" +
        "  <p>© 2026</p>\n" +
        "</footer>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const need = ["header", "nav", "main", "footer"];
        const missing = need.filter(function (t) {
          return !doc.querySelector(t);
        });
        const ok = missing.length === 0;
        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: გვერდს სემანტიკური კარკასი აქვს."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "section თუ article?" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "<article> ისეთი ნაწილია, რომელსაც ცალკე ამოღებულსაც აქვს აზრი — ბლოგპოსტი, პროდუქტის ბარათი, კომენტარი. <section> კი ერთი დოკუმენტის თემატური ნაწილია, ჩვეულებრივ საკუთარი სათაურით. თუ ვერ წყვეტ — ჰკითხე: „RSS-ში ცალკე გამოვა?“ თუ კი, article არის.",
          }),
        ])
      );
    },
  });
})();
