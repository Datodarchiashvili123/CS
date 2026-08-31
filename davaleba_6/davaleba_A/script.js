// Angarishi (პირადი #balansi, sheitane, gamoitane, get balansi) → SadepozitoAngarishi extends 
// Angarishi დამატებით proceni(), რომელიც ბალანსს 5%-ს უმატებს → SakredidoAngarishi extends 
// Angarishi, სადაც gamoitane() override-ულია და ბალანსს მინუსში გასვლის უფლებას აძლევს -500-მდე. 
// შემოწმება: სამივე ტიპის ანგარიში ერთ მასივში ჩააგდე და ყველას გამოაკელი 100

class Angarishi {
  #balansi;

  constructor(balansi = 0) {
    this.#balansi = balansi;
  }

  get balansi() {
    return this.#balansi;
  }

  set balansi(v){
    this.#balansi = v;
  }

  sheitane(tanxa) {
    if (tanxa > 0) {
      this.#balansi += tanxa;
    }
  }

  gamoitane(tanxa) {
    if (tanxa > 0 && this.#balansi - tanxa >= 0) {
      this.#balansi -= tanxa;
    }
  }
}

class SadepozitoAngarishi extends Angarishi {
  procenti() {
    this.sheitane(this.balansi * 0.05);
  }
}

class SakredidoAngarishi extends Angarishi {
  gamoitane(tanxa) {
    if (tanxa > 0 && this.balansi - tanxa >= -500) {
      this.balansi -= tanxa;
    }
  }
}

const angarishebi = [
  new Angarishi(50),
  new SadepozitoAngarishi(50),
  new SakredidoAngarishi(50)
];

for (const a of angarishebi) {
  a.gamoitane(100);
  console.log(`${a.constructor.name}: ${a.balansi}`);
}

