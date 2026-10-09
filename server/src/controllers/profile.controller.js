const {
    getUserPredictionStatistics
} = require("../services/profileStats.service");

const getProfileStatistics = async (req, res) => {
    try {
        const statistics =
            await getUserPredictionStatistics(
                req.user.userId
            );

        return res.status(200).json({
            success: true,
            statistics
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