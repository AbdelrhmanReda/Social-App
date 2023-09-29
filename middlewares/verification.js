const jwt = require("jsonwebtoken");
require("dotenv").config();
const adminVerify = (req, res, nxt) => {
  // const token = req.cookies.token;
  const token = req.headers["auth-token"];
  if (!token) return res.status(401).send("Access denied..");
  // console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded.isAdmin)
      return res.status(400).send("Access Denied . You have No Auutorization");
    nxt();
  } catch (error) {
    res.status(400).send("Error");
  }
};



module.exports = { adminVerify };
