const express = require("express");

const {
    createFarm,
    getMyFarms,
    updateFarm,
    deleteFarm
} = require("../controllers/farm.controller");

const authMiddleware =
    require("../middleware/auth.middleware");

const farmOwnershipMiddleware =
    require("../middleware/farmOwnership.middleware");

const router = express.Router();

// Register a farm
router.post(
    "/",
    authMiddleware,
    createFarm
);

// Get the logged-in user's farms
router.get(
    "/",
    authMiddleware,
    getMyFarms
);

// Update a farm after verifying ownership
router.put(
    "/:farmId",
    authMiddleware,
    farmOwnershipMiddleware,
    updateFarm
);

// Delete a farm after verifying ownership
router.delete(
    "/:farmId",
    authMiddleware,
    farmOwnershipMiddleware,
    deleteFarm
);

module.exports = router;