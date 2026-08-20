//8.1

console.log(10/3);
console.log(10%3);
console.log(2**10);
console.log(-7%3);

//8.2

const price = 19.567

console.log(price.toFixed(2));

//8.3

let input = "42";

let numb1 = Number(input);
let numb2 = +input;

console.log(typeof numb1, numb1);
console.log(typeof numb2, numb2);

//8.4  (აქ ნულსაც აბრუნებს და ვერ მივხვდი რატომ)

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1));
}
console.log(randomInt(2, 6));

//8.5

function isEven(n){
    return n % 2 === 0;
}
console.log(isEven(4));

function isOdd(n){
    return n % 2 !== 0;
}
console.log(isOdd(3));

//8.6

console.log(0.1 + 0.2);
//არ უდრის ზუსტად 0.3-ს რადგან, JS ორობით ათწილადებს იყენებს. 0.1 და 0.2 კი ამ სისტემაში უსასრულო პერიოდული ათწილადებია. 

function nearlyEqual(a, b){
    return a - b <= 0.0001;
}

console.log(nearlyEqual(0.0002, 0.0002));

//8.7 (ვერ ვაკეთებ)
//დაწერე ფუნქცია formatMoney(n), რომელიც 1234567.891-ს გადააქცევს სტრიქონად 1 234 567.89 ₾.

function formatMoney(n){
    return 
}

console.log(formatMoney(1234567.891));

//8.8 


function sumDigits(n) {
  let sum = 0;

  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }

  return sum;
}

console.log(sumDigits(1234)); 


// for-ით ასე იქნებოდა 
let jami = 0;
for (let i = 1; i <= 4; i++) jami += i;

console.log(jami);