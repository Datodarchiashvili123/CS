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

const arr = [-9, -4, -2, 5, 6];
function findFirstNegativeIndex(arr){
    for (let i = 1; i < 6; i++){
        if(i<0){
            return i;
        }
        return -1;
    } 
}