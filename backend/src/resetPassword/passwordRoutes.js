const { resetPassword, forgotPassword } = require("./passwordController");

const router = require("express").Router();


router.post("/forgotpassword",forgotPassword)
router.post("/reset-password",  resetPassword)


module.exports=   router
