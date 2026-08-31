// შემაჯამებელი დიდი დავალება
// დავალება 9 — ონლაინ მაღაზია

// შექმენი პატარა ონლაინ-მაღაზიის OOP სისტემა, სადაც გამოიყენებ ოთხივე პრინციპს.

// უნდა გქონდეს:

// Product
// სახელი
// ფასი
// რაოდენობა

// ფასი და რაოდენობა დაცული უნდა იყოს გარედან პირდაპირი ცვლილებისგან.

// User
// სახელი
// email
// Admin extends User

// Admin-ს უნდა შეეძლოს პროდუქტის დამატება და წაშლა.

// Customer extends User

// Customer-ს უნდა ჰქონდეს კალათა.

// Payment

// შექმენი სხვადასხვა გადახდის მეთოდი:

// CardPayment
// CashPayment
// PaypalPayment

// ყველას უნდა ჰქონდეს:

// pay()

// მაგრამ სხვადასხვა მოქმედება შეასრულოს.

// შეკვეთის გაკეთება

// Customer-მა უნდა შეძლოს:

// customer.checkout()

// ხოლო შიგნით ავტომატურად მოხდეს:

// კალათის შემოწმება
//       ↓
// საერთო ფასის დათვლა
//       ↓
// გადახდა
//       ↓
// შეკვეთის შექმნა
//       ↓
// პროდუქტების რაოდენობის შემცირება

// ამ დავალებაში შეგიძლია ერთდროულად გამოიყენო:

// Encapsulation → private მონაცემები

// Inheritance → Admin / Customer ← User

// Polymorphism → CardPayment / CashPayment / PaypalPayment

// Abstraction → checkout() მალავს მთელ პროცესს


class Magazia{
    #fasi;
    #raodenoba;

    constructor(saxeli, fasi, raodenoba){
        this.saxeli = saxeli;
        this.#fasi = fasi;
        this.#raodenoba = raodenoba;
    }

    get fasi() {return this.#fasi; }
    get raodeoba() {return this.#raodenoba;}
}


class User{
    constructor(saxeli, email){
        this.saxeli = saxeli;
        this.email = email;
    }
}

class Admin extends User{
    constructor(saxeli, email){
        super(saxeli, email);
    }

    productisDamateba(produqcia, produqti){
        produqcia.push(produqti);
    }

    produqtisWashla(produqcia, produqti){
        const idx = produqcia.findIndex((p) => p.saxeli === produqtiSaxeli);
        if (idx !== -1) produqcia.splice(idx, 1);
    }
}

class Costumer extends User{
    constructor(saxeli, email, kalata){
        super(saxeli, email);
        this.kalata = [];
    }

    kalatashiDamateba(produqti, raodenoba){
        this.kalata.push({produqti, raodenoba});
    }

    checkout(payment){
        let total = 0;
        for(let nivti of this.kalata){
            total += nivti.produqti.fasi * nivti.raodenoba;
        } 

        console.log(payment.pay(total));

        this.kalata = [];
        console.log("shekveta dasrulebulia")
    }
}

class Payment {
    pay(amount){
        return "airchiet metodi"
    }
}

class CardPayment extends Payment{
    pay(amount){
        return (`baratit gadaxdilia ${amount}`);
    }
}

class CashPayment extends Payment{
    pay(amount){
        return (`cashit gadaxdilia ${amount}`);
    }
}

class PayPalPayment extends Payment{
    pay(amount){
        return (`paypalit gadaxdilia ${amount}`);
    }
}

const produqcia = [];
const admin = new Admin ("elene", "elene.margvelidze@gmail.com");
const costumer = new Costumer("nata", "natali.mghebrishvili@gmail.com");
const produqti = new Magazia ("leptopi", 3000, 2);

admin.productisDamateba(produqcia, produqti);
costumer.kalatashiDamateba(produqti, 2);
costumer.checkout(new CardPayment());

console.log(`Tqven sheidzinet ${produqti.raodeoba} ${produqti.saxeli}`);