"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("destinasifavorites", [
      {
        id: uuid(),
        image_destinasi:
          "https://fullsuitcase.com/wp-content/uploads/2022/06/Best-areas-to-stay-in-Bangkok-neighborhood-guide.jpg.webp",
        info: "Limited!",
        continent: "Asia",
        city_from: "Jakarta",
        city_to: "Bangkok",
        airlines: "AirAsia",
        date: "01 - 30 Juli",
        price: 950000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("destinasifavorites", null, {});
  },
};
