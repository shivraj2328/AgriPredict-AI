import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from "chart.js";

import "./PredictionActivity.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

function PredictionActivity({ predictions = [] }) {
    const activity = {};

    predictions.forEach((prediction) => {
        if (!prediction.createdAt) {
            return;
        }

        const date = new Date(prediction.createdAt);

        const key = date.toISOString().split("T")[0];

        activity[key] = (activity[key] || 0) + 1;
    });

    const sortedDates = Object.keys(activity).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const labels = sortedDates.map((date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        })
    );

    const values = sortedDates.map(
        (date) => activity[date]
    );

    const data = {
        labels,

        datasets: [
            {
                label: "Predictions",
                data: values,

                borderColor: "#2f8f5b",
                backgroundColor: "rgba(47, 143, 91, 0.12)",

                borderWidth: 3,

                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#2f8f5b",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,

                tension: 0.35,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {
            legend: {
                display: false
            },

            tooltip: {
                backgroundColor: "#123c2a",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                padding: 12,
                displayColors: false,

                callbacks: {
                    label: (context) =>
                        `${context.raw} prediction${
                            context.raw !== 1 ? "s" : ""
                        }`
                }
            }
        },

        scales: {
            x: {
                grid: {
                    display: false
                },

                ticks: {
                    color: "#718096",
                    font: {
                        size: 11
                    }
                },

                border: {
                    display: false
                }
            },

            y: {
                beginAtZero: true,

                ticks: {
                    stepSize: 1,
                    color: "#718096",
                    font: {
                        size: 11
                    }
                },

                grid: {
                    color: "rgba(0, 0, 0, 0.06)"
                },

                border: {
                    display: false
                }
            }
        }
    };

    return (
        <div className="prediction-activity-card">

            <div className="prediction-chart-header">
                <div>
                    <h4>Prediction Activity</h4>
                    <p>
                        Your prediction activity over time
                    </p>
                </div>

                <div className="prediction-chart-icon">
                    📈
                </div>
            </div>

            <div className="prediction-chart-container">
                {labels.length > 0 ? (
                    <Line
                        data={data}
                        options={options}
                    />
                ) : (
                    <div className="prediction-chart-empty">
                        No prediction activity available.
                    </div>
                )}
            </div>

        </div>
    );
}

export default PredictionActivity;