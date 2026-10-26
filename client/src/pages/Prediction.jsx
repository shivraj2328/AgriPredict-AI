import { useEffect, useState } from "react";
import api from "../services/api";
import PredictionForm from "../components/Dashboard/PredictionForm/PredictionForm";
import "./prediction.css";
const Prediction = () => {
    const [farms, setFarms] = useState([]);
    const [selectedFarmId, setSelectedFarmId] = useState("");
    const [farmsLoading, setFarmsLoading] = useState(true);
    const [predictionLoading, setPredictionLoading] = useState(false);

    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        rainfall: "",
        ph: "",
        latitude: "",
        longitude: ""
    });

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setFarmsLoading(true);

                const response = await api.get("/farms");

                setFarms(response.data.farms || []);
            } catch (error) {
                console.error("Failed to fetch farms:", error);
                alert("Unable to load your registered farms.");
            } finally {
                setFarmsLoading(false);
            }
        };

        fetchFarms();
    }, []);

    // Automatically update coordinates when a registered farm is selected.
    const handleFarmChange = (event) => {
        const farmId = event.target.value;

        setSelectedFarmId(farmId);

        const selectedFarm = farms.find(
            (farm) => farm._id === farmId
        );

        if (!selectedFarm) {
            setFormData((previous) => ({
                ...previous,
                latitude: "",
                longitude: "",
                temperature: "",
                humidity: "",
                rainfall: ""
            }));

            return;
        }

        setFormData((previous) => ({
            ...previous,
            latitude: selectedFarm.latitude,
            longitude: selectedFarm.longitude,
            temperature: "",
            humidity: "",
            rainfall: ""
        }));
    };

    const selectedFarm =
        farms.find((farm) => farm._id === selectedFarmId) || null;

    const handlePredict = async (event) => {
        event.preventDefault();

        if (!selectedFarmId) {
            alert("Please select a registered farm.");
            return;
        }

        try {
            setPredictionLoading(true);

            const response = await api.post("/predictions", {
                farmId: selectedFarmId,
                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
                rainfall: Number(formData.rainfall),
                ph: Number(formData.ph),
                latitude: Number(formData.latitude),
                longitude: Number(formData.longitude)
            });

            alert(
                response.data.message ||
                "Crop prediction completed successfully."
            );

            // Preserve your existing post-prediction navigation or
            // dashboard refresh logic here if your original file has it.
        } catch (error) {
            console.error("Prediction failed:", error);

            alert(
                error.response?.data?.message ||
                "Unable to predict the crop. Please try again."
            );
        } finally {
            setPredictionLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            temperature: "",
            humidity: "",
            rainfall: "",
            ph: "",
            latitude: selectedFarm?.latitude ?? "",
            longitude: selectedFarm?.longitude ?? ""
        });
    };

    return (
        <div className="prediction-page">
            <h1>Crop Prediction</h1>

            <div className="farm-selection">
                <label htmlFor="farm">Select Registered Farm</label>

                <select
                    id="farm"
                    value={selectedFarmId}
                    onChange={handleFarmChange}
                    disabled={farmsLoading || farms.length === 0}
                >
                    <option value="">
                        {farmsLoading
                            ? "Loading farms..."
                            : farms.length === 0
                                ? "No registered farms available"
                                : "Select a farm"}
                    </option>

                    {farms.map((farm) => (
                        <option key={farm._id} value={farm._id}>
                            {farm.name}
                        </option>
                    ))}
                </select>
            </div>

            <PredictionForm
                formData={formData}
                setFormData={setFormData}
                handlePredict={handlePredict}
                handleReset={handleReset}
                predictionLoading={predictionLoading}
                farmsLoading={farmsLoading}
                hasRegisteredFarms={farms.length > 0}
                selectedFarm={selectedFarm}
            />
        </div>
    );
};

export default Prediction;
