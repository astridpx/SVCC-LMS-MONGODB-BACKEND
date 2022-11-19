const router = require("express").Router();

let Books = require("../models/books.model");
let { Users, validate, Issue } = require("../models/users.model");

let arrayOfIssue = null;
let arrayOfBook = null;

router.get("/", async (req, res) => {
  const issue = await Issue.find()
    .then((isbnIssue) => (arrayOfIssue = isbnIssue))
    .catch((err) => {
      res.status(407).send({ message: err });
      console.log(err);
    });
  await Books.find({
    isbn: {
      $ne: arrayOfIssue.map((res) => {
        return res.isbn;
      }),
    },
  })
    .then((book) => {
      // arrayOfBook = book;
      console.log(book);
    })
    .catch((error) => res.status(400).json("Error :" + error));
  //   Books.aggregate.match({ isbn: { $nin: ["sales", "engineering"] } });
  // await arrayOfIssue.map(async (props) => {
  // });

  //   console.log(arrayOfIssue);

  // const issueIsbn = arrayOfIssue.map((props) => {
  //   return props.isbn;
  // });
  // const s = arrayOfBook.map((books) => {
  //   issueIsbn.foreach((res) => {
  //     if (res != books.isbn) {
  //       return books;
  //     }
  //   });
  // });
  // console.log(s);
  // console.log(issueIsbn);
});

module.exports = router;
