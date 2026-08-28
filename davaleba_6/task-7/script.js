class Tanamshromeli {
    xelfasi() { 
        return 1000; 
    }
}

class Menejeri extends Tanamshromeli {
    xelfasi() { 
        return 2000; 
    }
}

const menejeri = new Menejeri();
console.log(menejeri.xelfasi());

//override-ს გამო გაეშვება b კლასის მეთოდი.