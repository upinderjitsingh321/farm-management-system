const rf = require("../../utils/responseFormatter");

const formDataValidation = async (req, res, next) => {
  let data = {};
  try {
    const contentType = req.headers["content-type"];
    if (contentType && contentType.includes("multipart/form-data")) {
      next();
    } else {
      return rf.customResponse(req,
        res,
        false,
        400,
        data,
        "Invalid request. Please send data only in multipart/form-data",
      );
    }
  } catch (error) {
    return rf.failureResponse(req, res, error);
  }
};



const applicationJsonValidation = async (req, res, next) => {
  let data = {};
  try {
    const contentType = req.headers["content-type"];
    const reqType = req.method;
    if (
      reqType === "GET" ||
      (contentType && contentType.includes("application/json")) || reqType === "DELETE"
    ) {
      next();
    } else {
      return rf.customResponse(req,
        res,
        false,
        400,
        data,
        "Invalid request. Please send data only in application/json",
      );
    }
  } catch (error) {
    return rf.failureResponse(req, res, error);
  }
};

module.exports = {
  formDataValidation,
  applicationJsonValidation,
};
