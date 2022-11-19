const router = require("express").Router();
const { Users } = require("../models/users.model");

router.get("/", async (req, res) => {
  await Users.find()
    .then((accounts) => res.json(accounts))
    .catch((error) =>
      res.status(401).send({ message: "Server ERRO " + error })
    );
});

module.exports = router;
