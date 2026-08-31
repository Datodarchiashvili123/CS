class Figura {
  fartobi() {
    throw new Error("fartobi() შვილში უნდა გადაწერო");
  }
   aghwera() {
    return `ფართობი: ${this.fartobi()}`;
  }
}

class Otxkutxedi extends Figura {
  constructor(a, b) { 
    super(); this.a = a; this.b = b; 
    }
  fartobi() { 
    return this.a * this.b; 
    }
}

class Wredi extends Figura {
  constructor(r) { 
    super(); this.r = r; 
    }
  fartobi() { 
    return Math.PI * this.r ** 2; 
    }
}

const otxkutxedi = new Otxkutxedi(2, 4);
console.log(otxkutxedi.fartobi());

const wredi = new Wredi(5);
console.log(wredi.fartobi());

// new Figura().fartobi() ამოაგდებს Error-ს

//this არის შვილი ობიექტი, ამიტომ იგი იძახებს შვილში
//გადაწერილ მეთოდებს