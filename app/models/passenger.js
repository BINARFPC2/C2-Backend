"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Checkout, { foreignKey: "ticketsId" });
    }
  }
  Passenger.init(
    {
      checkoutsId: DataTypes.UUID,
      ticketsId: DataTypes.UUID,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      familyName: DataTypes.STRING,
      title: DataTypes.STRING,
      dateofbirth: DataTypes.DATEONLY,
      citizenship: DataTypes.STRING,
      ktppaspor: DataTypes.STRING,
      issuingcountry: DataTypes.STRING,
      expirationdatepass: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Passenger",
    }
  );
  return Passenger;
};
