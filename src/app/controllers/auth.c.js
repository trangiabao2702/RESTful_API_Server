const userModel = require("../models/user.m");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {
  // [POST] /register
  registerUser: async (req, res) => {
    try {
      // do something...

      res.status(200).json("...");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
