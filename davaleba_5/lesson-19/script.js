//19.1

const squares = [1, 2, 3, 4, 5].map(n => n ** 2);
console.log(squares); 

//19.2

const evens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n % 2 === 0);
console.log(evens); 

//19.3

const names = ["ანა", "გიორგი"];
console.log(names.map(name => name.toUpperCase()));

//19.4

const products = [

  { name: "კლავიატურა", price: 120, inStock: true },

  { name: "მაუსი", price: 45, inStock: false },

  { name: "მონიტორი", price: 550, inStock: true },

  { name: "ყურსასმენი", price: 80, inStock: true }

];

const productNames = products.map(p => p.name);
const available = products.filter(p => p.inStock);
const discounted = products.map(p => ({ ...p, price: p.price * 0.8 }));
const filteredNames = products.filter(p => p.inStock && p.price > 100);
products.map(p => p.name);

console.log(productNames);
console.log(available);
console.log(discounted);
console.log(filteredNames);

//19.5

const f = ["ვაშლი", "მსხალი", "ატამი"].map((item, idx) => `${idx + 1}: ${item}`);
console.log(f); 

//19.6–7 ვერ ვაკეთებ