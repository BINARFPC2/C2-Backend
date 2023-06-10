'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    city_from: DataTypes.STRING,
    city_to: DataTypes.STRING,
    airport_from: DataTypes.STRING,
    airport_to: DataTypes.STRING,
    dateDeparture: DataTypes.STRING,
    dateArrival: DataTypes.STRING,
    type_seat: DataTypes.STRING,
    total_passenger: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};