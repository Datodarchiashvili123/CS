//10.1

console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(NaN));
console.log(Boolean(undefined));
console.log(Boolean(null));

//10.2

console.log(Boolean("")); //ცარიელი მნიშვნელობა – falsy
console.log(Boolean("0")); //სტრინგი – true
console.log(Boolean([])); //მასივი – true
console.log(Boolean({})); //ობიექტი – true
console.log(Boolean(0)); //ნული – falsy
console.log(Boolean(-1)); //რიცხვი – true

//10.3

function greet(name){
    return `გამარჯობა ${name || "სტუმარო"}`;
}

console.log(greet(""));

//10.4

function greett(name){
    return `გამარჯობა ${name ?? "სტუმარო"}`;
}

console.log(greett(0));

// ?? ამოწმებს არის თუ არა მონაცემის ტიპი null ან undefined
// || ამოწმებს მონაცემის ტიპი falsy–ა თუ truthy და მხოლოდ truthy მონაცემს აბრუნებს.

//10.5

const arr  = [0, 1, "", "hello", null, 5, undefined, NaN, "0"];
const ArrIsTruthy = arr.filter(Boolean);

console.log(ArrIsTruthy);

//10.6

function firstTruthy(...values){
    return values.find(Boolean) || null;
}

console.log(firstTruthy("1", 0));