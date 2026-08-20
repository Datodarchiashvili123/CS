//13.1

function isAdult(age){
    return age >= 18 ? "srulwlovani": "arasrulwlovani"
}

console.log(isAdult(19));

//13.2

const n = 5;
console.log(`${n} კომენტარი ${n === 1 ? "komentari": "komentari**a**"}`);

//13.3

const isLoggedIn = true;

console.log(isLoggedIn ? "gamarjoba": "gaiare avtorizacia");

//13.4

function absValue(n){
    return n >= n < 0 ? -n: n;
}

console.log(absValue(-4));

//13.5

function grade(score){
    return score >= 90 ? "A": score >= 80 ? "B": score >= 70 ? "C": score >= 60 ? "D": "F";
}

console.log(grade(45));

//ტერნარული ოპერატორები რთული წასაკითხია როდესაც ჩალაგებული, ამიტომ ჯობია if/else–ის გამოყენება.
