(function () {
  const T = window.tsLesson;

  T({
    id: "ts-narrowing", title: "ტიპის დავიწროება (narrowing)", short: "narrowing",
    theory: "როცა ცვლადი გაერთიანების ტიპისაა, შემოწმებით TypeScript თავად „ავიწროებს“ მას კონკრეტულ ტიპამდე. typeof, instanceof, in და უბრალო შედარებაც მუშაობს.",
    analogy: "ბნელ ოთახში ხელის ცეცება: სანამ არ შეამოწმე, არ იცი რა არის; შემოწმების შემდეგ უკვე დარწმუნებული ხარ.",
    label: "როგორ მუშაობს",
    syntax: "if (typeof v === \"string\") ბლოკის შიგნით TypeScript-მა უკვე იცის, რომ v არის string და .toUpperCase()-ს დაუშვებს. მასივისთვის Array.isArray(), კლასისთვის instanceof, ობიექტის თვისებისთვის \"key\" in obj.",
    challenge: "დაწერე ფუნქცია, რომელიც string | number-ს იღებს და ორივე შემთხვევას ცალკე ამუშავებს.",
    starter: 'function damushaveba(v: string | number): string {\n  if (typeof v === "string") {\n    return v.toUpperCase();\n  }\n  return (v * 2).toString();\n}\n\nconsole.log(damushaveba("abc"), damushaveba(21));',
    test: 'return /typeof\\s+v\\s*===\\s*"string"/.test(__src) && damushaveba("abc") === "ABC" && damushaveba(21) === "42";',
    hint: "შიგნით შეამოწმე: if (typeof v === \"string\") { ... }",
    note: "დავიწროების გარეშე v.toUpperCase() შეცდომა იქნებოდა — რიცხვს ასეთი მეთოდი არ აქვს. სწორედ ეს გაიძულებს ყველა შემთხვევის გათვალისწინებას.",
  });

  T({
    id: "ts-guards", title: "type guards", short: "type guards",
    theory: "საკუთარი შემმოწმებელი ფუნქცია, რომელიც TypeScript-ს ეუბნება ტიპს, იწერება ასე: function isUser(v: unknown): v is User. დაბრუნებული „v is User“ სპეციალური ჩანაწერია.",
    analogy: "ექსპერტი, რომელიც ნივთს დაათვალიერებს და ოფიციალურად დაადასტურებს: „დიახ, ეს ნამდვილია“.",
    label: "სად სჭირდება",
    syntax: "type guard მაშინ გამოიყენე, როცა შემოწმება რთულია და მრავალ ადგილას მეორდება — მაგალითად სერვერიდან მოსული მონაცემის ვალიდაცია. მის შემდეგ TypeScript ტიპს ავტომატურად ავიწროებს.",
    challenge: "დაწერე type guard ფუნქცია „v is string“ ჩანაწერით.",
    starter: 'function ariTeqsti(v: unknown): v is string {\n  return typeof v === "string";\n}\n\nfunction sigrdze(v: unknown): number {\n  if (ariTeqsti(v)) {\n    return v.length;\n  }\n  return 0;\n}\n\nconsole.log(sigrdze("გამარჯობა"), sigrdze(5));',
    test: 'return /v\\s+is\\s+string/.test(__src) && sigrdze("abcd") === 4 && sigrdze(5) === 0;',
    hint: "დაბრუნებული ტიპი დაწერე: v is string",
    note: "„v is string“ მხოლოდ კომპილატორისთვისაა — გაშვებისას ფუნქცია უბრალო boolean-ს აბრუნებს. ამიტომ შიგნით ნამდვილი შემოწმება შენ უნდა დაწერო.",
  });

  T({
    id: "ts-enum", title: "enum", short: "enum",
    theory: "enum დასახელებული მუდმივების ნაკრებია: enum Status { Active, Inactive }. ნაგულისხმევად მათ 0-დან იწყებული რიცხვები ენიჭებათ, მაგრამ ტექსტიც შეიძლება.",
    analogy: "დანომრილი კატეგორიები: ნაცვლად იმისა, რომ კოდში „1“ და „2“ წეროთ, წერ Status.Active — გაცილებით გასაგებია.",
    label: "თანამედროვე ალტერნატივა",
    syntax: "enum იმ იშვიათ TS-ის შესაძლებლობათაგანია, რომელიც გაშვებისასაც არსებობს (რეალურ ობიექტად იქცევა). ბევრი გუნდი მის ნაცვლად ლიტერალურ გაერთიანებას ამჯობინებს: type Status = \"active\" | \"inactive\" — ის მსუბუქია და JS-ში კვალს არ ტოვებს.",
    challenge: "შექმენი enum და გამოიყენე მისი წევრი.",
    starter: 'enum Status {\n  Active,\n  Inactive,\n  Banned\n}\n\nconst mimdinare = Status.Inactive;\n\nconsole.log(mimdinare, Status.Active, Status.Banned);',
    test: 'return /enum\\s+Status/.test(__src) && mimdinare === 1 && Status.Banned === 2;',
    hint: "enum Status { Active, Inactive, Banned }",
    note: "ტექსტური enum უფრო წაკითხვადია გამართვისას: enum Status { Active = \"active\" } — მაშინ კონსოლში „active“ დაინახავ და არა გაუგებარ 0-ს.",
  });

  T({
    id: "ts-generics", title: "გენერიკები — საფუძვლები", short: "გენერიკები",
    theory: "გენერიკი ტიპის პარამეტრია: ფუნქცია მუშაობს ნებისმიერ ტიპზე, მაგრამ კავშირს შესასვლელსა და გამოსავალს შორის ინარჩუნებს — function pirveli<T>(arr: T[]): T.",
    analogy: "უნივერსალური ყუთი, რომელიც „ახსოვს“, რა ჩადე: ვაშლი ჩადე — ვაშლი ამოიღე, არა უბრალოდ „რაღაც“.",
    label: "რატომ არა any",
    syntax: "any-ს გამოყენებისას დაბრუნებული ტიპი იკარგება და შემდეგი ნაბიჯი უკვე დაუცველია. გენერიკი ტიპს ინარჩუნებს: pirveli([1,2,3]) იძლევა number-ს, pirveli([\"a\"]) — string-ს. T უბრალოდ სახელია; ხშირად წერენ T, U, K, V.",
    challenge: "დაწერე გენერიკული ფუნქცია, რომელიც მასივის პირველ ელემენტს აბრუნებს.",
    starter: 'function pirveli<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconsole.log(pirveli<number>([10, 20]), pirveli<string>(["ა", "ბ"]));',
    test: 'return /<\\s*T\\s*>/.test(__src) && pirveli([10, 20]) === 10 && pirveli(["ა", "ბ"]) === "ა";',
    hint: "function pirveli<T>(arr: T[]): T { return arr[0]; }",
    note: "გენერიკი ყველგანაა: Array<T>, Promise<T>, Map<K, V>. როცა Promise<string> დაწერე, უკვე გენერიკი გამოიყენე.",
  });

  T({
    id: "ts-generic-constraints", title: "გენერიკების შეზღუდვები", short: "constraints",
    theory: "extends-ით გენერიკს ზღუდავ: <T extends { length: number }> ნიშნავს „ნებისმიერი ტიპი, ოღონდ length უნდა ჰქონდეს“.",
    analogy: "ვაკანსია: „ნებისმიერი სპეციალობა, ოღონდ მართვის მოწმობა სავალდებულოა“.",
    label: "რატომ",
    syntax: "შეზღუდვის გარეშე T-ზე ვერაფერს გააკეთებ — TypeScript-მა არ იცის, რა შეუძლია. შეზღუდვის შემდეგ კი უკვე დაშვებულია ის თვისებები, რომლებიც შეზღუდვაშია ჩაწერილი. ხშირი წყვილია keyof-თან ერთად: <T, K extends keyof T>.",
    challenge: "დაწერე გენერიკული ფუნქცია შეზღუდვით, რომელიც length-ს აბრუნებს.",
    starter: 'function sigrdze<T extends { length: number }>(v: T): number {\n  return v.length;\n}\n\nconsole.log(sigrdze("გამარჯობა"), sigrdze([1, 2, 3]));',
    test: 'return /extends\\s*\\{\\s*length/.test(__src) && sigrdze([1,2,3]) === 3 && sigrdze("abcd") === 4;',
    hint: "function sigrdze<T extends { length: number }>(v: T): number",
    note: "ფუნქცია მუშაობს ტექსტზეც და მასივზეც, რადგან ორივეს length აქვს — მაგრამ რიცხვს ვერ გადასცემ, რაც სწორედ სასურველია.",
  });

  T({
    id: "ts-utility-types", title: "Utility ტიპები", short: "utility types",
    theory: "TypeScript-ს მზა ტიპ-ხელსაწყოები აქვს: Partial<T> ყველა თვისებას არჩევითს ხდის, Required<T> — სავალდებულოს, Pick<T, K> ირჩევს ნაწილს, Omit<T, K> გამორიცხავს, Record<K, V> ქმნის ლექსიკონს.",
    analogy: "მზა ფორმულები: ნაცვლად იმისა, რომ ყოველ ჯერზე ახალი ტიპი ხელით დაწერო, არსებულს გარდაქმნი.",
    label: "სად გამოგადგება",
    syntax: "Partial<User> იდეალურია განახლების ფუნქციისთვის, სადაც მხოლოდ ნაწილი ველი მოდის. Omit<User, \"password\"> — როცა კლიენტს პაროლის გარეშე უგზავნი. Record<string, number> — ლექსიკონისთვის.",
    challenge: "გამოიყენე Partial და Record.",
    starter: 'interface User {\n  name: string;\n  age: number;\n}\n\nconst nawilobrivi: Partial<User> = { name: "ანა" };\nconst qulebi: Record<string, number> = { matematika: 90, fizika: 85 };\n\nconsole.log(nawilobrivi.name, qulebi.matematika);',
    test: 'return /Partial\\s*</.test(__src) && /Record\\s*</.test(__src) && nawilobrivi.name === "ანა" && qulebi.fizika === 85;',
    hint: "Partial<User> და Record<string, number>",
    note: "ეს ტიპები TypeScript-შივეა ჩაშენებული და იმპორტი არ სჭირდება. მათი წყარო თავად ენის ბიბლიოთეკაშია დაწერილი — ანუ იგივე შესაძლებლობებით, რაც შენ გაქვს.",
  });

  T({
    id: "ts-keyof-typeof", title: "keyof და typeof", short: "keyof / typeof",
    theory: "keyof T ობიექტის ტიპის გასაღებების გაერთიანებას იძლევა. typeof (ტიპების კონტექსტში) არსებული ცვლადიდან ტიპს ამოიღებს.",
    analogy: "keyof — „ჩამომითვალე ამ ბლანკის ყველა გრაფის სახელი“; typeof — „გამიკეთე ზუსტად ისეთივე ბლანკი, როგორიც ეს არის“.",
    label: "ერთად",
    syntax: "typeof obj ცვლადიდან ტიპს იღებს, keyof-ს კი ტიპი სჭირდება — ამიტომ ხშირად ერთად წერენ: keyof typeof obj. ეს გავრცელებული ხერხია კონფიგურაციის ობიექტებთან.",
    challenge: "გამოიყენე keyof typeof უსაფრთხო წვდომისთვის.",
    starter: 'const feradi = {\n  witeli: "#e63946",\n  luji: "#3867d6"\n};\n\ntype FerisSaxeli = keyof typeof feradi;\n\nfunction miigheFeri(saxeli: FerisSaxeli): string {\n  return feradi[saxeli];\n}\n\nconsole.log(miigheFeri("witeli"), miigheFeri("luji"));',
    test: 'return /keyof\\s+typeof/.test(__src) && miigheFeri("witeli") === "#e63946";',
    hint: "type FerisSaxeli = keyof typeof feradi;",
    note: "ამის სარგებელი ისაა, რომ ობიექტში ახალი ფერის დამატებისას ტიპი ავტომატურად განახლდება — ხელით არაფრის სინქრონიზება არ გჭირდება.",
  });

  T({
    id: "ts-classes", title: "კლასები TypeScript-ში", short: "კლასები",
    theory: "TS-ის კლასი იგივეა, რაც JS-ში, ოღონდ თვისებებსა და მეთოდებს ტიპები აქვს. თვისებები კლასის თავში ცხადად ცხადდება.",
    analogy: "იგივე ნახაზი, ოღონდ ზუსტი ზომებით — რომელი ნაწილი რა მასალისაა.",
    label: "სინტაქსი",
    syntax: "თვისება ცხადდება კლასის დასაწყისში (saxeli: string;), constructor-ში კი ენიჭება მნიშვნელობა. მეთოდებს დაბრუნებული ტიპი ეწერებათ. strict რეჟიმში ყველა თვისება ან კონსტრუქტორში უნდა დაინიშნოს, ან საწყისი მნიშვნელობა ჰქონდეს.",
    challenge: "შექმენი კლასი ტიპიზებული თვისებებითა და მეთოდით.",
    starter: 'class Studenti {\n  saxeli: string;\n  qula: number;\n\n  constructor(saxeli: string, qula: number) {\n    this.saxeli = saxeli;\n    this.qula = qula;\n  }\n\n  gaiara(): boolean {\n    return this.qula >= 50;\n  }\n}\n\nconst s = new Studenti("ელენე", 88);\nconsole.log(s.saxeli, s.gaiara());',
    test: 'return /class\\s+Studenti/.test(__src) && /:\\s*boolean/.test(__src) && s.gaiara() === true && s.saxeli === "ელენე";',
    hint: "თვისებები ცალკე გამოაცხადე და მეთოდს დაწერე ): boolean",
    note: "TypeScript-ის კლასი JS-ის კლასად ითარგმნება — ტიპები ქრება, ქცევა უცვლელი რჩება.",
  });

  T({
    id: "ts-modifiers", title: "წვდომის მოდიფიკატორები", short: "public/private",
    theory: "public (ნაგულისხმევი) — ყველგან ხელმისაწვდომი; private — მხოლოდ კლასის შიგნით; protected — კლასსა და მემკვიდრეებში. readonly კი შექმნის შემდეგ ცვლილებას კრძალავს.",
    analogy: "შენობის ოთახები: ფოიე ყველასთვისაა, სამუშაო ოთახი — თანამშრომლებისთვის, სეიფი — მხოლოდ დირექტორისთვის.",
    label: "მოკლე ჩაწერა",
    syntax: "კონსტრუქტორის პარამეტრზე მოდიფიკატორის დაწერა ავტომატურად ქმნის და ანიჭებს თვისებას: constructor(private saxeli: string) — ცალკე გამოცხადება და this.saxeli = saxeli აღარ გჭირდება.",
    challenge: "გამოიყენე კონსტრუქტორის პარამეტრ-თვისება private-ით.",
    starter: 'class Angarishi {\n  constructor(private balansi: number) {}\n\n  shevseba(tanxa: number): number {\n    this.balansi += tanxa;\n    return this.balansi;\n  }\n\n  naxva(): number {\n    return this.balansi;\n  }\n}\n\nconst a = new Angarishi(100);\nconsole.log(a.shevseba(50), a.naxva());',
    test: 'return /constructor\\s*\\(\\s*private/.test(__src) && a.naxva() === 150;',
    hint: "constructor(private balansi: number) {}",
    note: "private მხოლოდ კომპილაციისას მოქმედებს — გაშვებისას თვისება ხელმისაწვდომია. ნამდვილი დამალვისთვის JS-ის #ველი გამოიყენე: #balansi.",
  });

  T({
    id: "ts-abstract", title: "abstract და implements", short: "abstract",
    theory: "abstract კლასი შაბლონია, რომლისგანაც პირდაპირ ობიექტს ვერ შექმნი — მხოლოდ მემკვიდრეობით. implements კი ავალდებულებს კლასს, დააკმაყოფილოს interface-ის კონტრაქტი.",
    analogy: "abstract — ნახევრად დასრულებული ნახაზი, რომლის საფუძველზეც კონკრეტულ პროექტს ასრულებ. implements — სერტიფიკატი, რომ ნაგებობა სტანდარტს აკმაყოფილებს.",
    label: "განსხვავება",
    syntax: "abstract კლასს შეიძლება ჰქონდეს როგორც მზა მეთოდები, ისე მხოლოდ გამოცხადებულები (რომლებიც შვილმა უნდა დაწეროს). interface მხოლოდ ფორმას აღწერს და კოდს არ შეიცავს. ერთი კლასი მრავალ interface-ს დააკმაყოფილებს, მაგრამ მხოლოდ ერთ კლასს მემკვიდრეობს.",
    challenge: "შექმენი interface და კლასი, რომელიც მას აკმაყოფილებს (implements).",
    starter: 'interface Forma {\n  fartobi(): number;\n}\n\nclass Kvadrati implements Forma {\n  constructor(private gverdi: number) {}\n\n  fartobi(): number {\n    return this.gverdi * this.gverdi;\n  }\n}\n\nconst k = new Kvadrati(5);\nconsole.log(k.fartobi());',
    test: 'return /implements/.test(__src) && k.fartobi() === 25;',
    hint: "class Kvadrati implements Forma { ... }",
    note: "implements არაფერს ამატებს გაშვებისას — ის მხოლოდ კომპილატორს ეუბნება „შეამოწმე, რომ ეს კლასი კონტრაქტს იცავს“. თუ მეთოდი დაგავიწყდა, შეცდომას მაშინვე მიიღებ.",
  });

  T({
    id: "ts-null-safety", title: "null, undefined და strictNullChecks", short: "null-უსაფრთხოება",
    theory: "strict რეჟიმში null და undefined ცალკე ტიპებია და სხვა ტიპში ავტომატურად არ ჯდება. ეს TypeScript-ის ერთ-ერთი ყველაზე ღირებული შესაძლებლობაა — ის „null-ის შეცდომების“ მთელ კლასს კლავს.",
    analogy: "ყუთი, რომელზეც ცალკე წერია „შეიძლება ცარიელი იყოს“ — გახსნამდე ამოწმებ.",
    label: "ხელსაწყოები",
    syntax: "?. უსაფრთხო წვდომაა (user?.name), ?? ნაგულისხმევ მნიშვნელობას აძლევს (name ?? \"უცნობი\"). ტიპში ცხადად ჩაწერა: string | null. თუ დარწმუნებული ხარ, რომ არა-null-ია, ! გამოიყენე — მაგრამ ფრთხილად, ის შემოწმებას თიშავს.",
    challenge: "დაწერე ფუნქცია, რომელიც string | null-ს იღებს და უსაფრთხოდ ამუშავებს.",
    starter: 'function achvene(saxeli: string | null): string {\n  return saxeli ?? "უცნობი";\n}\n\nconsole.log(achvene("ნიკა"), achvene(null));',
    test: 'return /string\\s*\\|\\s*null/.test(__src) && achvene(null) === "უცნობი" && achvene("ნიკა") === "ნიკა";',
    hint: "პარამეტრს დაწერე : string | null და გამოიყენე ?? ",
    note: "Null-ის შეცდომას მისმა შემქმნელმა „მილიარდ დოლარიანი შეცდომა“ უწოდა. strictNullChecks სწორედ ამის წინააღმდეგაა — ჩართე ის ყოველთვის.",
  });

  T({
    id: "ts-assertion", title: "as და satisfies", short: "as / satisfies",
    theory: "as ტიპის მტკიცებაა: „მე ვიცი უკეთ, ეს ასეთი ტიპისაა“. satisfies კი ამოწმებს, რომ მნიშვნელობა ტიპს აკმაყოფილებს, ოღონდ კონკრეტულ დასკვნას არ კარგავს.",
    analogy: "as — ხელით ჩასწორებული ეტიკეტი; satisfies — შემოწმების ბეჭედი, რომელიც შიგთავსს არ ცვლის.",
    label: "გაფრთხილება",
    syntax: "as შემოწმებას თიშავს — თუ შეცდომი ხარ, TypeScript ვერ დაგეხმარება და შეცდომა გაშვებისას გამოვა. გამოიყენე მხოლოდ მაშინ, როცა მართლა მეტი იცი (მაგ. DOM-ის ელემენტის ტიპი). ხშირად ჯობია სწორი შემოწმება ან type guard.",
    challenge: "გამოიყენე as ერთხელ და ახსენი კომენტარში, რატომ.",
    starter: 'const monacemi: unknown = "გამარჯობა";\n\n// ვიცით, რომ სერვერიდან ტექსტი მოდის\nconst teqsti = monacemi as string;\n\nconsole.log(teqsti.toUpperCase());',
    test: 'return /\\bas\\s+string/.test(__src) && teqsti === "გამარჯობა";',
    hint: "const teqsti = monacemi as string;",
    note: "as-ის სიხშირე კოდში კარგი მაჩვენებელია: თუ ის ბევრგანაა, ალბათ ტიპები არასწორადაა აღწერილი. სცადე ჯერ სტრუქტურის გასწორება.",
  });

  T({
    id: "ts-tsconfig", title: "tsconfig და კომპილაცია", short: "tsconfig",
    theory: "TypeScript-ის კოდი პროგრამის გაშვებამდე JavaScript-ად ითარგმნება — ამას აკეთებს კომპილატორი tsc. მისი პარამეტრები tsconfig.json ფაილშია.",
    analogy: "ნახაზიდან ნაგებობამდე: ტიპები (შენიშვნები ნახაზზე) მშენებლობის შემდეგ აღარ ჩანს.",
    label: "მთავარი პარამეტრები",
    syntax: "\"strict\": true — ჩართე ყოველთვის, ეს TS-ის მთელი აზრია. \"target\" — რომელი JS ვერსია გამოვიდეს. \"outDir\" — სად ჩაიწეროს შედეგი. დაწყება: npm i -D typescript, npx tsc --init, npx tsc. თანამედროვე ხელსაწყოები (Vite, Next.js) ამას თავად აკეთებენ.",
    challenge: "დაწერე კოდი, რომელიც strict რეჟიმში სწორია (null-ის შემოწმებით).",
    starter: '// strict რეჟიმში ეს კოდი უსაფრთხოა\nfunction pirveliAso(t: string | undefined): string {\n  if (!t) {\n    return "";\n  }\n  return t[0];\n}\n\nconsole.log(pirveliAso("სახლი"), "|" + pirveliAso(undefined) + "|");',
    test: 'return pirveliAso("სახლი") === "ს" && pirveliAso(undefined) === "";',
    hint: "შეამოწმე if (!t) return \"\"; სანამ t[0]-ს წაიკითხავ.",
    note: "ამ კურსის გამშვები ტიპებს უბრალოდ ჭრის და კოდს JS-ად უშვებს — ნამდვილი ტიპური შემოწმება tsc-ს ან რედაქტორს სჭირდება. სცადე იგივე კოდი TypeScript Playground-ზე და ნახავ ნამდვილ შეცდომებს.",
  });

  // ---------- რეკაპი ----------
  window.TsLessons.push({
    id: "ts-recap",
    title: "რეკაპი — მთელი TypeScript",
    shortTitle: "რეკაპი",
    theory: "ტიპებიდან და ანოტაციებიდან — interface-ებამდე, გაერთიანებებამდე, გენერიკებამდე და კლასებამდე. ეს ის ბაზაა, რომლითაც უკვე ნამდვილ TypeScript პროექტში მუშაობა შეიძლება.",
    analogy: "JavaScript — ენა; TypeScript — იგივე ენა გრამატიკის შემმოწმებლით, რომელიც შეცდომას წერისასვე გიჩვენებს.",
    physicalLabel: "რა მოდის შემდეგ",
    physical: "შემდეგი ნაბიჯები: TypeScript რეალურ პროექტში (Vite ან Next.js), ტიპები React-ის კომპონენტებისთვის, გარე ბიბლიოთეკების ტიპები (@types/...), და უფრო ღრმა ტიპური შესაძლებლობები — conditional და mapped types.",
    challenge: "დააჭირე ნებისმიერ თემას გასამეორებლად.",

    createSimulation: function (container, setChallengeResult) {
      const CFZ = window.CFZ;
      const topics = [
        { to: "ts-basic-types", title: "ძირითადი ტიპები", desc: "string, number, boolean" },
        { to: "ts-inference", title: "დასკვნა", desc: "როდის დავწეროთ ანოტაცია" },
        { to: "ts-interface", title: "interface და type", desc: "ობიექტის ფორმის აღწერა" },
        { to: "ts-union", title: "union და literal", desc: "„ან ეს, ან ის“" },
        { to: "ts-narrowing", title: "დავიწროება", desc: "typeof, in, type guards" },
        { to: "ts-generics", title: "გენერიკები", desc: "T, შეზღუდვები" },
        { to: "ts-utility-types", title: "utility ტიპები", desc: "Partial, Pick, Omit, Record" },
        { to: "ts-classes", title: "კლასები", desc: "მოდიფიკატორები, implements" },
        { to: "ts-null-safety", title: "null-უსაფრთხოება", desc: "strictNullChecks, ?., ??" },
        { to: "ts-tsconfig", title: "კომპილაცია", desc: "tsc და tsconfig.json" },
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

      const pg = CFZ.createTsPlayground(
        'interface Studenti {\n  saxeli: string;\n  qulebi: number[];\n}\n\ntype Shefaseba = "kargi" | "sashualo" | "cudi";\n\nfunction shefaseba(s: Studenti): Shefaseba {\n  const saSualo = s.qulebi.reduce((a, b) => a + b, 0) / s.qulebi.length;\n  if (saSualo >= 85) return "kargi";\n  if (saSualo >= 60) return "sashualo";\n  return "cudi";\n}\n\nconst sia: Studenti[] = [\n  { saxeli: "ელენე", qulebi: [90, 88, 95] },\n  { saxeli: "ნატალი", qulebi: [70, 65, 72] }\n];\n\nsia.forEach((s) => console.log(s.saxeli, "→", shefaseba(s)));',
        "return true;",
        function () {}
      );

      container.append(
        CFZ.el("p", { className: "breakdown-note", text: "დააჭირე თემას, რომ იმ გაკვეთილს დაუბრუნდე. ქვემოთ კი სრული მაგალითია — შეცვალე და გაუშვი." }),
        stack,
        CFZ.el("h4", { text: "ყველაფერი ერთად" }),
        pg.element
      );

      setChallengeResult(true, "შესრულებულია: TypeScript-ის საფუძვლები გაიარე. 🎉");
      return function () { pg.destroy(); };
    },
  });

  // ---------- რესურსები ----------
  const GROUPS = [
    {
      title: "📘 ოფიციალური",
      items: [
        { label: "TypeScript Handbook", desc: "ოფიციალური სახელმძღვანელო — ყველაზე სრული წყარო.", href: "https://www.typescriptlang.org/docs/handbook/intro.html" },
        { label: "TypeScript Playground", desc: "დაწერე TS ბრაუზერში და ნახე ნამდვილი ტიპური შეცდომები და შედეგი JS.", href: "https://www.typescriptlang.org/play" },
        { label: "Utility Types", desc: "ყველა მზა ტიპ-ხელსაწყოს ცნობარი მაგალითებით.", href: "https://www.typescriptlang.org/docs/handbook/utility-types.html" },
      ],
    },
    {
      title: "🎓 სასწავლო",
      items: [
        { label: "Total TypeScript — Beginners", desc: "მეტ პოკოკის უფასო კურსი, პრაქტიკული სავარჯიშოებით.", href: "https://www.totaltypescript.com/tutorials" },
        { label: "TypeScript Deep Dive", desc: "უფასო ონლაინ წიგნი — ღრმად და გასაგებად.", href: "https://basarat.gitbook.io/typescript/" },
        { label: "React + TypeScript Cheatsheet", desc: "თუ React-ს გეგმავ — ეს ყველაზე სასარგებლო ცნობარია.", href: "https://react-typescript-cheatsheet.netlify.app/" },
      ],
    },
    {
      title: "🏋️ ვარჯიში",
      items: [
        { label: "Type Challenges", desc: "ტიპური თავსატეხები მარტივიდან ექსტრემალურამდე.", href: "https://github.com/type-challenges/type-challenges" },
        { label: "Exercism — TypeScript", desc: "ამოცანები მენტორის უკუკავშირით.", href: "https://exercism.org/tracks/typescript" },
      ],
    },
    {
      title: "🛠 ხელსაწყოები",
      items: [
        { label: "DefinitelyTyped (@types)", desc: "ტიპები ბიბლიოთეკებისთვის, რომლებსაც ისინი არ მოჰყვება.", href: "https://github.com/DefinitelyTyped/DefinitelyTyped" },
        { label: "tsconfig ცნობარი", desc: "ყველა პარამეტრი ახსნით.", href: "https://www.typescriptlang.org/tsconfig" },
      ],
    },
  ];

  window.TsLessons.push({
    id: "ts-resources",
    title: "დამატებითი რესურსები",
    shortTitle: "რესურსები",
    theory: "TypeScript-ის საფუძვლები უკვე იცი. ქვემოთ შეკრებილია რესურსები გასაგრძელებლად — ოფიციალური დოკუმენტაციიდან ტიპურ თავსატეხებამდე.",
    analogy: "ცნობარი და სავარჯიშო დარბაზი ერთად.",
    physicalLabel: "როგორ ისწავლო ეფექტურად",
    physical: "საუკეთესო გზაა არსებული JavaScript პროექტის თანდათან გადატანა TypeScript-ზე: ჯერ ერთი ფაილი, მერე მეორე. TypeScript Playground კი ყოველთვის ხელთ გქონდეს — იქ ნამდვილ ტიპურ შეცდომებს დაინახავ.",
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
          text: "რჩევა: დაიწყე ოფიციალური Handbook-ით, პარალელურად კი ყველაფერი TypeScript Playground-ზე სცადე — იქ შეცდომებს მაშინვე დაინახავ.",
        })
      );
      setChallengeResult(false, "აირჩიე ერთი რესურსი და გახსენი.");
    },
  });
})();
