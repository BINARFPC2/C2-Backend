const { Checkout } = require("../models");
const { Passenger } = require("../models");
const { Ticket } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  // async createCheckout(req, res) {
  //   try {
  //     const {
  //       ticketsId,
  //       name,
  //       email,
  //       phone,
  //       familyName,
  //       title,
  //       dateofbirth,
  //       citizenship,
  //       ktppaspor,
  //       issuingcountry,
  //       expirationdatepass,
  //       total_passenger,
  //     } = req.body;

  //     //   create checkout
  //     const userCheckout = await Checkout.create({
  //       id: uuid(),
  //       ticketsId: ticketsId,
  //       name: name,
  //       email: email,
  //       phone: phone,
  //       familyName: familyName,
  //       title: title,
  //       dateofbirth: dateofbirth,
  //       citizenship: citizenship,
  //       ktppaspor: ktppaspor,
  //       issuingcountry: issuingcountry,
  //       expirationdatepass: expirationdatepass,
  //       total_passenger: total_passenger,
  //     });
  //     res.status(201).json({
  //       status: "Success",
  //       message: "Checkout Success",
  //       data: userCheckout,
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       status: "Failed",
  //       message: error.message,
  //     });
  //   }
  // },
  async createCheckout(req, res) {
    try {
      const { ticketsId, total_passenger, passengers } = req.body;

      // Get the current authenticated user ID
      const usersId = req.user.id; // Ganti `req.user.id` dengan cara yang sesuai untuk mengakses ID pengguna saat ini

      // Create a new checkout
      const checkout = await Checkout.create({
        id: uuid(),
        ticketsId,
        total_passenger,
        usersId, // Tambahkan userId ke dalam pembuatan checkout
      });

      // Create passengers for the ticket
      for (const passengerData of passengers) {
        await Passenger.create({
          id: uuid(),
          checkoutsId: checkout.id,
          ticketsId: ticketsId,
          name: passengerData.name,
          email: passengerData.email,
          phone: passengerData.phone,
          familyName: passengerData.familyName,
          title: passengerData.title,
          dateofbirth: passengerData.dateofbirth,
          citizenship: passengerData.citizenship,
          ktppaspor: passengerData.ktppaspor,
          issuingcountry: passengerData.issuingcountry,
          expirationdatepass: passengerData.expirationdatepass,
        });
      }
      res.status(201).json({
        message: "Checkout created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  async getAllCheckoutData(req, res) {
    // const findCheckoutAll = () => {
    //   return Checkout.findAll();
    // };
    // try {
    //   const dataCheckout = await findCheckoutAll();
    //   if (!dataCheckout) {
    //     res.status(404).json({
    //       status: "failed",
    //       message: "Data Checkout not found",
    //     });
    //   }
    //   res.status(200).json({
    //     status: "Success",
    //     message: "Get All Data Checkout Success",
    //     data: dataCheckout,
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     status: "Erro",
    //     message: error.message,
    //   });
    // }
    try {
      const checkoutData = await Checkout.findAll({
        include: [
          {
            model: Passenger,
          },
          {
            model: Ticket,
          },
        ],
      });
      res.status(200).json({
        message: "Checkout data retrieved successfully",
        data: checkoutData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  },

  async getDataCheckoutById(req, res) {
    try {
      const idCheckout = req.params.id;
      const findDataCheckoutId = () => {
        return Checkout.findOne({
          where: {
            usersId: idCheckout,
          },
          include: [
            {
              model: Passenger,
            },
          ],
        });
      };

      const dataCheckoutId = await findDataCheckoutId();

      if (!dataCheckoutId) {
        res.status(404).json({
          status: "Failed",
          message: "Data not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Get Checkout Data By Id Successfully",
        data: dataCheckoutId,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  },
  async updateCheckoutData(req, res) {
    const idCheckout = req.params.id;

    const findDataCheckoutId = async () => {
      return await Checkout.findOne({
        where: {
          id: idCheckout,
        },
      });
    };

    Checkout.update({
      id: uuid(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      familyName: req.body.familyName,
      title: req.body.title,
      dateofbirth: req.body.dateofbirth,
      citizenship: req.body.citizenship,
      ktppaspor: req.body.ktppaspor,
      issuingcountry: req.body.issuingcountry,
      expirationdatepass: req.body.expirationdatepass,
    })
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "Update Data Checkout Successfully",
        });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  async deleteCheckout(req, res) {
    try {
      const idCheckout = req.params.id;
      Checkout.destroy({
        where: {
          id: idCheckout,
        },
      })
        .then(() => {
          res.status(200).json({
            status: "Success",
            message: "Checkout Data Deleted successfully",
          });
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    } catch (error) {
      res.status(500).json({
        status: "Erro",
        message: error.message,
      });
    }
  },
  async deleteAllDataCheckout(req, res) {
    Checkout.destroy({ truncate: true })
      .then(() => {
        res.status(200).json({
          status: "Success",
          message: "Checkout Data deleted successfully",
        });
      })
      .catch((error) => {
        res.status(422).json(error);
      });
  },
};
