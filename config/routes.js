const {
  login,
  register,
  authorize,
  whoAmI,
} = require("../app/controllers/authControllers");
const handleGetRoot = require("../app/controllers/root");
const {
  getAllTickets,
  createTicket,
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
const { findTransById } = require("../app/controllers/transactionController");

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

// Update Password
router.put("/api/v1/resetpw/:id", updatedPassword);

// Delete User
router.delete("/api/v1/users/:id", deleteUser);

// Get Ticket
router.get("/api/v1/tickets", getAllTickets);

// Create Ticket
router.post("/api/v1/tickets", createTicket);

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

// Get Transaction By Id
router.get("/api/v1/transaction", findTransById);

module.exports = router;
