const { payment } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
    async createPayment(req, res) {
        try {
          const { cardNumber, cardHolderName, cvc, expiration, country } = req.body;
    
          const paymentForm = await payment.create({
            id: uuid(),
            cardNumber: cardNumber,
            cardHolderName: cardHolderName,
            cvc: cvc,
            expiration: expiration,
            country: country,
            status: "true"
          });
    
          res.status(201).json({
            status: "Success",
            message: "Created payment Success",
            data: paymentForm,
          });
        } catch (error) {
          res.status(400).json({
            status: "Failed",
            message: error.message,
            data: {},
          });
        }
      },
    
      async getAllPaymentData(req, res) {
        const findAll = () => {
          return payment.findAll();
        };
        try {
          const dataPayment = await findAll();
          if (!dataPayment) {
            res.status(404).json({
              status: "Failed",
              message: "Data not found",
              data: {},
            });
          }
          res.status(200).json({
            status: "Success",
            message: "Get All Data Payment Success",
            data: dataPayment,
          });
        } catch (error) {
          res.status(500).json({
            status: "Error",
            message: error.message,
            data: {},
          });
        }
      },

      async getPaymentById(req, res) {
        try {
          const idPayment = req.params.id;
          const findPaymentId = () => {
            return payment.findOne({
              where: { id: idPayment },
            });
          };
    
          const dataPaymentId = await findPaymentId();
    
          if (!dataPaymentId) {
            res.status(404).json({
              status: "Failed",
              message: "Data not found",
              data: {},
            });
          }
          res.status(200).json({
            status: "Success",
            message: "Get Data Payment Successfully",
            data: dataPaymentId,
          });
        } catch (error) {
          res.status(500).json({
            status: "Error",
            message: error.message,
            data: {},
          });
        }
      },
}