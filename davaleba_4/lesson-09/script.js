//9.1

//console.log(5 > 3); - true
//console.log(5 == "5"); - true
//console.log(5 === "5"); - false
//console.log(5 != "5"); - false
//console.log(5 !== "5"); - true
//console.log(null == undefined); - false
//console.log(null === undefined); - false
//console.log(NaN === NaN); - true
//console.log("a" < "b"); - true
//console.log("10" < "9"); - true - რიცხვები ჩაწერილია სტრინგად, შესაბამისად ვადარებთ მათ უნიკოდებს, ამიტომ არის true
//console.log(10 < 9); - false – ერთმანეთს ვადარებთ მათემატიკურ რიცხვებს, 10>9, შესაბამისად დაგვიწერა false 
//console.log(true == 1); - true - true რიცხობრივად უდრის 1–ს, ხოლო false = 0

console.log(5 > 3);

console.log(5 == "5");

console.log(5 === "5");

console.log(5 != "5");

console.log(5 !== "5");

console.log(null == undefined);

console.log(null === undefined);

console.log(NaN === NaN);

console.log("a" < "b");

console.log("10" < "9");

console.log(10 < 9);

console.log(true == 1);

//9.2

// შედარებისთვის ყოველთვის ვიყენებთ ===–ს, რადგან იგი ადარებს როგორ მონაცემთა მნიშვნელობებს, ისე მათ ტიპებს, შესაბამისად არის ბევრად ზუსტი.

//9.3

const userAge = 17;
const minAge= 18;

const isOlder = userAge > minAge;
const isTheSameAge = userAge === minAge;
const isYounger = userAge < minAge;
const howManyYears = minAge - userAge;

console.log(isOlder, isTheSameAge, isYounger, howManyYears);

//9.4

let t1 = 22;
let t2 = 22.0;

console.log(t1 === t2); // შევადარეთ მონაცემთა მნიშვნელობებიც და ტიპებიც, არის true

t2 = "22";

console.log(t1 == t2); // შევადარეთ მონაცემთა მნიშვნელობები, არის true
console.log(t1 === t2); // შევადარეთ მონაცემთა მნიშვნელობებიც და ტიპებიც, არის false, რადგან ტიპები განსხვავდება

