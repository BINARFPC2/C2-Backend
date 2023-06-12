"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Checkouts", {
      id: {
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      familyName: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      dateofbirth: {
        type: Sequelize.DATEONLY,
      },
      citizenship: {
        type: Sequelize.STRING,
      },
      ktppaspor: {
        type: Sequelize.STRING,
      },
      issuingcountry: {
        type: Sequelize.STRING,
      },
      expirationdatepass: {
        type: Sequelize.DATEONLY,
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