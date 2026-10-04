import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/Dashboard/StatCard/StatCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget/WeatherWidget";
import RecentPredictions from "../components/Dashboard/RecentPredictions/RecentPredictions";
import QuickPrediction from "../components/Dashboard/QuickPrediction/QuickPrediction";

import { getCurrentUser } from "../services/authService";
import api from "../services/api";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [userResponse, predictionsResponse] =
                    await Promise.all([
                        getCurrentUser(),
                        api.get("/predictions")
                    ]);

                if (userResponse.success) {
                    setUser(userResponse.user);
                }

                setPredictions(
                    predictionsResponse.data.predictions || []
                );
            } catch (error) {
                console.error(
                    "Failed to fetch dashboard data:",
                    error
                );
            }
        };

        fetchDashboardData();
    }, []);

    const totalPredictions = predictions.length;

    const uniqueCrops = new Set(
        predictions
            .map((prediction) => prediction.recommendedCrop)
            .filter(Boolean)
    );

    const recommendedCrops = uniqueCrops.size;

    const latestPrediction = predictions[0];

    return (
        <DashboardLayout>

            <div className="mb-4">
                <h2>
                    Welcome, {user?.name || "Farmer"}!
                </h2>

                <p>
                    Here's an overview of your farming dashboard.
                </p>
            </div>

            <div className="row g-3 mb-4">

                <div className="col-md-3">
                    <StatCard
                        title="Total Predictions"
                        value={totalPredictions}
                        icon="🌱"
                        color="success"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Soil pH"
                        value={
                            latestPrediction?.ph
                                ? latestPrediction.ph
                                : "—"
                        }
                        icon="🧪"
                        color="primary"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Recommended Crops"
                        value={recommendedCrops}
                        icon="🌾"
                        color="warning"
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Latest Crop"
                        value={
                            latestPrediction?.recommendedCrop
                                ? latestPrediction.recommendedCrop
                                : "—"
                        }
                        icon="🌱"
                        color="info"
                    />
                </div>

            </div>

            <div className="row g-4">

                <div className="col-lg-4">
                    <WeatherWidget />
                </div>

                <div className="col-lg-8">
                    <RecentPredictions />
                </div>

            </div>

            <div className="mt-4">
                <QuickPrediction />
            </div>

        </DashboardLayout>
    );
}

export default Dashboard;