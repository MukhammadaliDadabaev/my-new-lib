
/* module.exports.add = function add(a, b) {
  return a + b;
};

module.exports.substract = function subst(a, b) {
  return a - b;
}; */

//✅ Bu paketni loyihaga-yuklash
const mongoose = require("mongoose");

//✅ Bu mongoni local ulash
mongoose
  .connect("mongodb://localhost/first")
  .then(() => {
    console.log("MongoDBga ulandi...");
  })
  .catch((err) => {
    console.log("MongaDBda xatolik...", err);
  });

//✅ Bu Schema().-> methodi orqali object-ga qolib, yoki (sexmasini) tuziladi.
// 1-chi struktura-tuzildi
const bookScehma = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});

//✅ Bu model class-deyiladi (Yani model orqali object-yoziladi)
// 2-chi class-model yoziladi
/* const Book = mongoose.model("Book", bookScehma);

//✅ Bu Object va Database-ga saqlash uchun async-function yoziladi
async function createBoook() {
  // 3-chi class-model orqali object-yoziladi
  const book = new Book({
    name: "Node.js va JavaScript asoslari",
    author: "Mukhammadali",
    tags: ["Node.js", "js", "react", "dasturchi"],
    isPublished: true,
  });
  // 4-chi Bu Object-ni Database-ga saqlash uchun-method async-function
  const savedBook = await book.save();
  // Bu database-ga saqlangan object-ni consolga-qaytaradi
  console.log(savedBook);
} */
// 5-chi function-ni chaqiriladi
// createBoook();

//✅ 1-chi USUL Bu documentni database-dan uqish-filterlash method-lariga function-ni
// -> Bularni navbat bilan ishlatiladi
// async function getBooks() {
//1. Bu find() bazadagi-xamma objectni oladi
/* const books =await Book.find();
  console.log(books); */

//2. Bu find() bazadagi objectni filter-orqali kerakligini oladi
/* const books = await Book.find({
    author: "Mukhammadali",
    isPublished: true,
  }) */

//3. Bu or(). methodi-ga misol
// const books = await Book.find()
// Bu or([{}]). methodi (yoki-opreator sharti)
// .or([{ author: "Mukhammadali" }, {isPublished: true}])

//4. Bu and(). methodi-ga misol
// const books = await Book.find()
// Bu and([{}]). methodi (va-opreator sharti)
// .and([{ author: "Mukhammadali" }, { isPublished: true }])

// const books = await Book
//   //5. Bu Regexp-deydi 2-qism-buladi 1-find({valu,/^xarf/})., 2-find({valu,/xarf$/})  methodi Barcha document Xarf-buyicha topadi
//   .find({ author: /^M/ }) // Bu Muallifni ismi (M-dan) boshlab document oladi
//   .find({ author: /li$/i }) // Bu Muallifni ismi (li-dan) boshlab document oladi
//   .find({ author: /.*ham.*/i }) // Bu Muallifni ismi (ham-dan) boshlab document oladi

//6. Bu limit(). methodi olish miqdorini belgilaydi
/* .limit(2)

    //7. Bu sort(). methodi kerakli argumentni tartiblab olish uchun-belgilaydi
    .sort({ name: 1 }) */

//8. Bu select(). methodi xoxlaganini olish yoki xoxlaganiniolmasligini belgilanadi
// .select({ name: 2, tags: 2 });

//9. Bu count(). va countDocuments(). method-lar bazadagi document sonini aniqlaydi
// .count();
/* .countDocuments();

  console.log(books);
}
getBooks(); */

const Book = mongoose.model("Book", bookScehma);

//✅ Bu Object va Database-ga saqlash uchun async-function yoziladi
async function createBoook() {
  // 3-chi class-model orqali object-yoziladi
  const book = new Book({
    name: "Node.js va JavaScript asoslari",
    author: "Mukhammadali",
    tags: ["Node.js", "js", "react", "dasturchi"],
    isPublished: true,
  });
  const savedBook = await book.save();
  console.log(savedBook);
}

//✅ 2-chi USUL Bu database-dagi malu`motlarni PAGINATION->Bu malu`motlarni saxifalash va raqamlash methodiga  function
async function getBooks() {
  // Bu o`zgaruvchi pagination-ni ishlatish-uchun sonini bildiradi
  const pageNumber = 3; // Bu (3) Xozirgi saxifani-raqami.
  const pageSize = 10; // Bu (10) Xar Bitta saxifada nechta malu`mot-borligi.
  // Bu query kuritganda -> /api/books/pageNumber=3&pageSize=10 <-Shu xolda-bo`ladi.

  const books = await Book.find({ author: "Mukhammadali" })
    // Bu skip(). method b-n oldingi elementlarni o`tqazish uchun buyriq-yoziladi
    .skip((pageNumber - 1) * pageSize)
    // Bu limit(). methodi orqali xar-bir saxifada hechta malu`mot-ko`rsatiladi
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 2, tags: 2 });
  console.log(books);
}

getBooks();
