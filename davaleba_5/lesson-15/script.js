//15.1

let i = 1;
while(i<=10) {console.log(i); i++};

//15.2

let num = 10;
do {
    console.log("დაიბეჭდა ერთხელ მაინც", num)
} while (num < 5);

//15.3

function countDigits(n){
    n = Math.abs(n);
    if (n===0) return 1;
    let count = 0;
    while (n>0){
        count++;
        n = Math.floor(n/10);
    }
    return count;
}

console.log(countDigits(23));

//15.4

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
console.log(gcd(48, 18)); 

//15.5

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
console.log(gcd(48, 18)); 

//15.7




