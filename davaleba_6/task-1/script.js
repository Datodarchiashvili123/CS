class Mankana{
    constructor (marka, weli){
        this.marka = marka;
        this.weli = weli;
    }
    agwera(){
        return `${this.marka}, ${this.weli}`;
    }
}

const mankana1 = new Mankana("Mercedes", 2022);
const mankana2 = new Mankana("BMW", 2020);              

console.log(mankana1.agwera());
console.log(mankana2.agwera());

//a === b არის false და a.x === b.x არის true