const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/auth.controller");

const {
    getCurrentUser,
    updateProfile
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current authenticated user
router.get("/me", authMiddleware, getCurrentUser);

// Update current authenticated user
router.put("/me", authMiddleware, updateProfile);

module.exports = router;