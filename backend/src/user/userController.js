const express = require("express");
require("dotenv").config(); // Ensure environment variables are loaded
const { sendMail } = require("../../common/sendMail/sendMail");
const {
  users,
  users_details,
  useraddresses,
  id_proofs,
} = require("../../Database/models");
const { createToken } = require("../../utils/helper");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupMail } = require("../../common/emailTemplate/confirmEmail");
const { roles } = require("../../Database/models");
const users_farms = require("../../Database/models/users_farms");
const app = express();
app.use(express.json());

const userSignup = async (req, res) => {
  try {
    let data = {};

    console.log(req.body, "Request Body");

    const {
      email,
      password,
      name,
      address,
      number,
      state,
      district,
      city,
      pin,
      block,
      relative_name,
      id_proof_type,
      id_proof,
    } = req.body;

    console.log(req.body, "req.body");

    const existingUser = await users.findOne({ where: { email } });
    console.log("existingUser", existingUser);

    if (existingUser) {
      return customResponse(res, false, 400, {}, "Email is already taken.");
    }

    // Hash password
    const saltRounds = 10;
    let hashPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const createUser = await users.create({
      email,
      password: hashPassword,
      is_verified: false,
      role_id: 2,
    });

    let uploadData = {
      name: name,
      number: number,
      relative_name: relative_name,
      user_id: createUser.id,
    };

    let upload_addressdata = {
      address: address,
      state: state,
      district: district,
      city: city,
      pin: pin,
      block: block,
      user_id: createUser.id,
    };
    let uploadid_proof = {
      id_proof_type: id_proof_type,
      id_proof: id_proof,
    };
    console.log(uploadData, "check");
    // Create user details
    // if (createUser) {

    await users_details.create(uploadData);
    await useraddresses.create(upload_addressdata);
    await id_proofs.create(uploadid_proof);
    // }

    // Generate JWT Token (Use only id and email)
    let token = createToken(
      { id: createUser.id, email: createUser.email },
      "24h"
    );

    // Create Verification Link
    let verificationLink = `http://localhost:5173/verify/${token}`;

    ////
    let template = signupMail({ url: verificationLink, name: name });

    // Send verification email
    await sendMail(createUser.email, template.title, template.description);

    data = { token };
    return customResponse(
      res,
      true,
      200,
      data,
      "Sign-up successful! Please verify your email."
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

// Email Verification Endpoint
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return customResponse(res, false, 400, {}, "Token is required.");
    }

    let decoded;

    try {
      decoded = jwt.verify(token, "secretecode0021");
    } catch (error) {
      return customResponse(res, false, 400, {}, "Invalid or expired token.");
    }

    const { id, email } = decoded;

    // Find user by ID
    const user = await users.findOne({ where: { id, email } });
    console.log(user, "user find");
    if (!user) {
      return customResponse(res, false, 400, {}, "User not found.");
    }

    if (user.is_verified) {
      return customResponse(res, false, 400, {}, "Email is already verified.");
    }

    // Update user verification status
    await users.update({ is_verified: true, status: 1 }, { where: { id } });

    return customResponse(
      res,
      true,
      200,
      {},
      "Email verified successfully! You can now log in."
    );
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

const LogIn = async (req, res) => {
  console.log(req.body);
  try {
    let data = {};
    const { email, password } = req.body;

    const userExist = await users.findOne({
      where: {
        email: email,
        // deleted_at:null,
        // status:1,
        // is_verified:true
      },
      attributes: ["id", "email", "password", "role_id", "is_verified"],
      include: [
        {
          model: users_details,
          as: "users_detail",
          required: false,
        },
      ],
    });

    // console.log(userExist, "user existstt");

    if (!userExist) {
      return customResponse(res, false, 400, {}, "Email not exits.");
    }

    console.log(userExist);
    if (!userExist?.is_verified) {
      return customResponse(res, false, 400, {}, "User not verified");
    }

    let comparePassword = await bcrypt.compare(password, userExist.password);

    if (!comparePassword) {
      return customResponse(res, false, 400, {}, "Incorrect credentials.");
    }

    // const userDetails =await users_details.findOne({
    //     where:{
    //         user_id :userExist.id ,
    //     }
    // })

    // if(!userDetails){
    //     return customResponse(res,false,400,{},"user details not found")
    // }

    // const roleData = await roles.findOne({
    //   where:{
    //     id:userExist.role_id
    //   }
    // })

    let token = createToken(
      { email: userExist.email, id: userExist.id, role_id: userExist.role_id },
      "24h"
    );
    // let detail = {...userExist,...userDetails,};
    // console.log(detail,"detailss loggeed")

    data = {
      token: token,
      userDetails: userExist,
    };

    return customResponse(res, true, 200, data, "login success");
  } catch (error) {
    return failureResponse(res, error);
  }
};
//api for edit
const Edit_Detail = async (req, res) => {
  try {
    const farmerId = req.params.id; // Get the farmer's ID from URL
    console.log(farmerId,"farmerId")
    const {
      name,
      address,
      number,
      state,
      city,
      pin,
      dob,
      relative_name,
      id_proof_type,
      id_proof,
    } = req.body;
    let filePath = null;

    // Check if a new file was uploaded
    if (req.file) {
      filePath = req.file.path; // Store the path of the uploaded file
    }
    const farmer = await users_details.findOne({
      where: { user_id: farmerId },
    });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    // Update the farmer's profile
    const updatedFarmer = await users_details.update(
      {
        name,
        address,
        number,
        state,
        city,
        pin,
        dob,
        relative_name,
        id_proof_type,
        id_proof,
        file: filePath,
      },
      { where: { user_id: farmerId }, returning: true } // returning: true is needed to return updated data
    );

    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Return the updated farmer profile
    res.status(200).json({
      message: "Farmer profile updated successfully",
      farmer: updatedFarmer,
    });
  } catch (error) {
    console.error("Error updating farmer profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetUserDetails = async (req, res) => {
  let data = {};
  try {
    const roleID = Object.getOwnPropertyNames(req.User);
    const userdata = req?.User[roleID[0]];
    console.log(users, "checnnewmiddleware");
    // console.log(user)

    const userDetails = await users.findOne({
      where: {
        id: userdata.id,
      },
      include: [
        {
          model: users_details, // Include the related model here
          as: "users_detail",
          required: false, // Optional: Whether or not you want this to be a LEFT JOIN (default is true for INNER JOIN)
        },
        {
          model: useraddresses, // Include the related model here
          as: "useraddress",
          required: false, // Optional: Whether or not you want this to be a LEFT JOIN (default is true for INNER JOIN)
        },
      ],
    });
    if (!userDetails) {
      return customResponse(res, false, 400, {}, "User not found.");
    }
    data = userDetails;
    return customResponse(res, true, 200, data, "Data fetched");
  } catch (error) {
    console.log(error);
    return failureResponse(res, error);
  }
};

module.exports = {
  userSignup,
  verifyEmail,
  LogIn,
  Edit_Detail,
  GetUserDetails,
};
