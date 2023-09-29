const express = require('express');
const router = express.Router();
const userController = require("../controllers/User.controller");
const verification = require("../middlewares/verification");
const uploadMW = require('../middlewares/uploadMW');

router.get("/getAll",verification.adminVerify,userController.getAll);
router.get("/user/profile/:id",userController.getProfile);
router.put("/user/profile/update/:id",userController.updateProfile)
router.post("/user/profile/imageupload",uploadMW.single("image"),userController.uploadImg)


module.exports=router