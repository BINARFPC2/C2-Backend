"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
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
      information: {
        type: Sequelize.STRING,
      },
      airport_from: {
        type: Sequelize.STRING,
      },
      airport_to: {
        type: Sequelize.STRING,
      },
      dateTakeoff: {
        type: Sequelize.STRING,
      },
      dateLanding: {
        type: Sequelize.STRING,
      },
      dateDeparture: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      dateReturn: {
        type: Sequelize.DATEONLY,
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
      total_price: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("Tickets");
  },
};
