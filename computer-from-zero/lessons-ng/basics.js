(function () {
  const A = window.ngLesson;
  const BOOT = '\nbootstrapApplication(AppComponent, "#app");';

  A({
    id: "ng-intro", title: "რა არის Angular", short: "რა არის Angular",
    theory: "Angular არის ფრეიმვორკი დიდი ვებ-აპლიკაციებისთვის. ის სამივე ენას აერთიანებს: TypeScript — ლოგიკა, HTML — შაბლონი, CSS — სტილი. აპლიკაცია იყოფა კომპონენტებად — თითოს თავისი შაბლონი, ლოგიკა და სტილი აქვს.",
    analogy: "LEGO: ერთი დიდი გვერდის ნაცვლად ბევრი პატარა, დამოუკიდებელი ბლოკი, რომლებსაც ერთმანეთში აწყობ და ხელახლა იყენებ.",
    label: "თანამედროვე Angular (v22)",
    syntax: "ბოლო წლებში Angular მკვეთრად გამარტივდა: კომპონენტები ნაგულისხმევად standalone-ია (NgModule აღარ სჭირდება), მდგომარეობა სიგნალებზეა, შაბლონში @if/@for გამოიყენება (*ngIf/*ngFor-ის ნაცვლად), ცვლილების აღმოჩენა zoneless-ია და Zone.js აღარ ჩაირთვება.",
    challenge: "შეცვალე სათაური და ნახე, როგორ განახლდება ეკრანი.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<h1>{{ title }}</h1>"\n})\nclass AppComponent {\n  title = "ჩემი პირველი Angular აპლიკაცია";\n}' + BOOT,
    test: 'return __tick().then(function(){ return __text("#app").length > 0; });',
    hint: "შეცვალე title-ის მნიშვნელობა.",
    note: "თუ სახელმძღვანელოში NgModule, *ngIf ან @Input() დეკორატორი ნახე — ის ძველია (Angular 14-მდე). ეს კურსი თანამედროვე სტილზეა: standalone, სიგნალები და @if/@for.",
  });

  A({
    id: "ng-component", title: "კომპონენტი და @Component", short: "კომპონენტი",
    theory: "კომპონენტი Angular-ის საფუძველია. ის ჩვეულებრივი კლასია, რომელსაც @Component დეკორატორი ამშვენებს — იქ წერია selector (როგორ ჩაისვას) და template (რა დაიხატოს).",
    analogy: "ნახაზი და ეტიკეტი: selector — სახელი, რომლითაც კომპონენტს იძახებ; template — რა გამოჩნდება.",
    label: "standalone ნაგულისხმევია",
    syntax: "Angular 19-იდან კომპონენტი ავტომატურად standalone-ია — „standalone: true“ ხელით წერა აღარ გჭირდება და NgModule არსად არ არის საჭირო. თუ სხვა კომპონენტს იყენებ შაბლონში, მას imports-ში ჩამოთვლი.",
    challenge: "შექმენი კომპონენტი selector-ითა და template-ით, სადაც ორი თვისება გამოჩნდება.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<h2>{{ saxeli }}</h2><p>ასაკი: {{ asaki }}</p>"\n})\nclass AppComponent {\n  saxeli = "ელენე";\n  asaki = 20;\n}' + BOOT,
    test: 'return __tick().then(function(){ var t = __text("#app"); return t.indexOf("ელენე") !== -1 && t.indexOf("20") !== -1; });',
    hint: "template-ში ჩასვი {{ saxeli }} და {{ asaki }}.",
    note: "ნამდვილ პროექტში კომპონენტი სამ ფაილად იყოფა: .ts, .html და .css (templateUrl და styleUrl-ით). აქ ერთადაა, რომ ერთ ეკრანზე დაეტიოს.",
  });

  A({
    id: "ng-interpolation", title: "ინტერპოლაცია {{ }}", short: "ინტერპოლაცია",
    theory: "ორმაგი ფიგურული ფრჩხილები შაბლონში მნიშვნელობას ჩასვამს. შიგნით შეიძლება იყოს არა მხოლოდ თვისება, არამედ გამოსახულებაც: {{ a + b }} ან {{ user.name }}.",
    analogy: "შაბლონიანი ბლანკი: ხაზებზე მნიშვნელობები ავტომატურად ჩაისმება.",
    label: "რა შეიძლება და რა არა",
    syntax: "შეიძლება: არითმეტიკა, მეთოდის გამოძახება, ტერნარული ოპერატორი. არ შეიძლება: მინიჭება, new, ციკლი. შაბლონში ლოგიკა მინიმალური უნდა იყოს — რთული გამოთვლა კლასში გაიტანე.",
    challenge: "დაბეჭდე გამოთვლილი ჯამი და მეთოდის შედეგი ინტერპოლაციით.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<p>ჯამი: {{ a + b }}</p><p>მისალმება: {{ gamarjoba() }}</p>"\n})\nclass AppComponent {\n  a = 7;\n  b = 5;\n  gamarjoba() {\n    return "სალამი, სამყარო";\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var t = __text("#app"); return t.indexOf("12") !== -1 && t.indexOf("სალამი") !== -1; });',
    hint: "{{ a + b }} და {{ gamarjoba() }}",
    note: "ინტერპოლაცია ავტომატურად იცავს XSS-ისგან: თუ ტექსტში HTML ტეგია, ის ტექსტად გამოჩნდება და არა კოდად.",
  });

  A({
    id: "ng-property-binding", title: "თვისების ბმა [prop]", short: "[prop]",
    theory: "კვადრატული ფრჩხილები ატრიბუტს დინამიკურს ხდის: [disabled]=\"locked\" ნიშნავს, რომ ღილაკის მდგომარეობა locked-ზეა დამოკიდებული.",
    analogy: "ჩვეულებრივი ატრიბუტი — ფიქსირებული ეტიკეტი; [ბმა] — ეტიკეტი, რომელიც ავტომატურად ახლდება.",
    label: "განსხვავება",
    syntax: "src=\"foto.jpg\" — ტექსტია. [src]=\"suratisMisamarti\" — ცვლადის მნიშვნელობაა. ბრჭყალებში ახლა გამოსახულება წერია, არა ტექსტი. ეს ყველაზე ხშირი შეცდომაა დამწყებებში.",
    challenge: "დააბლოკე ღილაკი [disabled] ბმით და დააყენე სათაური [title]-ით.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" [disabled]="dablokilia" [title]="mininishneba">დააჭირე</button>\'\n})\nclass AppComponent {\n  dablokilia = true;\n  mininishneba = "ეს ღილაკი დაბლოკილია";\n}' + BOOT,
    test: 'return __tick().then(function(){ var b = document.querySelector("#b"); return b && b.disabled === true && b.getAttribute("title") === "ეს ღილაკი დაბლოკილია"; });',
    hint: '[disabled]="dablokilia" და [title]="mininishneba"',
    note: "სცადე dablokilia გახადო false — ღილაკი გააქტიურდება. ეს არის დეკლარაციული მიდგომა: შენ მდგომარეობას აღწერ, Angular კი ინტერფეისს ასწორებს.",
  });

  A({
    id: "ng-event-binding", title: "მოვლენის ბმა (event)", short: "(event)",
    theory: "მრგვალი ფრჩხილები მოვლენას უსმენს: (click)=\"gaketeba()\" ნიშნავს, რომ დაჭერაზე კლასის მეთოდი გამოიძახება.",
    analogy: "ღილაკზე მიბმული ზარი: დააჭერ — და შესაბამისი მოქმედება ხდება.",
    label: "$event",
    syntax: "(click), (input), (submit), (keyup) — ნებისმიერი DOM მოვლენა. მოვლენის ობიექტი $event-ით მიიღება: (input)=\"shecvla($event)\".",
    challenge: "დაამატე ღილაკი, რომელიც მრიცხველს ზრდის დაჭერაზე.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="matema()">+1</button> <span id="c">{{ raodenoba }}</span>\'\n})\nclass AppComponent {\n  raodenoba = 0;\n  matema() {\n    this.raodenoba = this.raodenoba + 1;\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelector("#c").textContent === "2"; });',
    hint: '(click)="matema()" და მეთოდში this.raodenoba + 1',
    note: "ეკრანის განახლება ხელით არსად დაგვიწერია. Angular v21-იდან ცვლილების აღმოჩენა zoneless-ია და სიგნალებს ეყრდნობა — ამიტომ სიგნალები რეკომენდებული გზაა მდგომარეობისთვის.",
  });

  A({
    id: "ng-ngif", title: "@if — პირობითი ჩვენება", short: "@if",
    theory: "თანამედროვე Angular-ში პირობა შაბლონში @if ბლოკით იწერება: @if (piroba) { ... } @else { ... }. ეს ჩაშენებული სინტაქსია — არაფრის იმპორტი არ სჭირდება.",
    analogy: "ჩვეულებრივი if კოდში — ოღონდ შაბლონში და HTML-ზე.",
    label: "ძველი და ახალი",
    syntax: "ძველი: <p *ngIf=\"chans\">...</p> — საჭიროებდა CommonModule-ის იმპორტს. ახალი: @if (chans) { <p>...</p> } @else if (sxva) { ... } @else { ... }. ახალი სინტაქსი უფრო წაკითხვადია, სწრაფია და @else-საც სრულად უჭერს მხარს.",
    challenge: "აჩვენე შეტყობინება @if-ით და ღილაკით გადართე — @else-იც დაამატე.",
    starter: '@Component({\n  selector: "app-root",\n  template: `\n    <button id="b" (click)="gadartva()">გადართვა</button>\n    @if (chans()) {\n      <p id="msg">ახლა ჩანს!</p>\n    } @else {\n      <p id="hidden">დამალულია</p>\n    }\n  `\n})\nclass AppComponent {\n  chans = signal(false);\n  gadartva() {\n    this.chans.update(function (v) { return !v; });\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var a = document.querySelector("#msg") === null && document.querySelector("#hidden") !== null; return __click("#b").then(function(){ return __tick(); }).then(function(){ return a && document.querySelector("#msg") !== null; }); });',
    hint: "@if (chans()) { ... } @else { ... }",
    note: "@if ელემენტს DOM-იდან შლის, არა მალავს. თუ მხოლოდ ვიზუალურად უნდა დამალო (ადგილი კი დარჩეს) — CSS გამოიყენე.",
  });

  A({
    id: "ng-ngfor", title: "@for — სიის ხატვა", short: "@for",
    theory: "სიის დასახატად @for ბლოკია: @for (item of items; track item.id) { ... }. track სავალდებულოა — ის Angular-ს ეუბნება, როგორ ამოიცნოს თითო ელემენტი.",
    analogy: "ბეჭდვის დაზგა: ერთი შაბლონი და იმდენი ასლი, რამდენი ჩანაწერიცაა.",
    label: "track და @empty",
    syntax: "track-ისთვის უნიკალური მნიშვნელობა მიუთითე (item.id); თუ სია სტატიკურია, $index გამოდგება. @empty ბლოკი ცარიელი სიის შემთხვევაში ჩაირთვება. ხელმისაწვდომია $index, $first, $last, $even, $odd.",
    challenge: "დახატე სია @for-ით (track-ით) და დაამატე @empty ბლოკი.",
    starter: '@Component({\n  selector: "app-root",\n  template: `\n    <ul>\n      @for (studenti of studentebi(); track studenti) {\n        <li>{{ $index + 1 }}. {{ studenti }}</li>\n      } @empty {\n        <li id="carieli">სია ცარიელია</li>\n      }\n    </ul>\n  `\n})\nclass AppComponent {\n  studentebi = signal(["ელენე", "ნატალი", "დავითი"]);\n}' + BOOT,
    test: 'return __tick().then(function(){ var li = document.querySelectorAll("#app li"); return li.length === 3 && li[0].textContent.indexOf("ელენე") !== -1 && document.querySelector("#carieli") === null; });',
    hint: "@for (s of studentebi(); track s) { <li>{{ s }}</li> } @empty { ... }",
    note: "სცადე: სიგნალს ცარიელი მასივი მიეცი — signal([]) — და @empty ბლოკი გამოჩნდება. ეს ძველ *ngFor-ს არ შეეძლო, ცალკე *ngIf სჭირდებოდა.",
  });

  A({
    id: "ng-switch", title: "@switch — მრავალი ვარიანტი", short: "@switch",
    theory: "როცა ერთი მნიშვნელობის მიხედვით რამდენიმე ვარიანტიდან ირჩევ, @switch უფრო წაკითხვადია, ვიდრე @if-ების ჯაჭვი.",
    analogy: "ლიფტის ღილაკები: ერთი მნიშვნელობა და თითოსთვის თავისი ეკრანი.",
    label: "სინტაქსი",
    syntax: "@switch (mnishvneloba) { @case (\"a\") { ... } @case (\"b\") { ... } @default { ... } }. break არ სჭირდება — @case-ები ერთმანეთში არ „გადმოვარდება“. @default არჩევითია.",
    challenge: "აჩვენე სხვადასხვა შიგთავსი როლის მიხედვით @switch-ით.",
    starter: '@Component({\n  selector: "app-root",\n  template: `\n    @switch (roli()) {\n      @case ("admin") {\n        <b id="a">ადმინისტრატორის პანელი</b>\n      }\n      @case ("student") {\n        <span id="s">სტუდენტის გვერდი</span>\n      }\n      @default {\n        <i id="d">სტუმარი</i>\n      }\n    }\n  `\n})\nclass AppComponent {\n  roli = signal("student");\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelector("#s") !== null && document.querySelector("#a") === null && document.querySelector("#d") === null; });',
    hint: '@switch (roli()) { @case ("student") { ... } @default { ... } }',
    note: "სცადე roli-ს მნიშვნელობა შეცვალო „admin“-ზე ან უცნობზე — ნახავ, როგორ გადაირთვება ბლოკები. ძველი ვარიანტი [ngSwitch]/*ngSwitchCase დირექტივები იყო.",
  });

  A({
    id: "ng-signals", title: "სიგნალები — signal()", short: "signal",
    theory: "სიგნალი თანამედროვე Angular-ის მდგომარეობის საშუალებაა. signal(0) ქმნის მნიშვნელობას, რომელსაც ფუნქციასავით კითხულობ — count() — და set()-ით ცვლი. Angular ზუსტად იცის, სად გამოიყენება და მხოლოდ იმ ადგილს ახლებს.",
    analogy: "სენსორი: მნიშვნელობა იცვლება და ყველა, ვინც მას უსმენს, მაშინვე იგებს.",
    label: "რატომ სიგნალები",
    syntax: "შექმნა: count = signal(0). წაკითხვა: count() — ფრჩხილები აუცილებელია, შაბლონშიც. ჩაწერა: count.set(5) ან count.update(v => v + 1). Angular v21-იდან ცვლილების აღმოჩენა zoneless-ია და სწორედ სიგნალებს ეყრდნობა.",
    challenge: "შექმენი სიგნალი და აჩვენე მისი მნიშვნელობა შაბლონში.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<p id="v">მნიშვნელობა: {{ raodenoba() }}</p>\'\n})\nclass AppComponent {\n  raodenoba = signal(10);\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelector("#v").textContent.indexOf("10") !== -1; });',
    hint: "raodenoba = signal(10) და შაბლონში {{ raodenoba() }}",
    note: "ყველაზე ხშირი შეცდომა — ფრჩხილების დავიწყება: {{ raodenoba }} დაბეჭდავს ფუნქციას და არა მნიშვნელობას. სცადე და ნახე განსხვავება.",
  });

  A({
    id: "ng-signal-update", title: "set, update და ცვლილება", short: "set / update",
    theory: "სიგნალის შესაცვლელად ორი გზაა: set() ახალ მნიშვნელობას პირდაპირ აყენებს, update() კი ძველიდან ახალს ითვლის.",
    analogy: "set — „დააყენე 10-ზე“; update — „მიუმატე ერთი იმას, რაც ახლა არის“.",
    label: "რომელი როდის",
    syntax: "set მაშინ, როცა ახალი მნიშვნელობა უკვე იცი: name.set(\"ანა\"). update მაშინ, როცა ის ძველზეა დამოკიდებული: count.update(v => v + 1). მასივში დამატებისას ახალი მასივი დააბრუნე: items.update(a => [...a, axali]).",
    challenge: "გააკეთე მრიცხველი ორი ღილაკით: +1 და განულება.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="plus" (click)="matema()">+1</button>\' +\n            \'<button id="zero" (click)="ganuleba()">განულება</button>\' +\n            \'<span id="v">{{ raodenoba() }}</span>\'\n})\nclass AppComponent {\n  raodenoba = signal(0);\n  matema() {\n    this.raodenoba.update(function (v) { return v + 1; });\n  }\n  ganuleba() {\n    this.raodenoba.set(0);\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#plus"); }).then(function(){ return __click("#plus"); }).then(function(){ return __tick(); }).then(function(){ var a = document.querySelector("#v").textContent === "2"; return __click("#zero").then(function(){ return __tick(); }).then(function(){ return a && document.querySelector("#v").textContent === "0"; }); });',
    hint: "update(v => v + 1) და set(0)",
    note: "სიგნალები Angular-ში 2023 წელს გაჩნდა და დღეს რეკომენდებული გზაა მდგომარეობისთვის. ძველ პროექტებში ჩვეულებრივ თვისებებს ან RxJS-ს ნახავ.",
  });

  A({
    id: "ng-computed", title: "computed() — გამოთვლილი მნიშვნელობა", short: "computed",
    theory: "computed() ქმნის სიგნალს, რომელიც სხვა სიგნალებზეა დამოკიდებული და ავტომატურად ითვლება ხელახლა, როცა ისინი იცვლება.",
    analogy: "Excel-ის ფორმულა: უჯრაში წერია „=A1*2“ — A1-ს რომ შეცვლი, შედეგიც თავად განახლდება.",
    label: "წესი",
    syntax: "double = computed(() => this.count() * 2). computed-ს პირდაპირ ვერ შეცვლი — ის მხოლოდ იკითხება. მასში მხოლოდ გამოთვლა უნდა იყოს, გვერდითი ეფექტების გარეშე.",
    challenge: "შექმენი computed, რომელიც ფასს რაოდენობაზე ამრავლებს.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="matema()">+1</button>\' +\n            \'<p>რაოდენობა: {{ raodenoba() }}</p>\' +\n            \'<p id="sul">სულ: {{ jami() }} ლარი</p>\'\n})\nclass AppComponent {\n  fasi = 25;\n  raodenoba = signal(2);\n  jami = computed(() => this.raodenoba() * this.fasi);\n  matema() {\n    this.raodenoba.update(function (v) { return v + 1; });\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var a = document.querySelector("#sul").textContent.indexOf("50") !== -1; return __click("#b").then(function(){ return __tick(); }).then(function(){ return a && document.querySelector("#sul").textContent.indexOf("75") !== -1; }); });',
    hint: "jami = computed(() => this.raodenoba() * this.fasi)",
    note: "computed მხოლოდ საჭიროებისას ითვლება და შედეგს ინახავს — თუ დამოკიდებულება არ შეცვლილა, ხელახლა არ გამოითვლება.",
  });

  A({
    id: "ng-input", title: "input() — მშობლიდან შვილს", short: "input()",
    theory: "კომპონენტები ერთმანეთს მონაცემს input-ით გადასცემენ. თანამედროვე Angular-ში ეს სიგნალური ფუნქციაა: teqsti = input(\"ნაგულისხმევი\") — და შაბლონში teqsti()-ით იკითხება.",
    analogy: "ფუნქციის არგუმენტი: შვილი კომპონენტი ფუნქციაა, input — მისი პარამეტრი.",
    label: "ძველი და ახალი",
    syntax: "ძველი: @Input() title = \"\". ახალი: title = input(\"\"). სავალდებულოსთვის: title = input.required<string>(). input მხოლოდ იკითხება — შვილი მას ვერ შეცვლის. მშობელში ბმა იგივეა: <app-badge [title]=\"chemiTeqsti\">.",
    challenge: "შექმენი შვილი კომპონენტი input()-ით და გადაეცი მას მნიშვნელობა მშობლიდან.",
    starter: '@Component({\n  selector: "app-badge",\n  template: \'<span class="badge">{{ teqsti() }}</span>\'\n})\nclass BadgeComponent {\n  teqsti = input("ცარიელი");\n}\n\n@Component({\n  selector: "app-root",\n  imports: [BadgeComponent],\n  template: \'<app-badge [teqsti]="shetyobineba()"></app-badge>\'\n})\nclass AppComponent {\n  shetyobineba = signal("ახალი!");\n}' + BOOT,
    test: 'return __tick().then(function(){ return __text("#app").indexOf("ახალი!") !== -1 && __src.indexOf("input(") !== -1; });',
    hint: 'შვილში teqsti = input("ცარიელი"); მშობელში <app-badge [teqsti]="shetyobineba()">',
    note: "სიგნალური input-ის დიდი უპირატესობა ისაა, რომ მასზე პირდაპირ შეიძლება computed-ის აგება: sruliSaxeli = computed(() => this.saxeli() + \" \" + this.gvari()).",
  });

  A({
    id: "ng-output", title: "output() — შვილიდან მშობელს", short: "output()",
    theory: "უკუმიმართულებით — შვილიდან მშობლისკენ — მონაცემი მოვლენით მიდის. თანამედროვე Angular-ში ეს output() ფუნქციაა, რომელსაც emit()-ით უშვებ.",
    analogy: "შვილი ხმას იღებს („დამემატა!“), მშობელი კი უსმენს და რეაგირებს.",
    label: "ძველი და ახალი",
    syntax: "ძველი: @Output() daemata = new EventEmitter<string>(). ახალი: daemata = output<string>(). გაგზავნა: this.daemata.emit(mnishvneloba). მშობელში: <app-child (daemata)=\"damushaveba($event)\">. EventEmitter-ის იმპორტი აღარ სჭირდება.",
    challenge: "შვილმა ღილაკზე გაუშვას მოვლენა output()-ით, მშობელმა კი მიიღოს.",
    starter: '@Component({\n  selector: "app-knopka",\n  template: \'<button id="b" (click)="gagzavna()">გაგზავნა</button>\'\n})\nclass KnopkaComponent {\n  daclicka = output();\n  gagzavna() {\n    this.daclicka.emit("გამარჯობა მშობელო");\n  }\n}\n\n@Component({\n  selector: "app-root",\n  imports: [KnopkaComponent],\n  template: \'<app-knopka (daclicka)="migeba($event)"></app-knopka><p id="m">{{ shetyobineba() }}</p>\'\n})\nclass AppComponent {\n  shetyobineba = signal("ჯერ არაფერი");\n  migeba(v) {\n    this.shetyobineba.set(v);\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __src.indexOf("output(") !== -1 && __src.indexOf("emit") !== -1 && document.querySelector("#m") !== null; });',
    hint: "daclicka = output(); და this.daclicka.emit(...)",
    note: "წესი მარტივია: მონაცემი ქვემოთ (input), მოვლენა ზემოთ (output). ეს ცალმხრივი ნაკადი დიდ აპლიკაციაშიც ინარჩუნებს სიცხადეს.",
  });

  A({
    id: "ng-model", title: "model() — ორმხრივი ბმა", short: "model()",
    theory: "model() არის input-ისა და output-ის კომბინაცია: შვილს შეუძლია მნიშვნელობა წაიკითხოს და შეცვალოს, ცვლილება კი მშობელს ავტომატურად უბრუნდება.",
    analogy: "საერთო რვეული: ორივე კითხულობს და ორივეს შეუძლია ჩაწეროს.",
    label: "სინტაქსი",
    syntax: "შვილში: value = model(0); მერე this.value.set(5) ან this.value.update(v => v + 1). მშობელში ბანანის ფრჩხილები: <app-slider [(value)]=\"xmauri\"></app-slider>. ეს ცვლის ძველ [(ngModel)]-ს კომპონენტებისთვის.",
    challenge: "შექმენი კომპონენტი model()-ით, რომელიც მნიშვნელობას თავადაც ცვლის.",
    starter: '@Component({\n  selector: "app-counter",\n  template: \'<button id="inc" (click)="matema()">+10</button> <span id="v">{{ value() }}</span>\'\n})\nclass CounterComponent {\n  value = model(0);\n  matema() {\n    this.value.update(function (v) { return v + 10; });\n  }\n}\n\n@Component({\n  selector: "app-root",\n  imports: [CounterComponent],\n  template: \'<app-counter [value]="dawyebiti()"></app-counter>\'\n})\nclass AppComponent {\n  dawyebiti = signal(5);\n}' + BOOT,
    test: 'return __tick().then(function(){ var a = document.querySelector("#v").textContent === "5"; return __click("#inc").then(function(){ return __tick(); }).then(function(){ return a && document.querySelector("#v").textContent === "15" && __src.indexOf("model(") !== -1; }); });',
    hint: "value = model(0) და this.value.update(v => v + 10)",
    note: "model() მაშინ გამოიყენე, როცა კომპონენტი მართლა უნდა ცვლიდეს მნიშვნელობას (ველი, სლაიდერი, გადამრთველი). სხვა შემთხვევაში input() + output() უფრო ცხადია.",
  });

  A({
    id: "ng-service", title: "სერვისები და @Injectable", short: "სერვისი",
    theory: "სერვისი ჩვეულებრივი კლასია, რომელშიც ლოგიკა და მონაცემებია — არა ინტერფეისი. კომპონენტი ეკრანზე ხატვაზე ზრუნავს, სერვისი კი მონაცემებზე.",
    analogy: "რესტორანი: კომპონენტი — ოფიციანტი (ურთიერთობს სტუმართან), სერვისი — სამზარეულო (ამზადებს).",
    label: "providedIn: root",
    syntax: "@Injectable({ providedIn: \"root\" }) სერვისს მთელ აპლიკაციაში ხელმისაწვდომს ხდის და ერთ ეგზემპლარს ქმნის (სინგლტონი). ეს ყველაზე გავრცელებული ჩაწერაა.",
    challenge: "შექმენი სერვისი მონაცემებით და გამოიყენე კომპონენტში.",
    starter: '@Injectable({ providedIn: "root" })\nclass StudentebisService {\n  sia = signal(["ელენე", "ნატალი"]);\n  yvela() {\n    return this.sia();\n  }\n}\n\n@Component({\n  selector: "app-root",\n  template: `\n    <ul>\n      @for (s of studentebi(); track s) {\n        <li>{{ s }}</li>\n      }\n    </ul>\n  `\n})\nclass AppComponent {\n  servisi = inject(StudentebisService);\n  studentebi = this.servisi.sia;\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelectorAll("#app li").length === 2; });',
    hint: "@Injectable({ providedIn: \"root\" }) და inject(StudentebisService)",
    note: "სერვისში გატანილი ლოგიკა ადვილად სატესტია — ის ინტერფეისზე არაფერს ხედავს, ამიტომ მისი შემოწმება ბრაუზერის გარეშეც შეიძლება.",
  });

  A({
    id: "ng-di", title: "Dependency Injection — inject()", short: "DI",
    theory: "Dependency Injection ნიშნავს, რომ კომპონენტი თავად არ ქმნის იმას, რაც სჭირდება — ის მას ითხოვს, Angular კი აწვდის. თანამედროვე სინტაქსია inject(Service).",
    analogy: "ონკანი კედელში: არ ჭრი ჭას — უბრალოდ ითხოვ წყალს და ის მოდის.",
    label: "inject vs constructor",
    syntax: "ძველი: constructor(private svc: MyService) {}. ახალი: svc = inject(MyService) — კლასის ველის დონეზე. inject უფრო მოქნილია: ის ფუნქციებშიც მუშაობს (guards, interceptors, resolvers) და მემკვიდრეობისას constructor-ის არგუმენტების გადაწერა აღარ გჭირდება.",
    challenge: "ორივე კომპონენტმა ერთი და იგივე სერვისი აიღოს და დაამტკიცოს, რომ მონაცემი საერთოა.",
    starter: '@Injectable({ providedIn: "root" })\nclass MtvleliService {\n  raodenoba = signal(0);\n  matema() {\n    this.raodenoba.update(function (v) { return v + 1; });\n  }\n}\n\n@Component({\n  selector: "app-knopka",\n  template: \'<button id="b" (click)="svc.matema()">+1</button>\'\n})\nclass KnopkaComponent {\n  svc = inject(MtvleliService);\n}\n\n@Component({\n  selector: "app-root",\n  imports: [KnopkaComponent],\n  template: \'<app-knopka></app-knopka><span id="v">{{ svc.raodenoba() }}</span>\'\n})\nclass AppComponent {\n  svc = inject(MtvleliService);\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelector("#v").textContent === "1"; });',
    hint: "ორივე კომპონენტში: svc = inject(MtvleliService)",
    note: "ღილაკი ერთ კომპონენტშია, მაჩვენებელი — მეორეში, და მაინც სინქრონულია. ეს არის სერვისით მდგომარეობის გაზიარება — Angular-ში ყველაზე გავრცელებული ხერხი.",
  });

  A({
    id: "ng-lifecycle", title: "ცხოვრების ციკლი — ngOnInit", short: "ცხოვრების ციკლი",
    theory: "კომპონენტს აქვს ცხოვრების ეტაპები. ngOnInit გამოიძახება მაშინ, როცა კომპონენტი შეიქმნა და input-ები უკვე მიღებულია.",
    analogy: "მაღაზიის გახსნა: ჯერ აშენება (constructor), მერე საქონლის დალაგება (ngOnInit), ბოლოს დახურვა (ngOnDestroy).",
    label: "რომელი როდის",
    syntax: "constructor — მხოლოდ დამოკიდებულებების აღება; ngOnInit — ინიციალიზაცია; ngOnDestroy — გასუფთავება. თანამედროვე Angular-ში ბევრი რამ ცხოვრების ციკლის გარეშეც კეთდება: effect() და computed() ავტომატურად რეაგირებენ ცვლილებაზე.",
    challenge: "ჩატვირთე მონაცემი ngOnInit-ში და აჩვენე ეკრანზე.",
    starter: '@Component({\n  selector: "app-root",\n  template: `\n    <p id="s">{{ statusi() }}</p>\n    <ul>\n      @for (x of monacemebi(); track x) {\n        <li>{{ x }}</li>\n      }\n    </ul>\n  `\n})\nclass AppComponent {\n  statusi = signal("იტვირთება...");\n  monacemebi = signal([]);\n\n  ngOnInit() {\n    this.monacemebi.set(["პირველი", "მეორე", "მესამე"]);\n    this.statusi.set("ჩაიტვირთა");\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelector("#s").textContent === "ჩაიტვირთა" && document.querySelectorAll("#app li").length === 3; });',
    hint: "ngOnInit() { this.monacemebi.set([...]); this.statusi.set(\"ჩაიტვირთა\"); }",
    note: "ngOnDestroy-ს განსაკუთრებული მნიშვნელობა აქვს: თუ ტაიმერს ან გამოწერას არ გააჩერებ, ისინი კომპონენტის გაქრობის შემდეგაც იმუშავებს — ეს მეხსიერების გაჟონვაა.",
  });
})();
