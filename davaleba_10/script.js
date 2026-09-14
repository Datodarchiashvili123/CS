//1

const numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5];
console.log([...new Set(numbers)]);

//2

const fruits = new Set(["apple", "banana", "orange"]);

fruits.add("mango");

console.log(fruits)

//3

const users = new Set(["Davit", "Nika", "Giorgi"]);

console.log(users.has("Nika"));
console.log(users.has("Luka"));

//4

const nums = new Set([10, 20, 30, 40]);

nums.delete(30);

console.log(nums);

//5

const fruit = new Set([
  "apple",
  "banana",
  "apple",
  "orange",
  "banana"
]);

console.log(fruit.size);

//6

const colors = new Set(["red", "green", "blue"]);

colors.forEach(color => {
  console.log(color);
});

//7

const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

console.log(new Set([...arr1, ...arr2]));

//8  ეს არ ვიცოდი დავსერჩე 

const arra1 = [1, 2, 3, 4, 5];
const arra2 = [4, 5, 6, 7, 8];

console.log(...new Set(arr1).intersection(new Set(arr2)));

//9 ვერ ვაკეთებ 

const num = [1, 2, 3, 2, 4, 5, 3, 6, 1];

//10

const word = "javascript";
const newWord = new Set(word);

console.log(newWord.size);

//11

const students = new Map([
    ["Davit", 95],
    ["Nika", 87],
    ["Giorgi", 76]
]);

console.log(students.get("Nika"));

//12

const users2 = new Map();

users2.set("Davit", 25);
users2.set("Nika", 30);
users2.set("Giorgi", 28);

console.log(users2);

//13

const scores = new Map([
  ["Davit", 90],
  ["Nika", 80],
  ["Giorgi", 70]
]);

scores.set("Nika", 100);

console.log(scores);

//14

const users3 = new Map([
  ["Davit", 25],
  ["Nika", 30]
]);

console.log(users3.has("Davit"));
console.log(users3.has("Giorgi"));

//15

const products = new Map([
  ["Laptop", 2500],
  ["Phone", 1500],
  ["Tablet", 1000]
]);

products.delete("Phone");

console.log(products);

//16

const countries = new Map([
  ["Georgia", "Tbilisi"],
  ["France", "Paris"],
  ["Germany", "Berlin"]
]);

console.log(countries.size);

//17

const students2 = new Map([
  ["Davit", 95],
  ["Nika", 88],
  ["Giorgi", 76]
]);

students2.forEach((score, name) => {
    console.log(`${name}: ${score}`);
});

//18 ver vaketeb

const scores2 = new Map([
  ["Math", 90],
  ["English", 80],
  ["Physics", 95]
]);

//console.log(...scores2.values().reduce)

//19 ver vaketeb

const students3 = new Map([
  ["Davit", 85],
  ["Nika", 98],
  ["Giorgi", 76],
  ["Luka", 91]
]);

//20

const user = {
  name: "Davit",
  age: 28,
  city: "Tbilisi"
};

console.log(new Map(Object.entries(user)));

//21

const user2 = new Map([
  ["name", "Davit"],
  ["age", 28],
  ["city", "Tbilisi"]
]);

console.log(Object.fromEntries(user2));

//22-23??

const text = "apple banana apple orange banana apple";
//const newText = new Map(text);

//24

const users4 = [
  "Davit",
  "Nika",
  "Davit",
  "Giorgi",
  "Nika",
  "Luka"
];

const newUsers4 = new Set(users4);

for (const user of newUsers4){
  console.log(user);
}

//25 ver mivige sasurveli shedegi

const purchases = [
  { user: "Davit", product: "Laptop" },
  { user: "Nika", product: "Phone" },
  { user: "Davit", product: "Mouse" },
  { user: "Giorgi", product: "Laptop" },
  { user: "Nika", product: "Tablet" }
];

const newPurchases = new Map();

for(const {user, product} of purchases){
  newPurchases.set(user, new Set());
}

console.log(newPurchases);

//26 ??

const numbers2 = [5, 3, 8, 2, 3, 7, 8];

const newNumbers2 = new Set(numbers2);
console.log(newNumbers2);

//27-28???

const user1 = new Set([
  "Laptop",
  "Phone",
  "Mouse"
]);

const user3 = new Set([
  "Phone",
  "Tablet",
  "Mouse"
]);

console.log(...new Set(user1).intersection(new Set(user2)));