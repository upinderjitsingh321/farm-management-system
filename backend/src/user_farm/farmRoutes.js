const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { UserFarm, UserFarmList } = require("./farmController");

const router = require("express").Router();


router.post("/userfarms",UserMiddlerWare,UserFarm)
router.get("/userfarmlist",UserMiddlerWare,UserFarmList)


module.exports=   router
