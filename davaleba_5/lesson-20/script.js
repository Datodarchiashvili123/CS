//20.1

const sum = [1, 2, 3, 4].reduce((i, j) => i + j, 0);
console.log(sum); 

//20.2

const prod = [1, 2, 3, 4].reduce((i, j) => i * j, 1);
console.log(prod);

//20.3

const max = [5, 12, 3, 89, 2].reduce((i, j) => j > i ? j : i);
console.log(max);

//20.4

const cart = [
  { name: "პური", price: 2.5, qty: 2 },
  { name: "რძე", price: 3.2, qty: 1 },
  { name: "ყველი", price: 12, qty: 3 }
];

console.log(cart.reduce((i, j) => i + j.price * j.qty, 0));

//20.5 ??

// const str = "banana";
// const strFreq = str.split("").reduce((i, j) => {
//     i[j] = 
// }

// console.log();

//20.6 - 20.8 ver vaketeb

const people = [
  { name: "elene", city: "tbilisi" },
  { name: "natali", city: "batumi" },
  { name: "nino", city: "tbilisi" }
];

function groupBy(arr, key){
    arr.reduce
}