(function () {
  const T = window.tsLesson;

  T({
    id: "ts-intro", title: "რა არის TypeScript", short: "რა არის TS",
    theory: "TypeScript არის JavaScript ტიპებით. ის JS-ის ზედნაშენია: ყველა სწორი JS ერთდროულად სწორი TS-იცაა. ბრაუზერი TS-ს პირდაპირ ვერ ასრულებს — ის ჯერ JavaScript-ად ითარგმნება (კომპილაცია), ტიპები კი ამ დროს ქრება.",
    analogy: "ტიპები მშენებლობის ნახაზზე გაკეთებული შენიშვნებია: „ეს კედელი მზიდია“. აშენებულ სახლში ისინი აღარაა, მაგრამ შეცდომას მშენებლობამდე იჭერენ.",
    label: "რას გვაძლევს",
    syntax: "შეცდომას პროგრამის გაშვებამდე პოულობს; რედაქტორს ავტომატური შევსება და ზუსტი მინიშნებები აქვს; დიდ პროექტში რეფაქტორინგი უსაფრთხო ხდება. ფასი — დამატებითი ნაბიჯი (კომპილაცია) და ცოტა მეტი კოდი.",
    challenge: "გამოაცხადე ცვლადი ტიპით და დაბეჭდე.",
    starter: 'const sayeli: string = "ელენე";\nconst asaki: number = 20;\n\nconsole.log(sayeli, asaki);',
    test: 'return /:\\s*string/.test(__src) && /:\\s*number/.test(__src) && typeof sayeli === "string";',
    hint: "დაწერე ორივე ანოტაცია: : string და : number.",
    note: "TypeScript-ს Microsoft-მა შექმნა 2012 წელს. დღეს მას იყენებს Angular, Next.js, VS Code და მსოფლიოს დიდი პროექტების უმეტესობა — რადგან დიდ კოდში ტიპები შეცდომების ნახევარს წინასწარ იჭერს.",
  });

  T({
    id: "ts-basic-types", title: "ძირითადი ტიპები", short: "ძირითადი ტიპები",
    theory: "ძირითადი ტიპებია: string, number, boolean, null, undefined. ანოტაცია ორწერტილის შემდეგ იწერება: let asaki: number = 25.",
    analogy: "ყუთზე მიწებებული ეტიკეტი: „მხოლოდ რიცხვები“. სხვას ვერაფერს ჩადებ.",
    label: "მთავარი",
    syntax: "TypeScript-ს ერთი რიცხვითი ტიპი აქვს — number (მთელიც და წილადიც). არსებობს bigint ძალიან დიდი მთელებისთვის და symbol უნიკალური გასაღებებისთვის. ტიპის სახელი პატარა ასოთი იწერება: string, არა String.",
    challenge: "გამოაცხადე სამი ცვლადი: string, number და boolean.",
    starter: 'const saxeli: string = "ლუკა";\nconst qula: number = 92;\nconst gaiara: boolean = true;\n\nconsole.log(saxeli, qula, gaiara);',
    test: 'return /:\\s*string/.test(__src) && /:\\s*number/.test(__src) && /:\\s*boolean/.test(__src) && gaiara === true;',
    hint: "სამივე ანოტაცია დაწერე: string, number, boolean.",
    note: "String (დიდი ასოთი) სხვა რამეა — ის ობიექტ-გარსია და პრაქტიკაში არ გამოიყენება. ყოველთვის პატარა ასოთი დაწერე.",
  });

  T({
    id: "ts-inference", title: "ტიპის დასკვნა (inference)", short: "დასკვნა",
    theory: "TypeScript ხშირად თავად ხვდება ტიპს — ანოტაცია არ არის სავალდებულო. const saxeli = \"ანა\" ავტომატურად string-ია.",
    analogy: "არ გჭირდება თქმა „ეს ვაშლია“, როცა ხელში ვაშლი გიჭირავს — ეს ისედაც ჩანს.",
    label: "როდის დავწეროთ ანოტაცია",
    syntax: "დაწერე მაშინ, როცა: ცვლადი ჯერ ცარიელია (let x: string), ფუნქციის პარამეტრებში (აქ დასკვნა არ მუშაობს) და საჯარო API-ს დაბრუნებულ ტიპში. სხვაგან ზედმეტი ანოტაცია მხოლოდ ხმაურია.",
    challenge: "დაწერე ორი ცვლადი ანოტაციის გარეშე და ერთი ფუნქცია პარამეტრის ტიპით.",
    starter: '// ტიპი თავად დაისკვნება\nconst qalaqi = "თბილისი";\nconst wlebi = 12;\n\n// პარამეტრს კი ანოტაცია სჭირდება\nfunction ormagi(n: number) {\n  return n * 2;\n}\n\nconsole.log(qalaqi, wlebi, ormagi(21));',
    test: 'return ormagi(21) === 42 && /function\\s+ormagi\\s*\\(\\s*n\\s*:\\s*number/.test(__src);',
    hint: "პარამეტრს დაწერე ტიპი: function ormagi(n: number)",
    note: "პარამეტრზე ანოტაციის გარეშე TypeScript მას any-დ თვლის (თუ strict რეჟიმი ჩართულია — შეცდომას იძლევა). ამიტომ პარამეტრები თითქმის ყოველთვის ანოტირებულია.",
  });

  T({
    id: "ts-any-unknown", title: "any, unknown, never", short: "any და unknown",
    theory: "any ტიპის შემოწმებას მთლიანად თიშავს — ეს TS-ის „გასაქცევი კარია“. unknown უსაფრთხო ალტერნატივაა: მნიშვნელობა ნებისმიერი შეიძლება იყოს, მაგრამ გამოყენებამდე ტიპი უნდა შეამოწმო. never ნიშნავს „ასეთი მნიშვნელობა არ არსებობს“.",
    analogy: "any — გაუხსნელი ყუთი, რომელსაც უყოყმანოდ ენდობი. unknown — იგივე ყუთი, ოღონდ ჯერ უნდა გახსნა და ნახო, რა დევს.",
    label: "წესი",
    syntax: "any-ს მაქსიმალურად გაურბოდე — მისით TypeScript აზრს კარგავს. თუ ტიპი ნამდვილად უცნობია (მაგ. სერვერიდან მოსული JSON), დაწერე unknown და შემდეგ შეამოწმე typeof-ით. never ჩნდება მაშინ, როცა ფუნქცია არასდროს ბრუნდება (ყოველთვის აგდებს შეცდომას).",
    challenge: "გამოიყენე unknown და typeof შემოწმებით ამოიღე სიგრძე.",
    starter: 'function sigrdze(v: unknown): number {\n  if (typeof v === "string") {\n    return v.length;\n  }\n  return 0;\n}\n\nconsole.log(sigrdze("გამარჯობა"), sigrdze(42));',
    test: 'return /:\\s*unknown/.test(__src) && sigrdze("abcd") === 4 && sigrdze(1) === 0;',
    hint: "პარამეტრს დაწერე : unknown და შიგნით შეამოწმე typeof v === \"string\".",
    note: "unknown-თან პირდაპირ ვერაფერს გააკეთებ — ვერც .length-ს წაიკითხავ. სწორედ ეს გაიძულებს შემოწმებას და ეს კარგია. any-სთან TypeScript გაჩუმდება და შეცდომა გაშვებისას გამოვა.",
  });

  T({
    id: "ts-arrays", title: "მასივები და კორტეჟები", short: "მასივები",
    theory: "მასივის ტიპი ორნაირად იწერება: number[] ან Array<number>. კორტეჟი (tuple) ფიქსირებული სიგრძისა და ტიპების მასივია: [string, number].",
    analogy: "მასივი — ერთგვაროვანი ყუთების რიგი; კორტეჟი — კონკრეტული ფორმა, სადაც პირველი უჯრა ტექსტისაა, მეორე რიცხვის.",
    label: "პრაქტიკა",
    syntax: "number[] უფრო გავრცელებულია. კორტეჟი გამოსადეგია, როცა ფუნქცია რამდენიმე მნიშვნელობას აბრუნებს: function get(): [string, number]. readonly-თი მასივს დაცულს ხდი: readonly number[].",
    challenge: "შექმენი number[] მასივი და ერთი კორტეჟი [string, number].",
    starter: 'const qulebi: number[] = [90, 85, 78];\nconst studenti: [string, number] = ["ნატალი", 92];\n\nconsole.log(qulebi.length, studenti[0], studenti[1]);',
    test: 'return /number\\[\\]/.test(__src) && /\\[\\s*string\\s*,\\s*number\\s*\\]/.test(__src) && qulebi.length === 3 && studenti[1] === 92;',
    hint: "დაწერე : number[] და : [string, number].",
    note: "კორტეჟში რიგს მნიშვნელობა აქვს: [string, number] და [number, string] სხვადასხვა ტიპია. React-ის useState სწორედ კორტეჟს აბრუნებს: [მნიშვნელობა, დამყენებელი].",
  });

  T({
    id: "ts-objects", title: "ობიექტის ტიპები", short: "ობიექტები",
    theory: "ობიექტის ფორმა პირდაპირ შეიძლება აღწერო: let user: { name: string; age: number }. TypeScript შეამოწმებს, რომ ყველა თვისება იყოს და ტიპებიც ემთხვეოდეს.",
    analogy: "ბლანკი, სადაც წერია რომელი გრაფა უნდა შეივსოს და რა სახის მონაცემით.",
    label: "მკაცრი შემოწმება",
    syntax: "ზედმეტი თვისების პირდაპირ ჩაწერა შეცდომაა — TypeScript ასე ბეჭდვის შეცდომებს იჭერს. თვისებები წერტილმძიმით ან მძიმით იყოფა. ჩალაგებული ობიექტიც შეიძლება: { address: { city: string } }.",
    challenge: "აღწერე ობიექტის ტიპი სამი თვისებით და შექმენი მისი შესაბამისი ობიექტი.",
    starter: 'const user: { name: string; age: number; active: boolean } = {\n  name: "დავითი",\n  age: 34,\n  active: true\n};\n\nconsole.log(user.name, user.age, user.active);',
    test: 'return /\\{\\s*name\\s*:\\s*string/.test(__src) && user.name === "დავითი" && user.active === true;',
    hint: "დაწერე ტიპი: { name: string; age: number; active: boolean }",
    note: "ასეთი ჩაწერა მალე გრძელი ხდება — სწორედ ამიტომ არსებობს interface და type, რომლებსაც შემდეგ გაკვეთილებში გავეცნობით.",
  });

  T({
    id: "ts-interface", title: "interface", short: "interface",
    theory: "interface ობიექტის ფორმას ასახელებს და მრავალჯერ გამოსაყენებელს ხდის. მას შეუძლია სხვა interface-ის გაფართოებაც extends-ით.",
    analogy: "ხელშეკრულების შაბლონი: ერთხელ ადგენ და მერე ყველა კონკრეტულ შემთხვევაში იყენებ.",
    label: "თვისებები",
    syntax: "interface-ის სახელი ჩვეულებრივ დიდი ასოთი იწერება: User, Product. მას შეიძლება მეთოდებიც ჰქონდეს: greet(): string. ერთი interface რამდენჯერმე თუ გამოაცხადე, TypeScript მათ აერთიანებს (declaration merging) — ეს ბიბლიოთეკების გაფართოებისთვისაა.",
    challenge: "შექმენი interface User და მისგან წარმოებული ობიექტი.",
    starter: 'interface User {\n  name: string;\n  age: number;\n}\n\nconst u: User = { name: "მარიამ", age: 27 };\n\nfunction gamarjoba(x: User): string {\n  return "გამარჯობა, " + x.name;\n}\n\nconsole.log(gamarjoba(u));',
    test: 'return /interface\\s+User/.test(__src) && gamarjoba({ name: "ტესტი", age: 1 }).includes("ტესტი");',
    hint: "interface User { name: string; age: number; }",
    note: "extends-ით გაფართოება: interface Admin extends User { role: string } — Admin-ს ავტომატურად ექნება name და age.",
  });

  T({
    id: "ts-type-alias", title: "type ალიასი", short: "type",
    theory: "type ნებისმიერ ტიპს ასახელებს — არა მხოლოდ ობიექტს, არამედ გაერთიანებას, კორტეჟს, პრიმიტივსაც: type ID = string | number.",
    analogy: "მეტსახელი: გრძელი აღწერის ნაცვლად ერთ სიტყვას ეძახი.",
    label: "შესაძლებლობები",
    syntax: "type Point = { x: number; y: number }; type Status = \"on\" | \"off\"; type Pair = [string, number]. სწორედ გაერთიანებებისა და პრიმიტივების დასახელება არის ის, რაც interface-ს არ შეუძლია.",
    challenge: "შექმენი type ალიასი ობიექტისთვის და ერთი გაერთიანებისთვის.",
    starter: 'type Wertili = { x: number; y: number };\ntype Status = "active" | "inactive";\n\nconst p: Wertili = { x: 3, y: 7 };\nconst s: Status = "active";\n\nconsole.log(p.x + p.y, s);',
    test: 'return /type\\s+Wertili/.test(__src) && /type\\s+Status/.test(__src) && p.x + p.y === 10 && s === "active";',
    hint: 'type Wertili = { x: number; y: number }; და type Status = "active" | "inactive";',
    note: "type-ის შემდეგ წერტილმძიმე აუცილებელია — ეს გამოსახულებაა, არა ბლოკი. ხშირი შეცდომაა მისი დავიწყება.",
  });

  T({
    id: "ts-interface-vs-type", title: "interface თუ type?", short: "interface vs type",
    theory: "ორივე ობიექტის ფორმას აღწერს და პრაქტიკაში თითქმის ურთიერთშენაცვლებადია. განსხვავება: interface-ს შეუძლია გაერთიანება ხელახალი გამოცხადებით, type-ს კი შეუძლია პრიმიტივების, გაერთიანებებისა და კორტეჟების დასახელება.",
    analogy: "ორი ხელსაწყო, რომლებიც 90%-ში ერთსა და იმავეს აკეთებს — არჩევანი ხშირად გუნდის შეთანხმებაზეა.",
    label: "პრაქტიკული წესი",
    syntax: "გავრცელებული მიდგომა: ობიექტებისა და კლასების კონტრაქტებისთვის — interface; გაერთიანებების, კორტეჟებისა და რთული ტიპებისთვის — type. მთავარია, პროექტში თანმიმდევრული იყო.",
    challenge: "აღწერე ერთი და იგივე ფორმა ორივენაირად და გამოიყენე ორივე.",
    starter: 'interface UserI { name: string }\ntype UserT = { name: string };\n\nconst a: UserI = { name: "ა" };\nconst b: UserT = { name: "ბ" };\n\nconsole.log(a.name, b.name);',
    test: 'return /interface\\s+UserI/.test(__src) && /type\\s+UserT/.test(__src) && a.name === "ა" && b.name === "ბ";',
    hint: "დაწერე ორივე: interface UserI და type UserT.",
    note: "type-ის გაფართოება კვეთით ხდება: type Admin = User & { role: string }. interface-ისა კი extends-ით. შედეგი ძალიან ჰგავს ერთმანეთს.",
  });

  T({
    id: "ts-optional", title: "არჩევითი და readonly თვისებები", short: "optional/readonly",
    theory: "კითხვის ნიშანი თვისებას არჩევითს ხდის: age?: number. readonly კი კრძალავს შეცვლას შექმნის შემდეგ.",
    analogy: "ანკეტაში ვარსკვლავიანი გრაფა სავალდებულოა, უვარსკვლავო — არჩევითი. readonly კი ბეჭდით დამოწმებული ველია, რომელსაც ვეღარ გადაასწორებ.",
    label: "მნიშვნელოვანი",
    syntax: "არჩევითი თვისების ტიპია „ტიპი | undefined“ — ამიტომ გამოყენებამდე შემოწმება სჭირდება, ან ?. და ?? გამოიყენე. readonly მხოლოდ კომპილაციისას მოქმედებს — გაშვებისას ის აღარ არსებობს.",
    challenge: "შექმენი interface არჩევითი და readonly თვისებებით.",
    starter: 'interface Product {\n  readonly id: number;\n  name: string;\n  fasi?: number;\n}\n\nconst p: Product = { id: 1, name: "წიგნი" };\n\nconsole.log(p.name, p.fasi ?? "ფასი უცნობია");',
    test: 'return /readonly\\s+id/.test(__src) && /fasi\\s*\\?\\s*:/.test(__src) && p.id === 1;',
    hint: "readonly id: number; და fasi?: number;",
    note: "მასივის დასაცავად: readonly number[] — მასზე push აღარ იმუშავებს. ეს შემთხვევითი ცვლილებებისგან იცავს.",
  });

  T({
    id: "ts-union", title: "გაერთიანების ტიპები (union)", short: "union",
    theory: "გაერთიანება ამბობს „ან ეს, ან ის“: let id: string | number. მნიშვნელობა ერთ-ერთი ჩამოთვლილთაგანი უნდა იყოს.",
    analogy: "ბილეთი, რომელიც ან ქაღალდზეა, ან ტელეფონში — ორივე ვარიანტი მისაღებია, მესამე არა.",
    label: "მთავარი შედეგი",
    syntax: "გაერთიანებაზე პირდაპირ მხოლოდ იმ მეთოდებს გამოიყენებ, რომლებიც ორივე ტიპს აქვს. კონკრეტულ მეთოდამდე მისასვლელად ტიპი უნდა დაავიწროვო (შემდეგი გაკვეთილი).",
    challenge: "შექმენი ფუნქცია, რომელიც string | number-ს იღებს და ორივე შემთხვევაში მუშაობს.",
    starter: 'function achvene(id: string | number): string {\n  return "ID: " + id;\n}\n\nconsole.log(achvene("abc"), achvene(42));',
    test: 'return /string\\s*\\|\\s*number/.test(__src) && achvene(42) === "ID: 42";',
    hint: "პარამეტრს დაწერე ტიპი: id: string | number",
    note: "გაერთიანება TypeScript-ის ერთ-ერთი ყველაზე ძლიერი შესაძლებლობაა — ის რეალურ ცხოვრებას ზუსტად აღწერს, სადაც მნიშვნელობა ხშირად რამდენიმე სახისაა.",
  });

  T({
    id: "ts-literal", title: "ლიტერალური ტიპები", short: "literal types",
    theory: "ტიპი შეიძლება იყოს კონკრეტული მნიშვნელობა და არა მთელი კატეგორია: let status: \"on\" | \"off\". მაშინ სხვა ტექსტი დაუშვებელია.",
    analogy: "მენიუ, სადაც მხოლოდ სამი კერძია — მეოთხეს ვერ შეუკვეთავ.",
    label: "სად გამოვიყენოთ",
    syntax: "ლიტერალები გაერთიანებასთან ერთად enum-ის მსუბუქ ალტერნატივას ქმნის: type Zoma = \"S\" | \"M\" | \"L\". ეს ბევრად უსაფრთხოა, ვიდრე უბრალო string, რადგან რედაქტორი ვარიანტებსაც შემოგთავაზებს.",
    challenge: "შექმენი ლიტერალური გაერთიანება და ფუნქცია, რომელიც მას იღებს.",
    starter: 'type Zoma = "S" | "M" | "L";\n\nfunction fasi(z: Zoma): number {\n  if (z === "S") return 10;\n  if (z === "M") return 15;\n  return 20;\n}\n\nconsole.log(fasi("S"), fasi("L"));',
    test: 'return /"S"\\s*\\|\\s*"M"\\s*\\|\\s*"L"/.test(__src) && fasi("S") === 10 && fasi("L") === 20;',
    hint: 'type Zoma = "S" | "M" | "L";',
    note: "ეს ხერხი ბეჭდვის შეცდომებს სრულად კლავს: fasi(\"s\") პატარა ასოთი კომპილაციისას შეცდომა იქნება, მაშინ როცა ჩვეულებრივ string-თან ის შეუმჩნეველი დარჩებოდა.",
  });

  T({
    id: "ts-intersection", title: "კვეთა (intersection)", short: "intersection",
    theory: "კვეთა ორ ტიპს აერთებს ერთში: type Admin = User & { role: string }. შედეგს ორივეს თვისებები აქვს.",
    analogy: "გაერთიანება — „ან ეს, ან ის“; კვეთა — „ესეც და ისიც ერთდროულად“.",
    label: "გახსოვდეს",
    syntax: "& ნიშნავს „ორივეს თვისებები ერთად“, | კი „ერთ-ერთი“. ეს ხშირად ერევათ. კვეთა type-ისთვისაა; interface-ში იგივეს extends აკეთებს.",
    challenge: "შექმენი კვეთა ორი ტიპისგან და გამოიყენე.",
    starter: 'type Adamiani = { saxeli: string };\ntype Tanamshromeli = Adamiani & { tanamdeboba: string };\n\nconst t: Tanamshromeli = { saxeli: "ნინო", tanamdeboba: "დეველოპერი" };\n\nconsole.log(t.saxeli, t.tanamdeboba);',
    test: 'return /Adamiani\\s*&/.test(__src) && t.saxeli === "ნინო" && t.tanamdeboba === "დეველოპერი";',
    hint: "type Tanamshromeli = Adamiani & { tanamdeboba: string };",
    note: "თუ ორ ტიპს ერთი და იგივე თვისება სხვადასხვა ტიპით აქვს, კვეთა never-ს იძლევა — ანუ ასეთი ობიექტი ვერ იარსებებს.",
  });

  T({
    id: "ts-functions", title: "ფუნქციის ტიპები", short: "ფუნქციები",
    theory: "ფუნქციას ორივე მხარეს აქვს ტიპი: პარამეტრები და დაბრუნებული მნიშვნელობა — function jami(a: number, b: number): number.",
    analogy: "მოწყობილობის ტექნიკური პასპორტი: რა შედის და რა გამოდის.",
    label: "დეტალები",
    syntax: "დაბრუნებული ტიპი ხშირად თავად დაისკვნება და მისი დაწერა არჩევითია — მაგრამ საჯარო ფუნქციებზე მისი მითითება კარგი ჩვევაა. თუ ფუნქცია არაფერს აბრუნებს, ტიპია void.",
    challenge: "დაწერე ფუნქცია ორივე მხარეს ანოტაციით და ერთი void ფუნქცია.",
    starter: 'function jami(a: number, b: number): number {\n  return a + b;\n}\n\nfunction dabechda(t: string): void {\n  console.log("ტექსტი:", t);\n}\n\nconsole.log(jami(4, 6));\ndabechda("გამარჯობა");',
    test: 'return /\\)\\s*:\\s*number/.test(__src) && /:\\s*void/.test(__src) && jami(4, 6) === 10;',
    hint: "დაწერე ): number და ): void",
    note: "ისრიან ფუნქციასაც იგივე წესი აქვს: const f = (n: number): string => String(n). ცვლადის ტიპად კი ასე ჩაიწერება: const f: (n: number) => string.",
  });

  T({
    id: "ts-params", title: "არჩევითი და ნაგულისხმევი პარამეტრები", short: "პარამეტრები",
    theory: "პარამეტრი არჩევითი ხდება კითხვის ნიშნით: greet(name?: string). ნაგულისხმევი მნიშვნელობა კი ტიპსაც თავად კარნახობს: greet(name = \"სტუმარი\").",
    analogy: "შეკვეთის ფორმა, სადაც კომენტარის ველი შეიძლება ცარიელი დატოვო.",
    label: "წესი",
    syntax: "არჩევითი პარამეტრი სავალდებულოს შემდეგ უნდა იდგეს. მისი ტიპია „ტიპი | undefined“, ამიტომ გამოყენებამდე შემოწმდეს. rest პარამეტრი მასივის ტიპს იღებს: ...args: number[].",
    challenge: "დაწერე ფუნქცია არჩევითი პარამეტრით და ერთი rest პარამეტრით.",
    starter: 'function misalmeba(saxeli: string, mokitxva?: string): string {\n  return (mokitxva ?? "გამარჯობა") + ", " + saxeli;\n}\n\nfunction jami(...ricxvebi: number[]): number {\n  return ricxvebi.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(misalmeba("ანა"), misalmeba("ანა", "სალამი"), jami(1, 2, 3));',
    test: 'return /mokitxva\\s*\\?\\s*:/.test(__src) && /\\.\\.\\.ricxvebi\\s*:\\s*number\\[\\]/.test(__src) && jami(1,2,3) === 6;',
    hint: "mokitxva?: string და ...ricxvebi: number[]",
    note: "არჩევით პარამეტრსა და „ტიპი | undefined“-ს შორის განსხვავებაა: პირველი შეიძლება საერთოდ არ გადასცე, მეორე კი ცხადად უნდა მიუთითო undefined-ად.",
  });
})();
