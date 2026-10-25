import { useEffect, useState } from "react";
import FarmLocationPicker from "../FarmLocationPicker/FarmLocationPicker";
import "./FarmForm.css";

function FarmForm({
    onSubmit,
    onCancel,
    loading = false,
    initialData = null,
    isEditing = false
}) {
    const [formData, setFormData] = useState({
        name: "",
        latitude: "",
        longitude: "",
        description: ""
    });

    const [validationError, setValidationError] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                latitude: initialData.latitude ?? "",
                longitude: initialData.longitude ?? "",
                description: initialData.description || ""
            });
        } else {
            setFormData({
                name: "",
                latitude: "",
                longitude: "",
                description: ""
            });
        }
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleLocationSelect = ({ latitude, longitude }) => {
        setFormData((previous) => ({
            ...previous,
            latitude,
            longitude
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setValidationError("");

        const name = formData.name.trim();
        const latitude = Number(formData.latitude);
        const longitude = Number(formData.longitude);
        const description = formData.description.trim();

        if (name.length < 2 || name.length > 100) {
            setValidationError(
                "Farm name must contain between 2 and 100 characters."
            );
            return;
        }

        if (
            formData.latitude === "" ||
            !Number.isFinite(latitude) ||
            latitude < -90 ||
            latitude > 90
        ) {
            setValidationError("Enter a valid latitude between -90 and 90.");
            return;
        }

        if (
            formData.longitude === "" ||
            !Number.isFinite(longitude) ||
            longitude < -180 ||
            longitude > 180
        ) {
            setValidationError(
                "Enter a valid longitude between -180 and 180."
            );
            return;
        }

        if (description.length > 500) {
            setValidationError(
                "Description cannot exceed 500 characters."
            );
            return;
        }

        await onSubmit({
            name,
            latitude,
            longitude,
            description
        });
    };

    return (
        <form className="farm-form" onSubmit={handleSubmit}>
            <div className="farm-form-header">
                <h3>{isEditing ? "Edit Farm" : "Register New Farm"}</h3>
            </div>

            {validationError && (
                <div className="alert alert-danger" role="alert">
                    {validationError}
                </div>
            )}

            <div className="farm-form-group">
                <label htmlFor="farm-name">Farm Name</label>

                <input
                    id="farm-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter farm name"
                    maxLength={100}
                    required
                />
            </div>

            <div className="farm-form-group">
                <label>Choose Farm Location</label>

                <FarmLocationPicker
                    onLocationSelect={handleLocationSelect}
                />
            </div>

            <div className="farm-form-row">
                <div className="farm-form-group">
                    <label htmlFor="farm-latitude">Latitude</label>

                    <input
                        id="farm-latitude"
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        min="-90"
                        max="90"
                        step="any"
                        required
                    />
                </div>

                <div className="farm-form-group">
                    <label htmlFor="farm-longitude">Longitude</label>

                    <input
                        id="farm-longitude"
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        min="-180"
                        max="180"
                        step="any"
                        required
                    />
                </div>
            </div>

            <div className="farm-form-group">
                <label htmlFor="farm-description">Description</label>

                <textarea
                    id="farm-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your farm (optional)"
                    rows="3"
                    maxLength={500}
                />
            </div>

            <div className="farm-form-actions">
                <button
                    type="submit"
                    className="farm-submit-button"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : isEditing
                            ? "Save Changes"
                            : "Register Farm"}
                </button>

                <button
                    type="button"
                    className="farm-cancel-button"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default FarmForm;

