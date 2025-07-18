const express = require("express");
const {
  crop_list,
  users,
  field_list,
  users_farms,
  sequelize,
  inputs,
} = require("../../Database/models");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { where, Op } = require("sequelize");
const { raw } = require("mysql2");
require("dotenv").config();

// const croppage = async (req, res) => {
//   try {
//     const roleID = Object.getOwnPropertyNames(req.User);
//     const userdata = req?.User[roleID[0]];

//     const { field_no } = req.query; // or req.body

//     if (!field_no) {
//       return customResponse(res, false, 400, {}, "field_no is required");
//     }
//      const userFarms = await users_farms.findAll({
//       where:{
//         user_farm_id: userdata.id,
//       },
//       raw:true,

//      })

//     const farmIds = userFarms.map(f => f.id);

//     const fields = await field_list.findAll({
//       where: {
//         farm_id: farmIds,
//         deleted_at: null,
//       },
//       attributes: ['id', 'field_no', 'farm_id'],
//       raw: true,
//     });

//     return customResponse(res, true, 200, { fields }, "Fields fetched");
//   } catch (error) {
//     console.log(error);
//   }
// };
const croppage = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const getfieldno = await field_list.findAll({
      attributes: ["farm_id", "field_no", "id", "acre"],
      raw: true,
      nest: true,
      include: {
        model: users_farms,
        where: { user_farm_id: userdata.id },
      },
    });

    const data = { list: getfieldno };
    console.log(data, "get field no");

    return customResponse(res, true, 200, data, "Success fetch");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};
const createCrop = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);

    const userdata = req?.User[roleID[0]];
    console.log(req?.User[roleID[0]], "user detail data");

    const {
      field_id,
      field,
      crop,
      acre,
      variety,
      snowing_mth,
      irrigation_mth,
      production,
      note,
      planting,
      harvest,
      price,
      fertilizer,
      herbicide,
      organic,
      fungicide,
      insecticide,
      labour,
      previous_crop,
      season_year,
      season,
      remark,
      activity,
    } = req.body;
    console.log(field_id, "idddd");
    let uploadData = {
      field: field,
      crop: crop,
      acre: acre,
      variety: variety,
      snowing_mth: snowing_mth,
      irrigation_mth: irrigation_mth,
      planting: planting,
      harvest: harvest,
      note: note,
      price: price,
      fertilizer: fertilizer,
      herbicide: herbicide,
      organic: organic,
      insecticide: insecticide,
      fungicide: fungicide,
      activity: activity,
      field_id: Number(field_id),
      previous_crop: previous_crop,
      season_year: season_year,
      labour: labour,
      season: season,
      remark: remark,
      production: production,
    };

    console.log(uploadData, "data2");
    const cropcreate = await crop_list.create(uploadData);
    // console.log(uploadData, "2222");
    data = {
      crop: cropcreate,
    };
    return customResponse(res, true, 200, data, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//       const { pageNo, location,bhk } = req.query || 1;
//       const limit = 10;
//       const offset = (pageNo - 1) * limit;
//       const where = {};
//       if (location) where.location = location.toLowerCase();
//       if (bhk) where.bhk = bhk;
//       const { count, rows } = await addproperty.findAndCountAll({
//           where,
//           limit,
//           offset,
//       });
//       if (!rows?.length) {
//           return customResponse(res, false, 400, {}, "no record found.");
//       }
//       const result = {
//           data: rows,
//           totalCount: count,
//           pageNo,
//           totalPages: Math.ceil(count / limit),
//       }
//       return customResponse(res, true, 200, result, "Data fetched");
//   } catch (error) {
//       console.log(error);
//       return failureResponse(res, error);
//     }
// };

// const UserCrops = async (req, res) => {
//   let data = {};
//   try {
//     const roleID = Object.getOwnPropertyNames(req.User);
//     const userdata = req?.User[roleID[0]];
//     console.log(userdata, "usedattatta");

//     const { pageNo } = req.query;
//     const limit = 10;
//     const offset = (pageNo - 1) * limit;
//     const { count, rows } = await crop_list.findAndCountAll({
//       where: {
//         field_id: userdata.id,
//       },
//       limit,
//       offset,
//       include: field_list,
//       raw: true,
//       nest: true,
//     });

//     const arrlist = fetchUserFarm.filter((farm) => {
//       if (farm?.field_list?.id !== null) {
//         return farm;
//       }
//     });

//     console.log(arrlist, "sadsa");

//     // const formattedData = userFarmsData.map(record => record.get({ plain: true }));

//     //   const farmlist=  await field_list.findAll({
//     //       where:{
//     //        deleted_at:null,

//     //        farm_id : userdata.id
//     //       },
//     //       offset: skip,
//     //       limit: limit
//     //     });

//     // const totalFarmCOunt = await field_list.findAll({
//     //   where: {
//     //     farm_id: userdata.id,
//     //   },
//     // });

//     // console.log(totalFarmCOunt.length);

//     // data = {
//     //   list: farmlist,
//     //   rows: limit,
//     //   currentPage: pageNo,
//     //   totalCounts: totalFarmCOunt.length,
//     // };
//     return customResponse(res, true, 200, data, "Success fetch");
//   } catch (error) {
//     console.log(error);
//     return failureResponse(res, error);
//   }
// };

const UsercropList = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const { field_id, page_no = 1, rows = 5 } = req.query;

    if (!field_id) {
      return failureResponse(res, "Missing field_id in query");
    }

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    console.log(Number(field_id), "Selected field_id", userdata.id);

    const userFarmsData = await users_farms.findAll({
      where: {
        deleted_at: null,
        user_farm_id: userdata.id,
      },
      include: [
        {
          model: field_list,
          // include: [{
          //   model: crop_list,
          // }] // ✅ This should be your associated model
        },
      ],
      raw: true,
      nest: true,
    });

    const allFiledlist = userFarmsData.map((item) => item.field_lists);

    const allFieldIds = allFiledlist.map((item) => item.id);

    console.log(allFieldIds, "fieidiediei");
    // Now use the field.id to get crops

    const totalCount = await crop_list.count({
      where: {
        field_id: Number(field_id),
      },
    });
    const allCropsWithPagination = await crop_list.findAll({
      where: {
        field_id: Number(field_id),
      },

      raw: true,
      offset: skip,
      limit: limit,
    });
    data = {
      list: allCropsWithPagination,
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
const cropList = async (req, res) => {
  let data = {};
  try {
    // Get user data
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    if (!userdata || !userdata.id) {
      return failureResponse(res, "User data is not valid", 400);
    }
    console.log(userdata.id, "userdata");
    const { page_no = 1, rows = 5 } = req.query;

    // Convert query params to numbers
    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    // Fetch user-specific crop data
    const userFarmsData = await crop_list.findAll({
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
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

    console.log(userFarmsData, "userFarmsData");

    // Fetch total count of user crops for pagination
    const totalCount = await crop_list.count({
      include: [
        {
          model: field_list,
          include: [
            {
              model: users_farms,
              where: {
                user_farm_id: userdata.id,
              },
              required: true,
            },
          ],
          required: true,
        },
      ],
      where: {
        deleted_at: null, // Only non-deleted crops
      },
    });

    // Prepare response data
    data = {
      list: userFarmsData,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalCount ?? 0,
    };

    // Return response
    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error.message || "An error occurred", 500);
  }
};

const cropsummary = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    const cropSumForUser = await crop_list.findAll({
      attributes: [
        "crop", // Group by crop name
        [sequelize.fn("SUM", sequelize.col("crop_list.acre")), "total_acres"], // Sum of acres
      ],
      include: [
        {
          model: field_list,
          attributes: [], // No need to select any columns from Field table
          include: [
            {
              model: users_farms,
              attributes: [], // No need to select any columns from Farm table
              where: {
                user_farm_id: userdata.id,
              },
              required: true,
            },
          ],
          required: true,
        },
      ],
      group: ["crop"], // Group by crop name
      where: {
        deleted_at: null,
      },
    });

    const inputCounts = await inputs.findAll({
      attributes: [
        "inputname",
        [sequelize.fn("COUNT", sequelize.col("inputname")), "usage_count"],
      ],
      include: [
        {
          model: crop_list,
          attributes: [], // Don't select crop_list fields
          include: [
            {
              model: field_list,
              attributes: [], // Don't select field_list fields
              required: true,
              include: [
                {
                  model: users_farms,
                  attributes: [],
                  where: {
                    user_farm_id: userdata.id,
                    deleted_at: null,
                  },
                  required: true,
                },
              ],
            },
          ],
          required: true,

        },
      ],
      where: { deleted_at: null },
      group: ["inputname"],
      where: {
        deleted_at: null,
      },
    });

    data = {
      Avgcropdata: cropSumForUser,
      inputscounts: inputCounts,
    };
    return customResponse(
      res,
      true,
      200,
      data,
      " Avg crop Data fetched successfully"
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

module.exports = {
  createCrop,
  cropsummary,
  UsercropList,
  cropList,
  croppage,
};
