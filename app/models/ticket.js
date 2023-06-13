"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction, { foreignKey: "ticketsId" });
    }
  }
  Ticket.init(
    {
      city_from: DataTypes.STRING,
      city_to: DataTypes.STRING,
      airlines: DataTypes.STRING,
      airport_from: DataTypes.STRING,
      airport_to: DataTypes.STRING,
      information: DataTypes.STRING,
      dateTakeoff: DataTypes.STRING,
      dateLanding: DataTypes.STRING,
      dateDeparture: DataTypes.DATEONLY,
      dateReturn: DataTypes.DATEONLY,
      dateEnd: DataTypes.DATEONLY,
      type_seat: DataTypes.STRING,
      total_passenger: DataTypes.INTEGER,
      adult_price: DataTypes.INTEGER,
      child_price: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      booking_code: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
