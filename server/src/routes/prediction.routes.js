const express = require("express");

const {
    createPrediction
} = require("../controllers/prediction.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createPrediction);

module.exports = router;