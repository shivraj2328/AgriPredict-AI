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

    return (

        <DashboardLayout>

            <div className="container-fluid p-4">

                <h2 className="mb-4">
                    🌱 Crop Prediction
                </h2>

                <PredictionForm
                    formData={formData}
                    setFormData={setFormData}
                />

                <PredictionResult />

            </div>

        </DashboardLayout>

    );

}

export default Prediction;