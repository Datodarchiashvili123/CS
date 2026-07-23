// დავალებები თითო გაკვეთილზე (თავი 1 — კომპიუტერი ნულიდან, თავი 2 — HTML).
// level: easy 🟢 · medium 🟡 · hard 🔴
window.CFZExercises = {
  // ===================== თავი 2 — HTML =====================
  "html-intro": {
    tasks: [
      { level: "easy", q: "დაასახელე ელემენტის სამი ნაწილი (მაგალითზე <p class=\"x\">ტექსტი</p>)." },
      { level: "easy", q: "რომელ ტეგებს არ აქვს დამხურავი? დაასახელე ორი." },
      { level: "medium", q: "რა მოხდება, თუ ბრაუზერს უცნობ ტეგს მისცემ, მაგ. <foo>ტექსტი</foo>?" },
    ],
    answers: [
      "გამხსნელი ტეგი (ატრიბუტით), შიგთავსი, დამხურავი ტეგი.",
      "<img>, <br> (ასევე <hr>, <meta>, <input>).",
      "ბრაუზერი ტეგს უგულებელყოფს, ტექსტს კი მაინც აჩვენებს — გვერდი არ ტყდება.",
    ],
  },
  "html-structure": {
    tasks: [
      { level: "easy", q: "რისთვის არის <head> და რისთვის <body>?" },
      { level: "easy", q: "რა მოხდება, თუ <meta charset=\"utf-8\"> არ დაწერე და ქართულ ტექსტს გამოიყენებ?" },
      { level: "medium", q: "დაწერე მინიმალური, სწორი HTML5 გვერდი მეხსიერებიდან." },
    ],
    answers: [
      "head — ინფორმაცია გვერდზე (არ ჩანს); body — ხილული შიგთავსი.",
      "ასოები შეიძლება არასწორად გამოჩნდეს (კითხვის ნიშნები/იეროგლიფები).",
      "<!DOCTYPE html><html lang=\"ka\"><head><meta charset=\"utf-8\"><title>…</title></head><body>…</body></html>",
    ],
  },
  "html-tags": {
    tasks: [
      { level: "easy", q: "სწორია თუ არა: <p>ტექსტი <strong>მუქი</p></strong>? ახსენი რატომ." },
      { level: "easy", q: "დაასახელე 3 გლობალური ატრიბუტი (რომელიც ყველა ელემენტს აქვს)." },
      { level: "medium", q: "რისთვის გამოიყენება კომენტარი და ჩანს თუ არა ის მომხმარებელს?" },
    ],
    answers: [
      "არასწორია — ჩალაგება ირღვევა; ბოლოს გახსნილი პირველი უნდა დაიხუროს: <strong>…</strong></p>.",
      "id, class, title (ასევე lang, hidden).",
      "შენიშვნებისთვის კოდში; ეკრანზე არ ჩანს, მაგრამ გვერდის კოდში ხილულია.",
    ],
  },
  "html-headings": {
    tasks: [
      { level: "easy", q: "რამდენი <h1> უნდა იყოს ერთ გვერდზე და რატომ?" },
      { level: "easy", q: "რატომ არ შეიძლება <h1>-ის შემდეგ პირდაპირ <h3>?" },
      { level: "medium", q: "რა განსხვავებაა <br>-სა და ახალ <p>-ს შორის?" },
    ],
    answers: [
      "ჩვეულებრივ ერთი — ის გვერდის მთავარი სათაურია და სტრუქტურას განსაზღვრავს.",
      "დონის გამოტოვება არღვევს იერარქიას; ეკრანის წამკითხველის ნავიგაცია ირევა.",
      "<br> ხაზს წყვეტს იმავე აბზაცში; ახალი <p> ახალ აზრობრივ ბლოკს ქმნის.",
    ],
  },
  "html-formatting": {
    tasks: [
      { level: "easy", q: "რატომ ჯობია <strong> ვიდრე <b>?" },
      { level: "easy", q: "რისთვის არის <code> და რისთვის <pre>?" },
      { level: "medium", q: "დაასახელე ტეგი, რომლითაც ტექსტს ყვითლად მონიშნავ." },
    ],
    answers: [
      "<strong> მნიშვნელობას გადმოსცემს (წამკითხველიც გაითვალისწინებს), <b> მხოლოდ გარეგნობას.",
      "<code> — კოდის ნაწყვეტი; <pre> ინახავს დაშორებებსა და ხაზის გადატანებს.",
      "<mark>.",
    ],
  },
  "html-lists": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა <ul>-სა და <ol>-ს შორის? მოიყვანე თითო მაგალითი." },
      { level: "medium", q: "სად უნდა ჩაისვას ჩალაგებული <ul> — <li>-ის შიგნით თუ გვერდით?" },
      { level: "medium", q: "რისთვის არის <dl>, <dt> და <dd>?" },
    ],
    answers: [
      "ul — უნომრო (ინგრედიენტები); ol — დანომრილი, სადაც თანმიმდევრობა მნიშვნელოვანია (ნაბიჯები).",
      "მშობელი <li>-ის შიგნით.",
      "განმარტებების სია: dt — ტერმინი, dd — მისი განმარტება.",
    ],
  },
  "html-links": {
    tasks: [
      { level: "easy", q: "დაწერე ბმული, რომელიც ახალ ჩანართში იხსნება." },
      { level: "easy", q: "როგორ გააკეთებ ბმულს იმავე გვერდის განყოფილებაზე?" },
      { level: "medium", q: "რატომ არის „დააჭირე აქ“ ცუდი ბმულის ტექსტი?" },
    ],
    answers: [
      "<a href=\"...\" target=\"_blank\" rel=\"noopener\">ტექსტი</a>",
      "<a href=\"#saxeli\">…</a> და სამიზნეს მიეცი id=\"saxeli\".",
      "ბმულების სიაში კონტექსტი იკარგება — ტექსტი უნდა ხსნიდეს, სად მიდიხარ.",
    ],
  },
  "html-images": {
    tasks: [
      { level: "easy", q: "რისთვის არის alt ატრიბუტი და როდის უნდა იყოს ცარიელი?" },
      { level: "easy", q: "რას აკეთებს loading=\"lazy\"?" },
      { level: "medium", q: "რატომ ჯობია width და height მიუთითო სურათს?" },
    ],
    answers: [
      "სურათის სიტყვიერი აღწერაა; ცარიელი (alt=\"\") — თუ სურათი წმინდა დეკორატიულია.",
      "სურათს მხოლოდ მაშინ ტვირთავს, როცა მომხმარებელი მასთან მიაღწევს.",
      "ბრაუზერი ადგილს წინასწარ იტოვებს და ჩატვირთვისას გვერდი არ ხტება.",
    ],
  },
  "html-media": {
    tasks: [
      { level: "easy", q: "რა მოხდება, თუ <video>-ს controls არ მიაწერ?" },
      { level: "easy", q: "რატომ სჭირდება <iframe>-ს title ატრიბუტი?" },
      { level: "medium", q: "რატომ არ მუშაობს autoplay ხმიანი ვიდეოსთვის?" },
    ],
    answers: [
      "დამკვრელის ღილაკები არ გამოჩნდება — მომხმარებელი ვერ ჩართავს.",
      "ეკრანის წამკითხველი ასე იგებს, რა არის ჩაშენებულ ფანჯარაში.",
      "ბრაუზერები ხმაურიან ავტოდაკვრას ბლოკავენ; საჭიროა muted.",
    ],
  },
  "html-boxes": {
    tasks: [
      { level: "easy", q: "დაასახელე 2 ბლოკური და 2 სტრიქონული ელემენტი." },
      { level: "easy", q: "რა განსხვავებაა <div>-სა და <span>-ს შორის?" },
      { level: "medium", q: "როდის ჯობია <div>-ს ნაცვლად სემანტიკური ტეგი?" },
    ],
    answers: [
      "ბლოკური: div, p (ასევე h1, ul); სტრიქონული: span, a (ასევე strong, img).",
      "div ბლოკურია (მთელი სიგანე, ახალი ხაზი), span სტრიქონული (ტექსტის ნაკადში).",
      "როცა ბლოკს როლი აქვს (header, nav, main, article) — div მხოლოდ სტილისთვისაა.",
    ],
  },
  "html-input-types": {
    tasks: [
      { level: "easy", q: "როგორ ვაქცევთ radio ღილაკებს ერთ ჯგუფად?" },
      { level: "easy", q: "რა განსხვავებაა checkbox-სა და radio-ს შორის?" },
      { level: "medium", q: "რატომ ვერ ჩაანაცვლებს placeholder <label>-ს?" },
    ],
    answers: [
      "ყველას ერთი და იგივე name მივანიჭოთ.",
      "checkbox — რამდენიმეს არჩევა; radio — მხოლოდ ერთის ჯგუფიდან.",
      "აკრეფისას ქრება და მომხმარებელი ვეღარ ხედავს, რა უნდა შეიყვანოს.",
    ],
  },
  "html-validation": {
    tasks: [
      { level: "easy", q: "დაასახელე 3 ატრიბუტი, რომლითაც ველს შეზღუდვას დაუწესებ." },
      { level: "medium", q: "რას აკეთებს required და type=\"email\" ერთად?" },
      { level: "hard", q: "რატომ არ არის ბრაუზერის ვალიდაცია საკმარისი უსაფრთხოებისთვის?" },
    ],
    answers: [
      "required, minlength/maxlength, min/max (ასევე pattern).",
      "ბრაუზერი თავად ამოწმებს — ველი ცარიელი ვერ დარჩება და ფორმატიც ელფოსტისა უნდა იყოს.",
      "მისი გვერდის ავლა ადვილია (DevTools/პირდაპირი მოთხოვნა) — მონაცემი სერვერზეც უნდა შემოწმდეს.",
    ],
  },
  "html-id-class": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა id-სა და class-ს შორის?" },
      { level: "easy", q: "შეიძლება თუ არა ერთ ელემენტს რამდენიმე class ჰქონდეს? როგორ?" },
      { level: "medium", q: "რატომ ჯობია class=\"gafrtxileba\" ვიდრე class=\"witeli\"?" },
    ],
    answers: [
      "id უნიკალურია (ერთხელ გვერდზე); class ჯგუფის სახელია და მრავალს მიეწერება.",
      "დიახ — ჰარით გამოყოფილი: class=\"karti didi\".",
      "სახელი დანიშნულებას უნდა აღწერდეს — ფერი შეიძლება შეიცვალოს, დანიშნულება არა.",
    ],
  },
  "html-entities": {
    tasks: [
      { level: "easy", q: "როგორ დავწერთ ეკრანზე სიმბოლოებს < და &?" },
      { level: "easy", q: "რას ნიშნავს &nbsp; და როდის გამოვიყენოთ?" },
      { level: "medium", q: "რა მოხდება, თუ კოდის მაგალითში <p>-ს ჩანაცვლების გარეშე დაწერ?" },
    ],
    answers: [
      "&lt; და &amp;.",
      "ჰარი, რომელზეც ხაზი არ გადაიტანება — მაგ. „10&nbsp;კგ“.",
      "ბრაუზერი მას ტეგად აღიქვამს და ეკრანზე არაფერი გამოჩნდება.",
    ],
  },
  "html-accessibility": {
    tasks: [
      { level: "easy", q: "დაასახელე ხელმისაწვდომობის 3 ძირითადი წესი HTML-ში." },
      { level: "easy", q: "რატომ ჯობია <button> დაწკაპუნებად <div>-ს?" },
      { level: "medium", q: "როგორ შეამოწმებ გვერდს კლავიატურით? რას უყურებ?" },
    ],
    answers: [
      "სურათს alt, ველს label, სათაურები რიგზე (ასევე lang და aria-label იკონა-ღილაკზე).",
      "button კლავიატურით ხელმისაწვდომია და წამკითხველი მას ღილაკად აცნობებს.",
      "Tab-ით გაიარე: ყველა ღილაკს/ბმულს უნდა მიაღწიო და ხედავდე, სად ხარ (ფოკუსი).",
    ],
  },
  "html-meta-seo": {
    tasks: [
      { level: "easy", q: "დაასახელე 3 meta/head ელემენტი, რომელიც ყველა გვერდს სჭირდება." },
      { level: "easy", q: "სად ჩანს <title> და <meta name=\"description\">?" },
      { level: "medium", q: "რისთვის არის og: ტეგები?" },
    ],
    answers: [
      "title, meta charset, meta viewport (ასევე meta description და lang).",
      "ბრაუზერის ჩანართში და საძიებო სისტემის შედეგებში.",
      "სოციალურ ქსელში გაზიარებისას სათაურის, აღწერისა და სურათის განსასაზღვრად.",
    ],
  },
  "html-debugging": {
    tasks: [
      { level: "easy", q: "დაასახელე 3 ხშირი HTML შეცდომა." },
      { level: "medium", q: "რატომ არ გაჩვენებს ბრაუზერი შეცდომას დაუხურავ ტეგზე?" },
      { level: "hard", q: "გაატარე შენი გვერდი validator.w3.org-ზე და გაასწორე ყველა შენიშვნა." },
    ],
    answers: [
      "დაუხურავი ტეგი, არასწორი ჩალაგება, alt-ის დავიწყება (ასევე გამეორებული id).",
      "HTML შემწყნარებელია — ბრაუზერი ცდილობს გამოასწოროს და მაინც დახატოს გვერდი.",
      "ვალიდატორი შეცდომებს ხაზების ნომრებით აჩვენებს.",
    ],
  },
  "html-semantics": {
    tasks: [
      { level: "easy", q: "დაასახელე 4 სემანტიკური ტეგი და თითოს დანიშნულება." },
      { level: "medium", q: "როდის გამოვიყენოთ <div> და როდის სემანტიკური ტეგი?" },
      { level: "hard", q: "<section> თუ <article>? ახსენი განსხვავება მაგალითით." },
    ],
    answers: [
      "header (ზედა), nav (ნავიგაცია), main (მთავარი შიგთავსი), footer (ქვედა).",
      "div — როცა ბლოკი მხოლოდ სტილისთვისაა; სემანტიკური — როცა როლი აქვს.",
      "article — ცალკე ამოღებულსაც აქვს აზრი (ბლოგპოსტი); section — დოკუმენტის თემატური ნაწილი სათაურით.",
    ],
  },
  "html-tables": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა <th>-სა და <td>-ს შორის?" },
      { level: "medium", q: "ააწყვე 3 სვეტიანი ცხრილი სათაურის სტრიქონით და 2 მონაცემის სტრიქონით." },
      { level: "medium", q: "რატომ არ გამოიყენება ცხრილი გვერდის განლაგებისთვის?" },
    ],
    answers: [
      "th — სათაურის უჯრა (გამუქებული, სემანტიკურად სვეტის სახელი); td — ჩვეულებრივი მონაცემი.",
      "<table><thead><tr><th>…</th>×3</tr></thead><tbody><tr><td>…</td>×3</tr>×2</tbody></table>",
      "განლაგებისთვის CSS არსებობს (Grid/Flexbox); ცხრილი მონაცემებისთვისაა და ხელმისაწვდომობას აზიანებს.",
    ],
  },
  "html-forms": {
    tasks: [
      { level: "easy", q: "როგორ დავაკავშიროთ <label> და <input>? რატომ არის ეს მნიშვნელოვანი?" },
      { level: "easy", q: "დაასახელე 4 სხვადასხვა input type." },
      { level: "medium", q: "რას აკეთებს required და type=\"email\" ერთად?" },
    ],
    answers: [
      "label-ის for უნდა ემთხვეოდეს input-ის id-ს; წარწერაზე დაჭერა ველს ააქტიურებს და წამკითხველიც სწორად კითხულობს.",
      "text, email, password, number (ასევე checkbox, radio, date).",
      "ბრაუზერი თავად ამოწმებს — ველი ცარიელი ვერ დარჩება და ფორმატიც უნდა იყოს ელფოსტისა.",
    ],
  },
  "html-recap": {
    tasks: [
      { level: "medium", q: "დაწერე სრული გვერდი, რომელშიც იქნება: სემანტიკური კარკასი, სია, ბმული, სურათი და ფორმა." },
      { level: "hard", q: "გაატარე შენი გვერდი W3C ვალიდატორში და გაასწორე ყველა შეცდომა." },
    ],
  },
  "html-resources": {
    tasks: [
      { level: "easy", q: "გახსენი MDN-ის ელემენტების ცნობარი და იპოვე ტეგი, რომელიც ამ კურსში არ გვისწავლია." },
      { level: "medium", q: "გაიარე web.dev „Learn HTML“-ის პირველი ორი გაკვეთილი." },
    ],
  },

  // ===================== თავი 6 — Node.js =====================
  "node-intro": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა ბრაუზერის JS-სა და Node-ის JS-ს შორის?" },
      { level: "easy", q: "როგორ იშვება Node-ის ფაილი ტერმინალიდან?" },
    ],
    answers: ["ბრაუზერში არის document/window, Node-ში კი fs/http/process; ენა იგივეა.", "node index.js"],
  },
  "node-modules": {
    tasks: [
      { level: "easy", q: "როგორ ვაკეთებთ ექსპორტს და იმპორტს CommonJS-ში?" },
      { level: "medium", q: "რა განსხვავებაა require(\"fs\")-სა და require(\"./fs\")-ს შორის?" },
    ],
    answers: ["module.exports = {...} და const x = require(\"./file\")", "პირველი ჩაშენებული მოდულია, მეორე — ლოკალური ფაილი."],
  },
  "node-esm": {
    tasks: [
      { level: "easy", q: "როგორ ჩავრთოთ ES მოდულები Node-ში?" },
      { level: "medium", q: "რა აღარ მუშაობს ES მოდულებში?" },
    ],
    answers: ['package.json-ში "type": "module" ან .mjs გაფართოება.', "require და __dirname."],
  },
  "node-npm": {
    tasks: [
      { level: "easy", q: "რას ინახავს package.json?" },
      { level: "easy", q: "რა განსხვავებაა npm i express-სა და npm i -D nodemon-ს შორის?" },
      { level: "medium", q: "რატომ არ ვტვირთავთ node_modules-ს git-ში?" },
    ],
    answers: [
      "პროექტის სახელს, ვერსიას, დამოკიდებულებებსა და სკრიპტებს.",
      "პირველი dependencies-შია (საჭიროა გაშვებისას), მეორე devDependencies-ში (მხოლოდ დეველოპმენტში).",
      "ის package.json-იდან ყოველთვის აღდგება npm install-ით და ძალიან დიდია.",
    ],
  },
  "node-path": {
    tasks: [
      { level: "easy", q: "რატომ ვიყენებთ path.join-ს ხელით წებების ნაცვლად?" },
      { level: "medium", q: "რა განსხვავებაა __dirname-სა და process.cwd()-ს შორის?" },
    ],
    answers: ["ოპერაციული სისტემები სხვადასხვა გამყოფს იყენებენ; join ამას თავად აგვარებს.", "__dirname ფაილის საქაღალდეა; cwd() — საიდანაც ბრძანება გაუშვი."],
  },
  "node-fs-read": {
    tasks: [
      { level: "easy", q: "რას აბრუნებს readFileSync კოდირების მითითების გარეშე?" },
      { level: "medium", q: "რატომ არის readFileSync საშიში სერვერზე?" },
    ],
    answers: ["Buffer-ს (ბაიტებს), არა ტექსტს.", "სანამ ფაილი იკითხება, სერვერი სხვა მოთხოვნას ვერ ემსახურება."],
  },
  "node-fs-write": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა writeFileSync-სა და appendFileSync-ს შორის?" },
      { level: "medium", q: "როგორ შევამოწმოთ, არსებობს თუ არა ფაილი?" },
    ],
    answers: ["write გადააწერს, append ბოლოში დაამატებს.", "fs.existsSync(path)"],
  },
  "node-fs-async": {
    tasks: [
      { level: "medium", q: "რას ნიშნავს error-first callback?" },
      { level: "medium", q: "რატომ იბეჭდება readFile-ის შემდეგი ხაზი უფრო ადრე?" },
    ],
    answers: ["callback-ის პირველი არგუმენტი ყოველთვის შეცდომაა: (err, data).", "წაკითხვა ფონურია — Node ლოდინში არ დგება."],
  },
  "node-fs-promises": {
    tasks: [
      { level: "easy", q: "როგორ წავიკითხოთ ფაილი async/await-ით?" },
      { level: "medium", q: "როგორ ვიჭერთ შეცდომას await-თან?" },
    ],
    answers: ['const fsp = require("fs/promises"); const d = await fsp.readFile(p);', "try/catch-ით."],
  },
  "node-fs-dirs": {
    tasks: [
      { level: "easy", q: "როგორ ჩამოვთვალოთ საქაღალდის შიგთავსი?" },
      { level: "medium", q: "როგორ შევქმნათ ჩალაგებული საქაღალდე?" },
    ],
    answers: ["fs.readdirSync(path)", "fs.mkdirSync(p, { recursive: true })"],
  },
  "node-process-argv": {
    tasks: [
      { level: "easy", q: "რატომ ვიწყებთ argv-ს slice(2)-ით?" },
      { level: "medium", q: "დაწერე სკრიპტი, რომელიც პირველ არგუმენტს დაბეჭდავს." },
    ],
    answers: ["პირველი ორი node-ის და სკრიპტის მისამართია.", "console.log(process.argv[2])"],
  },
  "node-process-env": {
    tasks: [
      { level: "easy", q: "როგორ წავიკითხოთ PORT ნაგულისხმევი მნიშვნელობით?" },
      { level: "hard", q: "რატომ არ ვწერთ API გასაღებს კოდში?" },
    ],
    answers: ["process.env.PORT || 3000", "კოდი git-ში ხვდება და გასაღები გაჟონავს; მისი ადგილი .env-ია (.gitignore-ში)."],
  },
  "node-events": {
    tasks: [
      { level: "easy", q: "როგორ დავუსმინოთ და გავუშვათ მოვლენა?" },
      { level: "medium", q: "რა განსხვავებაა on-სა და once-ს შორის?" },
    ],
    answers: ["emitter.on(\"x\", fn) და emitter.emit(\"x\", data)", "once მხოლოდ პირველ მოვლენას იჭერს და შემდეგ თავად წყვეტს მოსმენას."],
  },
  "node-json": {
    tasks: [
      { level: "easy", q: "როგორ წავიკითხოთ და ჩავწეროთ JSON ფაილი?" },
      { level: "medium", q: "რას აკეთებს JSON.stringify(data, null, 2)?" },
    ],
    answers: ["JSON.parse(fs.readFileSync(p,\"utf8\")) და fs.writeFileSync(p, JSON.stringify(d))", "ლამაზად, ორი ჰარით ფორმატირებულ ტექსტს აბრუნებს."],
  },
  "node-errors": {
    tasks: [
      { level: "easy", q: "რას ნიშნავს ENOENT?" },
      { level: "medium", q: "დაასახელე შეცდომის მიღების სამი გზა Node-ში." },
    ],
    answers: ["ფაილი ან საქაღალდე ვერ მოიძებნა.", "try/catch (sync), err არგუმენტი (callback), .catch/try-await (Promise)."],
  },
  "node-http-server": {
    tasks: [
      { level: "easy", q: "დაწერე უმარტივესი HTTP სერვერი." },
      { level: "medium", q: "რა მოხდება, თუ res.end() არ დაიძახე?" },
    ],
    answers: ['http.createServer((req,res)=>res.end("hi")).listen(3000)', "ბრაუზერი უსასრულოდ დაელოდება პასუხს."],
  },
  "node-routing": {
    tasks: [
      { level: "easy", q: "როგორ გავიგოთ, რომელი მისამართი და მეთოდი მოითხოვეს?" },
      { level: "medium", q: "დაასახელე 4 სტატუსის კოდი და მათი მნიშვნელობა." },
    ],
    answers: ["req.url და req.method", "200 წარმატება, 201 შეიქმნა, 404 ვერ მოიძებნა, 500 სერვერის შეცდომა."],
  },
  "node-json-api": {
    tasks: [
      { level: "easy", q: "რომელი სათაური უნდა დავაყენოთ JSON პასუხისთვის?" },
      { level: "medium", q: "როგორ იწერება REST-ის კონვენციით მისამართები?" },
    ],
    answers: ["Content-Type: application/json", "არსებითი სახელი მრავლობითში: /api/users; მოქმედებას მეთოდი განსაზღვრავს."],
  },
  "node-post-body": {
    tasks: [
      { level: "medium", q: "როგორ ვკითხულობთ POST-ის სხეულს სუფთა http-ში?" },
      { level: "medium", q: "რატომ უნდა ჩავსვათ JSON.parse try/catch-ში?" },
    ],
    answers: ['req.on("data", c => body += c) და req.on("end", ...)', "კლიენტმა შეიძლება არასწორი JSON გამოგზავნოს და პროგრამა ჩავარდება."],
  },
  "node-express-intro": {
    tasks: [
      { level: "easy", q: "დაწერე Express-ის უმარტივესი აპლიკაცია." },
      { level: "medium", q: "რა განსხვავებაა res.send-სა და res.json-ს შორის?" },
    ],
    answers: ['const app = express(); app.get("/", (req,res)=>res.send("hi")); app.listen(3000);', "res.json ყოველთვის JSON-ს აბრუნებს სწორი სათაურით; send ტიპს თავად ხვდება."],
  },
  "node-express-params": {
    tasks: [
      { level: "easy", q: "როგორ მივიღოთ /users/:id-დან id?" },
      { level: "medium", q: "რა ტიპისაა req.params-ის მნიშვნელობა და რა უნდა გავითვალისწინოთ?" },
    ],
    answers: ["req.params.id", "ყოველთვის ტექსტია — რიცხვთან შესადარებლად Number() სჭირდება."],
  },
  "node-express-middleware": {
    tasks: [
      { level: "medium", q: "რა სამი არგუმენტი აქვს middleware-ს?" },
      { level: "hard", q: "რა მოხდება, თუ next() არ დაიძახე?" },
    ],
    answers: ["(req, res, next)", "მოთხოვნა ჩაიკიდება — ბრაუზერი პასუხს ვერასდროს მიიღებს."],
  },
  "node-express-json": {
    tasks: [
      { level: "easy", q: "რომელი middleware სჭირდება req.body-ს წასაკითხად?" },
      { level: "medium", q: "სად უნდა გამოცხადდეს ის და რატომ?" },
    ],
    answers: ["express.json()", "მარშრუტებამდე — თორემ req.body undefined იქნება."],
  },
  "node-express-errors": {
    tasks: [
      { level: "medium", q: "რამდენი არგუმენტი აქვს შეცდომების middleware-ს?" },
      { level: "hard", q: "რატომ არ უნდა გამოვუჩინოთ მომხმარებელს შეცდომის დეტალები?" },
    ],
    answers: ["ოთხი: (err, req, res, next) — სამით Express მას ჩვეულებრივად ჩათვლის.", "დეტალები სისტემის შესახებ ინფორმაციას აძლევს პოტენციურ თავდამსხმელს."],
  },
  "node-structure": {
    tasks: [
      { level: "medium", q: "დაასახელე ტიპური საქაღალდეები Node პროექტში." },
      { level: "hard", q: "რატომ არ უნდა იცოდეს მარშრუტმა, როგორ ინახება მონაცემი?" },
    ],
    answers: ["routes, controllers, services, models (+ .env).", "მაშინ ბაზის შეცვლა მარშრუტებს არ შეეხება."],
  },
  "node-async-patterns": {
    tasks: [
      { level: "medium", q: "რატომ სჭირდება async მარშრუტს try/catch?" },
      { level: "hard", q: "რატომ ანელებს ერთი სინქრონული მძიმე ოპერაცია მთელ სერვერს?" },
    ],
    answers: ["სხვაგვარად შეცდომა გაძვრება და მოთხოვნა ჩაიკიდება.", "Node ერთ ნაკადში მუშაობს — ის ბლოკავს ყველა სხვა მოთხოვნას."],
  },
  "node-recap": {
    tasks: [
      { level: "medium", q: "ააწყვე REST API სიისთვის: GET, POST და DELETE." },
      { level: "hard", q: "დაამატე მონაცემების შენახვა JSON ფაილში და შეცდომების დამუშავება." },
    ],
  },
  "node-resources": {
    tasks: [
      { level: "easy", q: "დააყენე nodemon და გაუშვი პროექტი მისით." },
      { level: "medium", q: "გატესტე შენი API Postman-ით ან curl-ით." },
    ],
  },

  // ===================== თავი 5 — TypeScript =====================
  "ts-intro": {
    tasks: [
      { level: "easy", q: "რა კავშირია TypeScript-სა და JavaScript-ს შორის?" },
      { level: "medium", q: "რა ხდება ტიპებთან კომპილაციის შემდეგ?" },
    ],
    answers: ["TS არის JS-ის ზედნაშენი — ყველა სწორი JS ერთდროულად სწორი TS-იცაა.", "ისინი ქრება; ბრაუზერში მხოლოდ JavaScript რჩება."],
  },
  "ts-basic-types": {
    tasks: [
      { level: "easy", q: "დაწერე ცვლადი number ტიპით." },
      { level: "medium", q: "რა განსხვავებაა string-სა და String-ს შორის?" },
    ],
    answers: ["let n: number = 5;", "string პრიმიტიული ტიპია (გამოიყენე ის); String ობიექტ-გარსია."],
  },
  "ts-inference": {
    tasks: [
      { level: "easy", q: "სად არის ანოტაცია სავალდებულო და სად ზედმეტი?" },
      { level: "medium", q: "რა ტიპს მიანიჭებს TS პარამეტრს ანოტაციის გარეშე?" },
    ],
    answers: ["სავალდებულო — პარამეტრებში; ზედმეტი — როცა მნიშვნელობა მაშინვე ენიჭება.", "any (strict რეჟიმში კი შეცდომას იძლევა)."],
  },
  "ts-any-unknown": {
    tasks: [
      { level: "medium", q: "რა განსხვავებაა any-სა და unknown-ს შორის?" },
      { level: "hard", q: "როდის ჩნდება never ტიპი?" },
    ],
    answers: ["any შემოწმებას თიშავს; unknown გამოყენებამდე ტიპის შემოწმებას მოითხოვს.", "როცა მნიშვნელობა ვერასდროს იარსებებს — მაგ. ფუნქცია, რომელიც ყოველთვის შეცდომას აგდებს."],
  },
  "ts-arrays": {
    tasks: [
      { level: "easy", q: "დაწერე რიცხვების მასივის ტიპი ორნაირად." },
      { level: "medium", q: "რა განსხვავებაა number[]-სა და [string, number]-ს შორის?" },
    ],
    answers: ["number[] და Array<number>", "პირველი ნებისმიერი სიგრძის ერთგვაროვანი მასივია; მეორე ფიქსირებული კორტეჟი."],
  },
  "ts-objects": {
    tasks: [
      { level: "easy", q: "აღწერე ობიექტის ტიპი ორი თვისებით." },
      { level: "medium", q: "რა მოხდება, თუ ობიექტში ზედმეტ თვისებას ჩაწერ?" },
    ],
    answers: ["{ name: string; age: number }", "TypeScript შეცდომას იძლევა — ასე ბეჭდვის შეცდომები იჭერს."],
  },
  "ts-interface": {
    tasks: [
      { level: "easy", q: "დაწერე interface ორი თვისებით." },
      { level: "medium", q: "როგორ გავაფართოოთ interface?" },
    ],
    answers: ["interface User { name: string; age: number }", "interface Admin extends User { role: string }"],
  },
  "ts-type-alias": {
    tasks: [
      { level: "easy", q: "დაწერე type ალიასი გაერთიანებისთვის." },
      { level: "medium", q: "რას ვერ აკეთებს interface, რასაც type აკეთებს?" },
    ],
    answers: ["type ID = string | number;", "პრიმიტივების, გაერთიანებებისა და კორტეჟების დასახელებას."],
  },
  "ts-interface-vs-type": {
    tasks: [{ level: "medium", q: "რომელი აირჩიო ობიექტისთვის და რომელი გაერთიანებისთვის? ახსენი." }],
    answers: ["ობიექტების/კლასების კონტრაქტს — interface; გაერთიანებებსა და რთულ ტიპებს — type."],
  },
  "ts-optional": {
    tasks: [
      { level: "easy", q: "როგორ გავხადოთ თვისება არჩევითი და როგორ readonly?" },
      { level: "medium", q: "რა ტიპი აქვს რეალურად არჩევით თვისებას?" },
    ],
    answers: ["age?: number; და readonly id: number;", "„ტიპი | undefined“ — ამიტომ შემოწმება სჭირდება."],
  },
  "ts-union": {
    tasks: [
      { level: "easy", q: "დაწერე ტიპი, რომელიც ან ტექსტია, ან რიცხვი." },
      { level: "medium", q: "რატომ ვერ გამოვიძახებთ .toUpperCase()-ს string | number-ზე?" },
    ],
    answers: ["string | number", "მეთოდი ორივე ტიპს არ აქვს — ჯერ ტიპი უნდა დაავიწროვო."],
  },
  "ts-literal": {
    tasks: [
      { level: "easy", q: "დაწერე ლიტერალური გაერთიანება სამი ვარიანტით." },
      { level: "medium", q: "რით სჯობს ეს ჩვეულებრივ string-ს?" },
    ],
    answers: ['type Zoma = "S" | "M" | "L";', "მხოლოდ დაშვებული მნიშვნელობები გაივლის; რედაქტორიც ვარიანტებს გთავაზობს."],
  },
  "ts-intersection": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა & -სა და | -ს შორის?" },
      { level: "medium", q: "დაწერე ორი ტიპის კვეთა." },
    ],
    answers: ["& — ორივეს თვისებები ერთად; | — ერთ-ერთი.", "type Admin = User & { role: string };"],
  },
  "ts-functions": {
    tasks: [
      { level: "easy", q: "დაწერე ფუნქციის ტიპი პარამეტრითა და დაბრუნებულით." },
      { level: "easy", q: "რა ტიპია, როცა ფუნქცია არაფერს აბრუნებს?" },
    ],
    answers: ["function jami(a: number, b: number): number", "void"],
  },
  "ts-params": {
    tasks: [
      { level: "easy", q: "როგორ გავხადოთ პარამეტრი არჩევითი?" },
      { level: "medium", q: "სად უნდა იდგეს არჩევითი პარამეტრი და რატომ?" },
    ],
    answers: ["name?: string", "სავალდებულოს შემდეგ — თორემ გამოძახებისას გამოტოვება შეუძლებელი იქნებოდა."],
  },
  "ts-narrowing": {
    tasks: [
      { level: "medium", q: "დაასახელე ტიპის დავიწროების 3 ხერხი." },
      { level: "medium", q: "რატომ არის დავიწროება საჭირო გაერთიანებასთან?" },
    ],
    answers: ["typeof, instanceof, in (ასევე Array.isArray და შედარება).", "რომ კონკრეტული ტიპის მეთოდები გახდეს დაშვებული."],
  },
  "ts-guards": {
    tasks: [
      { level: "hard", q: "დაწერე type guard ფუნქცია, რომელიც ამოწმებს, არის თუ არა მნიშვნელობა რიცხვი." },
      { level: "medium", q: "რას ნიშნავს „v is string“ და როდის მოქმედებს?" },
    ],
    answers: ["function isNum(v: unknown): v is number { return typeof v === \"number\"; }", "კომპილატორს ეუბნება ტიპს; გაშვებისას ის უბრალო boolean-ია."],
  },
  "ts-enum": {
    tasks: [
      { level: "easy", q: "რა მნიშვნელობა აქვს enum-ის პირველ წევრს ნაგულისხმევად?" },
      { level: "medium", q: "რატომ ამჯობინებენ ბევრი გუნდი enum-ს ლიტერალურ გაერთიანებას?" },
    ],
    answers: ["0", "გაერთიანება მსუბუქია და JS-ში კვალს არ ტოვებს; enum კი რეალურ ობიექტად ითარგმნება."],
  },
  "ts-generics": {
    tasks: [
      { level: "medium", q: "დაწერე გენერიკული ფუნქცია, რომელიც იმავე ტიპს აბრუნებს." },
      { level: "medium", q: "რატომ ჯობია გენერიკი any-ს?" },
    ],
    answers: ["function id<T>(v: T): T { return v; }", "გენერიკი ტიპს ინარჩუნებს; any-ს შემდეგ ინფორმაცია იკარგება."],
  },
  "ts-generic-constraints": {
    tasks: [
      { level: "medium", q: "დაწერე გენერიკი შეზღუდვით, რომელსაც length სჭირდება." },
      { level: "hard", q: "რატომ ვერაფერს გავაკეთებთ შეუზღუდავ T-ზე?" },
    ],
    answers: ["<T extends { length: number }>", "TypeScript-მა არ იცის, რა თვისებები აქვს — ამიტომ არაფერს დაუშვებს."],
  },
  "ts-utility-types": {
    tasks: [
      { level: "easy", q: "რას აკეთებს Partial<T> და Omit<T, K>?" },
      { level: "medium", q: "რომელი utility ტიპი გამოვიყენოთ ლექსიკონისთვის?" },
    ],
    answers: ["Partial ყველა თვისებას არჩევითს ხდის; Omit მითითებულს გამორიცხავს.", "Record<string, T>"],
  },
  "ts-keyof-typeof": {
    tasks: [
      { level: "medium", q: "რას აბრუნებს keyof?" },
      { level: "hard", q: "რატომ იწერება ხშირად keyof typeof ერთად?" },
    ],
    answers: ["ობიექტის ტიპის გასაღებების გაერთიანებას.", "typeof ცვლადიდან ტიპს იღებს, keyof-ს კი ტიპი სჭირდება."],
  },
  "ts-classes": {
    tasks: [
      { level: "easy", q: "შექმენი კლასი ტიპიზებული თვისებებით." },
      { level: "medium", q: "რა მოითხოვება strict რეჟიმში კლასის თვისებისგან?" },
    ],
    answers: ["class A { x: number; constructor(x: number) { this.x = x; } }", "ან კონსტრუქტორში დაინიშნოს, ან საწყისი მნიშვნელობა ჰქონდეს."],
  },
  "ts-modifiers": {
    tasks: [
      { level: "easy", q: "დაასახელე სამი წვდომის მოდიფიკატორი." },
      { level: "medium", q: "რას აკეთებს constructor(private x: number)?" },
      { level: "hard", q: "არის თუ არა private ნამდვილი დაცვა გაშვებისას?" },
    ],
    answers: ["public, private, protected.", "ავტომატურად ქმნის და ანიჭებს თვისებას this.x.", "არა — მხოლოდ კომპილაციისას; ნამდვილი დამალვისთვის #ველია."],
  },
  "ts-abstract": {
    tasks: [
      { level: "medium", q: "რა განსხვავებაა abstract კლასსა და interface-ს შორის?" },
      { level: "medium", q: "რას აკეთებს implements?" },
    ],
    answers: ["abstract-ს შეიძლება ჰქონდეს მზა კოდი; interface მხოლოდ ფორმას აღწერს.", "ავალდებულებს კლასს, დააკმაყოფილოს interface-ის კონტრაქტი."],
  },
  "ts-null-safety": {
    tasks: [
      { level: "easy", q: "რას აკეთებს ?. და ??" },
      { level: "medium", q: "რატომ არის strictNullChecks მნიშვნელოვანი?" },
    ],
    answers: ["?. უსაფრთხოდ წვდება; ?? ნაგულისხმევს აძლევს null/undefined-ის შემთხვევაში.", "null-ის შეცდომების მთელ კლასს იჭერს კომპილაციისას."],
  },
  "ts-assertion": {
    tasks: [
      { level: "medium", q: "რას აკეთებს as და რა რისკი აქვს?" },
      { level: "hard", q: "რას ნიშნავს კოდში as-ის სიხშირე?" },
    ],
    answers: ["ტიპს ძალით ამტკიცებს; შემოწმებას თიშავს — შეცდომა გაშვებისას გამოვა.", "ჩვეულებრივ იმას, რომ ტიპები არასწორადაა აღწერილი."],
  },
  "ts-tsconfig": {
    tasks: [
      { level: "easy", q: "რომელი ბრძანებით ითარგმნება TS?" },
      { level: "medium", q: "რომელი პარამეტრი უნდა იყოს ყოველთვის ჩართული და რატომ?" },
    ],
    answers: ["npx tsc (კონფიგურაცია — tsconfig.json).", '"strict": true — მის გარეშე TypeScript დიდ ნაწილს ვერ შეამოწმებს.'],
  },
  "ts-recap": {
    tasks: [
      { level: "medium", q: "აღწერე interface-ით სტუდენტი და დაწერე ფუნქცია, რომელიც საშუალო ქულას ითვლის." },
      { level: "hard", q: "აიღე შენი ერთი JS ფაილი და გადაიყვანე TypeScript-ზე strict რეჟიმში." },
    ],
  },
  "ts-resources": {
    tasks: [
      { level: "easy", q: "გახსენი TypeScript Playground და სცადე ტიპის შეცდომის დანახვა." },
      { level: "medium", q: "გაიარე Total TypeScript-ის პირველი გაკვეთილები." },
    ],
  },

  // ===================== თავი 4 — JavaScript =====================
  "js-intro": {
    tasks: [
      { level: "easy", q: "რას აკეთებს JavaScript გვერდზე? დაასახელე 3 მაგალითი." },
      { level: "easy", q: "როგორ ჩაერთვება JS ფაილი HTML გვერდში?" },
    ],
    answers: ["რეაგირებს დაჭერაზე, ცვლის შიგთავსს, აგზავნის მოთხოვნებს სერვერზე.", '<script src="app.js" defer></script>'],
  },
  "js-console": {
    tasks: [
      { level: "easy", q: "დაწერე კომენტარის ორი ფორმა." },
      { level: "easy", q: "როგორ დავბეჭდოთ ერთი console.log-ით ორი მნიშვნელობა?" },
    ],
    answers: ["// ერთხაზიანი და /* მრავალხაზიანი */", 'console.log("ჯამი:", 5)'],
  },
  "js-variables": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა let-სა და const-ს შორის?" },
      { level: "medium", q: "რატომ ჯობია const ნაგულისხმევ არჩევანად?" },
    ],
    answers: ["let-ის მნიშვნელობა შეიძლება შეიცვალოს, const-ის — არა.", "კოდი უფრო პროგნოზირებადია; შემთხვევითი გადაწერა გამორიცხულია."],
  },
  "js-types": {
    tasks: [
      { level: "easy", q: "დაასახელე JS-ის 5 ძირითადი ტიპი." },
      { level: "medium", q: "რას აბრუნებს typeof null და რატომ?" },
      { level: "medium", q: "როგორ შევამოწმოთ, არის თუ არა მნიშვნელობა მასივი?" },
    ],
    answers: ["string, number, boolean, undefined, null (ასევე object).", '"object" — ენის ძველი შეცდომაა, თავსებადობის გამო ვერ გაასწორეს.', "Array.isArray(x)"],
  },
  "js-operators": {
    tasks: [
      { level: "easy", q: "რას აკეთებს % ოპერატორი? მოიყვანე გამოყენების მაგალითი." },
      { level: "medium", q: "რას იძლევა 2 + \"2\" და რატომ?" },
    ],
    answers: ["ნაშთს აბრუნებს; n % 2 === 0 ლუწობას ამოწმებს.", '"22" — + ტექსტთან წებებას ნიშნავს, არა შეკრებას.'],
  },
  "js-strings": {
    tasks: [
      { level: "easy", q: "როგორ გადავიყვანოთ ტექსტი დიდ ასოებში?" },
      { level: "medium", q: "რატომ არ ცვლის .toUpperCase() ორიგინალ ცვლადს?" },
    ],
    answers: [".toUpperCase()", "სტრიქონები უცვლელია (immutable) — მეთოდი ახალ სტრიქონს აბრუნებს."],
  },
  "js-template": {
    tasks: [
      { level: "easy", q: "დაწერე შაბლონი, რომელიც ცვლადს ჩასვამს ტექსტში." },
      { level: "medium", q: "რა უპირატესობა აქვს შაბლონს + -ით წებებასთან შედარებით?" },
    ],
    answers: ["`გამარჯობა, ${name}!`", "ნაკლები შეცდომა (ჰარები, პლიუსები), მრავალხაზოვნება, გამოსახულებების ჩასმა."],
  },
  "js-numbers": {
    tasks: [
      { level: "easy", q: "როგორ დავამრგვალოთ რიცხვი უახლოეს მთელამდე?" },
      { level: "medium", q: "დაწერე ფორმულა შემთხვევითი მთელი რიცხვისთვის 1-დან 6-მდე." },
      { level: "medium", q: "რატომ არ არის 0.1 + 0.2 ზუსტად 0.3?" },
    ],
    answers: ["Math.round(x)", "Math.floor(Math.random() * 6) + 1", "ორობითი წილადების ჩაწერის სიზუსტის გამო — ეს ყველა ენას ახასიათებს."],
  },
  "js-comparison": {
    tasks: [
      { level: "easy", q: "რატომ ჯობია === ვიდრე ==?" },
      { level: "medium", q: "რას იძლევა \"2\" == 2 და \"2\" === 2?" },
    ],
    answers: ["=== ტიპსაც ადარებს და ავტომატურ გარდაქმნას არ აკეთებს.", "პირველი true, მეორე false."],
  },
  "js-truthy": {
    tasks: [
      { level: "easy", q: "ჩამოთვალე falsy მნიშვნელობები." },
      { level: "medium", q: "ცარიელი მასივი truthy-ა თუ falsy? როგორ შევამოწმოთ სიცარიელე?" },
    ],
    answers: ["false, 0, \"\", null, undefined, NaN.", "truthy-ა; სიცარიელე: arr.length === 0."],
  },
  "js-if": {
    tasks: [
      { level: "easy", q: "დაწერე if/else, რომელიც ქულის მიხედვით შეფასებას აბრუნებს." },
      { level: "medium", q: "რატომ უნდა იყოს ყველაზე კონკრეტული პირობა ზემოთ?" },
    ],
    answers: ["if (q > 80) { … } else { … }", "პირობები რიგზე მოწმდება და პირველივე დამთხვევაზე ჩერდება."],
  },
  "js-switch": {
    tasks: [
      { level: "easy", q: "რა მოხდება, თუ case-ში break დაგავიწყდება?" },
      { level: "medium", q: "როდის ჯობია switch if/else-ს?" },
    ],
    answers: ["შესრულება შემდეგ case-ზე გადავარდება (fall-through).", "როცა ერთ მნიშვნელობას ბევრ კონკრეტულ ვარიანტს ადარებ."],
  },
  "js-ternary": {
    tasks: [
      { level: "easy", q: "გადაწერე ტერნარულად: if (age >= 18) x = \"დიახ\"; else x = \"არა\";" },
      { level: "medium", q: "როდის არ უნდა გამოვიყენოთ ტერნარული?" },
    ],
    answers: ['const x = age >= 18 ? "დიახ" : "არა";', "როცა შტოებში რამდენიმე ქმედებაა ან ჩალაგება საჭიროა — მაშინ if ჯობია."],
  },
  "js-for": {
    tasks: [
      { level: "easy", q: "დაწერე ციკლი, რომელიც 1-დან 10-მდე ჯამს ითვლის." },
      { level: "medium", q: "რა განსხვავებაა for...of-სა და for...in-ს შორის?" },
    ],
    answers: ["for (let i = 1; i <= 10; i++) jami += i;  // 55", "of — მნიშვნელობებზე (მასივი); in — გასაღებებზე (ობიექტი)."],
  },
  "js-while": {
    tasks: [
      { level: "easy", q: "როდის ავირჩიოთ while და როდის for?" },
      { level: "medium", q: "რა არის უსასრულო ციკლი და როგორ ავიცილოთ თავიდან?" },
    ],
    answers: ["while — როცა გამეორებათა რაოდენობა წინასწარ არ იცი; for — როცა იცი.", "პირობა არასდროს ხდება false; ციკლში აუცილებლად შეცვალე ის, რასაც პირობა ამოწმებს."],
  },
  "js-break": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა break-სა და continue-ს შორის?" },
      { level: "medium", q: "რომელი მასივის მეთოდი ცვლის ხშირად break-იან ციკლს?" },
    ],
    answers: ["break ციკლს წყვეტს; continue მხოლოდ მიმდინარე გამეორებას ტოვებს.", ".find() — პირველ დამთხვევას აბრუნებს."],
  },
  "js-arrays": {
    tasks: [
      { level: "easy", q: "როგორ ავიღოთ მასივის ბოლო ელემენტი?" },
      { level: "medium", q: "რატომ მუშაობს push() const მასივზე?" },
    ],
    answers: ["arr[arr.length - 1] ან arr.at(-1)", "const კრძალავს ცვლადის ხელახლა მინიჭებას, არა შიგთავსის ცვლილებას."],
  },
  "js-array-methods": {
    tasks: [
      { level: "easy", q: "დაასახელე მეთოდები დასაწყისში/ბოლოში დამატებისა და წაშლისთვის." },
      { level: "medium", q: "რა განსხვავებაა slice()-სა და splice()-ს შორის?" },
      { level: "medium", q: "როგორ გავაკეთოთ მასივის ასლი?" },
    ],
    answers: ["push/pop (ბოლო), unshift/shift (დასაწყისი).", "slice ორიგინალს არ ცვლის და ახალს აბრუნებს; splice ორიგინალს ცვლის.", "[...arr] ან arr.slice()"],
  },
  "js-map-filter": {
    tasks: [
      { level: "easy", q: "დაწერე: მასივიდან მხოლოდ ლუწები." },
      { level: "easy", q: "დაწერე: ყველა ელემენტი გამრავლებული 3-ზე." },
      { level: "medium", q: "რით განსხვავდება forEach map-ისგან?" },
    ],
    answers: ["arr.filter(n => n % 2 === 0)", "arr.map(n => n * 3)", "forEach არაფერს აბრუნებს; map ახალ მასივს ქმნის."],
  },
  "js-reduce": {
    tasks: [
      { level: "easy", q: "დაწერე მასივის ჯამი reduce-ით." },
      { level: "medium", q: "რატომ უნდა მივუთითოთ საწყისი მნიშვნელობა?" },
    ],
    answers: ["arr.reduce((a, b) => a + b, 0)", "ცარიელ მასივზე შეცდომას აგდებს და ტიპებიც შეიძლება აირიოს."],
  },
  "js-find": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა find()-სა და filter()-ს შორის?" },
      { level: "medium", q: "როგორ ვიპოვოთ ობიექტი მასივში id-ით?" },
    ],
    answers: ["find ერთ ელემენტს აბრუნებს (ან undefined), filter — მასივს.", "users.find(u => u.id === 5)"],
  },
  "js-sort": {
    tasks: [
      { level: "easy", q: "დაალაგე რიცხვები ზრდადობით." },
      { level: "medium", q: "რატომ იძლევა [25,3,100].sort() არასწორ შედეგს?" },
      { level: "medium", q: "როგორ დავალაგოთ ორიგინალის შეცვლის გარეშე?" },
    ],
    answers: ["arr.sort((a, b) => a - b)", "ნაგულისხმევად ელემენტებს ტექსტად ადარებს.", "[...arr].sort(...)"],
  },
  "js-objects": {
    tasks: [
      { level: "easy", q: "როდის გამოვიყენოთ წერტილი და როდის კვადრატული ფრჩხილი?" },
      { level: "medium", q: "რას აბრუნებს არარსებული თვისება და როგორ დავიცვათ თავი?" },
    ],
    answers: ["წერტილი — როცა სახელი წინასწარ იცი; ფრჩხილი — როცა სახელი ცვლადშია.", "undefined; გამოიყენე ?. — user?.address?.city"],
  },
  "js-object-methods": {
    tasks: [
      { level: "easy", q: "დაწერე ობიექტის მეთოდი, რომელიც this-ს იყენებს." },
      { level: "medium", q: "რატომ არ გამოდგება ისრიანი ფუნქცია მეთოდად?" },
    ],
    answers: ["greet() { return `გამარჯობა, ${this.name}`; }", "მას საკუთარი this არ აქვს — გარე სკოუპიდან იღებს."],
  },
  "js-functions": {
    tasks: [
      { level: "easy", q: "დაწერე ფუნქცია, რომელიც ორ რიცხვს ამრავლებს." },
      { level: "medium", q: "რას აბრუნებს ფუნქცია return-ის გარეშე?" },
    ],
    answers: ["function mult(a, b) { return a * b; }", "undefined"],
  },
  "js-arrow": {
    tasks: [
      { level: "easy", q: "გადაწერე ისრიანად: function jami(a,b){return a+b;}" },
      { level: "medium", q: "დაასახელე ისრიანი ფუნქციის მთავარი ტექნიკური განსხვავება." },
    ],
    answers: ["const jami = (a, b) => a + b;", "საკუთარი this არ აქვს — გარე კონტექსტიდან იღებს."],
  },
  "js-params": {
    tasks: [
      { level: "easy", q: "დაწერე ფუნქცია ნაგულისხმევი პარამეტრით." },
      { level: "medium", q: "სად უნდა იდგეს rest პარამეტრი და რატომ?" },
    ],
    answers: ['function greet(name = "სტუმარო") { … }', "ბოლოს — ის ყველა დარჩენილ არგუმენტს აგროვებს."],
  },
  "js-spread": {
    tasks: [
      { level: "easy", q: "გააერთიანე ორი მასივი spread-ით." },
      { level: "medium", q: "რა განსხვავებაა rest-სა და spread-ს შორის?" },
      { level: "hard", q: "რა შეზღუდვა აქვს { ...obj } ასლს?" },
    ],
    answers: ["[...a, ...b]", "ერთი და იგივე სინტაქსია: პარამეტრებში აგროვებს (rest), სხვაგან — შლის (spread).", "ზედაპირულია — ჩალაგებული ობიექტები საერთო რჩება; ღრმა ასლი: structuredClone()."],
  },
  "js-scope": {
    tasks: [
      { level: "easy", q: "დაასახელე სკოუპის სამი სახე." },
      { level: "medium", q: "რა განსხვავებაა let-ისა და var-ის hoisting-ში?" },
    ],
    answers: ["გლობალური, ფუნქციის, ბლოკის.", "var გამოცხადებამდე undefined-ია; let/const შეცდომას აგდებს (temporal dead zone)."],
  },
  "js-closures": {
    tasks: [
      { level: "medium", q: "ახსენი, რა არის closure." },
      { level: "hard", q: "დაწერე მრიცხველი closure-ით." },
    ],
    answers: [
      "ფუნქცია, რომელსაც ახსოვს ის სკოუპი, სადაც შეიქმნა — გარე ფუნქციის დასრულების შემდეგაც.",
      "function counter(){ let c = 0; return () => ++c; }",
    ],
  },
  "js-this": {
    tasks: [
      { level: "medium", q: "რას მიუთითებს this ობიექტის მეთოდში?" },
      { level: "hard", q: "რა მოხდება, თუ მეთოდს ობიექტისგან მოვწყვეტთ?" },
    ],
    answers: ["თავად ობიექტს.", "this დაიკარგება; გამოსავალი — .bind(obj) ან ისრიანი ფუნქცია."],
  },
  "js-recursion": {
    tasks: [
      { level: "medium", q: "რა არის საბაზისო შემთხვევა და რატომაა აუცილებელი?" },
      { level: "hard", q: "დაწერე რეკურსიული ფუნქცია ფაქტორიალისთვის." },
    ],
    answers: ["პირობა, რომელზეც რეკურსია ჩერდება; მის გარეშე — უსასრულო გამოძახება და stack overflow.", "function f(n){ return n <= 1 ? 1 : n * f(n - 1); }"],
  },
  "js-destructuring": {
    tasks: [
      { level: "easy", q: "ამოიღე ობიექტიდან name და age ერთი ხაზით." },
      { level: "medium", q: "როგორ მივცეთ ნაგულისხმევი მნიშვნელობა დესტრუქტურიზაციისას?" },
    ],
    answers: ["const { name, age } = user;", 'const { city = "თბილისი" } = user;'],
  },
  "js-object-static": {
    tasks: [
      { level: "easy", q: "როგორ მივიღოთ ობიექტის გასაღებების მასივი?" },
      { level: "medium", q: "დაწერე ციკლი, რომელიც ობიექტის ყველა წყვილზე გაივლის." },
    ],
    answers: ["Object.keys(obj)", "for (const [k, v] of Object.entries(obj)) { … }"],
  },
  "js-json": {
    tasks: [
      { level: "easy", q: "როგორ გადავიყვანოთ ობიექტი JSON ტექსტად და უკან?" },
      { level: "medium", q: "რა იკარგება JSON.stringify-ისას?" },
    ],
    answers: ["JSON.stringify(obj) და JSON.parse(text)", "ფუნქციები და undefined მნიშვნელობები."],
  },
  "js-map-set": {
    tasks: [
      { level: "easy", q: "როგორ მოვაშოროთ მასივს გამეორებები?" },
      { level: "medium", q: "რით სჯობს Map ჩვეულებრივ ობიექტს?" },
    ],
    answers: ["[...new Set(arr)]", "გასაღები ნებისმიერი ტიპის შეიძლება იყოს და რიგი გარანტირებულია."],
  },
  "js-classes": {
    tasks: [
      { level: "easy", q: "რას აკეთებს constructor?" },
      { level: "medium", q: "შექმენი კლასი ორი თვისებითა და ერთი მეთოდით." },
    ],
    answers: ["ახალი ობიექტის შექმნისას სრულდება და თვისებებს აყენებს.", "class A { constructor(x, y){ this.x = x; this.y = y; } info(){ return this.x; } }"],
  },
  "js-inheritance": {
    tasks: [
      { level: "medium", q: "რას აკეთებს extends და super()?" },
      { level: "hard", q: "რატომ უნდა გამოიძახო super() this-ის გამოყენებამდე?" },
    ],
    answers: ["extends მშობლის თვისებებს გადმოსცემს; super() მშობლის კონსტრუქტორს იძახებს.", "სანამ super() არ გამოიძახება, this ჯერ არ არსებობს."],
  },
  "js-dom-intro": {
    tasks: [
      { level: "easy", q: "რა არის DOM?" },
      { level: "medium", q: "DOM-ის შეცვლა ცვლის თუ არა HTML ფაილს?" },
    ],
    answers: ["ბრაუზერის მიერ HTML-დან აგებული ხის სტრუქტურა, რომელსაც JS ცვლის.", "არა — ცვლილება მხოლოდ მეხსიერებაშია და განახლებისას ქრება."],
  },
  "js-selectors": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა querySelector-სა და querySelectorAll-ს შორის?" },
      { level: "medium", q: "რას აბრუნებს querySelector, თუ ვერაფერი იპოვა?" },
    ],
    answers: ["პირველი ერთ ელემენტს აბრუნებს, მეორე — ყველას (NodeList).", "null — ამიტომ მასზე მიმართვამდე შეამოწმე."],
  },
  "js-dom-content": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა textContent-სა და innerHTML-ს შორის?" },
      { level: "hard", q: "რატომ არის საშიში მომხმარებლის ტექსტის innerHTML-ით ჩასმა?" },
    ],
    answers: ["textContent მხოლოდ ტექსტს ცვლის; innerHTML — HTML-ს ტეგებით.", "XSS — გვერდზე უცხო კოდის გაშვება ხდება შესაძლებელი."],
  },
  "js-classlist": {
    tasks: [
      { level: "easy", q: "დაასახელე classList-ის 4 მეთოდი." },
      { level: "medium", q: "რატომ ჯობია კლასის გადართვა style-ის პირდაპირ ცვლილებას?" },
    ],
    answers: ["add, remove, toggle, contains.", "გარეგნობა CSS-ში რჩება და ლოგიკისგან გამიჯნულია."],
  },
  "js-dom-create": {
    tasks: [
      { level: "easy", q: "დაწერე ახალი <li>-ის შექმნა და სიაში დამატება." },
      { level: "medium", q: "რატომ არ ჩანს createElement-ით შექმნილი ელემენტი მაშინვე?" },
    ],
    answers: ['const li = document.createElement("li"); li.textContent = "…"; list.append(li);', "სანამ მშობელს არ დაამატებ, ის DOM-ში არ არის."],
  },
  "js-events": {
    tasks: [
      { level: "easy", q: "დაწერე ღილაკზე დაჭერის დამმუშავებელი." },
      { level: "medium", q: "რას აკეთებს event.preventDefault()?" },
      { level: "hard", q: "რა არის მოვლენის დელეგირება და რატომ გამოვიყენოთ?" },
    ],
    answers: [
      'btn.addEventListener("click", () => { … })',
      "ბრაუზერის ნაგულისხმევ ქცევას აჩერებს (მაგ. ფორმის გაგზავნას).",
      "ერთი დამმუშავებელი მშობელზე bubbling-ის წყალობით — ბევრი შვილის ნაცვლად.",
    ],
  },
  "js-timers": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა setTimeout-სა და setInterval-ს შორის?" },
      { level: "medium", q: "რატომ სრულდება setTimeout(fn, 0) სხვა კოდის შემდეგ?" },
    ],
    answers: ["setTimeout ერთხელ, setInterval — გამეორებით (სანამ clearInterval არ გამოიძახე).", "ის რიგში დგება და მხოლოდ მიმდინარე კოდის დასრულების შემდეგ სრულდება."],
  },
  "js-promise": {
    tasks: [
      { level: "easy", q: "დაასახელე Promise-ის სამი მდგომარეობა." },
      { level: "medium", q: "როგორ დავიჭიროთ Promise-ის შეცდომა?" },
    ],
    answers: ["pending, fulfilled, rejected.", ".catch() ან try/catch await-თან ერთად."],
  },
  "js-async-await": {
    tasks: [
      { level: "easy", q: "სად შეიძლება await-ის გამოყენება?" },
      { level: "medium", q: "რას აბრუნებს async ფუნქცია?" },
      { level: "hard", q: "როგორ გავუშვათ რამდენიმე მოთხოვნა პარალელურად?" },
    ],
    answers: ["მხოლოდ async ფუნქციის შიგნით.", "ყოველთვის Promise-ს.", "Promise.all([...]) — ცალკე await-ები თანმიმდევრულად ელოდება."],
  },
  "js-fetch": {
    tasks: [
      { level: "medium", q: "რატომ არ აგდებს fetch შეცდომას 404-ზე და როგორ შევამოწმოთ?" },
      { level: "medium", q: "რატომ სჭირდება .json()-ს await?" },
    ],
    answers: ["მოთხოვნა წარმატებულია, თუ პასუხი მოვიდა; შეამოწმე response.ok.", "სხეულის წაკითხვაც ასინქრონულია."],
  },
  "js-errors": {
    tasks: [
      { level: "easy", q: "რისთვის არის finally?" },
      { level: "medium", q: "როგორ ავაგდოთ საკუთარი შეცდომა?" },
      { level: "medium", q: "რატომ არ უნდა დავტოვოთ ცარიელი catch?" },
    ],
    answers: ["ორივე შემთხვევაში სრულდება — შეცდომისასაც და წარმატებისასაც.", 'throw new Error("ტექსტი")', "შეცდომა ჩაიყლაპება და გამართვა შეუძლებელი ხდება."],
  },
  "js-recap": {
    tasks: [
      { level: "medium", q: "დაწერე პროგრამა: სტუდენტების მასივიდან გამოიტანე 80+ ქულიანები და საშუალო ქულა." },
      { level: "hard", q: "ააწყვე პატარა TODO აპლიკაცია: დამატება, წაშლა, სიის ჩვენება (DOM + მოვლენები)." },
    ],
  },
  "js-resources": {
    tasks: [
      { level: "easy", q: "გაიარე Exercism-ის ან Codewars-ის 3 ამოცანა." },
      { level: "medium", q: "აირჩიე JavaScript30-იდან ერთი პროექტი და გაიმეორე." },
    ],
  },

  // ===================== თავი 3 — CSS =====================
  "css-intro": {
    tasks: [
      { level: "easy", q: "დაასახელე CSS წესის სამი ნაწილი მაგალითზე h1 { color: red; }" },
      { level: "easy", q: "სამი გზიდან CSS-ის მისაბმელად რომელი ჯობია და რატომ?" },
      { level: "medium", q: "რატომ არის inline style ცუდი პრაქტიკა?" },
    ],
    answers: [
      "სელექტორი (h1), თვისება (color), მნიშვნელობა (red).",
      "გარე ფაილი <link>-ით — ერთი ფაილი ბევრ გვერდს ემსახურება და ქეშირდება.",
      "არ მეორდება, ძნელი შესაცვლელია და სპეციფიკურობით ყველაფერს ჯაბნის.",
    ],
  },
  "css-selectors": {
    tasks: [
      { level: "easy", q: "როგორ ავირჩევთ კლასს, id-ს და ტეგს? დაწერე სამივე." },
      { level: "medium", q: "რატომ იყენებენ სტილისთვის ძირითადად კლასს და არა id-ს?" },
      { level: "medium", q: "დაწერე სელექტორი, რომელიც მხოლოდ type=\"email\" ველს აირჩევს." },
    ],
    answers: [".klasi { }, #id { }, p { }", "კლასი მრავალჯერ გამოიყენება და სპეციფიკურობა დაბალი აქვს — ადვილი გადასაწერია.", 'input[type="email"] { }'],
  },
  "css-combinators": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა „nav a“-სა და „nav > a“-ს შორის?" },
      { level: "medium", q: "რა განსხვავებაა „.a .b“-სა და „.a.b“-ს შორის?" },
    ],
    answers: [
      "პირველი ყველა შთამომავალს ირჩევს, მეორე — მხოლოდ პირდაპირ შვილს.",
      ".a .b — b ელემენტი a-ს შიგნით; .a.b — ერთი ელემენტი, რომელსაც ორივე კლასი აქვს.",
    ],
  },
  "css-pseudo-classes": {
    tasks: [
      { level: "easy", q: "რატომ უნდა დაიწეროს :focus ყოველთვის :hover-თან ერთად?" },
      { level: "medium", q: "დაწერე სელექტორი ცხრილის ლუწი სტრიქონებისთვის." },
    ],
    answers: [":hover მხოლოდ მაუსით მუშაობს — კლავიატურის მომხმარებელს :focus სჭირდება.", "tr:nth-child(even) { }"],
  },
  "css-pseudo-elements": {
    tasks: [
      { level: "easy", q: "რის გარეშე არ იმუშავებს ::before და ::after?" },
      { level: "medium", q: "დაწერე წესი, რომელიც სავალდებულო ველის წარწერას წითელ ვარსკვლავს დაუმატებს." },
    ],
    answers: ["content თვისების გარეშე (თუნდაც ცარიელი: content: \"\").", 'label.required::after { content: " *"; color: red; }'],
  },
  "css-cascade": {
    tasks: [
      { level: "easy", q: "დაალაგე სპეციფიკურობით: .klasi, #id, p" },
      { level: "medium", q: "ორივე წესს ერთნაირი სპეციფიკურობა აქვს — რომელი გაიმარჯვებს?" },
      { level: "hard", q: "რატომ ითვლება !important ცუდ პრაქტიკად?" },
    ],
    answers: ["#id (100) > .klasi (10) > p (1).", "ის, რომელიც ფაილში ბოლოს წერია.", "კასკადს არღვევს და შემდეგ მისი გადაფარვა მხოლოდ კიდევ ერთი !important-ით შეიძლება."],
  },
  "css-inheritance": {
    tasks: [
      { level: "easy", q: "დაასახელე 2 თვისება, რომელიც მემკვიდრეობს, და 2 — რომელიც არა." },
      { level: "medium", q: "რატომ არ იღებს <button> გვერდის შრიფტს ავტომატურად?" },
    ],
    answers: ["მემკვიდრეობს: color, font-family; არა: margin, border.", "ფორმის ელემენტებს ბრაუზერის საკუთარი სტილი აქვთ — საჭიროა font: inherit."],
  },
  "css-colors": {
    tasks: [
      { level: "easy", q: "დაასახელე ფერის ჩაწერის 3 ფორმატი." },
      { level: "medium", q: "რა განსხვავებაა opacity-სა და rgba-ს შორის?" },
      { level: "medium", q: "რატომ არის hsl მოსახერხებელი ღია/მუქი ვარიანტების შესაქმნელად?" },
    ],
    answers: ["hex (#e63946), rgb(), hsl() (ასევე სახელი).", "opacity მთელ ელემენტს გაამჭვირვალებს შვილებთან ერთად; rgba — მხოლოდ ამ ფერს.", "საკმარისია მესამე რიცხვის (სიკაშკაშის) შეცვლა, ტონი უცვლელი რჩება."],
  },
  "css-units": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა em-სა და rem-ს შორის?" },
      { level: "medium", q: "რატომ ჯობია შრიფტისთვის rem და არა px?" },
      { level: "medium", q: "რას ნიშნავს 50vw?" },
    ],
    answers: ["em მშობლის/მიმდინარე შრიფტს ეყრდნობა და გროვდება; rem — მხოლოდ ფესვის (html) შრიფტს.", "მომხმარებლის ბრაუზერში გაზრდილი შრიფტი პროპორციულად იმუშავებს.", "ეკრანის სიგანის 50%."],
  },
  "css-text": {
    tasks: [
      { level: "easy", q: "რატომ იწერება line-height უერთეულოდ?" },
      { level: "medium", q: "რამდენი სიმბოლო ითვლება ოპტიმალურ სტრიქონის სიგრძედ და როგორ მიიღწევა?" },
    ],
    answers: ["რომ სწორად გამრავლდეს ნებისმიერ შრიფტის ზომაზე.", "45–75 სიმბოლო; max-width: 65ch."],
  },
  "css-fonts": {
    tasks: [
      { level: "easy", q: "რატომ იწერება font-family-ში რამდენიმე შრიფტი?" },
      { level: "medium", q: "რა პრობლემა შეიძლება შეიქმნას ქართულ ტექსტთან გარე შრიფტის გამოყენებისას?" },
    ],
    answers: ["სათადარიგოდ — თუ პირველი არ არის, ბრაუზერი შემდეგს აიღებს; ბოლოს ზოგადი ოჯახი.", "შრიფტს შეიძლება ქართული ასოები არ ჰქონდეს და ტექსტი ჩანაცვლდეს."],
  },
  "css-box-model": {
    tasks: [
      { level: "easy", q: "დაასახელე ბოქს-მოდელის ოთხი ფენა შიგნიდან გარეთ." },
      { level: "medium", q: "რას აკეთებს box-sizing: border-box და რატომ იყენებენ ყველგან?" },
      { level: "hard", q: "width: 300px, padding: 20px, border: 5px — რა იქნება რეალური სიგანე ორივე რეჟიმში?" },
    ],
    answers: [
      "content, padding, border, margin.",
      "padding-სა და border-ს სიგანეში ითვლის — ზომები პროგნოზირებადი ხდება.",
      "content-box: 350px; border-box: 300px.",
    ],
  },
  "css-spacing": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა margin-სა და padding-ს შორის?" },
      { level: "easy", q: "რას ნიშნავს padding: 10px 20px?" },
      { level: "medium", q: "როგორ დავაცენტროთ ბლოკი ჰორიზონტალურად?" },
    ],
    answers: ["padding შიგნითაა (ფონის ქვეშ), margin — გარეთ და გამჭვირვალე.", "ზემოთ/ქვემოთ 10px, მარცხნივ/მარჯვნივ 20px.", "width მიეცი და margin: 0 auto."],
  },
  "css-borders": {
    tasks: [
      { level: "easy", q: "რატომ არ ჩანს საზღვარი, თუ მხოლოდ სისქე და ფერი დაწერე?" },
      { level: "medium", q: "როგორ ვაქციოთ სურათი წრედ?" },
      { level: "medium", q: "რა განსხვავებაა border-სა და outline-ს შორის?" },
    ],
    answers: ["border-style აკლია (მაგ. solid).", "ერთნაირი width/height + border-radius: 50%.", "outline ადგილს არ იკავებს და განლაგებას არ ცვლის — ფოკუსისთვისაა."],
  },
  "css-backgrounds": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა background-size-ის cover და contain მნიშვნელობებს შორის?" },
      { level: "medium", q: "რატომ იწერება გრადიენტი background-image-ში და არა background-color-ში?" },
    ],
    answers: ["cover ავსებს (შეიძლება მოიჭრას), contain მთლიანად ატევს (შეიძლება ცარიელი დარჩეს).", "გრადიენტი ტექნიკურად სურათია, არა ერთი ფერი."],
  },
  "css-display": {
    tasks: [
      { level: "easy", q: "რატომ არ მოქმედებს width inline ელემენტზე?" },
      { level: "medium", q: "რა განსხვავებაა display: none-სა და visibility: hidden-ს შორის?" },
      { level: "medium", q: "როგორ ვაქციოთ ბმული ღილაკად?" },
    ],
    answers: ["inline ელემენტი ტექსტის ნაკადშია და ზომებს არ იღებს.", "none სრულად შლის ნაკადიდან; hidden მალავს, მაგრამ ადგილს ტოვებს.", "display: inline-block + padding + ფონი."],
  },
  "css-position": {
    tasks: [
      { level: "easy", q: "დაასახელე position-ის 5 მნიშვნელობა." },
      { level: "medium", q: "რის მიმართ პოზიციონირდება absolute ელემენტი?" },
      { level: "hard", q: "რატომ არ მუშაობს z-index static ელემენტზე?" },
    ],
    answers: [
      "static, relative, absolute, fixed, sticky.",
      "უახლოესი წინაპრის მიმართ, რომელსაც position არა static აქვს (თუ არაა — გვერდის მიმართ).",
      "z-index მხოლოდ პოზიციონირებულ ელემენტებზე მოქმედებს.",
    ],
  },
  "css-flex-basics": {
    tasks: [
      { level: "easy", q: "როგორ დავაცენტროთ ელემენტი ჰორიზონტალურად და ვერტიკალურად flex-ით?" },
      { level: "medium", q: "flex-direction: column-ზე რომელ ღერძზე მოქმედებს justify-content?" },
    ],
    answers: ["display: flex; justify-content: center; align-items: center;", "ვერტიკალურზე — ღერძები ადგილს იცვლიან."],
  },
  "css-flex-advanced": {
    tasks: [
      { level: "easy", q: "რას აკეთებს flex-wrap: wrap?" },
      { level: "medium", q: "რას ნიშნავს flex: 1 (სამი თვისების ენაზე)?" },
      { level: "medium", q: "როგორ მივაწებოთ ერთი ელემენტი მარჯვნივ flex კონტეინერში?" },
    ],
    answers: ["ელემენტებს, რომლებიც არ ეტევა, ახალ ხაზზე გადაიტანს.", "flex-grow: 1; flex-shrink: 1; flex-basis: 0%.", "margin-left: auto."],
  },
  "css-grid-basics": {
    tasks: [
      { level: "easy", q: "რას ნიშნავს 1fr?" },
      { level: "easy", q: "დაწერე სამსვეტიანი ბადე repeat()-ით." },
      { level: "medium", q: "როდის ავირჩიოთ Grid და როდის Flexbox?" },
    ],
    answers: ["დარჩენილი თავისუფალი სივრცის ერთი წილი.", "grid-template-columns: repeat(3, 1fr);", "Grid — ორი განზომილება (კარკასი, ბადე); Flexbox — ერთი (რიგი/სვეტი)."],
  },
  "css-grid-advanced": {
    tasks: [
      { level: "easy", q: "როგორ დავაკავებინოთ ელემენტს ორი სვეტი?" },
      { level: "medium", q: "ახსენი, რას აკეთებს repeat(auto-fit, minmax(200px, 1fr))." },
    ],
    answers: ["grid-column: span 2;", "ქმნის რესპონსიულ ბადეს: სვეტი მინიმუმ 200px, რაოდენობა ეკრანს ავტომატურად ერგება — media query-ის გარეშე."],
  },
  "css-responsive": {
    tasks: [
      { level: "easy", q: "დაწერე media query, რომელიც 700px-ზე ფართო ეკრანზე ჩაირთვება." },
      { level: "medium", q: "რას ნიშნავს mobile-first და რატომ ჯობია?" },
      { level: "medium", q: "რომელი meta ტეგის გარეშე არ იმუშავებს media query მობილურზე?" },
    ],
    answers: ["@media (min-width: 700px) { … }", "ჯერ ვიწრო ეკრანის სტილი, მერე min-width-ით დამატება — კოდი უფრო მარტივია.", '<meta name="viewport" content="width=device-width, initial-scale=1">'],
  },
  "css-variables": {
    tasks: [
      { level: "easy", q: "როგორ გამოვაცხადოთ და გამოვიყენოთ CSS ცვლადი?" },
      { level: "medium", q: "როგორ გამოიყენება ცვლადები მუქი თემისთვის?" },
    ],
    answers: [":root { --main: #333; } შემდეგ color: var(--main);", "თემის სელექტორში ცვლადებს გადააწერ: [data-theme=\"dark\"] { --bg: #0f141c; }"],
  },
  "css-transform": {
    tasks: [
      { level: "easy", q: "დაასახელე transform-ის 3 ფუნქცია." },
      { level: "medium", q: "რატომ ჯობია ანიმაციისთვის transform და არა margin/top?" },
    ],
    answers: ["translate, rotate, scale (ასევე skew).", "transform-ს ვიდეობარათი ამუშავებს და განლაგების გადათვლა არ სჭირდება — ანიმაცია რბილია."],
  },
  "css-transition": {
    tasks: [
      { level: "easy", q: "დაასახელე transition-ის ოთხი ნაწილი." },
      { level: "medium", q: "სად უნდა დაიწეროს transition — ჩვეულებრივ მდგომარეობაზე თუ :hover-ზე? რატომ?" },
    ],
    answers: ["თვისება, ხანგრძლივობა, რიტმი (timing), დაყოვნება.", "ჩვეულებრივზე — მაშინ ანიმაცია ორივე მიმართულებით რბილია."],
  },
  "css-animation": {
    tasks: [
      { level: "easy", q: "რა განსხვავებაა transition-სა და @keyframes ანიმაციას შორის?" },
      { level: "medium", q: "როგორ გავითვალისწინოთ მომხმარებლები, ვისაც მოძრაობა აწუხებს?" },
    ],
    answers: ["transition ორ მდგომარეობას შორის მუშაობს; @keyframes მრავალსაფეხურიან ანიმაციას აღწერს.", "@media (prefers-reduced-motion: reduce) — ანიმაციების გამორთვა."],
  },
  "css-organization": {
    tasks: [
      { level: "easy", q: "ახსენი BEM-ის სამი ნაწილი მაგალითით." },
      { level: "medium", q: "რატომ ჯობია class=\"gafrtxileba\" ვიდრე class=\"witeli\"?" },
    ],
    answers: [".card (ბლოკი), .card__title (ელემენტი), .card--wide (მოდიფიკატორი).", "სახელი დანიშნულებას აღწერს — ფერი შეიძლება შეიცვალოს, დანიშნულება არა."],
  },
  "css-devtools": {
    tasks: [
      { level: "easy", q: "როგორ გავიგოთ DevTools-ში, რომელმა წესმა გადაფარა ჩვენი სტილი?" },
      { level: "medium", q: "ჩამოთვალე 4 რამ, რასაც შეამოწმებ, როცა CSS წესი არ მუშაობს." },
    ],
    answers: [
      "Styles პანელში გადახაზული დეკლარაცია ნიშნავს, რომ სხვამ გადაფარა; Computed საბოლოო მნიშვნელობას აჩვენებს.",
      "სელექტორი სწორია? სხვა წესი ხომ არ ჯაბნის? წერტილმძიმე? ფაილი მიბმულია?",
    ],
  },
  "css-recap": {
    tasks: [
      { level: "medium", q: "ააწყვე გვერდი: header, ბარათების რესპონსიული ბადე და :hover ეფექტი." },
      { level: "hard", q: "აიღე მოწონებული საიტის ერთი ბლოკი და გაიმეორე ნულიდან." },
    ],
  },
  "css-resources": {
    tasks: [
      { level: "easy", q: "გაიარე Flexbox Froggy-ის პირველი 10 დონე." },
      { level: "medium", q: "გაიარე Grid Garden და ჩამოწერე, რა გაიგე auto-fit-ზე." },
    ],
  },

  // ===================== თავი 1 — კომპიუტერი ნულიდან =====================
  electricity: {
    tasks: [
      { level: "easy", q: "წყლის ანალოგიით ახსენი: რა არის დენი და რას შეესაბამება კვების წყარო?" },
      { level: "easy", q: "რა ხდება ნათურასთან, თუ წრედი სადმე გაწყვეტილია?" },
      { level: "medium", q: "ორი ნათურა სერიულად ჩართე; ერთი გადაიწვა — რა მოხდება მეორესთან და რატომ?" },
    ],
    answers: [
      "დენი = ელექტრონების მოძრაობა; კვების წყარო = ბიძგი/ტუმბო.",
      "დენი წყდება, ნათურა ქრება.",
      "მეორეც ქრება — სერიულ წრედში გზა წყდება.",
    ],
  },
  "two-state": {
    tasks: [
      { level: "easy", q: "რატომ იყენებს კომპიუტერი მხოლოდ 2 მდგომარეობას და არა 10-ს?" },
      { level: "easy", q: "მაღალი ძაბვა რომელ ბიტად იკითხება, დაბალი — რომელად?" },
      { level: "medium", q: "ახსენი, რატომ არ გროვდება შეცდომა მილიარდობით ოპერაციის მერეც, ხმაურის მიუხედავად." },
    ],
    answers: [
      "2 დონის გარჩევა საიმედოა — მცირე ხმაური ვერ ცვლის; 10 დონე ადვილად აირევა.",
      "მაღალი = 1, დაბალი = 0.",
      "თითო კარიბჭე სიგნალს ისევ სუფთა 0/1-მდე „ასწორებს“ (აღადგენს), ამიტომ ხმაური არ გროვდება.",
    ],
  },
  binary: {
    tasks: [
      { level: "easy", q: "გადაიყვანე ათობითში: 0101, 1001, 1110." },
      { level: "easy", q: "გადაიყვანე ორობითში: 6, 10, 15." },
      { level: "medium", q: "რამდენი განსხვავებული მნიშვნელობა შეიძლება 4 ბიტით? 8 ბიტით?" },
      { level: "hard", q: "n ბიტით ყველაზე დიდი რიცხვი? (ფორმულა და გამოთვალე 5 ბიტისთვის)" },
    ],
    answers: ["5, 9, 14.", "110, 1010, 1111.", "16; 256.", "2ⁿ − 1; 5 ბიტი → 31."],
  },
  transistor: {
    tasks: [
      { level: "easy", q: "როდის ატარებს ტრანზისტორი დენს — Input = 0 თუ Input = 1?" },
      { level: "medium", q: "აღწერე ნაბიჯ-ნაბიჯ, როგორ აანთებ ნათურას ტრანზისტორის მართვით." },
    ],
    answers: ["Input = 1.", "Input-ზე 1 → ტრანზისტორი ხსნის გზას → დენი გადის → ნათურა ანთია."],
  },
  "not-gate": {
    tasks: [
      { level: "easy", q: "შეავსე: NOT(0) = ? NOT(1) = ?" },
      { level: "medium", q: "რამდენი ტრანზისტორი და წინაღობა სჭირდება NOT-ს ამ კურსის მოდელით?" },
    ],
    answers: ["1; 0.", "ერთი ტრანზისტორი + ერთი წინაღობა."],
  },
  "and-gate": {
    tasks: [
      { level: "easy", q: "შეავსე AND-ის ცხრილი: 00→? 01→? 10→? 11→?" },
      { level: "medium", q: "რატომ დგას AND-ის ტრანზისტორები სერიულად?" },
    ],
    answers: ["0, 0, 0, 1.", "დენი ბოლომდე მხოლოდ მაშინ გადის, თუ ორივე ჩართულია."],
  },
  "or-gate": {
    tasks: [
      { level: "easy", q: "შეავსე OR-ის ცხრილი: 00→? 01→? 10→? 11→?" },
      { level: "medium", q: "რატომ დგას OR-ის ტრანზისტორები პარალელურად?" },
    ],
    answers: ["0, 1, 1, 1.", "ერთი ღია გზაც საკმარისია დენის გასატარებლად."],
  },
  "xor-gate": {
    tasks: [
      { level: "easy", q: "შეავსე XOR-ის ცხრილი: 00→? 01→? 10→? 11→?" },
      { level: "hard", q: "ჩაწერე XOR მხოლოდ AND, OR, NOT-ით." },
    ],
    answers: ["0, 1, 1, 0.", "XOR = (A AND NOT B) OR (NOT A AND B)."],
  },
  "half-adder": {
    tasks: [
      { level: "easy", q: "Half adder: A = 1, B = 1 → SUM = ? CARRY = ?" },
      { level: "medium", q: "რომელი კარიბჭე ქმნის SUM-ს და რომელი CARRY-ს?" },
    ],
    answers: ["SUM = 0, CARRY = 1.", "SUM = XOR, CARRY = AND."],
  },
  "full-adder": {
    tasks: [
      { level: "easy", q: "Full adder: A = 1, B = 0, Cin = 1 → SUM = ? CARRY = ?" },
      { level: "hard", q: "შეკრიბე 1011 + 0110 (ripple carry). შედეგი ათობითში?" },
    ],
    answers: ["SUM = 0, CARRY = 1.", "10001 = 17."],
  },
  memory: {
    tasks: [
      { level: "easy", q: "Write = 1, Data = 1 → Q = ? მერე Write = 0, Data = 0 → Q = ?" },
      { level: "hard", q: "რამდენი 1-ბიტიანი უჯრედი სჭირდება ერთ ბაიტს (8 ბიტი)?" },
    ],
    answers: ["Q = 1; მერე Q = 1 (ინახავს).", "8 უჯრედი."],
  },
  multibit: {
    tasks: [
      { level: "easy", q: "რამდენი Full Adder სჭირდება 8-ბიტიან შემკრებას? რამდენი ტრიგერი — 1 ბაიტ რეგისტრს?" },
      { level: "easy", q: "შეკრიბე ორობითში: 0101 + 0011. შედეგი?" },
      { level: "medium", q: "რას ნიშნავს ripple carry და რატომ სჭირდება მას ცოტა დრო?" },
      { level: "hard", q: "4-ბიტიან შემკრებში 1111 + 0001 — რა ხდება და რას ჰქვია ეს?" },
    ],
    answers: [
      "8 Full Adder; 8 ტრიგერი.",
      "1000 (= 8).",
      "CARRY ბიტ-ბიტ გადადის მარჯვნიდან მარცხნივ; საბოლოო შედეგი მზადაა ბოლო გადატანის ჩამოსვლის მერე.",
      "1111 + 0001 = 10000 — მე-5 ბიტი (Carry Out) გამოდის; 4 ბიტში რჩება 0000, გადატანა კი overflow-ია.",
    ],
  },
  alu: {
    tasks: [
      { level: "easy", q: "A = 6, B = 2: ADD = ? AND = ? OR = ? XOR = ? (ბიტურად)" },
      { level: "medium", q: "ვინ ირჩევს, რომელ ოპერაციას შეასრულებს ALU?" },
    ],
    answers: ["ADD = 8, AND = 2, OR = 6, XOR = 4.", "ინსტრუქციის ოპერაციის კოდი (სელექტორი)."],
  },
  cpu: {
    tasks: [
      { level: "easy", q: "დაასახელე CPU-ის სამი მთავარი ნაწილი და თითოს ფუნქცია." },
      { level: "medium", q: "დაასახელე ორი განსხვავება CPU-სა და Full Adder-ს შორის." },
    ],
    answers: [
      "რეგისტრები (ინახავენ), ALU (ითვლის), Output (შედეგი).",
      "მეხსიერება + მრავალი ოპერაცია + პროგრამირებადობა.",
    ],
  },
  program: {
    tasks: [
      { level: "easy", q: "დაალაგე სწორად: Execute, Fetch, Decode." },
      { level: "easy", q: "რას აკეთებს PC (program counter)?" },
      { level: "hard", q: "3 GHz CPU, 1 ტიკი თითო ინსტრუქციაზე — რამდენ ინსტრუქციას შეასრულებს წამში?" },
    ],
    answers: [
      "Fetch → Decode → Execute.",
      "მიუთითებს მიმდინარე ინსტრუქციაზე; ტიკზე გადადის შემდეგზე.",
      "3 მილიარდი.",
    ],
  },
  cache: {
    tasks: [
      { level: "easy", q: "რა არის cache hit და cache miss?" },
      { level: "easy", q: "დაალაგე სიჩქარით (სწრაფიდან ნელისკენ): RAM, L1, L3, L2." },
      { level: "medium", q: "L1 ≈ 4 ციკლი, RAM ≈ 200 — რამდენჯერ სწრაფია L1?" },
    ],
    answers: ["hit = ქეშშია (სწრაფი); miss = არაა, RAM-მდე ჩადის (ნელი).", "L1 → L2 → L3 → RAM.", "50-ჯერ."],
  },
  "extra-resources": {
    tasks: [
      { level: "easy", q: "გახსენი NandGame და გაიარე პირველი დონეები (NAND-იდან NOT, AND, OR)." },
      { level: "medium", q: "აირჩიე ერთი ვიდეო (Ben Eater ან Crash Course) და ერთი აბზაცით ჩამოწერე, რა ახალი გაიგე." },
      { level: "hard", q: "CircuitVerse-ში ან Logisim-ში ააწყვე half adder და შეამოწმე ჭეშმარიტების ცხრილით." },
    ],
  },
  recap: {
    tasks: [
      { level: "medium", q: "ერთი აბზაცით ახსენი მთელი ჯაჭვი: ელექტრონი → … → CPU." },
      { level: "hard", q: "დაწერე 3-ინსტრუქციანი პროგრამა, რომელიც ითვლის (2 + 3)-ს და შედეგს ინახავს. (ინსტრუქციების ნიმუში იხ. გაკვეთილი 13 „საათი და პროგრამა“.)" },
    ],
    answers: [
      "ელექტრონების მოძრაობა = დენი; დენით ვმართავთ ტრანზისტორს (ჩამრთველი); ტრანზისტორებისგან ვაწყობთ ლოგიკურ კარიბჭეებს (NOT/AND/OR/XOR); კარიბჭეებისგან — შემკრებს (Half/Full Adder); შემკრები + სხვა ოპერაციები ქმნიან ALU-ს; ALU + რეგისტრები + მართვა = CPU, რომელიც პროგრამის ინსტრუქციებს ტიკ-ტიკ ასრულებს.",
      "LOAD A, 2  →  ჩატვირთე 2 რეგისტრ A-ში;  LOAD B, 3  →  ჩატვირთე 3 რეგისტრ B-ში;  ADD A, B  →  შეკრიბე A და B, შედეგი (5) Output-ში. (იგივე მოდელი, რაც გაკვეთილ 13-ის სიმულაციაშია — მხოლოდ 5-ის ნაცვლად 2.)",
    ],
  },
};
