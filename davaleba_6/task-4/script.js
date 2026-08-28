class Angarishi {
  #balansi = 0;

  get balansi() {
    return this.#balansi;
  }

  set balansi(v) {
    if (v >= 0) {
      this.#balansi = v;
    }
  }

  sheitane(tanxa) {
    if (tanxa > 0) this.#balansi += tanxa;
  }

  gamoitane(tanxa) {
    if (tanxa > 0 && tanxa <= this.#balansi) {
      this.#balansi -= tanxa;
    }
  }
}

const angarishi = new Angarishi();

console.log(angarishi.balansi);

angarishi.sheitane(1000);
console.log(angarishi.balansi);

angarishi.gamoitane(300);
console.log(angarishi.balansi);

angarishi.balansi = -100;
console.log(angarishi.balansi);