const {
  login,
  register,
  authorize,
  whoAmI,
} = require("../app/controllers/authControllers");
const {
  sendEmailverification,
  verifyEmail,
} = require("../app/controllers/emailVerification");
const handleGetRoot = require("../app/controllers/root");
const { getAllTickets } = require("../app/controllers/ticketController");

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
}= require("../app/controllers/destinasifavoriteController");

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

// Add Destinasi Favorite
router.post("/api/v1/destfavorite", createdesfav);

// Get Destinasi Favorite
router.get("/api/v1/destfavorite", getAllDestFavData);

// Get Destinasi Favorite by Id
router.get("/api/v1/destfavorite/:id", getDestinasiById);

// Delete Destinasi Favorite
router.delete("/api/v1/destfavorite/:id", deleteDestFav);

module.exports = router;
