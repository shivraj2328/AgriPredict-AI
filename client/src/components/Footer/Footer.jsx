import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4">

            <h5>AgriPredict AI</h5>

            <p>
                Helping farmers make smarter decisions.
            </p>

            <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <p className="mt-3">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </p>

            <small>
                © 2026 AgriPredict AI | v1.8.0
            </small>

        </footer>
    );
}

export default Footer;