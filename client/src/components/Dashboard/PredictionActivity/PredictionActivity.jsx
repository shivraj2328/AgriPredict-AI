import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function PredictionActivity({ predictions = [] }) {
    const activity = {};

    predictions.forEach((prediction) => {
        if (!prediction.createdAt) {
            return;
        }

        const date = new Date(
            prediction.createdAt
        ).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short"
        });

        activity[date] = (activity[date] || 0) + 1;
    });

    const labels = Object.keys(activity);

    const data = {
        labels,
        datasets: [
            {
                label: "Predictions",
                data: labels.map(
                    (label) => activity[label]
                ),
                tension: 0.3,
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Prediction Activity"
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">

                <div
                    style={{
                        height: "300px"
                    }}
                >
                    {labels.length > 0 ? (
                        <Line
                            data={data}
                            options={options}
                        />
                    ) : (
                        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                            No prediction activity available.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default PredictionActivity;