(function () {
  const L = window.jsLesson;

  L({
    id: "js-arrays", title: "მასივები", short: "მასივები",
    theory: "მასივი მნიშვნელობების დალაგებული სიაა: const ferebi = [\"წითელი\", \"ლურჯი\"]. თითო ელემენტს ინდექსი აქვს, ნულიდან დაწყებული. .length ელემენტების რაოდენობაა.",
    analogy: "დანომრილი უჯრების რიგი: პირველ უჯრას ნომერი 0 აქვს, არა 1.",
    label: "წვდომა",
    syntax: "ferebi[0] — პირველი; ferebi[ferebi.length - 1] — ბოლო (ან თანამედროვედ: ferebi.at(-1)). არარსებულ ინდექსზე მიმართვა შეცდომას არ იძლევა — უბრალოდ undefined-ს აბრუნებს, რაც გამართვას ართულებს.",
    challenge: "შექმენი 3-ელემენტიანი მასივი და ცვლადში bolo ჩაწერე მისი ბოლო ელემენტი.",
    starter: 'const ferebi = ["წითელი", "ლურჯი", "მწვანე"];\n\nconst bolo = ferebi[ferebi.length - 1];\n\nconsole.log(bolo, ferebi.length);',
    test: 'return bolo === "მწვანე" && ferebi.length === 3;',
    hint: "ბოლო ელემენტი: ferebi[ferebi.length - 1]",
    note: "const მასივი მაინც შეიძლება შეიცვალოს — const კრძალავს ცვლადის ხელახლა მინიჭებას, არა შიგთავსის ცვლილებას. ამიტომ push() მუშაობს, ხოლო ferebi = [] — არა.",
  });

  L({
    id: "js-array-methods", title: "მასივის მეთოდები — დამატება და წაშლა", short: "მასივის მეთოდები",
    theory: "push() ბოლოში ამატებს, pop() ბოლოს შლის, unshift() დასაწყისში ამატებს, shift() პირველს შლის. slice() ნაწილს აკოპირებს, splice() კი შუაშიც შლის და ამატებს.",
    analogy: "წყობა: ბოლოში დამატება და ბოლოდან აღება იაფია; დასაწყისში ჩარევა კი ყველა დანარჩენის გადაწევას ნიშნავს.",
    label: "მთავარი განსხვავება",
    syntax: "slice() ორიგინალს არ ცვლის — ახალ მასივს აბრუნებს. splice() ორიგინალს ცვლის. ეს განსხვავება კრიტიკულია: შემთხვევითი მუტაცია ერთ-ერთი ყველაზე ხშირი შეცდომაა.",
    challenge: "დაამატე მასივში ელემენტი ბოლოში და შექმენი ცვლადი pirveliori პირველი ორი ელემენტით.",
    starter: 'const sia = [1, 2, 3];\n\nsia.push(4);\nconst pirveliori = sia.slice(0, 2);\n\nconsole.log(sia, pirveliori);',
    test: 'return sia.length === 4 && pirveliori.length === 2 && pirveliori[0] === 1;',
    hint: "sia.push(4) და sia.slice(0, 2)",
    note: "მასივის ასლის გასაკეთებლად: [...sia] ან sia.slice(). უბრალო მინიჭება (const b = sia) ასლს არ ქმნის — ორივე ცვლადი ერთსა და იმავე მასივზე მიუთითებს.",
  });

  L({
    id: "js-map-filter", title: "map და filter", short: "map და filter",
    theory: "map() თითო ელემენტს გარდაქმნის და ახალ, იმავე სიგრძის მასივს აბრუნებს. filter() კი მხოლოდ იმ ელემენტებს ტოვებს, რომლებზეც პირობა ჭეშმარიტია.",
    analogy: "map — კონვეიერი, სადაც თითო ნივთს ეტიკეტს აწებებ; filter — საცერი, რომელშიც მხოლოდ საჭირო გადის.",
    label: "მთავარი",
    syntax: "ორივე ახალ მასივს აბრუნებს და ორიგინალს არ ცვლის — ამიტომ შედეგი ცვლადში უნდა შეინახო. მათი ჯაჭვად შეერთება შეიძლება: arr.filter(...).map(...).",
    challenge: "შექმენი ლუწი რიცხვების მასივი (luwebi) და ყველა რიცხვის ორმაგი (ormagi).",
    starter: 'const ricxvebi = [1, 2, 3, 4, 5, 6];\n\nconst luwebi = ricxvebi.filter(n => n % 2 === 0);\nconst ormagi = ricxvebi.map(n => n * 2);\n\nconsole.log(luwebi, ormagi);',
    test: 'return luwebi.length === 3 && luwebi[0] === 2 && ormagi[0] === 2 && ormagi.length === 6;',
    hint: "filter(n => n % 2 === 0) და map(n => n * 2)",
    note: "map ყოველთვის იმავე სიგრძის მასივს აბრუნებს, filter — უფრო მოკლეს ან იმავეს. თუ არაფრის დაბრუნება არ გჭირდება და უბრალოდ რაღაცას აკეთებ — forEach გამოიყენე.",
  });

  L({
    id: "js-reduce", title: "reduce", short: "reduce",
    theory: "reduce() მთელ მასივს ერთ მნიშვნელობამდე „აგროვებს“: ჯამი, მაქსიმუმი, ობიექტი. ორი არგუმენტი აქვს: ფუნქცია (დაგროვილი, მიმდინარე) და საწყისი მნიშვნელობა.",
    analogy: "თოვლის გუნდა, რომელიც გორავს და თან იკრებს — თითო ნაბიჯზე უკვე დაგროვილს ახალს უმატებ.",
    label: "საწყისი მნიშვნელობა",
    syntax: "საწყისი მნიშვნელობა ყოველთვის მიუთითე — arr.reduce((jami, n) => jami + n, 0). მის გარეშე ცარიელი მასივი შეცდომას იძლევა, ტიპებიც შეიძლება აირიოს.",
    challenge: "დაითვალე მასივის ჯამი reduce-ით და ჩაწერე ცვლადში jami.",
    starter: 'const ricxvebi = [10, 20, 30, 40];\n\nconst jami = ricxvebi.reduce((dagrovili, mimdinare) => dagrovili + mimdinare, 0);\n\nconsole.log(jami);',
    test: 'return jami === 100;',
    hint: "reduce((a, b) => a + b, 0)",
    note: "reduce-ით ობიექტის აგებაც შეიძლება — მაგალითად დათვლა: სიტყვების სიიდან „რომელი რამდენჯერ გვხვდება“. ის ყველაზე მოქნილი, მაგრამ ყველაზე რთულად წასაკითხი მეთოდია — მარტივ შემთხვევებში map/filter აჯობებს.",
  });

  L({
    id: "js-find", title: "find, some, every, includes", short: "ძებნა მასივში",
    theory: "find() პირველ დამთხვევას აბრუნებს (ან undefined). findIndex() — მის ინდექსს. some() ამბობს, არსებობს თუ არა ერთი მაინც. every() — ყველა აკმაყოფილებს თუ არა. includes() უბრალოდ ამოწმებს, არის თუ არა მნიშვნელობა მასივში.",
    analogy: "find — „მომძებნე ის ერთი“; some — „არის ვინმე?“; every — „ყველა მზადაა?“.",
    label: "შედეგის ტიპი",
    syntax: "find ელემენტს აბრუნებს, filter — მასივს. თუ ერთი გჭირდება, find გამოიყენე. some/every ყოველთვის true/false-ს აბრუნებს და პირველივე გადამწყვეტ ელემენტზე ჩერდება.",
    challenge: "იპოვე პირველი რიცხვი 10-ზე მეტი (napovni) და შეამოწმე, არის თუ არა ყველა დადებითი (yvelaDadebiti).",
    starter: 'const ricxvebi = [3, 8, 15, 22];\n\nconst napovni = ricxvebi.find(n => n > 10);\nconst yvelaDadebiti = ricxvebi.every(n => n > 0);\n\nconsole.log(napovni, yvelaDadebiti);',
    test: 'return napovni === 15 && yvelaDadebiti === true;',
    hint: "find(n => n > 10) და every(n => n > 0)",
    note: "includes() მარტივი მნიშვნელობებისთვისაა (რიცხვი, ტექსტი). ობიექტების მასივში ძებნისთვის find გამოიყენე: users.find(u => u.id === 5).",
  });

  L({
    id: "js-sort", title: "sort", short: "sort",
    theory: "sort() მასივს ალაგებს — მაგრამ ნაგულისხმევად ელემენტებს ტექსტად თვლის, ამიტომ რიცხვები არასწორად ლაგდება. სწორად დასალაგებლად შესადარებელი ფუნქცია სჭირდება.",
    analogy: "ანბანური დალაგება რიცხვებზე: „10“ „9“-ზე ადრე მოდის, რადგან პირველი სიმბოლო „1“ არის — ზუსტად ეს ხდება sort-ის გარეშე.",
    label: "სწორი ჩაწერა",
    syntax: "ზრდადობით: arr.sort((a, b) => a - b). კლებადობით: (a, b) => b - a. ტექსტისთვის: arr.sort((a, b) => a.localeCompare(b)). ყურადღება: sort() ორიგინალს ცვლის — თუ არ გინდა, ჯერ ასლი აიღე: [...arr].sort(...).",
    challenge: "დაალაგე რიცხვები ზრდადობით და ჩაწერე ცვლადში dalagebuli.",
    starter: 'const ricxvebi = [25, 3, 100, 7];\n\nconst dalagebuli = [...ricxvebi].sort((a, b) => a - b);\n\nconsole.log(dalagebuli);\nconsole.log([25, 3, 100, 7].sort());',
    test: 'return dalagebuli[0] === 3 && dalagebuli[3] === 100;',
    hint: "sort((a, b) => a - b)",
    note: "გაუშვი კოდი და შეადარე ორი შედეგი — მეორე სტრიქონი აჩვენებს, რას აკეთებს sort() შესადარებელი ფუნქციის გარეშე: [100, 25, 3, 7]. სწორედ ამიტომ არასდროს დაივიწყო (a, b) => a - b.",
  });

  L({
    id: "js-objects", title: "ობიექტები", short: "ობიექტები",
    theory: "ობიექტი მონაცემებს სახელებით ინახავს: const user = { name: \"ანა\", age: 25 }. თითო წყვილი თვისებაა (გასაღები: მნიშვნელობა). წვდომა: user.name ან user[\"name\"].",
    analogy: "პასპორტი: მასივში „მესამე ველი“ იქნებოდა, ობიექტში კი პირდაპირ „გვარი“ — გაცილებით გასაგები.",
    label: "წერტილი თუ ფრჩხილი",
    syntax: "წერტილი მაშინ, როცა სახელი წინასწარ იცი: user.name. კვადრატული ფრჩხილი — როცა სახელი ცვლადშია: user[field]. თვისების დამატება/წაშლა ნებისმიერ დროს შეიძლება: user.city = \"თბილისი\"; delete user.age.",
    challenge: "შექმენი ობიექტი მინიმუმ ორი თვისებით და ჩაწერე ცვლადში saxeli მისი name თვისება.",
    starter: 'const user = {\n  name: "ანა",\n  age: 25,\n  city: "თბილისი"\n};\n\nconst saxeli = user.name;\n\nconsole.log(saxeli, user.age);',
    test: 'return typeof user === "object" && saxeli === user.name && Object.keys(user).length >= 2;',
    hint: "user.name",
    note: "არარსებულ თვისებაზე მიმართვა undefined-ს აბრუნებს. ღრმად ჩალაგებულთან უსაფრთხოდ მუშაობისთვის გამოიყენე ?. — user?.address?.city არ ჩავარდება, თუ address არ არსებობს.",
  });

  L({
    id: "js-object-methods", title: "ობიექტების ჩალაგება და მეთოდები", short: "ობიექტის მეთოდები",
    theory: "ობიექტში შეიძლება იყოს სხვა ობიექტი, მასივი ან ფუნქცია. ობიექტში ჩაწერილ ფუნქციას მეთოდი ჰქვია და მას ობიექტის საკუთარ თვისებებზე წვდომა აქვს this-ით.",
    analogy: "ობიექტი მხოლოდ მონაცემები არაა — ის ერთდროულად „რა არის“ და „რა შეუძლია“.",
    label: "მოკლე ჩაწერა",
    syntax: "მეთოდი მოკლედ იწერება: { greet() { … } } ნაცვლად { greet: function() { … } }. ჩალაგებულ მონაცემებთან წვდომა ჯაჭვურია: user.address.city ან user.hobbies[0].",
    challenge: "დაამატე ობიექტს მეთოდი greet, რომელიც აბრუნებს მისალმებას სახელით.",
    starter: 'const user = {\n  name: "გიორგი",\n  hobbies: ["კითხვა", "ცურვა"],\n  greet() {\n    return `გამარჯობა, ${this.name}!`;\n  }\n};\n\nconsole.log(user.greet());\nconsole.log(user.hobbies[0]);',
    test: 'return typeof user.greet === "function" && user.greet().includes(user.name);',
    hint: "greet() { return `გამარჯობა, ${this.name}!`; }",
    note: "მეთოდში this ობიექტს მიუთითებს. ყურადღება: ისრიან ფუნქციას საკუთარი this არ აქვს, ამიტომ მეთოდად ის არ გამოდგება — გამოიყენე ჩვეულებრივი ჩაწერა.",
  });

  L({
    id: "js-functions", title: "ფუნქციები", short: "ფუნქციები",
    theory: "ფუნქცია კოდის მრავალჯერ გამოსაყენებელი ბლოკია. მას შეიძლება ჰქონდეს პარამეტრები (შესასვლელი) და დააბრუნოს შედეგი return-ით. ფუნქცია გამოძახებამდე არაფერს აკეთებს.",
    analogy: "რეცეპტი: ერთხელ წერ, მერე ნებისმიერი პროდუქტით ასრულებ. პარამეტრები ინგრედიენტებია, return — მზა კერძი.",
    label: "return",
    syntax: "return-ის გარეშე ფუნქცია undefined-ს აბრუნებს. return ასევე დაუყოვნებლივ წყვეტს ფუნქციას — მის შემდეგ დაწერილი კოდი აღარ შესრულდება. ერთი ფუნქცია ერთ საქმეს უნდა აკეთებდეს.",
    challenge: "დაწერე ფუნქცია kvadrati, რომელიც რიცხვს კვადრატში აჰყავს.",
    starter: 'function kvadrati(n) {\n  return n * n;\n}\n\nconsole.log(kvadrati(5));\nconsole.log(kvadrati(9));',
    test: 'return typeof kvadrati === "function" && kvadrati(5) === 25 && kvadrati(9) === 81;',
    hint: "function kvadrati(n) { return n * n; }",
    note: "ფუნქციის სახელი ზმნით დაიწყე: calculateTotal, getUser, isValid — სახელიდანვე უნდა ჩანდეს, რას აკეთებს.",
  });

  L({
    id: "js-arrow", title: "ისრიანი ფუნქციები", short: "arrow",
    theory: "ისრიანი ფუნქცია მოკლე ჩაწერაა: const kvadrati = n => n * n. თუ სხეული ერთი გამოსახულებაა, ფიგურული ფრჩხილები და return არ სჭირდება.",
    analogy: "იგივე რეცეპტი, მოკლედ ჩაწერილი — შინაარსი იგივეა, ფორმა ლაკონიური.",
    label: "განსხვავება",
    syntax: "ერთი პარამეტრი — ფრჩხილები არჩევითია: n => n * n. ორი — სავალდებულოა: (a, b) => a + b. სხეული ბლოკია — return აუცილებელია. მთავარი ტექნიკური განსხვავება: ისრიან ფუნქციას საკუთარი this არ აქვს, ის გარემოდან იღებს.",
    challenge: "გადაწერე ფუნქცია ისრიანად — jami უნდა კრებდეს ორ რიცხვს.",
    starter: 'const jami = (a, b) => a + b;\n\nconsole.log(jami(3, 4));',
    test: 'return typeof jami === "function" && jami(3, 4) === 7 && jami(10, 5) === 15;',
    hint: "const jami = (a, b) => a + b;",
    note: "ისრიანი ფუნქციები განსაკუთრებით მოსახერხებელია map/filter-ში: arr.map(n => n * 2) ბევრად უფრო წაკითხვადია, ვიდრე სრული function ჩაწერა.",
  });

  L({
    id: "js-params", title: "ნაგულისხმევი პარამეტრები და rest", short: "პარამეტრები",
    theory: "პარამეტრს ნაგულისხმევი მნიშვნელობა შეიძლება მიეცეს: function greet(name = \"სტუმარო\"). rest პარამეტრი (...args) კი ყველა დარჩენილ არგუმენტს მასივად აგროვებს.",
    analogy: "ნაგულისხმევი — „თუ არ მითხრი, რა ზომის ყავა გინდა, საშუალოს დაგისხამ“. rest — „დანარჩენი ყველაფერი ერთ პაკეტში ჩამიწყვე“.",
    label: "წესი",
    syntax: "rest ყოველთვის ბოლო პარამეტრია: function sum(first, ...rest). ნაგულისხმევი მნიშვნელობა მხოლოდ მაშინ ჩაირთვება, როცა არგუმენტი undefined-ია (null არ ჩაითვლება).",
    challenge: "დაწერე ფუნქცია jami, რომელიც ნებისმიერი რაოდენობის რიცხვს კრებს (...rest).",
    starter: 'function jami(...ricxvebi) {\n  return ricxvebi.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(jami(1, 2, 3));\nconsole.log(jami(10, 20, 30, 40));',
    test: 'return jami(1, 2, 3) === 6 && jami(10, 20, 30, 40) === 100 && jami() === 0;',
    hint: "function jami(...ricxvebi) { return ricxvebi.reduce((a, b) => a + b, 0); }",
    note: "rest-ის წყალობით ფუნქცია ნებისმიერ რაოდენობა არგუმენტს იღებს და ცარიელ გამოძახებაზეც (jami()) სწორად მუშაობს — reduce-ის საწყისი 0-ის წყალობით.",
  });

  L({
    id: "js-spread", title: "spread ოპერატორი", short: "spread",
    theory: "spread (...) მასივს ან ობიექტს „შლის“ ცალკეულ ელემენტებად. მისი მთავარი გამოყენებაა კოპირება და გაერთიანება ორიგინალის შეცვლის გარეშე.",
    analogy: "ყუთის შიგთავსის მაგიდაზე გადმოყრა, რომ ახალ ყუთში სხვა ნივთებთან ერთად ჩააწყო.",
    label: "rest თუ spread",
    syntax: "ერთი და იგივე სამი წერტილი ორ როლს თამაშობს: ფუნქციის პარამეტრებში ის აგროვებს (rest), სხვაგან — შლის (spread). ასლი: [...arr] და { ...obj }. გაერთიანება: [...a, ...b].",
    challenge: "გააერთიანე ორი მასივი spread-ით და შექმენი ობიექტის ასლი დამატებული თვისებით.",
    starter: 'const a = [1, 2];\nconst b = [3, 4];\nconst gaertianebuli = [...a, ...b];\n\nconst user = { name: "ნინო" };\nconst axali = { ...user, age: 30 };\n\nconsole.log(gaertianebuli, axali);',
    test: 'return gaertianebuli.length === 4 && gaertianebuli[3] === 4 && axali.name === "ნინო" && axali.age === 30;',
    hint: "[...a, ...b] და { ...user, age: 30 }",
    note: "spread ზედაპირულ ასლს აკეთებს: ჩალაგებული ობიექტები მაინც საერთო რჩება. ღრმა ასლისთვის გამოიყენე structuredClone(obj).",
  });
})();
