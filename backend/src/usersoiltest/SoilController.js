const express = require("express");
const {
  soil_list,
  field_list,
  users_farms,
  nutrient_list,
  users
} = require("../../Database/models");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { Op } = require("sequelize");
require("dotenv").config();

const CreateSoil = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const {
      soil_id,
      field_no,
      soiltype,
      issue,
      active_ing,
      o_matter,
      e_conductivity,
      s_salinity,
      s_texture,
      s_ph,
      moistureValue,
    } = req.body;

    // Optional: Validate if user owns this field
    const validField = await field_list.findOne({
      where: { id: field_no },
      include: {
        model: users_farms,
        where: { user_farm_id: userdata.id },
      },
    });

    if (!validField) {
      return failureResponse(res, "Unauthorized or invalid field.");
    }

    console.log(validField, "validFieldvv");

    const uploadData = {
      soil_id: validField.id,
      field_no: validField.field_no,
      soiltype: soiltype,
      issue: issue,
      active_ing: active_ing,
      o_matter: o_matter,
      e_conductivity: e_conductivity,
      s_salinity: s_salinity,
      s_texture: s_texture,
      s_ph: s_ph,
      moistureValue: moistureValue,
    };

    const createsoil = await soil_list.create(uploadData);

    data = {
      soil: createsoil,
    };
    return customResponse(res, true, 200, { data }, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const Soillist = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { soil_id, page_no = 1, rows = 5 } = req.query;
    console.log(req.query, "fgfgfg");
    if (!soil_id) {
      return failureResponse(res, "Missing id in query");
    }

    console.log("Field ID:", soil_id);

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    const soildata = await users_farms.findAll({
      where: {
        deleted_at: null,
        user_farm_id: userdata.id,
      },
      include: [
        {
          model: field_list,
          include: [
            {
              model: soil_list, // ✅ Include soil_list under field_list
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    const allFiledlist = soildata.map((item) => item.field_lists);

    const allFieldIds = allFiledlist.map((item) => item.id);

    console.log(allFieldIds, "vbvbvb");

    const totalCount = await soil_list.count({
      include: [
        {
          model: field_list,
          required: true,
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
        },
      ],
      where: { deleted_at: null },
    });
    
 
    const soillist = await soil_list.findAll({
      where: {
        soil_id: soil_id,
      },

      raw: true,
      offset: skip,
      limit: limit,
    });
    console.log(soillist, "fffg");

    const data = {
      list: soillist,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount,
    };

    return customResponse(
      res,
      true,
      200,
      data,
      "Soil list fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};
const ShortSoillist = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { page_no = 1,rows = 5 } = req.query;
    console.log(req.query, "fgfgfg");
   


    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    const soildata = await soil_list.findAll({
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                deleted_at: null,
                user_farm_id: userdata.id,
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
  offset: skip,
      limit,
      raw: true,
      nest: true,
    });


    const totalCount = await soil_list.count({
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
    });

    data = {
      list: soildata,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount ?? 0,
    };

    return customResponse(
      res,
      true,
      200,
      data,
      "Soil list fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const CreateNutrient = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { nutrient_id, field_no, n, p, k, ca, mg, s, fe, mn, zn, cu, cl, b } =
      req.body;

    // Optional: Validate if user owns this field
    const validField = await field_list.findOne({
      where: { id: field_no },
      include: {
        model: users_farms,
        where: { user_farm_id: userdata.id },
      },
    });

    if (!validField) {
      return failureResponse(res, "Unauthorized or invalid field.");
    }

    console.log(validField, "validFieldvv");

    const uploadData = {
      nutrient_id: validField.id,
      field_no: validField.field_no,

      n: n, // nitrogen
      p: p, // phosphorus
      k: k, // potassium
      ca: ca, // calcium
      mg: mg, // magnesium
      s: s, // sulfur
      fe: fe, // iron
      mn: mn, // manganese
      zn: zn, // zinc
      cl: cl, // chlorine
      cu: cu, // copper
      b: b, // boron
    };

    const createnutrient = await nutrient_list.create(uploadData);

    data = {
      nutrient: createnutrient,
    };
    return customResponse(res, true, 200, { data }, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const nutrientList = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { id, page_no = 1, rows = 5 } = req.query;

    if (!id) {
      return failureResponse(res, "Missing field_id in query");
    }

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    console.log(id, "Selected field_id", userdata.id);

    const nutrient = await users_farms.findAll({
      where: {
        deleted_at: null,
        user_farm_id: userdata.id,
      },
      include: [
        {
          model: field_list,
          include: [
            {
              model: nutrient_list, // ✅ Include soil_list under field_list
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });

    const allFiledlist = nutrient.map((item) => item.field_lists);

    const allFieldIds = allFiledlist.map((item) => item.id);

    console.log(allFieldIds, "fieidiediei");
    // Now use the field.id to get crops

    const totalCount = await nutrient_list.count({
      where: {
        nutrient_id: id,
      },
    });
    const nutrientlist = await nutrient_list.findAll({
      where: {
        nutrient_id: id,
      },

      raw: true,
      offset: skip,
      limit: limit,
    });
    data = {
      list: nutrientlist,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount ?? 0,
    };

    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

module.exports = {
  CreateSoil,
  Soillist,
  ShortSoillist,
  CreateNutrient,
  nutrientList,
};
