//22.1

console.log(["გიორგი", "ანა", "დავითი"].sort());

//22.2

const sortedWithoutComparator = [10, 1, 5, 100, 25].sort();
//კომპარატორის გარეშე ელემენტები გარდაიქმნება სტრიქონებად და სორტირდება UTF-16 კოდების მიხედვით
console.log(sortedWithoutComparator);

//22.3

const nums = [10, 1, 5, 100, 25];
const zrdadobiti = [...nums].sort((a, b) => a - b);
const klebadi = [...nums].sort((a, b) => b - a);
console.log("ზრდადობით:", zrdadobiti, "| კლებადობით:", klebadi);

//22.4

const products = [{ price: 50 }, { price: 20 }, { price: 100 }];
products.sort((a, b) => a.price - b.price);
console.log(products);

//22.5

const users = [
  { name: "ანა", age: 25 },
  { name: "გიორგი", age: 30 },
  { name: "ლუკა", age: 30 }
];
users.sort();
users.sort((a, b) => b.age - a.age);
console.log(users);

//22.6 ??

function sortedCopy(arr) {
    return [...arr].sort
}


