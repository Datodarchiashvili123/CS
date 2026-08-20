//12.1

function dayName(n) {
  switch (n) {
    case 1: return "ორშაბათი";
    case 2: return "სამშაბათი";
    case 3: return "ოთხშაბათი";
    case 4: return "ხუთშაბათი";
    case 5: return "პარასკევი";
    case 6: return "შაბათი";
    case 7: return "კვირა";
    default: return "არასწორი დღე";
  }
}

console.log(dayName(3));

//12.2

function calc(a, operator, b){
    switch(operator){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": return b!==0 ? a/b : "ნულზე გაყოფა არ შეიძლება";
        default: return "ოპერატორი არასწორია";

    }

}

console.log(calc(4, "*", 5));

//12.3

function season(month){
    switch(month){
        case 1: return "zamtari";
        case 2: return "zamtari";
        case 12: return "zamtari";
        default: return "araswori case";
    }
}

console.log(season(2));

//12.4

function daysInMonth(month, year){
    switch(month){
        case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
        case 4: case 6: case 9: case 11: return 30;
        case 2:
            const february = year % 4 === 0;
            return february ? 29 :28;
        default: return "araswori tvea";
    }
}

console.log(daysInMonth(2, 2025));

//12.5

function grade(n){
    switch(true){
        case n < 0: return "aravaliduri qula";
        case n > 100: return "aravaliduri qula";
        case n > 90: return "A";
        case n > 80: return "B";
        case n > 70: return "C";
        case n > 60: return "D";
        default: return "F";
    }
} 

console.log(grade(35));