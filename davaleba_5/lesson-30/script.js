//30.1

function makeCounter() {
  let count = 0;
  return () => ++count;
}

console.log(makeCountercounter());

//30.2

function makeGreeter(greeting) {
  return name => `${greeting}, ${name}`;
}
const hi = makeGreeter("gamarjoba");
console.log(hi("elene"));

//30.3

function makeMultiplier(factor) {
  return n => n * factor;
}
const doubleNum = makeMultiplier(2);
const tripleNum = makeMultiplier(3);
console.log( doubleNum(5), tripleNum(5));