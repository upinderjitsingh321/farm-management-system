const { authMiddleware } = require("../middleware/authMiddleware");
const { fetchUserList, TotalUser, ActiveUser, getLastMonthUserCount, orgaincAvg, phAvg, chemicalsracord, farmerdetails } = require("./adminController");

const router = require("express").Router();

router.get('/all-user',authMiddleware,fetchUserList)
router.get("/alluser-count",authMiddleware,TotalUser)
router.get("/allactive-count",authMiddleware,ActiveUser)
router.get("/lastmonth-count",authMiddleware,getLastMonthUserCount)
router.get("/organic-count",authMiddleware,orgaincAvg)
router.get("/chemicalsdata",authMiddleware,chemicalsracord)
router.get("/farmerdata/:id",authMiddleware,farmerdetails)


module.exports = router