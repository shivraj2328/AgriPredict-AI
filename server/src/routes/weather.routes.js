const express = require("express");
const { getWeather } = require("../controllers/weather.controller");

const router = express.Router();

router.post("/", getWeather);

module.exports = router;