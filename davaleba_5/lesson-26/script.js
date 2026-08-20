//26.1

const addArrow = (a, b) => a + b;
const doubleArrow = n => n * 2;
const sayHiArrow = () => "hi";
console.log(addArrow(2, 3), doubleArrow(4), sayHiArrow());

//26.2

const makeObj = n => ({ value: n });
// ფრჩხილები აუცილებელია, რათა JS `{}` აღიქვას ობიექტად და არა ფუნქციის ტანად
console.log(makeObj(5));

//26.3

const nums26 = [1, 2, 3, 4, 5];
const res26 = nums26.filter(n => n % 2 === 0).map(n => n * n);
console.log(res26);

//26.4

const multiplyCurry = a => b => a * b;
console.log(multiplyCurry(3)(4));

//26.5

const obj = {
  name: "ტესტი",
  regular: function() { return this.name; },
  arrow: () => this.name
};

console.log(objThisTest.regular(), objThisTest.arrow());
