import { useNavigate } from "react-router-dom";

function QuickPrediction() {

    const navigate = useNavigate();

    return (

        <div className="card shadow-sm">

            <div className="card-body">

                <h4>Quick Prediction</h4>

                <p>
                    Start a new crop prediction using soil and weather data.
                </p>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/prediction")}
                >
                    Start Prediction
                </button>

            </div>

        </div>

    );

}

export default QuickPrediction;