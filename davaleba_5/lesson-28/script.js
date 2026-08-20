//28.1

const origArr = [1, 2, 3];
const copyArr = [...origArr];
copyArr.push(99);

console.log(origArr, copyArr);

//28.2

const arr1 = [1, 2], arr2 = [3, 4], arr3 = [5, 6];

console.log([...arr1, ...arr2, ...arr3]);

//28.3

const baseArr = [1, 2, 5, 6];
const inserted = [...baseArr.slice(0, 2), 3, 4, ...baseArr.slice(2)];

console.log(inserted);

//28.4

const user = { name: "elene", city: "tbilisi" };

console.log({ ...user, city: "batumi" });

//28.5

const numbersList = [12, 45, 2, 89, 34];

console.log(Math.max(...numbersList));

//28.6

const str = "gamarjoba";

console.log([...str]);

//28.7

const [firstItem, ...otherItems] = [1, 2, 3, 4, 5];
const { name, ...restProps } = { name: "elene", age: 19, city: "tbilisi" };

console.log(firstItem, otherItems, restProps);

//28.8 

const origobj = { a: 1, b: { c: 2 } };
const spreadobj = { ...origobj };

console.log(origobj, spreadobj);

//28.9 ????

function mergeDeep(a, b){

}