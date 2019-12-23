const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Title is requied",
    minlength: 4,
    maxlength: 150
  },
  body: {
    type: String,
    required: "Title is requied",
    minlength: 4,
    maxlength: 150
  }
});
