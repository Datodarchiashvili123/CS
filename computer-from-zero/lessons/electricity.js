(function () {
  const lessons = window.ComputerFromZeroLessons || (window.ComputerFromZeroLessons = []);

  lessons.push({
    id: "electricity",
    title: "ელექტრობა",
    shortTitle: "ელექტრობა",
    theory: "ელექტრობა არის ელექტრონების მოძრაობა. როცა ელექტრონები ერთ მიმართულებით მოძრაობენ, ვიღებთ დენს.",
    analogy: "წარმოიდგინე წყალი მილში: წყალი მიედინება მილში, ელექტრონები კი მავთულში.",
    physical: "კვების წყარო ქმნის ბიძგს. ეს ბიძგი ელექტრონებს მავთულში ამოძრავებს და ნათურა ენერგიას სინათლედ აქცევს.",
    challenge: "დააჭირე დაწყებას, გაატარე დენი წრედში და აანთე ნათურა.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const track = CFZ.createElectronTrack("vertical");
      const lamp = CFZ.createLamp("ნათურა");
      const note = CFZ.el("p", {
        className: "state-note",
        text: "დენი ჯერ არ მიედინება.",
      });

      const startButton = CFZ.createButton("დაწყება", "primary", function () {
        track.setFlowing(true);
        lamp.setOn(true);
        note.textContent = "ელექტრონები წრედში მოძრაობენ და ნათურა ანათებს.";
        setChallengeResult(true, "შესრულებულია: ელექტრონებმა წრედში დენი შექმნეს.");
      });

      const batteryPart = CFZ.createSchematicPart("battery", "კვების წყარო", "V");

      container.append(
        CFZ.el("div", { className: "wire-stack" }, [
          batteryPart.element,
          track.element,
          lamp.element,
        ]),
        CFZ.el("div", { className: "control-row" }, [startButton]),
        note
      );
    },
  });
})();
