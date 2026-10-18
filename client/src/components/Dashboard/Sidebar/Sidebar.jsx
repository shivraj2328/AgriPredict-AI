import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../../utils/auth";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                type="button"
                className="mobile-menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`dashboard-sidebar ${isOpen ? "sidebar-open" : ""}`}
            >
                <div className="sidebar-brand">
                    <div className="sidebar-logo">🌱</div>

                    <div>
                        <h4>AgriPredict</h4>
                        <span>Smart Farming</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <p className="sidebar-section-title">MAIN MENU</p>

                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">🏠</span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/prediction"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">🌾</span>
                        <span>Crop Prediction</span>
                    </NavLink>

                    <NavLink
                        to="/history"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">📊</span>
                        <span>Prediction History</span>
                    </NavLink>

                    <p className="sidebar-section-title sidebar-section-spaced">
                        ACCOUNT
                    </p>

                    <NavLink
                        to="/profile"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">👤</span>
                        <span>Profile</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="sidebar-icon">⚙️</span>
                        <span>Settings</span>
                    </NavLink>
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-tip">
                        <span className="sidebar-tip-icon">💡</span>

                        <div>
                            <strong>Smart Farming</strong>
                            <p>
                                Make better decisions with AgriPredict.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="sidebar-logout"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;