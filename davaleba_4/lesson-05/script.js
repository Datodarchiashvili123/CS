//5.1

const productPrice = 24.50;
const quantity = 3;
const subtotal = productPrice * quantity;
const tax = subtotal * 0.18;
const total = subtotal + tax;

console.log(subtotal, tax, total);


//5.2

//1. 
console.log(17 % 5);

//2.
const totalMinutes = 100;
const hours = Math.floor(totalMinutes/60);
const minutes = totalMinutes%60;

console.log(`${hours} საათი და ${minutes} წუთი.`);

//3.
console.log(2024 % 2 === 0);

//5.3

//საერთოდ არ ვიცოდი რას დაბეჭდავდა, ამიტომ ვერ ვიწინასწარმეტყველე
let i = 5;
console.log(i++);
console.log(i);
let j = 5;
console.log(++j);
console.log(j);

//როგორც გავიგე, პირველ შემთხვევაში ჯერ იბეჭდება ცვლადის თავდაპირველი მნიშვნელობა და შემდეგ ემატება 1.
//მეორე შემთხვევაში, გაზრდის 1–ით და იბეჭდება მხოლოდ გაზრდილი მნიშვნელობა.


//5.4

//ჩემი გამოთვლილი – 14
console.log(2+3*4);
//ჩემი გამოთვლილი – 20
console.log((2+3)*4);
//ჩემი გამოთვლილი – 3
console.log(10-4-3);
//ჩემი გამოთვლილი – 512
console.log(2**3**2);
//ჩემი გამოთვლილი – 3
console.log(10%3+2); 

//5.5

let hasTicket = true;
let hasId = false;
console.log(hasTicket && hasId);
console.log(hasTicket || hasId);
console.log(!hasTicket);


//5.6

const length = 8;
const width = 5;
const perimeter = (length + width) * 2;
const area = length * width;

console.log(`პერიმეტრია: ${perimeter}, ფართობია: ${area}`);