"use strict";
//1
let firstName = "elene";
let age = 19;
let isStudent = true;
//2
function sum(a, b) {
    return a + b;
}
sum(2, 3);
//3
let name1 = "elene";
let age1 = 19;
let isActive = true;
let skills = ["HTML", "CSS", "JavaScript"];
let scores = [95, 99, 100];
//4
let name2 = "Davit"; // string
let age2 = 30; // number
let active = true; // boolean
// სხვა ტიპის მინიჭების მცდელობა გამოიწვევს შეცდომას
// მაგალითად name = 30 - Error: Type 'number' is not assignable to type 'string'.
// age = "Davit" - Error: Type 'string' is not assignable to type 'number'.
//5
let value;
value = "Hello";
value = 10;
value = true;
let data;
data = "Hello";
data = 10;
data = true;
// განსხვავება ის არის, რომ any თიშავს ტიპის შემოწმებას და გვაძლევს მეთოდების გამოძახების უფლებას შემოწმების გარეშე
// unknown კი პირიქით, არ გვაძლევს საშალებას გამოვიყენოთ მეთოდები ტიპის წინასწარი შემოწმების გარეშე
//6
function str(val) {
    if (typeof val === "string") {
        console.log("Hello");
    }
}
str("ele");
//7
let numbers = [10, 20, 30, 40, 50];
numbers.push(60);
numbers.pop();
for (const num of numbers) {
    console.log(num);
}
//8
let frameworks = ["Angular", "React", "Vue", "Svelte"];
for (const item of frameworks) {
    console.log(item);
}
//9
const user = {
    name: "elene",
    age: 19,
    email: "elene.margvelidze@gmail.com",
    isActive: true
};
const user1 = {
    id: 1,
    name: "elene",
    age: 19,
    email: "elene.margvelidze@gmail.com"
};
const user2 = {
    id: 2,
    name: "nata",
    age: 20,
    email: "natali.mghebrishvili@gmail.com"
};
function printProductInfo(product) {
    console.log(`${product.name}: ${product.price}`);
}
const singleProduct = {
    id: 1,
    title: "Laptop",
    price: 2400
};
const employee = {
    name: "elene",
    age: 19,
    company: "Meta Platforms",
    salary: 100000
};
const userWithEmail = {
    name: "elene",
    age: 19,
    gmail: "elene.margvelidze@gmail.com"
};
const userWithoutEmail = {
    name: "nata",
    age: 20
};
const item = {
    id: 1,
    title: "Phone",
    price: 5000
};
let id1 = 1;
let id2 = "a";
let id3 = 5;
//17
function printId(id) {
    console.log(`${id}`);
}
printId(7);
let currentStatus = "loading";
currentStatus = "success";
const fullEmployeeDetails = {
    name: "elene",
    age: 19,
    company: "Meta",
    salary: 100000
};
//20
function isAdult(age) {
    return age >= 18;
}
isAdult(19);
//21
function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}
getFullName("elene", "margvelidze");
//22
function greet(name, age) {
    if (age !== undefined) {
        console.log(`${name}, ${age}`);
    }
    else {
        console.log(`${name}`);
    }
}
greet("elene", 19);
const products = [];
function addProduct(product) {
    products.push(product);
    console.log(`${product.title}`);
}
function findProductById(id) {
    return products.find((p) => p.id === id);
}
function printProductDetails(product) {
    console.log(`${product.id}`);
    console.log(`${product.title}`);
    console.log(`$${product.price}`);
}
;
