const { Ticket } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createTicket(req, res) {
    try {
      const {
        city_from,
        city_to,
        airlines,
        airport_from,
        airport_to,
        dateDeparture,
        dateArrival,
        type_seat,
        total_passenger,
        price,
        available,
      } = req.body;
      const addTicket = await Ticket.create({
        id: uuid(),
        city_from: city_from,
        city_to: city_to,
        airlines: airlines,
        airport_from: airport_from,
        airport_to: airport_to,
        dateDeparture: dateDeparture,
        dateArrival: dateArrival,
        type_seat: type_seat,
        total_passenger: total_passenger,
        price: price,
        available: available,
      });
      res.status(201).json({
        status: "Success",
        message: "Created Ticket Success",
        data: addTicket,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error.message,
        data: {},
      });
    }
  },
};
