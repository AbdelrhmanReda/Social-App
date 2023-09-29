const mongoose = require("mongoose");
require("dotenv").config();
DB_URL = process.env.MONGODB_URL;
module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log("connected");
  } catch (err) {
    console.log(`Failed to connect DB ...`);
    throw err;
  }
};
