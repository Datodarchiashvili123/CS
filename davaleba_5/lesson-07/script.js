//7.1

const name = "ელენე";
const age = 19;
const city = "თბილისი";

console.log(`გამარჯობა, მე ვარ ${name}, ${age} წლის, ვცხოვრობ ${city}ში.`);

//7.2

const a = 7;
const b = 3;

console.log(`${a} + ${b} = ${a+b}, ${a} * ${b} = ${a*b} `);

//7.3

function makeInvoice (product, price, qty){
    return `პროდუქრი: ${product}
ფასი: ${price},
რაოდენობა: ${qty},
ჯამი: ${price * qty}ლ`;
}

console.log(makeInvoice('კლავიატურა', 120, 2));

//7.4

const user = {firstName: "ანა", lastName: "ბერიძე", email: "ana@mail.ge"};

console.log(`${user.firstName} ${user.lastName} ${user.email}`);

//7.5

function card(user){
    return `<div class="card">
<h2>${user.firstName} ${user.lastName}</h2>
<p>${user.email}</p>
</div>`;
}

console.log(card({firstName: "ანა", lastName: "ბერიძე", email: "ana@mail.ge"}));