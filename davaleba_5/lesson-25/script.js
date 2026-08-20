//25.1

function square1(n) { return n * n; }
const square2 = function(n) { return n * n; };
const square3 = n => n * n;
console.log(square1(4), square2(4), square3(4));

//25.2

function greet(name) { return `გამარჯობა, ${name}`; }
const resultGreeting = greet("გიორგი");
// return აბრუნებს მნიშვნელობას ფუნქციიდან, console.log მხოლოდ ტერმინალში ბეჭდავს
console.log(resultGreeting);

//25.3

const celsiusToFahrenheit = c => (c * 9) / 5 + 32;
const fahrenheitToCelsius = f => ((f - 32) * 5) / 9;
console.log(celsiusToFahrenheit(20), fahrenheitToCelsius(68));

//25.4

function decFunc() { 
    return "OK"; 
}
console.log(decFunc());

//25.5

function applyTwice(fn, value) { 
    return fn(fn(value)); 
}
console.log(applyTwice(x => x * 2, 3));

//25.6 არ ბრუნდბა გაზრდილი რიცხვი

function makeCounter() {
  let count = 0;
  return ++count;
}
const cnt = makeCounter();
console.log(makeCounter());

//25.7–8 