// transactionController.js
const Ticket = require("../models");
const Transaction = require("../models");

module.exports = {
  async createTransaction(req, res) {
    try {
      const dataTicket = await Ticket.findOne({
        where: { booking_code: req.body.booking_code },
      });

      const ticketId = await Transaction.findOne({
        where: { ticketsId: dataTicket.id },
      });

      if (ticketId) {
        await Transaction.create({
          ticketsId: dataTicket.id,
        });
      }
      res.status(200).json({
        status: "Ok",
      });
    } catch (error) {}
  },
};
