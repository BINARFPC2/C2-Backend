const { Ticket } = require("../models");
const { Transaction } = require("../models");
const { user } = require("../models");
const { v4: uuid } = require("uuid");
const { Op } = require("sequelize");

module.exports = {
  async createTransaction(req, res) {
    try {
      // Mengambil data user dari model User berdasarkan ID user
      const iduser = await user.findByPk(req.body.userId);

      // Mengambil data tiket dari model Ticket berdasarkan ID tiket
      const ticket = await Ticket.findByPk(req.body.ticketId);

      // Menghitung total amount berdasarkan price tiket dan quantity
      const amount = ticket.price * req.body.quantity;

      const date = ticket.dateDeparture;

      // const amount = ticket.price * adult_price;

      // Mengambil Tanggal
      // const date = req.body.date;

      // if (date) {
      //   querySearch.releaseDate = {
      //     [Op.between]: [new Date(date)],
      //   };
      // }
      // Membuat transaksi baru dengan data yang diambil
      const transaction = await Transaction.create({
        id: uuid(),
        usersId: iduser.id,
        ticketsId: ticket.id,
        amounts: amount,
        date: date,
        status: "Success",
        // Setel nilai-nilai kolom lainnya yang diperlukan
      });

      res.status(200).json({
        status: "Success",
        message: "Transaciton created successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },

  async getAllTransactionData(req, res) {
    const findAll = () => {
      return Transaction.findAll();
    };
    try {
      const dataTransaction = await findAll();
      if (!dataTransaction) {
        res.status(404).json({
          status: "Failed",
          message: "Data not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Get All Data Transactions Success",
        data: dataTransaction,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },

  async getDataTransactionById(req, res) {
    try {
      const idDataTrans = req.params.id;
      const findDataTransById = () => {
        return Transaction.findOne({
          where: {
            id: idDataTrans,
          },
        });
      };

      const dataTransId = await findDataTransById();

      if (!dataTransId) {
        res.status(404).json({
          status: "Failed",
          message: "Data Transaction not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Get Data Transactions Successfully",
        data: dataTransId,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },

  async updateDataTrans(req, res) {
    try {
      const idDataTrans = req.params.id;

      // Mengambil data user dari model User berdasarkan ID user
      const iduser = await user.findByPk(req.body.userId);

      // Mengambil data tiket dari model Ticket berdasarkan ID tiket
      const ticket = await Ticket.findByPk(req.body.ticketId);

      // Menghitung total amount berdasarkan price tiket dan quantity
      const amount = ticket.price * req.body.quantity;

      // Membuat transaksi baru dengan data yang diambil
      const transaction = await Transaction.update(
        {
          id: uuid(),
          usersId: iduser.id,
          ticketsId: ticket.id,
          amounts: amount,
          date: req.body.date,
          status: "Success",
        },
        {
          where: { id: idDataTrans },
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Update Data Transaction Successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message,
      });
    }
  },

  async deleteDataTrans(req, res) {
    try {
      const idDataTrans = req.params.id;
      Transaction.destroy({
        where: {
          id: idDataTrans,
        },
      })
        .then(() => {
          res.status(200).json({
            status: "Success",
            message: "Transaction Data deleted successfully",
          });
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },

  async deleteAllDataTrans(req, res) {
    Transaction.destroy({ truncate: true })
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "Transaction Data deleted successfully",
        });
      })
      .catch((error) => {
        res.status(422).json(error);
      });
  },
};
