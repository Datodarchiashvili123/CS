(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-links-images",
    title: "ბმულები და სურათები",
    shortTitle: "ბმული და სურათი",
    theory: "ბმული არის ის, რაც ვებს ვებად აქცევს: <a href=\"მისამართი\">ტექსტი</a>. href შეიძლება იყოს სრული URL (https://...), სხვა ფაილი იმავე საიტზე (about.html), ან ღუზა იმავე გვერდზე (#კონტაქტი). სურათი კი <img src=\"ფაილი\" alt=\"აღწერა\">.",
    analogy: "ბმული — კარი, რომელიც სხვა ოთახში გადაგიყვანს. alt — სურათის სიტყვიერი აღწერა იმისთვის, ვინც სურათს ვერ ხედავს ან ვისაც ის არ ჩაეტვირთა.",
    physicalLabel: "წესები",
    physical: "target=\"_blank\" ბმულს ახალ ჩანართში ხსნის — მასთან ერთად დაწერე rel=\"noopener\". alt სავალდებულოა: თუ სურათი წმინდა დეკორატიულია, დატოვე ცარიელი (alt=\"\"). <img>-ს დამხურავი ტეგი არ აქვს — ის ცარიელი ელემენტია.",
    challenge: "შექმენი ბმული, რომელიც ახალ ჩანართში იხსნება (target=\"_blank\"), და ერთი სურათი alt ატრიბუტით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const start =
        '<p>ეს კურსი აქ ცხოვრობს:\n' +
        '  <a href="https://tsre.in" target="_blank" rel="noopener">tsre.in</a>\n' +
        "</p>\n" +
        '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/120px-HTML5_logo_and_wordmark.svg.png"\n' +
        '     alt="HTML5-ის ლოგო">';

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const link = doc.querySelector('a[href][target="_blank"]');
        const img = doc.querySelector("img[src]");
        const hasAlt = img && img.getAttribute("alt") !== null;
        const ok = Boolean(link && img && hasAlt);

        const missing = [];
        if (!link) missing.push('ბმული target="_blank"-ით');
        if (!img) missing.push("სურათი src-ით");
        else if (!hasAlt) missing.push("სურათს alt ატრიბუტი");

        setChallengeResult(
          ok,
          ok
            ? "შესრულებულია: ბმულიც გაქვს და სურათიც alt-ით."
            : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "კარგი ბმულის ტექსტი" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ბმულის ტექსტი უნდა ხსნიდეს, სად მიდიხარ. „დააჭირე აქ“ ცუდია — „იხილე კურსის პროგრამა“ კარგი. ეკრანის წამკითხველი ხშირად მხოლოდ ბმულების სიას კითხულობს, და მაშინ „აქ, აქ, აქ“ არაფერს ეუბნება მომხმარებელს.",
          }),
        ])
      );
    },
  });
})();
