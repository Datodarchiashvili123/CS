class Mtvleli{
    constructor(){
        this.raodenoba = 0
    }
    mati(){
        this.raodenoba++;
        return this;
    }
    gamokleba(){
        this.raodenoba--;
        return this;
    }
}

const mtvleli = new Mtvleli();
mtvleli.mati().mati().mati();

console.log(mtvleli)

//return this აბრუნებს ამ ობიექტის რეფერენსს, შესაბამისად ამ ობიექტზე გრძელდება მეთოდის გამოძახება