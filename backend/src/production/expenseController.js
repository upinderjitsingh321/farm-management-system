const express = require("express");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const { inputs,field_list,users_farms,users, crop_list, activity, sequelize } = require("../../Database/models");
const { where } = require("sequelize");
require("dotenv").config();

const app = express();
app.use(express.json());

const ExpenseList = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { page_no = 1, rows = 5 } = req.query;

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const offset = (pageNo - 1) * limit;
    const cropData = await crop_list.findAll({
      include: [
        {
          model: inputs,
        },
        {
          model: activity,
        },
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id, // filter based on the user's id
                deleted_at: null,           // (optional) ensure farm is not deleted
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
      where: {
        deleted_at: null, 
        
      },
      limit,
      offset,
    });
    


    const totalCounts = await crop_list.count({
      distinct: true,
      col: 'id', // count by primary key (id)
      include: [
        {
          model: inputs,
        },
        {
          model: activity,
        },
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id, // filter based on the user's id
                deleted_at: null,           // (optional) ensure farm is not deleted
              },
              required: true, 
            },
          ],
          required: true, 
        },
      ],
      where: {
        deleted_at: null, 
        
      },
    });

    const data = {
      list: cropData,
      totalCounts,
    };

    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};


const getAvgFarmCost = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    // Labour cost from crop_list
    const labourData = await crop_list.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('labour')), 'total_labour_cost']],
      include: [{
        model: field_list,
        attributes: [],
        required: true,
        include: [{
          model: users_farms,
          attributes: [],
          required: true,
          include: [{
            model: users,
            attributes: [],
            required: true,
            where: { id: userdata.id }
          }]
        }]
      }],
      raw: true,
      subQuery: false
    });

    // Input cost from inputs
    const inputData = await inputs.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('rate')), 'total_input_cost']],
      include: [{
        model: crop_list,
        attributes: [],
        required: true,
        include: [{
          model: field_list,
          attributes: [],
          required: true,
          include: [{
            model: users_farms,
            attributes: [],
            required: true,
            include: [{
              model: users,
              attributes: [],
              required: true,
              where: { id: userdata.id }
            }]
          }]
        }]
      }],
      raw: true,
      subQuery: false
    });

    // Activity cost from activity
    const activityData = await activity.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('rate')), 'total_activity_cost']],
      include: [{
        model: crop_list,
        attributes: [],
        required: true,
        include: [{
          model: field_list,
          attributes: [],
          required: true,
          include: [{
            model: users_farms,
            attributes: [],
            required: true,
            include: [{
              model: users,
              attributes: [],
              required: true,
              where: { id: userdata.id }
            }]
          }]
        }]
      }],
      raw: true,
      subQuery: false
    });

    const labourCost = parseFloat(labourData[0]?.total_labour_cost || 0);
    const inputCost = parseFloat(inputData[0]?.total_input_cost || 0);
    const activityCost = parseFloat(activityData[0]?.total_activity_cost || 0);

    const totalCost = labourCost + inputCost + activityCost;
    const avgCost = totalCost / 3;

    const data = {
      total_labour_cost: labourCost,
      total_input_cost: inputCost,
      total_activity_cost: activityCost,
      avg_total_cost: avgCost.toFixed(2)
    };

    return customResponse(res, true, 200, data, "Average cost calculated successfully.");

  } catch (error) {
    console.error("Cost calculation error:", error);
    return failureResponse(res, error);
  }
};


module.exports = {
  ExpenseList,
  getAvgFarmCost
};
