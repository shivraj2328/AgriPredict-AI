const express = require("express");

const {
    getWeather,
    getLatestPredictionWeather
} = require("../controllers/weather.controller");

const authMiddleware =
    require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    getWeather
);

router.get(
    "/latest",
    authMiddleware,
    getLatestPredictionWeather
);

module.exports = router;