// გამდიდრება: HTML, CSS და JavaScript თავები.
(function () {
  const MDN = "https://developer.mozilla.org/en-US/docs/Web/";

  const HTML_DATA = {
    "html-intro": {
      examples: [
        "დააჭირე ნებისმიერ საიტზე მარჯვენა ღილაკს → „View Page Source“ და ნახავ ზუსტად იმ HTML-ს, რომელიც ბრაუზერმა მიიღო.",
        "ელფოსტის წერილებიც HTML-ითაა აწყობილი — ამიტომ ჩანს იქ სურათები და ღილაკები.",
      ],
      resources: [{ label: "MDN — HTML საფუძვლები", href: MDN + "HTML" }],
    },
    "html-structure": {
      examples: [
        "თუ <meta charset=\"utf-8\"> დაგავიწყდა, ქართული ტექსტი შეიძლება „კითხვის ნიშნებად“ გადაიქცეს — ეს ერთ-ერთი ყველაზე ხშირი პრობლემაა ქართულ საიტებზე.",
        "<title> ჩანს ბრაუზერის ჩანართზე, საძიებო შედეგებში და ბრაუზერის ისტორიაში — ამიტომ ის აზრიანი უნდა იყოს.",
      ],
      resources: [{ label: "MDN — <head>-ის შიგთავსი", href: MDN + "HTML/Element/head" }],
    },
    "html-tags": {
      examples: [
        "კომენტარები კოდში რჩება და მომხმარებელს „View Source“-ით ხედავს — პაროლი ან პირადი შენიშვნა იქ არასდროს დაწერო.",
        "title ატრიბუტი მინიშნებას აჩვენებს მაუსის მიტანისას, მაგრამ მობილურზე არ მუშაობს — მასზე მნიშვნელოვანი ინფორმაცია არ დააყრდნო.",
      ],
      resources: [{ label: "MDN — გლობალური ატრიბუტები", href: MDN + "HTML/Global_attributes" }],
    },
    "html-headings": {
      examples: [
        "საძიებო სისტემები სათაურების იერარქიით იგებენ, რაზეა გვერდი — არასწორი დონეები SEO-ს აზიანებს.",
        "უსინათლო მომხმარებელი ხშირად მხოლოდ სათაურებით ნავიგირებს — ერთი ღილაკით გადადის სათაურიდან სათაურზე.",
      ],
      resources: [{ label: "MDN — სათაურები", href: MDN + "HTML/Element/Heading_Elements" }],
    },
    "html-formatting": {
      examples: [
        "<mark>-ს ბრაუზერები ძებნის შედეგების გამოსაყოფად იყენებენ — Ctrl+F-ით ნაპოვნი ტექსტი სწორედ ასე ინიშნება.",
        "<time datetime=\"2026-07-23\"> საძიებო სისტემას ეუბნება ზუსტ თარიღს, მაშინაც კი, როცა ტექსტში „ხვალ“ წერია.",
      ],
      resources: [{ label: "MDN — ტექსტის ელემენტები", href: MDN + "HTML/Element#inline_text_semantics" }],
    },
    "html-lists": {
      examples: [
        "საიტის მენიუ თითქმის ყოველთვის <ul>-ია — ეკრანის წამკითხველი ამბობს „სია 5 პუნქტით“ და მომხმარებელი მაშინვე იგებს მოცულობას.",
        "<ol reversed> გამოსადეგია „ტოპ 10“-ის ჩამონათვალისთვის, სადაც 10-დან 1-მდე ითვლი.",
      ],
      resources: [{ label: "MDN — სიები", href: MDN + "HTML/Element/ul" }],
    },
    "html-links": {
      examples: [
        "tel: ბმული მობილურზე პირდაპირ რეკავს — <a href=\"tel:+995555123456\">დაგვირეკე</a>.",
        "rel=\"noopener\" უსაფრთხოებისთვისაა: მის გარეშე გახსნილ გვერდს შეუძლია შენს ჩანართზე გავლენის მოხდენა.",
      ],
      resources: [{ label: "MDN — <a>", href: MDN + "HTML/Element/a" }],
    },
    "html-images": {
      examples: [
        "width და height-ის მითითება გვერდის „ხტუნაობას“ აჩერებს ჩატვირთვისას — Google-ს ეს ცალკე მაჩვენებლად (CLS) აქვს გატანილი და რეიტინგზეც მოქმედებს.",
        "SVG ლოგოსთვის იდეალურია: ნებისმიერ ზომაზე მკვეთრია და ფაილიც პატარაა.",
      ],
      resources: [{ label: "MDN — რესპონსიული სურათები", href: MDN + "HTML/Responsive_images" }],
    },
    "html-media": {
      examples: [
        "YouTube-ის ვიდეოს ჩასმა სწორედ <iframe>-ითაა — „Share → Embed“ მზა კოდს გაძლევს.",
        "loading=\"lazy\" iframe-საც აქვს — რუკის ან ვიდეოს ჩატვირთვა მხოლოდ მაშინ, როცა მომხმარებელი მას მიაღწევს.",
      ],
      resources: [{ label: "MDN — <video>", href: MDN + "HTML/Element/video" }],
    },
    "html-boxes": {
      examples: [
        "<span> ხშირად გამოიყენება ერთი სიტყვის შესაღებად ან იკონის ჩასასმელად წინადადების შიგნით.",
        "თუ ბლოკს რაიმე როლი აქვს — გამოიყენე სემანტიკური ტეგი; <div> მხოლოდ მაშინ, როცა ის წმინდა „საკიდია“ სტილისთვის.",
      ],
      resources: [{ label: "MDN — ბლოკური და სტრიქონული", href: MDN + "HTML/Inline_elements" }],
    },
    "html-semantics": {
      examples: [
        "Safari-ს „Reader Mode“ სწორედ <article>-ს ეძებს — სემანტიკის გარეშე ის ვერ მუშაობს.",
        "ეკრანის წამკითხველი მომხმარებელს აძლევს ბრძანებას „გადადი მთავარ შიგთავსზე“ — ეს <main>-ს ეყრდნობა.",
      ],
      resources: [{ label: "MDN — სემანტიკა", href: MDN + "HTML/Element#content_sectioning" }],
    },
    "html-tables": {
      examples: [
        "ფასების ცხრილი, სპორტული ტურნირის ტაბულა, საათების განრიგი — ეს ნამდვილი ცხრილებია.",
        "<caption> ცხრილს სათაურს აძლევს და ეკრანის წამკითხველს ეუბნება, რაზეა ცხრილი.",
      ],
      resources: [{ label: "MDN — ცხრილები", href: MDN + "HTML/Element/table" }],
    },
    "html-forms": {
      examples: [
        "ყოველი შესვლის ფორმა, ძებნის ველი და კომენტარის ველი ინტერნეტში — ეს <form>-ია.",
        "autocomplete=\"email\" ბრაუზერს ეუბნება, რა ჩასვას ავტომატურად — მომხმარებელს დროს უზოგავს.",
      ],
      resources: [{ label: "MDN — ფორმები", href: MDN + "HTML/Element/form" }],
    },
    "html-input-types": {
      examples: [
        "type=\"date\" მობილურზე ნამდვილ კალენდარს ხსნის, type=\"tel\" — ციფრულ კლავიატურას. ერთი ატრიბუტი, დიდი განსხვავება მოხერხებულობაში.",
        "type=\"file\" accept=\"image/*\" მხოლოდ სურათებს გაფილტრავს არჩევისას.",
      ],
      resources: [{ label: "MDN — input-ის ტიპები", href: MDN + "HTML/Element/input" }],
    },
    "html-validation": {
      examples: [
        "ბრაუზერის ვალიდაცია მომხმარებელს დროს უზოგავს, მაგრამ დაცვა არაა — მონაცემი ყოველთვის სერვერზეც უნდა შემოწმდეს.",
        "pattern ატრიბუტით საკუთარი წესი დააწესე — მაგალითად ქართული მობილურის ფორმატი.",
      ],
      resources: [{ label: "MDN — ფორმის ვალიდაცია", href: MDN + "HTML/Constraint_validation" }],
    },
    "html-id-class": {
      examples: [
        "id გამოიყენება ღუზისთვისაც: tsre.in/#kontakti პირდაპირ იმ განყოფილებაზე გადაიყვანს.",
        "ერთი id ორჯერ თუ დაწერე, JavaScript მხოლოდ პირველს იპოვის — ეს ძნელად საპოვნელი შეცდომაა.",
      ],
      resources: [{ label: "MDN — id ატრიბუტი", href: MDN + "HTML/Global_attributes/id" }],
    },
    "html-entities": {
      examples: [
        "როცა ბლოგზე კოდის მაგალითს აჩვენებ, ტეგები აუცილებლად უნდა ჩაანაცვლო — თორემ ბრაუზერი მათ შეასრულებს.",
        "&nbsp; გამოიყენე რიცხვსა და ერთეულს შორის („10 კგ“), რომ ხაზი შუაში არ გაწყდეს.",
      ],
      resources: [{ label: "MDN — Entity-ების სია", href: MDN + "HTML/Reference/Character_reference" }],
    },
    "html-accessibility": {
      examples: [
        "მსოფლიოში დაახლოებით ყოველი მეექვსე ადამიანი რაიმე შეზღუდვასთან ცხოვრობს — ხელმისაწვდომობა უმცირესობისთვის კი არა, ძალიან დიდი ჯგუფისთვისაა.",
        "ხელმისაწვდომობა ყველას ეხმარება: ვიდეოს სუბტიტრებს ხმაურიან ავტობუსშიც კითხულობენ.",
        "ბევრ ქვეყანაში საჯარო საიტებისთვის ეს კანონით სავალდებულოა.",
      ],
      resources: [
        { label: "MDN — Accessibility", href: MDN + "Accessibility" },
        { label: "The A11Y Project — Checklist", href: "https://www.a11yproject.com/checklist/" },
      ],
    },
    "html-meta-seo": {
      examples: [
        "როცა ბმულს Facebook-ზე ან Messenger-ში აგზავნი, სათაური და სურათი og: ტეგებიდან იკითხება — მათ გარეშე ბმული „შიშველი“ ჩანს.",
        "meta description პირდაპირ რეიტინგზე არ მოქმედებს, მაგრამ განსაზღვრავს, დააჭერს თუ არა ადამიანი შედეგს.",
      ],
      resources: [{ label: "MDN — meta ტეგები", href: MDN + "HTML/Element/meta" }],
    },
    "html-debugging": {
      examples: [
        "DevTools-ის Elements ჩანართში ხედავ არა შენს ფაილს, არამედ იმას, როგორ გაიგო ბრაუზერმა შენი კოდი — სწორედ იქ ჩანს, სად „გადაიხარა“ სტრუქტურა.",
        "ვალიდატორის ერთი გაშვება ხშირად ათეულობით უხილავ შეცდომას პოულობს.",
      ],
      resources: [{ label: "W3C Validator", href: "https://validator.w3.org/" }],
    },
    "html-recap": {
      examples: [
        "ამ ცოდნით უკვე შეგიძლია დაწერო რეზიუმე-გვერდი, პორტფოლიო ან პატარა ბიზნესის საიტი — CSS-ის გარეშეც ის მუშაობს და იკითხება.",
      ],
      resources: [{ label: "MDN — HTML ელემენტების სრული სია", href: MDN + "HTML/Element" }],
    },
  };

  const CSS_DATA = {
    "css-intro": {
      examples: [
        "CSS Zen Garden ისტორიული პროექტია: ერთი და იგივე HTML, ასობით სრულიად განსხვავებული დიზაინი — მხოლოდ CSS-ის შეცვლით.",
        "ერთი გარე CSS ფაილი ასობით გვერდს ემსახურება — ფერის შეცვლა ერთ ადგილას მთელ საიტს ცვლის.",
      ],
      resources: [{ label: "CSS Zen Garden", href: "http://www.csszengarden.com/" }],
    },
    "css-selectors": { examples: ["DevTools-ში სელექტორის ტესტირება შეიძლება Console-ში: document.querySelectorAll(\".karti\") — იმავე სინტაქსით მუშაობს."], resources: [{ label: "MDN — სელექტორები", href: MDN + "CSS/CSS_selectors" }] },
    "css-combinators": { examples: ["„.a .b“ და „.a.b“-ს შორის დაკარგული ჰარი ერთ-ერთი ყველაზე ხშირი და ძნელად შესამჩნევი შეცდომაა."], resources: [{ label: "MDN — კომბინატორები", href: MDN + "CSS/CSS_selectors/Combinators" }] },
    "css-pseudo-classes": { examples: ["ცხრილის მონაცვლეობითი ზოლები (:nth-child(even)) კითხვადობას მკვეთრად აუმჯობესებს.", ":focus-visible ფოკუსს მხოლოდ კლავიატურით ნავიგაციისას აჩვენებს — მაუსით დაჭერისას არა."], resources: [{ label: "MDN — ფსევდო-კლასები", href: MDN + "CSS/Pseudo-classes" }] },
    "css-pseudo-elements": { examples: ["სავალდებულო ველის წითელი ვარსკვლავი, ციტატის ბრჭყალები, გარე ბმულის ისარი — ყველა ::after-ით კეთდება, HTML-ის შეხების გარეშე."], resources: [{ label: "MDN — ფსევდო-ელემენტები", href: MDN + "CSS/Pseudo-elements" }] },
    "css-cascade": { examples: ["!important-ის გამოყენება ჩვეულებრივ ნიშნავს, რომ სადღაც სტრუქტურა აირია — და ის მალევე იწვევს „!important-ის ომს“."], resources: [{ label: "MDN — სპეციფიკურობა", href: MDN + "CSS/CSS_cascade/Specificity" }] },
    "css-inheritance": { examples: ["body-ზე ერთი font-family მთელ საიტს ფარავს — გარდა ღილაკებისა და ველებისა, რომლებსაც font: inherit სჭირდებათ."], resources: [{ label: "MDN — მემკვიდრეობა", href: MDN + "CSS/CSS_cascade/Inheritance" }] },
    "css-colors": { examples: ["მუქი თემა hsl-ით ბევრად ადვილი შესაქმნელია: ტონს ტოვებ, სიკაშკაშეს ცვლი.", "კონტრასტის ნორმა (4.5:1) მხოლოდ რეკომენდაცია არაა — ბევრგან ის ხელმისაწვდომობის სტანდარტის ნაწილია."], resources: [{ label: "WebAIM Contrast Checker", href: "https://webaim.org/resources/contrastchecker/" }] },
    "css-units": { examples: ["თუ px-ით წერ შრიფტს, მომხმარებელი, ვინც ბრაუზერში ასოებს იდიდებს, ვერაფერს შეცვლის — rem ამ პრობლემას აგვარებს.", "100vh მობილურზე პრობლემურია მისამართის ზოლის გამო — ამიტომ გაჩნდა 100dvh."], resources: [{ label: "MDN — ერთეულები", href: MDN + "CSS/CSS_Values_and_Units" }] },
    "css-text": { examples: ["ტექსტის სტრიქონი 45–75 სიმბოლოზე გრძელი რომ გახდეს, თვალს უჭირს შემდეგი ხაზის დაწყების პოვნა — სწორედ ამიტომ არის გაზეთი სვეტებად."], resources: [{ label: "MDN — ტიპოგრაფიკა", href: MDN + "CSS/CSS_fonts" }] },
    "css-fonts": { examples: ["ბევრ პოპულარულ ვებ-შრიფტს ქართული ასოები არ აქვს — ყოველთვის შეამოწმე ქართულ ტექსტზე, სანამ აირჩევ.", "სისტემური შრიფტების სტეკი საერთოდ არაფერს ტვირთავს — ეს ყველაზე სწრაფი ვარიანტია."], resources: [{ label: "Google Fonts — ქართული", href: "https://fonts.google.com/?subset=georgian" }] },
    "css-box-model": { examples: ["* { box-sizing: border-box; } თითქმის ყველა თანამედროვე პროექტის პირველი ხაზია."], resources: [{ label: "MDN — box model", href: MDN + "CSS/CSS_box_model" }] },
    "css-spacing": { examples: ["margin collapse ხშირად აბნევს დამწყებს: ორი 20px margin 40px-ს არ იძლევა, არამედ 20px-ს.", "თანამედროვე ალტერნატივა დაშორებისთვის — flex/grid-ის gap, რომელიც collapse-ს არ ექვემდებარება."], resources: [{ label: "MDN — margin collapsing", href: MDN + "CSS/CSS_box_model/Mastering_margin_collapsing" }] },
    "css-borders": { examples: ["outline-ს არასდროს წაშლი ჩანაცვლების გარეშე — მის გარეშე კლავიატურით მოსარგებლე ვერ ხედავს, სად არის."], resources: [{ label: "MDN — box-shadow", href: MDN + "CSS/box-shadow" }] },
    "css-backgrounds": { examples: ["ჰერო-ბანერზე გრადიენტი სურათის ზემოთ ტექსტს კითხვადს ხდის — linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(foto.jpg)."], resources: [{ label: "CSS Gradient — გენერატორი", href: "https://cssgradient.io/" }] },
    "css-display": { examples: ["display: none ელემენტს ეკრანის წამკითხველისთვისაც მალავს; თუ მხოლოდ ვიზუალურად გინდა დამალვა, სპეციალური „visually hidden“ ხერხი გამოიყენე."], resources: [{ label: "MDN — display", href: MDN + "CSS/display" }] },
    "css-position": { examples: ["position: sticky ერთი ხაზით ქმნის „მიწებებულ“ სათაურს, რომელიც გადახვევისას ზემოთ რჩება.", "z-index მხოლოდ პოზიციონირებულ ელემენტებზე მუშაობს — ეს ხშირი გაუგებრობაა."], resources: [{ label: "MDN — position", href: MDN + "CSS/position" }] },
    "css-flex-basics": { examples: ["ნავიგაციის ზოლი (ლოგო მარცხნივ, მენიუ მარჯვნივ) — display:flex + justify-content:space-between. ეს ალბათ ყველაზე ხშირი flex-რეცეპტია."], resources: [{ label: "Flexbox Froggy", href: "https://flexboxfroggy.com/" }] },
    "css-flex-advanced": { examples: ["margin-left: auto ერთ ელემენტს მარჯვნივ მიაწებებს — მოსახერხებელი ხრიკი მენიუსთვის."], resources: [{ label: "CSS-Tricks — Flexbox გზამკვლევი", href: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" }] },
    "css-grid-basics": { examples: ["გვერდის კარკასი (header / sidebar / main / footer) Grid-ით რამდენიმე ხაზში იწერება."], resources: [{ label: "Grid Garden", href: "https://cssgridgarden.com/" }] },
    "css-grid-advanced": { examples: ["repeat(auto-fit, minmax(200px, 1fr)) რესპონსიულ ბადეს ერთი media query-ის გარეშე ქმნის — ეს ალბათ ყველაზე სასარგებლო ერთი ხაზია თანამედროვე CSS-ში."], resources: [{ label: "CSS-Tricks — Grid გზამკვლევი", href: "https://css-tricks.com/snippets/css/complete-guide-grid/" }] },
    "css-responsive": { examples: ["ტრაფიკის ნახევარზე მეტი მობილურიდან მოდის — mobile-first აღარ არის არჩევანი.", "media query-ის წერტილები კონკრეტულ ტელეფონებს კი არ უნდა მიჰყვეს, არამედ იმ მომენტს, როცა დიზაინი „იშლება“."], resources: [{ label: "web.dev — Responsive design", href: "https://web.dev/learn/design" }] },
    "css-variables": { examples: ["მუქი/ღია თემის გადართვა ცვლადებით რამდენიმე ხაზში კეთდება — სწორედ ასეა გაკეთებული ეს საიტიც.", "ცვლადები JS-ითაც იცვლება: element.style.setProperty('--brand', 'red')."], resources: [{ label: "MDN — Custom properties", href: MDN + "CSS/Using_CSS_custom_properties" }] },
    "css-transform": { examples: ["transform და opacity ერთადერთი თვისებებია, რომელთა ანიმაციაც მართლა რბილია — დანარჩენი გვერდის გადათვლას იწვევს."], resources: [{ label: "MDN — transform", href: MDN + "CSS/transform" }] },
    "css-transition": { examples: ["ღილაკის :hover-ზე რბილი გადასვლა ინტერფეისს მაშინვე „ძვირად“ აჩენს — 0.2s საკმარისია, 1s უკვე ნელია."], resources: [{ label: "Easing Functions", href: "https://easings.net/" }] },
    "css-animation": { examples: ["ჩატვირთვის ინდიკატორი (spinner) კლასიკური @keyframes-ია: უსასრულო rotate.", "prefers-reduced-motion-ის გათვალისწინება ერთი ბლოკია, მაგრამ ზოგისთვის ის თავბრუსხვევის თავიდან აცილებას ნიშნავს."], resources: [{ label: "MDN — animation", href: MDN + "CSS/CSS_animations" }] },
    "css-organization": { examples: ["დიდ პროექტში სახელების სისტემის გარეშე CSS ორ თვეში უმართავი ხდება — BEM ან მსგავსი მიდგომა ამას აგვარებს."], resources: [{ label: "BEM — ოფიციალური", href: "https://getbem.com/" }] },
    "css-devtools": { examples: ["DevTools-ში მნიშვნელობის ცვლილება მაშინვე ჩანს — ექსპერიმენტი იქ ჩაატარე და მერე გადაიტანე ფაილში.", "Computed ჩანართი აჩვენებს საბოლოო მნიშვნელობას და იმას, რომელი წესიდან მოვიდა ის."], resources: [{ label: "Chrome DevTools — CSS", href: "https://developer.chrome.com/docs/devtools/css" }] },
    "css-recap": { examples: ["საუკეთესო ვარჯიში: აირჩიე მოწონებული საიტი, გახსენი DevTools და სცადე მისი ერთი ბლოკის ნულიდან გამეორება."], resources: [{ label: "Frontend Mentor — რეალური დავალებები", href: "https://www.frontendmentor.io/" }] },
  };

  const JS_DATA = {
    "js-intro": { examples: ["JavaScript ერთადერთი ენაა, რომელსაც ბრაუზერი პირდაპირ ასრულებს — ყველა სხვა ენა საბოლოოდ მასში ან WebAssembly-ში ითარგმნება.", "იმავე ენით სერვერიც იწერება (Node.js), მობილური აპიც (React Native) და დესკტოპიც (Electron)."], resources: [{ label: "JavaScript.info", href: "https://javascript.info/" }] },
    "js-variables": { examples: ["const არ ნიშნავს „უცვლელ ობიექტს“ — მასივში push მაინც მუშაობს; ის მხოლოდ ხელახლა მინიჭებას კრძალავს."], resources: [{ label: "MDN — let და const", href: MDN + "../JavaScript/Reference/Statements/let" }] },
    "js-types": { examples: ["typeof null === \"object\" ენის ცნობილი შეცდომაა 1995 წლიდან — ვერ ასწორებენ, რადგან მილიონობით საიტი დაინგრეოდა."], resources: [{ label: "MDN — ტიპები", href: MDN + "../JavaScript/Data_structures" }] },
    "js-comparison": { examples: ["ცნობილი მაგალითი: [] == false არის true, [] === false კი false. სწორედ ამიტომ იყენებენ ყოველთვის ===."], resources: [{ label: "MDN — შედარება", href: MDN + "../JavaScript/Equality_comparisons_and_sameness" }] },
    "js-truthy": { examples: ["ცარიელი მასივი truthy-ა — if (arr) ყოველთვის შესრულდება. სიცარიელე arr.length-ით შეამოწმე.", "?? განსხვავდება || -სგან: count ?? 10 ნულს არ ჩაანაცვლებს, count || 10 კი ჩაანაცვლებს."], resources: [{ label: "MDN — Truthy", href: MDN + "../Glossary/Truthy" }] },
    "js-map-filter": { examples: ["map/filter/reduce ერთად ცვლის ციკლების უმეტესობას და კოდს გაცილებით წაკითხვადს ხდის — ეს თანამედროვე JS-ის ხერხემალია."], resources: [{ label: "MDN — Array მეთოდები", href: MDN + "../JavaScript/Reference/Global_Objects/Array" }] },
    "js-sort": { examples: ["[25, 3, 100].sort() იძლევა [100, 25, 3] — ტექსტად ადარებს. ეს ერთ-ერთი ყველაზე ხშირი შეცდომაა გასაუბრებებზეც."], resources: [{ label: "MDN — sort", href: MDN + "../JavaScript/Reference/Global_Objects/Array/sort" }] },
    "js-objects": { examples: ["?. (optional chaining) გადაარჩენს, როცა სერვერიდან მოსულ მონაცემში ველი შეიძლება არ იყოს: user?.address?.city."], resources: [{ label: "MDN — ობიექტები", href: MDN + "../JavaScript/Guide/Working_with_objects" }] },
    "js-functions": { examples: ["სუფთა ფუნქცია (იგივე შესასვლელზე იგივე შედეგი, გვერდითი ეფექტის გარეშე) ბევრად ადვილი შესამოწმებელი და გასამართია."], resources: [{ label: "MDN — ფუნქციები", href: MDN + "../JavaScript/Guide/Functions" }] },
    "js-closures": { examples: ["closure-ს იყენებს ყველა თანამედროვე ბიბლიოთეკა — მაგალითად React-ის useState სწორედ მასზეა აგებული."], resources: [{ label: "MDN — Closures", href: MDN + "../JavaScript/Closures" }] },
    "js-this": { examples: ["this-ის დაკარგვა callback-ში იმდენად ხშირი იყო, რომ ისრიანი ფუნქციები სწორედ ამის გამო შემოიღეს."], resources: [{ label: "MDN — this", href: MDN + "../JavaScript/Reference/Operators/this" }] },
    "js-json": { examples: ["ყველა API თითქმის ყოველთვის JSON-ს აბრუნებს — ეს ინტერნეტის მონაცემთა საერთო ენაა.", "localStorage მხოლოდ ტექსტს ინახავს, ამიტომ ობიექტს JSON.stringify სჭირდება."], resources: [{ label: "MDN — JSON", href: MDN + "../JavaScript/Reference/Global_Objects/JSON" }] },
    "js-classes": { examples: ["კლასები JS-ში „სინტაქსური შაქარია“ — შიგნით ისევ პროტოტიპები მუშაობს, უბრალოდ ჩაწერა უფრო გასაგებია."], resources: [{ label: "MDN — Classes", href: MDN + "../JavaScript/Reference/Classes" }] },
    "js-dom-intro": { examples: ["React, Vue და Svelte სწორედ იმას აკეთებენ, რომ DOM-თან ხელით მუშაობა აღარ დაგჭირდეს — მაგრამ საფუძველი მაინც ეს არის."], resources: [{ label: "MDN — DOM", href: MDN + "API/Document_Object_Model" }] },
    "js-events": { examples: ["ღილაკზე დაჭერა, ტექსტის აკრეფა, გვერდის გადახვევა, ფანჯრის ზომის ცვლილება — ყველაფერი მოვლენაა.", "დელეგირება აუცილებელია დინამიკურ სიაში: ახლად დამატებულ ელემენტს დამმუშავებელი ავტომატურად აქვს."], resources: [{ label: "MDN — Events", href: MDN + "API/Event" }] },
    "js-timers": { examples: ["setTimeout(fn, 0) ხშირად გამოიყენება, რომ კოდი ბრაუზერს „სუნთქვის საშუალებას“ მისცემდეს და ინტერფეისი არ გაიყინოს."], resources: [{ label: "MDN — setTimeout", href: MDN + "API/setTimeout" }] },
    "js-promise": { examples: ["Promise.all-ით სამი მოთხოვნა პარალელურად სრულდება — თუ თითო 1 წამია, სულ 1 წამში დამთავრდება, არა 3-ში."], resources: [{ label: "MDN — Promise", href: MDN + "../JavaScript/Reference/Global_Objects/Promise" }] },
    "js-async-await": { examples: ["async/await-მა კოდი ისე გაამარტივა, რომ ძველი „callback hell“ პრაქტიკულად გაქრა."], resources: [{ label: "MDN — async function", href: MDN + "../JavaScript/Reference/Statements/async_function" }] },
    "js-fetch": { examples: ["ყველა თანამედროვე ვებ-აპლიკაცია მონაცემს fetch-ით იღებს — ამინდი, ფასები, შეტყობინებები.", "CORS-ის შეცდომა fetch-თან ყველაზე ხშირია: სერვერმა უნდა დაუშვას შენი დომენი."], resources: [{ label: "JSONPlaceholder — სატესტო API", href: "https://jsonplaceholder.typicode.com/" }] },
    "js-errors": { examples: ["ცარიელი catch ერთ-ერთი ყველაზე საშიში ჩვევაა — შეცდომა ქრება და პრობლემა თვეების მერე იჩენს თავს."], resources: [{ label: "MDN — Error", href: MDN + "../JavaScript/Reference/Global_Objects/Error" }] },
    "js-recap": { examples: ["შემდეგი ნაბიჯი — პატარა პროექტები: TODO სია, კალკულატორი, ამინდის აპლიკაცია fetch-ით. სწორედ ისინი აქცევს ცოდნას უნარად."], resources: [{ label: "JavaScript30 — 30 პროექტი", href: "https://javascript30.com/" }] },

    "js-console": { examples: ["console.table() მასივს ლამაზ ცხრილად ბეჭდავს — მონაცემების დათვალიერებისას ძალიან მოსახერხებელია.", "პროდაქშენში console.log-ები წაშალე ან გამორთე — ისინი მომხმარებელს ჩანს DevTools-ში."], resources: [{ label: "MDN — Console", href: MDN + "API/console" }] },
    "js-operators": { examples: ["% ხშირად გამოიყენება ციკლურობისთვის: ინდექსი % სიგრძე მასივზე თავიდან იწყებს ტრიალს (მაგ. კარუსელი).", "++i და i++ განსხვავდება: პირველი ჯერ ზრდის, მერე აბრუნებს."], resources: [{ label: "MDN — ოპერატორები", href: MDN + "../JavaScript/Reference/Operators" }] },
    "js-strings": { examples: [".trim() აუცილებელია ფორმებთან — მომხმარებელი ხშირად შემთხვევით ტოვებს ჰარს ბოლოში.", ".split(\",\") CSV-ის დამუშავების საფუძველია."], resources: [{ label: "MDN — String", href: MDN + "../JavaScript/Reference/Global_Objects/String" }] },
    "js-template": { examples: ["HTML-ის აგება შაბლონით ბევრად წაკითხვადია: `<li>${name}</li>` — მაგრამ მომხმარებლის ტექსტთან ფრთხილად (XSS)."], resources: [{ label: "MDN — Template literals", href: MDN + "../JavaScript/Reference/Template_literals" }] },
    "js-numbers": { examples: ["ფულთან მუშაობისას თანხა თეთრებში (მთელ რიცხვებში) შეინახე — 0.1 + 0.2 პრობლემა სწორედ ასე იხსნება.", "toFixed(2) ტექსტს აბრუნებს, არა რიცხვს — გამოთვლაში პირდაპირ არ გამოიყენო."], resources: [{ label: "MDN — Math", href: MDN + "../JavaScript/Reference/Global_Objects/Math" }] },
    "js-if": { examples: ["ღრმად ჩალაგებული if-ების ნაცვლად ადრეული return გამოიყენე — კოდი ბრტყელი და წაკითხვადი რჩება."], resources: [{ label: "MDN — if...else", href: MDN + "../JavaScript/Reference/Statements/if...else" }] },
    "js-switch": { examples: ["განზრახ fall-through სასარგებლოა: შაბათი და კვირა ერთსა და იმავე კოდს გაუშვებს."], resources: [{ label: "MDN — switch", href: MDN + "../JavaScript/Reference/Statements/switch" }] },
    "js-ternary": { examples: ["ტერნარული იდეალურია მრავლობითის მართვისთვის ტექსტში: `${n} ${n === 1 ? 'ფაილი' : 'ფაილი'}`."], resources: [{ label: "MDN — ტერნარული ოპერატორი", href: MDN + "../JavaScript/Reference/Operators/Conditional_operator" }] },
    "js-for": { examples: ["„off-by-one“ (i <= length) ერთ-ერთი ყველაზე ცნობილი შეცდომაა პროგრამირებაში — შედეგად undefined მიიღება."], resources: [{ label: "MDN — for", href: MDN + "../JavaScript/Reference/Statements/for" }] },
    "js-while": { examples: ["უსასრულო ციკლი ბრაუზერის ჩანართს აყინებს — სწორედ ამიტომ აქვს ამ კურსის გამშვებს 3-წამიანი დამცავი."], resources: [{ label: "MDN — while", href: MDN + "../JavaScript/Reference/Statements/while" }] },
    "js-break": { examples: ["დიდ მასივში ძებნისას break-ი ან .find() მნიშვნელოვნად ზოგავს დროს — ციკლი პირველივე დამთხვევაზე ჩერდება."], resources: [{ label: "MDN — break", href: MDN + "../JavaScript/Reference/Statements/break" }] },
    "js-arrays": { examples: ["arr.at(-1) ბოლო ელემენტს იღებს — ბევრად წაკითხვადია, ვიდრე arr[arr.length - 1]."], resources: [{ label: "MDN — Array", href: MDN + "../JavaScript/Reference/Global_Objects/Array" }] },
    "js-array-methods": { examples: ["const b = a ასლს არ ქმნის — ორივე ცვლადი ერთსა და იმავე მასივზე მიუთითებს. ეს ძალიან ხშირი შეცდომაა."], resources: [{ label: "MDN — slice vs splice", href: MDN + "../JavaScript/Reference/Global_Objects/Array/slice" }] },
    "js-reduce": { examples: ["reduce-ით დათვლა ხშირი ხერხია: სიტყვების სიიდან „რომელი რამდენჯერ გვხვდება“ ერთ გამოძახებაში ითვლება."], resources: [{ label: "MDN — reduce", href: MDN + "../JavaScript/Reference/Global_Objects/Array/reduce" }] },
    "js-find": { examples: ["some() იდეალურია უფლებების შესამოწმებლად: roles.some(r => r === \"admin\")."], resources: [{ label: "MDN — find", href: MDN + "../JavaScript/Reference/Global_Objects/Array/find" }] },
    "js-object-methods": { examples: ["ობიექტი, რომელსაც მონაცემიც აქვს და ქცევაც, კლასის მარტივი ალტერნატივაა პატარა ამოცანებში."], resources: [{ label: "MDN — მეთოდები", href: MDN + "../JavaScript/Guide/Working_with_objects" }] },
    "js-arrow": { examples: ["ისრიანი ფუნქცია callback-ებში ბუნებრივია, მაგრამ ობიექტის მეთოდად და კონსტრუქტორად არ გამოდგება."], resources: [{ label: "MDN — Arrow functions", href: MDN + "../JavaScript/Reference/Functions/Arrow_functions" }] },
    "js-params": { examples: ["ნაგულისხმევი პარამეტრი მხოლოდ undefined-ზე ჩაირთვება — null გადაცემისას ის არ იმუშავებს."], resources: [{ label: "MDN — Default parameters", href: MDN + "../JavaScript/Reference/Functions/Default_parameters" }] },
    "js-spread": { examples: ["React-სა და თანამედროვე JS-ში მდგომარეობის განახლება თითქმის ყოველთვის spread-ით ხდება: { ...state, count: 1 }."], resources: [{ label: "MDN — Spread syntax", href: MDN + "../JavaScript/Reference/Operators/Spread_syntax" }] },
    "js-scope": { examples: ["ბლოკის სკოუპის გამო ციკლში let-ით შექმნილი ცვლადი თითო გამეორებაზე ახალია — var-თან ეს ცნობილ შეცდომას იწვევდა."], resources: [{ label: "MDN — Scope", href: MDN + "../Glossary/Scope" }] },
    "js-recursion": { examples: ["საქაღალდეების ხეზე გავლა, კომენტარების ჩალაგებული სია, JSON-ის ღრმა დათვალიერება — ეს ბუნებრივად რეკურსიული ამოცანებია."], resources: [{ label: "MDN — რეკურსია", href: MDN + "../JavaScript/Guide/Functions#recursion" }] },
    "js-destructuring": { examples: ["ფუნქციის პარამეტრში დესტრუქტურიზაცია კოდს ბევრად კითხვადს ხდის: function show({ name, age }) — გამოძახებისას რიგი აღარ გახსოვდეს."], resources: [{ label: "MDN — Destructuring", href: MDN + "../JavaScript/Reference/Operators/Destructuring_assignment" }] },
    "js-object-static": { examples: ["Object.entries + map ობიექტიდან HTML სიის ასაგებად ყველაზე მოკლე გზაა."], resources: [{ label: "MDN — Object", href: MDN + "../JavaScript/Reference/Global_Objects/Object" }] },
    "js-map-set": { examples: ["Set-ით გამეორებების მოშორება ([...new Set(arr)]) ერთ-ერთი ყველაზე ხშირად გამოყენებული ერთხაზიანი ხერხია."], resources: [{ label: "MDN — Set", href: MDN + "../JavaScript/Reference/Global_Objects/Set" }] },
    "js-inheritance": { examples: ["პრაქტიკაში ღრმა იერარქიას გაურბიან — კომპოზიცია (პატარა ფუნქციების შეთავსება) უფრო მოქნილია."], resources: [{ label: "MDN — extends", href: MDN + "../JavaScript/Reference/Classes/extends" }] },
    "js-selectors": { examples: ["querySelectorAll-ის შედეგი NodeList-ია, არა მასივი — map-ისთვის ჯერ [...nodes] გააკეთე."], resources: [{ label: "MDN — querySelector", href: MDN + "API/Document/querySelector" }] },
    "js-dom-content": { examples: ["ყველა XSS შეტევის დიდი ნაწილი სწორედ innerHTML-ით მომხმარებლის ტექსტის ჩასმით იწყება — textContent უსაფრთხოა."], resources: [{ label: "MDN — textContent", href: MDN + "API/Node/textContent" }] },
    "js-classlist": { examples: ["classList.toggle() ერთი ხაზით აკეთებს მენიუს გახსნა-დახურვას — ეს ყველაზე ხშირი DOM-ოპერაციაა ინტერფეისებში."], resources: [{ label: "MDN — classList", href: MDN + "API/Element/classList" }] },
    "js-dom-create": { examples: ["ბევრი ელემენტის დამატებისას DocumentFragment ან ერთჯერადი append გამოიყენე — ციკლში თითოს ცალკე დამატება გვერდს ანელებს."], resources: [{ label: "MDN — createElement", href: MDN + "API/Document/createElement" }] },
  };

  function apply(list, data) {
    (list || []).forEach(function (lesson) {
      const extra = data[lesson.id];
      if (!extra) return;
      if (extra.examples && !lesson.examples) lesson.examples = extra.examples;
      if (extra.resources && !lesson.resources) lesson.resources = extra.resources;
    });
  }

  apply(window.HtmlLessons, HTML_DATA);
  apply(window.CssLessons, CSS_DATA);
  apply(window.JsLessons, JS_DATA);
})();
