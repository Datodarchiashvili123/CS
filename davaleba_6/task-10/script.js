 class Cxoveli {
    constructor(saxeli){
        this.saxeli = saxeli;
    }
}

class Dzagli extends Cxoveli{
    xma(){
        return `hav`;
    }
}

const dzagli = new Dzagli();

console.log(dzagli instanceof Dzagli);
console.log(dzagli instanceof Cxoveli);
console.log(new Cxoveli("x") instanceof Dzagli);

//29

class Wertili {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

const wertili = new Wertili(3, 4);

console.log(wertili.toString());