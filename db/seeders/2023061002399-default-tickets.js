"use strict";
const { v4: uuid } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
const currentDate = new Date();
const nextDay = new Date(currentDate);
nextDay.setDate(currentDate.getDate() + 1);
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
        information: "Baggage 20 kg Cabin baggage 7 kg In Flight Entertainment",
        dateTakeoff: "07:55",
        dateLanding: "10:45",
        dateDeparture: "2023-06-19",
        dateEnd: "2023-06-19",
        dateReturn: "2023-06-20", // req body
        type_seat: "Economy",
        price: 994000,
        booking_code: "8vyb7rq8mp",
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
