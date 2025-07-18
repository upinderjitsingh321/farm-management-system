const express = require("express");
const cors = require("cors");
const {
  failureResponse,
  customResponse,
} = require("../../utils/responseFormatter");
const { users } = require("../../Database/models"); // You forgot to import 'users'
const { where } = require("sequelize");
const jwt = require("jsonwebtoken"); // You forgot to import 'jsonwebtoken'
const bcrypt = require("bcrypt"); // You forgot to import 'bcrypt'
// const {  forgotPasswordMail } = require("../../utils/mailService"); // Assuming you have this
// const { createToken } = require("../../utils/jwtHelper"); // Assuming you have createToken function
const { sendMail } = require("../../common/sendMail/sendMail");
const { forgotPasswordMail } = require("../../common/emailTemplate/forgetPassword");
const { createToken } = require("../../utils/helper");
require("dotenv").config();

const app = express();
app.use(express.json());

// ================================================
// Forget Password Controller
// ================================================
const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return customResponse(res, false, 400, null, "Email is required");
      }
  
      const userDetails = await users.findOne({ where: { email } });
  
      if (!userDetails) {
        return customResponse(res, false, 404, null, "User not found with this email");
      }
  
      // Generate a reset token (this is a one-time token for the user to reset their password)
      const resetToken = createToken(
        {
          email: userDetails.email,
          id: userDetails.id
        },
        "1h" // 1 hour expiration for reset token
      );
  
      const resetUrl = `http://localhost:5173/changepassword/${resetToken}`;
  
      // Prepare email content (you would use a real email template here)
      const emailContent = forgotPasswordMail({ url: resetUrl })['description'];  
      await sendMail(userDetails.email, "Password Reset Request", emailContent);
  
      return customResponse(res, true, 200, null, "Password reset link sent to your email");
  
    } catch (error) {
      console.error("Error in forgot password:", error);
      return failureResponse(res, error);
    }
  };
  

// const emailContent = forgotPasswordMail({ resetUrl })['description'];

// ================================================
// Reset Password Controller
// ================================================
const resetPassword = async (req, res) => {
    try {
      const { token, password } = req.body;
  
      if (!token || !password) {
        return customResponse(res, false, 400, null, "Token and password are required");
      }
  
      let decodedToken = {};
      try {
        decodedToken = jwt.verify(token, "secretecode0021"); // Verify the reset token
      } catch (err) {
        return customResponse(res, false, 401, null, "Invalid or expired token");
      }
  
      const user = await users.findOne({ where: { email: decodedToken.email } });
  
      if (!user) {
        return customResponse(res, false, 404, null, "User not found");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await users.update({ password: hashedPassword }, { where: { email: decodedToken.email } });
  
      return customResponse(res, true, 200, null, "Password has been reset successfully");
  
    } catch (error) {
      console.error("Error resetting password:", error);
      return failureResponse(res, error);
    }
  };
  
  

module.exports = {
    forgotPassword,
  resetPassword,
};
