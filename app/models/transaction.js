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
      status: DataTypes.STRING,
      booking_code: DataTypes.STRING,
      airlines: DataTypes.STRING,
      airport_from: DataTypes.STRING,
      airport_to: DataTypes.STRING,
      information: DataTypes.STRING,
      dateTakeoff: DataTypes.STRING,
      dateLanding: DataTypes.STRING,
      dateDeparture: DataTypes.DATEONLY,
      dateEnd: DataTypes.DATEONLY,
      type_seat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
