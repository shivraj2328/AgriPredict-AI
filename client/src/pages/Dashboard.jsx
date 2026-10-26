import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/Dashboard/StatCard/StatCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget/WeatherWidget";
import RecentPredictions from "../components/Dashboard/RecentPredictions/RecentPredictions";
import QuickPrediction from "../components/Dashboard/QuickPrediction/QuickPrediction";
import PredictionActivity from "../components/Dashboard/PredictionActivity/PredictionActivity";
import ConfidenceTrend from "../components/Dashboard/ConfidenceTrend/ConfidenceTrend";

import { getCurrentUser } from "../services/authService";
import api from "../services/api";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [soilHealth, setSoilHealth] = useState(null);
    const [soilHealthLoading, setSoilHealthLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    userResponse,
                    predictionsResponse,
                    soilHealthResponse
                ] = await Promise.allSettled([
                    getCurrentUser(),
                    api.get("/predictions"),
                    api.get("/soil-health")
                ]);

                if (userResponse.status === "fulfilled") {
                    if (userResponse.value.success) {
                        setUser(userResponse.value.user);
                    }
                }

                if (predictionsResponse.status === "fulfilled") {
                    setPredictions(
                        predictionsResponse.value.data.predictions || []
                    );
                }

                if (soilHealthResponse.status === "fulfilled") {
                    const response = soilHealthResponse.value.data;

                    if (response.success) {
                        setSoilHealth(response.soilHealth);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setSoilHealthLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalPredictions = predictions.length;
    const latestPrediction = predictions[0];

    const latestLatitude = latestPrediction?.latitude;
    const latestLongitude = latestPrediction?.longitude;

    const latestFarmName =
        latestPrediction?.farm?.name || "No farm associated";

    const latestCrop =
        latestPrediction?.recommendedCrop || "—";

    const latestSoilHealth =
        latestPrediction?.soilHealth || soilHealth;

    const parameters = latestSoilHealth?.parameters;

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

            {/* Dashboard Cards */}
            <div className="row g-3 mb-4">
                {/* Total Predictions */}
                <div className="col-md-3">
                    <StatCard
                        title="Total Predictions"
                        value={totalPredictions}
                        icon="🌱"
                        color="success"
                    />
                </div>

                {/* Latest Farm */}
                <div className="col-md-3">
                    <StatCard
                        title="Latest Prediction Farm"
                        value={latestPrediction ? latestFarmName : "—"}
                        icon="🚜"
                        color="info"
                    />
                </div>

                {/* Indicative Soil Health */}
                <div className="col-md-3">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <p className="text-muted mb-1">
                                        Indicative Soil Health
                                    </p>

                                    <h3 className="mb-1">
                                        {soilHealthLoading
                                            ? "..."
                                            : latestSoilHealth
                                                ? `${latestSoilHealth.score}%`
                                                : "—"}
                                    </h3>

                                    <p className="mb-2">
                                        {latestSoilHealth?.status || "No data"}
                                    </p>
                                </div>

                                <div className="fs-2">🧪</div>
                            </div>

                            {latestSoilHealth && parameters && (
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#soilHealthModal"
                                >
                                    View Details
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Latest Crop */}
                <div className="col-md-3">
                    <StatCard
                        title="Latest Crop"
                        value={latestCrop}
                        icon="🌾"
                        color="warning"
                    />
                </div>
            </div>

            {/* Latest Prediction Summary */}
            {latestPrediction && (
                <div className="card shadow-sm mb-4">
                    <div className="card-body">
                        <h5 className="card-title">
                            Latest Prediction Summary
                        </h5>

                        <div className="row g-3 mt-1">
                            <div className="col-md-4">
                                <p className="text-muted mb-1">
                                    Farm
                                </p>
                                <strong>{latestFarmName}</strong>
                            </div>

                            <div className="col-md-4">
                                <p className="text-muted mb-1">
                                    Recommended Crop
                                </p>
                                <strong>{latestCrop}</strong>
                            </div>

                            <div className="col-md-4">
                                <p className="text-muted mb-1">
                                    Prediction Date
                                </p>
                                <strong>
                                    {latestPrediction.createdAt
                                        ? new Date(
                                            latestPrediction.createdAt
                                        ).toLocaleString()
                                        : "—"}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Dashboard Content */}
            <div className="row g-4">
                <div className="col-lg-4">
                    <WeatherWidget
                        latitude={latestLatitude}
                        longitude={latestLongitude}
                    />
                </div>

                <div className="col-lg-8">
                    <RecentPredictions />
                </div>
            </div>

            {/* Prediction Activity */}
            <div className="mt-4">
                <PredictionActivity predictions={predictions} />
            </div>

            {/* Confidence Trend */}
            <div className="mt-4">
                <ConfidenceTrend predictions={predictions} />
            </div>

            {/* Quick Prediction */}
            <div className="mt-4">
                <QuickPrediction />
            </div>

            {/* Soil Health Details Modal */}
            {latestSoilHealth && parameters && (
                <div
                    className="modal fade"
                    id="soilHealthModal"
                    tabIndex="-1"
                    aria-labelledby="soilHealthModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5
                                        className="modal-title"
                                        id="soilHealthModalLabel"
                                    >
                                        Indicative Soil Health
                                    </h5>

                                    <p className="text-muted mb-0">
                                        Detailed assessment based on
                                        N, P, K and soil pH.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>

                            <div className="modal-body">
                                <div className="text-center mb-4">
                                    <h2 className="text-success mb-1">
                                        {latestSoilHealth.score}%
                                    </h2>

                                    <h5>{latestSoilHealth.status}</h5>
                                </div>

                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>Parameter</th>
                                                <th>Value</th>
                                                <th>Score</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {[
                                                ["Nitrogen", parameters.nitrogen],
                                                ["Phosphorus", parameters.phosphorus],
                                                ["Potassium", parameters.potassium],
                                                ["Soil pH", parameters.ph]
                                            ].map(([name, parameter]) => (
                                                <tr key={name}>
                                                    <td>{name}</td>
                                                    <td>{parameter?.value ?? "—"}</td>
                                                    <td>
                                                        {parameter?.score != null
                                                            ? `${parameter.score}%`
                                                            : "—"}
                                                    </td>
                                                    <td>
                                                        {parameter?.status || "—"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="alert alert-light border mt-4 mb-0">
                                    <strong>Note:</strong>{" "}
                                    This is an indicative soil-health
                                    assessment based on N, P, K and soil pH.
                                    It is not a laboratory Soil Health Card result.
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;
