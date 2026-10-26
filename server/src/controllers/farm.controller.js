const Farm = require("../models/Farm.model");

// Register a new farm
const createFarm = async (req, res) => {
    try {
        const {
            name,
            latitude,
            longitude,
            description
        } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            latitude === undefined ||
            longitude === undefined ||
            latitude === null ||
            longitude === null ||
            latitude === "" ||
            longitude === ""
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Farm name, latitude and longitude are required"
            });
        }

        const farmLatitude = Number(latitude);
        const farmLongitude = Number(longitude);

        if (
            !Number.isFinite(farmLatitude) ||
            !Number.isFinite(farmLongitude)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Latitude and longitude must be valid numbers"
            });
        }

        if (
            farmLatitude < -90 ||
            farmLatitude > 90
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Latitude must be between -90 and 90"
            });
        }

        if (
            farmLongitude < -180 ||
            farmLongitude > 180
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Longitude must be between -180 and 180"
            });
        }

        if (
            description !== undefined &&
            typeof description !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Description must be a string"
            });
        }

        const farm = await Farm.create({
            user: req.user.userId,
            name: name.trim(),
            latitude: farmLatitude,
            longitude: farmLongitude,
            description: description?.trim() || ""
        });

        return res.status(201).json({
            success: true,
            message: "Farm registered successfully",
            farm
        });
    } catch (error) {
        console.error(
            "Farm registration error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to register farm"
        });
    }
};

// Retrieve farms belonging to the logged-in user
const getMyFarms = async (req, res) => {
    try {
        const farms = await Farm.find({
            user: req.user.userId
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            count: farms.length,
            farms
        });
    } catch (error) {
        console.error(
            "Fetch farms error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve farms"
        });
    }
};

// Update an existing farm
const updateFarm = async (req, res) => {
    try {
        const {
            name,
            latitude,
            longitude,
            description
        } = req.body;

        const updates = {};

        // Validate and prepare the farm name
        if (name !== undefined) {
            if (
                typeof name !== "string" ||
                !name.trim()
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Farm name cannot be empty"
                });
            }

            updates.name = name.trim();
        }

        // Validate latitude
        if (latitude !== undefined) {
            if (
                latitude === null ||
                latitude === "" ||
                !Number.isFinite(Number(latitude)) ||
                Number(latitude) < -90 ||
                Number(latitude) > 90
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Latitude must be a number between -90 and 90"
                });
            }

            updates.latitude = Number(latitude);
        }

        // Validate longitude
        if (longitude !== undefined) {
            if (
                longitude === null ||
                longitude === "" ||
                !Number.isFinite(Number(longitude)) ||
                Number(longitude) < -180 ||
                Number(longitude) > 180
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Longitude must be a number between -180 and 180"
                });
            }

            updates.longitude = Number(longitude);
        }

        // Validate description
        if (description !== undefined) {
            if (typeof description !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Description must be a string"
                });
            }

            updates.description = description.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update"
            });
        }

        // req.farm is set by farmOwnershipMiddleware
        Object.assign(req.farm, updates);

        await req.farm.save();

        return res.status(200).json({
            success: true,
            message: "Farm updated successfully",
            farm: req.farm
        });
    } catch (error) {
        console.error(
            "Farm update error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update farm"
        });
    }
};

// Delete an existing farm
const deleteFarm = async (req, res) => {
    try {
        // Ownership was verified by the middleware
        await req.farm.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Farm deleted successfully"
        });
    } catch (error) {
        console.error(
            "Farm deletion error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete farm"
        });
    }
};

module.exports = {
    createFarm,
    getMyFarms,
    updateFarm,
    deleteFarm
};