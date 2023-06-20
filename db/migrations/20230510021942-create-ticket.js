"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Ticket", {
      id: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      city_from: {
        type: Sequelize.STRING,
      },
      city_to: {
        type: Sequelize.STRING,
      },
      airlines: {
        type: Sequelize.STRING,
      },
      airport_from: {
        type: Sequelize.STRING,
      },
      airport_to: {
        type: Sequelize.STRING,
      },
      information: {
        type: Sequelize.STRING,
      },
      dateDeparture: {
        type: Sequelize.STRING,
      },
      dateArrival: {
        type: Sequelize.STRING,
      },
      type_seat: {
        type: Sequelize.STRING,
      },
      booking_code: {
        type: Sequelize.STRING,
      },
      total_passenger: {
        type: Sequelize.INTEGER,
      },
      adult_price: {
        type: Sequelize.INTEGER,
      },
      child_price: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Ticket");
  },
};
