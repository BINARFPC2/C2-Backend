const { Checkout } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createCheckout(req, res) {
    try {
      const {
        name,
        email,
        phone,
        familyName,
        title,
        dateofbirth,
        citizenship,
        ktppaspor,
        issuingcountry,
        expirationdatepass,
      } = req.body;

      //   create checkout
      const userCheckout = await Checkout.create({
        id: uuid(),
        name: name,
        email: email,
        phone: phone,
        familyName: familyName,
        title: title,
        dateofbirth: dateofbirth,
        citizenship: citizenship,
        ktppaspor: ktppaspor,
        issuingcountry: issuingcountry,
        expirationdatepass: expirationdatepass,
      });
      res.status(201).json({
        status: "Success",
        message: "Checkout Success",
        data: userCheckout,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error.message,
      });
    }
  },
  async getAllCheckoutData(req, res) {
    const findCheckoutAll = () => {
      return Checkout.findAll();
    };
    try {
      const dataCheckout = await findCheckoutAll();
      if (!dataCheckout) {
        res.status(404).json({
          status: "failed",
          message: "Data Checkout not found",
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Get All Data Checkout Success",
        data: dataCheckout,
      });
    } catch (error) {
      res.status(500).json({
        status: "Erro",
        message: error.message,
      });
    }
  },

  async getDataCheckoutById(req, res) {
    try {
      const idCheckout = req.params.id;
      const findDataCheckoutId = () => {
        return Checkout.findOne({
          where: {
            id: idCheckout,
          },
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
};
