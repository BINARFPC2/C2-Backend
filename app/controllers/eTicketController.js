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

      const latestCheckoutData = formattedCheckoutData[0];

      const htmlData = `
      <div style: "justify-content: center;">
        <img src="https://i.ibb.co/vw7bv7j/Untitled-design-8-removebg-preview.png" style= "height: 150px;">
      </div>

      <table style="font-size: 17px; width: 100%; border-collapse: collapse; margin-top: 20px;">
      ${latestCheckoutData
        .map(
          (checkout) => `
          <tr>
          <td style="font-family: Arial, sans-serif;">Airlines:${checkout.departureTicket.airlines}</td></tr>
          <tr>
          <td style="font-family: Arial, sans-serif;">From: ${checkout.departureTicket.airport_from}</td></tr>
          <tr>
          <td style="font-family: Arial, sans-serif;">To: ${checkout.departureTicket.airport_to}</td></tr>
          <tr>
          <td style="font-family: Arial, sans-serif;">Depart Date: ${checkout.departureTicket.dateDeparture}</td></tr>
          <tr>
          <td style="font-family: Arial, sans-serif;">Boarding Time: ${checkout.departureTicket.dateTakeoff} WIB</td></tr>`
        )
        .join("")}
      </table>

      <div>
        <h2 style="text-align: left; font-family: Arial, sans-serif; font-weight: bold;">Informasi:</h2>
        <p style="text-align: left; font-family: Arial, sans-serif;">Baggage 20 kg </p>
        <p style="text-align: left; font-family: Arial, sans-serif;">Cabin baggage 7 kg</p>
        <p style="text-align: left; font-family: Arial, sans-serif;">In Flight Entertainment</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr style="background-color: #DEC9FF;">
        <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Title</th>
        <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Passenger</th>
        <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Booking Code</th>
        <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Total Price</th>
        <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Type Seat</th>
      </tr>
      ${latestCheckoutData
        .map(
          (checkout) => `
            <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-family: Arial, sans-serif;">${checkout.passengers
              .map((passenger) => `${passenger.title}`)
              .join("<br>")}</td>               
              <td style="padding: 10px; font-family: Arial, sans-serif;">${checkout.passengers
                .map((passenger) => `${passenger.name}`)
                .join("<br>")}</td>
              <td style="padding: 10px; font-family: Arial, sans-serif; font-weight: bold;">${
                checkout.departureTicket.booking_code
              }</td>
              <td style="padding: 10px; font-family: Arial, sans-serif;">IDR ${
                checkout.total_price
              }</td>
              <td style="padding: 10px; font-family: Arial, sans-serif;">${
                checkout.departureTicket.type_seat
              }</td>
            </tr>`
        )
        .join("")}
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

  async cetakTicketById(req, res) {
    try {
      const idUser = req.user.id; // Mengambil ID pengguna dari token
      const checkoutId = req.body.checkoutId;

      const checkoutData = await Checkout.findOne({
        where: {
          id: checkoutId,
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
      });

      if (!checkoutData) {
        // Jika data checkout tidak ditemukan
        res.status(404).json({
          message: "Checkout data not found",
        });
        return;
      }

      const formattedCheckoutData = {
        id: checkoutData.id,
        usersId: checkoutData.usersId,
        departureTicketsId: checkoutData.departureTicketsId,
        returnTicketsId: checkoutData.returnTicketsId,
        total_passenger: checkoutData.total_passenger,
        total_price: checkoutData.total_price,
        createdAt: checkoutData.createdAt,
        updatedAt: checkoutData.updatedAt,
        departureTicket: checkoutData.DepartureTicket,
        returnTicket: checkoutData.ReturnTicket,
        passengers: checkoutData.Passengers,
      };

      const htmlData = `
        <div style="justify-content: center;">
          <img src="https://i.ibb.co/vw7bv7j/Untitled-design-8-removebg-preview.png" style="height: 150px;">
        </div>
  
        <table style="font-size: 17px; width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="font-family: Arial, sans-serif;">Airlines: ${
              formattedCheckoutData.departureTicket.airlines
            }</td>
          </tr>
          <tr>
            <td style="font-family: Arial, sans-serif;">From: ${
              formattedCheckoutData.departureTicket.airport_from
            }</td>
          </tr>
          <tr>
            <td style="font-family: Arial, sans-serif;">To: ${
              formattedCheckoutData.departureTicket.airport_to
            }</td>
          </tr>
          <tr>
            <td style="font-family: Arial, sans-serif;">Depart Date: ${
              formattedCheckoutData.departureTicket.dateDeparture
            }</td>
          </tr>
          <tr>
            <td style="font-family: Arial, sans-serif;">Boarding Time: ${
              formattedCheckoutData.departureTicket.dateTakeoff
            } WIB</td>
          </tr>
        </table>
  
        <div>
          <h2 style="text-align: left; font-family: Arial, sans-serif; font-weight: bold;">Informasi:</h2>
          <p style="text-align: left; font-family: Arial, sans-serif;">Baggage 20 kg </p>
          <p style="text-align: left; font-family: Arial, sans-serif;">Cabin baggage 7 kg</p>
          <p style="text-align: left; font-family: Arial, sans-serif;">In Flight Entertainment</p>
        </div>
  
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #DEC9FF;">
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Title</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Passenger</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Booking Code</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Total Price</th>
            <th style="padding: 10px; text-align: left; font-family: Arial, sans-serif;">Type Seat</th>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 10px; font-family: Arial, sans-serif;">${formattedCheckoutData.passengers
              .map((passenger) => passenger.title)
              .join("<br>")}</td>
            <td style="padding: 10px; font-family: Arial, sans-serif;">${formattedCheckoutData.passengers
              .map((passenger) => passenger.name)
              .join("<br>")}</td>
            <td style="padding: 10px; font-family: Arial, sans-serif; font-weight: bold;">${
              formattedCheckoutData.departureTicket.booking_code
            }</td>
            <td style="padding: 10px; font-family: Arial, sans-serif;">IDR ${
              formattedCheckoutData.total_price
            }</td>
            <td style="padding: 10px; font-family: Arial, sans-serif;">${
              formattedCheckoutData.departureTicket.type_seat
            }</td>
          </tr>
        </table>`;

      // Kirim data transaksi terbaru dalam bentuk HTML ke email pengguna
      await sendTransactionDataByEmail(req.user.email, htmlData);

      res.status(200).json({
        status: "Success",
        message: "E-Ticket data successfully obtained",
        data: formattedCheckoutData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  },
};
