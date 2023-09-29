const asyncHandler = require("express-async-handler");
const { User, createValidation } = require("../model/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**-----------------------------------------------
 * @desc    Create/Register New User
 * @route   /domain/register
 * @method  post
 * @access  public
 ------------------------------------------------*/

let register = asyncHandler(async (req, res) => {
  let error = createValidation(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  let newUser = await User.findOne({ email: req.body.email });
  if (newUser) return res.status(400).send("this user is already registerd ");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  newUser = new User({
    username: req.body.username,
    password: hash,
    email: req.body.email,
  });
  newUser.save();
  res.status(201).json("done");
});

/**-----------------------------------------------
 * @desc    Login User
 * @route   /domain/login
 * @method  post
 * @access  public
 -----------------------------------------------*/
let login = asyncHandler(async (req, res) => {
  let error = createValidation(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  // console.log(req.body)
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Invalid Email or Password..." });
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Email or Password..." });
  }
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profileImg: user.profileImg,
    token,
    username: user.username,
  });
});

module.exports = {
  register,
  login,
};
