const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../model/Users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**-----------------------------------------------
 * @desc    Get All users
 * @route   /api/
 * @method  GET
 * @access  private
 ------------------------------------------------*/
let getAll = asyncHandler(async (req, res) => {
  let user = await User.find();
  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc    Get Single User Profile
 * @route   /user/profile/:id
 * @method  GET
 * @access  private
 ------------------------------------------------*/
let getProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc    Update User Profile
 * @route   /user/profile/update/:id
 * @method  PUT
 * @access  private (users only)
 ------------------------------------------------*/

let updateProfile = asyncHandler(async (req, res) => {
  let error = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true }).select("-password");
  res.send(user);
});

/**-----------------------------------------------
 * @desc    Upload User Profile IMG 
 * @route   /user/profile/imageupload:id
 * @method  POST
 * @access  private
 ------------------------------------------------*/
let uploadImg = asyncHandler(async(req,res)=>{
  if(!req.file){
    return res.status(400).json({message:"No file uploaded"})
  }
  res.status(200).json({message:"Uploaded Succecfully"})
})
/***
 * @desc    Delete User
 * @route   /user/:id
 * @method  DELETE
 *  @access  private (users and admin only)
 */
let deleteUser = asyncHandler(async (req, res) => {
  
})


module.exports = {
  getAll,
  getProfile,
  updateProfile,
  uploadImg
};
