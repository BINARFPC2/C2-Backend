"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "usersId",
      });

      this.hasMany(models.Checkout, {
        foreignKey: "transactionId",
      });
    }
  }
  Transaction.init(
    {
      usersId: DataTypes.UUID,
      paymentId: DataTypes.UUID,
      ticketsId: DataTypes.UUID,
      amounts: DataTypes.INTEGER,
      status: DataTypes.STRING,

      //backing data from ticket
      booking_code: DataTypes.STRING,
      airport_from: DataTypes.STRING,
      airport_to: DataTypes.STRING,
      airlines: DataTypes.STRING,
      information: DataTypes.STRING,
      dateDeparture: DataTypes.STRING,
      dateArrival: DataTypes.STRING,
      type_seat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
