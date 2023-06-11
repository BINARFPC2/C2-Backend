"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("destinasifavorites", [
      {
        id: uuid(),
        image_destinasi: "",
        info: "",
        continent: "",
        city_from: "",
        city_to: "",
        airlines: "",
        date: "",
        price: "",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("destinasifavorites", null, {});
  },
};
