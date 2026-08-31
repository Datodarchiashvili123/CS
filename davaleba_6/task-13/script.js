class Cxoveli {
  info() { return "ცხოველი"; }
}

class Dzudzumwovari extends Cxoveli {
  info() { return `${super.info()} - ძუძუმწოვარი`; }
}

class Dzagli extends Dzudzumwovari {
  info() { return `${super.info()} - ძაღლი`; }
}

const dzagli = new Dzagli();
console.log(dzagli.info()); 

//დააბრუნა: ცხოველი - ძუძუმწოვარი - ძაღლი 

console.log(dzagli instanceof Cxoveli);

//დააბრუნა true, რადგან Dzagli იერარქიულად არის Cxoveli–ს შვილობილი კლასი

//პრაქტიკაში 2–3 დონეზე ღრმა იერარქია კოდს ხდის რთულად დასაწერს და მარტივად გასაფუჭებელს, 
//რადგან მასზე მცირე ცვლილებაც კი მოქმედებს.