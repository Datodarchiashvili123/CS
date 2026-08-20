//9.1

console.log(5>3);
console.log("5" == 5);
console.log("5" === 5);
console.log(null == undefined); //ორი შედარებით ერთმანეთის ტოლია, რადგან მნიშვნელობები ტოლია
console.log(null === undefined); //განსხვავებული ტიპებია

//9.2

console.log("apple" < "banana");
console.log("Apple" < "apple");
console.log("10" < "9");

//ყველა true არის, რადგან დარდება მათი უნიკოდები

//9.3

function inRange(n, min, max){
    return min <= n <= max;
}

console.log(inRange(4, 2, 7));

//9.4

function maxOfThree(a, b, c){
    const max = c;
    if (a > max) max = a;
    if (b > max) max = b;
    return max;   
}

console.log(maxOfThree(4, 6, 8));

//9.5

console.log(NaN === NaN); 
//აბრუნებს false–ს 

function isReallyNaN(x){
    return Number.isNaN(x);
}
console.log(isReallyNaN(NaN));

//9.6

console.log({a: 1} === {a: 1});
//false არის იმიტომ, რომ განსხვავებული რეფერენსები აქვთ

function shallowEqual (obj1, obj2){
    return obj1.length === obj2.length;
}

console.log(shallowEqual({a: 1}, {a: 1}));