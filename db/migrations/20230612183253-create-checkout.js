"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Checkouts", {
      id: {
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
        unique: true,
      },
      ticketsId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      total_passenger: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Checkouts");
  },
};
