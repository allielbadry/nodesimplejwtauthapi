const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  body: {
    type: String,
    required: true,
    min: 10,
    max: 500,
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

module.exports = mongoose.model("Post", postSchema);
