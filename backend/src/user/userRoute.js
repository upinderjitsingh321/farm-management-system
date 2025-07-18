const { upload } = require("../middleware/multer");
const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { userSignup, verifyEmail, LogIn, Edit_Detail, GetUserDetails } = require("./userController");

const router = require("express").Router();


// router.post("/login", userController.loginUser);

router.post("/sign-up",upload.single('file'), userSignup)
router.post("/verify", verifyEmail)
router.post("/login", LogIn)
router.post("/edit_detail",upload.single('file'), Edit_Detail)
router.get("/userdetail",UserMiddlerWare, GetUserDetails)
// router.post("delte-user",deleteUSer)




module.exports = router