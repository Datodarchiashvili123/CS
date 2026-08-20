//23.1

const book = { title: "ვეფხისტყაოსანი", author: "შოთა რუსთაველი", year: 1200, pages: 300 };
console.log( book.title, book.author, book.year, book.pages, book["title"], book["author"], book["year"], book["pages"]);

//23.2

const bookObj = { title: "სახელი", year: 2000, pages: 100 };
bookObj.genre = "რომანი";
bookObj.year = 2024;
delete bookObj.pages;
console.log(bookObj);

//23.3

const checkObj = { name: "ანა", age: undefined };
console.log("in (age):", "age" in checkObj, "| undefined შედარება (age):", checkObj.age !== undefined, "| in (city):", "city" in checkObj);

//23.4

const userNested = {
  name: "ნინო",
  address: { city: "ბათუმი", street: "რუსთაველის 12" },
  hobbies: ["კითხვა", "ცურვა"]
};
console.log("ქალაქი:", userNested.address.city, "| ჰობი:", userNested.hobbies[0], "| contact.phone:", userNested.contact?.phone);

//23.5 ver vakeTeb bolomde

// function describe(obj) {
//   const result = [];
//   for (let key in obj) {
//     if()
// }
// console.log(describe({ name: "ელენე", age: 19 }));

//23.6  არ ვიცი დესტრუქტურიზაცია



