const express = require("express");
const userRoutes = require("../src/user/userRoute");
const adminRoutes = require("../src/admin/adminRoutes")
const farmRoutes = require("../src/user_farm/farmRoutes")
const fieldRoutes = require("../src/user_fields/fieldRoutes")
const cropRoutes = require("../src/usercrop/cropRoutes")
const activityRoutes = require("../src/userActivity/activityRoutes")
const inputRoutes = require("../src/UserInput/inputRoutes")
const soilRoutes = require("../src/usersoiltest/soilRoutes")
const historyRoutes = require("../src/Crophistory/historyRoutes")
const expenseRoutes = require("../src/production/expenseRoutes")
const homeRoutes = require("../src/homePage/homeRoutes")
const passwordRoutes = require("../src/resetPassword/passwordRoutes")
const app = express.Router();




app.use("/user",userRoutes)
app.use("/userfarm",farmRoutes)
app.use("/field",fieldRoutes)
app.use("/crop",cropRoutes)
app.use("/activity",activityRoutes)
app.use("/input",inputRoutes)
app.use("/soil",soilRoutes)
app.use("/crop_history",historyRoutes)
app.use("/expense",expenseRoutes)
app.use("/homedata",homeRoutes)
app.use("/admin",adminRoutes)
app.use("/password",passwordRoutes)





module.exports = app;