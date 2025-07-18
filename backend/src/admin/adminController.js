const express = require("express");

const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const {
  users,
  users_farms,
  crop_list,
  sequelize,
  inputs,
  soil_list,
  useraddresses,
  users_details,
  field_list,
  nutrient_list
} = require("../../Database/models");
const { Op, where, Model } = require("sequelize");
const { raw } = require("mysql2");

require("dotenv").config();

const app = express();
app.use(express.json());
const fetchUserList = async (req, res) => {
  try {
    let data = {};

    const users_details = req.User;

    const userList = await users.findAll({
      where: {
        deleted_at: null,
      },
      include: users_details,
    });

    // console.log(userList, "userlistsss");
    data = {
      userList: userList,
    };
    return customResponse(res, true, 200, data, "fetch success");
  } catch (error) {
    return failureResponse(res, error);
  }
};

//total count of user
const TotalUser = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const Allusercount = await users.count({
      where: {
        deleted_at: null,
      },
    });

    data = {
      usercount: Allusercount,
    };
    return customResponse(res, true, 200, data, "User counts");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const ActiveUser = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const Allactivecount = await users.count({
      where: {
        deleted_at: null,
        is_verified: Number(1),
      },
    });

    data = {
      usercount: Allactivecount,
    };
    return customResponse(res, true, 200, data, "User counts");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const getLastMonthUserCount = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0,
      23,
      59,
      59
    );

    const count = await users.count({
      where: {
        created_At: {
          [Op.between]: [startOfLastMonth, endOfLastMonth],
        },
      },
    });
    data = {
      lastmonth: count,
    };
    return customResponse(res, true, 200, data, "User counts");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const orgaincAvg = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const organic = await users_farms.findAll({
      where: {
        deleted_at: null,
      },
      attributes: [
        "is_organic", // Group by this column
        [sequelize.fn("COUNT", sequelize.col("is_organic")), "organic_count"], // Count the users in each group
      ],
      group: ["is_organic"], // Group by 'is_organic'
    });

    console.log(organic, "usercoujnt");

    // Calculate the average of 's_ph' without grouping by 's_ph'
    const phlevel = await soil_list.findAll({
      where: {
        deleted_at: null,
      },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("s_ph")), "ph_avg"], // Calculate average of 's_ph'
      ],
      raw: true,
    });
    console.log(phlevel, "lelevlelvell");

    const cropaverage = await crop_list.findAll({
      where: {
        deleted_at: null,
      },
      raw: true,
      attributes: [
        "crop", // Group by this column
        [sequelize.fn("COUNT", sequelize.col("crop")), "crop_count"], // Count the users in each group
      ],
      group: ["crop"], // Group by 'is_organic'
    });
    console.log(cropaverage, "crop");

    const irrigationaverage = await crop_list.findAll({
      where: {
        deleted_at: null,
      },
      raw: true,
      attributes: [
        "irrigation_mth", // Group by this column
        [
          sequelize.fn("COUNT", sequelize.col("irrigation_mth")),
          "irrigarion_count",
        ], // Count the users in each group
      ],
      group: ["irrigation_mth"], // Group by 'is_organic'
    });

    data = {
      organiccount: organic,
      phlevel: phlevel,
      crop: cropaverage,
      irrig: irrigationaverage,
    };
    return customResponse(res, true, 200, data, "User counts");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const chemicalsracord = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count: chemicalCount, rows: chemicaldata } =
      await inputs.findAndCountAll({
        where: {
          deleted_at: null,
        },
        offset: offset,
        limit: limit,
        raw: true,
      });

    const { count: soilCount, rows: soildata } =
      await soil_list.findAndCountAll({
        where: {
          deleted_at: null,
        },
        offset: offset,
        limit: limit,
        raw: true,
      });
    const { count: cropCount, rows: cropdata } =
      await crop_list.findAndCountAll({
        where: {
          deleted_at: null,
        },
        offset: offset,
        limit: limit,
        raw: true,
      });

    const { count: farmerCount, rows: farmerlist } =
      await users.findAndCountAll({
        attributes: ["id", "email", "created_at", "status"],
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: users_details,
            as: "users_detail",
            attributes: ["name", "number"],
          },
          {
            model: useraddresses,
            as: "useraddress",
            attributes: ["address"],
          },
        ],
        offset: offset,
        limit: limit,
      });

    const data = {
      inputs: chemicaldata,
      soil: soildata,
      crop: cropdata,
      farmer: farmerlist,
      totalChemicalItems: chemicalCount,
      totalSoilItems: soilCount,
      totalCropItems: cropCount,
      totalFarmers: farmerCount,
      currentPage: page,
      totalPages: Math.ceil(chemicalCount / limit),
    };

    return customResponse(
      res,
      true,
      200,
      data,
      "Chemical and soil data fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const farmerdetails = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from params
    const { page = 1, limit = 10 } = req.query; // Get pagination params (default: page=1, limit=10)
    console.log(id, "iddd");

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Calculate offset
    const offset = (page - 1) * limit;

  // Personal details
  const personaldetail = await users.findOne({
    where: { id: id },
    include: [
      {
        model: users_details,
        as: "users_detail",
        attributes: ["name", "number", "relative_name", "dob"],
        where: { deleted_at: null },
        required: false,
      },
      {
        model: useraddresses,
        as: "useraddress",
        attributes: ["address", "district", "block"],
        where: { deleted_at: null },
        required: false,
      },
    ],
    raw: true,
  });
  
    const farmdetail = await users_farms.findAndCountAll({
      where: { user_farm_id: id },
      limit: limit,
      offset: offset,
      include: [
        {
          model: field_list,
          include: [
            {
              model: crop_list,
              include: [
                {
                  model: inputs,
                },
              ],
            },
            {
              model: soil_list,
            },
            {
              model: nutrient_list,
            },
          ],
        },
      ],
    });
    

    const data = {
      personal: personaldetail,
      farmdetail: farmdetail, // farm + fields + crops + inputs + soil + nutrient
      totalCount: farmdetail.count,
    };
    
    return customResponse(
      res,
      true,
      200,
      data,
      "Personal and farm data fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};


module.exports = {
  fetchUserList,
  TotalUser,
  ActiveUser,
  getLastMonthUserCount,
  orgaincAvg,
  chemicalsracord,
  farmerdetails,
};
