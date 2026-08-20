//31.1

const person = {
  name: "elene",
  sayName() { 
    return this.name; 
}
};
console.log(person.sayName());

//31.2

function testThis() { 
    return this; 
}
console.log(typeof this !== "undefined");

//31.3

const detached = person.sayName;
const bound = person.sayName.bind(person);
console.log(detached(), bound());