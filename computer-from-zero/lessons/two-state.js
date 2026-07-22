(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "two-state",
    title: "ორი მდგომარეობა — რატომ 0 და 1",
    shortTitle: "ორი მდგომარეობა",
    theory: "კომპიუტერი ინფორმაციას მხოლოდ ორ მდგომარეობად ინახავს: დენი მოდის თუ არა — ჩართული თუ გამორთული. ამ ორ მდგომარეობას ვარქმევთ 1-სა და 0-ს. რატომ ორი და არა ათი დონე? იმიტომ, რომ ორი მკვეთრად დაშორებული დონის გარჩევა ბევრად საიმედოა — მცირე ხმაური (ძაბვის შემთხვევითი რყევა) ვერ აგვირევს 0-სა და 1-ს.",
    analogy: "კედლის ჩამრთველივით — ან ანთია, ან ჩამქრალი; შუალედი არ არსებობს. სწორედ ამ სიცხადეს ეყრდნობა კომპიუტერი.",
    physical: "მაღალი ძაბვა (მაგ. ~1–3.3V) იკითხება როგორც 1, ნულთან ახლოს — როგორც 0. თითო კარიბჭე შემოსულ სიგნალს ისევ ორ სუფთა დონემდე „ასწორებს“, ამიტომ მილიარდობით ოპერაციის შემდეგაც შეცდომა არ გროვდება.",
    challenge: "აწიე ძაბვა ისე მაღლა, რომ ხმაურის ჩართვის მერეც სტაბილურად წაიკითხოს 1.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      let noiseTimer = null;
      let voltage = 80;

      const bitOut = CFZ.createBitOutput("წაკითხული ბიტი");
      const meterFill = CFZ.el("span", { className: "vm-fill" });
      const meterThresh = CFZ.el("span", { className: "vm-threshold" });
      const meter = CFZ.el("div", {
        className: "voltage-meter",
        attrs: { role: "img", "aria-label": "ძაბვის მრიცხველი" },
      }, [meterThresh, meterFill]);
      const readLabel = CFZ.el("p", { className: "state-note" });

      const slider = CFZ.el("input", {
        className: "voltage-slider",
        attrs: { type: "range", min: "0", max: "100", value: "80", "aria-label": "ძაბვა" },
        on: {
          input: function (e) {
            voltage = Number(e.target.value);
            update();
          },
        },
      });

      const noiseSwitch = CFZ.createSwitch("ხმაური", false, function (on) {
        if (on) {
          startNoise();
        } else {
          stopNoise();
        }
        update();
      });

      function update() {
        const noisy = noiseSwitch.getValue() === 1;
        const jitter = noisy ? Math.random() * 24 - 12 : 0;
        const effective = Math.max(0, Math.min(100, voltage + jitter));
        const bit = effective >= 50 ? 1 : 0;
        const stable = Math.abs(voltage - 50) >= 15;

        meterFill.style.height = effective + "%";
        meterFill.classList.toggle("is-high", bit === 1);
        bitOut.setValue(bit);

        let msg = "ძაბვა ≈ " + Math.round(effective) + "% → ბიტი " + bit + " (ზღვარი 50%). ";
        if (noisy) {
          msg += stable
            ? "ხმაურის მიუხედავად წაკითხვა სტაბილურია — ზღვრიდან შორსაა."
            : "⚠ ზღვართან ახლოს ხმაური ბიტს არყევს — აი, რატომ არ ვიყენებთ ბუნდოვან შუა დონეებს.";
        } else {
          msg += "ჩართე ხმაური და ნახე, რჩება თუ არა წაკითხვა სტაბილური.";
        }
        readLabel.textContent = msg;

        const done = noisy && stable && bit === 1;
        setChallengeResult(
          done,
          done
            ? "შესრულებულია: ძაბვა ზღვარს მკვეთრად სცდება — 1 სტაბილურია ხმაურშიც."
            : "მიზანი: ჩართე ხმაური და ძაბვა ისე მაღლა აწიე (≥65%), რომ 1 არ ირყეოდეს."
        );
      }

      function startNoise() {
        stopNoise();
        noiseTimer = window.setInterval(update, 120);
      }
      function stopNoise() {
        if (noiseTimer) {
          window.clearInterval(noiseTimer);
          noiseTimer = null;
        }
      }

      container.append(
        CFZ.el("div", { className: "twostate-layout" }, [
          CFZ.el("div", { className: "twostate-controls" }, [
            CFZ.el("span", { className: "control-label", text: "ძაბვა (0 → მაქსიმუმი)" }),
            slider,
            noiseSwitch.element,
          ]),
          CFZ.el("div", { className: "twostate-meter-wrap" }, [meter, bitOut.element]),
        ]),
        readLabel,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "ანალოგი vs ციფრული" }),
          CFZ.el("p", {
            className: "breakdown-note",
            text: "ანალოგი სიგნალი უამრავ დონეს იღებს — ხმაური ადვილად ცვლის მნიშვნელობას. ციფრული მხოლოდ ორს (0/1) — ხმაურს დიდი ცდომილება სჭირდება, რომ ერთი მეორედ აქციოს. ამიტომ არის კომპიუტერი ორობითი: 2 მდგომარეობა = 1 ბიტი.",
          }),
        ])
      );

      update();

      return function () {
        stopNoise();
      };
    },
  });
})();
