const express = require("express");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const { crop_list, field_list, users_farms } = require("../../Database/models");
const { where, Sequelize } = require("sequelize");
const { Op, fn, col } = require("sequelize");
const { raw } = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

const CropHistory = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { year, page_no = 1, rows = 5 } = req.query;

    if (!year) {
      return failureResponse(res, "Missing year in query");
    }

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    const crops = await crop_list.findAll({
      where: {
        // Extract the year from planting_date and match it
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("crop_list.planting")),
            year
          ),
        ],
      },
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id,
                deleted_at: null,
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
      offset: skip,
      limit,
      raw: true,
      nest: true,
    });

    console.log(crops, "getfielddd");


    const totalCount = await crop_list.count({
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id,
                deleted_at: null,
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
      where: {
        deleted_at: null,
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("crop_list.planting")),
            year
          ),
        ],
      },
    })

    const data = {
      list: crops,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount,
    };
    console.log(data, "dataaaaaaaa");

    return customResponse(
      res,
      true,
      200,
      data,
      "Crop history fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};
const CropArea = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const {  page_no = 1, rows = 5 } = req.query;


    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    const crops = await crop_list.findAll({
      
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id,
                deleted_at: null,
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
      offset: skip,
      limit,
      raw: true,
      nest: true,
    });

    console.log(crops, "getfielddd");


    const totalCount = await crop_list.count({
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id,
                deleted_at: null,
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
    })

    const data = {
      list: crops,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount,
    };

    return customResponse(
      res,
      true,
      200,
      data,
      "Crop Area fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

module.exports = {
  CropHistory,
  CropArea
};
