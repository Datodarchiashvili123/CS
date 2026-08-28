class Cxoveli{
    constructor(saxeli){
        this.saxeli = saxeli;
    }
    xma(){
        return "...";
    }
}

class Dzagli extends Cxoveli{
    xma(){
        return "hav";
    }
}

class Katami extends Cxoveli{
    xma(){
        return "miau";
    }
    dzili(){
        return "sdzinavs";
    }
}

const cxoveli = new Cxoveli("kata").dzili()
console.log(cxoveli);

//TypeError: (intermediate value).dzili is not a function
//მშობელ კლასს არ აქვს შვილობილ კლასში განსაზღვრულ მეთოდებზე წვდომა.