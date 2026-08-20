//29.1

let block;
{
  let blockLet = 10;
  block = "blokshi wvdomadia";
}
// blockLet ბლოკის გარეთ მიუწვდომელია
console.log(block);

//29.2

{
  var blockVar = "var blokis garet wvdomadia";
}
console.log(blockVar);

//29.3

let scopeVar = "global";
function checkScope() {
  let scopeVar = "local";
  return scopeVar;
}
console.log(checkScope());

//29.4

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}  
//dabewda 3, 3, 3 radgan var erti da imave cvlads bewdavs
//let dabewdavs sxvadasxvas - 0, 1, 2

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
} 

//29.5

let tdzStatus = "TDZ";
let tdzVar = 5;

console.log(tdzStatus, tdzVar);

//29.6