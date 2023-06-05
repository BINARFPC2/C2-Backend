const { user } = require("../models");

module.exports = {
  async findEmail(email) {
    return user.findOne({
      where: {
        email,
      },
    });
  },
};
