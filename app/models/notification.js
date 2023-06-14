"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "userId" });
    }
  }
  notification.init(
    {
      info: DataTypes.STRING,
      date: DataTypes.DATE,
      message: DataTypes.STRING,
      isRead: DataTypes.BOOLEAN,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "notification",
    }
  );
  return notification;
};
