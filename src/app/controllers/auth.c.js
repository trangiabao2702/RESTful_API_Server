import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import userModel from "../models/user.m.js";

// list current refresh tokens
let refreshTokens = [];

// generate JWT_ACCESS_TOKEN
const generateAccessToken = (user) => {
  const { password, ...infoUser } = user._doc;

  return jwt.sign(infoUser, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.EXPIRE_TIME_ACCESS_KEY });
};

// generate JWT_REFRESH_TOKEN
const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.EXPIRE_TIME_REFRESH_KEY }
  );
};

const authController = {
  // [POST] /register
  register: async (req, res) => {
    try {
      // check if email/phone existed
      const user = await userModel.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
      });

      if (user !== null) {
        return res.status(409).json("Email/Phone already exists!");
      }

      // hash password
      const salt = await bcrypt.genSalt(11);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // create a new user
      const infoUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashed,
      };

      // save user to database
      await userModel.create(infoUser);

      return res.status(200).json("Register successfully!");
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /login
  login: async (req, res) => {
    try {
      // get user from database
      const user = await userModel.findOne({
        $or: [{ email: req.body.username }, { phone: req.body.username }],
      });

      if (user === null) {
        return res.status(404).json("Username doesn't exist!");
      }

      // check password
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(404).json("Wrong password!");
      } else {
        // create access and refresh tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // add refresh token to list
        refreshTokens.push(refreshToken);

        // save refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "none",
        });

        return res.status(200).json({ accessToken: accessToken });
      }
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /refresh
  requestNewRefreshToken: async (req, res) => {
    try {
      // take refresh token from user
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) return res.status(401).json("401 Unauthorized!");

      // check if we have a refresh token but it isn't our list refresh tokens
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("403 Forbidden!");
      }

      // verify refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (error, userInfo) => {
        // if token has expired
        if (error) {
          console.log(error);

          return res.status(500).json("500 Internal Server Error!");
        }

        // get user's information
        const objectId = new Types.ObjectId(userInfo.userId);
        const user = await userModel.findOne({ _id: objectId });
        const { password, ...info } = user._doc;

        // delete old refresh token
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        // create new access and refresh tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // add new refresh token to list
        refreshTokens.push(newRefreshToken);

        // save new refresh token in cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "none",
        });

        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },

  // [POST] /logout
  logout: async (req, res) => {
    try {
      // delete refresh token from list and cookie
      refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
      res.clearCookie("refreshToken");

      res.status(200).json("Log out successfully!");
    } catch (error) {
      console.log(error);

      res.status(500).json("500 Internal Server Error!");
    }
  },
};

export default authController;
