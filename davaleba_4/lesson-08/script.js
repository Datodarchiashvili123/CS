//8.1

console.log(Math.round(4.5), Math.round(4.4));
console.log(Math.floor(4.9), Math.ceil(4.1));
console.log(Math.abs(-15))
console.log(Math.max(3, 9, 1), Math.min(3, 9, 1));
console.log(Math.sqrt(144));
console.log(2**8);

//8.2

let sum = 15.6789;
let res = sum.toFixed(2);

console.log(res, typeof res);

//8.3

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

//ასე იმიტომ ხდება, რომ პროგრამირების ნებისმიერი ენა, მათ შორის JavaScript–იც, ორობით ათწილადებს იყენებს. 0.1 და 0.2 კი ამ სისტემაში უსასრულო პერიოდული ათწილადებია. 
//იმისთვის, რომ ამ შეცდომას თავი ავარიდოთ შეგვიძლია გამოვიყენოთ toFixed() მეთოდი.

//8.4

console.log(Number("50px")); 
console.log(parseInt("50px")); 
console.log(parseFloat("3.75kg"));
console.log(parseInt("abc"));
console.log(Number(""));

//Number - გამოიყენება რიცხვებთან 
//parseInt - გამოიყენება იმ რიცხვებთან, რომლებსაც ბოლოში მოჰყვებათ სტრინგი
//parseFloat - გამოიყენება ათწილად რიცხვთან, რომელსაც ბოლოს სტრინგი მოჰყევბა

//8.5

console.log(Math.floor(Math.random() * 6) + 1);

//8.6

console.log(Number.isNaN("abc"));
//Number.isNaN ამოწმებს არის თუ არა მოცემული მნიშვნელობა Not a Number და მისი ტიპი Number