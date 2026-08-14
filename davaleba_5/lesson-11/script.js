//11.1

function sign(n){
    if(n > 0) return "დადებითი";
    if(n < 0) return "უარყოფითი";
    return "ნული";  
}

console.log(sign(1));

//11.2

function grade(score){
    if(score < 0 || score > 100) return "არავალიდური ქულა";
    if(score >= 90) return "A";
    if(score >= 80) return "B";
    if(score >= 70) return "C";
    if(score >= 60) return "D";
    return "F";
}

console.log(grade(101));

//11.3

function isLeapYear(year){
    if((year % 4 === 0 && year % 100 !== 0) || (year % 400 ===0)) return "ნელი";
}

console.log(isLeapYear(400));

//11.4

function ticketPrice(age, isStudent){
    if(0 <= age && age <= 5) return "უფასო";
    if(6 <= age && age <= 17) return "5ლ";
    if(18 <= age && age <= 64) {
        return isStudent ? 15*0.5 : 15;
    }
    if(age >= 65) return "7ლ";
    return "არასწორი ასაკი";
}

console.log(ticketPrice(19, true));

//11.5

function triangleType(a, b, c){
    if(a+b<=c || a+c<=b || b+c<=a) return "ar arsebobs";
    if(a === b && a === c) return "tolgverdaa";
    if(a === b || a === c || b === c) return "tolferdaa";
    return "sxvadasxvagvaria";
}
console.log(triangleType(2, 2, 2));

//11.6 (ვერ ვაკეთებ)

function validatePassword(pwd){
    if(pwd.length < 8) return "მინიმუმ 8 სიმბოლო";
    if(pwd )
}
