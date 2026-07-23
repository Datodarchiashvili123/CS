(function () {
  const N = window.nodeLesson;

  N({
    id: "node-http-server", title: "http — პირველი სერვერი", short: "პირველი სერვერი",
    theory: "http.createServer ქმნის სერვერს. მას გადასცემ ფუნქციას, რომელიც ყოველ მოთხოვნაზე გამოიძახება და ორ არგუმენტს იღებს: req (რა მოითხოვეს) და res (რას ვპასუხობთ).",
    analogy: "მიმღები ფანჯარა: req — შემოსული განცხადება, res — შენი პასუხი.",
    label: "მინიმუმი",
    syntax: "res.end() აუცილებელია — მის გარეშე ბრაუზერი უსასრულოდ დაელოდება. listen(port) სერვერს პორტზე უსმენს. ლოკალურად ის ხელმისაწვდომია http://localhost:3000-ზე.",
    challenge: "შექმენი სერვერი, რომელიც ყველა მოთხოვნაზე პასუხობს ტექსტით.",
    starter: 'const http = require("http");\n\nconst serveri = http.createServer(function (req, res) {\n  res.statusCode = 200;\n  res.setHeader("Content-Type", "text/plain; charset=utf-8");\n  res.end("გამარჯობა Node სერვერიდან!");\n});\n\nserveri.listen(3000, function () {\n  console.log("სერვერი მუშაობს: http://localhost:3000");\n});\n\n// ვცადოთ მოთხოვნა\n__request("GET", "/").then(function (r) {\n  console.log("სტატუსი:", r.status);\n  console.log("პასუხი:", r.body);\n});',
    test: 'return __request("GET", "/").then(function (r) { return r.status === 200 && r.body.length > 0; });',
    hint: "http.createServer(function (req, res) { res.end(\"ტექსტი\"); }).listen(3000)",
    note: "__request ამ გარემოს დამხმარეა — ის ბრაუზერის ნაცვლად აგზავნის მოთხოვნას შენს სერვერზე. ნამდვილ Node-ში უბრალოდ ბრაუზერში გახსნიდი localhost:3000-ს.",
  });

  N({
    id: "node-routing", title: "მარშრუტიზაცია (routing)", short: "მარშრუტები",
    theory: "req.url გვიჩვენებს, რომელი მისამართი მოითხოვეს, req.method კი — რომელი მეთოდით (GET, POST). ამის მიხედვით სხვადასხვა პასუხს ვაბრუნებთ.",
    analogy: "მისაღები, სადაც განცხადებას მისამართის მიხედვით სხვადასხვა ოთახში აგზავნიან.",
    label: "სტატუსის კოდები",
    syntax: "200 — წარმატება, 201 — შეიქმნა, 400 — არასწორი მოთხოვნა, 404 — ვერ მოიძებნა, 500 — სერვერის შეცდომა. უცნობ მისამართზე ყოველთვის 404 დააბრუნე.",
    challenge: "გააკეთე ორი მარშრუტი (/ და /about) და 404 დანარჩენისთვის.",
    starter: 'const http = require("http");\n\nhttp.createServer(function (req, res) {\n  if (req.url === "/") {\n    res.statusCode = 200;\n    res.end("მთავარი გვერდი");\n  } else if (req.url === "/about") {\n    res.statusCode = 200;\n    res.end("ჩვენ შესახებ");\n  } else {\n    res.statusCode = 404;\n    res.end("გვერდი ვერ მოიძებნა");\n  }\n}).listen(3000);\n\n__request("GET", "/about").then(function (r) {\n  console.log("/about →", r.status, r.body);\n});\n__request("GET", "/uknown").then(function (r) {\n  console.log("/uknown →", r.status);\n});',
    test: 'return __request("GET","/about").then(function(a){ return __request("GET","/xx").then(function(b){ return a.body.indexOf("ჩვენ") !== -1 && b.status === 404; }); });',
    hint: "if (req.url === \"/about\") ... else res.statusCode = 404",
    note: "რამდენიმე მარშრუტზე ეს if-ების ჯაჭვი სწრაფად რთულდება — სწორედ ამიტომ გამოიგონეს Express, რომელსაც შემდეგ გაკვეთილებში გავეცნობით.",
  });

  N({
    id: "node-json-api", title: "JSON API-ს დაბრუნება", short: "JSON API",
    theory: "თანამედროვე სერვერები ჩვეულებრივ JSON-ს აბრუნებენ და არა HTML-ს — ფრონტენდი კი მას fetch-ით იღებს და ეკრანზე ხატავს.",
    analogy: "სერვერი მონაცემებს „ნედლად“ გზავნის, გაფორმებას კი კლიენტი აკეთებს — როგორც ინგრედიენტების მიწოდება რესტორანში.",
    label: "აუცილებელი სათაური",
    syntax: "Content-Type: application/json აუცილებელია — მის გარეშე კლიენტი პასუხს ტექსტად აღიქვამს. სხეული JSON.stringify-ით ტექსტად უნდა აქციო.",
    challenge: "დააბრუნე JSON მასივი სწორი Content-Type-ით.",
    starter: 'const http = require("http");\n\nconst users = [\n  { id: 1, saxeli: "ელენე" },\n  { id: 2, saxeli: "ნატალი" }\n];\n\nhttp.createServer(function (req, res) {\n  if (req.url === "/api/users") {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.end(JSON.stringify(users));\n  } else {\n    res.statusCode = 404;\n    res.end("not found");\n  }\n}).listen(3000);\n\n__request("GET", "/api/users").then(function (r) {\n  console.log("სათაური:", r.headers["content-type"]);\n  console.log("მონაცემი:", r.body);\n});',
    test: 'return __request("GET","/api/users").then(function(r){ var d = JSON.parse(r.body); return r.headers["content-type"] === "application/json" && d.length === 2 && d[0].saxeli === "ელენე"; });',
    hint: 'res.writeHead(200, { "Content-Type": "application/json" }); res.end(JSON.stringify(users));',
    note: "REST-ის კონვენციით მისამართები არსებით სახელად იწერება მრავლობითში: /api/users, /api/products. მოქმედებას კი მეთოდი განსაზღვრავს: GET — წაკითხვა, POST — შექმნა, DELETE — წაშლა.",
  });

  N({
    id: "node-post-body", title: "POST და მოთხოვნის სხეული", short: "POST",
    theory: "GET მონაცემს მისამართში გზავნის, POST კი — სხეულში. Node-ში სხეული ნაწილ-ნაწილ (ნაკადად) მოდის, ამიტომ მას data მოვლენებით აგროვებ და end-ზე ამუშავებ.",
    analogy: "დიდი ამანათი რამდენიმე კოლით მოდის — ჯერ ყველა ნაწილს იღებ, მერე ერთად ხსნი.",
    label: "შაბლონი",
    syntax: "let body = \"\"; req.on(\"data\", c => body += c); req.on(\"end\", () => { ... }). JSON.parse ყოველთვის try/catch-ში ჩასვი — კლიენტმა შეიძლება არასწორი მონაცემი გამოგზავნოს.",
    challenge: "მიიღე POST მოთხოვნის სხეული და დააბრუნე შექმნილი ობიექტი სტატუსით 201.",
    starter: 'const http = require("http");\n\nhttp.createServer(function (req, res) {\n  if (req.method === "POST" && req.url === "/api/users") {\n    let body = "";\n    req.on("data", function (chunk) { body += chunk; });\n    req.on("end", function () {\n      try {\n        const user = JSON.parse(body);\n        res.writeHead(201, { "Content-Type": "application/json" });\n        res.end(JSON.stringify({ id: 3, saxeli: user.saxeli }));\n      } catch (e) {\n        res.statusCode = 400;\n        res.end("არასწორი JSON");\n      }\n    });\n    return;\n  }\n  res.statusCode = 404;\n  res.end("not found");\n}).listen(3000);\n\n__request("POST", "/api/users", JSON.stringify({ saxeli: "დავითი" })).then(function (r) {\n  console.log(r.status, r.body);\n});',
    test: 'return __request("POST","/api/users", JSON.stringify({saxeli:"ტესტი"})).then(function(r){ return r.status === 201 && JSON.parse(r.body).saxeli === "ტესტი"; });',
    hint: 'req.on("data", ...) და req.on("end", ...) შიგნით JSON.parse(body)',
    note: "201 Created ზუსტად ამ შემთხვევისთვისაა — ის ამბობს „რესურსი შეიქმნა“. Express-ში ეს ყველაფერი ერთი ხაზით კეთდება: express.json() middleware-ით.",
  });

  N({
    id: "node-express-intro", title: "Express — შესავალი", short: "Express",
    theory: "Express არის Node-ის ყველაზე პოპულარული ვებ-ფრეიმვორკი. ის იმავეს აკეთებს, რაც http მოდული, ოღონდ გაცილებით მოკლედ და მოხერხებულად.",
    analogy: "სუფთა http — ხელით შეკერვა; Express — საკერავი მანქანა. შედეგი იგივეა, შრომა კი ბევრად ნაკლები.",
    label: "დაყენება",
    syntax: "npm install express, მერე: const express = require(\"express\"); const app = express(); app.get(\"/\", (req, res) => res.send(\"hi\")); app.listen(3000). res.send თავად ადგენს Content-Type-ს, res.json კი JSON-ს აბრუნებს.",
    challenge: "შექმენი Express აპლიკაცია ორი მარშრუტით.",
    starter: 'const express = require("express");\nconst app = express();\n\napp.get("/", function (req, res) {\n  res.send("მთავარი გვერდი");\n});\n\napp.get("/about", function (req, res) {\n  res.json({ gverdi: "ჩვენ შესახებ" });\n});\n\napp.listen(3000, function () {\n  console.log("Express მუშაობს პორტზე 3000");\n});\n\n__request("GET", "/").then(function (r) { console.log("/ →", r.body); });\n__request("GET", "/about").then(function (r) { console.log("/about →", r.body); });',
    test: 'return __request("GET","/about").then(function(r){ return JSON.parse(r.body).gverdi === "ჩვენ შესახებ"; });',
    hint: 'app.get("/about", (req, res) => res.json({ gverdi: "ჩვენ შესახებ" }))',
    note: "Express-ში 404 ავტომატურია — თუ არცერთი მარშრუტი არ დაემთხვა, ის თავად აბრუნებს „Cannot GET /...“. სუფთა http-ში ეს ხელით უნდა დაწერო.",
  });

  N({
    id: "node-express-params", title: "Express — პარამეტრები და query", short: "პარამეტრები",
    theory: "მისამართის ნაწილი შეიძლება ცვლადი იყოს: app.get(\"/users/:id\") — მაშინ req.params.id-ში მნიშვნელობა ჩაჯდება. კითხვის ნიშნის შემდეგ მოსული პარამეტრები კი req.query-შია.",
    analogy: "მისამართის შაბლონი: „ოთახი ნომერი X“ — X ყოველ ჯერზე სხვაა, სტრუქტურა კი იგივე.",
    label: "განსხვავება",
    syntax: "/users/5 → req.params.id === \"5\" (ყოველთვის ტექსტია, საჭიროებისას Number()-ით გადაიყვანე). /search?q=abc&page=2 → req.query.q და req.query.page.",
    challenge: "შექმენი მარშრუტი პარამეტრით და ერთი query-ით.",
    starter: 'const express = require("express");\nconst app = express();\n\nconst users = [\n  { id: 1, saxeli: "ელენე" },\n  { id: 2, saxeli: "ნატალი" }\n];\n\napp.get("/users/:id", function (req, res) {\n  const id = Number(req.params.id);\n  const user = users.find(function (u) { return u.id === id; });\n  if (!user) {\n    return res.status(404).json({ shecdoma: "ვერ მოიძებნა" });\n  }\n  res.json(user);\n});\n\napp.get("/search", function (req, res) {\n  res.json({ moidzebna: req.query.q });\n});\n\napp.listen(3000);\n\n__request("GET", "/users/2").then(function (r) { console.log("user:", r.body); });\n__request("GET", "/search?q=node").then(function (r) { console.log("search:", r.body); });',
    test: 'return __request("GET","/users/2").then(function(a){ return __request("GET","/search?q=node").then(function(b){ return JSON.parse(a.body).saxeli === "ნატალი" && JSON.parse(b.body).moidzebna === "node"; }); });',
    hint: 'app.get("/users/:id", ...) და req.params.id; query-სთვის req.query.q',
    note: "req.params ყოველთვის ტექსტს აბრუნებს — /users/2-ზეც კი მიიღებ \"2\"-ს და არა 2-ს. სწორედ ამიტომაა Number() საჭირო შედარებამდე.",
  });

  N({
    id: "node-express-middleware", title: "Express — middleware", short: "middleware",
    theory: "middleware არის ფუნქცია, რომელიც მოთხოვნასა და პასუხს შორის სრულდება. მას სამი არგუმენტი აქვს: req, res, next. next() შემდეგზე გადასცემს სათქმელს.",
    analogy: "კონვეიერი: ამანათი რამდენიმე პუნქტს გადის — შემოწმება, ეტიკეტირება, აღრიცხვა — და მხოლოდ მერე მიდის დანიშნულებისამებრ.",
    label: "წესი",
    syntax: "next()-ის დაძახება აუცილებელია, თორემ მოთხოვნა „ჩაიკიდება“. app.use(fn) ყველა მოთხოვნაზე მუშაობს. რიგს მნიშვნელობა აქვს: middleware მარშრუტამდე უნდა გამოცხადდეს. ხშირი მაგალითები: ლოგირება, ავტორიზაცია, express.json().",
    challenge: "დაწერე middleware, რომელიც ითვლის მოთხოვნებს და next()-ს იძახებს.",
    starter: 'const express = require("express");\nconst app = express();\n\nlet motxovnebi = 0;\n\napp.use(function (req, res, next) {\n  motxovnebi++;\n  console.log("მოთხოვნა:", req.method, req.url);\n  next();\n});\n\napp.get("/", function (req, res) {\n  res.json({ motxovnebi: motxovnebi });\n});\n\napp.listen(3000);\n\n__request("GET", "/").then(function (r) { console.log("პასუხი:", r.body); });',
    test: 'return __request("GET","/").then(function(r){ return JSON.parse(r.body).motxovnebi >= 1; });',
    hint: "app.use(function (req, res, next) { ...; next(); })",
    note: "თუ next() არ დაიძახე და პასუხიც არ გააგზავნე, ბრაუზერი უსასრულოდ დაელოდება — ეს Express-ის ერთ-ერთი ყველაზე ხშირი შეცდომაა.",
  });

  N({
    id: "node-express-json", title: "Express — JSON API და POST", short: "Express JSON",
    theory: "express.json() middleware ავტომატურად კითხულობს მოთხოვნის სხეულს და req.body-ში ობიექტად ათავსებს — ხელით ნაკადის შეგროვება აღარ გჭირდება.",
    analogy: "ავტომატური გამშიფრავი: ამანათი უკვე გახსნილი და დალაგებული მოდის.",
    label: "აუცილებელი",
    syntax: "app.use(express.json()) მარშრუტებამდე დაწერე, თორემ req.body undefined იქნება. ეს ერთი ხაზი ცვლის იმ 15 ხაზს, რაც სუფთა http-ში დაგვჭირდა.",
    challenge: "მიიღე POST JSON და დააბრუნე შექმნილი ჩანაწერი 201 სტატუსით.",
    starter: 'const express = require("express");\nconst app = express();\n\napp.use(express.json());\n\nconst users = [];\n\napp.post("/api/users", function (req, res) {\n  if (!req.body || !req.body.saxeli) {\n    return res.status(400).json({ shecdoma: "saxeli აუცილებელია" });\n  }\n  const user = { id: users.length + 1, saxeli: req.body.saxeli };\n  users.push(user);\n  res.status(201).json(user);\n});\n\napp.get("/api/users", function (req, res) {\n  res.json(users);\n});\n\napp.listen(3000);\n\n__request("POST", "/api/users", JSON.stringify({ saxeli: "ლუკა" })).then(function (r) {\n  console.log("შეიქმნა:", r.status, r.body);\n});',
    test: 'return __request("POST","/api/users", JSON.stringify({saxeli:"ტესტი"})).then(function(r){ return r.status === 201 && JSON.parse(r.body).saxeli === "ტესტი"; });',
    hint: "app.use(express.json()); მერე req.body.saxeli",
    note: "მომხმარებლისგან მოსული მონაცემი ყოველთვის შეამოწმე — ეს არა მხოლოდ შეცდომებისგან, არამედ შეტევებისგანაც იცავს. დიდ პროექტებში ამისთვის ბიბლიოთეკებს იყენებენ (zod, joi).",
  });

  N({
    id: "node-express-errors", title: "Express — შეცდომების დამუშავება", short: "შეცდომები Express-ში",
    theory: "Express-ს აქვს სპეციალური middleware შეცდომებისთვის — ის ოთხ არგუმენტს იღებს: (err, req, res, next). ის ყველა მარშრუტის შემდეგ უნდა გამოცხადდეს.",
    analogy: "უსაფრთხოების ბადე მთელი შენობის ქვეშ: სადაც არ უნდა ჩამოვარდე, ის დამიჭერს.",
    label: "წესი",
    syntax: "ოთხივე არგუმენტი აუცილებელია — თუ სამს დაწერ, Express მას ჩვეულებრივ middleware-დ ჩათვლის. async მარშრუტში შეცდომა ხელით უნდა გადასცე: next(err) ან try/catch გამოიყენე.",
    challenge: "დაამატე შეცდომების middleware და დააბრუნე 500 სტატუსი.",
    starter: 'const express = require("express");\nconst app = express();\n\napp.get("/ok", function (req, res) {\n  res.send("კარგადაა");\n});\n\napp.get("/shecdoma", function (req, res, next) {\n  next(new Error("რაღაც წაიშალა"));\n});\n\n// შეცდომების middleware — ოთხი არგუმენტი!\napp.use(function (err, req, res, next) {\n  console.log("დაფიქსირდა:", err.message);\n  res.status(500).json({ shecdoma: "სერვერის შეცდომა" });\n});\n\napp.listen(3000);\n\n__request("GET", "/ok").then(function (r) { console.log("/ok →", r.status); });',
    test: 'return __request("GET","/ok").then(function(r){ return r.status === 200 && r.body.indexOf("კარგადაა") !== -1; });',
    hint: "app.use(function (err, req, res, next) { res.status(500)... })",
    note: "პროდაქშენში შეცდომის დეტალები მომხმარებელს არ უნდა გამოუჩნდეს — ისინი ლოგში უნდა ჩაიწეროს, პასუხად კი ზოგადი შეტყობინება წავიდეს. სხვაგვარად თავდამსხმელს სისტემის შესახებ ინფორმაციას აძლევ.",
  });

  N({
    id: "node-structure", title: "პროექტის სტრუქტურა", short: "სტრუქტურა",
    theory: "როცა პროექტი იზრდება, ერთ index.js-ში ყველაფრის წერა შეუძლებელი ხდება. კოდი იყოფა ფენებად: მარშრუტები, ლოგიკა (services), მონაცემები (models), კონფიგურაცია.",
    analogy: "სახლი ოთახებით: სამზარეულო, საძინებელი, აბაზანა — თითოს თავისი დანიშნულება, ერთ დიდ ოთახში ყველაფერი რომ არ ერეოდეს.",
    label: "ტიპური განლაგება",
    syntax: "src/index.js — გაშვება; src/routes/ — მარშრუტები; src/controllers/ — მარშრუტის დამმუშავებლები; src/services/ — ბიზნეს-ლოგიკა; src/models/ — მონაცემები; .env — საიდუმლოებები. თითო ფაილი ერთ საქმეს აკეთებს.",
    challenge: "დაყავი კოდი: ცალკე მოდული ლოგიკისთვის და ცალკე მარშრუტისთვის.",
    starter: '// წარმოვიდგინოთ, რომ ეს ცალკე ფაილებია\n\n// services/userService.js\nconst userService = {\n  yvela: function () {\n    return [{ id: 1, saxeli: "ელენე" }];\n  },\n  moxsna: function (id) {\n    return { id: id, washlilia: true };\n  }\n};\n\n// routes/users.js — მარშრუტი მხოლოდ სერვისს იძახებს\nconst express = require("express");\nconst app = express();\n\napp.get("/api/users", function (req, res) {\n  res.json(userService.yvela());\n});\n\napp.listen(3000);\n\n__request("GET", "/api/users").then(function (r) { console.log(r.body); });',
    test: 'return __request("GET","/api/users").then(function(r){ return JSON.parse(r.body)[0].saxeli === "ელენე" && typeof userService.yvela === "function"; });',
    hint: "ლოგიკა userService-ში, მარშრუტი კი მხოლოდ მას იძახებს.",
    note: "მთავარი პრინციპია: მარშრუტმა არ უნდა იცოდეს, როგორ ინახება მონაცემი. ასე ბაზის შეცვლა მარშრუტებს არ შეეხება — ეს ერთ-ერთი ყველაზე ღირებული ჩვევაა backend-ში.",
  });

  N({
    id: "node-async-patterns", title: "ასინქრონული სერვერი", short: "ასინქრონული",
    theory: "სერვერზე თითქმის ყველა ოპერაცია ასინქრონულია: ბაზის მოთხოვნა, ფაილის კითხვა, სხვა API-ს გამოძახება. Express-ის მარშრუტი შეიძლება იყოს async და შიგნით await გამოიყენო.",
    analogy: "ოფიციანტი, რომელიც ერთ შეკვეთას სამზარეულოში ტოვებს და მაშინვე მეორე მაგიდასთან მიდის — არ დგას ლოდინში.",
    label: "მთავარი წესი",
    syntax: "async მარშრუტში ყოველთვის try/catch გამოიყენე — სხვაგვარად შეცდომა „გაძვრება“ და მოთხოვნა ჩაიკიდება. სწორედ ეს არის Express-თან ერთ-ერთი ყველაზე ხშირი შეცდომა.",
    challenge: "დაწერე async მარშრუტი, რომელიც ფაილს კითხულობს და შედეგს აბრუნებს.",
    starter: 'const express = require("express");\nconst fsp = require("fs/promises");\nconst app = express();\n\napp.get("/api/data", async function (req, res) {\n  try {\n    const teqsti = await fsp.readFile("/app/data.txt");\n    res.json({ shigtavsi: teqsti });\n  } catch (err) {\n    res.status(500).json({ shecdoma: "ვერ წავიკითხე" });\n  }\n});\n\napp.listen(3000);\n\n__request("GET", "/api/data").then(function (r) {\n  console.log(r.status, r.body);\n});',
    test: 'return __request("GET","/api/data").then(function(r){ return r.status === 200 && JSON.parse(r.body).shigtavsi.indexOf("Node") !== -1; });',
    hint: "async function (req, res) { try { const t = await fsp.readFile(...); res.json(...) } catch ... }",
    note: "Node ერთ ნაკადში (single thread) მუშაობს — სწორედ ასინქრონულობა აძლევს მას საშუალებას, ათასობით მოთხოვნა ერთდროულად მოემსახუროს. ერთი სინქრონული, მძიმე ოპერაცია მთელ სერვერს აჩერებს.",
  });

  // ---------- რეკაპი ----------
  window.NodeLessons.push({
    id: "node-recap",
    title: "რეკაპი — მთელი Node.js",
    shortTitle: "რეკაპი",
    theory: "მოდულებიდან და ფაილებიდან — HTTP სერვერამდე, Express-ამდე და პროექტის სტრუქტურამდე. ეს არის ის ბაზა, რომლითაც უკვე ნამდვილი backend იწერება.",
    analogy: "ფრონტენდი ის არის, რასაც მომხმარებელი ხედავს; backend კი ის, რაც ამ ყველაფერს ამუშავებს და მონაცემებს ინახავს.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "შემდეგი ნაბიჯები: მონაცემთა ბაზა (PostgreSQL ან MongoDB), ავთენტიფიკაცია (JWT), ვალიდაცია (zod), ტესტირება (Vitest ან Jest), დეპლოი (Docker, Railway, VPS). და რა თქმა უნდა — TypeScript, რომელიც უკვე იცი.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const topics = [
        { to: "node-intro", title: "რა არის Node", desc: "JS ბრაუზერის გარეთ" },
        { to: "node-modules", title: "მოდულები", desc: "require, module.exports" },
        { to: "node-npm", title: "npm", desc: "package.json, dependencies" },
        { to: "node-fs-read", title: "ფაილები", desc: "fs: კითხვა და ჩაწერა" },
        { to: "node-fs-promises", title: "ასინქრონული fs", desc: "callback, promises, await" },
        { to: "node-process-env", title: "process", desc: "argv, env" },
        { to: "node-events", title: "EventEmitter", desc: "on და emit" },
        { to: "node-http-server", title: "HTTP სერვერი", desc: "req, res, listen" },
        { to: "node-express-intro", title: "Express", desc: "მარშრუტები, res.json" },
        { to: "node-express-middleware", title: "middleware", desc: "req, res, next" },
        { to: "node-structure", title: "სტრუქტურა", desc: "routes, services, models" },
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

      const pg = CFZ.createNodePlayground(
        '// პატარა REST API — ყველაფერი ერთად\nconst express = require("express");\nconst fs = require("fs");\nconst app = express();\n\napp.use(express.json());\n\nfunction wamokitxva() {\n  return JSON.parse(fs.readFileSync("/app/users.json", "utf8"));\n}\n\napp.get("/api/users", function (req, res) {\n  res.json(wamokitxva());\n});\n\napp.get("/api/users/:id", function (req, res) {\n  const users = wamokitxva();\n  const u = users[Number(req.params.id)];\n  if (!u) return res.status(404).json({ shecdoma: "ვერ მოიძებნა" });\n  res.json(u);\n});\n\napp.listen(3000);\n\n__request("GET", "/api/users").then(function (r) { console.log("სია:", r.body); });\n__request("GET", "/api/users/0").then(function (r) { console.log("ერთი:", r.body); });\n__request("GET", "/api/users/99").then(function (r) { console.log("404:", r.status); });',
        "return true;",
        function () {}
      );

      container.append(
        CFZ.el("p", { className: "breakdown-note", text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი პატარა REST API-ია — შეცვალე და გაუშვი." }),
        stack,
        CFZ.el("h4", { text: "ყველაფერი ერთად" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: Node.js-ის საფუძვლები გაიარე. 🎉");
      return function () { pg.destroy(); };
    },
  });

  // ---------- რესურსები ----------
  const GROUPS = [
    {
      title: "📘 ოფიციალური",
      items: [
        { label: "Node.js Docs", desc: "ოფიციალური დოკუმენტაცია ყველა მოდულზე.", href: "https://nodejs.org/docs/latest/api/" },
        { label: "Node.js — Learn", desc: "ოფიციალური სასწავლო მასალა ნულიდან.", href: "https://nodejs.org/en/learn" },
        { label: "Express — Guide", desc: "Express-ის ოფიციალური სახელმძღვანელო.", href: "https://expressjs.com/en/guide/routing.html" },
      ],
    },
    {
      title: "🎓 კურსები",
      items: [
        { label: "The Odin Project — NodeJS", desc: "პროექტებზე აგებული სრული გზა backend-ში.", href: "https://www.theodinproject.com/paths/full-stack-javascript" },
        { label: "freeCodeCamp — Backend", desc: "APIs და მიკროსერვისების სერტიფიკატი.", href: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" },
      ],
    },
    {
      title: "🛠 ხელსაწყოები",
      items: [
        { label: "nodemon", desc: "ავტომატურად გადატვირთავს სერვერს ფაილის შეცვლისას.", href: "https://nodemon.io/" },
        { label: "Postman", desc: "API-ს ტესტირება: მოთხოვნების გაგზავნა და პასუხების ნახვა.", href: "https://www.postman.com/" },
        { label: "npm — პაკეტების ძებნა", desc: "მილიონობით მზა ბიბლიოთეკა.", href: "https://www.npmjs.com/" },
        { label: "dotenv", desc: ".env ფაილიდან გარემოს ცვლადების ჩატვირთვა.", href: "https://github.com/motdotla/dotenv" },
      ],
    },
    {
      title: "🚀 შემდეგი ნაბიჯი",
      items: [
        { label: "Prisma — ბაზასთან მუშაობა", desc: "თანამედროვე ORM: ტიპიზებული მოთხოვნები ბაზაზე.", href: "https://www.prisma.io/docs" },
        { label: "JWT — ავთენტიფიკაცია", desc: "როგორ მუშაობს ტოკენებით შესვლა.", href: "https://jwt.io/introduction" },
        { label: "Fastify", desc: "Express-ის სწრაფი ალტერნატივა.", href: "https://fastify.dev/" },
      ],
    },
  ];

  window.NodeLessons.push({
    id: "node-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "Node.js-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია რესურსები, რომლებიც backend-ის გზას აგრძელებს.",
    analogy: "ხელსაწყოების ყუთი: დოკუმენტაცია, კურსები და ის ხელსაწყოები, რომლებსაც ყოველდღიურად იყენებენ.",
    physicalLabel: "როგორ გავაგრძელო",
    physical: "საუკეთესო ვარჯიშია პატარა, სრული პროექტი: REST API სიისთვის (დამატება, წაკითხვა, წაშლა), მერე ბაზის მიბმა, მერე ავთენტიფიკაცია. თითო ნაბიჯი ცალკე დაწერე და გაუშვი — ასე ცოდნა უნარად იქცევა.",
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
          text: "რჩევა: დააყენე nodemon და Postman — ეს ორი ხელსაწყო backend-ზე მუშაობას მკვეთრად აჩქარებს.",
        })
      );
      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
