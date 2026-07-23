(function () {
  const L = window.jsLesson;

  L({
    id: "js-scope", title: "სკოუპი და hoisting", short: "სკოუპი",
    theory: "სკოუპი განსაზღვრავს, სად არის ცვლადი ხილული. გლობალური — ყველგან; ფუნქციის — მხოლოდ ფუნქციაში; ბლოკის — მხოლოდ {} შიგნით (let და const). შიდა სკოუპი გარეს ხედავს, პირიქით — არა.",
    analogy: "ოთახები სახლში: ოთახიდან ხედავ საერთო დერეფანს, დერეფნიდან კი — არა ოთახის შიგნით.",
    label: "hoisting",
    syntax: "function-ით გამოცხადებული ფუნქციები „ზემოთ ადის“ — მათი გამოძახება გამოცხადებამდეც შეიძლება. let/const კი „დროებით მკვდარ ზონაშია“ და გამოცხადებამდე მიმართვა შეცდომას იძლევა (var — undefined-ს). სწორედ ამიტომ ჯობია var-ს თავი ავარიდოთ.",
    challenge: "შექმენი ფუნქცია, რომლის შიგნით გამოცხადებული ცვლადი გარეთ ხილული არ იქნება, და დააბრუნე იგი.",
    starter: 'let gareti = "გარე";\n\nfunction testi() {\n  const shida = "შიდა";\n  return shida + " + " + gareti;\n}\n\nconst shedegi = testi();\nconsole.log(shedegi);\nconsole.log(typeof shida);',
    test: 'return shedegi.includes("შიდა") && typeof shida === "undefined";',
    hint: "shida ფუნქციის შიგნით გამოაცხადე — გარეთ ის ხილული არ უნდა იყოს.",
    note: "გაუშვი კოდი: typeof shida იძლევა \"undefined\", რადგან ის ფუნქციის გარეთ არ არსებობს. ეს კარგია — სკოუპი კოდს იცავს შემთხვევითი გადაფარვისგან.",
  });

  L({
    id: "js-closures", title: "ჩაკეტვები (closures)", short: "closures",
    theory: "closure არის ფუნქცია, რომელიც „ახსოვს“ ის სკოუპი, სადაც შეიქმნა — მაშინაც კი, როცა გარე ფუნქცია უკვე დასრულდა. ასე იქმნება პირადი, დაცული მდგომარეობა.",
    analogy: "ფუნქცია, რომელიც თან ატარებს პატარა ჩანთას იმ ცვლადებით, რომლებიც დაბადებისას გარშემო ჰქონდა.",
    label: "სად გამოიყენება",
    syntax: "მრიცხველები, ერთჯერადი ინიციალიზაცია, დამალული მონაცემები, ფუნქციების ფაბრიკები. closure-ის შიგნით არსებულ ცვლადზე გარედან პირდაპირი წვდომა არ არსებობს — მხოლოდ დაბრუნებული ფუნქციით.",
    challenge: "შექმენი ფუნქცია createCounter, რომელიც აბრუნებს ფუნქციას; ყოველი გამოძახება ნომერს ზრდის.",
    starter: 'function createCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter(), counter(), counter());',
    test: 'const c = createCounter(); return c() === 1 && c() === 2 && createCounter()() === 1;',
    hint: "გარე ფუნქციაში let count = 0, შიგნიდან დააბრუნე ფუნქცია, რომელიც count++ აკეთებს.",
    note: "თითო createCounter() გამოძახება ახალ, დამოუკიდებელ count-ს ქმნის — ამიტომაც არის ბოლო შემოწმებაში ისევ 1. ეს არის closure-ის მთელი ძალა: იზოლირებული მდგომარეობა კლასის გარეშე.",
  });

  L({
    id: "js-this", title: "this", short: "this",
    theory: "this მიუთითებს იმ ობიექტზე, რომლის კონტექსტშიც ფუნქცია სრულდება. ობიექტის მეთოდში ის თავად ობიექტია. ისრიან ფუნქციას საკუთარი this არ აქვს — ის გარე სკოუპიდან იღებს.",
    analogy: "სიტყვა „მე“ — ვინც წარმოთქვამს, იმაზე მიუთითებს. ვინ ლაპარაკობს, იმაზეა დამოკიდებული.",
    label: "ხაფანგი",
    syntax: "თუ მეთოდს ობიექტისგან მოწყვეტ (const f = user.greet; f()), this დაიკარგება. ისრიანი ფუნქცია მეთოდად არ გამოდგება, სამაგიეროდ იდეალურია callback-ებში, სადაც გარე this უნდა შენარჩუნდეს.",
    challenge: "შექმენი ობიექტი მეთოდით, რომელიც this-ით მიმართავს საკუთარ თვისებას.",
    starter: 'const magazia = {\n  name: "წიგნები",\n  count: 12,\n  info() {\n    return `${this.name}: ${this.count} ცალი`;\n  }\n};\n\nconsole.log(magazia.info());',
    test: 'return magazia.info().includes("წიგნები") && magazia.info().includes("12");',
    hint: "info() { return `${this.name}: ${this.count} ცალი`; }",
    note: "სცადე info-ს ისრიან ფუნქციად გადაკეთება — this აღარ იმუშავებს და მიიღებ undefined-ს. ეს ერთ-ერთი ყველაზე ხშირი შეცდომაა დამწყებებში.",
  });

  L({
    id: "js-recursion", title: "რეკურსია", short: "რეკურსია",
    theory: "რეკურსიული ფუნქცია საკუთარ თავს იძახებს. მას აუცილებლად სჭირდება საბაზისო შემთხვევა — პირობა, რომელზეც გამოძახება ჩერდება.",
    analogy: "მატრიოშკა: ხსნი ერთს, შიგნით იგივე ამოცანაა უფრო პატარა ზომით — სანამ ბოლო, ცარიელ თოჯინას არ მიაღწევ.",
    label: "აუცილებელი",
    syntax: "საბაზისო შემთხვევის გარეშე მიიღებ უსასრულო რეკურსიას და შეცდომას „Maximum call stack size exceeded“. რეკურსია ბუნებრივია ხის მსგავს სტრუქტურებზე (საქაღალდეები, კომენტარების ხე, DOM).",
    challenge: "დაწერე რეკურსიული ფუნქცია faqtoriali (5! = 120).",
    starter: 'function faqtoriali(n) {\n  if (n <= 1) {\n    return 1;\n  }\n  return n * faqtoriali(n - 1);\n}\n\nconsole.log(faqtoriali(5));',
    test: 'return faqtoriali(5) === 120 && faqtoriali(1) === 1 && faqtoriali(0) === 1;',
    hint: "საბაზისო: if (n <= 1) return 1; მერე n * faqtoriali(n - 1).",
    note: "ბევრი რეკურსიული ამოცანა ციკლითაც იწერება და ხშირად უფრო სწრაფადაც. რეკურსია მაშინ აირჩიე, როცა ის ამოცანას უფრო ბუნებრივად აღწერს.",
  });

  L({
    id: "js-destructuring", title: "დესტრუქტურიზაცია", short: "დესტრუქტურიზაცია",
    theory: "დესტრუქტურიზაცია მასივიდან ან ობიექტიდან მნიშვნელობებს პირდაპირ ცვლადებში „ამოიღებს“: const { name, age } = user; const [first, second] = arr.",
    analogy: "ამანათის გახსნა და შიგთავსის მაშინვე თაროებზე დალაგება — ერთი მოძრაობით.",
    label: "სასარგებლო ვარიანტები",
    syntax: "ნაგულისხმევი მნიშვნელობა: const { city = \"თბილისი\" } = user. სახელის შეცვლა: const { name: userName } = user. ფუნქციის პარამეტრშიც მუშაობს: function show({ name, age }) — ძალიან გავრცელებული ხერხია.",
    challenge: "ამოიღე ობიექტიდან name და age დესტრუქტურიზაციით.",
    starter: 'const user = { name: "ლუკა", age: 28, city: "ბათუმი" };\n\nconst { name, age } = user;\nconst [pirveli, meore] = [10, 20];\n\nconsole.log(name, age, pirveli, meore);',
    test: 'return name === "ლუკა" && age === 28 && pirveli === 10 && meore === 20;',
    hint: "const { name, age } = user;",
    note: "ობიექტში სახელი მნიშვნელოვანია (რიგი — არა), მასივში კი პირიქით — რიგი განსაზღვრავს. ამიტომ მასივში გამოტოვება ასე იწერება: const [, meore] = arr.",
  });

  L({
    id: "js-object-static", title: "Object.keys, values, entries", short: "Object მეთოდები",
    theory: "Object.keys(obj) აბრუნებს გასაღებების მასივს, Object.values(obj) — მნიშვნელობებისას, Object.entries(obj) — [გასაღები, მნიშვნელობა] წყვილების მასივს. ასე ობიექტზე მასივის მეთოდების გამოყენება შეიძლება.",
    analogy: "ობიექტს სიად აქცევ, რომ მასზე გაიარო — შემდეგ საჭიროების შემთხვევაში ისევ ობიექტად აქცევ.",
    label: "ციკლი ობიექტზე",
    syntax: "for (const [key, value] of Object.entries(obj)) — ყველაზე მოსახერხებელი გზა ობიექტზე გასავლელად. უკან გარდაქმნა: Object.fromEntries(pairs). გაერთიანება: Object.assign({}, a, b) ან { ...a, ...b }.",
    challenge: "ჩაწერე ცვლადში gasagebebi ობიექტის გასაღებების მასივი და raodenoba — მათი რაოდენობა.",
    starter: 'const fasebi = { puri: 2, rdze: 3, karaqi: 8 };\n\nconst gasagebebi = Object.keys(fasebi);\nconst raodenoba = gasagebebi.length;\n\nfor (const [saxeli, fasi] of Object.entries(fasebi)) {\n  console.log(saxeli, fasi);\n}',
    test: 'return Array.isArray(gasagebebi) && raodenoba === 3 && gasagebebi.includes("puri");',
    hint: "Object.keys(fasebi) და .length",
    note: "Object.values-ით ჯამის დათვლა ერთ ხაზში შეიძლება: Object.values(fasebi).reduce((a, b) => a + b, 0). ეს ხშირი და მოსახერხებელი ხერხია.",
  });

  L({
    id: "js-json", title: "JSON", short: "JSON",
    theory: "JSON მონაცემების გაცვლის ფორმატია — ტექსტი, რომელიც ობიექტს ჰგავს. JSON.stringify(obj) ობიექტს ტექსტად აქცევს, JSON.parse(text) კი ტექსტს უკან ობიექტად.",
    analogy: "ავეჯის დაშლა გადასაზიდად და ადგილზე ისევ აწყობა — შიგთავსი იგივეა, ფორმა გადასაცემად მოსახერხებელი.",
    label: "წესები",
    syntax: "JSON-ში გასაღებები ორმაგ ბრჭყალებში უნდა იყოს, კომენტარები არ შეიძლება, ბოლო მძიმე დაუშვებელია. ფუნქციები და undefined stringify-ისას იკარგება. სერვერთან ურთიერთობა თითქმის ყოველთვის JSON-ით ხდება.",
    challenge: "გადააქციე ობიექტი JSON ტექსტად (teqsti) და უკან ობიექტად (ukan).",
    starter: 'const user = { name: "მარიამ", age: 24 };\n\nconst teqsti = JSON.stringify(user);\nconst ukan = JSON.parse(teqsti);\n\nconsole.log(teqsti);\nconsole.log(ukan.name, typeof teqsti, typeof ukan);',
    test: 'return typeof teqsti === "string" && typeof ukan === "object" && ukan.name === "მარიამ";',
    hint: "JSON.stringify(user) და JSON.parse(teqsti)",
    note: "JSON.stringify(obj, null, 2) ლამაზად, სამი ჰარით ფორმატირებულ ტექსტს იძლევა — გამართვისას ძალიან მოსახერხებელია. არასწორი JSON-ის parse შეცდომას იძლევა, ამიტომ ის try/catch-ში ჩასვი.",
  });

  L({
    id: "js-map-set", title: "Map და Set", short: "Map და Set",
    theory: "Set უნიკალურ მნიშვნელობებს ინახავს — გამეორებები ავტომატურად იკარგება. Map გასაღები-მნიშვნელობის კოლექციაა, სადაც გასაღები ნებისმიერი ტიპის შეიძლება იყოს (ობიექტიც).",
    analogy: "Set — სია, სადაც ერთი და იგივე სახელი ორჯერ ვერ მოხვდება. Map — ლექსიკონი, სადაც სიტყვის ნაცვლად ნებისმიერი რამ შეიძლება იყოს გასაღები.",
    label: "როდის",
    syntax: "Set: new Set(arr), .add(), .has(), .size. Map: new Map(), .set(k, v), .get(k), .has(k), .size. ჩვეულებრივ ობიექტში გასაღები მხოლოდ ტექსტი ან symbol შეიძლება იყოს — Map-ში ეს შეზღუდვა არ არსებობს და რიგიც გარანტირებულია.",
    challenge: "მოაშორე მასივს გამეორებები Set-ით და ჩაწერე ცვლადში unikaluri.",
    starter: 'const ricxvebi = [1, 2, 2, 3, 3, 3, 4];\n\nconst unikaluri = [...new Set(ricxvebi)];\n\nconsole.log(unikaluri, unikaluri.length);',
    test: 'return unikaluri.length === 4 && unikaluri.includes(1) && unikaluri.includes(4);',
    hint: "[...new Set(ricxvebi)]",
    note: "[...new Set(arr)] გამეორებების მოსაშორებლად ყველაზე მოკლე და გავრცელებული ხერხია JS-ში — დაიმახსოვრე, ხშირად დაგჭირდება.",
  });

  L({
    id: "js-classes", title: "კლასები", short: "კლასები",
    theory: "კლასი ობიექტების შესაქმნელი შაბლონია. constructor ახალი ობიექტის შექმნისას სრულდება და თვისებებს აყენებს; მეთოდები კი კლასის შიგნით იწერება.",
    analogy: "ნახაზი და მისგან აშენებული სახლები: ერთი ნახაზი — მრავალი კონკრეტული სახლი, თითო თავისი მისამართით.",
    label: "სინტაქსი",
    syntax: "new Klasi(...) ქმნის ეგზემპლარს. კლასის შიგნით this ახლად შექმნილ ობიექტს მიუთითებს. #-ით დაწყებული ველი პირადია: #balance — გარედან მასზე წვდომა არ არსებობს.",
    challenge: "შექმენი კლასი Wigni სახელითა და ავტორით და მეთოდით info().",
    starter: 'class Wigni {\n  constructor(saxeli, avtori) {\n    this.saxeli = saxeli;\n    this.avtori = avtori;\n  }\n\n  info() {\n    return `${this.saxeli} — ${this.avtori}`;\n  }\n}\n\nconst w = new Wigni("ვეფხისტყაოსანი", "რუსთაველი");\nconsole.log(w.info());',
    test: 'const b = new Wigni("ტესტი", "ავტორი"); return b.saxeli === "ტესტი" && typeof b.info === "function" && b.info().includes("ტესტი");',
    hint: "constructor(saxeli, avtori) { this.saxeli = saxeli; ... }",
    note: "კლასი JS-ში „სინტაქსური შაქარია“ — შიგნით ისევ პროტოტიპები მუშაობს. მაგრამ კოდი მისით გაცილებით წაკითხვადია, ამიტომ თანამედროვე პროექტებში სწორედ კლასებს იყენებენ.",
  });

  L({
    id: "js-inheritance", title: "მემკვიდრეობა", short: "მემკვიდრეობა",
    theory: "extends საშუალებას აძლევს ერთ კლასს მეორის თვისებები და მეთოდები გადაიღოს. super() მშობლის კონსტრუქტორს იძახებს, super.method() — მშობლის მეთოდს.",
    analogy: "ბაზისური ნახაზი და მისი გაფართოებული ვერსია: ყველაფერი ისევ არის, პლუს დამატებული ოთახი.",
    label: "წესი",
    syntax: "შვილის constructor-ში super() აუცილებლად პირველი უნდა გამოიძახო, სანამ this-ს გამოიყენებ. მეთოდის იმავე სახელით გადაწერა (override) სრულიად ნორმალურია.",
    challenge: "შექმენი კლასი Studenti, რომელიც მემკვიდრეობს Adamiani-სგან და ამატებს საგანს.",
    starter: 'class Adamiani {\n  constructor(saxeli) {\n    this.saxeli = saxeli;\n  }\n  gamarjoba() {\n    return `გამარჯობა, ${this.saxeli}`;\n  }\n}\n\nclass Studenti extends Adamiani {\n  constructor(saxeli, sagani) {\n    super(saxeli);\n    this.sagani = sagani;\n  }\n  info() {\n    return `${this.gamarjoba()} — ${this.sagani}`;\n  }\n}\n\nconst s = new Studenti("ელენე", "ფიზიკა");\nconsole.log(s.info());',
    test: 'const s = new Studenti("ტესტი", "მათემატიკა"); return s instanceof Adamiani && s.sagani === "მათემატიკა" && s.info().includes("ტესტი");',
    hint: "class Studenti extends Adamiani და constructor-ში super(saxeli).",
    note: "პრაქტიკაში ღრმა მემკვიდრეობის ჯაჭვებს გაურბიან — ხშირად კომპოზიცია (ობიექტების შეთავსება) უფრო მოქნილია, ვიდრე გრძელი იერარქია.",
  });
})();
