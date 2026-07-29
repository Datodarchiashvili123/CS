(function () {
  const lessons = window.ScssLessons || (window.ScssLessons = []);

  function alphaOf(str) {
    const m = /rgba?\(([^)]+)\)/.exec(str || "");
    if (!m) return 1;
    const p = m[1].split(",");
    return p.length >= 4 ? parseFloat(p[3]) : 1;
  }

  // ---------- 7 ----------
  lessons.push({
    id: "scss-mixin-args",
    title: "@mixin არგუმენტებით",
    shortTitle: "mixin არგუმენტები",
    theory:
      "mixin-ს არგუმენტები აქვს — ისე, როგორც ფუნქციას: `@mixin pad($x) { padding: $x; }`, გამოძახება `@include pad(16px)`. არგუმენტს default-იც შეიძლება მისცე: `@mixin badge($bg, $fg: white)`. მაშინ $fg-ს გადაცემა სავალდებულო აღარაა.",
    analogy:
      "არგუმენტიანი mixin — რეცეპტი ცვალებადი ინგრედიენტით: „გააკეთე ბეჯი, ფონად X, ტექსტად Y“. ერთი რეცეპტი — მრავალი ვარიანტი.",
    physicalLabel: "default-ის ძალა",
    physical:
      "default მნიშვნელობა mixin-ს მოქნილს ხდის: ხშირი შემთხვევა უბრალო რჩება (`@include badge(red)`), იშვიათი კი — გადაფარვადი (`@include badge(red, black)`).",
    challenge: "შექმენი @mixin badge($bg, $fg: white) და მიუყენე .tag-ს მხოლოდ ფონის ფერით (წითელი).",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<span class="tag">ახალი</span>';
      const pg = CFZ.createScssPlayground(
        html,
        "@mixin badge($bg, $fg: white) {\n  background: $bg;\n  color: $fg;\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n\n.tag {\n  @include badge(#dc2626);\n}",
        function (doc, win) {
          const t = doc.querySelector(".tag");
          if (!t) return;
          const cs = win.getComputedStyle(t);
          const bg = CFZ.isColorNear(cs.backgroundColor, 220, 38, 38, 60);
          const fg = CFZ.isColorNear(cs.color, 255, 255, 255, 40);
          const ok = bg && fg;
          setChallengeResult(ok, ok ? "შესრულებულია: არგუმენტი გადავიდა, default იმუშავა." : "ფონი წითელი, ტექსტი კი default-ით თეთრი უნდა იყოს.");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 8 ----------
  lessons.push({
    id: "scss-content",
    title: "@content ბლოკები",
    shortTitle: "@content",
    theory:
      "@content mixin-ში ათავსებს იმ სტილს, რომელსაც @include-ისას ფიგურულ ფრჩხილებში გადასცემ. `@mixin card { border: 1px solid #ccc; @content; }` და შემდეგ `.p { @include card { color: red; } }` — `color: red` ჩაჯდება @content-ის ადგილას.",
    analogy:
      "@content — „ცარიელი ადგილი შაბლონში“. mixin გაძლევს ჩარჩოს, შენ კი შუაში ჩასვამ იმას, რაც ამ კონკრეტულ შემთხვევას სჭირდება.",
    physicalLabel: "ტიპური გამოყენება",
    physical:
      "@content-ის კლასიკური მაგალითი — media query mixin-ები: `@mixin phone { @media (max-width: 600px) { @content; } }`. მერე `@include phone { … }`-ით მარტივად წერ ადაპტურ სტილს.",
    challenge: "შექმენი @mixin card (რუხი კიდით) და @content-ით გადაეცი .note-ს წითელი ტექსტი.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="note">შენიშვნა</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "@mixin card {\n  border: 1px solid #ccc;\n  padding: 16px;\n  @content;\n}\n\n.note {\n  @include card {\n    color: #b91c1c;\n  }\n}",
        function (doc, win) {
          const n = doc.querySelector(".note");
          if (!n) return;
          const cs = win.getComputedStyle(n);
          const border = parseFloat(cs.borderTopWidth) >= 1;
          const red = CFZ.isColorNear(cs.color, 185, 28, 28, 60);
          const ok = border && red;
          setChallengeResult(ok, ok ? "შესრულებულია: @content ჩაჯდა mixin-ში." : "კიდე mixin-იდან, წითელი ტექსტი კი @content-იდან უნდა მოვიდეს.");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 9 ----------
  lessons.push({
    id: "scss-function",
    title: "@function და @return",
    shortTitle: "@function",
    theory:
      "@function ითვლის და აბრუნებს მნიშვნელობას @return-ით: `@function double($n) { @return $n * 2; }`. განსხვავება mixin-სგან: ფუნქცია მნიშვნელობას აბრუნებს (რიცხვს, ფერს), mixin — სტილის ბლოკს. ფუნქციას თვისების მნიშვნელობაში იძახებ: `width: double(20px)`.",
    analogy:
      "@function — კალკულატორი: შეაქვს რიცხვი, გამოაქვს პასუხი. mixin — მოქმედების ნაკრები. ერთი ითვლის, მეორე აწყობს.",
    physicalLabel: "სად გამოვიყენოთ",
    physical:
      "ფუნქციები კარგია გამეორებადი გამოთვლებისთვის: spacing-ის სკალა, ფერის ტონები, px→rem გადაყვანა. ლოგიკა ერთ ადგილას რჩება.",
    challenge: "შექმენი @function double($n), რომელიც აბრუნებს $n * 2-ს; დაადგინე .bar-ის width მისით (საბაზისო 60px).",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="bar">ზოლი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "@function double($n) {\n  @return $n * 2;\n}\n\n.bar {\n  width: double(60px);\n  height: 20px;\n  background: #6C4AB6;\n}",
        function (doc, win) {
          const b = doc.querySelector(".bar");
          if (!b) return;
          const w = parseFloat(win.getComputedStyle(b).width);
          const ok = Math.abs(w - 120) < 2;
          setChallengeResult(ok, ok ? "შესრულებულია: ფუნქციამ 120px დააბრუნა." : "width double(60px) = 120px უნდა იყოს (მიღებული: " + Math.round(w) + "px).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 10 ----------
  lessons.push({
    id: "scss-math",
    title: "მათემატიკა და math.div",
    shortTitle: "მათემატიკა",
    theory:
      "SCSS პირდაპირ ითვლის: `+ - *`. `10px * 2` = `20px`, ერთეული ინახება. გაყოფისთვის თანამედროვე Sass-ში სპეციალური ფუნქციაა — `math.div($a, $b)` (ძველ კოდში უბრალო `/` გვხვდებოდა, ახლა ის აღარ არის რეკომენდებული). ასე ითვლი grid-ის სვეტებს, პროპორციებს.",
    analogy:
      "SCSS-ის მათემატიკა — ჩაშენებული სახაზავი: ზომებს პირდაპირ ფურცელზე ითვლი, ხელით არ ერევი კალკულატორს.",
    physicalLabel: "რატომ math.div",
    physical:
      "ძველ Sass-ში `/` ორმაგ როლს თამაშობდა — გაყოფაც და CSS-ის „font: 16px/1.5“ მალამბიც. გაუგებრობის მოსახსნელად გაყოფა გადავიდა `math.div()`-ზე. ეს თანამედროვე, ცალსახა გზაა.",
    challenge: "დაითვალე .col-ის სიგანე: 960px-იანი ბადე გაყავი 4 სვეტად math.div-ით (= 240px).",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="col">სვეტი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "$grid: 960px;\n\n.col {\n  width: math.div($grid, 4);\n  height: 20px;\n  background: #0ea5e9;\n}",
        function (doc, win) {
          const c = doc.querySelector(".col");
          if (!c) return;
          const w = parseFloat(win.getComputedStyle(c).width);
          const ok = Math.abs(w - 240) < 2;
          setChallengeResult(ok, ok ? "შესრულებულია: 960 / 4 = 240px." : "width math.div(960px, 4) = 240px უნდა იყოს (მიღებული: " + Math.round(w) + "px).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 11 ----------
  lessons.push({
    id: "scss-color-fns",
    title: "ფერის ფუნქციები",
    shortTitle: "ფერის ფუნქციები",
    theory:
      "Sass-ს ჩაშენებული ფერის ფუნქციები აქვს: `lighten($c, 10%)` / `darken($c, 10%)` — სიკაშკაშეს ცვლის; `rgba($c, 0.5)` — ამატებს გამჭვირვალობას არსებულ ფერს; `mix($a, $b)` — ურევს ორ ფერს. ასე ერთი საბაზისო ფერიდან მთელ პალიტრას აგებ.",
    analogy:
      "ეს ფუნქციები — მხატვრის საშუალებები: ერთი საღებავიდან (ბრენდის ფერი) ღია და მუქი ტონები გამოგყავს, წყალს (გამჭვირვალობას) უმატებ ან ორ ფერს ურევ.",
    physicalLabel: "პრაქტიკული ღირებულება",
    physical:
      "border/hover ფერებს ხშირად ბაზისურიდან იღებენ: `border-color: darken($brand, 15%)`. ცვლი $brand-ს — მთელი პალიტრა ავტომატურად შეიცვლება.",
    challenge: "მიეცი .glass-ს ნახევრად გამჭვირვალე ლურჯი ფონი rgba(#2563eb, 0.5)-ით.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="glass">შუშა</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "$blue: #2563eb;\n\n.glass {\n  background: rgba($blue, 0.5);\n  padding: 24px;\n  color: #0b1220;\n}",
        function (doc, win) {
          const g = doc.querySelector(".glass");
          if (!g) return;
          const bg = win.getComputedStyle(g).backgroundColor;
          const a = alphaOf(bg);
          const ok = a > 0.3 && a < 0.75 && /rgba/.test(bg);
          setChallengeResult(ok, ok ? "შესრულებულია: rgba-მ გამჭვირვალობა დაამატა." : "ფონი ნახევრად გამჭვირვალე (alpha ≈ 0.5) უნდა იყოს — გამოიყენე rgba($blue, 0.5).");
        }
      );
      container.append(pg.element);
    },
  });

  // ---------- 12 ----------
  lessons.push({
    id: "scss-interpolation",
    title: "ინტერპოლაცია #{}",
    shortTitle: "ინტერპოლაცია",
    theory:
      "`#{…}` სვამს ცვლადის მნიშვნელობას იქ, სადაც უბრალო ცვლადი არ მუშაობს: სელექტორის სახელში, თვისების სახელში ან სტრიქონის შუაში. `.icon-#{$name}` → `.icon-star`; `margin-#{$side}: 20px` → `margin-left: 20px`.",
    analogy:
      "ინტერპოლაცია — „ცარიელი ადგილის შევსება“ წინადადებაში: „მოგესალმები, #{სახელი}!“. ცვლადის მნიშვნელობა პირდაპირ ტექსტში ჩაჯდება.",
    physicalLabel: "როდის აუცილებელია",
    physical:
      "ჩვეულებრივ `color: $c` მუშაობს ცვლადის გარეშეც. მაგრამ სელექტორის ან თვისების *სახელში* ცვლადს ვერ ჩასვამ პირდაპირ — იქ #{} სავალდებულოა.",
    challenge: "გამოიყენე ინტერპოლაცია: $side: left; მიეცი .box-ს margin-#{$side}: 24px.",
    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const html = '<div class="box">ბლოკი</div>';
      const pg = CFZ.createScssPlayground(
        html,
        "$side: left;\n\n.box {\n  margin-#{$side}: 24px;\n  background: #eef;\n  padding: 10px;\n}",
        function (doc, win) {
          const b = doc.querySelector(".box");
          if (!b) return;
          const ml = parseFloat(win.getComputedStyle(b).marginLeft);
          const ok = Math.abs(ml - 24) < 2;
          setChallengeResult(ok, ok ? "შესრულებულია: #{} სახელში ჩაჯდა." : "margin-left 24px უნდა იყოს — გამოიყენე margin-#{$side}.");
        }
      );
      container.append(pg.element);
    },
  });
})();
