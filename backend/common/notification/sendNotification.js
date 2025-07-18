const admin = require("firebase-admin");
let firebaseCredentials = require("../../firebase/firebase-credentials");
let envFirebaseCredentials =
  process.env.NODE_ENV === "production"
    ? firebaseCredentials.production
    : firebaseCredentials.development;
const { app_logins, sequelize } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");
const { logger } = require("../logger/logger");
admin.initializeApp({
  credential: admin.credential.cert(envFirebaseCredentials),
});
const sendPushNotification = async (receiver_id, title, message) => {
  try {
    let deviceTokens = await app_logins.findAll({
      where: {
        user_id: receiver_id,
        device_type: { [Op.in]: [1, 2, 3] },
        device_token: { [Op.ne]: null },
      },
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("device_token")),
          "device_token",
        ],
      ],
    });
    deviceTokens = deviceTokens.map((token) => {
      if (token.dataValues?.device_token) {
        return token.dataValues?.device_token;
      }
    });
    const filteredArray = deviceTokens.filter((item) => item !== undefined);
    const messageTemplate = {
      tokens: filteredArray,
      notification: {
        title,
        body: message,
      },
    };
    let response = await admin.messaging().sendMulticast(messageTemplate);
    return response;
  } catch (error) {
    logger.error(error, error.message)
    // throw "Unable to send notification"
  }
};
module.exports = { sendPushNotification };
