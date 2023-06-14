const { Ticket } = require("../models");
const { Transaction } = require("../models");
const { user } = require("../models");
const { Checkout } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  // async createTransaction(req, res) {
  //   try {
  //     const dataTicket = await Ticket.findOne({
  //       where: { booking_code: req.body.booking_code },
  //     });
  //     const dataCheckout = await Checkout.findOne({
  //       where: { id: req.params.id },
  //     });
  //     if (dataTicket) {
  //       const transaction = await Transaction.findOne({
  //         where: { ticketsId: dataTicket.id },
  //       });
  //       if (transaction) {
  //         await Transaction.update({ where: { ticketsId: dataTicket.id } });
  //       } else {
  //         await Transaction.create({
  //           id: uuid(),
  //           ticketsId: dataTicket.id,
  //         });
  //       }
  //     }
  //     if (dataCheckout) {
  //       const transaction = await Transaction.findOne({
  //         where: { checkoutsId: dataCheckout.id },
  //       });
  //       if (transaction) {
  //         await Transaction.update({
  //           where: { checkoutsId: dataCheckout.id },
  //         });
  //       } else {
  //         await Transaction.create({
  //           checkoutsId: dataCheckout.id,
  //         });
  //       }
  //     }
  //     res.status(200).json({
  //       status: "Success",
  //       message: "Transaciton created successfully",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       status: "Error",
  //       message: "booking_code is already in use",
  //     });
  //   }
  // },
  async createTransaction(req, res) {
    try {
      // Mengambil data user dari model User berdasarkan ID user
      const iduser = await user.findByPk(req.body.usersId);

      // Mengambil data tiket dari model Ticket berdasarkan ID tiket
      const ticket = await Ticket.findByPk(req.body.ticketsId);

      // Membuat transaksi baru dengan data yang diambil
      const transaction = await Transaction.create({
        id: uuid(),
        usersId: iduser.id,
        ticketsId: ticket.id,
        // quantity: req.body.quantity,
        // Setel nilai-nilai kolom lainnya yang diperlukan
      });

      res.status(201).json(transaction);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan dalam membuat transaksi" });
    }
  },
};
