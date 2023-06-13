const { Transaction } = require("../models");
const { Ticket } = require("../models");

module.exports = {
  // async findTransById(req, res) {
  //   const idUser = req.user.id;
  //   const resTransById = Transaction.findAll({
  //     where: { usersId: idUser },
  //     include: { all: true, attributes: { exclude: ["name", "email"] } },
  //   });
  //   res.status(200).json({
  //     message: "get data by userId success",
  //     data: resTransById,
  //   });
  // },

  // Fungsi controller untuk membuat transaksi
  async createTransaction(req, res) {
    try {
      // Mendapatkan data tiket dari tabel "Ticket" berdasarkan ID tiket
      const ticket = await Ticket.findByPk(req.params.ticketId);

      if (!ticket) {
        return res.status(404).json({ error: "Tiket tidak ditemukan" });
      }

      // Membuat transaksi dan memasukkan data tiket ke dalam tabel "Transaction"
      const transaction = await Transaction.create({
        ticketsId: ticket.id,
        // quantity: req.body.quantity,
        // Setel nilai-nilai kolom lainnya yang diperlukan
      });

      return res.status(201).json(transaction);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  },
};
