const swaggerJson = require("../outputSwagger.json");
require("dotenv").config();
if (process.env.NODE_ENV === "production") {
  swaggerJson.servers = [
    {
      url: `${process.env.INDEED_BACKEND_URL}/`,
      description: "staging server",
    },
  ];
} else {
  swaggerJson.servers = [
    {
      url: `${process.env.LOCAL_BACKEND_URL}/`,
      description: "First local server",
    },
    {
      url: `${process.env.INDEED_BACKEND_URL}/`,
      description: "staging server",
    },
  ];
}
module.exports = swaggerJson;
