(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "cpu",
    title: "CPU-ის საფუძვლები",
    shortTitle: "CPU",
    theory: "CPU არის ნაწილი, რომელიც ინსტრუქციებს ასრულებს. ის იღებს მონაცემებს, ამუშავებს ALU-ში და აბრუნებს შედეგს.",
    analogy: "CPU პატარა სახელოსნოს ჰგავს: რეგისტრები სამუშაო მაგიდაა, ALU კი ხელსაწყო, რომელიც შეკრებას ან სხვა მოქმედებას აკეთებს.",
    physical: "რეგისტრებში ბიტები ინახება ელექტრული მდგომარეობებით. ALU ლოგიკური კარიბჭეების დიდი ქსელია, რომელიც ამ ბიტებზე მოქმედებებს ასრულებს.",
    challenge: "გაუშვი 5 + 3 და მიიყვანე შედეგი 8-მდე.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let cancelled = false;

      const registerA = createCpuBox("Register A", "-");
      const registerB = createCpuBox("Register B", "-");
      const alu = createCpuBox("ALU", "-");
      const result = createCpuBox("Output", "-");
      const arrowToAlu = CFZ.el("div", { className: "cpu-arrow", text: "↓" });
      const arrowToOutput = CFZ.el("div", { className: "cpu-arrow", text: "↓" });
      const log = CFZ.el("p", { className: "cpu-log", text: "პროგრამა მზად არის: 5 + 3." });

      const runButton = CFZ.createButton("გაშვება", "primary", runProgram);

      function createCpuBox(label, value) {
        const valueNode = CFZ.el("span", { className: "cpu-value", text: value });
        const element = CFZ.el("div", { className: "cpu-box" }, [
          CFZ.el("span", { className: "cpu-label", text: label }),
          valueNode,
        ]);

        return {
          element,
          setValue: function (nextValue) {
            valueNode.textContent = String(nextValue);
          },
          setFilled: function (isFilled) {
            element.classList.toggle("is-filled", Boolean(isFilled));
          },
          setPulsing: function (isPulsing) {
            element.classList.toggle("is-pulsing", Boolean(isPulsing));
          },
        };
      }

      function resetCpu() {
        [registerA, registerB, alu, result].forEach(function (box) {
          box.setValue("-");
          box.setFilled(false);
          box.setPulsing(false);
        });
        arrowToAlu.classList.remove("is-active");
        arrowToOutput.classList.remove("is-active");
      }

      async function runProgram() {
        runButton.disabled = true;
        resetCpu();
        setChallengeResult(false, "CPU მუშაობს: მონაცემები ჯერ რეგისტრებში უნდა ჩავიდეს.");

        await CFZ.wait(450);
        if (cancelled) return;
        registerA.setValue(5);
        registerA.setFilled(true);
        log.textContent = "Register A მიიღო 5.";

        await CFZ.wait(650);
        if (cancelled) return;
        registerB.setValue(3);
        registerB.setFilled(true);
        log.textContent = "Register B მიიღო 3.";

        await CFZ.wait(650);
        if (cancelled) return;
        arrowToAlu.classList.add("is-active");
        alu.setValue("5 + 3");
        alu.setPulsing(true);
        log.textContent = "ALU იღებს ორ რიცხვს და შეკრებას ასრულებს.";

        await CFZ.wait(900);
        if (cancelled) return;
        alu.setPulsing(false);
        alu.setFilled(true);
        arrowToOutput.classList.add("is-active");
        result.setValue(8);
        result.setFilled(true);
        log.textContent = "შედეგი დაბრუნდა Output-ში: 8.";
        setChallengeResult(true, "შესრულებულია: CPU-მ 5 + 3 გამოთვალა და მიიღო 8.");
        runButton.disabled = false;
      }

      container.append(
        CFZ.el("div", { className: "cpu-board" }, [
          CFZ.el("div", { className: "cpu-registers" }, [registerA.element, registerB.element]),
          arrowToAlu,
          alu.element,
          arrowToOutput,
          result.element,
        ]),
        CFZ.el("div", { className: "control-row" }, [runButton]),
        log
      );

      return function () {
        cancelled = true;
      };
    },
  });
})();
