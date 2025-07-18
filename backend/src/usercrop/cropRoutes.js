const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { createCrop, croppage, UsercropList, cropList, cropsummary } = require("./cropController");

const router = require("express").Router();



router.post("/usercrop",UserMiddlerWare,createCrop)
router.get("/usercroplist",UserMiddlerWare,UsercropList)
router.get("/fieldsname",UserMiddlerWare,croppage)
router.get("/croplist",UserMiddlerWare,cropList)
router.get("/avgcropdata",UserMiddlerWare,cropsummary)


module.exports=   router