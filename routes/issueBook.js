const router = require("express").Router();

let { Users, validate, Issue } = require("../models/users.model");
let Books = require("../models/books.model");

router.post("/issueBook", async (req, res) => {
  const stud_ID = req.body.stud_ID;
  const isbn = req.body.isbn;
  const title = req.body.title;
  const issue = req.body.issue;
  const returns = req.body.returns;

  const book = await Users.findOne({ stud_ID: req.body.stud_ID });
  // data
  const newIssue = new Issue({
    borrower_name: book.name,
    borrower: book.stud_ID,
    isbn: isbn,
    title: title,
  });

  if (book) {
    const isbnTrans = await Issue.findOne({ borrower: book.stud_ID });
    const book_borrower = book.name;

    // const a = Users.findById(book._id)
    //   .populate("transaction")
    //   .exec((err, result) => {
    //     console.log(result);
    //   });

    const isBooksRecord = await Books.findOne({ isbn: req.body.isbn });
    if (!isBooksRecord) {
      return res
        .status(401)
        .send({ message: `Sorry We Can't Find a Book With ISBN of ${isbn}` });
    } else {
      const isBooksName = await Books.findOne({
        isbn: req.body.isbn,
        title: req.body.title,
      });
      if (!isBooksName) {
        return res
          .status(401)
          .send({ message: `Title Of The Book Must be Correct` });
      } else {
        const isIsbn = await Issue.exists({ isbn: isbn });
        if (isIsbn) {
          res.status(409).send({
            message: `Sorry this ISBN is already in list ${isbn}`,
          });
        }
        // res.status(409).send({
        //   success: true,
        //   message: `ready`,
        // });
        else {
          await newIssue
            .save()
            .then((issue) =>
              res.status(200).send({ message: "New Book Issued." })
            )
            .catch((err) => res.status(409).send({ message: "Error" + err }));
        }
      }
    }
  } else {
    res.status(409).send({ message: `Sorry No User Found ${stud_ID}` });
  }
});

module.exports = router;
