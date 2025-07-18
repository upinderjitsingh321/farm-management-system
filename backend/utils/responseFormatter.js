const { logger } = require("../common/logger/logger");

const customResponse = (res, isSuccess = true, status, data, message = "") => {
  return res
    .status(status)
    .json({ success: isSuccess, statusCode: status, data, message });
};




const failureResponse = (res, error) => {
  logger.error(error);
  logger.error(error?.message);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    data: error,
    message: "Internal server error",
  });
};

module.exports = {
  customResponse,
  failureResponse,
};
