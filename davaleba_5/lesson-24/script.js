//24.1

const sampleObj = { a: 1, b: 2 };
console.log("Keys:", Object.keys(sampleObj), "Values:", Object.values(sampleObj), "Entries:", Object.entries(sampleObj));

//24.2

const calculator = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};
console.log("Add:", calculator.add(4, 5), "| Multiply:", calculator.multiply(4, 5));

//24.3

const kvObj = { x: 10, y: 20 };
const kvArr = [];
Object.entries(kvObj).forEach(([key, val]) => kvArr.push(`${key} = ${val}`));
console.log(kvArr.join(", "));

//24.4

const scores = { math: 85, physics: 92, chemistry: 78 };
const vals = Object.values(scores);
const sumScores = vals.reduce((acc, curr) => acc + curr, 0);
console.log( sumScores, sumScores / vals.length);

//24.5

const o1 = { a: 1, b: 2 }, o2 = { b: 99, c: 3 };
const merged = { ...o1, ...o2 };
// დუბლირებული გასაღები b გადაიფარება ბოლო ობიექტის მნიშვნელობით - 99.
console.log(merged);

//24.6

const frozenObj = Object.freeze({ x: 10 });
frozenObj.x = 20;
console.log(frozenObj);

//24.7 ??
