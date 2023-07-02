const authController = require("../app/controllers/auth.c");
const authenticationMiddleware = require("../middleware/authentication");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: /auth
 *   description: API for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: user register
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: user's name
 *             phone:
 *               type: string
 *               description: user's phone
 *             email:
 *               type: string
 *               description: user's email
 *             password:
 *               type: string
 *               description: user's password
 *   responses:
 *     '200':
 *       description: Register successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '409':
 *       description: Email already exists! / Phone already exists!
 *     '500':
 *       description: Internal server error
 */
router.post("/register", authController.registerUser);

module.exports = router;
