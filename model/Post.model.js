const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 500,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  author: {
    required: true,
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 100,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
