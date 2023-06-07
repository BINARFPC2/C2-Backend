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

const {
  getAllUserData,
  getUserById,
  updateUserData,
  deleteUser,
  updatedPassword,
} = require("../app/controllers/userControllers");

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

// email verification
router.post("/api/v1/send-email", sendEmailverification);

router.get("/api/v1/verify-email/:email", verifyEmail);

module.exports = router;
