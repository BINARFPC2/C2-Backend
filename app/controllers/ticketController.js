const { Ticket } = require("../models");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");
const moment = require("moment");

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
        dateReturn,
        dateEnd,
        type_seat,
        total_passenger,
        adult_price,
        child_price,
        price,
        available,
      } = req.body;
      // if (dateDeparture && dateEnd && dateReturn) {
      //   querySearch.releaseDate = {
      //     [Op.between]: [
      //       new Date(dateDeparture),
      //       new Date(dateEnd),
      //       new Date(dateReturn),
      //     ],
      //   };
      // }
      const addTicket = await Ticket.create({
        id: uuid(),
        city_from: city_from,
        city_to: city_to,
        airlines: airlines,
        airport_from: airport_from,
        airport_to: airport_to,
        dateDeparture: dateDeparture,
        dateReturn: dateReturn,
        dateEnd: dateEnd,
        type_seat: type_seat,
        total_passenger: total_passenger,
        adult_price: adult_price,
        child_price: child_price,
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
      });
    }
  },

  async getAllTickets(req, res) {
    const city_from = req.query.city_from ? req.query.city_from : "";
    const city_to = req.query.city_to ? req.query.city_to : "";
    const type_seat = req.query.type_seat ? req.query.type_seat : "";

    const querySearch = {
      city_from: {
        [Op.iLike]: `%${city_from}`,
      },
      city_to: {
        [Op.iLike]: `%${city_to}`,
      },
      type_seat: {
        [Op.iLike]: `%${type_seat}`,
      },
    };

    const tickets = await Ticket.findAll({
      where: querySearch,
    });
    res.status(200).json({
      status: "Success",
      message: "Get All Data Ticket Success",
      data: tickets,
    });
  },

  async getTicketById(req, res) {
    try {
      const idTicket = req.params.id;
      const findTicketId = () => {
        return Ticket.findOne({
          where: {
            id: idTicket,
          },
        });
      };
      const dataTicketId = await findTicketId();

      if (!dataTicketId) {
        res.status(404).json({
          status: "Failed",
          message: "Ticket not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Get Data Ticket Successfully",
        data: dataTicketId,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  },

  async updateTicketData(req, res) {
    const idTicket = req.params.id;
    const dateDeparture = moment(req.body.dateDeparture, "YYYY-MM-DD", true);
    const dateReturn = moment(req.body.dateReturn, "YYYY-MM-DD", true);
    const dateEnd = moment(req.body.dateEnd, "YYYY-MM-DD", true);

    if (
      !dateDeparture.isValid() ||
      !dateReturn.isValid() ||
      !dateEnd.isValid()
    ) {
      res.status(400).json({
        status: "Error",
        message: "Invalid date format",
      });
      return;
    }

    Ticket.update(
      {
        dateDeparture,
        dateReturn,
        dateEnd,
        total_passenger: req.body.total_passenger,
      },
      {
        where: { id: idTicket },
      }
    ).then(() => {
      res.status(200).json({
        status: "Success",
        message: "Update Data Ticket Successfully",
      });
    });
  },
};
