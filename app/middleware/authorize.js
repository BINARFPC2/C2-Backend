const jwt = require('jsonwebtoken');
const { user } = require('../models');

module.exports = {
    async roleauthorize(req, res, next) {
        try {
          const bearerToken = req.headers.authorization;
          const token = bearerToken.split("Bearer ")[1];
          const tokenPayload = jwt.verify(
            token,
            process.env.JWT_SIGNATURE_KEY || "Rahasia"
          );
          req.user = await user.findByPk(tokenPayload.id);
            
            if (user.role === null) {
                return res.status(401).json({
                  message: "Unauthorized",
                })
            }

            req.user = user;
        
            next();
        } catch (error) {
          console.error(error);
          res.status(401).json({
            message: "Unauthorized",
          });
        }
      },
 }