const productName = "ტელეფონი";
const price = 2000;
const qty = 3;
const discountPercent = 20;

const subtotal = price * qty;
const discauntAmount = subtotal * (discountPercent / 100);
const total = subtotal - discauntAmount;

const receipt = 
`=== ჩეკი ===
პროდუქტი: ${productName}
ფასი: ${price.toFixed(2)}ლ * ${qty}
ფასდაკლება: ${discountPercent}%
-------------
გადასახდელი: ${total} ₾`;

console.log(receipt);
