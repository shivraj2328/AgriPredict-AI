const express = require("express");

const {
    getProfileStatistics
} = require("../controllers/profile.controller");

const authMiddleware =
    require("../middleware/auth.middleware");

const router = express.Router();

router.get(
    "/statistics",
    authMiddleware,
    getProfileStatistics
);

module.exports = router;