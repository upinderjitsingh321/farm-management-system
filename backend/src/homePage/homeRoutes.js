const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { HomePagedata } = require("./homeController");

const router = require("express").Router();

router.get("/customdata",UserMiddlerWare,HomePagedata)






module.exports=   router