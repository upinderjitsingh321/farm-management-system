const winston = require("winston");
let logConfiguration = {};

if (process.env.NODE_ENV === "production") {
  logConfiguration = {
    transports: [
      new winston.transports.File({
        filename: `./logs/error.log`,
      }),
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: "MMM-DD-YYYY hh:mm:ss.SSS A",
      }),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  };
} else {
  logConfiguration = {
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: `./logs/error.log`,
      }),
    ],
    format: winston.format.combine(
      winston.format.timestamp({
        format: "MMM-DD-YYYY hh:mm:ss.SSS A",
      }),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
  };
}
const logger = winston.createLogger(logConfiguration);

module.exports = {
  logger,
};
