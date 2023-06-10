"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tickets", [
      {
        id: uuid(),
        city_from: "Jakarta",
        city_to: "Singapore",
        airlines: "Lion Air",
        airport_from: "Soekarno-Hatta International",
        airport_to: "Singapore Changi",
        dateDeparture: "07:55",
        dateArrival: "10:45",
        date_start: "2023-06-03",
        date_end: "2023-06-03",
        type_seat: "Business",
        price: 994000,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        city_from: "Yogyakarta",
        city_to: "Jakarta",
        airlines: "Garuda",
        airport_from: "Yogyakarta International Airport",
        airport_to: "Soekarno-Hatta International",
        dateDeparture: "07:55",
        dateArrival: "10:45",
        date_start: "2023-06-03",
        date_end: "2023-06-03",
        type_seat: "Business",
        price: 1384985,
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        city_from: "Jakarta",
        city_to: "Bali",
        airlines: "Super Air Jet",
        airport_from: "Soekarno-Hatta International",
        airport_to: "I Gusti Ngurah Rai International",
        dateDeparture: "07:55",
        dateArrival: "10:45",
        date_start: "2023-06-03",
        date_end: "2023-06-03",
        type_seat: "Economy",
        price: 592600,
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
