const { Ticket } = require("../models");
const { Transaction } = require("../models");
const { Checkout } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createTransaction(req, res) {
    try {
      const dataTicket = await Ticket.findOne({
        where: { booking_code: req.body.booking_code },
      });

      const dataCheckout = await Checkout.findOne({
        where: { id: req.params.id },
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
      if (dataCheckout) {
        const transaction = await Transaction.findOne({
          where: { checkoutsId: dataCheckout.id },
        });
        if (transaction) {
          await Transaction.update({
            where: { checkoutsId: dataCheckout.id },
          });
        } else {
          await Transaction.create({
            id: uuid(),
            checkoutsId: dataCheckout.id,
          });
        }
      }
      res.status(200).json({
        status: "Success",
        message: "Ticket id created successfully",
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: "booking_code is already in use",
      });
    }
  },
};
