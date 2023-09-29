const dbConnection = require("./connection/dbConnection");
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
PORT = process.env.PORT || 6000;
const authRouter = require("./routes/auth") ; 
const userRouter = require ("./routes/user.js")
require("dotenv").config();
dbConnection();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/",authRouter)
app.use("/",userRouter)

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}...`);
});
