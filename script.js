//7.1
let name = "ნიკა";
let age = 25;
let city = "თბილისი";
console.log(`გამარჯობა, მე ვარ ${name}, ${age} წლის, ვცხოვრობ ${city}.`);

//7.2
let a = 7;
let b = 3;
console.log(`${a} + ${b} = ${a + b}, ${a} * ${b} = ${a * b}`);

//7.3
function makeInvoice(product, price, qty) {
    const total = price * qty;
    return `პროდუქტი: ${product}
    ფასი: ${price}₾
    რაოდენობა: ${qty}
    ჯამი: ${total}₾`;
}
console.log(makeInvoice("კლავიატურა", 120, 2));

//7.4
const user = {
    firstName: "ანა",
    lastName: "ბერიძე",
    email: "ana@mail.ge"
};
console.log(`${user.firstName}, ${user.lastName}, <${user.email}>`);


//7.5
function card(user) {
  return `
    <div class="card">
      <h2>${user.name}</h2>
      ${user.email ? `<p>${user.email}</p>` : `<p>ელფოსტა არ არის</p>`}
    </div>
  `;
}
//8.1
console.log(10/3);
console.log(10%3);
console.log(2**10);
console.log(-7%3);

//8.2
let price = 19.567;
console.log(price.toFixed(2));

//8.3
let input = "42";
let num1 = Number(input);
let num2 = parseInt(input);
console.log(num1, typeof num1);
console.log(num2, typeof num2);


//8.4
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomInt(1, 100));

//8.5
function isEven(n) {
    return n % 2 === 0;
}

function isOdd(n) {
    return n % 2 !== 0;
}

console.log(isEven(4));
console.log(isOdd(3));

//8.6
console.log(0.1 + 0.2); //გაგრძელება აკლია

//9.1
console.log( 5>3); //შედარება 5 მეტია 3-ზე
console.log("5" == 5); // არამკაცრი შედარება, ამოწმებს მნიშვნელობას
console.log("5" === 5); // ამოწმებს მნიშვნელობასაც და ტიპსაც, სადაც ერთი სტრინგია მეორე რიცხვი
console.log(null == undefined); // ადარებს მნიშვნელობას, და მიიჩნევს ტოლად
console.log(null === undefined);// ადარებს ტიპებსაც და რადგანაც ორივე განსხვავებულია პასუხში false მიიღება

//9.2
console.log('apple' < 'banana'); //ამოწმებს ანბანის მიხედვით, რადგანაც a ანბანში b-ზე წინაა ამიტომ იქნება true
console.log('Apple' < 'apple');//
console.log('10' < '9');// აქ ორივე სტრინგია ამიტომ ადარებს პირველ სიმბოლოებს ტექსტად (1 < 9), true

//9.3
function inRange(n, min, max) {
  return n >= min && n <= max;
};

//9.4
function maxOfThree(a, b, c) {
  let max = a;

  if (b > max) max = b;
  if (c > max) max = c;

  return max;
};

//9.5
NaN === NaN //აბრუნებს false

function isReallyNaN(x) {
  return x !== x;
};

//10.1
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(NaN));
console.log(Boolean(undefined));

//10.2
Boolean("")    // ცარიელი სტრინგია false
Boolean("0")   // 0 სტრინგია და იქნება true
Boolean([])    // ცარიელი array არის ყოველთვის true
Boolean({})    // ცარიელი object არის true
Boolean(0)     // აქ 0 არ არის სტრინგი ამოტომ 0 = false
Boolean(-1)    // -1/1 = true

//10.3
function greet(name) {
  return "გამარჯობა, " + (name || "სტუმარო");
}

//10.4
function greet(name) {
  return "გამარჯობა, " + (name ?? "სტუმარო");
}
// || ნიშნავს თუ მარცხნივ მნიშვნელობა არასწორია, მაშინ გამოიყენე მარჯვენა

//10.5
// მოცემულია const arr = [0, 1, "", "hello", null, 5, undefined, NaN, "0"]. გაფილტრე მხოლოდ truthy მნიშვნელობები

//10.6
//დაწერე ფუნქცია firstTruthy(...values), რომელიც აბრუნებს პირველ truthy არგუმენტს, ან null-ს თუ ასეთი არ არის.

//11.1
function sign(n) {
  if (n > 0) {
    return "დადებითი";
  } else if (n < 0) {
    return "უარყოფითი";
  } else {
    return "ნული";
  }
}

//11.2
function grade(score) {
    if (score < 0 || score > 100) {
        return "არავალიდური ქულა"
    }

    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 60) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

//11.3
//დაწერე ფუნქცია isLeapYear(year) — წელი ნახტომია, თუ იყოფა 4-ზე, მაგრამ არა 100-ზე, ან იყოფა 400-ზე.

//11.4
function ticketPrice(age, isStudent) {
  if (age <= 5) {
    return 0;
  } else if (age <= 17) {
    return 5;
  } else if (age <= 64) {
    return isStudent ? 7.5 : 15;
  } else {
    return 7;
  }
}

//11.5
//დაწერე ფუნქცია triangleType(a, b, c), რომელიც აბრუნებს: "არ არსებობს" / "ტოლგვერდა" / "ტოლფერდა" / "სხვადასხვაგვერდა"

//12.1
function dayName(n) {
  switch (n) {
    case 1:
      return "ორშაბათი";
    case 2:
      return "სამშაბათი";
    case 3:
      return "ოთხშაბათი";
    case 4:
      return "ხუთშაბათი";
    case 5:
      return "პარასკევი";
    case 6:
      return "შაბათი";
    case 7:
      return "კვირა";
    default:
      return "არასწორი დღე";
  }
}

//12.2
function calc(a, operator, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "ნულზე გაყოფა შეუძლებელია";
      }
      return a / b;
    default:
      return "არასწორი ოპერატორი";
  }
}

//12.3
function season(month) {
  switch (month) {
    case 12:
    case 1:
    case 2:
      return "ზამთარი";

    case 3:
    case 4:
    case 5:
      return "გაზაფხული";

    case 6:
    case 7:
    case 8:
      return "ზაფხული";

    case 9:
    case 10:
    case 11:
      return "შემოდგომა";

    default:
      return "არასწორი თვე";
  }
}

//12.4
//დაწერე ფუნქცია daysInMonth(month, year) — გამოიყენე switch fall-through-ით და ნახტომი წლის შემოწმება თებერვლისთვის.
function daysInMonth(month, year) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;

    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
   default:
      return "არასწორი თვე";
  }
};

//12.5
switch (true) {
    case score >= 90:
        return "A";

        case score >= 80:
            return "B";

            default:
                return "C";
}

//13.1
function isAdult(age) {
    return age >= 18 ? "სრულწლოვანი" : "არასრულწლოვანი";
}

//13.2
const count = 5;
//ვერ გავიგე

//13.3
let msg = isLoggedIn ? "გამარჯობა" : "გაიარე ავტორიზაცია";

//13.4
//დაწერე ფუნქცია absValue(n) ტერნარულით, Math.abs-ის გარეშე.
function absValue(n) {

} 

//13.5
//დაწერე grade(score) (იგივე რაც 11.2) მხოლოდ ჩალაგებული ტერნარულით. შემდეგ დაწერე კომენტარი: რატომ არის ეს კოდი უარესი if/else-ზე?
function grade(score) {

}

//14.1
for (let i = 1; i <= 20; i++) {
    console.log(i);
}

//14.2
for (let i = 100; i >= 1; i -= 5) {
    console.log(i);
}

//14.3
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
console.log(sum);

//14.4
//დაბეჭდე 7-ის გამრავლების ტაბულა (7 x 1 = 7 ... 7 x 10 = 70).

//14.5
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
    row += "*";
}
console.log(row);
}

//15.1
let i = 1;
while (i <= 10) {
    console.log(i);
    i++;
}

//15.2
let i = 10;
do {
    console.log(i);
    i++;
} while (i < 5);

//15.3
//დაწერე ფუნქცია countDigits(n), რომელიც while-ით ითვლის ციფრების რაოდენობას.
function countDigits(n) {
    n = Math.abs(n);

    if (n === 0) {
        return 1;
    }
} //დასასრულებელი

//15.4

//დაწერე ფუნქცია reverseNumber(n): 1234 → 4321 (მხოლოდ არითმეტიკით).

//16.1
for (let i = 1; i <= 50; i++) {
    if (i % 3 === 0) {
        continue;
    }
    console.log(i);
}

//16.2
//მოძებნე პირველი 100-ზე მეტი რიცხვი მასივში და შეაჩერე ციკლი (break).
const arr = [];
