const express = require("express");

const {
    registerUser,
    loginUser,
    getCurrentUser
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get current authenticated user

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;