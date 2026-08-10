const username = "elene";
const age = 19;
const email = "elene.margvelidze@gmail.com"
const password = "1234567";

const validUsername = username.trim().length > 0;
const validAge = age > 18;
const validPassword = password.length >= 8;
const allValid = validUsername && validAge && validPassword;

console.log(validUsername);
console.log(validAge);
console.log(validPassword);
console.log(allValid);
