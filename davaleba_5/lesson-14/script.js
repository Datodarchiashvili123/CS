//14.1

for (let i = 1; i <= 20; i++) console.log(i);

//14.2

for (let i = 100; i >= 1; i -= 5) console.log(i);

//14.3

let jami = 0;
for (let i = 1; i <= 100; i++) jami += i;

console.log(jami);

//14.4

for(let i = 1; i <= 10; i++) console.log(7 * i);

//14.5

function factorial(n){
    let x = 1
    for (let i = 1; i <= n; i++) x *= i;
    return x;
}

console.log(factorial(3));

//14.6

const star =[
    ["*"],
    ["**"],
    ["***"],
    ["****"],
    ["*****"],

]

for (let i = 0; i < star.length; i++){
    for(let j = 0; j < star[i].length; j++){
        console.log(star[i][j]);
    }
}

//14.7

let row = [1,2,3,4,5,6,7,8,9,10];
let col = [1,2,3,4,5,6,7,8,9,10];
let matrix=[];

for(let i = 0; i < row.length; i++){
    for(let j = 0; j < col.length; j++){
        matrix.push(row[i] * row[j]);
    }
}

console.table(matrix);

// 🔴 14.8 დაწერე ფუნქცია primesUpTo(n), რომელიც აბრუნებს ყველა მარტივი რიცხვის მასივს n-მდე.




//14.9

const rows = 7;
const mid = Math.floor(rows / 2);
for (let i = 0; i < rows; i++) {
  const spaces = Math.abs(mid - i);
  const stars = rows - 2 * spaces;
  console.log(" ".repeat(spaces) + "*".repeat(stars));
}





