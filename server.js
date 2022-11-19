const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const userRouter = require("./routes/userRegister");
const userLogin = require("./routes/login");
const accList = require("./routes/accountList");
const bookRouter = require("./routes/books");
const issueBookRouter = require("./routes/issueBook");
const allRecords = require("./routes/allRecords");
const availBook = require("./routes/availableBook");

// express app
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// mongoDB connnection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MonggoDB connection established");
});

// routes endpoints
app.use("/books", bookRouter);
app.use("/register", userRouter);
app.use("/issueBooks", issueBookRouter);
app.use("/All-Records", allRecords);
app.use("/login", userLogin);
app.use("/accounts", accList);
app.use("/available-book", availBook);
