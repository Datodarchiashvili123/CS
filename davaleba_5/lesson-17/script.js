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

let nums = [10, 20, 30, 40, 50];

nums[2] = 99;
console.log(nums);

//17.4

const numbs = [1, 2, 3, 4];

function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) sum += arr[i];
  return sum;
}

console.log(sumArray(numbs));

//17.5

const arr = [2, 4, 6, 8]

function minMax(arr){
  let min = arr[0], max = arr[0];
  for (let num of arr){
    if (num < min) min = num;
    if (num > max) max = num;
  }
  return {min, max}
}

console.log(minMax(arr));


//17.6

function reverseArray(arr) {
  const reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

const original = [1, 2, 3];
console.log(reverseArray(original)); 

//17.7

function unique(arr){
    const result = [];
    for (let item of arr) {
        if (!result.includes(item)) result.push(item);
    }
    return result;
}

console.log(unique([1, 2, 2, 3, 4, 4, 4]));

//17.8-17.9 ver vaketeb