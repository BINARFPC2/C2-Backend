"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasOne(models.Transaction, { foreignKey: "paymentId" });
    }
  }
  Payment.init(
    {
      cardNumber: DataTypes.STRING,
      cardHolderName: DataTypes.STRING,
      cvc: DataTypes.INTEGER,
      expiration: DataTypes.INTEGER,
      country: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "payment",
      tableName: "payments",
    }
  );
  return Payment;
};
