const user1 = {
    id: 1,
    name: "elene",
    email: "elene@gmail.com",
    age: 19
};
const user2 = {
    id: 2,
    name: "nata",
    email: "nata@gmail.com",
    age: 20
};
const car1 = { brand: "Tesla", model: "Model 3", year: 2023, isElectric: true };
const car2 = { brand: "BMW", model: "M5", year: 2021, isElectric: false };
const car3 = { brand: "Nissan", model: "Leaf", year: 2020, isElectric: true };
const userA = { name: "elene", age: 19, email: "elene@gmail.com" };
const userB = { name: "nino", age: 20, email: "nino@gmail.com" };
const products = [
    { id: 1, title: "Laptop", price: 2500 },
    { id: 2, title: "Mouse", price: 50 }
];
const flexUser1 = { id: 101, name: "elene" };
const flexUser2 = { id: 102, name: "nata", email: "nata@gmail.com" };
const flexUser3 = { id: 103, name: "nino", phone: "555555555" };
//7
// flexUser1.id = 105; 
// shecdoma: Cannot assign to 'id' because it is a read-only property.
//8
let id;
id = 101; //number
id = "usr_101"; //string
//9
function printId(id) {
    console.log(`${id}`);
}
printId(5);
printId("ABC-123");
//10
let role;
role = "admin"; // სწორია
role = "user"; // სწორია
function handleStatus(status) {
    console.log(`${status}`);
}
handleStatus("success");
const worker = {
    name: "elene",
    age: 19,
    company: "Tech",
    salary: 1000000
};
//13
function add(a, b) {
    return a + b;
}
//14
function isAdult(age) {
    return age >= 18;
}
//15
function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}
//16
function createUser(name, age, email) {
    return { name, age, email };
}
//17
function registerUser(name, phone) {
    if (phone) {
        return `${name}: ${phone}`;
    }
    return `${name}: ...`;
}
//18
let value = "Hello TypeScript";
function processValue(val) {
    if (typeof val === "string") {
        console.log(`${val.length}`);
    }
    else {
        console.log(`${val}`);
    }
}
processValue(value);
//19
function formatInput(input) {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return input * 2;
}
function isAdmin(person) {
    return "adminCode" in person;
}
//21
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Moderator"] = 2] = "Moderator";
})(Role || (Role = {}));
const userAccount = {
    username: "elene",
    role: Role.Admin
};
//22
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "PENDING";
    OrderStatus["Shipped"] = "SHIPPED";
    OrderStatus["Delivered"] = "DELIVERED";
    OrderStatus["Cancelled"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
const myOrder = {
    orderId: 777,
    status: OrderStatus.Pending
};
//23
function identity(arg) {
    return arg;
}
const strVal = identity("Hello");
const numVal = identity(1);
const boolVal = identity(true);
//24
function getFirstElement(arr) {
    return arr[0];
}
const firstNum = getFirstElement([1, 2, 3]);
const firstStr = getFirstElement(["a", "b", "c"]);
const firstBool = getFirstElement([true, false]);
const userResponse = {
    data: { id: 1, name: "elene" },
    success: true,
    message: "monacemebi chatvirtulia"
};
//26
function getLength(item) {
    return item.length;
}
console.log(getLength("elene"));
console.log(getLength([10, 20, 30]));
//27
function printEntityId(entity) {
    console.log(`Entity ID: ${entity.id}`);
}
printEntityId({ id: 1, name: "elene" });
printEntityId({ id: "e_99", price: 150 });
printEntityId({ id: 500, status: "active" });
export {};
