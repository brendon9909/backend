const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  //create the user schema
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
