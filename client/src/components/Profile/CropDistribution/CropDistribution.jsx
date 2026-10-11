import { Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function CropDistribution({ predictions = [] }) {
    const cropCounts = {};

    predictions.forEach((prediction) => {
        const crop = prediction.recommendedCrop?.trim();

        if (crop) {
            cropCounts[crop] =
                (cropCounts[crop] || 0) + 1;
        }
    });

    const sortedCrops = Object.entries(cropCounts)
        .sort(([, countA], [, countB]) => countB - countA);

    const labels = sortedCrops.map(
        ([crop]) => crop
    );

    const values = sortedCrops.map(
        ([, count]) => count
    );

    const totalPredictions = values.reduce(
        (total, value) => total + value,
        0
    );

    const cropColors = [
        "#2f8f5b",
        "#4caf7d",
        "#f4b942",
        "#4d96ff",
        "#9b6bce",
        "#e76f51",
        "#43aa8b",
        "#577590"
    ];

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: labels.map(
                    (_, index) =>
                        cropColors[index % cropColors.length]
                ),
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 8
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        cutout: "68%",

        layout: {
            padding: 10
        },

        plugins: {
            legend: {
                position: "bottom",

                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 18,
                    boxWidth: 8,
                    font: {
                        size: 12
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;

                        const percentage =
                            totalPredictions > 0
                                ? (
                                    (value / totalPredictions) *
                                    100
                                ).toFixed(1)
                                : 0;

                        return ` ${context.label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    if (labels.length === 0) {
        return (
            <div className="card shadow-sm">
                <div className="card-body">
                    <div
                        className="d-flex align-items-center justify-content-center text-muted"
                        style={{ height: "320px" }}
                    >
                        No crop distribution data available.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-4">

                <div
                    className="position-relative mx-auto"
                    style={{
                        height: "360px",
                        maxWidth: "650px"
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />

                    {/* Center Content */}
                    <div
                        className="position-absolute top-50 start-50 translate-middle text-center"
                        style={{
                            pointerEvents: "none"
                        }}
                    >
                        <div
                            className="text-muted"
                            style={{
                                fontSize: "13px",
                                fontWeight: "500"
                            }}
                        >
                            Total
                        </div>

                        <div
                            style={{
                                fontSize: "30px",
                                fontWeight: "700",
                                lineHeight: "1.2"
                            }}
                        >
                            {totalPredictions}
                        </div>

                        <div
                            className="text-muted"
                            style={{
                                fontSize: "12px"
                            }}
                        >
                            Predictions
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CropDistribution;