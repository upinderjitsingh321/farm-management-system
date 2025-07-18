const express = require("express");
const {
  inputs,
  field_list,
  users_farms,
  crop_list,
} = require("../../Database/models");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { Op, where } = require("sequelize");
require("dotenv").config();

const CreateInput = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const {
      field_no,
      name,
      inputname,
      active_ing,
      period,
      rate,
      dosage,
      date,
      manufacture_com,
      cropId,
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
    switch (inputname) {
      case "herbicide":
        await validCrop.update({
          herbicide: (Number(validCrop?.herbicide) + 1).toString(),
        });
        break;

      case "organic":
        await validCrop.update({
          organic: (Number(validCrop?.organic) + 1).toString(),
        });

        break;

      case "fungicide":
        await validCrop.update({
          fungicide: (Number(validCrop?.fungicide) + 1).toString(),
        });

        break;

      case "insecticide":
        await validCrop.update({
          insecticide: (Number(validCrop?.insecticide) + 1).toString(),
        });

        break;

      default:
        await validCrop.update({
          fertilizer: (Number(validCrop?.fertilizer) + 1).toString(),
        });

        break;
    }

    console.log(validCrop, "validcrop");

    const uploadData = {
      field_id: validCrop.id,
      field_no: field_no,
      inputname: inputname,
      name: name,
      active_ing: active_ing,
      rate: rate,
      period: period,
      dosage: dosage,
      date: date,
      manufacture_com: manufacture_com,
    };

    const fieldcreate = await inputs.create(uploadData);
    await validCrop.save();
    return customResponse(res, true, 200, { field: fieldcreate }, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const UserInputList = async (req, res) => {
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
    const activities = await inputs.findAll({
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
      offset: skip,
      limit,
      raw: true,
      nest: true,
    });
    console.log(activities, "check actities");
    const totalCount = await inputs.count({
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


const DeleteChemical = async (req, res) => {
  try {
    const { id } = req.params; // assuming you pass the ID in the URL
    await inputs.findByIdAndDelete(id); // Or equivalent delete logic
    
    res.status(200).json({ message: "Chemical record deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chemical record." });
  }
};
module.exports = {
  CreateInput,
  UserInputList,
  DeleteChemical
};
