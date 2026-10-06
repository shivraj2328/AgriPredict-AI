
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../../utils/auth";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="dashboard-sidebar">

            {/* Logo */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    🌱
                </div>

                <div>
                    <h4>AgriPredict</h4>
                    <span>Smart Farming</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">

                <p className="sidebar-section-title">
                    MAIN MENU
                </p>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">🏠</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/prediction"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">🌾</span>
                    <span>Crop Prediction</span>
                </NavLink>

                <NavLink
                    to="/history"
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
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">👤</span>
                    <span>Profile</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                    }
                >
                    <span className="sidebar-icon">⚙️</span>
                    <span>Settings</span>
                </NavLink>

            </nav>

            {/* Bottom Section */}
            <div className="sidebar-bottom">

                <div className="sidebar-tip">
                    <span className="sidebar-tip-icon">
                        💡
                    </span>

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
    );
}

export default Sidebar;

