//4.1

const text = "ელენე";
console.log(typeof text);

let count = 19;
console.log(typeof count);

let isaGirl = true;
console.log(typeof IsStudent);

let job;
console.log(typeof job);

const empty = null;
console.log(typeof empty);

//4.2

//console.log(typeof "5"); - string
//console.log(typeof 5); - number
//console.log(typeof true); boolean
//console.log(typeof undefined); - undefined
//console.log(typeof null); - null/object
//console.log(typeof NaN); - number უცნაურია, რადგან რეალურად NaN ნიშნავს რომ ეს რიცხვი არ არის.
//console.log(typeof (10 / "abc")); - number, რიცხვის სტრინგზე გაყოფის დროს ვიღებს NaN–ს, რომლის ტიპიც არის number.

console.log(typeof "5");
console.log(typeof 5);
console.log(typeof true); 
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof NaN);
console.log(typeof (10 / "abc"));

//4.3

const type1 = Number("42");
console.log(typeof type1);

const type2 = String(42)
console.log(typeof type2);

const type3 = Number("3.9")
console.log(typeof type3);

const type4 = Number("abc")
console.log(typeof type4);

const type5 = Boolean(0);
console.log(typeof type5);

const type6 = Boolean("");
console.log(typeof type6);

//4.4

let x;
console.log(x);
//undefined - არის განუსაზღვრელი მნიშვნელობა

let y = null;
console.log(y);
//null - არის ცარიელი მნიშვნელობა