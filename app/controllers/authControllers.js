const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../models");
const { v4: uuid } = require("uuid");
const { findEmail } = require("./emailVerification");
const salt = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
  async register(req, res) {
    try {
      const password = await encryptPassword(req.body.password);
      const { name, email, phone } = req.body;

      // check email and password is not empty
      if (!email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Email and password is required",
        });
      }

      // validator email format using regex
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: "error",
          message: "Email format is invalid",
        });
      }


      // check if email already exist
      const emailUser = await findEmail(email);
      if (emailUser) {
        return res.status(400).json({
          status: "Error",
          message: "Email already Exist",
          data: {},
        });
      }
      const userForm = await user.create({
        id: uuid(),
        name: name,
        password: password,
        email: email,
        phone: phone,
        verified: "false",
        image_profile:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      });

      res.status(201).json({
        status: "Success",
        message: "Created User Success",
        data: userForm,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userLogin = await user.findOne({
        where: { email },
      });

      if (!userLogin) {
        return res.status(400).json({
          status: "error",
          message: "Email tidak ditemukan",
        });
      }

      const isPasswordCorrect = await checkPassword(
        userLogin.password,
        password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          status: "error",
          message: "Pasword salah!",
        });
      }

      const token = createToken({
        id: userLogin.id,
        email: userLogin.email,
        createdAt: userLogin.createdAt,
        updatedAt: userLogin.updatedAt,
      });
      res.status(201).json({
        token: token,
        name: userLogin.name,
        createdAt: userLogin.createdAt,
        updatedAt: userLogin.updatedAt,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Login Failed",
        error: error.message,
// <<<<<<< HEAD
        data: {},
// =======
// >>>>>>> 9a7d5c261571b1ae7d3d4607ed6e4c7ba0d506c6
      });
    }
  },

  async whoAmI(req, res) {
    res.status(200).json(req.user);
  },

  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      req.user = await user.findByPk(tokenPayload.id);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  },
};
