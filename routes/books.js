const router = require("express").Router();

// models
let Books = require("../models/books.model");

// get all list
router.route("/").get(async (req, res) => {
  await Books.find()
    .then((book) => res.json(book))
    .catch((error) => res.status(400).json("Error :" + error));
});

// addBook
router.route("/addBook").post(async (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const published = req.body.published;

  const newBook = new Books({ isbn, title, author, published });

  await newBook
    .save()
    .then((book) => res.json("New Book Successfully Added"))
    .catch((error) => res.status(400).json("" + error));
});

// delete
router.route("/:id").delete(async (req, res) => {
  await Books.findByIdAndDelete(req.params.id)
    .then((book) => res.json("Book Is Successfully Deleted."))
    .catch((error) => res.status(400).json("ERROR :" + error));
});

// update
router.route("/update/:id").post(async (req, res) => {
  await Books.findByIdAndUpdate(req.params.id)
    .then((book) => {
      book.isbn = req.body.isbn;
      book.title = req.body.title;
      book.author = req.body.author;
      book.published = req.body.published;

      book
        .save()
        .then(() => res.json("Books Successfully Updated."))
        .catch((error) => res.status(400).json("ERROR :" + error));

      // catch error if id cant fiind
    })
    .catch((error) => res.status(400).json("No Record Found " + error));
});

module.exports = router;
