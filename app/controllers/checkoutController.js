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

      // create checkout
      //   const userCheckout = await Checkout.create({
      //     id:
      //   })
    } catch (error) {}
  },
};
