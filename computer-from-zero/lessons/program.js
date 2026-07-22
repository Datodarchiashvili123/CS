(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "program",
    title: "საათი და პროგრამა",
    shortTitle: "პროგრამა",
    theory: "CPU პროგრამას მიჰყვება — ინსტრუქციების სიას. „პროგრამის მრიცხველი“ (PC) მიუთითებს მიმდინარე ინსტრუქციაზე (ქვემოთ — მონიშნული სტრიქონი). საათი (clock) არის „გულისცემა“: ყოველი ტიკით CPU ერთ ინსტრუქციას ასრულებს და PC გადადის შემდეგზე. თითო ინსტრუქცია სამ ფაზას გადის: Fetch (აღება) → Decode (გაშიფვრა) → Execute (შესრულება).",
    analogy: "ჰგავს რეცეპტს: PC არის თითი, რომელიც მიმდინარე ბიჯზე დგას; ნაბიჯ-ნაბიჯ კითხულობ და ასრულებ. საათი მეტრონომია, რომელიც ტემპს განსაზღვრავს.",
    physical: "თითო ინსტრუქცია თავადაა ბიტების ჯგუფი: ნაწილი (opcode) ირჩევს ოპერაციას — ეს პირდაპირ ALU-ს სელექტორს მიდის; ნაწილი მიუთითებს, რომელ რეგისტრებთან იმუშაოს. საათი წამში მილიარდობით ტიკს იძლევა (გიგაჰერცები) და ყოველი ტიკი სინქრონიზებს ყველა ნაწილს, რომ ბიტები სწორ დროს გადავიდნენ რეგისტრებსა და ALU-ს შორის.",
    challenge: "დააჭირე საათს და გაუშვი მთელი პროგრამა: 5 + 3 = 8.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let cancelled = false;

      const program = [
        { text: "LOAD A, 5", decode: "ჩატვირთე 5 რეგისტრ A-ში", run: function (s) { s.a = 5; } },
        { text: "LOAD B, 3", decode: "ჩატვირთე 3 რეგისტრ B-ში", run: function (s) { s.b = 3; } },
        { text: "ADD A, B", decode: "შეკრიბე A და B, შედეგი Output-ში", run: function (s) { s.out = s.a + s.b; } },
      ];
      const state = { a: "–", b: "–", out: "–" };
      let pc = 0;
      let running = false;

      const instrRows = program.map(function (instr, i) {
        return CFZ.el("div", { className: "instr-row" }, [
          CFZ.el("span", { className: "instr-num", text: String(i + 1) }),
          CFZ.el("span", { className: "instr-text", text: instr.text }),
        ]);
      });

      const phases = [
        { key: "fetch", label: "Fetch" },
        { key: "decode", label: "Decode" },
        { key: "execute", label: "Execute" },
      ];
      const phaseBadges = phases.map(function (p) {
        return { key: p.key, element: CFZ.el("span", { className: "phase-badge", text: p.label }) };
      });

      const regA = createReg("Register A");
      const regB = createReg("Register B");
      const regOut = createReg("Output");

      const log = CFZ.el("p", { className: "cpu-log", text: "პროგრამა მზადაა. დააჭირე საათს, რომ პირველი ინსტრუქცია შესრულდეს." });
      const tickButton = CFZ.createButton("⏱ საათის ტიკი", "primary", tick);
      const resetButton = CFZ.createButton("თავიდან", "secondary", reset);

      function setPhase(active) {
        phaseBadges.forEach(function (b) {
          b.element.classList.toggle("is-active", b.key === active);
        });
      }

      function highlightPC() {
        instrRows.forEach(function (row, i) {
          row.classList.toggle("is-current", i === pc && pc < program.length);
          row.classList.toggle("is-done", i < pc);
        });
      }

      function renderRegs() {
        regA.setValue(state.a);
        regB.setValue(state.b);
        regOut.setValue(state.out);
      }

      async function tick() {
        if (running || pc >= program.length) {
          return;
        }
        running = true;
        tickButton.disabled = true;
        resetButton.disabled = true;
        const instr = program[pc];
        highlightPC();

        setPhase("fetch");
        log.textContent = "Fetch: ვიღებთ ინსტრუქციას #" + (pc + 1) + " — " + instr.text;
        await CFZ.wait(650);
        if (cancelled) return;

        setPhase("decode");
        log.textContent = "Decode: " + instr.decode;
        await CFZ.wait(650);
        if (cancelled) return;

        setPhase("execute");
        instr.run(state);
        renderRegs();
        log.textContent = "Execute: შესრულდა — " + instr.text + ".";
        await CFZ.wait(650);
        if (cancelled) return;

        setPhase(null);
        pc += 1;
        running = false;
        highlightPC();

        if (pc >= program.length) {
          log.textContent = "პროგრამა დასრულდა: A + B = " + state.out + ".";
          tickButton.disabled = true;
          resetButton.disabled = false;
          setChallengeResult(
            state.out === 8,
            "შესრულებულია: CPU-მ პროგრამა ბოლომდე შეასრულა და მიიღო 8."
          );
        } else {
          tickButton.disabled = false;
          resetButton.disabled = false;
        }
      }

      function reset() {
        if (running) {
          return;
        }
        pc = 0;
        state.a = "–";
        state.b = "–";
        state.out = "–";
        renderRegs();
        setPhase(null);
        highlightPC();
        tickButton.disabled = false;
        log.textContent = "პროგრამა თავიდან დაიწყო. დააჭირე საათს.";
        setChallengeResult(false, "დააჭირე საათს და გაუშვი პროგრამა ბოლომდე.");
      }

      renderRegs();
      highlightPC();

      container.append(
        CFZ.el("div", { className: "program-layout" }, [
          CFZ.el("div", { className: "program-code" }, [
            CFZ.el("h4", { text: "პროგრამა" }),
            CFZ.el("div", { className: "instr-list" }, instrRows),
          ]),
          CFZ.el("div", { className: "program-state" }, [
            CFZ.el("h4", { text: "ფაზა (fetch → decode → execute)" }),
            CFZ.el("div", { className: "phase-badges" }, phaseBadges.reduce(function (acc, b, i) {
              if (i > 0) {
                acc.push(CFZ.el("span", { className: "phase-arrow", attrs: { "aria-hidden": "true" }, text: "→" }));
              }
              acc.push(b.element);
              return acc;
            }, [])),
            CFZ.el("div", { className: "reg-row" }, [regA.element, regB.element, regOut.element]),
          ]),
        ]),
        CFZ.el("div", { className: "control-row" }, [tickButton, resetButton]),
        log
      );

      return function () {
        cancelled = true;
      };

      function createReg(label) {
        const value = CFZ.el("span", { className: "reg-value", text: "–" });
        const element = CFZ.el("div", { className: "reg-box" }, [
          CFZ.el("span", { className: "reg-label", text: label }),
          value,
        ]);
        return {
          element: element,
          setValue: function (v) {
            value.textContent = String(v);
            element.classList.toggle("is-filled", v !== "–");
          },
        };
      }
    },
  });
})();
