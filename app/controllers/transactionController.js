const { Ticket } = require("../models");
const { Transaction } = require("../models");
const { user } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createTransaction(req, res) {
    try {
      // Mengambil data user dari model User berdasarkan ID user
      const iduser = await user.findByPk(req.body.userId);

      // Mengambil data tiket dari model Ticket berdasarkan ID tiket
      const ticket = await Ticket.findByPk(req.body.ticketId);

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
