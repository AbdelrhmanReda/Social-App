const Joi = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: {
    required: true,
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 100,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minLength: 8,
  },
  bio: { type: String },
  email: { type: String, required: true, trim: true, unique: true },
  profileImg: {
    type: Object,
    default: {
      cloudUrl: "",
    },
  },
  isAdmin: {
    default: false,
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("User", schema);

createValidation = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.required(),
  });
  schema.validate(obj);
};

validateUpdateUser = (obj) => {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    password: Joi.required(),
    bio: Joi.string(),
  });
  schema.validate(obj);
};

module.exports = { User, createValidation, validateUpdateUser };
