//16.1

for (let i = 1; i <= 50; i++){
    if (i % 3 === 0) continue;
    console.log(i)
}

//16.2

const nums = [14, 32, 107, 309, 345];
for (let i of nums){
    if (i > 100){
        console.log(i); break;
    }
}

//16.3 ar gamodis

// const arr = [-9, -4, -2, 5, 6];
// function findFirstNegativeIndex(arr){
//     for (let i = 1; i < 6; i++){
//         if(i<0){
//             return i;
//         }
//         return -1;
//     } 
// }

//16.4

function isPrime(n) {
  if (n <= 1) return false;
  let flag = true;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

console.log(isPrime(5))

//16.5 outer lable ar vicodi amitom AI davixmare

outer: for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    if (i * j === 24) {
      console.log(`ნაპოვნია წყვილი: i=${i}, j=${j}`);
      break outer;
    }
  }
}

//16.6

const matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];

function findInMatrix(matrix, target) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) return { row, col };
    }
  }
  return null;
}

console.log(findInMatrix(matrix, 5));




