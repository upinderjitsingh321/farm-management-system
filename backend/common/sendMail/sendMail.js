var nodemailer = require("nodemailer");
const { logger } = require("../logger/logger");


const sendMail = async (receiver, title, message) => {


  console.log(process.env.ADMIN_SEND_MAIL,"email and pass",process.env.ADMIN_SEND_MAIL_PASSWORD)

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "upinderjitsingh32@gmail.com",
      pass: "xayg dvhl tqzz gzux",
    },
  });

  

  let attachmentsArr = [];

  var mailOptions = {
    from:"upinderjitsingh32@gmail.com",
    to: receiver,
    subject: title,
    html: message,
  };

  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        logger.error(error, error.message);
        return reject("Email can not be send");
      } else {
        return resolve(info);
      }
    });
  });
};


module.exports = {
  sendMail,
};
