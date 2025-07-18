const { forgotPasswordMail } = require("./forgetPassword");
const { signupMail } = require("./confirmEmail");
const { accountStatusMail } = require("./accountDeactivation");
const { confirmOtp } = require("./confirmOtp");

module.exports = {
  forgotPasswordMail,
  signupMail,
  accountStatusMail,
  confirmOtp,
};
