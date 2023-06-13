const { Ticket } = require("../models");
const { Transaction } = require("../models");

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
          await Transaction.update(
            {
              /* objek nilai yang ingin diubah */
            },
            { where: { ticketsId: dataTicket.id } }
          );
        } else {
          await Transaction.create({
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
