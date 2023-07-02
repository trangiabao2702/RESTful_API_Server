const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../config/swaggerConfig");

// const ...Router = require("./....r");

const swaggerDocs = swaggerJsdoc(swaggerOptions);

function router(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /**
   * @swagger
   *  components:
   *    schemas:
   *      UserInfo:
   *        type: object
   *        properties:
   *          id:
   *            type: integer
   *            description: user's id
   *          name:
   *            type: string
   *            description: user's name
   *          phone:
   *            type: string
   *            description: user's phone
   *          email:
   *            type: string
   *            description: user's email
   *    securitySchemes:
   *      cookieAuth:
   *        type: apiKey
   *        in: cookie
   *        name: refreshToken
   *      tokenAuth:
   *        type: apiKey
   *        in: header
   *        name: token
   */

  // app.use("/...", ...Router);
}

module.exports = router;
