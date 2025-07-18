const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { CreateSoil, Soillist, CreateNutrient, nutrientList, ShortSoillist } = require("./SoilController");

const router = require("express").Router();

router.post("/createsoil",UserMiddlerWare,CreateSoil)
router.post("/createnutrient",UserMiddlerWare,CreateNutrient)
router.get("/soillist",UserMiddlerWare,Soillist)
router.get("/shortsoillist",UserMiddlerWare,ShortSoillist)
router.get("/nutrientlist",UserMiddlerWare,nutrientList)





module.exports=   router