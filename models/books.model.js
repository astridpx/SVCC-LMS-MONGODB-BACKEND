const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

// const schema = mongoose.Schema;

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    published: {
      type: String,
      required: true,
      // default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(validator, {
  message: "ISBN is already existed in Book list.",
});

const Book = mongoose.model("Booklist", bookSchema);

module.exports = Book;
