require("dotenv").config();
// require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const { logger } = require("../../common/logger/logger");
const cloudinary = require("cloudinary").v2;
// const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
// const s3 = new AWS.S3();
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// const region = process.env.AWS_S3_REGION;
// const Bucket = process.env.AWS_S3_BUCKET;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// AWS.config.update({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
//   region: region,
// });

const uploadFile = async (
  filePath,
  contentDataType = "image/*",
  mimeTypeMedia = "a/b"
) => {
  const valueAfterSlash = mimeTypeMedia.split("/")[1];
  try {
    if (process.env.ENVIRONMENT === "production") {
      let response = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
      return {
        response_url: response.secure_url,
        response_id: response.public_id,
      };
      // const imageBuffer = fs.readFileSync(filePath);
      // const params = {
      //   Bucket: Bucket,
      //   Key:
      //     contentDataType === "image/*"
      //       ? "images/" +
      //         Math.floor(Math.random() * Date.now()) +
      //         "_" +
      //         path.basename(filePath)
      //       : "audios/" +
      //         Math.floor(Math.random() * Date.now()) +
      //         "_" +
      //         path.basename(filePath) +
      //         `.${valueAfterSlash}`,
      //   Body: imageBuffer,
      //   ContentType: contentDataType,
      // };
      // const response = await s3.upload(params).promise();
      // return { response_url: response.Location, response_id: response.Key };
    } else {
      let response = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
      });
      return {
        response_url: response.secure_url,
        response_id: response.public_id,
      };
    }
  } catch (error) {
    logger.error(error, error.message);
    throw "Unable to upload file";
  }
};

const deleteFile = async (imageKey) => {
  try {
    if (process.env.ENVIRONMENT === "production") {
      // const params = {
      //   Bucket: Bucket,
      //   Key: imageKey,
      // };
      // let response = await s3.deleteObject(params).promise();
      // return response;

      let response = await cloudinary.uploader.destroy(imageKey);
      return response;
      
    } else {
      let response = await cloudinary.uploader.destroy(imageKey);
      return response;
    }
  } catch (error) {
    logger.error(error, error.message);
    throw "Unable to delete file";
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};
