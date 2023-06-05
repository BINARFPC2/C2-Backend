const {
  login,
  register,
  authorize,
  whoAmI,
} = require("../app/controllers/authControllers");

const {
  getAllUserData,
  getUserById,
  updateUserData,
  deleteUser,
  updatedPassword,
} = require("../app/controllers/userControllers");

const router = require("express").Router();

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

module.exports = router;
