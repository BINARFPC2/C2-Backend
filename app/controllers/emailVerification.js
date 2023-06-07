const { user } = require("../models");
const nodemailer = require("nodemailer");

module.exports = {
  // find user by email
  async findEmail(email) {
    return user.findOne({
      where: {
        email,
      },
    });
  },

  // check verified
  async checkVerified(email) {
    return user.findOne({
      where: {
        email,
      },
    });
  },

  // send email verification
  // sendEmailverification: (req, res) => {
  //   const { email } = req.body;
  // },
};
