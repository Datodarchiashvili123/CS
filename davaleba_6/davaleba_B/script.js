// Personaji (sicocxle, dazianeba(), sheteva(mizani)) → Mebrdzoli (ორმაგი შეტევა), 
// Jadokari (მანა და sheteva()-ს override მანის ხარჯვით), Mshvildosani (შორი დისტანცია).
//  დაწერე ფუნქცია brdzola(a, b), რომელიც რიგრიგობით ატარებს შეტევებს, სანამ ერთ-ერთს
//  სიცოცხლე არ გაუთავდება, და აბრუნებს გამარჯვებულის სახელს.


class Erteuli {
  constructor(saxeli, weli) {
    this.saxeli = saxeli;
    this.weli = weli;
  }

  info() {
    return `${this.saxeli} (${this.weli})`;
  }
}

class Wigni extends Erteuli {
  constructor(saxeli, weli, gverdebi) {
    super(saxeli, weli);
    this.gverdebi = gverdebi;
  }

  info() {
    return `${super.info()}, ${this.gverdebi}`;
  }
}

class Jurnali extends Erteuli {
  constructor(saxeli, weli, nomeri) {
    super(saxeli, weli);
    this.nomeri = nomeri;
  }

  info() {
    return `${super.info()}, #${this.nomeri}`;
  }
}

class DVD extends Erteuli {
  constructor(saxeli, weli, xangrdzlivoba) {
    super(saxeli, weli);
    this.xangrdzlivoba = xangrdzlivoba;
  }

  info() {
    return `${super.info()}, ${this.xangrdzlivoba}`;
  }
}


const biblioteka = [
  new Wigni("vefxistyaosani", 1200, 1600),
  new Wigni("dorian grays portreti", 1975, 500),
  new Jurnali("nateba", 2024, 102),
  new Jurnali("sarkastika", 2023, 85),
  new DVD("grimi", 2010, 148)
];

for (const erteuli of biblioteka) {
  console.log(erteuli.info());
}