class Cxoveli{
    constructor(saxeli){
        this.saxeli = saxeli;
    }
    xma(){
        return "...";
    }
}

class Dzagli extends Cxoveli{
    constructor(saxeli, jishi){
        super(saxeli);
        this.jishi = jishi;
    }
}

const dzagli = new Dzagli("Lucky", "Doberman");
console.log(dzagli);

//ReferenceError: Must call super constructor in derived 
//class before accessing 'this' or returning from derived constructor
//მშობლის ობიექტი უნდა დაემატოს ჯერ super()-ით

class Student extends Adamiani{
    constructor(saxeli, kursi){
        this.kursi = kursi;
        super(saxeli);
    }
}

//კოდი არასწორია, ჯერ super-ით გამოძახებული ობიექტი უნდა დავწეროთ