const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { UserFields, UserFieldList, FarmList, FieldList } = require("./fieldController");

const router = require("express").Router();



router.post("/userfield",UserMiddlerWare,UserFields)
router.get("/userfieldlist",UserMiddlerWare,UserFieldList)
router.get("/fieldlist",UserMiddlerWare,FieldList)
router.get("/farmlist",UserMiddlerWare,FarmList)

module.exports=   router