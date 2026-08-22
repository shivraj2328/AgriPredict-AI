const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Protected test route
router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Authenticated user",
        user: req.user
    });
});

module.exports = router;