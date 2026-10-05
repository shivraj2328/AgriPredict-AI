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
    const [soilHealth, setSoilHealth] = useState(null);
    const [soilHealthLoading, setSoilHealthLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    userResponse,
                    predictionsResponse,
                    soilHealthResponse
                ] = await Promise.all([
                    getCurrentUser(),
                    api.get("/predictions"),
                    api.get("/soil-health")
                ]);

                if (userResponse.success) {
                    setUser(userResponse.user);
                }

                setPredictions(
                    predictionsResponse.data.predictions || []
                );

                if (soilHealthResponse.data.success) {
                    setSoilHealth(
                        soilHealthResponse.data.soilHealth
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to fetch dashboard data:",
                    error
                );
            } finally {
                setSoilHealthLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalPredictions = predictions.length;
    const latestPrediction = predictions[0];

    const parameters = soilHealth?.parameters;

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
                                            : soilHealth
                                                ? `${soilHealth.score}%`
                                                : "—"}
                                    </h3>

                                    <p className="mb-2">
                                        {soilHealth?.status || "No data"}
                                    </p>
                                </div>

                                <div className="fs-2">
                                    🧪
                                </div>

                            </div>

                            {soilHealth && parameters && (
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
                        value={
                            latestPrediction?.recommendedCrop ||
                            "—"
                        }
                        icon="🌾"
                        color="warning"
                    />
                </div>

                {/* Current Weather */}
                <div className="col-md-3">
                    <StatCard
                        title="Current Weather"
                        value="—"
                        icon="🌤️"
                        color="info"
                    />
                </div>

            </div>

            {/* Dashboard Content */}
            <div className="row g-4">

                <div className="col-lg-4">
                    <WeatherWidget />
                </div>

                <div className="col-lg-8">
                    <RecentPredictions />
                </div>

            </div>

            {/* Quick Prediction */}
            <div className="mt-4">
                <QuickPrediction />
            </div>

            {/* Soil Health Details Modal */}
            {soilHealth && parameters && (
                <div
                    className="modal fade"
                    id="soilHealthModal"
                    tabIndex="-1"
                    aria-labelledby="soilHealthModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            {/* Modal Header */}
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
                                ></button>

                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">

                                {/* Overall Score */}
                                <div className="text-center mb-4">

                                    <h2 className="text-success mb-1">
                                        {soilHealth.score}%
                                    </h2>

                                    <h5>
                                        {soilHealth.status}
                                    </h5>

                                </div>

                                {/* Parameter Details */}
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

                                            <tr>
                                                <td>Nitrogen</td>

                                                <td>
                                                    {parameters.nitrogen.value}
                                                </td>

                                                <td>
                                                    {parameters.nitrogen.score}%
                                                </td>

                                                <td>
                                                    {parameters.nitrogen.status}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Phosphorus</td>

                                                <td>
                                                    {parameters.phosphorus.value}
                                                </td>

                                                <td>
                                                    {parameters.phosphorus.score}%
                                                </td>

                                                <td>
                                                    {parameters.phosphorus.status}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Potassium</td>

                                                <td>
                                                    {parameters.potassium.value}
                                                </td>

                                                <td>
                                                    {parameters.potassium.score}%
                                                </td>

                                                <td>
                                                    {parameters.potassium.status}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Soil pH</td>

                                                <td>
                                                    {parameters.ph.value}
                                                </td>

                                                <td>
                                                    {parameters.ph.score}%
                                                </td>

                                                <td>
                                                    {parameters.ph.status}
                                                </td>
                                            </tr>

                                        </tbody>

                                    </table>

                                </div>

                                {/* Disclaimer */}
                                <div className="alert alert-light border mt-4 mb-0">

                                    <strong>Note:</strong>{" "}
                                    This is an indicative soil health
                                    assessment based on N, P, K and
                                    soil pH. It is not a laboratory
                                    Soil Health Card result.

                                </div>

                            </div>

                            {/* Modal Footer */}
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