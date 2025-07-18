const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { CreateActivity, UserActivityList, CreateHarvestActivity } = require("./activityController");

const router = require("express").Router();


router.post("/createactivity",UserMiddlerWare,CreateActivity)
router.post("/createharvestactivity",UserMiddlerWare,CreateHarvestActivity)
router.get("/useractivitylist",UserMiddlerWare,UserActivityList)




module.exports=   router