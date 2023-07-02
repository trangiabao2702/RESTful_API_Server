import { Router } from "express";

import authController from "../app/controllers/auth.c.js";
import authenticationMiddleware from "../middleware/authentication.js";

const router = Router();

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
 *           example:
 *             name: Test Account 01
 *             phone: "0123456789"
 *             email: account01@gmail.com
 *             password: account01
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Register successfully!
 *     '409':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Email/Phone already exists!
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: user login
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: user's name
 *             password:
 *               type: string
 *               description: user's password
 *           example:
 *             username: account01@gmail.com
 *             password: account01
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: JWT access token
 *     '401':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Wrong password!
 *     '404':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Username doesn't exist!
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/refresh:
 *  post:
 *   summary: user request a new refresh token
 *   tags: [/auth]
 *   security:
 *     - cookieAuth: []
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: JWT access token
 *     '401':
 *       $ref: '#/components/responses/401'
 *     '403':
 *       $ref: '#/components/responses/404'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/refresh", authController.requestNewRefreshToken);

/**
 * @swagger
 * /auth/logout:
 *  post:
 *   summary: user logout
 *   tags: [/auth]
 *   security:
 *     - cookieAuth: []
 *     - tokenAuth: []
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Log out successfully!
 *     '401':
 *       $ref: '#/components/responses/401'
 *     '403':
 *       $ref: '#/components/responses/403'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/logout", authenticationMiddleware.verifyToken, authController.logout);

export default router;
