export {};
//1

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const user1: User = {
  id: 1,
  name: "elene",
  email: "elene@gmail.com",
  age: 19
};

const user2: User = {
  id: 2,
  name: "nata",
  email: "nata@gmail.com",
  age: 20
};

//2

interface Car {
  brand: string;
  model: string;
  year: number;
  isElectric: boolean;
}

const car1: Car = { brand: "Tesla", model: "Model 3", year: 2023, isElectric: true };
const car2: Car = { brand: "BMW", model: "M5", year: 2021, isElectric: false };
const car3: Car = { brand: "Nissan", model: "Leaf", year: 2020, isElectric: true };

//3

type UserType = {
  name: string;
  age: number;
  email: string;
};

const userA: UserType = { name: "elene", age: 19, email: "elene@gmail.com" };
const userB: UserType = { name: "nino", age: 20, email: "nino@gmail.com" };

//4

type Product = {
  id: number;
  title: string;
  price: number;
};

type ProductList = Product[];

const products: ProductList = [
  { id: 1, title: "Laptop", price: 2500 },
  { id: 2, title: "Mouse", price: 50 }
];

//5

interface ItemInterface {
  id: number;
  name: string;
  price: number;
}

interface ItemInterface {
  inStock: boolean;
}

type ItemType = {
  id: number;
  name: string;
  price: number;
};

type ExtendedItemType = ItemType & {
  inStock: boolean;
};

//6

interface FlexibleUser {
  readonly id: number;
  name: string;
  email?: string;
  phone?: string;
}

const flexUser1: FlexibleUser = { id: 101, name: "elene" };
const flexUser2: FlexibleUser = { id: 102, name: "nata", email: "nata@gmail.com" };
const flexUser3: FlexibleUser = { id: 103, name: "nino", phone: "555555555" };

//7

// flexUser1.id = 105; 
// shecdoma: Cannot assign to 'id' because it is a read-only property.

//8

let id: number | string;

id = 101; //number
id = "usr_101"; //string

//9

function printId(id: string | number): void {
  console.log(`${id}`);
}

printId(5);
printId("ABC-123");

//10

let role: "admin" | "user" | "moderator";

role = "admin"; // სწორია
role = "user"; // სწორია
// sxva rolze shecdomas agdebs: Type '"superadmin"' is not assignable to type '"admin" | "user" | "moderator"'.

//11

type Status = "pending" | "success" | "error";

function handleStatus(status: Status): void {
  console.log(`${status}`);
}

handleStatus("success");

//12

type Person = {
  name: string;
  age: number;
};

type Employee = {
  company: string;
  salary: number;
};

type EmployeePerson = Person & Employee;

const worker: EmployeePerson = {
  name: "elene",
  age: 19,
  company: "Tech",
  salary: 1000000
};

//13
function add(a: number, b: number): number {
  return a + b;
}

//14
function isAdult(age: number): boolean {
  return age >= 18;
}

//15
function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

//16

function createUser(name: string, age: number, email: string): { name: string; age: number; email: string } {
  return { name, age, email };
}

//17

function registerUser(name: string, phone?: string): string {
  if (phone) {
    return `${name}: ${phone}`;
  }
  return `${name}: ...`;
}

//18

let value: string | number = "Hello TypeScript";

function processValue(val: string | number): void {
  if (typeof val === "string") {
    console.log(`${val.length}`);
  } else {
    console.log(`${val}`);
  }
}

processValue(value);

//19

function formatInput(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  }
  return input * 2;
}

//20

interface RegularUser {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  adminCode: string;
}

function isAdmin(person: RegularUser | Admin): person is Admin {
  return "adminCode" in person;
}

//21

enum Role {
  Admin,
  User,
  Moderator
}

const userAccount = {
  username: "elene",
  role: Role.Admin
};

//22

enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

const myOrder = {
  orderId: 777,
  status: OrderStatus.Pending
};

//23

function identity<T>(arg: T): T {
  return arg;
}

const strVal = identity<string>("Hello");
const numVal = identity<number>(1);
const boolVal = identity<boolean>(true);

//24

function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirstElement<number>([1, 2, 3]);
const firstStr = getFirstElement<string>(["a", "b", "c"]);
const firstBool = getFirstElement<boolean>([true, false]);

//25

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: "elene" },
  success: true,
  message: "monacemebi chatvirtulia"
};

//26

function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("elene"));
console.log(getLength([10, 20, 30]));

//27

function printEntityId<T extends { id: number | string }>(entity: T): void {
  console.log(`Entity ID: ${entity.id}`);
}

printEntityId({ id: 1, name: "elene" });
printEntityId({ id: "e_99", price: 150 });
printEntityId({ id: 500, status: "active" });

//28

interface FullUser {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

type PartialUser = Partial<FullUser>;

//29

type UserContactInfo = Pick<FullUser, "name" | "email">;

//30

type UserWithoutPassword = Omit<FullUser, "password">;

//31

type ImmutableUser = Readonly<FullUser>;