import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PredictionForm from "../components/Dashboard/PredictionForm/PredictionForm";
import PredictionResult from "../components/Dashboard/PredictionResult/PredictionResult";

function Prediction() {

    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        rainfall: "",
        ph: ""
    });

    const [prediction, setPrediction] = useState(null);

    const [error, setError] = useState("");

    const handlePredict = () => {

        setError("");

        for (const key in formData) {

            if (formData[key] === "") {

                setError("Please fill all fields.");

                return;

            }

        }

        for (const key in formData) {

            if (isNaN(formData[key])) {

                setError(`${key} must be numeric.`);

                return;

            }

        }

        if (formData.ph < 0 || formData.ph > 14) {

            setError("Soil pH must be between 0 and 14.");

            return;

        }

        if (formData.humidity < 0 || formData.humidity > 100) {

            setError("Humidity must be between 0 and 100.");

            return;

        }

        if (formData.rainfall < 0) {

            setError("Rainfall cannot be negative.");

            return;

        }

        setPrediction({

            crop: "Rice",

            confidence: 96,

            reason:
                "Based on soil nutrients and weather conditions, Rice is the most suitable crop."

        });

    };

    const handleReset = () => {

        setFormData({

            nitrogen: "",
            phosphorus: "",
            potassium: "",
            temperature: "",
            humidity: "",
            rainfall: "",
            ph: ""

        });

        setPrediction(null);

        setError("");

    };

    return (

        <DashboardLayout>

            <div className="container-fluid p-4">

                <h2 className="mb-4">
                    🌱 Crop Prediction
                </h2>

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}

                <div className="row">

                    <div className="col-lg-7">

                        <PredictionForm
                            formData={formData}
                            setFormData={setFormData}
                            handlePredict={handlePredict}
                            handleReset={handleReset}
                        />

                    </div>

                    <div className="col-lg-5">

                        <PredictionResult
                            prediction={prediction}
                        />

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Prediction;