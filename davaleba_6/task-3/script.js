//1

class Matematika {
    static jami(a, b){
        return a + b;
    }
}

console.log(Matematika.jami(5, 10));

//2

class Momxmarebeli{
    static raodenoba = 0;
    constructor(){
        return Momxmarebeli.raodenoba++;
    }
}

const m1 = new Momxmarebeli();
const m2 = new Momxmarebeli();
const m3 = new Momxmarebeli();

console.log(Momxmarebeli.raodenoba);

//this მეთოდი მხოლოდ კლასის თვისებაზე მიუთითებს და არა შექმნილ ობიექტზე