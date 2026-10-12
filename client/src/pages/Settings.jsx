import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./../styles/settings.css";

const defaultSettings = {
    darkMode: false,
    temperatureUnit: "C",
    rainfallUnit: "mm",
    showConfidenceScore: true
};

function Settings() {
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem(
            "agripredict_settings"
        );

        return savedSettings
            ? JSON.parse(savedSettings)
            : defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem(
            "agripredict_settings",
            JSON.stringify(settings)
        );

        document.body.classList.toggle(
            "dark-mode",
            settings.darkMode
        );
    }, [settings]);

    const updateSetting = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleReset = () => {
        const confirmed = window.confirm(
            "Are you sure you want to reset all settings?"
        );

        if (!confirmed) {
            return;
        }

        setSettings(defaultSettings);
    };

    return (
        <DashboardLayout>
            <div className="settings-page">

                <div className="settings-page-header">
                    <h2>Settings</h2>
                    <p>
                        Manage your AgriPredict application preferences.
                    </p>
                </div>

                {/* Appearance */}
                <div className="settings-section">
                    <h3>Appearance</h3>

                    <div className="settings-card">

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">
                                    🌙
                                </span>

                                <div>
                                    <h4>Dark Mode</h4>
                                    <p>
                                        Use a darker appearance throughout
                                        the application.
                                    </p>
                                </div>
                            </div>

                            <label className="settings-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.darkMode}
                                    onChange={(e) =>
                                        updateSetting(
                                            "darkMode",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="settings-slider"></span>
                            </label>
                        </div>

                    </div>
                </div>

                {/* Units */}
                <div className="settings-section">
                    <h3>Units</h3>

                    <div className="settings-card">

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">
                                    🌡️
                                </span>

                                <div>
                                    <h4>Temperature Unit</h4>
                                    <p>
                                        Choose how temperature values are
                                        displayed.
                                    </p>
                                </div>
                            </div>

                            <select
                                value={settings.temperatureUnit}
                                onChange={(e) =>
                                    updateSetting(
                                        "temperatureUnit",
                                        e.target.value
                                    )
                                }
                                className="settings-select"
                            >
                                <option value="C">°C</option>
                                <option value="F">°F</option>
                            </select>
                        </div>

                        <div className="setting-divider"></div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">
                                    🌧️
                                </span>

                                <div>
                                    <h4>Rainfall Unit</h4>
                                    <p>
                                        Choose how rainfall values are
                                        displayed.
                                    </p>
                                </div>
                            </div>

                            <select
                                value={settings.rainfallUnit}
                                onChange={(e) =>
                                    updateSetting(
                                        "rainfallUnit",
                                        e.target.value
                                    )
                                }
                                className="settings-select"
                            >
                                <option value="mm">mm</option>
                                <option value="inch">inch</option>
                            </select>
                        </div>

                    </div>
                </div>

                {/* Prediction */}
                <div className="settings-section">
                    <h3>Prediction</h3>

                    <div className="settings-card">

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">
                                    🎯
                                </span>

                                <div>
                                    <h4>Show Confidence Score</h4>
                                    <p>
                                        Display prediction confidence
                                        percentages in the application.
                                    </p>
                                </div>
                            </div>

                            <label className="settings-switch">
                                <input
                                    type="checkbox"
                                    checked={
                                        settings.showConfidenceScore
                                    }
                                    onChange={(e) =>
                                        updateSetting(
                                            "showConfidenceScore",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="settings-slider"></span>
                            </label>
                        </div>

                    </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-section danger-zone">
                    <h3>Danger Zone</h3>

                    <div className="settings-card">

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-icon">
                                    🔄
                                </span>

                                <div>
                                    <h4>Reset Settings</h4>
                                    <p>
                                        Reset all application preferences
                                        to their default values.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="settings-reset-btn"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

export default Settings;