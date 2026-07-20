(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "transistor",
    title: "ტრანზისტორი",
    shortTitle: "ტრანზისტორი",
    theory: "ტრანზისტორი არის ძალიან პატარა ელექტრონული ჩამრთველი. პატარა სიგნალი მართავს, გავა თუ არა დენი დიდ გზაზე.",
    analogy: "წარმოიდგინე ონკანი: სახელურს ოდნავ ატრიალებ და წყალს გზას უხსნი. ტრანზისტორი ელექტრონებს უხსნის გზას.",
    physical: "როცა შესასვლელზე სიგნალი 1 მოდის, ტრანზისტორი ატარებს დენს. როცა სიგნალი 0 არის, დენი ჩერდება.",
    challenge: "ჩართე შესასვლელი სიგნალი და აანთე ნათურა ტრანზისტორის გავლით.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const inputSwitch = CFZ.createSwitch("Input", false, update);
      const topTrack = CFZ.createElectronTrack("vertical");
      const bottomTrack = CFZ.createElectronTrack("vertical");
      const lamp = CFZ.createLamp("ნათურა");
      const transistorPart = CFZ.createSchematicPart("transistor", "ტრანზისტორი", "MOSFET");
      const note = CFZ.el("p", { className: "state-note" });

      function update() {
        const isOn = inputSwitch.getValue() === 1;
        topTrack.setFlowing(isOn);
        bottomTrack.setFlowing(isOn);
        lamp.setOn(isOn);
        transistorPart.setActive(isOn);
        note.textContent = isOn
          ? "ON: ტრანზისტორმა გზა გახსნა, ელექტრონები გადიან და ნათურა ანათებს."
          : "OFF: ტრანზისტორი გზას კეტავს და დენი არ მიედინება.";

        setChallengeResult(
          isOn,
          isOn
            ? "შესრულებულია: სიგნალმა ტრანზისტორი ჩართო."
            : "მიზანი: ჩართე Input, რომ დენი გავიდეს."
        );
      }

      container.append(
        CFZ.el("div", { className: "control-row" }, [inputSwitch.element]),
        CFZ.el("div", { className: "wire-stack" }, [
          CFZ.el("div", { className: "part-label", text: "დენის წყარო" }),
          topTrack.element,
          transistorPart.element,
          bottomTrack.element,
          lamp.element,
        ]),
        note
      );
      update();
    },
  });
})();
