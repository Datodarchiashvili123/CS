//თეორიული კითხვები
//1. სერვერეში (მაგ: node.js), მოაცემთა ბაზებში, აპლიკაციებში და ქლაუდის გარემოში
//2. HTML არის Marckup ენა და იგი გამოიყენება საიტის "ჩოჩხის" ასაგებად. ტეგეის დახმარებით განვსაზღვრავთ დაიტის სტრუქტურას და კონტენტს, ხოლო Javascript არის ინტერპრეტირებადი ენა და მიეკუთვნება პროგრამირების ენებს. აკეთებს მათემატიკურ გამოთვლებს და html და css-ში გაწერილ სტრუქტურასა და სტილს ხდის იტერაქტიულს.
//3. ინტერპრეტირებადი ენა არის ისეთი პროგრამირების ენა, რომლის კოდი პირდაპირ იკითხება და სრულდება კომპიუტერის მიერ, ანუ კოდს კითხულობს ხაზ-ხაზად და ასრულებს. ასეთი ენებია Javascript, Python...
//4. 1.მენიუს გახსნა-დახურვა 2.ქუქიები და სხვა ტიპის შეტყობინებები 3.სურათების სლაიდერი)

//console.log("გამარჯობა, JS");

//2.1
//console.log("ბატარეა იწურება");
// console.info("ბატარეა იწურება");
// console.warn("ბატარეა იწურება");
// console.error("ბატარეა იწურება");

//2.2
//console.log("ნატა", 19, "თბილისი");

//2.3
//console.log("5" + 5); //პასუხი იქნება "55", რადგან პირველი მნიშვნელობა არის სტრინგი და მეორე რიცხვი. მოხდება კონკატენაცია და რიცხვ 5-ს ჯავასკრიპტი გადააქცევს სტრინგად.
//console.log(5 + 5); //პასუხი იქნება 10, აქ ორივე რიცხვია და დაჯამდება.
//console.log("javascript".length); //დაბეჭდავს 10-ს, სიტყვა javascript-ის სიმბოლოების რაოდენობას.

//2.4
//console.table(["ნატა", 19, "თბილისი"]) //კონსოლში მონაცემებს ცხრილად გარდაქმნის.

//3.1
// const saxeli = "ნატა";
// const gvari = "მღებრიშვილი";
// const kalaki = "თბილისი"; //const იმიტომ, რომ ეს მნიშვნელობები უცვლელია
// let asaki = 19;
// let arisStudenti = true; //let იმიტომ, რომ ასაკიც და სტუდენტის სტატუსიც ცვალებადია.

//3.2
// const pi = 3.14;

// pi = 3.15;
// გამომდინარე იქიდან, რომ pi-ს მნიშვნელობა მუდმივია და უდრის 3.14-ს, მისთვის სხვა მნიშვნელობის მინიჭება შეუძლებელია, ამიტომ გაშვებისას იქნება ერორი.


//3.3
// let a = 10;
// let b = 20;
// let temp = a;
// a = b;
// b = temp;
// console.log(a, b);

//3.4
// userName მუშაობს,
//  user_name მუშაობს,
//  2user არ მუშაობს,
//  user2 მუშაობს,
//  my-name არ მუშაობს,
//  $price მუშაობს,
//  class არ მუშაობს,
//  firstName მუშაობს

//3.5
// let price = 100;

// price += 50;
// console.log(price);

// price *= 2;
// console.log(price);

// price -= 20;
// console.log(price);

//4.1
// let text = "Hello";
// let number = 10;
// let isActive = true;
// let value;
// let empty = null;

// console.log(typeof text);
// console.log(typeof number);
// console.log(typeof isActive);
// console.log(typeof value);
// console.log(typeof empty);

// //4.2
// console.log(typeof "5"); //სტრინგი
// console.log(typeof 5); //რიცხვი
// console.log(typeof true); //boolean
// console.log(typeof undefined); //undefined
// console.log(typeof null); //object, რადგან null არის ობიექტის ტიპის ცარიელი მნიშვნელობა და ობიექტი არ არსებობს
// console.log(typeof NaN); //number რადგან NaN არის რიცხვითი ტიპის მნიშვნელობა
// console.log(typeof (10 / "abc")); //number რადგან რიცხვი 10 იყოფა სტრინგზე "abc" შედეგი არის NaN (რადგან abc არაა რიცხვი), და მიეკუთვნება რიცხვების ტიპს.


// //4.3
// console.log(Number("42"), typeof Number("42"));
// console.log(String(42), typeof String(42));
// console.log(Number("3.9"), typeof Number("3.9"));
// console.log(Number("abc"), typeof Number("abc")); //დაიბეჭდა NaN
// console.log(Boolean(0), typeof Boolean(0));
// console.log(Boolean(""), typeof Boolean(""));

// //4.4
// let x;
// console.log(x); //undefined ნიშნავს, როცა ცვლადს მნიშვნელობა არ აქვს მინიჭებული

// let y = null;
// console.log(y); //null ნიშნავს, როცა ცვლადს შეგნებულად მივანიჭეთ ცარიელი მნიშვნელობა

// //5.1
// let price = 24.50;
// let quantity = 3;

// let total = price * quantity;
// let tax = total * 0.18;
// let finalPrice = total + tax;

// console.log(total);
// console.log(tax);
// console.log(finalPrice);


// //5.2
// //1.
// console.log(17 % 5)
// //2
// let minutes = 100;

// let hours = Math.floor(minutes / 60);

// console.log(hours, minutes % 60);

// //5.3
// let i = 5;

// console.log(i++);

// console.log(i);

// let j = 5;

// console.log(++j);

// console.log(j);
// //პირველში რადგანაც წერია i++ ჯერ დაბეჭდავს i-ს მნიშვნელობას შემდეგ კი გაზრდის 1-ით, ხოლო მეორეში ++j ჯერ გაზრდის j-ს მნიშვნელობას 1-ით, შემდეგ კი დაბეჭდავს

// //5.4
// console.log(2 + 3 * 4); //14

// console.log((2 + 3) * 4); //20

// console.log(10 - 4 - 3); //3

// console.log(2 ** 3 ** 2); //512

// console.log(10 % 3 + 2); //4

//5.5
//1.
// let hasTicket = true;
// let hasId = false;
//console.log(hasTicket && hasId); // false
//console.log(hasTicket || hasId); // true
// console.log(!hasTicket); // false

//5.6
// let length = 3;
// let width = 7;

// console.log(`პერიმეტრი: ${2 * (length + width)}, ფართობი: ${length * width}`);

// //6.1
// let firstName = "ნატა";
// let lastName = "მღებრიშვილი";

// console.log(firstName + " " + lastName);

// //6.2
// let word = "JavaScript";

// console.log("სიგრძე:", word.length);
// console.log("პირველი სიმბოლო:", word[0]);
// console.log("ბოლო სიმბოლო:", word[word.length - 1]);
// console.log("დიდი ასოებით:", word.toUpperCase());
// console.log("პატარა ასოებით:", word.toLowerCase());

//6.3
// console.log("JS არ არის Java");
// console.log("JS\nარ არის Java");

//6.4
// let email = "  Nika@Gmail.COM  ";

// console.log(email.trim().toLowerCase());

//6.5
// let phone = "+995599123456";
// console.log(phone.slice(-9));

// //7.1
// let firstName = "ნატა";
// let lastName = "მღებრიშვილი";

// console.log(`${firstName} ${lastName}`);

//7.2
// let name = "ნატა";
// let profession = "დეველოპერი";
// let city = "თბილისი";
// let age = 19;

// console.log(`სახელი: ${name}
// პროფესია: ${profession}
// ქალაქი: ${city}
// ასაკი: ${age}`);

//7.3
// let price = 40;
// let qty = 3;

// console.log(`${qty} ცალი × ${price} ₾ = ${price * qty} ₾`);

//7.4
// let a = 5;

// console.log("a + 1 = " + a + 1);

// console.log(`a + 1 = ${a + 1}`);
// //პირველ შემთხვევაში შედეგი არის 51, რადგან "a + 1 = " უკვე სტრიქონია. ამიტომ + ოპერატორი რიცხვის დამატების ნაცვლად ტექსტების შესაერთებლად გამოიყენება შედეგად 5-ს ემატება 1 როგორც ტექსტი და მივიღებთ "51"
// //მეორე შემთხვევაში `${a + 1}`-ის შიგნით ჯავასკრიპტი ჯერ ასრულებს მათემატიკურ გამოთვლას: 5 + 1 = 6, და შემდეგ ამ შედეგს სვამს ტექსტში

//8.1
// console.log(Math.round(4.5), Math.round(4.4));

// console.log(Math.floor(4.9), Math.ceil(4.1));

// console.log(Math.abs(-15));

// console.log(Math.max(3, 9, 1), Math.min(3, 9, 1));

// console.log(Math.sqrt(144));

// console.log(2 ** 8);

//8.2
// let sum = 15.6789;

// let result = sum.toFixed(2);

// console.log(result);
// console.log(typeof result);

//8.3
// console.log(0.1 + 0.2);

// console.log(0.1 + 0.2 === 0.3);

// //რადგანაც კომპიუტერი 0-ების და 1-ების სისტემას იყენებს, ამიტომ 0.1 და 0.2 ზუსტად 0.3 არ გამოდის და პასუხს ვიღებთ 0.30000000000000004, და პასუხი იქნება false. გვერდის ასავლელად უნდა გამოვიყენოთ toFixed() ან math.round() რომ დამრგვალდეს

//8.4
// console.log(Number("50px"));       // NaN რადგან px ტექსტია ის რიცხვად ვერ გარდაიქმნება
// console.log(parseInt("50px"));      // 50 რადგან parseInt() ტექსტის დასაწყისში ეძებს რიცხვს და მას აბრუნებს
// console.log(parseFloat("3.75kg"));  // 3.75 parseInt() მსგავსად parseFloat() ტექსტის დასაწყისში ეძებს რიცხვს და აბრუნებს
// console.log(parseInt("abc"));       // NaN აქ რიცხვი არაა და abc სტრინგი რიცხვად ვერ გარდაიქმნება
// console.log(Number(""));            // 0 number()-სთვის ცარიელი სტრიქონი = 0

//8.5
// console.log(Math.floor(Math.random() * 6) + 1);

// //8.6
// Number.isNaN //ამოწმებს არის თუ არა მნიშვნელობა NaN
// //მაგალითად:
// let result = Number("hello");

// console.log(result);              // NaN სტრინგს ვერ გადააქცევს რიცხვად
// console.log(Number.isNaN(result)); // true მოწმდება ნამდვილად არის NaN თუ არა

//9.1
// console.log(5 > 3);              // true
// console.log(5 == "5");           // true
// console.log(5 === "5");          // false
// console.log(5 != "5");           // false
// console.log(5 !== "5");          // true
// console.log(null == undefined);  // true
// console.log(null === undefined); // false
// console.log(NaN === NaN);        // false
// console.log("a" < "b");          // true
// console.log("10" < "9");         // true აქ ორივე სტრინგია და ჯავასკრიპტი სტრინგებს ანბანის მიხედვით ადარებს
// console.log(10 < 9);             // false აქ ხდება ჩვეულებრივ რიცხვების შედარება. რადგანაც სწორია 10 > 9 მოცემულის პასუხო იქნება false
// console.log(true == 1);          // true 0-ების და 1-ების მიხედვით 1 = true, 0 = false, ამიტომ ხდება შედარება და პასუხია true

// //9.2
// // === ამოწმებს მონაცემთა ტიპსაც და მნიშვნელობასაც, == კი ამოწმებს მხოლოდ მნიშვნელობას

// //9.3
// let userAge = 17;
// let minAge = 18;

// console.log(userAge > minAge);
// console.log(userAge === minAge);
// console.log(userAge < minAge);
// console.log(minAge - userAge);

// //9.4
// let t1 = 22;
// let t2 = 22.0;

// console.log(t1 === t2); // true ორივე number არის

// t2 = "22";

// console.log(t1 == t2);  // true ორივე რიცხვია
// console.log(t1 === t2); // false განსხვავდება მონაცემთა ტიპები (ერთი რიცხვია მეორე სტრინგი)

// //10.1
// let values = [
//   0,
//   "0",
//   "",
//   " ",
//   null,
//   undefined,
//   NaN,
//   false,
//   "false",
//   -1,
//   1
// ];

// console.log(Boolean(0));         // false
// console.log(Boolean("0"));       // true
// console.log(Boolean(""));        // false
// console.log(Boolean(" "));       // true
// console.log(Boolean(null));      // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean(NaN));       // false
// console.log(Boolean(false));     // false
// console.log(Boolean("false"));   // true
// console.log(Boolean(-1));        // true
// console.log(Boolean(1));         // true

//10.2
// console.log(!!"hello");
// console.log(!!"");
// console.log(!!0);
// console.log(!!42);
// console.log(!!null);
// console.log(!!undefined);
// console.log(!!NaN);

//10.3

// let userInput = "";

// let name = userInput || "სტუმარი";

// console.log(name);
// //აქ  userInput გვაქვს ცარიელი ამიტომაც გადადის შემდეგ სტრიქონზე და ბეჭდავს სტუმარს

// let userInput = "ნიკა";

// let name = userInput || "სტუმარი";

// console.log(name);
// //პირველი სტრიქონი ცარიელი აღარაა შესაბამისად დაბეჭდავს "ნიკა"-ს

//10.4
// let count = 0;

// console.log(count || 10);

// console.log(count ?? 10);
// //count || 10-ში count არის 0, ხოლო 0 JavaScript-ში falsy მნიშვნელობაა, ამიტომ ||-ის გამო პროგრამა იღებს 10-ს. count ?? 10 კი მხოლოდ მაშინ იყენებს 10-ს, როცა count არის null ან undefined, ამიტომ აქ 0 რჩება.

//10.5
// console.log("a" && "b"); // "b" || შემთხვევაში დააბრუნებდა a
// console.log("" && "b");  // ""  || შემთხვევაში დააბრუნებდა b
// console.log(0 && 5);     // 0   || შემთხვევაში დააბრუნებდა 5
// console.log(1 && 5);     // 5   || შემთხვევაში დააბრუნებდა 1

