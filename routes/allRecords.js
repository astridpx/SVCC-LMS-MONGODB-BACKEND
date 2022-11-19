const router = require("express").Router();

let { Users, validate, Issue } = require("../models/users.model");

// get all records
router.get("/", async (req, res) => {
  await Issue.find()
    .then((records) => res.json(records))
    .catch((err) => res.status(409).send({ message: "error" }));
});

// delete records
router.delete("/delete/:isbn", async (req, res) => {
  await Issue.findOneAndDelete({ isbn: req.params.isbn })
    .then((issue) => res.status(201).send({ message: " Book return" }))
    .catch((err) => res.status(409).send({ message: "Error " + err }));
});

// Update
router.route("/update/:id").post(async (req, res) => {
  const user = Users.find({ stud_ID: req.body.stud_ID }, (err, result) => {
    if (result.length == 0) {
      res
        .status(409)
        .send({ message: `Sorry No User Found ${req.body.stud_ID}` });
      // if user exist
    } else {
      Issue.findByIdAndUpdate(req.params.id)
        .then((record) => {
          record.stud_ID = req.body.stud_ID;
          record.isbn = req.body.isbn;
          record.title = req.body.title;
          record.issue = req.body.issue;
          record.returns = req.body.returns;

          record
            .save()
            .then((issue) => res.json("Record Successfully Updated."))
            .catch((err) => res.status(409).send({ message: "Error" + err }));
        })
        .catch((err) =>
          res.status(409).send({ message: "Can't find the record." })
        );
    }
  });
  // const isUserExist = Issue.find({ borrower: user.stud_ID }, (err, isBorrower)=>{});
  // const isIsbn = Issue.find({ isbn: req.body.isbn }, (err, isIsbnIssue)={});
  // if (user) {
  //   res
  //     .status(409)
  //     .send({ message: `Sorry No User Found ${req.body.stud_ID}` });
  // }
  // if (!isIsbn) {
  //   res.status(409).send({
  //     message: `No Records Found of ISBN Value: ${req.body.isbn}`,
  //   });
  // }
});

module.exports = router;
