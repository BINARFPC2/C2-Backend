const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const SALT = 10;
const jwt = require("jsonwebtoken");
const { user } = require("../models");

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    });
  });
}

// function createToken(payload) {
//   return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
// }

module.exports = {
  async forgetPass(req, res) {
    try {
      const { email } = req.body;
      const findUserEmail = async () => {
        return await user.findOne({
          where: { email: email },
        });
      };
      // check email
      const userEmail = await findUserEmail();

      // if user not found
      if (!userEmail) {
        res.status(400).send({
          status: "error",
          message: "Email not found",
        });
        return;
      }

      // create update token
      const token = jwt.sign(
        { id: userEmail.id },
        process.env.JWT_SIGNATURE_KEY || "Rahasia",
        {
          expiresIn: "1h",
        }
      );

      // create transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
          user: "backendproject010101@gmail.com",
          pass: "fzkeehrkmvvsaaao",
        },
      });

      // create mail options
      const mailOptions = {
        from: "backendproject010101@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `   <center> 
              <h1>Reset Password</h1>
              <p>Click this link to reset your password</p>
              <button 
                style=
                "
                  border: none;
                  transition-duration: 0.4s;
                  cursor: pointer;
                  background-color: #76b5c3;
                  border-radius: 12px;
                "
                type="button"
              > 
                <a 
                style=
                "
                text-decoration: none;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;color: white;
                padding: 16px 32px;
                transition-duration: 0.4s;" 
                href='https://c2-backend.up.railway.app/api/v1/reset-password/${token}' target="_blank" rel="reset">Reset Password</a>
              </button>
            <center>
                    `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).send({
        status: "success",
        message: "Check your email to reset password",
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  },

  // reset pass view
  async resetPassView(req, res) {
    try {
      // get token from url
      const token = req.params.token;

      // verify token
      const decodedUser = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      const findUserId = async (id) => {
        return await user.findOne({
          where: { id: id },
        });
      };

      // get user by id
      const userData = await findUserId(decodedUser.id);

      // check user
      if (!userData) {
        res.status(400).send({
          status: "error",
          message: "Token reset password not found",
        });
        return;
      }
      res.status(200).render("resetPassword", {
        status: "success",
        message: "reset password view",
        data: userData,
        token,
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  },
  async resetPass(req, res) {
    const { password, confirmPassword } = req.body;
    try {
      const token = req.body.token;
      // verify token
      const decodedUser = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      const findUserId = async () => {
        return await user.findOne({
          where: { id: decodedUser.id },
        });
      };

      // get user by id
      const userData = await findUserId();

      // check user
      if (!userData) {
        res.status(400).send({
          status: "error",
          message: "Token reset password not found",
        });
        return;
      }

      // check password
      if (password !== confirmPassword) {
        res.status(400).send({
          status: "error",
          message: "Password not match",
        });
        return;
      }

      // encrypt password
      const encryptedPassword = await encryptPassword(password);

      // update user password
      //   const updatedUser = await updateUser(user.id, {
      //     password: encryptedPassword,
      //   });

      const updatePassUser = async () => {
        return await user.update(
          {
            password: encryptedPassword,
          },
          {
            where: {
              id: userData.id,
            },
          }
        );
      };

      //   update user password
      const updatedUser = await updatePassUser(userData.id, {
        password: encryptedPassword,
      });

      // send response
      res.status(200).render("resetSucces", {
        status: "success",
        message: "reset password success",
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  },
};
