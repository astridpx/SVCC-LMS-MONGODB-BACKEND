const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const issueSchema = new mongoose.Schema({
  borrower: {
    type: String,
  },
  borrower_name: {
    type: String,
  },
  isbn: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  issue_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  return_date: {
    type: Date,
    required: false,
    sparse: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    stud_ID: {
      type: String,
      // required: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      // required: true,
      capitalize: true,
      trim: true,
    },
    username: {
      type: String,
      // required: true,
      trim: true,
    },
    email: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      trim: true,
    },
    role: {
      type: String,
      required: false,
      default: "Student",
    },
    isActive: {
      type: Boolean,
    },
    transaction: [
      { type: mongoose.Schema.Types.ObjectId, ref: "transactions" },
    ],
    // transaction: [issueSchema],
  },
  {
    timestamp: true,
  }
);

userSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// send to db
const Issue = mongoose.model("transactions", issueSchema);
const Users = mongoose.model("Users", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    stud_ID: Joi.string().required().label("Stud_Id"),
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    role: Joi.string().label("role"),
    isActive: Joi.boolean().label("isActive"),
    // transaction: Joi.object().label("Transaction"),
  });
  return schema.validate(data);
};

module.exports = { Users, validate, Issue };

// end Note => create a routes for this
// a littlebit confusion in inserting the data in user => transaction (" nested documents")
