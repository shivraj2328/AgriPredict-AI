import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
    return (
        <section className="hero-section">

            <div className="container text-center hero-content">

                <h1 className="display-4 fw-bold">
                    Smart Farming Starts with Smart Decisions
                </h1>

                <p className="lead">
                    AgriPredict AI helps farmers analyze crops,
                    weather, irrigation and soil health using AI.
                </p>

                <div className="hero-buttons">

                    <Link
                        to="/login"
                        className="btn btn-success me-3"
                    >
                        Get Started
                    </Link>

                    <Link
                        to="/about"
                        className="btn btn-outline-success"
                    >
                        Learn More
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default Hero;