//1

let firstName: string = "elene";
let age: number = 19;
let isStudent: boolean = true;

//2

function sum(a: number, b: number): number {
  return a + b;
}

sum(2, 3);

//3

let name1: string = "elene";
let age1: number = 19;
let isActive: boolean = true;
let skills: string[] = ["HTML", "CSS", "JavaScript"];
let scores: number[] = [95, 99, 100];

//4

let name2 = "Davit"; // string
let age2 = 30; // number
let active = true; // boolean

// სხვა ტიპის მინიჭების მცდელობა გამოიწვევს შეცდომას
// მაგალითად name = 30 - Error: Type 'number' is not assignable to type 'string'.
// age = "Davit" - Error: Type 'string' is not assignable to type 'number'.

//5

let value: any;

value = "Hello";
value = 10;
value = true;

let data: unknown;

data = "Hello";
data = 10;
data = true;

// განსხვავება ის არის, რომ any თიშავს ტიპის შემოწმებას და გვაძლევს მეთოდების გამოძახების უფლებას შემოწმების გარეშე
// unknown კი პირიქით, არ გვაძლევს საშალებას გამოვიყენოთ მეთოდები ტიპის წინასწარი შემოწმების გარეშე

//6

function str(val: unknown): void {
  if (typeof val === "string") {
    console.log("Hello");
  }
}
str("ele");

//7

let numbers: number[] = [10, 20, 30, 40, 50];

numbers.push(60);

numbers.pop();

for (const num of numbers) {
  console.log(num);
}

//8

let frameworks: string[] = ["Angular", "React", "Vue", "Svelte"];

for (const item of frameworks) {
  console.log(item);
}

//9

const user: { name: string; age: number; email: string; isActive: boolean } = {
  name: "elene",
  age: 19,
  email: "elene.margvelidze@gmail.com",
  isActive: true
};

//10

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const user1: User = {
  id: 1,
  name: "elene",
  age: 19,
  email: "elene.margvelidze@gmail.com"
};

const user2: User = {
  id: 2,
  name: "nata",
  age: 20,
  email: "natali.mghebrishvili@gmail.com"
};

//11

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function printProductInfo(product: Product): void {
  console.log(`${product.name}: ${product.price}`);
}

//12

type Product1 = {
  id: number;
  title: string;
  price: number;
};

const singleProduct: Product1 = {
  id: 1,
  title: "Laptop",
  price: 2400
};

//13

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  company: string;
  salary: number;
}

const employee: Employee = {
  name: "elene",
  age: 19,
  company: "Meta Platforms",
  salary: 100000
};

//14

interface User1 {
  name: string;
  age: number;
  gmail?: string; 
}

const userWithEmail: User1 = {
  name: "elene",
  age: 19,
  gmail: "elene.margvelidze@gmail.com"
};

const userWithoutEmail: User1 = {
  name: "nata",
  age: 20
};

//15

interface Product2 {
  readonly id: number;
  title: string;
  price: number;
}

const item: Product2 = {
  id: 1,
  title: "Phone",
  price: 5000
};

// id-ის შეცვლის მცდელობა გამოიწვევს შეცდომას:
// Error: Cannot assign to 'id' because it is a read-only property.

//16

type ID = string | number;

let id1: ID = 1;
let id2: ID = "a";
let id3: ID = 5;

//17

function printId(id: string | number): void {
  console.log(`${id}`);
}

printId(7);

//18

type Status = "loading" | "success" | "error";

let currentStatus: Status = "loading";
currentStatus = "success";

//19

type Person1 = {
  name: string;
  age: number;
};

type Employee1 = {
  company: string;
  salary: number;
};

type EmployeePerson = Person1 & Employee1;

const fullEmployeeDetails: EmployeePerson = {
  name: "elene",
  age: 19,
  company: "Meta",
  salary: 100000
};

//20

function isAdult(age: number): boolean {
  return age >= 18;
}

isAdult(19);

//21

function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

getFullName("elene", "margvelidze");

//22

function greet(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`${name}, ${age}`);
  } else {
    console.log(`${name}`);
  }
}

greet("elene", 19);

//proeqti

type ID1 = string | number;
type Status1 = "loading" | "success" | "error";
type Address = {
    country: string;
    city: string;
};

interface User3 {
    id: ID1;
    name: string;
    gmail: string;
}

interface Product3 {
    readonly id: ID1;
    title: string;
    price: number;  
}

const products: Product3[] = [];

function addProduct(product: Product3): void{
    products.push(product);
    console.log(`${product.title}`)
}

function findProductById(id: ID1): Product3 | undefined {
  return products.find((p) => p.id === id);
}

function printProductDetails(product: Product3): void {
  console.log(`${product.id}`);
  console.log(`${product.title}`);
  console.log(`$${product.price}`);
};

