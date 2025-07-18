const express = require("express");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const { users, users_farms } = require("../../Database/models");
const { where } = require("sequelize");
require("dotenv").config();

const app = express();
app.use(express.json());

const UserFarm = async (req, res) => {
  let data = {};
  try {
    console.log(req.User, "reqisisisisi");
    const roleID = Object.getOwnPropertyNames(req.User);

    const userdata = req?.User[roleID[0]];
    console.log(req?.User[roleID[0]], "user detail data");

    const { owner, farm_name, farm_id, latitude,is_organic, longitude } = req.body;
    console.log(req.body, "1111111");
    // const existingUser = await users.findOne({
    //   where: { email },
    // });
    // if (!existingUser) {
    //   return customResponse(res, false, 400, {}, "Email is already taken.");
    // }

    // const createuser = await users_farms.create({
    //     user_farm_id:userdata.id,
    //     farm_name,
    //     created,
    //     year,
    //     farms,
    //     area,
    //     fields,
    //     expenditure,
    //     profit
    // });

    let uploadData = {
      owner: owner,
      longitude: longitude,
      latitude: latitude,
      is_organic: is_organic,
      farm_name: farm_name,
      farm_id: farm_id,
      user_farm_id: userdata.id,
    };

    const farmcreate = await users_farms.create(uploadData);
    console.log(uploadData, "2222");
    data = {
      farm: farmcreate,
    };
    return customResponse(res, true, 200, data, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const UserFarmList = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];
    const { page_no = 1, rows = 5 } = req.query;

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    const filters = {
      deleted_at: null,
      user_farm_id: userdata.id,
    };

    const farmlist = await users_farms.findAll({
      where: filters,
      offset: skip,
      limit: limit,
      order: [['created_at', 'DESC']]
    });

    const totalFarmCount = await users_farms.count({
      where: filters,
    });

    data = {
      list: farmlist,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalFarmCount,
    };

    return customResponse(res, true, 200, data, "Success fetch");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};



module.exports = {
  UserFarm,
  UserFarmList,
  
};
