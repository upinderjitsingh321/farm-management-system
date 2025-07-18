const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { ExpenseList, getAvgFarmCost } = require("./expenseController");

const router = require("express").Router();


router.get("/expenselist",UserMiddlerWare,ExpenseList)
router.get("/avgfarmcost",UserMiddlerWare,getAvgFarmCost)


module.exports=   router
