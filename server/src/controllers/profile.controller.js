const {
    getUserPredictionStatistics
} = require("../services/profileStats.service");

const getProfileStatistics = async (req, res) => {
    try {
        const predictions =
            await getUserPredictionStatistics(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            predictions
        });
    } catch (error) {
        console.error(
            "Profile statistics error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch profile statistics"
        });
    }
};

module.exports = {
    getProfileStatistics
};