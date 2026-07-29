(function () {
  const lessons = window.ScssLessons || (window.ScssLessons = []);

  // ---------- 13 ----------
  lessons.push({
    id: "scss-if",
    title: "@if და @else",
    shortTitle: "@if / @else",
    theory:
      "@if ამოწმებს პირობას და მხოლოდ მაშინ გამოსცემს სტილს, თუ ის ჭეშმარიტია; @else — საწინააღმდეგო შემთხვევაში. `@if $dark { … } @else { … }`. ხშირად mixin-ის შიგნით გამოიყენება — ერთი mixin ორ ვარიანტს აწარმოებს პარამეტრის მიხედვით.",
    analogy:
      "@if — გზაჯვარედინი: „თუ ბნელა — ჩართე ფარები, თუ არა — ჩააქრე“. კომპილატორი პირობის მიხედვით ერთ ან მეორე გზას ადგება.",
    physicalLabel: "სად გამოვიყენოთ",
    physical:
      "თემების (ღია/ბნელი) mixin-ებში, ან როცა ცვლადის მიხედვით ერთი კომპონენტი სხვადასხვანაირად უნდა გამოიყურებოდეს. ლოგიკა SCSS-ში წყდება, CSS კი სუფთა გამოდის.",
    challenge: "$theme არის dark; @if-ით მიეცი .panel-ს მუქი ფონი (#111827), else-ში კი ღია.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="panel">პანელი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "$theme: dark;\n\n.panel {\n  padding: 24px;\n  @if $theme == dark {\n    background: #111827;\n    color: #f9fafb;\n  } @else {\n    background: #f9fafb;\n    color: #111827;\n  }\n}",
        function (doc, win) {
          const p = doc.querySelector(".panel");
          if (!p) return;
          const ok = CFZ.isColorNear(win.getComputedStyle(p).backgroundColor, 17, 24, 39, 40);
          setChallengeResult(ok, ok ? "შესრულებულია: @if-მა მუქი შტო აირჩია." : "$theme == dark-ზე ფონი მუქი (#111827) უნდა იყოს.");
        }
      );
      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "სცადე" }),
          CFZ.el("p", { className: "breakdown-note", text: "შეცვალე პირველი სტრიქონი $theme: light; — შუა პანელში დაინახავ, რომ კომპილირებული CSS ღია ვარიანტზე გადაირთვება." }),
        ])
      );
    },
  });

  // ---------- 14 ----------
  lessons.push({
    id: "scss-each",
    title: "@each — სია და რუკა",
    shortTitle: "@each",
    theory:
      "@each ატარებს სიის ან რუკის ყველა ელემენტს. სია: `@each $c in red, green, blue { … }`. რუკა (გასაღები→მნიშვნელობა): `$m: (sm: 8px, lg: 24px); @each $k, $v in $m { … }`. იდეალურია მსგავსი კლასების სერიის დასაგენერირებლად.",
    analogy:
      "@each — დარიგება: „თითოეულ მოსწავლეს მიეცი რვეული“. ერთ წესს წერ, კომპილატორი კი მას სიის ყველა წევრზე იმეორებს.",
    physicalLabel: "პრაქტიკული ძალა",
    physical:
      "ფერების, ზომების, სოციალური ხატულების უტილიტარული კლასების გენერაცია — ეს @each-ის სამყაროა. ერთი ციკლი ცვლის ათეულ ხელით დაწერილ წესს.",
    challenge: "სიიდან (red, green, blue) დააგენერირე კლასები .text-red / .text-green / .text-blue, თითო შესაბამისი ფერით.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<p class="text-red">წითელი</p><p class="text-green">მწვანე</p><p class="text-blue">ლურჯი</p>';
      const pg = CFZ.createScssPlayground(
        html,
        "$colors: red, green, blue;\n\n@each $c in $colors {\n  .text-#{$c} {\n    color: $c;\n    font-weight: 600;\n  }\n}",
        function (doc, win) {
          const blue = doc.querySelector(".text-blue");
          const green = doc.querySelector(".text-green");
          if (!blue || !green) return;
          const okB = CFZ.isColorNear(win.getComputedStyle(blue).color, 0, 0, 255, 60);
          const okG = CFZ.isColorNear(win.getComputedStyle(green).color, 0, 128, 0, 80);
          const ok = okB && okG;
          setChallengeResult(ok, ok ? "შესრულებულია: @each-მა სამივე კლასი დააგენერირა." : "თითო კლასი შესაბამისი ფერით უნდა შეიღებოს (გამოიყენე #{$c}).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 15 ----------
  lessons.push({
    id: "scss-for",
    title: "@for ციკლი",
    shortTitle: "@for",
    theory:
      "@for იმეორებს რიცხვების დიაპაზონზე: `@for $i from 1 through 3 { … }`. `through` ითვლის ბოლო რიცხვის ჩათვლით (1,2,3), `to` კი — ჩაუთვლელად (1,2). ხშირად spacing-ის ან grid-ის უტილიტების სერიის ასაგებად გამოიყენება.",
    analogy:
      "@for — საფეხურების ათვლა: „პირველიდან მესამემდე, თითო საფეხურზე დადგი ნიშანი“. რიცხვი ავტომატურად იზრდება.",
    physicalLabel: "through vs to",
    physical:
      "`through` — ბოლო ჩათვლით (1..N); `to` — ბოლოს გარეშე (1..N-1). დაშორებების სკალა (.p-1 … .p-6) ერთ ციკლში იბადება — Tailwind-ის მსგავსი უტილიტები სწორედ ასე იქმნება.",
    challenge: "@for-ით (1-დან 3-მდე, through) დააგენერირე .p-1 / .p-2 / .p-3 padding-ით $i * 8px.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="p-2" style="background:#eef">padding 2</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "@for $i from 1 through 3 {\n  .p-#{$i} {\n    padding: $i * 8px;\n  }\n}",
        function (doc, win) {
          const box = doc.querySelector(".p-2");
          if (!box) return;
          const pad = parseFloat(win.getComputedStyle(box).paddingTop);
          const ok = Math.abs(pad - 16) < 2;
          setChallengeResult(ok, ok ? "შესრულებულია: .p-2 = 16px (2 × 8px)." : ".p-2-ის padding 16px უნდა იყოს ($i * 8px). მიღებული: " + Math.round(pad) + "px.");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 16 ----------
  lessons.push({
    id: "scss-extend",
    title: "@extend და %placeholder",
    shortTitle: "@extend",
    theory:
      "@extend აზიარებს სტილს სელექტორებს შორის — ერთი ბაზისური ნაკრები მრავალ სელექტორზე. %placeholder არის „ჩონჩხი“, რომელიც ცალკე არ იბეჭდება, მაგრამ @extend-ით ერთვება. `%card { … }` და `.a { @extend %card; }` — .a იღებს %card-ის ყველა თვისებას.",
    analogy:
      "@extend — მემკვიდრეობა: ბაზისური „ბარათი“ იძლევა საერთო ფორმას, კონკრეტული ბარათები კი მას იზიარებენ და თავისას უმატებენ.",
    physicalLabel: "@extend vs @mixin",
    physical:
      "@mixin თითო ადგილას სტილს იმეორებს (მეტი CSS, მაგრამ არგუმენტებით მოქნილი). @extend სელექტორებს აჯგუფებს ერთ წესში (ნაკლები CSS, მაგრამ არგუმენტების გარეშე). მარტივი გაზიარებისთვის %placeholder + @extend ხშირად უფრო სუფთაა.",
    challenge: "შექმენი %card (ფონი + კიდე + padding) და @extend-ით მიაბი .info-ს.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="info">ინფო ბარათი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "%card {\n  background: #ffffff;\n  border: 1px solid #e5e7eb;\n  border-radius: 8px;\n  padding: 20px;\n}\n\n.info {\n  @extend %card;\n  color: #2563eb;\n}",
        function (doc, win) {
          const info = doc.querySelector(".info");
          if (!info) return;
          const cs = win.getComputedStyle(info);
          const pad = parseFloat(cs.paddingTop) >= 18;
          const border = parseFloat(cs.borderTopWidth) >= 1;
          const ok = pad && border;
          setChallengeResult(ok, ok ? "შესრულებულია: %card @extend-ით ჩაერთო." : ".info-მ %card-ის padding და კიდე უნდა მიიღოს (@extend %card).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 17 ----------
  lessons.push({
    id: "scss-recap",
    title: "რეკაპი და პარციალები",
    shortTitle: "რეკაპი",
    theory:
      "დიდ პროექტში SCSS იყოფა „პარციალებად“ — ფაილებად ქვედა ხაზით: _variables.scss, _buttons.scss. მათ ერთ მთავარ ფაილში აერთებ: `@use \"variables\";` (თანამედროვე გზა, სივრცის სახელით) ან ძველი `@import`. ცვლადები/mixin-ები საერთო ხდება. აქ, ერთ ფაილში, ამას ვერ ვუშვებთ — მაგრამ სინტაქსი სწორედ ეს არის. ამ დავალებაში ერთ პატარა კომპონენტში გააერთიანე ცვლადი + mixin + ჩალაგება.",
    analogy:
      "პარციალები — წიგნის თავები: თითო ცალკე ფაილში წერია, ყდა (მთავარი ფაილი) კი ყველას ერთ წიგნად კრავს. @use — სარჩევი, რომელიც თავებს აერთებს.",
    physicalLabel: "სად მიდის საქმე",
    physical:
      "რეალურ პროექტში: `styles/` საქაღალდე, შიგნით _variables, _mixins, _buttons, _layout; main.scss აკეთებს @use-ებს და კომპილირდება ერთ style.css-ად. ასე კოდი დალაგებული და მრავალჯერ გამოსაყენებელი რჩება.",
    challenge: "ააგე ღილაკი: $brand ცვლადი, @mixin button, ჩალაგებული &:hover — და მიაბი .cta-ს მწვანე ფონი.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<a class="cta">დაჯავშნა</a>';
      const pg = CFZ.createScssPlayground(
        html,
        "$brand: #16a34a;\n\n@mixin button($bg) {\n  display: inline-block;\n  padding: 12px 24px;\n  border-radius: 8px;\n  color: white;\n  background: $bg;\n\n  &:hover {\n    background: darken($bg, 10%);\n  }\n}\n\n.cta {\n  @include button($brand);\n}",
        function (doc, win) {
          const cta = doc.querySelector(".cta");
          if (!cta) return;
          const cs = win.getComputedStyle(cta);
          const green = CFZ.isColorNear(cs.backgroundColor, 22, 163, 74, 60);
          const padded = parseFloat(cs.paddingLeft) >= 20;
          const ok = green && padded;
          setChallengeResult(ok, ok ? "შესრულებულია: ცვლადი + mixin + ჩალაგება ერთად იმუშავა. 🎉" : ".cta-ს @include button($brand)-ით მწვანე ფონი და padding უნდა ჰქონდეს.");
        }
      );
      container.append(
        pg.element,
        CFZ.el("div", { className: "breakdown-panel" }, [
          CFZ.el("h4", { text: "შენ ისწავლე" }),
          CFZ.el("p", { className: "breakdown-note", text: "ცვლადები, ჩალაგება, &, ჩალაგებული თვისებები, @mixin/@include, @content, @function, მათემატიკა, ფერის ფუნქციები, ინტერპოლაცია, @if, @each, @for, @extend და პარციალები. ეს არის SCSS-ის ბირთვი — საკმარისი რეალური პროექტისთვის." }),
        ])
      );
    },
  });
})();
