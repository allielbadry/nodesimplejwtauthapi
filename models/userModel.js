const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);
