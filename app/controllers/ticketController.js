const { Ticket } = require("../models");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");

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

  async getAllTickets(req, res) {
    const city_from = req.query.city_from ? req.query.city_from : "";
    const city_to = req.query.city_to ? req.query.city_to : "";
    const airport_from = req.query.airport_from ? req.query.airport_from : "";
    const airport_to = req.query.airport_to ? req.query.airport_to : "";
    const date_start = req.query.date_start ? req.query.date_start : "";
    const date_end = req.query.date_end ? req.query.date_end : "";
    const type_seat = req.query.type_seat ? req.query.type_seat : "";
    const available = req.query.available ? req.query.available : "";

    const tickets = await Ticket.findAll({
      where: {
        [Op.and]: {
          city_from: {
            [Op.iLike]: `%${city_from}`,
          },
          city_to: {
            [Op.iLike]: `%${city_to}`,
          },
          date_start: {
            [Op.iLike]: `%${date_start}`,
          },
          date_end: {
            [Op.iLike]: `%${date_end}`,
          },
          type_seat: {
            [Op.iLike]: `%${type_seat}`,
          },
        },
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Get All Data Ticket Success",
      data: tickets,
    });
  },
};
