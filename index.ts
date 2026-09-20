//1
let name1: string = "Nata";
let age1: number = 20;
let isStudent1: boolean = true;

console.log(`Name: ${name1}, Age: ${age1}, Is Student: ${isStudent1}`);

//2
function sum(a: number, b: number): number {
  return a + b;
}

console.log(`Sum: ${sum(5, 10)}`);

//3
let name2: string = "Nata";
let age2: number = 20;
let isActive2: boolean = true;
let skills2: string[] = ["HTML", "CSS", "JavaScript"];
let scores2: number[] = [90, 85, 100];

//5
let value: any;
let data: unknown;

value = "Hello";
value = 123;
value = true;

data = "Hello";
data = 123;
data = true;

//6
function hello(value: unknown): void {
  if (typeof value === "string") {
    console.log("Hello");
  }
};
hello("Nata");

//7
let numbers: number[] = [1, 2, 3, 4, 5];
numbers.push(6);
numbers.pop();
for (const number of numbers) {
  console.log(number);
};

//8
let frameworks: string[] = ["Angular", "React", "Vue", "Svelte"];
for (const framework of frameworks) {
  console.log(framework);
};

//9
let user: {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
} = {
  name: "Nata",
  age: 30,
  email: "nata@gmail.com",
  isActive: true
};

//10
// interface User {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
// }

// const user1: User = {
//   id: 1,
//   name: "Nata",
//   age: 30,
//   email: "nata@gmail.com"
// };

// const user2: User = {
//   id: 2,
//   name: "Gio",
//   age: 25,
//   email: "gio@gmail.com"
// };

//11
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   inStock: boolean;
// }

// const product: Product = {
//   id: 1,
//   name: "Phone",
//   price: 1300,
//   inStock: true
// };

// function printProduct(product: Product): void {
//   console.log(product.name);
//   console.log(product.price);
// }

// printProduct(product);

//12
type Product2 = {
  id: number;
  title: string;
  price: number;
};

const product2: Product2 = {
  id: 1,
  title: "computer",
  price: 1700
};

console.log(product2);

//13
// interface Person {
//   name: string;
//   age: number;
// }

// interface Employee extends Person {
//   position: string;
//   salary: number;
// }

// const employee: Employee = {
//   name: "Nata",
//   age: 20,
//   position: "Developer",
//   salary: 2500
// };

// console.log(employee);

//14
// interface User {
//   name: string;
//   age: number;
//   email?: string;
// }

// const user1: User = {
//   name: "Nata",
//   age: 20,
//   email: "nata@gmail.com"
// };

// const user2: User = {
//   name: "Gio",
//   age: 25
// };

// console.log(user1);
// console.log(user2);

//15
interface Product {
  readonly id: number;
  title: string;
  price: number;
}

const product: Product = {
  id: 1,
  title: "Laptop",
  price: 1500
};

product.id = 2;

//16
type ID = string | number;

const id1: ID = 123;
const id2: ID = "NATA123";
const id3: ID = 800;

//17
//ver vwer
//18
//ver vwer

//19
type Person = {
  name: string;
  age: number;
};

type Employee = {
  company: string;
  salary: number;
};

type PersonEmployee = Person & Employee;

const employee: PersonEmployee = {
  name: "Nata",
  age: 20,
  company: "Microsoft",
  salary: 5000
};

console.log(employee);

//20
function isAdult(age: number): boolean {
  return age >= 18;
}

console.log(isAdult(20));
console.log(isAdult(22));

//21
function getFullName(firstName: string, lastName: string): string {
  return firstName + " " + lastName;
}

console.log(getFullName("Nata", "Mghebrishvili"));

//22
function greet(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(name + " " + age);
  } else {
    console.log(name);
  }
}

greet("Nata", 20);
greet("Gio");

//didi davaleba
