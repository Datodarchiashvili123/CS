//27.1

function greetWithDefault(name = "elene") { 
    return `გამარჯობა, ${name}`; 
}
console.log(greetWithDefault(), greetWithDefault("nata"));

//27.2

function power(base, exp = 2) { 
    return base ** exp; 
}
console.log( power(5), power(2, 3));

//27.3

function sum(...numbers) { 
    return numbers.reduce((i, j) => i + j, 0); 
}
console.log(sum(1, 2, 3, 4, 5));

//27.4

function createUser({ name, age = 18, city = "tbilisi" }) {
  return { name, age, city };
}
console.log(createUser({ name: "elene" }));

//27.5

function logAll(first, ...rest) {
  return { first, rest };
}
console.log(logAll(1, 2, 3, 4, 5));

//27.6

function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i <= end; i += step) result.push(i);
  return result;
}
console.log(range(1, 10, 2));

//27.7 ????