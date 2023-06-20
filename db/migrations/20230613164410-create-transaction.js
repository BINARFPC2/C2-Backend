"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      usersId: {
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      paymentId: {
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      amounts: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      airlines: {
        type: Sequelize.STRING,
      },
      booking_code: {
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
      dateDeparture: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      dateArrival: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      type_seat: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Transactions");
  },
};
