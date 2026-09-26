const express = require("express");

const {
    createPrediction,
    getPredictionHistory
} = require("../controllers/prediction.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, createPrediction);

router.get("/", authMiddleware, getPredictionHistory);

module.exports = router;