//3.1

const firstname = "ელენე"; // სახელი უცვლელი ცვლადია
const lastname = "მარგველიძე"; // გვარი უცვლელი ცვლადია
let age = 19; // ასაკი იცვლება
let city = "Tbilisi"; // ქალაქი იცვლება
let IsStudent = true; // სტუდენტის სტატუსი იცვლება

//3.2

const pi = 3.14;
pi = 3.15;
// TypeError: Assignment to constant variable. - ეს შეცდომა ნიშნავს რომ ვცდილობთ const-ით გამოცხადებული ცვლადისთვის მნიშვნელობის შეცვლას, რაც შეუძლებელია.

//3.3

let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a, b);

//3.4

// userName – მუშაობს, user_name – მუშაობს, 2user – არ მუშაობს, ცვლადის დასაწყისში ციფრების გამოყენება არ შეიძლება,
// user2 – მუშაობს, ბოლოში ციფრის გამოყენება დასაშვებია, my-name – არ მუშაობს, დეფისის გამოყენება არ შეიძლება, 
// $price – მუშაობს, class – არ მუშაობს, ჯავასკრიპტის რეზერვირებული სიტყვაა, firstName -  მუშაობს.

//3.5

let price = 100;

price += 50;
console.log(price);

price *= 2;
console.log(price);

price -= 20;
console.log(price);