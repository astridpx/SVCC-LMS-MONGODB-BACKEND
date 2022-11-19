const router = require("express").Router();
const bcrypt = require("bcrypt");

let { Users, validate } = require("../models/users.model");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res
        .status(400)
        .send({ message: error.details[0].message + error });

    //
    const stud_id = await Users.findOne({ stud_ID: req.body.stud_ID });
    if (stud_id)
      return res.status(409).send({ message: "ID Is Already Existed." });

    const email = await Users.findOne({ email: req.body.email });
    if (email)
      return res.status(409).send({
        message: "Email must be unique. This email is already taken.",
      });

    // hash password
    const salt = await bcrypt.genSalt(Number(process.envSALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new Users({ ...req.body, password: hashPassword }).save();
    res.status(201).send({
      message:
        "User Successfully Register. Pls wait for the admin confirmation.",
    });
  } catch (error) {
    res.status(500).send({ mesage: "Internal Server Error" + error });
    console.log(error);
  }
});

module.exports = router;
