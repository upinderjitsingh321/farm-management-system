const jwt = require("jsonwebtoken"); // import jwt
const crypto = require("crypto");
 

// create token accepr data,expire time//
const createToken = (slug, expiresIn = "") => {
  const maxAge = 1 * 24 * 60 * 60; // 1 day


  // token sign
  const token = jwt.sign(
    {
      ...slug,
    },
    "secretecode0021",
    {
      expiresIn: expiresIn || maxAge,
    }
  );
  return token;
};

const recordsFetch = (page_no, number_of_rows) => {
  let pageNumber;
  let recordsPerPage;

  !page_no ? (pageNumber = 1) : (pageNumber = Number(page_no));
  !number_of_rows
    ? (recordsPerPage = 10)
    : (recordsPerPage = Number(number_of_rows));
  let skipRecords = (pageNumber - 1) * recordsPerPage;
  return { skipRecords, recordsPerPage };
};

const convertArrayValuesToSingle = (obj) => {
  for (const prop in obj) {
    if (Array.isArray(obj[prop])) {
      obj[prop] = obj[prop][0];
    }
  }
  return obj;
};

function mediaKeyGenerator(imagePath) {
  try {
    if (imagePath) {
      const pathArray = imagePath.split("/");
      let imageKeyPrefix = pathArray[pathArray.length - 2];
      let imageSuffix = pathArray[pathArray.length - 1]?.split(".");
      imageKey = imageKeyPrefix + "/" + imageSuffix[0];
      return imageKey;
    } else {
      return "123.jpg";
    }
  } catch (error) {
    return new Error(error);
  }
}

function generateRandomString() {
  const section1 = crypto.randomBytes(8).toString("hex").slice(0, 15);
  const section2 = crypto.randomBytes(3).toString("hex").slice(0, 5);
  const section3 = crypto.randomBytes(2).toString("hex").slice(0, 3);

  return `${section1}-${section2}-${section3}`;
}

function generatePassword(length = 8) {
  return Array.from(crypto.randomBytes(length))
    .map((byte) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return characters[byte % characters.length];
    })
    .join("");
}
function generateUUID() {
  return (
    crypto.randomBytes(4).toString("hex") +
    "-" +
    crypto.randomBytes(2).toString("hex") +
    "-" +
    crypto.randomBytes(2).toString("hex") +
    "-" +
    crypto.randomBytes(2).toString("hex") +
    "-" +
    crypto.randomBytes(6).toString("hex")
  );
}

function calculateFutureDate(daysToAdd) {
  const currentDate = new Date(); // Get the current date and time
  currentDate.setDate(currentDate.getDate() + daysToAdd); // Add the specified number of days

  // Return the formatted result
  return currentDate.toISOString(); // Returns the date and time in a readable format
}

module.exports = {
  createToken,
  recordsFetch,
  convertArrayValuesToSingle,
  mediaKeyGenerator,
  generateRandomString,
  generatePassword,
  generateUUID,
  calculateFutureDate
};
