const express = require("express");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const {
  users,
  users_farms,
  field_list,
  inputs,
  crop_list,
  activity,
} = require("../../Database/models");
const { where } = require("sequelize");
require("dotenv").config();

const app = express();
app.use(express.json());

const HomePagedata = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const CustomData = await users.findAll({
      where: {
        id: userdata.id,
      },
      include: [
        {
          model: users_farms,
          include: [
            {
              model: field_list,
              include: [
                {
                  model: crop_list,
                  include: [
                    {
                      model: activity,
                    },
                    {
                      model: inputs,
                    },
                   
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const data = {
      list: CustomData,
    };

    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};
module.exports = {
  HomePagedata,
};
