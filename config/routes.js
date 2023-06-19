const {
  login,
  register,
  authorize,
  whoAmI,
  updateUserWithToken,
} = require("../app/controllers/authControllers");
const handleGetRoot = require("../app/controllers/root");
const {
  getAllTickets,
  createTicket,
  getTicketById,
  updateTicketData,
} = require("../app/controllers/ticketController");

const {
  getAllUserData,
  getUserById,
  updateUserData,
  deleteUser,
  updatedPassword,
} = require("../app/controllers/userControllers");

const {
  createdesfav,
  getAllDestFavData,
  getDestinasiById,
  deleteDestFav,
} = require("../app/controllers/destinasifavoriteController");

const {
  createCheckout,
  getAllCheckoutData,
  getDataCheckoutById,
  updateCheckoutData,
  deleteCheckout,
} = require("../app/controllers/checkoutController");

const {
  createPayment,
  getAllPaymentData,
  getPaymentById,
} = require("../app/controllers/paymentController");
const {
  createTransaction,
  getAllTransactionData,
  getDataTransactionById,
  updateDataTrans,
  deleteDataTrans,
  deleteAllDataTrans,
} = require("../app/controllers/transactionController");
const {
  forgetPass,
  resetPassView,
  resetPass,
} = require("../app/controllers/forgetPasswordController");

const router = require("express").Router();

router.get("/", handleGetRoot);

// Register User
router.post("/api/v1/register", register);

// Login User
router.post("/api/v1/login", login);

// Get All users
router.get("/api/v1/users", getAllUserData);

// Get User ById
router.get("/api/v1/users/:id", getUserById);

// Authentication
router.get("/api/v1/whoami", authorize, whoAmI);

// Update User
router.put("/api/v1/users/:id", updateUserData);

router.put("/api/v1/users", updateUserWithToken);

// Update Password
// router.put("/api/v1/resetpw/:id", updatedPassword);

// Delete User
router.delete("/api/v1/users/:id", deleteUser);

// forget password
router.post("/api/v1/forget-password", forgetPass);
router.get("/api/v1/reset-password/:token", resetPassView);
router.put("/api/v1/reset-password", resetPass);

// Get Ticket
router.get("/api/v1/tickets", getAllTickets);

// Get Ticket By Id
router.get("/api/v1/tickets/:id", getTicketById);

// Create Ticket
router.post("/api/v1/tickets", createTicket);

// Put Ticket By Id
router.put("/api/v1/tickets/:id", updateTicketData);

// Add Destinasi Favorite
router.post("/api/v1/destfavorite", createdesfav);

// Get Destinasi Favorite
router.get("/api/v1/destfavorite", getAllDestFavData);

// Get Destinasi Favorite by Id
router.get("/api/v1/destfavorite/:id", getDestinasiById);

// Delete Destinasi Favorite
router.delete("/api/v1/destfavorite/:id", deleteDestFav);

// Post Checkout
router.post("/api/v1/checkout", createCheckout);

// Get All Data Checkout
router.get("/api/v1/checkout", getAllCheckoutData);

// Get Data Checkout By Id
router.get("/api/v1/checkout/:id", getDataCheckoutById);

// Update Data Checkout
router.put("/api/v1/checkout/:id", updateCheckoutData);

// Delete Data Checkout
router.delete("/api/v1/checkout/:id", deleteCheckout);

// Add Payment
router.post("/api/v1/payment", createPayment);

// Get Payment
router.get("/api/v1/payment", getAllPaymentData);

// Get PAyment by Id
router.get("/api/v1/payment/:id", getPaymentById);

// Post Transaction

router.post("/api/v1/transaction", createTransaction);

// Get All Data Transaction
router.get("/api/v1/transaction", getAllTransactionData);

// Get Data Transaction By Id
router.get("/api/v1/transaction/:id", getDataTransactionById);

// Put Data Transaction
router.put("/api/v1/transaction/:id", updateDataTrans);

// Delete Data Transaction
router.delete("/api/v1/transaction/:id", deleteDataTrans);

// Delete All Data Transaction
router.delete("/api/v1/transaction", deleteAllDataTrans);

module.exports = router;
