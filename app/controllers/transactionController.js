const { Transaction } = require("../models");

module.exports = {
  async findTransById(req, res) {
    const { id } = req.user;
    const resTransById = Transaction.findAll({
      where: { usersId: id },
      include: { all: true, attributes: { exclude: ["name", "email"] } },
    });
    res.status(200).json({
      message: "get data by userId success",
      data: resTransById,
    });
  },
};
