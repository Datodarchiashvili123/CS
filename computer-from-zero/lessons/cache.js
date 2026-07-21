(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "cache",
    title: "ქეშ მეხსიერება — L1, L2, L3",
    shortTitle: "Cache",
    theory: "CPU ძალიან სწრაფია, ოპერატიული მეხსიერება (RAM) კი შორსაა და ნელი. ამ სხვაობის შესავსებად ბირთვთან ახლოს დგას პატარა, სწრაფი მეხსიერებები — ქეშები: L1, L2 და L3.",
    analogy: "წარმოიდგინე მუშაობა მაგიდასთან: რაც ახლა გჭირდება, მაგიდაზეა (L1); ხშირად საჭირო — უჯრაში (L2); ზოგი — თაროზე (L3); დანარჩენი კი შორს, საწყობში (RAM). რაც უფრო ახლოსაა, მით სწრაფად აიღებ.",
    physical: "L1 ყველაზე პატარაა (რამდენიმე ათეული KB) და ყველაზე სწრაფი, ბირთვთან ერთადაა. L2 დიდია, L3 კიდევ უფრო — და ბირთვებს შორის გაზიარებული. RAM უზარმაზარია, მაგრამ ბევრჯერ ნელი. ამიტომ CPU ჯერ ქეშებში ეძებს მონაცემს.",
    challenge: "მოითხოვე ერთი და იგივე მონაცემი ორჯერ — მეორედ L1-ში იპოვი (cache hit).",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let cancelled = false;

      const levels = [
        { key: "L1", name: "L1 ქეში", size: "64 KB", latency: 4 },
        { key: "L2", name: "L2 ქეში", size: "512 KB", latency: 12 },
        { key: "L3", name: "L3 ქეში", size: "16 MB", latency: 40 },
        { key: "RAM", name: "RAM (ოპერატიული)", size: "16 GB", latency: 200 },
      ];
      let dataLevel = levels.length - 1; // თავიდან მონაცემი მხოლოდ RAM-შია

      const boxes = levels.map(function (level) {
        const badge = CFZ.el("span", { className: "cache-badge", text: "📦 უახლოესი ასლი" });
        const element = CFZ.el("div", { className: "cache-level" }, [
          CFZ.el("span", { className: "cache-level-name", text: level.name }),
          CFZ.el("span", { className: "cache-level-meta", text: level.size }),
          CFZ.el("span", { className: "cache-level-meta", text: "~" + level.latency + " ციკლი" }),
          badge,
        ]);
        return { level: level, element: element, badge: badge };
      });

      const log = CFZ.el("p", { className: "cpu-log", text: "დააჭირე „მოთხოვნას“, რომ ნახო, სად პოულობს CPU მონაცემს." });
      const requestButton = CFZ.createButton("მონაცემის მოთხოვნა", "primary", requestData);
      const clearButton = CFZ.createButton("ქეშის გასუფთავება", "secondary", clearCache);

      function setData(nearest) {
        boxes.forEach(function (b, i) {
          b.element.classList.toggle("has-data", i >= nearest);
          b.badge.classList.toggle("show", i === nearest);
        });
      }

      function clearHighlights() {
        boxes.forEach(function (b) {
          b.element.classList.remove("searching", "hit", "miss");
        });
      }

      async function requestData() {
        requestButton.disabled = true;
        clearButton.disabled = true;
        clearHighlights();
        log.textContent = "CPU ეძებს მონაცემს — ჯერ L1-ში...";

        let found = -1;
        for (let i = 0; i < levels.length; i++) {
          boxes[i].element.classList.add("searching");
          await CFZ.wait(520);
          if (cancelled) return;
          boxes[i].element.classList.remove("searching");
          if (i >= dataLevel) {
            boxes[i].element.classList.add("hit");
            found = i;
            break;
          }
          boxes[i].element.classList.add("miss");
        }

        const latency = levels[found].latency;
        const hitL1 = found === 0;
        log.textContent = hitL1
          ? "⚡ Cache HIT L1-ში! სულ ~" + latency + " ციკლი — ძალიან სწრაფი."
          : "მონაცემი ნაპოვნია " + levels[found].name + "-ში: ~" + latency + " ციკლი.";

        if (found > 0) {
          await CFZ.wait(550);
          if (cancelled) return;
          dataLevel = 0;
          setData(dataLevel);
          log.textContent += " მონაცემი დაკოპირდა ქეშებში — შემდეგ ჯერზე L1-დან წამოვა.";
        }

        setChallengeResult(
          hitL1,
          hitL1
            ? "შესრულებულია: მონაცემი უკვე L1-შია — ეს არის cache hit."
            : "ახლა კიდევ ერთხელ მოითხოვე იგივე მონაცემი — ამჯერად L1-ში იქნება."
        );
        requestButton.disabled = false;
        clearButton.disabled = false;
      }

      function clearCache() {
        clearHighlights();
        dataLevel = levels.length - 1;
        setData(dataLevel);
        log.textContent = "ქეში გასუფთავდა. მონაცემი ისევ მხოლოდ RAM-შია — შემდეგი მოთხოვნა ნელი იქნება.";
        setChallengeResult(false, "მოითხოვე მონაცემი და დააკვირდი, სად პოულობს CPU მას.");
      }

      setData(dataLevel);

      container.append(
        CFZ.el("p", {
          className: "breakdown-note",
          text: "← ბირთვთან ახლოს: სწრაფი, პატარა · · · შორს: ნელი, დიდი →",
        }),
        CFZ.el("div", { className: "cache-hierarchy" }, [
          CFZ.el("div", { className: "cache-level cache-cpu" }, [
            CFZ.el("span", { className: "cache-level-name", text: "CPU ბირთვი" }),
            CFZ.el("span", { className: "cache-level-meta", text: "რეგისტრები" }),
            CFZ.el("span", { className: "cache-level-meta", text: "~1 ციკლი" }),
          ]),
          boxes[0].element,
          boxes[1].element,
          boxes[2].element,
          boxes[3].element,
        ]),
        CFZ.el("div", { className: "control-row" }, [requestButton, clearButton]),
        log,
        CFZ.el("p", {
          className: "breakdown-note",
          text: "ქეში მუშაობს, რადგან პროგრამა ხშირად ერთსა და იმავე მონაცემს იმეორებს (ლოკალურობა). თუ მონაცემი ქეშშია — ეს „cache hit“ (სწრაფი); თუ არა და RAM-მდე უწევს ჩასვლა — „cache miss“ (ნელი).",
        })
      );

      return function () {
        cancelled = true;
      };
    },
  });
})();
