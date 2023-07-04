const { Ticket } = require("../models");
const { Checkout } = require("../models");
const { Passenger } = require("../models");
const { Op } = require("sequelize");
const { sendTransactionDataByEmail } = require("./emailController");

module.exports = {
  async getETicket(req, res) {
    try {
      const idUser = req.user.id; // Mengambil ID pengguna dari token
      const checkoutData = await Checkout.findAll({
        where: {
          usersId: idUser, // Menggunakan ID pengguna dalam kondisi WHERE
        },
        include: [
          {
            model: Passenger,
          },
          {
            model: Ticket,
            as: "DepartureTicket",
            where: {
              id: { [Op.col]: "Checkout.departureTicketsId" },
            },
          },
          {
            model: Ticket,
            as: "ReturnTicket",
            where: {
              id: { [Op.col]: "Checkout.returnTicketsId" },
            },
            required: false,
          },
        ],
        order: [["createdAt", "DESC"]], // Menambahkan pengurutan berdasarkan createdAt secara menurun (data terbaru)
      });

      if (checkoutData.length === 0) {
        // jika transaksi tidak ada
        res.status(404).json({
          message: "No transaction data found",
          data: [],
        });
        return;
      }

      const formattedCheckoutData = checkoutData.map((checkout) => {
        const departureTicketPrice = checkout.DepartureTicket
          ? checkout.DepartureTicket.price
          : 0;
        const returnTicketPrice = checkout.ReturnTicket
          ? checkout.ReturnTicket.price
          : 0;
        const totalPassenger = checkout.total_passenger;
        const totalPrice =
          (departureTicketPrice + returnTicketPrice) * totalPassenger;

        return {
          id: checkout.id,
          usersId: checkout.usersId,
          departureTicketsId: checkout.departureTicketsId,
          returnTicketsId: checkout.returnTicketsId,
          total_passenger: checkout.total_passenger,
          createdAt: checkout.createdAt,
          updatedAt: checkout.updatedAt,
          departureTicket: checkout.DepartureTicket,
          returnTicket: checkout.ReturnTicket,
          total_price: totalPrice,
          passengers: checkout.Passengers,
        };
      });

      const latestCheckoutData = formattedCheckoutData.shift(); // Mengambil data checkout terbaru

      const htmlData = `
        <h1 style="text-align: center; font-family: Arial, sans-serif;">E-Ticket</h1>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Passenger</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Booking Code</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Date</th>
          </tr>
          <tr>
            <td style="padding: 10px; font-family: Arial, sans-serif;">
              ${latestCheckoutData.passengers
                .map((passenger) => passenger.name)
                .join("<br>")}
            </td>
            <td style="padding: 10px; font-family: Arial, sans-serif;">
              ${latestCheckoutData.departureTicket.booking_code}
            </td>
            <td style="padding: 10px; font-family: Arial, sans-serif;">
              ${new Date(latestCheckoutData.createdAt).toLocaleString()}
            </td>
          </tr>
        </table>`;

      // Kirim data transaksi terbaru dalam bentuk HTML ke email pengguna
      await sendTransactionDataByEmail(req.user.email, htmlData);

      res.status(200).json({
        status: "Success",
        message: "E-Ticket data successfully obtained",
        data: latestCheckoutData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  },
};
