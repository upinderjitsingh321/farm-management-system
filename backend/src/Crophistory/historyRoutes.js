const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { CropHistory, CropArea } = require("./historyController");
const router = require("express").Router();


router.get("/crophistory",UserMiddlerWare,CropHistory)
router.get("/croparea",UserMiddlerWare,CropArea)










module.exports=   router
