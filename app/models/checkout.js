"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Transaction, { foreignKey: "checkoutsId" });
      this.hasMany(models.Transaction, { foreignKey: "usersId" });
      this.hasMany(models.Passenger, { foreignKey: "checkoutsId" });
      this.belongsTo(models.Ticket, { foreignKey: "ticketsId" }); // Perbarui foreign key
      this.belongsTo(models.Payment, { foreignKey: "usersId" }); //
    }
  }
  Checkout.init(
    {
      usersId: DataTypes.UUID,
      ticketsId: DataTypes.UUID,
      total_passenger: DataTypes.INTEGER,
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Menetapkan nilai default sebagai 0 jika tidak ada perhitungan yang valid
        get() {
          const passengersCount = this.getDataValue("total_passenger");
          const ticketPrice = this.Ticket ? this.Ticket.price : 0;
          return passengersCount * ticketPrice;
        },
      },
    },
    {
      sequelize,
      modelName: "Checkout",
    }
  );
  return Checkout;
};
