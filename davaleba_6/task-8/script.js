class Tanamshromeli {
    xelfasi() { 
        return 1000; 
    }
}

class Menejeri extends Tanamshromeli {
  xelfasi() {
    return super.xelfasi() + 500; 
  }
}

const menejeri = new Menejeri();
console.log(menejeri.xelfasi());

//23

class Cxoveli { 
    constructor(saxeli) { 
        this.saxeli = saxeli; 
    }
    info(){
        return `სახელი: ${this.saxeli}`
    }
}

class Dzagli extends Cxoveli {
    constructor(saxeli, jishi){
        super(saxeli);
        this.jishi = jishi;
    } 
    info(){
        return `${super.info()} | ჯიში: ${this.jishi}`;
    }
}

const cxoveli = new Cxoveli("რექსი");
const dzagli = new Dzagli("რექსი", "ლაბრადორი")
console.log(dzagli.info());

//24 - RangeError: Maximum call stack size exceeded, მოხდა stack overflow