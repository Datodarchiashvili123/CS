(function () {
  const L = window.jsLesson;
  const DEMO =
    '<h1 id="title">სათაური</h1>' +
    '<p class="text">პირველი აბზაცი</p>' +
    '<p class="text">მეორე აბზაცი</p>' +
    '<ul id="list"><li>ერთი</li><li>ორი</li></ul>' +
    '<button id="btn">ღილაკი</button>';

  L({
    id: "js-dom-intro", title: "DOM — რა არის", short: "DOM",
    theory: "როცა ბრაუზერი HTML-ს კითხულობს, ის მისგან ხის მსგავს სტრუქტურას აგებს — DOM-ს (Document Object Model). თითო ტეგი ამ ხის კვანძია, და JavaScript-ს შეუძლია ამ კვანძების წაკითხვა და შეცვლა ცოცხლად.",
    analogy: "HTML — ქაღალდზე დაწერილი ნახაზი; DOM — უკვე აშენებული სახლი, რომელშიც კედლის გადატანა შეიძლება.",
    label: "მთავარი აზრი",
    syntax: "document არის მთელი დოკუმენტის საწყისი წერტილი. DOM-ის შეცვლა HTML ფაილს არ ცვლის — ცვლილება მხოლოდ ბრაუზერის მეხსიერებაშია და გვერდის განახლებისას ქრება.",
    challenge: "იპოვე გვერდზე h1 და ჩაწერე ცვლადში teqsti მისი ტექსტი.",
    html: DEMO,
    starter: 'const sataury = document.querySelector("h1");\nconst teqsti = sataury.textContent;\n\nconsole.log(teqsti);',
    test: 'return teqsti === "სათაური";',
    hint: 'document.querySelector("h1").textContent',
    note: "მარჯვნივ, გამშვებში, ნამდვილი პატარა გვერდია — სათაური, ორი აბზაცი, სია და ღილაკი. ამ თავის ყველა გაკვეთილში სწორედ მასზე იმუშავებ.",
  });

  L({
    id: "js-selectors", title: "ელემენტების პოვნა", short: "ელემენტების პოვნა",
    theory: "querySelector(css) პირველ დამთხვევას აბრუნებს, querySelectorAll(css) — ყველას (NodeList). სელექტორი ზუსტად ისეთივეა, როგორც CSS-ში: \"#id\", \".klasi\", \"ul li\".",
    analogy: "იგივე მისამართი, რომლითაც CSS პოულობს ელემენტს — უბრალოდ ახლა JS-ით ეძებ.",
    label: "მნიშვნელოვანი",
    syntax: "თუ ვერ იპოვა, querySelector null-ს აბრუნებს — მასზე მიმართვა შეცდომას გამოიწვევს, ამიტომ ჯერ შეამოწმე. querySelectorAll-ის შედეგზე forEach მუშაობს, მაგრამ map — არა; მასივად ქცევა: [...nodes].",
    challenge: "იპოვე ყველა .text ელემენტი და ჩაწერე მათი რაოდენობა ცვლადში raodenoba.",
    html: DEMO,
    starter: 'const elementebi = document.querySelectorAll(".text");\nconst raodenoba = elementebi.length;\n\nconsole.log(raodenoba);',
    test: 'return raodenoba === 2;',
    hint: 'document.querySelectorAll(".text").length',
    note: "ძველი მეთოდები (getElementById, getElementsByClassName) კვლავ მუშაობს, მაგრამ querySelector უფრო მოქნილია — ერთი და იგივე სინტაქსით ყველაფერს პოულობს.",
  });

  L({
    id: "js-dom-content", title: "შიგთავსის ცვლილება", short: "შიგთავსი",
    theory: "textContent ელემენტის ტექსტს კითხულობს და ცვლის. innerHTML კი HTML-ს — მისით ტეგების ჩასმაც შეიძლება. value გამოიყენება ფორმის ველებისთვის.",
    analogy: "textContent — ფურცელზე ტექსტის გადაწერა; innerHTML — მთელი ფურცლის ჩანაცვლება ახალი, ფორმატირებული ფურცლით.",
    label: "უსაფრთხოება",
    syntax: "მომხმარებლის შეყვანილი ტექსტი არასდროს ჩასვა innerHTML-ით — ასე გვერდზე უცხო კოდის გაშვება ხდება შესაძლებელი (XSS შეტევა). ასეთ შემთხვევაში ყოველთვის textContent გამოიყენე.",
    challenge: "შეცვალე h1-ის ტექსტი და ჩაწერე ახალი მნიშვნელობა ცვლადში axali.",
    html: DEMO,
    starter: 'const sataury = document.querySelector("#title");\nsataury.textContent = "ახალი სათაური";\n\nconst axali = sataury.textContent;\nconsole.log(axali);',
    test: 'return document.querySelector("#title").textContent === "ახალი სათაური" && axali === "ახალი სათაური";',
    hint: 'element.textContent = "ახალი სათაური";',
    note: "textContent უფრო სწრაფიცაა, ვიდრე innerHTML, რადგან ბრაუზერს HTML-ის გარჩევა არ სჭირდება. წესი მარტივია: თუ ტეგები არ გჭირდება — textContent.",
  });

  L({
    id: "js-classlist", title: "classList და სტილი", short: "classList და სტილი",
    theory: "classList კლასებს მართავს: .add(), .remove(), .toggle(), .contains(). element.style კი პირდაპირ CSS თვისებას ცვლის: element.style.color = \"red\".",
    analogy: "classList — მზა ფორმის ჩაცმა/გახდა; style — ერთი კონკრეტული ღილაკის ხელით შეღებვა.",
    label: "საუკეთესო პრაქტიკა",
    syntax: "სტილი CSS-ში დაწერე, JS-ით კი მხოლოდ კლასი გადართე — ასე გარეგნობა და ლოგიკა გამიჯნულია. style-ის პირდაპირ ცვლილება მხოლოდ დინამიკური მნიშვნელობებისთვის (მაგ. გამოთვლილი პოზიცია). JS-ში თვისებები camelCase-ია: backgroundColor, არა background-color.",
    challenge: "დაამატე ელემენტს კლასი \"active\" და შეამოწმე classList.contains-ით.",
    html: DEMO,
    starter: 'const el = document.querySelector("#title");\n\nel.classList.add("active");\nel.style.color = "blue";\n\nconst aqvsKlasi = el.classList.contains("active");\nconsole.log(aqvsKlasi, el.className);',
    test: 'return document.querySelector("#title").classList.contains("active") === true && aqvsKlasi === true;',
    hint: 'el.classList.add("active")',
    note: "toggle() განსაკუთრებით მოსახერხებელია: ერთი ხაზი მენიუს გახსნა-დახურვისთვის — menu.classList.toggle(\"open\"). თუ კლასი იყო, მოხსნის; თუ არა — დაამატებს.",
  });

  L({
    id: "js-dom-create", title: "ელემენტების შექმნა და წაშლა", short: "შექმნა/წაშლა",
    theory: "document.createElement(tag) ქმნის ახალ ელემენტს, parent.append(child) ამატებს გვერდზე, element.remove() კი შლის.",
    analogy: "ახალი აგურის დამზადება და კედელში ჩაშენება — ან პირიქით, ამოღება.",
    label: "წესი",
    syntax: "createElement-ით შექმნილი ელემენტი გვერდზე მანამ არ ჩანს, სანამ არ დაამატებ. ბევრი ელემენტის დამატებისას ჯერ ყველა მოამზადე და ერთად ჩასვი — ციკლში თითოეულის ცალკე დამატება ნელია.",
    challenge: "შექმენი ახალი <li> და დაამატე სიაში — უნდა გახდეს 3 პუნქტი.",
    html: DEMO,
    starter: 'const sia = document.querySelector("#list");\n\nconst axali = document.createElement("li");\naxali.textContent = "სამი";\nsia.append(axali);\n\nconsole.log(sia.children.length);',
    test: 'return document.querySelectorAll("#list li").length === 3;',
    hint: 'const li = document.createElement("li"); li.textContent = "სამი"; sia.append(li);',
    note: "მასივიდან სიის აგება ხშირი ამოცანაა: data.forEach(item => { const li = document.createElement(\"li\"); li.textContent = item; list.append(li); }).",
  });

  L({
    id: "js-events", title: "მოვლენები", short: "მოვლენები",
    theory: "addEventListener(\"click\", handler) ელემენტს „ასმენინებს“ მოვლენას. როცა მოვლენა მოხდება, ფუნქცია გამოიძახება და მიიღებს event ობიექტს დეტალებით.",
    analogy: "კარის ზარი: ერთხელ აყენებ და შემდეგ ის თავად რეაგირებს ყოველ დაჭერაზე.",
    label: "event ობიექტი",
    syntax: "event.target — ელემენტი, რომელზეც მოხდა; event.preventDefault() — ბრაუზერის ნაგულისხმევ ქცევას აჩერებს (მაგ. ფორმის გაგზავნას). ხშირი მოვლენები: click, input, submit, keydown, mouseenter.",
    challenge: "დაამატე ღილაკს დაჭერის დამმუშავებელი და ხელოვნურად გამოიწვიე დაჭერა — მრიცხველი უნდა გაიზარდოს.",
    html: DEMO,
    starter: 'let daclicki = 0;\n\nconst btn = document.querySelector("#btn");\nbtn.addEventListener("click", function () {\n  daclicki++;\n});\n\n// ხელოვნურად ვიწვევთ დაჭერას შესამოწმებლად\nbtn.click();\nbtn.click();\n\nconsole.log(daclicki);',
    test: 'return daclicki === 2;',
    hint: 'btn.addEventListener("click", () => { daclicki++; });',
    note: "მოვლენა „ამოტივტივდება“ (bubbling): შვილზე დაჭერა მშობელამდეც ადის. ამას იყენებენ დელეგირებისთვის — ერთი დამმუშავებელი სიაზე, ნაცვლად ასი დამმუშავებლისა თითო პუნქტზე.",
  });

  L({
    id: "js-timers", title: "setTimeout და setInterval", short: "ტაიმერები",
    theory: "setTimeout(fn, ms) კოდს ერთხელ ასრულებს დაყოვნებით. setInterval(fn, ms) — მეორდება, სანამ clearInterval-ით არ გააჩერებ.",
    analogy: "setTimeout — მაღვიძარა ერთჯერადად; setInterval — მეტრონომი, რომელიც სანამ არ გამორთავ, სულ ტკტკებს.",
    label: "მნიშვნელოვანი",
    syntax: "setTimeout კოდს არ „აჩერებს“ — შემდეგი სტრიქონები მაშინვე გრძელდება, ფუნქცია კი მოგვიანებით შესრულდება. ეს ასინქრონულობის პირველი გაცნობაა. setInterval აუცილებლად გააჩერე, თორემ ის სამუდამოდ იმუშავებს.",
    challenge: "დაბეჭდე რიგი: ჯერ „პირველი“, მერე „მესამე“, ბოლოს „მეორე“ (setTimeout-ით).",
    starter: 'const rigi = [];\n\nrigi.push("პირველი");\n\nsetTimeout(function () {\n  rigi.push("მეორე");\n}, 0);\n\nrigi.push("მესამე");\n\nconsole.log(rigi.join(" → "));',
    test: 'return rigi[0] === "პირველი" && rigi[1] === "მესამე" && rigi.length === 2;',
    hint: "setTimeout-ში ჩაწერილი კოდი მაშინვე არ სრულდება — მაშინაც კი, როცა დაყოვნება 0-ია.",
    note: "გაუშვი და დააკვირდი: მიუხედავად იმისა, რომ დაყოვნება 0 მილიწამია, „მეორე“ მაინც ბოლოს ემატება. მიზეზი ისაა, რომ ტაიმერი რიგში დგება და მხოლოდ მიმდინარე კოდის დასრულების შემდეგ სრულდება.",
  });

  L({
    id: "js-promise", title: "Promise", short: "Promise",
    theory: "Promise არის დაპირება მომავალი შედეგის შესახებ — ის ან შესრულდება (resolve), ან ჩავარდება (reject). შედეგს იჭერ .then()-ით, შეცდომას — .catch()-ით.",
    analogy: "რესტორნის ჩეკი: შეკვეთა მიღებულია, კერძი ჯერ არ არის — მაგრამ გაქვს დაპირება, რომ ან მიიღებ, ან გეტყვიან, რომ არ გამოვიდა.",
    label: "სამი მდგომარეობა",
    syntax: "pending (ელოდება), fulfilled (შესრულდა), rejected (ჩავარდა). .then() ჯაჭვურად იწერება, თითო აბრუნებს ახალ Promise-ს. Promise.all([...]) ერთდროულად ბევრს ელოდება.",
    challenge: "შექმენი Promise, რომელიც resolve-ს აკეთებს, და შედეგი ჩაწერე ცვლადში shedegi.",
    starter: 'let shedegi = null;\n\nconst dapireba = new Promise(function (resolve) {\n  resolve("მზადაა!");\n});\n\ndapireba.then(function (pasuxi) {\n  shedegi = pasuxi;\n  console.log("მივიღეთ:", pasuxi);\n});\n\nconsole.log("ეს ადრე იბეჭდება");',
    test: 'return dapireba instanceof Promise;',
    hint: "new Promise(resolve => resolve(\"მზადაა!\"))",
    note: "დააკვირდი რიგს: „ეს ადრე იბეჭდება“ მართლაც წინ გამოდის, რადგან .then() ყოველთვის მიმდინარე კოდის დასრულების შემდეგ სრულდება — მაშინაც კი, როცა Promise უკვე მზადაა.",
  });

  L({
    id: "js-async-await", title: "async / await", short: "async/await",
    theory: "async/await Promise-ებთან მუშაობის უფრო წაკითხვადი ფორმაა. async ფუნქცია ყოველთვის Promise-ს აბრუნებს, await კი ელოდება შედეგს ისე, თითქოს კოდი სინქრონული იყოს.",
    analogy: "იგივე ჩეკი, ოღონდ ახლა უბრალოდ ელოდები მაგიდასთან, ნაცვლად იმისა, რომ დამატებითი ინსტრუქცია დატოვო „როცა მზად იქნება, მაცნობე“.",
    label: "წესები",
    syntax: "await მხოლოდ async ფუნქციის შიგნით შეიძლება. შეცდომების დასაჭერად try/catch გამოიყენე. თუ რამდენიმე დამოუკიდებელი მოთხოვნა გაქვს, await ცალ-ცალკე ნუ დაწერ — Promise.all() მათ პარალელურად შეასრულებს და გაცილებით სწრაფია.",
    challenge: "დაწერე async ფუნქცია, რომელიც await-ით იღებს მნიშვნელობას და აბრუნებს მას.",
    starter: 'function dapireba() {\n  return Promise.resolve("მონაცემი");\n}\n\nasync function wamokitxva() {\n  const shedegi = await dapireba();\n  return shedegi.toUpperCase();\n}\n\nwamokitxva().then(v => console.log(v));',
    test: 'return typeof wamokitxva === "function" && wamokitxva() instanceof Promise;',
    hint: "async function wamokitxva() { const x = await dapireba(); return x.toUpperCase(); }",
    note: "async ფუნქციის შედეგი ყოველთვის Promise-ია — ამიტომ მისი გამოძახებისას ისევ .then() ან await გჭირდება. ეს ხშირი გაუგებრობაა დამწყებებში.",
  });

  L({
    id: "js-fetch", title: "fetch — მონაცემები სერვერიდან", short: "fetch",
    theory: "fetch(url) სერვერს მოთხოვნას უგზავნის და Promise-ს აბრუნებს. პასუხი ორ ეტაპად მუშავდება: ჯერ თავად პასუხი მოდის, მერე მისი სხეული იკითხება — ჩვეულებრივ .json()-ით.",
    analogy: "წერილის გაგზავნა და პასუხის ლოდინი: ჯერ კონვერტი მოდის, მერე ხსნი და კითხულობ.",
    label: "ორი ხაფანგი",
    syntax: "1) fetch შეცდომას არ აგდებს 404-ზე ან 500-ზე — მოთხოვნა „წარმატებულია“, თუ პასუხი მოვიდა. ამიტომ შეამოწმე response.ok. 2) .json() ასევე ასინქრონულია და await სჭირდება. ყოველთვის ჩასვი try/catch-ში.",
    challenge: "დაწერე async ფუნქცია, რომელიც response.ok-ს ამოწმებს (ქსელი აქ არ მუშაობს — მთავარია სტრუქტურა).",
    starter: 'async function wamokitxva(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error("შეცდომა: " + response.status);\n    }\n    const monacemi = await response.json();\n    return monacemi;\n  } catch (shecdoma) {\n    console.log("ვერ მოვიდა:", shecdoma.message);\n    return null;\n  }\n}\n\nconsole.log(typeof wamokitxva);',
    test: 'return typeof wamokitxva === "function" && wamokitxva.constructor.name === "AsyncFunction";',
    hint: "async function wamokitxva(url) { ... await fetch(url) ... }",
    note: "გამშვები იზოლირებულია და ნამდვილ ქსელში ვერ გავა — ამიტომ აქ სტრუქტურას ვამოწმებთ. რეალურ პროექტში სცადე უფასო API: https://jsonplaceholder.typicode.com/todos/1",
  });

  L({
    id: "js-errors", title: "try / catch და შეცდომები", short: "შეცდომები",
    theory: "try ბლოკში ის კოდი იწერება, რომელიც შეიძლება ჩავარდეს; catch იჭერს შეცდომას და საშუალებას გაძლევს ლამაზად დაამუშავო; finally კი ორივე შემთხვევაში სრულდება.",
    analogy: "უსაფრთხოების ბადე: თუ აკრობატი ჩამოვარდა, წარმოდგენა არ წყდება — ბადე იჭერს.",
    label: "პრაქტიკა",
    syntax: "საკუთარი შეცდომის აგდება: throw new Error(\"ტექსტი\"). catch-ში მიღებულ ობიექტს აქვს .message და .name. ცარიელი catch არ დატოვო — შეცდომის ჩაყლაპვა გამართვას შეუძლებელს ხდის.",
    challenge: "დაიჭირე შეცდომა try/catch-ით და ჩაწერე მისი ტექსტი ცვლადში sheteqoba.",
    starter: 'let sheteqoba = "";\n\ntry {\n  throw new Error("რაღაც შეცდა");\n} catch (e) {\n  sheteqoba = e.message;\n} finally {\n  console.log("ეს ყოველთვის სრულდება");\n}\n\nconsole.log(sheteqoba);',
    test: 'return sheteqoba === "რაღაც შეცდა";',
    hint: "catch (e) { sheteqoba = e.message; }",
    note: "try/catch სინქრონულ კოდს იჭერს. Promise-ის შეცდომებისთვის ან .catch() გამოიყენე, ან await-ი try-ს შიგნით ჩასვი — სხვაგვარად შეცდომა „გაძვრება“.",
  });

  // ---------- რეკაპი ----------
  window.JsLessons.push({
    id: "js-recap",
    title: "რეკაპი — მთელი JavaScript",
    shortTitle: "რეკაპი",
    theory: "50 სექციის გზა: ცვლადებიდან და ტიპებიდან — ფუნქციებამდე, ობიექტებამდე, DOM-ამდე და ასინქრონულობამდე. ეს არის ის ბაზა, რომლითაც უკვე ნამდვილი აპლიკაცია იწერება.",
    analogy: "სამივე ენა ერთად: HTML — ჩონჩხი, CSS — გარეგნობა, JavaScript — ქცევა. ახლა სამივე გაქვს.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "შემდეგი ნაბიჯები: ბრაუზერის API-ები (localStorage, ფორმები), მოდულები (import/export), ინსტრუმენტები (npm, Vite), ფრეიმვორკები (React, Vue). მაგრამ ყველაზე მთავარი — დაწერე პატარა პროექტები: სია, კალკულატორი, ამინდის აპლიკაცია.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const topics = [
        { to: "js-variables", title: "ცვლადები და ტიპები", desc: "let, const, string, number" },
        { to: "js-if", title: "პირობები", desc: "if/else, switch, ტერნარული" },
        { to: "js-for", title: "ციკლები", desc: "for, while, break" },
        { to: "js-map-filter", title: "მასივები", desc: "map, filter, reduce" },
        { to: "js-objects", title: "ობიექტები", desc: "თვისებები და მეთოდები" },
        { to: "js-functions", title: "ფუნქციები", desc: "return, arrow, პარამეტრები" },
        { to: "js-closures", title: "closures და this", desc: "სკოუპი და კონტექსტი" },
        { to: "js-classes", title: "კლასები", desc: "constructor, extends" },
        { to: "js-dom-intro", title: "DOM", desc: "პოვნა, ცვლილება, შექმნა" },
        { to: "js-events", title: "მოვლენები", desc: "addEventListener" },
        { to: "js-async-await", title: "ასინქრონულობა", desc: "Promise, async/await, fetch" },
      ];

      const stack = CFZ.el(
        "div",
        { className: "recap-stack" },
        topics.map(function (t, i) {
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
        })
      );

      const pg = CFZ.createJsPlayground(
        '// პატარა პროგრამა — ყველაფერი ერთად\nconst students = [\n  { name: "ელენე", score: 92 },\n  { name: "ნატალი", score: 78 },\n  { name: "დავითი", score: 85 }\n];\n\nconst warmatebulebi = students\n  .filter(s => s.score >= 80)\n  .map(s => s.name);\n\nconst saSualo = students.reduce((a, s) => a + s.score, 0) / students.length;\n\nconsole.log("წარმატებულები:", warmatebulebi.join(", "));\nconsole.log("საშუალო ქულა:", saSualo.toFixed(1));',
        "return true;",
        function () {}
      );

      container.append(
        CFZ.el("p", { className: "breakdown-note", text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი პატარა პროგრამაა — შეცვალე და გაუშვი." }),
        stack,
        CFZ.el("h4", { text: "ყველაფერი ერთად" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: JavaScript-ის საფუძვლები გაიარე. 🎉");
      return function () { pg.destroy(); };
    },
  });

  // ---------- რესურსები ----------
  const GROUPS = [
    {
      title: "📘 დოკუმენტაცია",
      items: [
        { label: "MDN — JavaScript", desc: "მთავარი ცნობარი: თითო მეთოდი მაგალითებით.", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { label: "JavaScript.info", desc: "საუკეთესო თანამედროვე სახელმძღვანელო ნულიდან, ღრმად.", href: "https://javascript.info/" },
      ],
    },
    {
      title: "🎓 კურსები",
      items: [
        { label: "freeCodeCamp — JavaScript Algorithms", desc: "პრაქტიკული სავარჯიშოები და სერტიფიკატი.", href: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
        { label: "The Odin Project — JavaScript", desc: "პროექტებზე აგებული სრული გზა.", href: "https://www.theodinproject.com/" },
        { label: "web.dev — Learn JavaScript", desc: "Google-ის მოკლე, სისტემური კურსი.", href: "https://web.dev/learn/javascript" },
      ],
    },
    {
      title: "🏋️ ვარჯიში",
      items: [
        { label: "Exercism — JavaScript", desc: "ამოცანები მენტორის უკუკავშირით, უფასოდ.", href: "https://exercism.org/tracks/javascript" },
        { label: "Codewars", desc: "მოკლე ამოცანები დონეებად — ყოველდღიური ვარჯიშისთვის.", href: "https://www.codewars.com/" },
        { label: "JavaScript30", desc: "30 პატარა პროექტი 30 დღეში, ფრეიმვორკების გარეშე.", href: "https://javascript30.com/" },
      ],
    },
    {
      title: "🛠 ხელსაწყოები",
      items: [
        { label: "Can I use", desc: "მუშაობს თუ არა თვისება კონკრეტულ ბრაუზერში.", href: "https://caniuse.com/" },
        { label: "JSONPlaceholder", desc: "უფასო სატესტო API fetch-ით სავარჯიშოდ.", href: "https://jsonplaceholder.typicode.com/" },
        { label: "CodePen", desc: "სწრაფი ექსპერიმენტები ბრაუზერში.", href: "https://codepen.io/" },
      ],
    },
  ];

  window.JsLessons.push({
    id: "js-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "JavaScript-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია რესურსები გასაგრძელებლად — ცნობარები, კურსები, სავარჯიშო პლატფორმები და ხელსაწყოები.",
    analogy: "სავარჯიშო დარბაზი და ბიბლიოთეკა ერთად: ცოდნას წიგნიდან იღებ, უნარს — ვარჯიშით.",
    physicalLabel: "როგორ ისწავლო ეფექტურად",
    physical: "პროგრამირება მხოლოდ კითხვით არ ისწავლება. წესი მარტივია: თითო ახალ თემაზე დაწერე პატარა რამ საკუთარი ხელით. დღეში 30 წუთი ვარჯიში ბევრად უკეთესია, ვიდრე კვირაში ერთხელ 5 საათი.",
    challenge: "აირჩიე ერთი რესურსი და გახსენი.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      function onOpen() {
        setChallengeResult(true, "შესრულებულია: რესურსი გახსენი — გააგრძელე ვარჯიში. 🚀");
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
          text: "რჩევა: დაიწყე JavaScript.info-ს პირველი თავებით, პარალელურად კი ყოველდღე ერთი ამოცანა Exercism-ზე. მერე გადადი JavaScript30-ის პროექტებზე.",
        })
      );
      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
