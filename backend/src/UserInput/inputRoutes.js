const { UserMiddlerWare } = require("../middleware/userMiddleware");
const { CreateInput, UserInputList, DeleteChemical } = require("./inputController");

const router = require("express").Router();


router.post("/createinput",UserMiddlerWare,CreateInput)
router.get("/userinputlist",UserMiddlerWare,UserInputList)
router.delete("/chemical/:id", DeleteChemical);



module.exports=   router