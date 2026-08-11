const product = "კლავიატურა";
const price = 120;
const quantity = 2;
const discount = 10;

const total = price * quantity;
const discountAmount = total * discount / 100;
const finalPrice = total - discountAmount;

console.log(`
=== ჩეკი ===

პროდუქტი: ${product}

ფასი: ${price.toFixed(2)} ₾ × ${quantity}

ფასდაკლება: ${discount}%

-------------

გადასახდელი: ${finalPrice.toFixed(2)} ₾
`);