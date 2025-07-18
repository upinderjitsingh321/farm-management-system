const express = require("express");
const { field_list, users_farms,crop_list } = require("../../Database/models");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { where } = require("sequelize");
require("dotenv").config();


const FarmList = async (req, res) => {
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];
    const farmExists = await users_farms.findAll({
      attributes: ["farm_id", "farm_name"],
      raw: true,
      nest: true,
      where: {
        user_farm_id:userdata.id,
        deleted_at: null,
      },
    });
    data = {
      list: farmExists,
    };
    return customResponse(res, true, 200, data, "Success fetch");
  } catch (error) {
    console.log(error);
  }
};


const UserFields = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);

    const userdata = req?.User[roleID[0]];
    console.log(req?.User[roleID[0]], "user detail data");

    const {
      acre,
      khasra,
      landownership,
      farmpractices,
      farm_id,
      field_no,
      farm_no,
    } = req.body;

    // let uploadData = {
    //   // farm_no: farm_no,
    //   farm_name: farm_no,

    //   acre: acre,
    //   landownership: landownership,
    //   khasra: khasra,
    //   farmpractices: farmpractices,
    //   farm_name: farm_id, //userdata.id,
    //   field_no: field_no,
      
    // };
    const userFarm = await users_farms.findOne({
      where: {
        user_farm_id: userdata.id,
        farm_id: farm_no,
      },
    });

    if (!userFarm) {
      return failureResponse(res, "Farm not found for the user.");
    } 
    let uploadData = {
      farm_id: userFarm.id,
      farm_no: userFarm.farm_id,
      farm_name: farm_no, // If that's your intention
      acre: acre,
      landownership: landownership,
      khasra: khasra,
      farmpractices: farmpractices,
      field_no: field_no,
    };
    

    console.log(uploadData, "data2");
    const fieldcreate = await field_list.create(uploadData);
    console.log("Created Field:", fieldcreate);

    data = {
      field: fieldcreate,
    };
    return customResponse(res, true, 200, data, "Success");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};



// const UserFieldList = async (req, res) => {
//   let data = {};
//   try {
//     const roleID = Object.getOwnPropertyNames(req.User);
//     const userdata = req?.User[roleID[0]];

//     // Get farm_id from query params (e.g., /api/fields?farm_id=3)
//     const farm_id = req.query.farm_id;

//     if (!farm_id) {
//       return failureResponse(res, "Missing farm_id in query");
//     }

//     console.log(Number(farm_id),"farm iddid",userdata.id)

//     // Check if this farm belongs to the user (optional for security)
//     const farmExists = await users_farms.findOne({
//       where: {
//         user_farm_id: userdata.id,
//         id: Number(farm_id),
//       },
//     });


// console.log(farmExists)
//     if (!farmExists) {
//       return failureResponse(res, "Farm not found or does not belong to the user");
//     }

//     // Fetch fields only for the selected farm
//     const fields = await field_list.findAll({
//       where: {
//         farm_id: Number(farm_id),
//       },
//     });

//     data = {
//       list: fields,
//     };

//     return customResponse(res, true, 200, data, "Fields fetched successfully");
//   } catch (error) {
//     console.log(error);
//     return failureResponse(res, error);
//   }
// };
 
const UserFieldList = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];

    // Get farm_id from query params (e.g., /api/fields?farm_id=3)
    // const { farm_id, page_no = 1, rows = 5 } = req.query.farm_id;
    const { farm_id, page_no = 1, rows = 5 } = req.query;

    
    if (!farm_id) {
      return failureResponse(res, "Missing farm_id in query");
    }

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;

    console.log(Number(farm_id), "farm id did", userdata.id);

    // Optional: check if the farm belongs to the logged-in user
    const farmExists = await users_farms.findOne({
      where: {
        user_farm_id: userdata.id,
        id: Number(farm_id),
      },
    });

    if (!farmExists) {
      return failureResponse(res, "Farm not found or does not belong to the user");
    }

    // Get paginated fields
    const fields = await field_list.findAll({
      where: {
        farm_id: Number(farm_id),
      },
      offset: skip,
      limit: limit,
    });

    const totalFieldCount = await field_list.count({
      where: {
        farm_id: Number(farm_id),
      },
    });

    data = {
      list: fields,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalFieldCount,
    };

    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};


const FieldList = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];


    const { page_no = 1, rows = 5 } = req.query;

    const pageNo = Number(page_no);
    const limit = Number(rows);
    const skip = (pageNo - 1) * limit;


    const fields = await field_list.findAll({
      include: [
        {
          model: users_farms,
          where: {
            user_farm_id: userdata.id,
            deleted_at: null,
          },
        },
      ],
      where: {
        deleted_at: null,
      },
      offset: skip,
      limit: limit,
    });
    
 console.log(fields,"fields")
    const totalFieldCount = await field_list.count({
     
    });

    data = {
      list: fields,
      rows: limit,
      currentPage: pageNo,
      totalCounts: totalFieldCount,
    };

    return customResponse(res, true, 200, data, "Fields fetched successfully");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};




module.exports = {
  UserFields,
  UserFieldList,
  FieldList,
  FarmList,
};
