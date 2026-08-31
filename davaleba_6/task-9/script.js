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

class Katami extends Cxoveli{
    xma(){
        return `kur`
    }
}

class Dzroxa extends Cxoveli{
    xma(){
        return `muu`
    }
}

class Bati extends Cxoveli{
    xma(){
        return`yva`
    }
}

const cxovelebi = [new Dzagli("რექსი"), new Katami("მურა"), new Dzroxa("ბზიკა"), new Bati("კიტა")];

for (const c of cxovelebi){
    console.log(c.xma());
}