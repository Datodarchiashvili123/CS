//კამათლის თამაში
let player1 = Math.floor(Math.random() * 6) + 1;
let player2 = Math.floor(Math.random() * 6) + 1;

console.log("მოთამაშე 1:", player1);
console.log("მოთამაშე 2:", player2);

console.log("1 შენ გაიმარჯვე:", player1 > player2);
console.log("2 შენ გაიმარჯვე:", player2 > player1);
console.log("ფრეა:", player1 === player2);