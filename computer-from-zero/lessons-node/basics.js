(function () {
  const N = window.nodeLesson;

  N({
    id: "node-intro", title: "რა არის Node.js", short: "რა არის Node",
    theory: "Node.js საშუალებას აძლევს JavaScript-ს, ბრაუზერის გარეთ იმუშაოს — სერვერზე, შენს კომპიუტერზე, ტერმინალში. ის აგებულია Chrome-ის V8 ძრავზე, იმავეზე, რომელიც ბრაუზერში მუშაობს.",
    analogy: "ერთი და იგივე ძრავი: ბრაუზერში ის მანქანაშია ჩასმული, Node-ში კი გენერატორში — იგივე ენა, სხვა გარემო და სხვა შესაძლებლობები.",
    label: "რა იცვლება",
    syntax: "ბრაუზერში გაქვს document, window და fetch, მაგრამ ფაილებზე წვდომა არა. Node-ში პირიქით: არ არის document და window, სამაგიეროდ არის fs (ფაილები), http (სერვერი), process (გარემო). JavaScript-ის თავად ენა ორივეგან ერთი და იგივეა.",
    challenge: "დაბეჭდე Node-ის ვერსია და პლატფორმა process-იდან.",
    starter: 'console.log("Node ვერსია:", process.version);\nconsole.log("პლატფორმა:", process.platform);\nconsole.log("სამუშაო საქაღალდე:", process.cwd());',
    test: 'return typeof process === "object" && typeof process.version === "string";',
    hint: "გამოიყენე process.version და process.platform.",
    note: "Node-ის კოდი ტერმინალიდან იშვება: node index.js. სერვერული აპლიკაციები, ბრძანებათა ხაზის ხელსაწყოები, ბოტები, სკრიპტები — ყველაფერი ამ ერთი ბრძანებით იწყება.",
  });

  N({
    id: "node-modules", title: "მოდულები — require და module.exports", short: "მოდულები",
    theory: "Node-ში თითო ფაილი ცალკე მოდულია. რასაც module.exports-ში ჩადებ, სხვა ფაილს შეუძლია require()-ით წამოიღოს. ეს არის CommonJS სისტემა.",
    analogy: "ყუთი, რომელსაც სახელს აწერ და თაროზე დგამ — სხვა ოთახიდან შეგიძლია მოიტანო.",
    label: "ორი მხარე",
    syntax: "ექსპორტი: module.exports = { add, multiply } ან exports.add = ... . იმპორტი: const math = require(\"./math\"). ლოკალურ ფაილს ./ სჭირდება, პაკეტს კი არა: require(\"fs\").",
    challenge: "წამოიღე მოდული ./math და გამოიყენე მისი ორივე ფუნქცია.",
    starter: 'const math = require("./math");\n\nconsole.log(math.add(2, 3));\nconsole.log(math.multiply(4, 5));\n\n// შენც შეგიძლია ექსპორტი\nmodule.exports.gamarjoba = function () {\n  return "სალამი";\n};\n\nconsole.log(module.exports.gamarjoba());',
    test: 'return math.add(2,3) === 5 && math.multiply(4,5) === 20 && typeof module.exports.gamarjoba === "function";',
    hint: 'const math = require("./math"); მერე math.add(2, 3)',
    note: "მოდულის კოდი მხოლოდ ერთხელ სრულდება, მაშინაც კი, თუ require-ს რამდენჯერმე დაწერ — Node შედეგს ინახავს (ქეშირება).",
  });

  N({
    id: "node-esm", title: "ES მოდულები (import / export)", short: "ES მოდულები",
    theory: "CommonJS-ის (require) გარდა Node თანამედროვე ES მოდულებსაც უჭერს მხარს: import და export — იგივე, რაც ბრაუზერში.",
    analogy: "ორი ენა ერთი და იმავე საქმისთვის: ძველი (require) და ახალი, სტანდარტული (import).",
    label: "როგორ ჩავრთოთ",
    syntax: "package.json-ში დაწერე \"type\": \"module\", ან ფაილს .mjs გაფართოება მიეცი. მაშინ: import fs from \"fs\"; export function add() {}; export default myFn. ES მოდულებში require და __dirname აღარ მუშაობს.",
    challenge: "ამ გარემოში require მუშაობს — გამოიყენე და დაბეჭდე შედეგი (import-ის სინტაქსი კომენტარშია).",
    starter: '// ES მოდულებში ასე დაიწერებოდა:\n// import { add } from "./math.js";\n// export function gamarjoba() {}\n\n// ამ გარემოში CommonJS მუშაობს:\nconst { add } = require("./math");\n\nconsole.log("2 + 2 =", add(2, 2));',
    test: 'return add(2,2) === 4;',
    hint: 'const { add } = require("./math");',
    note: "დღეს ახალ პროექტებში ES მოდულებს ამჯობინებენ — ეს ერთი და იგივე სინტაქსია ბრაუზერშიც და სერვერზეც. ძველი პროექტების უმეტესობა კი ისევ CommonJS-ზეა.",
  });

  N({
    id: "node-npm", title: "npm და package.json", short: "npm",
    theory: "npm არის Node-ის პაკეტების მენეჯერი — მსოფლიოში ყველაზე დიდი ბიბლიოთეკების საცავი. package.json კი პროექტის „პასპორტია“: სახელი, ვერსია, დამოკიდებულებები და სკრიპტები.",
    analogy: "სამზარეულოს რეცეპტების წიგნი და ინგრედიენტების სია: package.json ამბობს რა გჭირდება, npm კი მიგიტანს.",
    label: "ძირითადი ბრძანებები",
    syntax: "npm init -y — პროექტის შექმნა. npm install express — პაკეტის დამატება (ჩაიწერება dependencies-ში). npm install -D nodemon — მხოლოდ დეველოპმენტისთვის. npm run start — package.json-ის scripts განყოფილებიდან ბრძანების გაშვება.",
    challenge: "შექმენი package.json-ის სტრუქტურის ობიექტი და დაბეჭდე მისი scripts.",
    starter: 'const pkg = {\n  name: "chemi-proeqti",\n  version: "1.0.0",\n  main: "index.js",\n  scripts: {\n    start: "node index.js",\n    dev: "nodemon index.js"\n  },\n  dependencies: {\n    express: "^4.18.0"\n  }\n};\n\nconsole.log(pkg.name, pkg.version);\nconsole.log("start:", pkg.scripts.start);',
    test: 'return Boolean(pkg.name && pkg.scripts && pkg.scripts.start === "node index.js" && pkg.dependencies.express);',
    hint: "ობიექტს უნდა ჰქონდეს name, scripts.start და dependencies.",
    note: "node_modules საქაღალდე არასდროს ატვირთო git-ში — ის package.json-იდან ყოველთვის აღდგება npm install-ით. სწორედ ამიტომ არსებობს .gitignore.",
  });

  N({
    id: "node-path", title: "path მოდული", short: "path",
    theory: "path მოდული ფაილის მისამართებთან უსაფრთხოდ მუშაობს. join აერთებს ნაწილებს, basename ფაილის სახელს იღებს, extname — გაფართოებას, dirname — საქაღალდეს.",
    analogy: "მისამართის სწორად აწყობა: ხელით წებება ადვილად შეიძლება შეცდე, ეს ხელსაწყო კი ყოველთვის სწორად აკეთებს.",
    label: "რატომ არა უბრალო წებება",
    syntax: "Windows-ზე გამყოფი \\\\-ია, Linux/Mac-ზე — /. path.join ამას თავად ითვალისწინებს, ამიტომ კოდი ყველგან მუშაობს. __dirname მიმდინარე ფაილის საქაღალდეა — მისამართები მასზე ააგე, არა cwd()-ზე.",
    challenge: "გამოიყენე path.join, path.extname და path.basename.",
    starter: 'const path = require("path");\n\nconst sruli = path.join(__dirname, "notes", "todo.txt");\nconst gaformeba = path.extname(sruli);\nconst saxeli = path.basename(sruli);\n\nconsole.log(sruli);\nconsole.log(gaformeba, saxeli);',
    test: 'return sruli === "/app/notes/todo.txt" && gaformeba === ".txt" && saxeli === "todo.txt";',
    hint: 'path.join(__dirname, "notes", "todo.txt")',
    note: "path.resolve აბსოლუტურ მისამართს აბრუნებს, path.join კი უბრალოდ ნაწილებს აერთებს. სკრიპტებში თითქმის ყოველთვის join + __dirname გამოიყენება.",
  });

  N({
    id: "node-fs-read", title: "fs — ფაილის წაკითხვა", short: "ფაილის კითხვა",
    theory: "fs (file system) მოდული ფაილებთან მუშაობს. readFileSync ფაილს სინქრონულად კითხულობს — პროგრამა ჩერდება, სანამ არ წაიკითხავს.",
    analogy: "წიგნის თაროდან აღება: sync — დგახარ და ელოდები, სანამ მოგიტანენ.",
    label: "კოდირება",
    syntax: "მეორე არგუმენტი კოდირებაა: fs.readFileSync(path, \"utf8\") ტექსტს აბრუნებს. მის გარეშე Buffer-ს (ბაიტებს) მიიღებ. ტექსტისთვის ყოველთვის \"utf8\" მიუთითე.",
    challenge: "წაიკითხე /app/data.txt და დაბეჭდე მისი შიგთავსი.",
    starter: 'const fs = require("fs");\n\nconst teqsti = fs.readFileSync("/app/data.txt", "utf8");\n\nconsole.log(teqsti);\nconsole.log("სიგრძე:", teqsti.length);',
    test: 'return typeof teqsti === "string" && teqsti.indexOf("Node") !== -1;',
    hint: 'fs.readFileSync("/app/data.txt", "utf8")',
    note: "Sync ვერსია მარტივია, მაგრამ სერვერზე საშიშია: სანამ ფაილი იკითხება, სერვერი სხვა მომხმარებელს ვერ ემსახურება. მცირე სკრიპტებში კი სრულიად ნორმალურია.",
  });

  N({
    id: "node-fs-write", title: "fs — ჩაწერა და დამატება", short: "ფაილში ჩაწერა",
    theory: "writeFileSync ფაილს ქმნის ან მთლიანად გადააწერს. appendFileSync კი ბოლოში ამატებს — არსებულს არ შლის. existsSync ამოწმებს, არსებობს თუ არა ფაილი.",
    analogy: "writeFile — სუფთა ფურცელზე გადაწერა; appendFile — არსებულის ბოლოში მიწერა.",
    label: "გაფრთხილება",
    syntax: "writeFileSync უყოყმანოდ გადააწერს არსებულ ფაილს — შემოწმების გარეშე მონაცემი შეიძლება დაკარგო. ლოგებისთვის ყოველთვის appendFileSync გამოიყენე.",
    challenge: "ჩაწერე ფაილი, მერე დაამატე ბოლოში და წაიკითხე შედეგი.",
    starter: 'const fs = require("fs");\n\nfs.writeFileSync("/app/log.txt", "პირველი ხაზი\\n");\nfs.appendFileSync("/app/log.txt", "მეორე ხაზი\\n");\n\nconst shedegi = fs.readFileSync("/app/log.txt", "utf8");\n\nconsole.log(shedegi);\nconsole.log("არსებობს:", fs.existsSync("/app/log.txt"));',
    test: 'return shedegi.indexOf("პირველი") !== -1 && shedegi.indexOf("მეორე") !== -1;',
    hint: "writeFileSync, მერე appendFileSync, მერე readFileSync.",
    note: "ამ გარემოში ფაილები მეხსიერებაშია და გვერდის განახლებისას ქრება — ნამდვილ Node-ში კი ისინი დისკზე იწერება.",
  });

  N({
    id: "node-fs-async", title: "fs — ასინქრონული (callback)", short: "ასინქრონული fs",
    theory: "readFile (Sync-ის გარეშე) ფაილს ფონურად კითხულობს და დასრულებისას callback-ს იძახებს. პროგრამა ლოდინში არ დგება.",
    analogy: "შეკვეთა კაფეში: შეუკვეთე და დაჯექი — გამზადებისას დაგიძახებენ. სანამ ელოდები, სხვა საქმეს აკეთებ.",
    label: "error-first callback",
    syntax: "Node-ის კონვენციაა: callback-ის პირველი არგუმენტი ყოველთვის შეცდომაა — function(err, data). ჯერ err შეამოწმე და მხოლოდ მერე გამოიყენე data. ეს ყველა ძველ Node API-ში ასეა.",
    challenge: "წაიკითხე ფაილი ასინქრონულად და დაბეჭდე შედეგი callback-ში.",
    starter: 'const fs = require("fs");\n\nlet wakitxuli = null;\n\nfs.readFile("/app/data.txt", "utf8", function (err, data) {\n  if (err) {\n    console.log("შეცდომა:", err.message);\n    return;\n  }\n  wakitxuli = data;\n  console.log("წავიკითხე:", data);\n});\n\nconsole.log("ეს ადრე იბეჭდება — კითხვა ფონურია");',
    test: 'return new Promise(function(res){ setTimeout(function(){ res(wakitxuli !== null && wakitxuli.indexOf("Node") !== -1); }, 20); });',
    hint: "fs.readFile(path, \"utf8\", function (err, data) { ... })",
    note: "დააკვირდი რიგს: ბოლო console.log პირველი გამოჩნდა. ეს ასინქრონულობის არსია — Node ლოდინში არ დგება, არამედ სხვა საქმეზე გადადის.",
  });

  N({
    id: "node-fs-promises", title: "fs/promises და async/await", short: "fs/promises",
    theory: "თანამედროვე Node-ში ფაილებთან მუშაობა Promise-ებით ხდება: const fs = require(\"fs/promises\"). მაშინ await-ის გამოყენება შეიძლება და კოდი წრფივად იკითხება.",
    analogy: "იგივე შეკვეთა, ოღონდ ახლა უბრალოდ ელოდები მაგიდასთან — დამატებითი ინსტრუქციის დატოვება აღარ გჭირდება.",
    label: "საუკეთესო არჩევანი",
    syntax: "await მხოლოდ async ფუნქციის შიგნით მუშაობს. შეცდომებს try/catch იჭერს. ეს ვარიანტი ყველაზე წაკითხვადია და დღეს სტანდარტულ არჩევნად ითვლება.",
    challenge: "წაიკითხე ფაილი async/await-ით და დააბრუნე მისი შიგთავსი.",
    starter: 'const fsp = require("fs/promises");\n\nasync function wakitxva() {\n  try {\n    const data = await fsp.readFile("/app/data.txt");\n    console.log("მივიღე:", data);\n    return data;\n  } catch (err) {\n    console.log("ვერ წავიკითხე:", err.message);\n    return null;\n  }\n}\n\nwakitxva();',
    test: 'return typeof wakitxva === "function" && typeof wakitxva().then === "function";',
    hint: "async function-ის შიგნით: const data = await fsp.readFile(...)",
    note: "სამივე სტილი (sync, callback, promises) ერთსა და იმავეს აკეთებს. ახალ კოდში promises აირჩიე; sync მხოლოდ პატარა სკრიპტებში, სადაც ლოდინი პრობლემა არაა.",
  });

  N({
    id: "node-fs-dirs", title: "საქაღალდეები", short: "საქაღალდეები",
    theory: "readdirSync საქაღალდის შიგთავსს ჩამოთვლის, mkdirSync ქმნის ახალს, unlinkSync შლის ფაილს.",
    analogy: "თაროს დათვალიერება: რა დევს, სად და რამდენი.",
    label: "პრაქტიკა",
    syntax: "readdirSync მხოლოდ სახელებს აბრუნებს — სრული მისამართისთვის path.join გამოიყენე. ჩალაგებული საქაღალდის შესაქმნელად: mkdirSync(p, { recursive: true }).",
    challenge: "ჩამოთვალე /app-ის შიგთავსი და გაფილტრე მხოლოდ .txt ფაილები.",
    starter: 'const fs = require("fs");\nconst path = require("path");\n\nconst yvela = fs.readdirSync("/app");\nconst teqstebi = yvela.filter(function (f) {\n  return path.extname(f) === ".txt";\n});\n\nconsole.log("ყველა:", yvela.join(", "));\nconsole.log("მხოლოდ ტექსტი:", teqstebi.join(", "));',
    test: 'return Array.isArray(yvela) && yvela.length >= 2 && teqstebi.indexOf("data.txt") !== -1;',
    hint: 'fs.readdirSync("/app") და filter-ით path.extname(f) === ".txt"',
    note: "დიდი საქაღალდის სინქრონული კითხვა სერვერს აჩერებს. სერვერზე ყოველთვის fs/promises-ის readdir გამოიყენე.",
  });

  N({
    id: "node-process-argv", title: "process.argv — ბრძანების არგუმენტები", short: "argv",
    theory: "process.argv მასივია, რომელშიც ტერმინალიდან გადმოცემული არგუმენტებია. პირველი ორი ყოველთვის node-ის და სკრიპტის მისამართია, ნამდვილი არგუმენტები მესამიდან იწყება.",
    analogy: "ბრძანება ტერმინალში, როგორც შეკვეთა: „node app.js --name ელენე“ — სკრიპტს ეუბნები, რა გააკეთოს.",
    label: "პრაქტიკა",
    syntax: "process.argv.slice(2) ნამდვილ არგუმენტებს იღებს. რთული ბრძანებებისთვის ბიბლიოთეკებს იყენებენ (commander, yargs), მაგრამ მარტივ სკრიპტში slice სავსებით საკმარისია.",
    challenge: "აიღე არგუმენტები slice(2)-ით და დაბეჭდე მათი რაოდენობა.",
    starter: '// წარმოვიდგინოთ: node index.js gamarjoba msoflio\nprocess.argv.push("gamarjoba", "msoflio");\n\nconst argumentebi = process.argv.slice(2);\n\nconsole.log("არგუმენტები:", argumentebi.join(", "));\nconsole.log("რაოდენობა:", argumentebi.length);',
    test: 'return Array.isArray(argumentebi) && argumentebi.length === 2 && argumentebi[0] === "gamarjoba";',
    hint: "process.argv.slice(2)",
    note: "სწორედ ასე მუშაობს ყველა ბრძანებათა ხაზის ხელსაწყო — npm, git, eslint. ისინიც კითხულობენ argv-ს და მის მიხედვით მოქმედებენ.",
  });

  N({
    id: "node-process-env", title: "process.env და გარემოს ცვლადები", short: "env",
    theory: "process.env გარემოს ცვლადებს შეიცავს — პარამეტრებს, რომლებიც კოდში არ იწერება: პორტი, მონაცემთა ბაზის მისამართი, API გასაღებები.",
    analogy: "სეიფი, რომელიც პროგრამის გვერდითაა: კოდი მასზე მიუთითებს, მაგრამ შიგთავსი კოდში არ წერია.",
    label: "უსაფრთხოების წესი",
    syntax: "პაროლი და API გასაღები არასდროს ჩაწერო კოდში და არასდროს ატვირთო git-ში — ისინი .env ფაილში ინახება, რომელიც .gitignore-შია. ნაგულისხმევი მნიშვნელობა ასე იწერება: process.env.PORT || 3000.",
    challenge: "წაიკითხე PORT გარემოდან ნაგულისხმევი მნიშვნელობით.",
    starter: 'const porti = process.env.PORT || 3000;\nconst gareemo = process.env.NODE_ENV || "development";\n\nconsole.log("პორტი:", porti);\nconsole.log("გარემო:", gareemo);\nconsole.log("პროდაქშენია?", gareemo === "production");',
    test: 'return String(porti) === "3000" && gareemo === "development";',
    hint: "process.env.PORT || 3000",
    note: "NODE_ENV-ის მიხედვით აპლიკაცია ხშირად სხვანაირად იქცევა: development-ში დეტალურ შეცდომებს აჩვენებს, production-ში კი — მოკლე შეტყობინებას, რომ დეტალები არ გაჟონოს.",
  });

  N({
    id: "node-events", title: "EventEmitter", short: "EventEmitter",
    theory: "Node-ის დიდი ნაწილი მოვლენებზეა აგებული. EventEmitter საშუალებას გაძლევს, საკუთარი მოვლენები შექმნა: on-ით ისმენ, emit-ით აგზავნი.",
    analogy: "რადიოსადგური: emit — გადაცემა ეთერში; on — მსმენელი, რომელიც ამ ტალღაზეა მორთული.",
    label: "სად გვხვდება",
    syntax: "http სერვერი, ფაილის ნაკადები, პროცესის სიგნალები — ყველა EventEmitter-ია. once მხოლოდ პირველ მოვლენას უსმენს. მოსმენის შესაწყვეტად off (ან removeListener) გამოიყენე.",
    challenge: "შექმენი EventEmitter, დაუსმინე მოვლენას და გაუშვი ის.",
    starter: 'const { EventEmitter } = require("events");\n\nconst emitteri = new EventEmitter();\nlet migebuli = null;\n\nemitteri.on("shetyobineba", function (teqsti) {\n  migebuli = teqsti;\n  console.log("მივიღე:", teqsti);\n});\n\nemitteri.emit("shetyobineba", "გამარჯობა!");\nemitteri.emit("shetyobineba", "მეორედ");\n\nconsole.log("მსმენელები:", emitteri.listenerCount("shetyobineba"));',
    test: 'return migebuli === "მეორედ" && emitteri.listenerCount("shetyobineba") === 1;',
    hint: 'emitteri.on("shetyobineba", fn) და emitteri.emit("shetyobineba", "ტექსტი")',
    note: "მოვლენების მოდელი საშუალებას აძლევს კოდის ნაწილებს, ერთმანეთზე პირდაპირ დამოკიდებულების გარეშე ისაუბრონ — ეს დიდ აპლიკაციებში ძალიან მნიშვნელოვანია.",
  });

  N({
    id: "node-json", title: "JSON ფაილებთან მუშაობა", short: "JSON",
    theory: "Node-ში მონაცემები ხშირად JSON ფაილებში ინახება. კითხვა: readFileSync + JSON.parse. ჩაწერა: JSON.stringify + writeFileSync.",
    analogy: "ჩანაწერების რვეული: კითხვისას გაშიფრავ, ჩაწერისას — ისევ ტექსტად აქცევ.",
    label: "პრაქტიკა",
    syntax: "JSON.stringify(data, null, 2) ლამაზად ფორმატირებულ ტექსტს იძლევა — ადამიანისთვის წასაკითხად. არასწორი JSON-ის parse შეცდომას აგდებს, ამიტომ ის try/catch-ში ჩასვი.",
    challenge: "წაიკითხე users.json, დაამატე ახალი მომხმარებელი და ჩაწერე უკან.",
    starter: 'const fs = require("fs");\n\nconst users = JSON.parse(fs.readFileSync("/app/users.json", "utf8"));\nconsole.log("იყო:", users.length);\n\nusers.push({ saxeli: "დავითი", asaki: 34 });\n\nfs.writeFileSync("/app/users.json", JSON.stringify(users, null, 2));\n\nconst axali = JSON.parse(fs.readFileSync("/app/users.json", "utf8"));\nconsole.log("გახდა:", axali.length, "ბოლო:", axali[axali.length - 1].saxeli);',
    test: 'return axali.length === 3 && axali[2].saxeli === "დავითი";',
    hint: "JSON.parse წაკითხვისას, JSON.stringify ჩაწერისას.",
    note: "პატარა პროექტისთვის JSON ფაილი სავსებით საკმარისი „ბაზაა“. როცა მონაცემი იზრდება ან ერთდროულად ბევრი მომხმარებელი წერს — მაშინ ნამდვილი ბაზა (PostgreSQL, MongoDB) სჭირდება.",
  });

  N({
    id: "node-errors", title: "შეცდომების დამუშავება", short: "შეცდომები",
    theory: "Node-ში შეცდომა სამნაირად მოდის: sync ფუნქცია აგდებს (try/catch), callback პირველ არგუმენტში აბრუნებს (err), Promise კი reject-ს აკეთებს (.catch ან try/catch await-თან).",
    analogy: "სამი განსხვავებული სიგნალიზაცია ერთსა და იმავე შენობაში — თითოს თავისი რეაგირება სჭირდება.",
    label: "წესი",
    syntax: "შეცდომას აქვს .message და .code — მაგალითად \"ENOENT\" ნიშნავს „ფაილი ვერ მოიძებნა“. ცარიელი catch არასდროს დატოვო. სერვერზე შეცდომა უნდა დაილოგოს, მომხმარებელს კი ზოგადი შეტყობინება გაეგზავნოს.",
    challenge: "დაიჭირე ფაილის წაკითხვის შეცდომა და დაბეჭდე მისი კოდი.",
    starter: 'const fs = require("fs");\n\nlet kodi = null;\n\ntry {\n  const t = fs.readFileSync("/app/ar-arsebobs.txt", "utf8");\n  console.log(t);\n} catch (err) {\n  kodi = err.code;\n  console.log("შეცდომის კოდი:", err.code);\n  console.log("შეტყობინება:", err.message);\n}\n\nconsole.log("პროგრამა გრძელდება");',
    test: 'return kodi === "ENOENT";',
    hint: "try { fs.readFileSync(...) } catch (err) { err.code }",
    note: "ENOENT, EACCES (უფლება არ არის), EEXIST (უკვე არსებობს) — ეს კოდები Node-ში ყოველთვის ერთნაირია და მათი დამუშავება კონკრეტულად შეიძლება.",
  });
})();
