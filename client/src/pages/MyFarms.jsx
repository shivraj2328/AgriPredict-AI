import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import FarmForm from "../components/Dashboard/FarmManagement/FarmForm";
import FarmLocationMap from "../components/Dashboard/FarmManagement/FarmLocationMap";
import api from "../services/api";
import "../styles/my-farms.css";

function MyFarms() {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deletingFarmId, setDeletingFarmId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);

    // Fetch farms belonging to the logged-in user
    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/farms");

                setFarms(response.data.farms || []);
            } catch (err) {
                console.error("Fetch farms error:", err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load your farms. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, []);

    // Open the registration form
    const handleAddFarm = () => {
        setError("");
        setSuccess("");
        setEditingFarm(null);
        setShowForm(true);
    };

    // Open the edit form for a selected farm
    const handleEditFarm = (farm) => {
        setError("");
        setSuccess("");
        setEditingFarm(farm);
        setShowForm(true);
    };

    // Register or update a farm
    const handleFarmSubmit = async (farmData) => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingFarm) {
                const response = await api.put(
                    `/farms/${editingFarm._id}`,
                    farmData
                );

                const updatedFarm = response.data.farm;

                setFarms((previousFarms) =>
                    previousFarms.map((farm) =>
                        farm._id === updatedFarm._id
                            ? updatedFarm
                            : farm
                    )
                );

                setSuccess(
                    response.data.message || "Farm updated successfully."
                );
            } else {
                const response = await api.post("/farms", farmData);
                const newFarm = response.data.farm;

                setFarms((previousFarms) => [
                    newFarm,
                    ...previousFarms
                ]);

                setSuccess(
                    response.data.message || "Farm registered successfully."
                );
            }

            setShowForm(false);
            setEditingFarm(null);
        } catch (err) {
            console.error("Save farm error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to save farm details. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete a farm
    const handleDeleteFarm = async (farm) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${farm.name}"? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingFarmId(farm._id);
            setError("");
            setSuccess("");

            const response = await api.delete(`/farms/${farm._id}`);

            setFarms((previousFarms) =>
                previousFarms.filter(
                    (item) => item._id !== farm._id
                )
            );

            // Close the edit form if the deleted farm was being edited
            if (editingFarm?._id === farm._id) {
                setEditingFarm(null);
                setShowForm(false);
            }

            setSuccess(
                response.data.message || "Farm deleted successfully."
            );
        } catch (err) {
            console.error("Delete farm error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to delete farm. Please try again."
            );
        } finally {
            setDeletingFarmId(null);
        }
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingFarm(null);
        setError("");
    };

    return (
        <DashboardLayout>
            <div className="my-farms-page">
                <div className="my-farms-header">
                    <div>
                        <h2>🌱 My Farms</h2>
                        <p>Manage your registered farms in one place.</p>
                    </div>

                    <button
                        type="button"
                        className="add-farm-button"
                        onClick={handleAddFarm}
                    >
                        + Add New Farm
                    </button>
                </div>

                {success && (
                    <div className="alert alert-success" role="status">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {showForm && (
                    <FarmForm
                        key={editingFarm?._id || "new-farm"}
                        onSubmit={handleFarmSubmit}
                        onCancel={handleCancelForm}
                        loading={saving}
                        initialData={editingFarm}
                        isEditing={Boolean(editingFarm)}
                    />
                )}

                {loading && (
                    <div className="farms-message">
                        Loading your farms...
                    </div>
                )}

                {!loading && !error && farms.length === 0 && !showForm && (
                    <div className="farms-empty-state">
                        <div className="farms-empty-icon">🚜</div>

                        <h3>No farms registered yet</h3>

                        <p>
                            Add your first farm to start organizing your
                            agricultural activities.
                        </p>

                        <button
                            type="button"
                            className="add-farm-button"
                            onClick={handleAddFarm}
                        >
                            + Register Your First Farm
                        </button>
                    </div>
                )}

                {!loading && farms.length > 0 && (
                    <div className="farms-grid">
                        {farms.map((farm) => (
                            <article
                                className="farm-card"
                                key={farm._id}
                            >
                                <div className="farm-card-header">
                                    <span className="farm-card-icon">
                                        🌾
                                    </span>

                                    <h3>{farm.name}</h3>
                                </div>

                                <FarmLocationMap
                                    latitude={farm.latitude}
                                    longitude={farm.longitude}
                                    farmName={farm.name}
                                />

                                <div className="farm-details">
                                    <div className="farm-detail-item">
                                        <strong>📍 Location</strong>

                                        <span>
                                            {farm.latitude},{" "}
                                            {farm.longitude}
                                        </span>
                                    </div>

                                    <div className="farm-detail-item">
                                        <strong>📝 Description</strong>

                                        <p>
                                            {farm.description?.trim() ||
                                                "No description provided."}
                                        </p>
                                    </div>
                                </div>

                                <div className="farm-card-actions">
                                    <button
                                        type="button"
                                        className="farm-edit-button"
                                        onClick={() => handleEditFarm(farm)}
                                        disabled={saving || deletingFarmId !== null}
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="farm-delete-button"
                                        onClick={() => handleDeleteFarm(farm)}
                                        disabled={deletingFarmId !== null || saving}
                                    >
                                        {deletingFarmId === farm._id
                                            ? "Deleting..."
                                            : "🗑️ Delete"}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default MyFarms;
