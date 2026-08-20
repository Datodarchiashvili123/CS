//18.1

const colors = ["წითელი", "ლურჯი", "მწვანე"];
console.log(colors.join(", "));

//18.2

const nums = [1, 4, 3, 7, 8, 2, 9];

console.log(nums.slice(2, 5)); //არ ცვლის ორიგინალს
console.log(nums.splice(2, 3)); //ცვლის ორიგინალს

//18.3

const fruits = ["banani", "vashli", "atami"];
console.log(fruits.includes("vashli"));

//18.4

const first = [2, 3, 4];
const second = [1, 5, 6];

console.log(first.concat(second));
console.log([...first, ...second]);

//igive shedegia

//18.5

const a = [1, 2, 3, 4];

function removeItem(arr, item) {
    const idx = arr.indexOf(item);
    if (idx !== -1){
        arr.splice(idx, 1);
    }
    return arr;
}

console.log(removeItem(a, 5));

//18.6

const f = ["vashli", "msxali", "atami"];
f.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`)
});

//18.7

const n = [1, 2, 3, 4, 5];

console.log(n.every(n => n>0));
console.log(n.some(n => n%2 === 0));

//18.8 ar gamodis 

const b = [1, 2, 3, 4, 5];

function insertAt(arr, index, item){
    const newB = newB.splice(index, item);
    return newB;
}

console.log(insertAt(b, 5, 6));

//18.9 ??

const names = ["ანა", "ბექა", "გიო", "დათო", "ელენე"];

function paginate(arr, page, perPage){

}

