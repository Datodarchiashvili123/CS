//10.1

//falsy - 0, "", null, undefined, NaN, false
//truthy - "0", " ", "false", -1, 1

console.log(Boolean(0));
console.log(Boolean("0"));
console.log(Boolean(""));
console.log(Boolean(" "));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(false));
console.log(Boolean("false"));
console.log(Boolean(-1));
console.log(Boolean(1));

//10.2

console.log(!!"hello");
console.log(!!"");
console.log(!!0);
console.log(!!42);
console.log(!!null);
console.log(!!undefined);
console.log(!!NaN);

//10.3

let userInput = "";
let name = userInput || "სტუმარი";

console.log(name);

// "||" არის ლოგიკური OR ოპერატორი, იგი ბეჭდავს მნიშვნელობას, რომელიც არის truthy, ამიტომ დაბეჭდა "სტუმარი".

userInput = "ნიკა"
name = userInput || "სტუმარი";

console.log(name);

// ცარიელი "" მნიშვნელობა ჩაანაცვლა "ნიკა"–მ, ამიტომ დაიბეჭდა ნიკა.

//10.4

let count = 0;

console.log(count || 10); // 0 არის false მნიშვნელობა, || კი OR ოპერატორი, ამიტომ დაიბეჭდა 10.

console.log(count ?? 10); // ?? ბეჭდავს მხოლოდ null-სა და undefined–ს, ამიტომ დაიბეჭდა 0.

//10.5

console.log("a" && "b");

console.log("" && "b");

console.log(0 && 5);

console.log(1 && 5);

// && ბეჭდავს falsy მნიშვნელობას, თუ ყველა მნიშვნელობა truthy-ა, მაშინ აბრუნებს ყველაზე ბოლოს მდგომ მნიშვნელობას.
// || ბეჭდავს truthy მნიშნელობას, თუ ყველა მნიშვნელობა falsy-ა, მაშინ აბრუნებს ყველაზე ბოლოს მდგომ მნიშვნელობას.