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
      this.belongsTo(models.user, { foreignKey: "usersId" });
      this.belongsTo(models.Ticket, { foreignKey: "ticketsId" });
      this.belongsTo(models.Checkout, { foreignKey: "checkoutsId" });
    }
  }
  Transaction.init(
    {
      usersId: DataTypes.UUID,
      ticketsId: DataTypes.UUID,
      checkoutsId: DataTypes.UUID,
      amounts: DataTypes.INTEGER,
      date: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
