// transactionController.js
const Ticket = require("../models");
const Transaction = require("../models");

async function createTransaction(req, res) {
  try {
    // Mengambil data tiket dari tabel "Ticket"
    const tickets = await Ticket.findAll();

    // Memasukkan data tiket ke dalam tabel "Transaction"
    const transactions = await Promise.all(
      tickets.map((ticket) => {
        return Transaction.create({
          ticketsId: ticket.id,
          // quantity: ticket.quantity,
        });
      })
    );

    res.json({
      message: 'Data telah dimasukkan ke tabel "Transaction"',
      transactions,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
}

module.exports = {
  createTransaction,
};
