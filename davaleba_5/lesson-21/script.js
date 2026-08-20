//21.1

const arr = ["a", "b", "c"];
console.log(arr.indexOf("b")); 
console.log(arr.includes("c")); 

//21.2

const firstOverTen = [2, 5, 12, 4, 20].find(n => n > 10);
console.log(firstOverTen);

//21.3

const users = [{ id: 101, name: "ანა" }, { id: 102, name: "გიო" }];
const idx = users.findIndex(u => u.id === 102);
console.log(idx); 

//21.4

const list = [1, 5, 10, 15];

const found = list.find(n => n > 5); // pirvelives abrunebs     
const filtered = list.filter(n => n > 5); // ramac piroba daakmayofila yvelas abrunebs

console.log("find result:", found, typeof found); 
console.log("filter result:", filtered, Array.isArray(filtered));

//21.5

function searchByName(users, query) {
  const q = query.toLowerCase();
  return users.filter(u => u.name.toLowerCase().includes(q));
}

console.log(searchByName([{ name: "elene" }, { name: "natali" }], "el")); 

//21.6

function findLastIndex(arr, callback) {
  for (let i = arr.length - 1; i >= 0; i--){
    return i;
  }
}

console.log(findLastIndex([1,2,3,4,5,6]));

//callback rashi gvwirdeba ver mivxvdi

//21.7 arvici rogor davwero ??

function binarySearch(sortedArr, target){

}