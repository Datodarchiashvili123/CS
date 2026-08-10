const player1 = Math.floor(Math.random() * 6) + 1;
const player2 = Math.floor(Math.random() * 6) + 1;

const player1isWinner = player1 > player2;
const player2isWinner = player2 > player1;
const Tie = player1 === player2;

console.log(`პირველი მოთამაშის ქულა: ${player1}`);
console.log(`მეორე მოთამაშის ქულა: ${player2}`);
console.log(`"მოიგო პირველმა მოთამაშემ:" ${player1isWinner}`);
console.log(`"მოიგო მეორე მოთამაშემ:" ${player2isWinner}`);
console.log(`"თამაში დასრულდა ფრე:" ${Tie}`);