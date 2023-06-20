"use strict";
const { Model } = require("sequelize");
const { Ticket } = require("./ticket.js");

module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction, { foreignKey: "checkoutsId" });
    }
  }
  Checkout.init(
    {
      ticketsId: DataTypes.UUID,
      total_passenger: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );

  Checkout.belongsTo(Ticket, {
    foreignKey: "ticketsId",
    as: "ticket",
  });

  return Checkout;
};
