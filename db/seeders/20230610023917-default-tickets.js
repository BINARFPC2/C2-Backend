"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tickets", [
      {
        id: uuid(),
        city_from: "Jakarta (JKTA)",
        city_to: "Singapore (SINA)",
        airlines: "Lion Air",
        airport_from: "Soekarno-Hatta International",
        airport_to: "Singapore Changi",
        dateDeparture: "2023-06-03T07:55:00+00:00",
        dateArrival: "2023-06-03T10:45:00+00:00",
        type_seat: "Business",
        price: 994000,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        city_from: "Yogyakarta (JOG)",
        city_to: "Jakarta (JKTA)",
        airlines: "Garuda",
        airport_from: "Yogyakarta International Airport",
        airport_to: "Soekarno-Hatta International",
        dateDeparture: "2023-06-03T07:55:00+00:00",
        dateArrival: "2023-06-03T09:15:00+00:00",
        type_seat: "Business",
        price: 1384985,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tickets", null, {});
  },
};