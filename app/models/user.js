"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.transactions, { foreignKey: "usersId" });
    }
  }

  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      image_profile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
