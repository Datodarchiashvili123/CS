(function () {
  const A = window.ngLesson;
  const BOOT = '\nbootstrapApplication(AppComponent, "#app");';

  A({
    id: "ng-forms", title: "ფორმები და შეყვანა", short: "ფორმები",
    theory: "ველიდან მნიშვნელობის აღება (input) მოვლენით ხდება: $event.target.value. Angular-ს აქვს ორმხრივი ბმაც — [(ngModel)] — მაგრამ საფუძველი ეს ორი ბმაა: [value] ქვემოთ, (input) ზემოთ.",
    analogy: "ორმხრივი გზა: მონაცემი ეკრანზე ჩანს და ეკრანიდან უკან ბრუნდება.",
    label: "შაბლონი",
    syntax: "<input [value]=\"saxeli()\" (input)=\"shecvla($event)\"> და მეთოდში: this.saxeli.set(e.target.value). Angular v22-ში სტაბილური გახდა Signal Forms — სიგნალებზე აგებული ფორმების სისტემა ვალიდაციით. ძველ პროექტებში Reactive Forms (FormControl/FormGroup) ნახავ.",
    challenge: "დააკავშირე ველი სიგნალთან — აკრეფისას ტექსტი ქვემოთ უნდა განახლდეს.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<input id="in" [value]="saxeli()" (input)="shecvla($event)">\' +\n            \'<p id="out">გამარჯობა, {{ saxeli() }}!</p>\'\n})\nclass AppComponent {\n  saxeli = signal("სტუმარო");\n  shecvla(e) {\n    this.saxeli.set(e.target.value);\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ var i = document.querySelector("#in"); if(!i) return false; i.value = "ელენე"; i.dispatchEvent(new Event("input")); return __tick().then(function(){ return document.querySelector("#out").textContent.indexOf("ელენე") !== -1; }); });',
    hint: '[value]="saxeli()" და (input)="shecvla($event)"',
    note: "ორმხრივი ბმა მოსახერხებელია, მაგრამ ცალმხრივი ნაკადი უფრო პროგნოზირებადია — ყოველთვის იცი, ვინ ცვლის მდგომარეობას. სწორედ ამიტომ დიდ აპლიკაციებში ხშირად ცალკე კითხულობენ და ცალკე წერენ.",
  });

  A({
    id: "ng-list-app", title: "სიის აპლიკაცია (CRUD)", short: "CRUD",
    theory: "დამატება, ჩვენება და წაშლა — ეს არის ყველა აპლიკაციის საფუძველი. ერთ კომპონენტში ვაერთიანებთ ყველაფერს, რაც აქამდე ვისწავლეთ.",
    analogy: "საყიდლების სია: წერ, ხედავ, შლი — უმარტივესი და ყველაზე გავრცელებული აპლიკაცია.",
    label: "მასივი სიგნალში",
    syntax: "მასივის შეცვლისას ახალი მასივი დააბრუნე: items.update(a => [...a, axali]) და წაშლისას items.update(a => a.filter(...)). ძველის პირდაპირ შეცვლა (push) Angular-მა შეიძლება ვერ შეამჩნიოს.",
    challenge: "დაამატე პუნქტი სიაში ღილაკზე დაჭერით.",
    starter: '@Component({\n  selector: "app-root",\n  template: `\n    <button id="add" (click)="damateba()">დამატება</button>\n    <ul>\n      @for (t of sia(); track t) {\n        <li>{{ t }}</li>\n      } @empty {\n        <li>სია ცარიელია</li>\n      }\n    </ul>\n    <p id="c">სულ: {{ sia().length }}</p>\n  `\n})\nclass AppComponent {\n  sia = signal(["პური", "რძე"]);\n  n = 0;\n\n  damateba() {\n    this.n = this.n + 1;\n    var axali = "პროდუქტი " + this.n;\n    this.sia.update(function (a) { return a.concat([axali]); });\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#add"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelectorAll("#app li").length === 3 && document.querySelector("#c").textContent.indexOf("3") !== -1; });',
    hint: "sia.update(a => a.concat([axali]))",
    note: "სცადე წაშლის ღილაკის დამატებაც: (click)=\"washla(t)\" და მეთოდში sia.update(a => a.filter(x => x !== t)). ეს უკვე სრული CRUD-ია.",
  });

  A({
    id: "ng-pipes", title: "პაიპები (pipes)", short: "პაიპები",
    theory: "პაიპი შაბლონში მნიშვნელობას გარდაქმნის ჩვენებამდე: {{ fasi | currency }}, {{ tarigi | date }}, {{ teqsti | uppercase }}. სინტაქსი ვერტიკალური ხაზია.",
    analogy: "ფილტრი ონკანზე: წყალი იგივეა, უბრალოდ გასვლისას იწმინდება.",
    label: "ჩაშენებული პაიპები",
    syntax: "uppercase, lowercase, titlecase, date, currency, number, json, async. პარამეტრიც შეიძლება: {{ tarigi | date:\"dd/MM/yyyy\" }}. საკუთარი პაიპი @Pipe დეკორატორით იქმნება.",
    challenge: "ამ სასწავლო გარემოში პაიპი არ არის — გამოიყენე ჩვეულებრივი მეთოდი იმავე შედეგისთვის.",
    starter: '// ნამდვილ Angular-ში ასე იქნებოდა:\n// <p>{{ saxeli | uppercase }}</p>\n// <p>{{ fasi | currency:"GEL" }}</p>\n\n@Component({\n  selector: "app-root",\n  template: \'<p id="u">{{ didAsoebit(saxeli) }}</p><p id="f">{{ fasadFormati(fasi) }}</p>\'\n})\nclass AppComponent {\n  saxeli = "elene";\n  fasi = 25.5;\n\n  didAsoebit(v) {\n    return String(v).toUpperCase();\n  }\n  fasadFormati(v) {\n    return v.toFixed(2) + " ₾";\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return document.querySelector("#u").textContent === "ELENE" && document.querySelector("#f").textContent.indexOf("25.50") !== -1; });',
    hint: "toUpperCase() და toFixed(2)",
    note: "პაიპი შაბლონს ასუფთავებს — ლოგიკა ერთ ადგილას იწერება და ყველგან გამოიყენება. ყურადღება: მძიმე გამოთვლა პაიპში არ ჩადო, ის ხშირად სრულდება.",
  });

  A({
    id: "ng-styles", title: "სტილები კომპონენტში", short: "სტილები",
    theory: "კომპონენტს შეიძლება ჰქონდეს საკუთარი სტილი, რომელიც მხოლოდ მასზე მოქმედებს — Angular ავტომატურად აიზოლირებს მას სხვა კომპონენტებისგან.",
    analogy: "თითო ოთახს თავისი შეღებვა აქვს და მეზობელს არ ეხება.",
    label: "როგორ",
    syntax: "@Component({ styles: [\".karti { color: red }\"] }) ან styleUrls: [\"./card.css\"]. კლასების დინამიკური მართვა: [class.active]=\"isActive\" ან [ngClass]=\"{ active: isActive }\". სტილისთვის: [style.width.px]=\"width\".",
    challenge: "დაამატე კლასი დინამიკურად [class.aqtiuri] ბმით.",
    starter: '@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="gadartva()">გადართვა</button>\' +\n            \'<p id="p" [class.aqtiuri]="aqtiuria">ეს აბზაცი კლასს იცვლის</p>\'\n})\nclass AppComponent {\n  aqtiuria = false;\n  gadartva() {\n    this.aqtiuria = !this.aqtiuria;\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ var p = document.querySelector("#p"); return p && (p.className.indexOf("aqtiuri") !== -1 || p.classList.contains("aqtiuri")); });',
    hint: '[class.aqtiuri]="aqtiuria"',
    note: "სტილის იზოლაცია (view encapsulation) Angular-ის დიდი უპირატესობაა: ერთი კომპონენტის CSS მეორეს ვერ გააფუჭებს — დიდ პროექტში ეს უზარმაზარ დროს ზოგავს.",
  });

  A({
    id: "ng-standalone", title: "თანამედროვე Angular — standalone, zoneless, OnPush", short: "თანამედროვე Angular",
    theory: "ბოლო ვერსიებში Angular მკვეთრად გამარტივდა: კომპონენტი ნაგულისხმევად standalone-ია (v19+), ცვლილების აღმოჩენა zoneless-ია და Zone.js აღარ ჩაირთვება (v21+), ხოლო v22-ში OnPush ნაგულისხმევი სტრატეგიაა.",
    analogy: "ადრე ყველა ხელსაწყო ცენტრალურ საწყობში ირიცხებოდა; ახლა თითოს თავისი ჩანთა აქვს — და საწყობი საერთოდ აღარ არსებობს.",
    label: "რა შეიცვალა",
    syntax: "„standalone: true“ ხელით წერა აღარ გჭირდება — ის ნაგულისხმევია. imports-ში მხოლოდ ის ჩამოთვალე, რასაც შაბლონი მართლა იყენებს. გაშვება ფუნქციური პროვაიდერებით: bootstrapApplication(AppComponent, { providers: [provideRouter(routes), provideHttpClient()] }).",
    challenge: "დაწერე კომპონენტი imports ველით — standalone აღარ იწერება, ის ნაგულისხმევია.",
    starter: '@Component({\n  selector: "app-root",\n  imports: [],\n  template: "<h3>{{ sataury }}</h3><p>standalone ნაგულისხმევია — ხელით წერა აღარ სჭირდება</p>"\n})\nclass AppComponent {\n  sataury = "თანამედროვე Angular v22";\n}' + BOOT,
    test: 'return __tick().then(function(){ return Array.isArray(AppComponent.__meta.imports) && __text("#app").indexOf("standalone") !== -1; });',
    hint: "მეტამონაცემებში დაამატე imports: []",
    note: "თუ სახელმძღვანელოში NgModule, declarations ან app.module.ts ნახე — ეს ძველი სტილია (Angular 14-მდე). zoneless-ის წყალობით აპლიკაცია უფრო სწრაფია და ცვლილებას სიგნალები იჭერენ.",
  });

  A({
    id: "ng-routing", title: "მარშრუტიზაცია (Router)", short: "მარშრუტიზაცია",
    theory: "Angular ერთგვერდიანი აპლიკაციაა (SPA): მისამართის შეცვლისას გვერდი არ იტვირთება თავიდან — Router უბრალოდ სხვა კომპონენტს ხატავს.",
    analogy: "ერთი შენობა, ბევრი ოთახი: კარებს ცვლი, შენობიდან არ გადიხარ.",
    label: "სტრუქტურა",
    syntax: "routes = [{ path: \"\", component: HomeComponent }, { path: \"users/:id\", component: UserComponent }, { path: \"**\", component: NotFoundComponent }]. შაბლონში <router-outlet></router-outlet> აჩვენებს მიმდინარე კომპონენტს, ნავიგაცია კი routerLink-ით ხდება.",
    challenge: "აღწერე მარშრუტების მასივი სამი გზით (მთავარი, პარამეტრიანი და 404).",
    starter: '// ნამდვილ Angular v22-ში:\n// bootstrapApplication(App, { providers: [provideRouter(routes)] });\n// <router-outlet /> და <a routerLink="/about">\n\nconst routes = [\n  { path: "", component: "HomeComponent" },\n  { path: "users/:id", component: "UserComponent" },\n  { path: "**", component: "NotFoundComponent" }\n];\n\n@Component({\n  selector: "app-root",\n  template: `<ul>@for (r of gzebi; track r.path) { <li>{{ r.path || "(მთავარი)" }} → {{ r.component }}</li> }</ul>`\n})\nclass AppComponent {\n  gzebi = routes;\n}' + BOOT,
    test: 'return __tick().then(function(){ return routes.length === 3 && routes.some(function(r){ return r.path.indexOf(":") !== -1; }) && routes.some(function(r){ return r.path === "**"; }) && document.querySelectorAll("#app li").length === 3; });',
    hint: 'მასივში სამი ობიექტი: "", "users/:id" და "**"',
    note: "\"**\" ყოველთვის ბოლოს უნდა იყოს — ის ყველა დარჩენილ მისამართს იჭერს. თუ ზემოთ დააყენებ, დანარჩენ მარშრუტებამდე ვერ მიაღწევ.",
  });

  A({
    id: "ng-http", title: "HTTP და მონაცემები სერვერიდან", short: "HTTP",
    theory: "რეალურ აპლიკაციაში მონაცემი სერვერიდან მოდის. Angular v22-ში ამისთვის სტაბილურია httpResource() — ის მოთხოვნას აგზავნის და შედეგს პირდაპირ სიგნალებად გაძლევს: value(), isLoading() და error().",
    analogy: "შეკვეთა სამზარეულოში: აგზავნი მოთხოვნას და პასუხს ელოდები — ინტერფეისი ამასობაში „იტვირთება“-ს აჩვენებს.",
    label: "შაბლონი",
    syntax: "თანამედროვე: users = httpResource(() => \"/api/users\"); შაბლონში კი users.isLoading(), users.value() და users.error(). რეგისტრაცია: provideHttpClient(). ძველი გზა: http = inject(HttpClient); this.http.get(...).subscribe(...). სამი მდგომარეობა ყოველთვის გაითვალისწინე: იტვირთება, შეცდომა, მონაცემი.",
    challenge: "დაასიმულირე ჩატვირთვა: ჯერ „იტვირთება“, მერე მონაცემი.",
    starter: '// ნამდვილ Angular v22-ში:\n// users = httpResource(() => "/api/users");\n// შაბლონში: users.isLoading(), users.value(), users.error()\n\n@Component({\n  selector: "app-root",\n  template: `\n    @if (itvirteba()) {\n      <p id="s">იტვირთება...</p>\n    }\n    <ul>\n      @for (u of users(); track u) {\n        <li>{{ u }}</li>\n      }\n    </ul>\n  `\n})\nclass AppComponent {\n  itvirteba = signal(true);\n  users = signal([]);\n\n  ngOnInit() {\n    var self = this;\n    setTimeout(function () {\n      self.users.set(["ელენე", "ნატალი"]);\n      self.itvirteba.set(false);\n    }, 20);\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return new Promise(function(r){ setTimeout(r, 120); }); }).then(function(){ return document.querySelectorAll("#app li").length === 2 && document.querySelector("#s") === null; });',
    hint: "ngOnInit-ში setTimeout, რომელიც users.set(...) და itvirteba.set(false) აკეთებს.",
    note: "ჩატვირთვისა და შეცდომის მდგომარეობები ხშირად ავიწყდებათ — მომხმარებელი კი ცარიელ ეკრანს უყურებს და ვერ ხვდება, რა ხდება. ყოველთვის აჩვენე, რომ სისტემა მუშაობს.",
  });

  A({
    id: "ng-cli", title: "Angular CLI და პროექტის სტრუქტურა", short: "CLI",
    theory: "Angular CLI არის ბრძანებათა ხაზის ხელსაწყო, რომელიც პროექტს ქმნის, კომპონენტებს აგენერირებს, სერვერს უშვებს და აპლიკაციას აწყობს.",
    analogy: "სამშენებლო ბრიგადა: ერთი ბრძანება და კარკასი უკვე დგას — ხელით არაფრის აწყობა არ გჭირდება.",
    label: "ძირითადი ბრძანებები",
    syntax: "npm install -g @angular/cli — დაყენება. ng new chemi-app — ახალი პროექტი. ng serve — დეველოპმენტ სერვერი (localhost:4200). ng generate component card (მოკლედ: ng g c card) — ახალი კომპონენტი. ng build — პროდაქშენ ვერსია.",
    challenge: "აღწერე პროექტის სტრუქტურა ობიექტად — უნდა შეიცავდეს src, app და კომპონენტების საქაღალდეს.",
    starter: '// ტიპური Angular პროექტი:\nconst struqtura = {\n  "src/main.ts": "აპლიკაციის გაშვების წერტილი",\n  "src/app/app.component.ts": "ძირითადი კომპონენტი",\n  "src/app/components/": "კომპონენტები",\n  "src/app/services/": "სერვისები",\n  "angular.json": "პროექტის კონფიგურაცია",\n  "package.json": "დამოკიდებულებები"\n};\n\n@Component({\n  selector: "app-root",\n  template: `<ul>@for (k of gasagebebi; track k) { <li>{{ k }}</li> }</ul>`\n})\nclass AppComponent {\n  gasagebebi = Object.keys(struqtura);\n}' + BOOT,
    test: 'return __tick().then(function(){ var k = Object.keys(struqtura); return k.length >= 5 && k.some(function(x){ return x.indexOf("src/app") !== -1; }) && document.querySelectorAll("#app li").length === k.length; });',
    hint: "ობიექტში მინიმუმ 5 გასაღები, მათ შორის src/app-ით დაწყებული.",
    note: "ng generate მხოლოდ ფაილებს არ ქმნის — ის სწორ სტრუქტურასა და სახელებსაც იცავს. გუნდში მუშაობისას ეს თანმიმდევრულობა ძალიან ღირებულია.",
  });

  A({
    id: "ng-best-practices", title: "საუკეთესო პრაქტიკა", short: "პრაქტიკა",
    theory: "Angular სტრუქტურის ფრეიმვორკია — მისი ღირებულება მაშინ ჩანს, როცა წესებს იცავ: პატარა კომპონენტები, ლოგიკა სერვისებში, ცალმხრივი მონაცემთა ნაკადი.",
    analogy: "სამშენებლო ნორმები: ერთ სახლში შეიძლება უგულებელყო, უბანში — არა.",
    label: "ხუთი წესი",
    syntax: "1) კომპონენტი პატარა იყოს — თუ 200 ხაზს სცდება, დაშალე. 2) ლოგიკა სერვისში გაიტანე. 3) მდგომარეობა სიგნალებში. 4) მონაცემი ქვემოთ (@Input), მოვლენა ზემოთ (@Output). 5) ngOnDestroy-ში გაასუფთავე ტაიმერები და გამოწერები.",
    challenge: "დაშალე: ლოგიკა სერვისში, ჩვენება კომპონენტში.",
    starter: '@Injectable()\nclass KalatiService {\n  nivtebi = signal([]);\n\n  damateba(n) {\n    this.nivtebi.update(function (a) { return a.concat([n]); });\n  }\n  raodenoba() {\n    return this.nivtebi().length;\n  }\n}\n\n@Component({\n  selector: "app-root",\n  template: \'<button id="b" (click)="damateba()">კალათაში დამატება</button>\' +\n            \'<p id="c">კალათაში: {{ svc.raodenoba() }}</p>\'\n})\nclass AppComponent {\n  svc = inject(KalatiService);\n  n = 0;\n\n  damateba() {\n    this.n = this.n + 1;\n    this.svc.damateba("ნივთი " + this.n);\n  }\n}' + BOOT,
    test: 'return __tick().then(function(){ return __click("#b"); }).then(function(){ return __click("#b"); }).then(function(){ return __tick(); }).then(function(){ return document.querySelector("#c").textContent.indexOf("2") !== -1; });',
    hint: "სერვისში signal და მეთოდები, კომპონენტში მხოლოდ inject და ჩვენება.",
    note: "შეამოწმე საკუთარი თავი კითხვით: „თუ ხვალ ინტერფეისს სრულად შევცვლი, რამდენი კოდი დამრჩება?“ თუ ბევრი — ლოგიკა სწორად გაქვს გამოყოფილი.",
  });

  // ---------- რეკაპი ----------
  window.AngularLessons.push({
    id: "ng-recap",
    title: "რეკაპი — მთელი Angular",
    shortTitle: "რეკაპი",
    theory: "კომპონენტიდან და შაბლონიდან — სიგნალებამდე, სერვისებამდე და DI-მდე. ეს არის ის ბაზა, რომლითაც უკვე ნამდვილი Angular აპლიკაცია იწერება.",
    analogy: "ექვსივე თავი ერთად: ტრანზისტორიდან, რომელიც პირველ თავში ვნახეთ, იმ აპლიკაციამდე, რომელსაც ახლა წერ.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "შემდეგი ნაბიჯები: Signal Forms, httpResource და interceptors, Router-ის guards, @defer (ზარმაცი ჩატვირთვა), SSR/hydration, ტესტირება (Vitest) და NgRx დიდი აპლიკაციის მდგომარეობისთვის. და რაც მთავარია — საკუთარი პროექტი.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const topics = [
        { to: "ng-component", title: "კომპონენტი", desc: "@Component, selector, template" },
        { to: "ng-interpolation", title: "შაბლონი", desc: "{{ }} ინტერპოლაცია" },
        { to: "ng-property-binding", title: "ბმები", desc: "[prop] და (event)" },
        { to: "ng-ngif", title: "@if / @for / @switch", desc: "კონტროლის ნაკადი შაბლონში" },
        { to: "ng-signals", title: "სიგნალები", desc: "signal, set, update" },
        { to: "ng-computed", title: "computed", desc: "გამოთვლილი მნიშვნელობა" },
        { to: "ng-input", title: "input() / output()", desc: "კომპონენტების კავშირი" },
        { to: "ng-service", title: "სერვისები", desc: "@Injectable, ლოგიკის გატანა" },
        { to: "ng-di", title: "DI", desc: "inject() და გაზიარებული მდგომარეობა" },
        { to: "ng-lifecycle", title: "ცხოვრების ციკლი", desc: "ngOnInit, ngOnDestroy" },
        { to: "ng-routing", title: "მარშრუტიზაცია", desc: "routes, router-outlet" },
      ];

      const stack = CFZ.el("div", { className: "recap-stack" }, topics.map(function (t, i) {
        return CFZ.el("button", {
          className: "recap-layer",
          attrs: { type: "button" },
          on: { click: function () { CFZ.goToLesson(t.to); } },
        }, [
          CFZ.el("span", { className: "recap-layer-num", text: String(i + 1) }),
          CFZ.el("span", { className: "recap-layer-body" }, [
            CFZ.el("strong", { className: "recap-layer-title", text: t.title }),
            CFZ.el("span", { className: "recap-layer-desc", text: t.desc }),
          ]),
          CFZ.el("span", { className: "recap-layer-arrow", attrs: { "aria-hidden": "true" }, text: "→" }),
        ]);
      }));

      const pg = CFZ.createAngularPlayground(
        '// პატარა სრული აპლიკაცია — ყველაფერი ერთად\n@Injectable({ providedIn: "root" })\nclass TodoService {\n  sia = signal(["ისწავლე Angular"]);\n  damateba(t) {\n    this.sia.update(function (a) { return a.concat([t]); });\n  }\n  washla(t) {\n    this.sia.update(function (a) { return a.filter(function (x) { return x !== t; }); });\n  }\n}\n\n@Component({\n  selector: "app-root",\n  template: `\n    <h3>ჩემი სია ({{ svc.sia().length }})</h3>\n    <button id="add" (click)="damateba()">დამატება</button>\n    <ul>\n      @for (t of svc.sia(); track t) {\n        <li>{{ t }} <button (click)="svc.washla(t)">✕</button></li>\n      } @empty {\n        <li>ცარიელია</li>\n      }\n    </ul>\n  `\n})\nclass AppComponent {\n  svc = inject(TodoService);\n  n = 0;\n  damateba() {\n    this.n = this.n + 1;\n    this.svc.damateba("ახალი საქმე " + this.n);\n  }\n}\n\nbootstrapApplication(AppComponent, "#app");',
        "return true;",
        function () {}
      );

      container.append(
        CFZ.el("p", { className: "breakdown-note", text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი სრული აპლიკაციაა — შეცვალე და გაუშვი." }),
        stack,
        CFZ.el("h4", { text: "ყველაფერი ერთად" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: Angular-ის საფუძვლები გაიარე. 🎉");
      return function () { pg.destroy(); };
    },
  });

  // ---------- რესურსები ----------
  const GROUPS = [
    {
      title: "📘 ოფიციალური",
      items: [
        { label: "Angular.dev — ოფიციალური საიტი", desc: "ახალი დოკუმენტაცია ინტერაქტიული სახელმძღვანელოთი.", href: "https://angular.dev/" },
        { label: "Angular — Tutorials", desc: "ნაბიჯ-ნაბიჯ პირველი აპლიკაცია ბრაუზერშივე.", href: "https://angular.dev/tutorials" },
        { label: "Angular — Signals", desc: "სიგნალების ოფიციალური სახელმძღვანელო.", href: "https://angular.dev/guide/signals" },
      ],
    },
    {
      title: "🧪 ონლაინ ექსპერიმენტი",
      items: [
        { label: "StackBlitz — Angular", desc: "ნამდვილი Angular პროექტი ბრაუზერში, დაყენების გარეშე.", href: "https://stackblitz.com/fork/angular" },
        { label: "Angular CLI — დოკუმენტაცია", desc: "ყველა ბრძანება და პარამეტრი.", href: "https://angular.dev/tools/cli" },
      ],
    },
    {
      title: "🎓 სასწავლო მასალა",
      items: [
        { label: "Angular University — ბლოგი", desc: "ღრმა სტატიები სიგნალებზე, RxJS-სა და არქიტექტურაზე.", href: "https://blog.angular-university.io/" },
        { label: "RxJS — ოფიციალური", desc: "Observable-ები, რომლებსაც Angular ფართოდ იყენებს.", href: "https://rxjs.dev/guide/overview" },
        { label: "Angular — Style Guide", desc: "ოფიციალური სტილის სახელმძღვანელო: სახელები და სტრუქტურა.", href: "https://angular.dev/style-guide" },
      ],
    },
  ];

  window.AngularLessons.push({
    id: "ng-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "Angular-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია ის რესურსები, რომლებითაც ნამდვილ პროექტზე გადახვალ.",
    analogy: "სასწავლო მოედნიდან ნამდვილ გზაზე გასვლა — წესები იგივეა, მასშტაბი სხვა.",
    physicalLabel: "პირველი ნაბიჯი",
    physical: "დააყენე CLI (npm i -g @angular/cli), შექმენი პროექტი (ng new) და გადაიტანე იქ ის, რაც აქ ისწავლე. თუ დაყენება არ გინდა — StackBlitz-ზე ნამდვილი Angular ბრაუზერშივე გაეშვება.",
    challenge: "აირჩიე ერთი რესურსი და გახსენი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      function onOpen() {
        setChallengeResult(true, "შესრულებულია: რესურსი გახსენი — გააგრძელე. 🚀");
      }
      GROUPS.forEach(function (group) {
        const cards = group.items.map(function (item) {
          return CFZ.el("a", {
            className: "resource-card",
            attrs: { href: item.href, target: "_blank", rel: "noopener noreferrer" },
            on: { click: onOpen },
          }, [
            CFZ.el("strong", { text: item.label }),
            CFZ.el("span", { className: "resource-desc", text: item.desc }),
            CFZ.el("span", { className: "resource-arrow", attrs: { "aria-hidden": "true" }, text: "↗" }),
          ]);
        });
        container.append(
          CFZ.el("div", { className: "res-group" }, [
            CFZ.el("h4", { text: group.title }),
            CFZ.el("div", { className: "resource-grid" }, cards),
          ])
        );
      });
      container.append(
        CFZ.el("p", {
          className: "state-note",
          text: "რჩევა: დაიწყე angular.dev-ის ინტერაქტიული სახელმძღვანელოთი — ის ბრაუზერშივე გაშვებადია და ნამდვილ Angular-ს იყენებს.",
        })
      );
      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
