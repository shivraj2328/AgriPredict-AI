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

import "./ConfidenceTrend.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
);

function ConfidenceTrend({ predictions = [] }) {
    const sortedPredictions = [...predictions]
        .filter(
            (prediction) =>
                prediction.createdAt &&
                prediction.confidence !== undefined
        )
        .sort(
            (a, b) =>
                new Date(a.createdAt) -
                new Date(b.createdAt)
        );

    const labels = sortedPredictions.map(
        (prediction) =>
            new Date(
                prediction.createdAt
            ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
            })
    );

    const confidenceValues =
        sortedPredictions.map(
            (prediction) =>
                Number(prediction.confidence) || 0
        );

    const data = {
        labels,

        datasets: [
            {
                label: "Confidence",
                data: confidenceValues,

                borderColor: "#4d96ff",
                backgroundColor: "rgba(77, 150, 255, 0.10)",

                borderWidth: 3,

                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#4d96ff",
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
                        `Confidence: ${context.raw}%`
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
                min: 0,
                max: 100,

                ticks: {
                    stepSize: 20,
                    color: "#718096",
                    font: {
                        size: 11
                    },

                    callback: (value) =>
                        `${value}%`
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
        <div className="confidence-trend-card">

            <div className="confidence-chart-header">
                <div>
                    <h4>Confidence Trend</h4>
                    <p>
                        Prediction confidence over time
                    </p>
                </div>

                <div className="confidence-chart-icon">
                    🎯
                </div>
            </div>

            <div className="confidence-chart-container">
                {labels.length > 0 ? (
                    <Line
                        data={data}
                        options={options}
                    />
                ) : (
                    <div className="confidence-chart-empty">
                        No confidence trend data available.
                    </div>
                )}
            </div>

        </div>
    );
}

export default ConfidenceTrend;