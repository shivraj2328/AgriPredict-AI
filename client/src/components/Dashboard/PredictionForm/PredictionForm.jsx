import "./PredictionForm.css";

function PredictionForm({ formData, setFormData,handlePredict,
    handleReset }) {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    return (

        <div className="card prediction-form shadow p-4">

            <h4 className="mb-4">
                Soil Parameters
            </h4>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Nitrogen (N)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                    />c
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Phosphorus (P)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="phosphorus"
                        value={formData.phosphorus}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Potassium (K)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Temperature (°C)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Humidity (%)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">
                        Rainfall (mm)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-4">
                    <label className="form-label">
                        Soil pH
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        className="form-control"
                        name="ph"
                        value={formData.ph}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="d-flex gap-3">

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handlePredict}
                >
                    Predict Crop
                </button>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                >
                    Reset
                </button>

            </div>

        </div>

    );

}

export default PredictionForm;