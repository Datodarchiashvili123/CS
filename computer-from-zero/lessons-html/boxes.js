(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-boxes",
    title: "ბლოკური და სტრიქონული — div და span",
    shortTitle: "div და span",
    theory: "ელემენტები ორ დიდ ჯგუფად იყოფა. ბლოკური (<div>, <p>, <h1>, <ul>) მთელ სიგანეს იკავებს და ახალი ხაზიდან იწყება. სტრიქონული (<span>, <a>, <strong>, <img>) მხოლოდ იმდენს იკავებს, რამდენიც სჭირდება, და ტექსტის ნაკადში რჩება.",
    analogy: "ბლოკური — აბზაცი დოკუმენტში, რომელიც მთელ ხაზს იკავებს. სტრიქონული — მარკერით მონიშნული სიტყვა იმავე წინადადებაში.",
    physicalLabel: "როდის რომელი",
    physical: "<div> და <span> უმნიშვნელობო ყუთებია — ისინი მხოლოდ მაშინ გამოიყენე, როცა სემანტიკური ტეგი არ ჯდება და უბრალოდ სტილის ან დაჯგუფების მიზეზი გაქვს. თუ ბლოკს როლი აქვს (თავი, ნავიგაცია, სტატია), სემანტიკური ტეგი აჯობებს.",
    challenge: "შექმენი ერთი <div> ორი აბზაცით და აბზაცის შიგნით მონიშნე ერთი სიტყვა <span>-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const start =
        '<div class="karti">\n' +
        '  <p>ეს <span class="mnishvnelovani">სიტყვა</span> სტრიქონულ ყუთშია.</p>\n' +
        "  <p>ეს კი მეორე აბზაცია იმავე ბლოკში.</p>\n" +
        "</div>";

      const pg = CFZ.createCodePlayground(start, function (doc) {
        const div = doc.querySelector("div");
        const ps = div ? div.querySelectorAll("p").length : 0;
        const span = doc.querySelector("p span");
        const ok = Boolean(div && ps >= 2 && span);
        const missing = [];
        if (!div) missing.push("div");
        else if (ps < 2) missing.push("div-ში ორი p (ახლა " + ps + ")");
        if (!span) missing.push("span აბზაცის შიგნით");
        setChallengeResult(
          ok,
          ok ? "შესრულებულია: ბლოკური და სტრიქონული ერთად გაქვს." : "აკლია: " + missing.join(", ") + "."
        );
      });

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე განსხვავება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "შეცვალე <span> <div>-ით და ნახე: სიტყვა ცალკე ხაზზე გადავა, რადგან ბლოკური ელემენტი მთელ სიგანეს იკავებს. სწორედ ამიტომ ტექსტის შიგნით ყოველთვის სტრიქონული ელემენტი უნდა იყოს.",
          }),
        ])
      );
    },
  });
})();
