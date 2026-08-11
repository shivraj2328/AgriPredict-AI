import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./../styles/profile.css";

function Profile() {
    const [user, setUser] = useState({
        name: "Shivraj Jagtap",
        email: "shivraj@example.com",
        memberSince: "August 2026",
    });

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setName(user.name);
        setEmail(user.email);
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!name.trim() || !email.trim()) {
            alert("Please fill all fields.");
            return;
        }

        setUser({
            ...user,
            name: name,
            email: email,
        });

        setIsEditing(false);

        alert("Profile updated successfully.");
    };

    const handleCancel = () => {
        setName(user.name);
        setEmail(user.email);
        setIsEditing(false);
    };

    return (
        <DashboardLayout>
            <div className="profile-page">

                {/* Page Header */}
                <div className="profile-page-header">
                    <h2>My Profile</h2>
                    <p>
                        Manage your account information and view your
                        farming activity.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="profile-card">

                    <div className="profile-avatar">
                        👤
                    </div>

                    <div className="profile-info">
                        <h3>{user.name}</h3>

                        <p className="profile-email">
                            {user.email}
                        </p>

                        <p className="profile-member">
                            Member since {user.memberSince}
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            className="btn btn-success profile-edit-btn"
                            onClick={handleEdit}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Statistics */}
                <div className="profile-section">
                    <h3 className="section-title">
                        Farming Statistics
                    </h3>

                    <div className="row g-4">

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="profile-stat-card">
                                <span className="stat-icon">🌱</span>

                                <div>
                                    <p>Total Predictions</p>
                                    <h4>12</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="profile-stat-card">
                                <span className="stat-icon">✓</span>

                                <div>
                                    <p>Successful Predictions</p>
                                    <h4>10</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="profile-stat-card">
                                <span className="stat-icon">🌾</span>

                                <div>
                                    <p>Favorite Crop</p>
                                    <h4>Rice</h4>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3">
                            <div className="profile-stat-card">
                                <span className="stat-icon">📊</span>

                                <div>
                                    <p>Average Confidence</p>
                                    <h4>92%</h4>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Edit Profile */}
                {isEditing && (
                    <div className="profile-edit-card">

                        <h3>Edit Profile</h3>

                        <div className="row g-3">

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="profileName"
                                    className="form-label"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="profileName"
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12 col-md-6">
                                <label
                                    htmlFor="profileEmail"
                                    className="form-label"
                                >
                                    Email
                                </label>

                                <input
                                    id="profileEmail"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>

                        </div>

                        <div className="profile-form-actions">

                            <button
                                className="btn btn-success"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}

export default Profile;