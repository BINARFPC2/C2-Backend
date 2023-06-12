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
};
