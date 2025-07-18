const jwt = require("jsonwebtoken");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");
const { users } = require("../../Database/models");
const authMiddleware = async (req, res, next) => {
  try {
    // get acces token//
    const { access_token } = req.headers;

    let decoded = {};
    try {
      // verify the access token//
      decoded = jwt.verify(access_token, "secretecode0021");
    } catch (error) {
      console.log(error, "ererer");
      return customResponse(res, false, 400, {}, "Invalid or expired token.");
    }

    // find user //
    const existEmail = await users.findOne({
      where: {
        email: decoded.email,
        id: decoded.id,
        deleted_at: null,
      },
    });

    if (!existEmail) {
      return customResponse(res, false, 400, {}, "user not found.");
    }
    console.log(decoded, "decodeddd");
    // check role//
    if (decoded.role_id !== 1) {
      return customResponse(res, false, 401, {}, "Unauthorize access ");
    }

    //
    let roleID = decoded.role_id;

    req.User = {
      roleID: decoded,
    };

    next();
  } catch (error) {
    return failureResponse(res, error);
  }
};

module.exports = {
  authMiddleware,
};
