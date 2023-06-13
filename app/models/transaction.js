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
      this.belongsTo(models.users, { foreignKey: "usersId" });
      this.belongsTo(models.tickets, { foreignKey: "ticketsId" });
      this.belongsTo(models.checkouts, { foreignKey: "checkoutsId" });
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
