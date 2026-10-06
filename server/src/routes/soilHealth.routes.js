const express = require("express");

const {
    getSoilHealth
} = require("../controllers/soilHealth.controller");

const authMiddleware =
    require("../middleware/auth.middleware");


const router = express.Router();


router.get(
    "/",
    authMiddleware,
    getSoilHealth
);


module.exports = router;