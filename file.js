//1.1
// class Mankana {
//     constructor(marka, modeli) {
//         this.marka = marka;
//         this.modeli = modeli;
//     }
// }

// let manqana1 = new Mankana("BMW", "M4 Coupé");

// console.log(manqana1.marka);
// console.log(manqana1.modeli);

//1.2
// class Mankana {
//     constructor(marka, modeli, weli) {
//         this.marka = marka;
//         this.modeli = modeli;
//         this.weli = weli;
//     }

//     aghwera() {
//         return `${this.marka} (${this.weli})`;
//     }
// }

// let manqana1 = new Mankana("BMW", "M4", 2020);

// console.log(manqana1.aghwera());

//1.3
// class Wertili {
//     constructor(x, y){
//     this.x = x;
//     this.y = y;
//     }
// }

// const a = new Wertili(1, 2);
// const b = new Wertili(1, 2);
// console.log(a === b, a.x === b.x);

//დაიბეჭდება false, true

//2.1
// class Mtvleli {
//     constructor() {
//         this.raodenoba = 0;
//     }

//     mati() {
//         this.raodenoba++;
//     }

//     gamokleba() {
//         this.raodenoba--;
//     }
// }

// let mtvleli1 = new Mtvleli();

// mtvleli1.mati();
// mtvleli1.mati();
// mtvleli1.mati();

// mtvleli1.gamokleba();

// console.log(mtvleli1.raodenoba);


//2.2
// class Mtvleli {
//     constructor() {
//         this.raodenoba = 0;
//     }

//     mati() {
//         this.raodenoba++;
//         return this;
//     }

//     gamokleba() {
//         this.raodenoba--;
//         return this;
//     }
// }

// let m = new Mtvleli();

// m.mati().mati().mati();

// console.log(m.raodenoba);

//მუშაობს იმიტომ, რომ mati() - ის მერე გვაქვს return

//3.1
// class Matematika {
//     static jami(a, b) {
//         return a + b;
//     }
// }

// console.log(Matematika.jami(4, 7));

//3.2
// class Momxmarebeli {
//     static raodenoba = 0;

//     constructor() {
//         Momxmarebeli.raodenoba++;
//     }
// }

// let m1 = new Momxmarebeli();
// let m2 = new Momxmarebeli();
// let m3 = new Momxmarebeli();

// console.log(Momxmarebeli.raodenoba);

//5.1
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     xma() {
//         return "_";
//     }
// }

// class Dzagli extends Cxoveli {
//     xma() {
//         return "ჰავ";
//     }
// }

// let dzagli1 = new Dzagli("ბობი");

// console.log(dzagli1.xma());

//5.2
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     xma() {
//         return "_";
//     }
// }

// class Dzagli extends Cxoveli {
//     constructor(saxeli, jishi) {
//         super(saxeli);
//         this.jishi = jishi;
//     }

//     xma() {
//         return "ჰავ";
//     }
// }

// let dzagli1 = new Dzagli("კიკი", "პუდელი");

// console.log(dzagli1.saxeli);
// console.log(dzagli1.jishi);
// console.log(dzagli1.xma());

//5.3
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     xma() {
//         return "_";
//     }
// }

// class Dzagli extends Cxoveli {
//     constructor(saxeli, jishi) {
//         this.jishi = jishi;
//     }

//     xma() {
//         return "ჰავ";
//     }
// }

// let dzagli1 = new Dzagli("ბობი", "გერმანული ნაგაზი");

// console.log(dzagli1.saxeli);
// console.log(dzagli1.jishi);
// console.log(dzagli1.xma());

//არ იმუშავებს იმიტომ, რომ dzagli არის cxoveli-ის შვილობილი კლასი და როცა შვილ კლასში საკუთარი constructor არსებობს, ჯერ უნდა გამოვიძახოთ super(saxeli); და რადგანაც წავშალეთ არ იმუშავებს.

//6.1
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     };

//     xma() {
//         return "_";
//     };
// };

// class Dzagli extends Cxoveli {
//     constructor(saxeli, jishi) {
//         super(saxeli);
//         this.jishi = jishi;
//     };

//     xma() {
//         return "ჰავ";
//     };
// };

// let dzagli1 = new Dzagli("კიკი", "პუდელი");

// console.log(dzagli1.saxeli);
// console.log(dzagli1.jishi);
// console.log(dzagli1.xma());

// //6.2
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     xma() {
//         return "_";
//     }
// }

// class Dzagli extends Cxoveli {
//     constructor(saxeli, jishi) {
//         this.jishi = jishi;
//     }

//     xma() {
//         return "ჰავ";
//     }
// }

// let dzagli1 = new Dzagli("კიკი", "პუდელი");

// console.log(dzagli1.saxeli);
// console.log(dzagli1.jishi);
// console.log(dzagli1.xma());\

//6.3
// class Studenti extends Adamiani {
//     constructor(saxeli, kursi) {
//         super(saxeli);
//         this.kursi = kursi;
//     };
// };
//super(saxeli) ჯერ ქმნის და ამზადებს Studenti-ის ობიექტს მშობელი Adamiani-ს კონსტრუქტორის დახმარებით. მხოლოდ ამის შემდეგ შეგვიძლია გამოვიყენოთ this

//7.1
//7.2
// class A { vin() { return "A"; } } 
// class B extends A { vin() { return "B"; } } 
// const x = new B(); 
// console.log(x.vin());
//აქ გაეშვება vin() მეთოდი, ამ მეთოდის გამოყენებით Javascript ჯერ b-ს ეძებს და მერე გადადის A-ზე.

//8.1
// class Tanamshromeli {
//     xelfasi() {
//         return 1000;
//     };
// };

// class Menejeri extends Tanamshromeli {
//     xelfasi() {
//         return super.xelfasi() + 500;
//     };
// };

// const menejeri1 = new Menejeri();
// console.log(menejeri1.xelfasi());

//8.2
// class Cxoveli {
//     info() {
//         return "სახელი: რექსი";
//     };
// };

// class Dzagli extends Cxoveli {
//     info() {
//         return super.info() + " | ჯიში: ლაბრადორი";
//     };
// };

// const dzagli1 = new Dzagli();
// console.log(dzagli1.info());

//9.1

//9.2
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }
//     xma() {
//         return "_";
//     }
// }
// class Dzagli extends Cxoveli {
//     xma() {
//         return "ჰავ";
//     }
// }
// class Katami extends Cxoveli {
//     xma() {
//         return "ragaca";
//     }
// }
// class Dzroxa extends Cxoveli {
//     xma() {
//         return "რაღაცა"
//     }
// }
// const cxovelebi = [
//     new Dzagli("რექსი"),
//     new Katami("მურა"),
//     new Dzroxa("ბზიკა")
// ];
// for (const cxoveli of cxovelebi) {
//     console.log(cxoveli.xma());
// }

//9.2
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     xma() {
//         return "_";
//     }
// }

// class Dzagli extends Cxoveli {
//     xma() {
//         return "ჰავ";
//     }
// }

// class Katami extends Cxoveli {
//     xma() {
//         return "ragaca";
//     }
// }

// class Dzroxa extends Cxoveli {
//     xma() {
//         return "რაღაცა";
//     }
// }

// class Bati extends Cxoveli {
//     xma() {
//         return "ჭიკჭიკ";
//     }
// }

// const cxovelebi = [
//     new Dzagli("რექსი"),
//     new Katami("მურა"),
//     new Dzroxa("ბზიკა"),
//     new Bati("ჩიტო")
// ];

// for (const cxoveli of cxovelebi) {
//     console.log(cxoveli.xma());
// }

//9.3
//10
//11.1
// class Cxoveli {
//     constructor(saxeli) {
//         this.saxeli = saxeli;
//     }

//     static shekmna(saxeli) {
//         return new this(saxeli);
//     }
// }

// class Dzagli extends Cxoveli {
//     xma() {
//         return "ჰავ";
//     }
// }

// const d = Dzagli.shekmna("რექსი");

// console.log(d);
// console.log(d instanceof Dzagli);
// console.log(d.saxeli);

//11.2
//new this() გამოიყენება იმიტომ, რომ მეთოდმა შექმნას გამომძახებელი კლასის ობიექტი და არა cxoveli-ს ობიექტი.
//12
//13.1
// class Cxoveli {
//     info() {
//         return "ცხოველი";
//     }
// }
// class Dzudzumwovari extends Cxoveli {
//     info() {
//         return super.info() + " ძუძუმწოვარი";
//     }
// }
// class Dzagli extends Dzudzumwovari {
//     info() {
//         return super.info() + " ძაღლი";
//     }
// }

// const d = new Dzagli();
// console.log(d.info());

//console.log(d instanceof Cxoveli) აბრუნებს true-ს, რადგან გამოვიყენეთ extends ამიტომ d არის ცხოველიც, ძუძუმწოვარიც და ძაღლიც.




//დიდი დავალება


class Product {
    #price;
    #quantity;

    constructor(name, price, quantity) {
        this.name = name;
        this.#price = price;
        this.#quantity = quantity;
    }

    getPrice() {
        return this.#price;
    }

    getQuantity() {
        return this.#quantity;
    }

    decreaseQuantity(amount) {
        if (amount <= this.#quantity) {
            this.#quantity -= amount;
        }
    }
}


class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}


class Admin extends User {
    constructor(name, email) {
        super(name, email);
        this.products = [];
    }

    addProduct(product) {
        store.push(product);
        console.log(`${product.name} პროდუქტი დამატებულია`);
    }

    removeProduct(store, productName) {
        const index = store.findIndex((p) => p.name === productName);

        if (index !== -1) {
            store.splice(index, 1);
            console.log(`${productName} წაშლილია`);
        } else {
            console.log("პროდუქტი ვერ მოიძებნა");
        }
    }
}


class Customer extends User {
    constructor(name, email) {
        super(name, email);
        this.cart = [];
    }

    addToCart(product, quantity) {
        if (quantity <= product.getQuantity()) {
            this.cart.push({
                product: product,
                quantity: quantity
            });

            console.log(`${product.name} კალათში დაემატა`);
        } else {
            console.log("რაოდენობა არასაკმარისია");
        }
    }

    checkout(payment) {
        if (this.cart.length === 0) {
            console.log("კალათა ცარიელია");
            return;
        }

        let total = 0;

        for (const item of this.cart) {
            total += item.product.getPrice() * item.quantity;
        }

        console.log(`სულ: ${total}₾`);

        const paid = payment.pay(total);

        if (!paid) {
            console.log("გადახდა ვერ შესრულდა");
            return;
        }

        console.log("შეკვეთა შესრულდა");

        for (const item of this.cart) {
            item.product.decreaseQuantity(item.quantity);
        }

        this.cart = [];

        console.log("შეკვეთა წარმატებით დასრულდა");
    }
}



class CardPayment {
    pay(amount) {
        console.log(`ბარათით გადახდა ${amount}₾`);
        return true;
    }
}

class CashPayment {
    pay(amount) {
        console.log(`ნაღდი ფულით გადახდა ${amount}₾`);
        return true;
    }
}


const store = [];

const admin = new Admin("Giorgi", "giorgi@gmail.com");

const phone = new Product("iPhone", 2700, 8);
const laptop = new Product("Laptop", 2500, 5);

admin.addProduct(phone);
admin.addProduct(laptop);

console.log(store);


admin.removeProduct(store, "Laptop");

console.log(store);

const customer = new Customer("Nata", "nata@gmail.com");

customer.addToCart(phone, 2);

const payment = new CardPayment();
customer.checkout(payment);
console.log("დარჩენილი iPhone:", phone.getQuantity());

