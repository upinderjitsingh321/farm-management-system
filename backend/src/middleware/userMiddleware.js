const jwt = require("jsonwebtoken");
const {
  customResponse,
  failureResponse,
} = require("../../utils/responseFormatter");

const { users } = require("../../Database/models");

const UserMiddlerWare = async (req, res, next) => {
  try {
    
    const { access_token } = req.headers;

    console.log(access_token, "access token");

    let decoded = {};
    try {
      decoded = jwt.verify(access_token, "secretecode0021");
    } catch (error) {
      console.log(error, "ererer");
      return customResponse(res, false, 400, {}, "Invalid or expired token.");
    }

    const existEmail = await users.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!existEmail) {
    }

    if (decoded.role_id == 1) {


      return customResponse(res, false, 401, {}, "Authorization");
    }


    let roleId = decoded.role_id

    req.User = {};

    req.User[roleId] = decoded;

 

    next();
  } catch (error) {
    return failureResponse(res, error);
  }
};
module.exports = {
  UserMiddlerWare,
};
