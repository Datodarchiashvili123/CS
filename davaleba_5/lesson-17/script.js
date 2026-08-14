//17.1

const fiveFruits = ["მარწყვი", "საზამთრო", "ბანანი", "ვაშლი", "ბალი"];

console.log(fiveFruits.length);
console.log(fiveFruits[0]);
console.log(fiveFruits[fiveFruits.length-1]);

//17.2

const fruits = ["მარწყვი", "საზამთრო", "ბანანი", "ვაშლი", "ბალი"];

fruits.push("ალუბალი");
fruits.unshift("ნესვი");
fruits.pop();
fruits.shift();

console.log(fruits);

//17.3

const nums = [10, 20, 30, 40, 50];

nums[2] = 99;
console.log(nums);