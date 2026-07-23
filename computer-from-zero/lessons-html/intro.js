(function () {
  const lessons = window.HtmlLessons || (window.HtmlLessons = []);

  lessons.push({
    id: "html-intro",
    title: "რა არის HTML",
    shortTitle: "რა არის HTML",
    theory: "HTML არ არის პროგრამირების ენა — ის მონიშვნის ენაა (HyperText Markup Language). შენ ტექსტს ტეგებით „ნიშნავ“ და ეუბნები ბრაუზერს, რა არის რა: სათაური, აბზაცი, ბმული თუ სურათი. ბრაუზერი ამ მონიშვნას კითხულობს და გვერდს ხატავს.",
    analogy: "როგორც რედაქტორის ნიშნები ხელნაწერზე: „ეს სათაურია“, „ეს ჩამონათვალია“. ტექსტი იგივე რჩება — უბრალოდ ეუბნები, რა როლი აქვს თითოეულ ნაწილს.",
    physicalLabel: "სინტაქსი",
    physical: "ელემენტი = გამხსნელი ტეგი + შიგთავსი + დამხურავი ტეგი: <p>ტექსტი</p>. ზოგი ტეგი ცარიელია და დამხურავი არ აქვს (<img>, <br>). ატრიბუტი დამატებით ინფორმაციას აწვდის და გამხსნელ ტეგში წერია: <a href=\"...\">.",
    challenge: "დაწერე ერთი აბზაცი <p> ტეგით და შიგნით ერთი სიტყვა გამოკვეთე <strong>-ით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;

      const pg = CFZ.createCodePlayground(
        '<p>გამარჯობა! ეს ჩემი პირველი <strong>HTML</strong> გვერდია.</p>',
        function (doc) {
          const p = doc.querySelector("p");
          const strong = doc.querySelector("p strong");
          const ok = Boolean(p && strong && strong.textContent.trim());
          setChallengeResult(
            ok,
            ok
              ? "შესრულებულია: აბზაცი გაქვს და შიგნით გამოკვეთილი ტექსტი."
              : "მიზანი: <p> ტეგი, რომლის შიგნითაც <strong> იქნება."
          );
        }
      );

      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ელემენტის აგებულება" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "<p class=\"intro\">ტექსტი</p> — აქ „p“ არის ტეგის სახელი, class=\"intro\" ატრიბუტია, „ტექსტი“ შიგთავსი, </p> კი დამხურავი ტეგი. ბრაუზერი უცნობ ტეგს უბრალოდ უგულებელყოფს, ამიტომ შეცდომაზე გვერდი არ „ვარდება“.",
          }),
        ])
      );
    },
  });
})();
