(function () {
  const A = window.ngLesson;
  const BOOT = '\nbootstrapApplication(AppComponent, "#app");';

  A({
    id: "ng-intro", title: "რა არის Angular", short: "რა არის Angular",
    theory: "Angular არის ფრეიმვორკი დიდი ვებ-აპლიკაციებისთვის. ის სამივე ენას აერთიანებს: TypeScript — ლოგიკა, HTML — შაბლონი, CSS — სტილი. აპლიკაცია იყოფა კომპონენტებად — თითოს თავისი შაბლონი, ლოგიკა და სტილი აქვს.",
    analogy: "LEGO: ერთი დიდი გვერდის ნაცვლად ბევრი პატარა, დამოუკიდებელი ბლოკი, რომლებსაც ერთმანეთში აწყობ და ხელახლა იყენებ.",
    label: "რატომ ფრეიმვორკი",
    syntax: "სუფთა JavaScript-ით DOM-ის ხელით მართვა დიდ აპლიკაციაში სწრაფად რთულდება. Angular თავად ზრუნავს ეკრანის განახლებაზე: შენ მონაცემს ცვლი, ის კი ინტერფეისს ასწორებს. Angular იყენებს TypeScript-ს — ამიტომ იყო ის წინა თავში.",
    challenge: "შეცვალე სათაური და ნახე, როგორ განახლდება ეკრანი.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<h1>{{ title }}</h1>"\n})\nclass AppComponent {\n  title = "ჩემი პირველი Angular აპლიკაცია";\n}' + BOOT,
    test: 'return __tick().then(function(){ return __text("#app").length > 0; });',
    hint: "შეცვალე title-ის მნიშვნელობა.",
    note: "Angular-ს იყენებენ დიდი კომპანიები — Google, Microsoft, Deutsche Bank. მისი ძალა სწორედ სტრუქტურაშია: დიდ გუნდში ყველა ერთნაირად წერს.",
  });

  A({
    id: "ng-component", title: "კომპონენტი და @Component", short: "კომპონენტი",
    theory: "კომპონენტი Angular-ის საფუძველია. ის ჩვეულებრივი კლასია, რომელსაც @Component დეკორატორი ამშვენებს — იქ წერია selector (როგორ ჩაისვას HTML-ში) და template (რა დაიხატოს).",
    analogy: "ნახაზი და ეტიკეტი: selector — სახელი, რომლითაც კომპონენტს იძახებ; template — რა გამოჩნდება.",
    label: "სტრუქტურა",
    syntax: "@Component({ selector: \"app-card\", template: \"...\" }) — მერე კლასი, რომელშიც მონაცემები და მეთოდებია. selector ჩვეულებრივ პრეფიქსით იწყება (app-), რომ ჩვეულებრივ HTML ტეგებს არ აერიოს.",
    challenge: "შექმენი კომპონენტი selector-ითა და template-ით, სადაც ორი თვისება გამოჩნდება.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<h2>{{ saxeli }}</h2><p>ასაკი: {{ asaki }}</p>"\n})\nclass AppComponent {\n  saxeli = "ელენე";\n  asaki = 20;\n}' + BOOT,
    test: 'return __tick().then(function(){ var t = __text("#app"); return t.indexOf("ელენე") !== -1 && t.indexOf("20") !== -1; });',
    hint: "template-ში ჩასვი {{ saxeli }} და {{ asaki }}.",
    note: "ნამდვილ პროექტში კომპონენტი ჩვეულებრივ სამ ფაილად იყოფა: .ts (ლოგიკა), .html (შაბლონი) და .css (სტილი) — templateUrl და styleUrls-ით. აქ ყველაფერი ერთადაა, რომ ერთ ეკრანზე დაეტიოს.",
  });

  A({
    id: "ng-interpolation", title: "ინტერპოლაცია {{ }}", short: "ინტერპოლაცია",
    theory: "ორმაგი ფიგურული ფრჩხილები შაბლონში კლასის მნიშვნელობას ჩასვამს. შიგნით შეიძლება იყოს არა მხოლოდ თვისება, არამედ გამოსახულებაც: {{ a + b }} ან {{ user.name }}.",
    analogy: "შაბლონიანი ბლანკი: ხაზებზე მნიშვნელობები ავტომატურად ჩაისმება.",
    label: "რა შეიძლება და რა არა",
    syntax: "შეიძლება: არითმეტიკა, მეთოდის გამოძახება, ტერნარული ოპერატორი. არ შეიძლება: მინიჭება, new, ციკლი. შაბლონში ლოგიკა მინიმალური უნდა იყოს — რთული გამოთვლა კლასში გაიტანე.",
    challenge: "დაბეჭდე გამოთვლილი ჯამი და მეთოდის შედეგი ინტერპოლაციით.",
    starter: '@Component({\n  selector: "app-root",\n  template: "<p>ჯამი: {{ a + b }}</p><p>მისალმება: {{ gamarjoba() }}</p>"\n})\nclass AppComponent {\n  a = 7;\n  b = 5;\n  gamarjoba() {\n    return "სალამი, სამყარო";\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var t = __text("#app"); return t.indexOf("12") !== -1 && t.indexOf("სალამი") !== -1; });',
    hint: "{{ a + b }} და {{ gamarjoba() }}",
    note: "ინტერპოლაცია ავტომატურად იცავს XSS-ისგან: თუ ტექსტში HTML ტეგია, ის ტექსტად გამოჩნდება და არა კოდად. ეს Angular-ის ერთ-ერთი დიდი უპირატესობაა.",
  });

  A({
    id: "ng-property-binding", title: "თვისების ბმა [prop]", short: "[prop]",
    theory: "კვადრატული ფრჩხილები ატრიბუტს დინამიკურს ხდის: [disabled]=\"locked\" ნიშნავს, რომ ღილაკის მდგომარეობა locked ცვლადზეა დამოკიდებული.",
    analogy: "ჩვეულებრივი ატრიბუტი — ფიქსირებული ეტიკეტი; [ბმა] — ეტიკეტი, რომელიც ავტომატურად ახლდება.",
    label: "განსხვავება",
    syntax: "src=\"foto.jpg\" — ტექსტია. [src]=\"suratisMisamarti\" — ცვლადის მნიშვნელობაა. ბრჭყალებში ახლა გამოსახულება წერია, არა ტექსტი. ეს ყველაზე ხშირი შეცდომაა დამწყებებში.",
    challenge: "დააბლოკე ღილაკი [disabled] ბმით და დააყენე სათაური [title]-ით.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" [disabled]="dablokilia" [title]="mininishneba">დააჭირე</button>\'\n})\nclass AppComponent {\n  dablokilia = true;\n  mininishneba = "ეს ღილაკი დაბლოკილია";\n}' + BOOT,
    test: 'return __tick().then(function(){ var b = document.querySelector("#b"); return b && b.disabled === true && b.getAttribute("title") === "ეს ღილაკი დაბლოკილია"; });',
    hint: '[disabled]="dablokilia" და [title]="mininishneba"',
    note: "სცადე dablokilia გახადო false — ღილაკი გააქტიურდება. სწორედ ეს არის დეკლარაციული მიდგომა: შენ მდგომარეობას აღწერ, Angular კი ინტერფეისს ასწორებს.",
  });

  A({
    id: "ng-event-binding", title: "მოვლენის ბმა (event)", short: "(event)",
    theory: "მრგვალი ფრჩხილები მოვლენას უსმენს: (click)=\"gaketeba()\" ნიშნავს, რომ დაჭერაზე კლასის მეთოდი გამოიძახება.",
    analogy: "ღილაკზე მიბმული ზარი: დააჭერ — და შესაბამისი მოქმედება ხდება.",
    label: "$event",
    syntax: "(click), (input), (submit), (keyup) — ნებისმიერი DOM მოვლენა. მოვლენის ობიექტი $event-ით მიიღება: (input)=\"shecvla($event)\". მოქმედების შემდეგ Angular თავად ხატავს ეკრანს ხელახლა.",
    challenge: "დაამატე ღილაკი, რომელიც მრიცხველს ზრდის დაჭერაზე.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="matema()">+1</button> <span id="c">{{ raodenoba }}</span>\'\n})\nclass AppComponent {\n  raodenoba = 0;\n  matema() {\n    this.raodenoba = this.raodenoba + 1;\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelector("#c").textContent === "2"; });',
    hint: '(click)="matema()" და მეთოდში this.raodenoba++',
    note: "დააკვირდი: ეკრანის განახლება ხელით არსად დაგვიწერია. Angular ავტომატურად ამჩნევს ცვლილებას მოვლენის შემდეგ და შესაბამის ადგილს ახლებს.",
  });

  A({
    id: "ng-ngif", title: "*ngIf — პირობითი ჩვენება", short: "*ngIf",
    theory: "*ngIf ელემენტს მხოლოდ მაშინ ხატავს, თუ პირობა ჭეშმარიტია. თუ არა — ელემენტი საერთოდ არ არსებობს DOM-ში.",
    analogy: "ჩამრთველი: ჩართულია — ოთახი ჩანს; გამორთულია — ოთახი საერთოდ არ არის აშენებული.",
    label: "მნიშვნელოვანი",
    syntax: "*ngIf ელემენტს შლის, არა მალავს — ეს CSS-ის display:none-ისგან განსხვავდება. ვარსკვლავი აუცილებელია. თანამედროვე Angular-ში (17+) ალტერნატივაა ახალი სინტაქსი: @if (piroba) { ... }.",
    challenge: "აჩვენე შეტყობინება მხოლოდ მაშინ, როცა ჩართულია — და ღილაკით გადართე.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="gadartva()">გადართვა</button>\' +\n            \'<p id="msg" *ngIf="chans">ახლა ჩანს!</p>\'\n})\nclass AppComponent {\n  chans = false;\n  gadartva() {\n    this.chans = !this.chans;\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var before = document.querySelector("#msg"); return __click("#b").then(function(){ return __tick(); }).then(function(){ return before === null && document.querySelector("#msg") !== null; }); });',
    hint: '*ngIf="chans" და ღილაკზე this.chans = !this.chans',
    note: "სცადე *ngIf-ის ნაცვლად [hidden]=\"!chans\" — ელემენტი დარჩება DOM-ში, უბრალოდ დაიმალება. თუ შიგთავსი მძიმეა, *ngIf სჯობს: ის საერთოდ არ ხატავს.",
  });

  A({
    id: "ng-ngfor", title: "*ngFor — სიის ხატვა", short: "*ngFor",
    theory: "*ngFor მასივის თითო ელემენტისთვის იმეორებს შაბლონს: *ngFor=\"let x of items\" — თითო x-ისთვის ერთი ასლი.",
    analogy: "ბეჭდვის დაზგა: ერთი შაბლონი და იმდენი ასლი, რამდენი ჩანაწერიცაა.",
    label: "სასარგებლო",
    syntax: "ინდექსი ასე მიიღება: *ngFor=\"let x of items; let i = index\". ამ სასწავლო გარემოში $index ავტომატურად ხელმისაწვდომია. ნამდვილ Angular-ში დიდი სიებისთვის trackBy გამოიყენება, რომ ხელახლა არ დაიხატოს ყველაფერი.",
    challenge: "დახატე სია მასივიდან — უნდა გამოჩნდეს სამი პუნქტი.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<ul><li *ngFor="let studenti of studentebi">{{ $index + 1 }}. {{ studenti }}</li></ul>\'\n})\nclass AppComponent {\n  studentebi = ["ელენე", "ნატალი", "დავითი"];\n}' + BOOT,
    test: 'return __tick().then(function(){ var li = document.querySelectorAll("#app li"); return li.length === 3 && li[0].textContent.indexOf("ელენე") !== -1; });',
    hint: '*ngFor="let studenti of studentebi" და შიგნით {{ studenti }}',
    note: "*ngFor და *ngIf ერთსა და იმავე ელემენტზე ერთდროულად არ შეიძლება — ჩასვი ერთი მეორეში ან გამოიყენე ჩარჩო-ელემენტი.",
  });

  A({
    id: "ng-signals", title: "სიგნალები — signal()", short: "signal",
    theory: "სიგნალი თანამედროვე Angular-ის მდგომარეობის საშუალებაა. signal(0) ქმნის მნიშვნელობას, რომელსაც ფუნქციასავით კითხულობ — count() — და set()-ით ცვლი. Angular ზუსტად იცის, სად გამოიყენება და მხოლოდ იმ ადგილს ახლებს.",
    analogy: "სენსორი: მნიშვნელობა იცვლება და ყველა, ვინც მას უსმენს, მაშინვე იგებს.",
    label: "წაკითხვა და ჩაწერა",
    syntax: "შექმნა: count = signal(0). წაკითხვა: count() — ფრჩხილები აუცილებელია, შაბლონშიც: {{ count() }}. ჩაწერა: count.set(5) ან count.update(v => v + 1).",
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
    note: "სიგნალები Angular-ში 2023 წელს გაჩნდა და ახლა რეკომენდებული გზაა მდგომარეობისთვის. ძველ პროექტებში ჩვეულებრივ თვისებებს ან RxJS-ს ნახავ.",
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
    note: "computed-ის დიდი უპირატესობა ისაა, რომ ის მხოლოდ საჭიროებისას ითვლება და შედეგს ინახავს — თუ დამოკიდებულება არ შეცვლილა, ხელახლა არ გამოითვლება.",
  });

  A({
    id: "ng-input", title: "@Input — მშობლიდან შვილს", short: "@Input",
    theory: "კომპონენტები ერთმანეთს მონაცემს @Input-ით გადასცემენ: მშობელი შვილს თვისებას [ბმით] აწვდის.",
    analogy: "ფუნქციის არგუმენტი: შვილი კომპონენტი ფუნქციაა, @Input — მისი პარამეტრი.",
    label: "მიმართულება",
    syntax: "შვილში: @Input() title = \"\". მშობელში: <app-child [title]=\"chemiTeqsti\"></app-child>. მონაცემი ყოველთვის ზემოდან ქვემოთ მიედინება — ეს Angular-ის მთავარი პრინციპია.",
    challenge: "შექმენი შვილი კომპონენტი @Input-ით და გადაეცი მას მნიშვნელობა მშობლიდან.",
    starter: '@Component({\n  selector: "app-badge",\n  template: \'<span class="badge">{{ teqsti }}</span>\'\n})\nclass BadgeComponent {\n  @Input() teqsti = "ცარიელი";\n}\n\n@Component({\n  selector: "app-root",\n  template: \'<app-badge [teqsti]="shetyobineba"></app-badge>\'\n})\nclass AppComponent {\n  shetyobineba = "ახალი!";\n}' + BOOT,
    test: 'return __tick().then(function(){ return __text("#app").indexOf("ახალი!") !== -1; });',
    hint: 'შვილში @Input() teqsti; მშობელში <app-badge [teqsti]="shetyobineba">',
    note: "თანამედროვე Angular-ში @Input-ის ალტერნატივაა სიგნალური input(): teqsti = input(\"ცარიელი\"). პრინციპი იგივეა — მონაცემი ზემოდან ქვემოთ.",
  });

  A({
    id: "ng-output", title: "@Output — შვილიდან მშობელს", short: "@Output",
    theory: "უკუმიმართულებით — შვილიდან მშობლისკენ — მონაცემი მოვლენით მიდის: შვილს აქვს @Output() EventEmitter, რომელსაც emit()-ით უშვებს.",
    analogy: "შვილი ხმას იღებს („დამემატა!“), მშობელი კი უსმენს და რეაგირებს.",
    label: "წყვილი",
    syntax: "შვილში: @Output() daemata = new EventEmitter(); მერე this.daemata.emit(mnishvneloba). მშობელში: <app-child (daemata)=\"damushaveba($event)\">. $event-ში emit-ით გაგზავნილი მნიშვნელობაა.",
    challenge: "შვილმა ღილაკზე გაუშვას მოვლენა, მშობელმა კი მიიღოს და აჩვენოს.",
    starter: '@Component({\n  selector: "app-knopka",\n  template: \'<button id="b" (click)="gagzavna()">გაგზავნა</button>\'\n})\nclass KnopkaComponent {\n  @Output() daclicka = new EventEmitter();\n  gagzavna() {\n    this.daclicka.emit("გამარჯობა მშობელო");\n  }\n}\n\n@Component({\n  selector: "app-root",\n  template: \'<app-knopka (daclicka)="migeba($event)"></app-knopka><p id="m">{{ shetyobineba }}</p>\'\n})\nclass AppComponent {\n  shetyobineba = "ჯერ არაფერი";\n  migeba(v) {\n    this.shetyobineba = v;\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return typeof EventEmitter === "function" && __src.indexOf("@Output") !== -1 && __src.indexOf("emit") !== -1; });',
    hint: "@Output() daclicka = new EventEmitter(); და this.daclicka.emit(...)",
    note: "წესი მარტივია: მონაცემი ქვემოთ [@Input], მოვლენა ზემოთ (@Output). ეს ცალმხრივი ნაკადი დიდ აპლიკაციაშიც ინარჩუნებს სიცხადეს — ყოველთვის იცი, საიდან მოვიდა ცვლილება.",
  });

  A({
    id: "ng-service", title: "სერვისები და @Injectable", short: "სერვისი",
    theory: "სერვისი ჩვეულებრივი კლასია, რომელშიც ლოგიკა და მონაცემებია — არა ინტერფეისი. კომპონენტი ეკრანზე ხატვაზე ზრუნავს, სერვისი კი მონაცემებზე.",
    analogy: "რესტორანი: კომპონენტი — ოფიციანტი (ურთიერთობს სტუმართან), სერვისი — სამზარეულო (ამზადებს).",
    label: "რატომ",
    syntax: "@Injectable() კლასს „შესაყვანად“ ვარგისს ხდის. ერთი და იგივე სერვისი ბევრ კომპონენტს შეუძლია გამოიყენოს — და ყველა ერთსა და იმავე ეგზემპლარს იღებს, ანუ მონაცემიც საერთოა.",
    challenge: "შექმენი სერვისი მონაცემებით და გამოიყენე კომპონენტში.",
    starter: '@Injectable()\nclass StudentebisService {\n  sia = ["ელენე", "ნატალი"];\n  yvela() {\n    return this.sia;\n  }\n}\n\n@Component({\n  selector: "app-root",\n  template: \'<ul><li *ngFor="let s of studentebi">{{ s }}</li></ul>\'\n})\nclass AppComponent {\n  servisi = inject(StudentebisService);\n  studentebi = this.servisi.yvela();\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelectorAll("#app li").length === 2; });',
    hint: "@Injectable() კლასი, მერე inject(StudentebisService) კომპონენტში.",
    note: "სერვისში გატანილი ლოგიკა ადვილად სატესტია და ხელახლა გამოსაყენებელი — ის ინტერფეისზე არაფერს ხედავს, ამიტომ მისი შემოწმება ბრაუზერის გარეშეც შეიძლება.",
  });

  A({
    id: "ng-di", title: "Dependency Injection — inject()", short: "DI",
    theory: "Dependency Injection ნიშნავს, რომ კომპონენტი თავად არ ქმნის იმას, რაც სჭირდება — ის მას ითხოვს, Angular კი აწვდის. თანამედროვე სინტაქსია inject(Service).",
    analogy: "ონკანი კედელში: არ ჭრი ჭას — უბრალოდ ითხოვ წყალს და ის მოდის.",
    label: "სინგლტონი",
    syntax: "const svc = inject(MyService) — კლასის ველის დონეზე იწერება. ერთი და იგივე სერვისი ერთხელ იქმნება და ყველა მისი მთხოვნელი ერთსა და იმავე ეგზემპლარს იღებს. სწორედ ამიტომ არის სერვისი მდგომარეობის გაზიარების ბუნებრივი ადგილი.",
    challenge: "ორივე კომპონენტმა ერთი და იგივე სერვისი აიღოს და დაამტკიცოს, რომ მონაცემი საერთოა.",
    starter: '@Injectable()\nclass MtvleliService {\n  raodenoba = signal(0);\n  matema() {\n    this.raodenoba.update(function (v) { return v + 1; });\n  }\n}\n\n@Component({\n  selector: "app-knopka",\n  template: \'<button id="b" (click)="svc.matema()">+1</button>\'\n})\nclass KnopkaComponent {\n  svc = inject(MtvleliService);\n}\n\n@Component({\n  selector: "app-root",\n  template: \'<app-knopka></app-knopka><span id="v">{{ svc.raodenoba() }}</span>\'\n})\nclass AppComponent {\n  svc = inject(MtvleliService);\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelector("#v").textContent === "1"; });',
    hint: "ორივე კომპონენტში: svc = inject(MtvleliService)",
    note: "დააკვირდი: ღილაკი ერთ კომპონენტშია, მაჩვენებელი — მეორეში, და მაინც სინქრონულია. ეს არის სერვისით მდგომარეობის გაზიარება — Angular-ში ყველაზე გავრცელებული ხერხი.",
  });

  A({
    id: "ng-lifecycle", title: "ცხოვრების ციკლი — ngOnInit", short: "ცხოვრების ციკლი",
    theory: "კომპონენტს აქვს ცხოვრების ეტაპები. ngOnInit გამოიძახება მაშინ, როცა კომპონენტი შეიქმნა და @Input-ები უკვე მიღებულია — სწორედ იქ იწყება ჩვეულებრივ მონაცემების ჩატვირთვა.",
    analogy: "მაღაზიის გახსნა: ჯერ აშენება (constructor), მერე საქონლის დალაგება (ngOnInit), ბოლოს დახურვა (ngOnDestroy).",
    label: "რომელი როდის",
    syntax: "constructor — მხოლოდ დამოკიდებულებების აღება; ngOnInit — ინიციალიზაცია და მონაცემების ჩატვირთვა; ngOnDestroy — გასუფთავება (გამოწერების გაუქმება, ტაიმერების გაჩერება). მძიმე სამუშაო constructor-ში არ გააკეთო.",
    challenge: "ჩატვირთე მონაცემი ngOnInit-ში და აჩვენე ეკრანზე.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<p id="s">{{ statusi }}</p><ul><li *ngFor="let x of monacemebi">{{ x }}</li></ul>\'\n})\nclass AppComponent {\n  statusi = "იტვირთება...";\n  monacemebi = [];\n\n  ngOnInit() {\n    this.monacemebi = ["პირველი", "მეორე", "მესამე"];\n    this.statusi = "ჩაიტვირთა";\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelector("#s").textContent === "ჩაიტვირთა" && document.querySelectorAll("#app li").length === 3; });',
    hint: "ngOnInit() { this.monacemebi = [...]; this.statusi = \"ჩაიტვირთა\"; }",
    note: "ngOnDestroy-ს განსაკუთრებული მნიშვნელობა აქვს: თუ ტაიმერს ან გამოწერას არ გააჩერებ, ისინი კომპონენტის გაქრობის შემდეგაც იმუშავებს — ეს მეხსიერების გაჟონვაა.",
  });
})();
