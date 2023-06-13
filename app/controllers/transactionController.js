const { Ticket } = require("../models");
const { Transaction } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createTransaction(req, res) {
    try {
      const dataTicket = await Ticket.findOne({
        where: { booking_code: req.body.booking_code },
      });

      if (dataTicket) {
        const transaction = await Transaction.findOne({
          where: { ticketsId: dataTicket.id },
        });

        if (transaction) {
          await Transaction.update({ where: { ticketsId: dataTicket.id } });
        } else {
          await Transaction.create({
            id: uuid(),
            ticketsId: dataTicket.id,
          });
        }
      }
      res.status(200).json({
        status: "Ok",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },
};
