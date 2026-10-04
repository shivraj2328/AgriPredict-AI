import { useEffect, useState } from "react";
import api from "../../../services/api";

function RecentPredictions() {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecentPredictions = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/predictions");

                const recentPredictions =
                    response.data.predictions || [];

                setPredictions(recentPredictions.slice(0, 3));
            } catch (error) {
                console.error(
                    "Recent predictions error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load recent predictions."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRecentPredictions();
    }, []);

    const formatDate = (date) => {
        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        });
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h4>Recent Predictions</h4>

                {error && (
                    <div className="alert alert-danger mt-3">
                        {error}
                    </div>
                )}

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Crop</th>
                                <th>Confidence</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center"
                                    >
                                        Loading predictions...
                                    </td>
                                </tr>
                            ) : predictions.length > 0 ? (
                                predictions.map((prediction) => (
                                    <tr key={prediction._id}>
                                        <td>
                                            {formatDate(
                                                prediction.createdAt
                                            )}
                                        </td>

                                        <td>
                                            {prediction.recommendedCrop ||
                                                "N/A"}
                                        </td>

                                        <td>
                                            {Number(
                                                prediction.confidence
                                            ) || 0}
                                            %
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center"
                                    >
                                        No predictions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RecentPredictions;