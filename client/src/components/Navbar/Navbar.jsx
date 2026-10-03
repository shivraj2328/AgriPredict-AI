import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm agri-navbar">
            <div className="container">

                <Link to="/" className="navbar-brand agri-brand">
                    <span className="agri-logo">
                        🌱
                    </span>

                    <span className="agri-brand-text">
                        AgriPredict <span>AI</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link">
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link">
                                Contact
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/register"
                                className="nav-link register-link"
                            >
                                Register
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;