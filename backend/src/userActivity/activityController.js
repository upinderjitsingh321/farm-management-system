const express = require("express");
const {
  activity,
  field_list,
  users_farms,
  crop_list,
} = require("../../Database/models");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { Op } = require("sequelize");
require("dotenv").config();

// CREATE ACTIVITY
const CreateActivity = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { field_no,cropId, activity_name, rate, start_date, end_date, note } =
      req.body;

    // Optional: Validate if user owns this field
    const validField = await field_list.findOne({
      include: {
        model: users_farms,
        where: { user_farm_id: userdata.id },
      },
    });

    if (!validField) {
      return failureResponse(res, "Unauthorized or invalid field.");
    }

    const validCrop = await crop_list.findOne({
      where: {
        id: cropId,
      },
      include: {
        model: field_list,
        include: {
          model: users_farms,
          where: { user_farm_id: userdata.id },
        },
      },
    });

    if (!validCrop) {
      return failureResponse(res, "Unauthorized or invalid crop.");
    }

    console.log(validCrop, "validField");
    const uploadData = {
      field_id: validCrop.id,
      field_no: field_no,
      activity_name: activity_name,
      rate: rate,
      start_date: start_date,
      end_date: end_date,
      note: note,
    };

    const fieldcreate = await activity.create(uploadData);

    return customResponse(res, true, 200, { field: fieldcreate }, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

// LIST ACTIVITIES BY CROP ID
const UserActivityList = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { crop_id, page_no = 1, rows = 5 } = req.query;

    if (!crop_id) {
      return failureResponse(res, "Missing field_id in query");
    }
    console.log("Crop ID:", crop_id);

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    // Fetch activities directly linked to a specific crop_id
    const activities = await activity.findAll({
      // include: [
      //   {
      //     model: crop_list,
      //     // where: {
      //     //   id: crop_id,
      //     // },
      //     include: [
      //       {
      //         model: field_list,
      //         include: [
      //           {
      //             model: users_farms,
      //             where: {
      //               user_farm_id: userdata.id,
      //               deleted_at: null,
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      where: {
        deleted_at: null,
        field_id:crop_id
      },
      offset: skip,
      limit,
      raw: true,
      nest: true,
    });
    console.log(activities, "check actities");
    const totalCount = await activity.count({
      include: [
        {
          model: crop_list,
          where: {
            id: crop_id,
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
                },
              ],
            },
          ],
        },
      ],
      where: {
        deleted_at: null,
      },
    });

    const data = {
      list: activities,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount,
    };

    return customResponse(
      res,
      true,
      200,
      data,
      "Activities fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const CreateHarvestActivity = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const {
      field_no,
      cropId,
      activity_name,
      rate,
      start_date,
      end_date,
      note,
    } = req.body;

    // Optional: Validate if user owns this field
    const validField = await field_list.findOne({
      include: {
        model: users_farms,
        where: { user_farm_id: userdata.id },
      },
    });

    if (!validField) {
      return failureResponse(res, "Unauthorized or invalid field.");
    }

    const validCrop = await crop_list.findOne({
      where: {
        id: cropId,
      },
      include: {
        model: field_list,
        include: {
          model: users_farms,
          where: { user_farm_id: userdata.id },
        },
      },
    });

    if (!validCrop) {
      return failureResponse(res, "Unauthorized or invalid crop.");
    }

    console.log(validCrop, "validField");
    const uploadData = {
      field_id: validCrop.id,
      field_no: field_no,
      activity_name: activity_name,
      rate: rate,
      start_date: start_date,
      end_date: end_date,
      note: note,
    };

    const fieldcreate = await activity.create(uploadData);

    return customResponse(res, true, 200, { field: fieldcreate }, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

module.exports = {
  CreateActivity,
  UserActivityList,
  CreateHarvestActivity,
};
