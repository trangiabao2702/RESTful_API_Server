require("dotenv").config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Server",
      version: "1.0.0",
      description: "RESTful API Server",
    },
    servers: [
      {
        url: process.env.SERVER_HOST,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
