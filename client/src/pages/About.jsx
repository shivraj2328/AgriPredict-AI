import MainLayout from "../layouts/MainLayout";
import "../styles/about.css";

function About() {
    return (
        <MainLayout>
            {/* About Hero */}
            <section className="about-hero">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-lg-7">
                            <span className="about-badge">
                                🌱 About AgriPredict AI
                            </span>

                            <h1 className="about-hero-title">
                                Smart Farming Starts with Smart Decisions
                            </h1>

                            <p className="about-hero-text">
                                AgriPredict AI is a smart farming assistant
                                designed to help farmers make data-driven
                                decisions using soil, weather and
                                environmental information.
                            </p>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="about-hero-card">
                                <div className="about-hero-icon">
                                    🌱
                                </div>

                                <h3>Smart Agriculture</h3>

                                <p>
                                    Combining agricultural data and
                                    intelligent recommendations to support
                                    better farming decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What is AgriPredict */}
            <section className="about-section">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-12 col-lg-6">
                            <span className="section-label">
                                ABOUT THE PROJECT
                            </span>

                            <h2 className="about-section-title">
                                What is AgriPredict?
                            </h2>

                            <p>
                                AgriPredict AI is an intelligent farming
                                application designed to assist farmers in
                                making better agricultural decisions.
                            </p>

                            <p>
                                The application combines soil parameters,
                                environmental information and intelligent
                                recommendations to provide useful insights
                                for crop selection and farming activities.
                            </p>

                            <p>
                                The goal is to make agricultural decision
                                support easier to understand, accessible
                                and useful through a simple web interface.
                            </p>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="about-info-card">
                                <div className="info-card-icon">
                                    🌾
                                </div>

                                <h3>
                                    Data-Driven Farming
                                </h3>

                                <p>
                                    Use available agricultural and
                                    environmental data to support informed
                                    farming decisions.
                                </p>

                                <div className="about-highlight">
                                    <span>🌱</span>
                                    <span>
                                        Better data → Better decisions
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="about-section about-section-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label">
                            SIMPLE WORKFLOW
                        </span>

                        <h2 className="about-section-title">
                            How AgriPredict Works
                        </h2>

                        <p className="about-section-subtitle">
                            A simple process designed to turn agricultural
                            data into useful recommendations.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    01
                                </div>

                                <div className="workflow-icon">
                                    🧪
                                </div>

                                <h3>Enter Data</h3>

                                <p>
                                    Provide soil parameters such as
                                    nitrogen, phosphorus, potassium and pH.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    02
                                </div>

                                <div className="workflow-icon">
                                    📊
                                </div>

                                <h3>Analyze Conditions</h3>

                                <p>
                                    The system processes the available
                                    agricultural and environmental data.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    03
                                </div>

                                <div className="workflow-icon">
                                    🌾
                                </div>

                                <h3>Get Recommendation</h3>

                                <p>
                                    Receive a suitable crop recommendation
                                    along with confidence information.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    04
                                </div>

                                <div className="workflow-icon">
                                    ✅
                                </div>

                                <h3>Make Decisions</h3>

                                <p>
                                    Use the generated insights as support
                                    when planning farming activities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="about-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label">
                            PLATFORM FEATURES
                        </span>

                        <h2 className="about-section-title">
                            What AgriPredict Offers
                        </h2>
                    </div>

                    <div className="row g-4">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🌾
                                </div>

                                <h3>Crop Recommendation</h3>

                                <p>
                                    Get crop recommendations based on
                                    available soil and environmental
                                    parameters.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🌦️
                                </div>

                                <h3>Weather Information</h3>

                                <p>
                                    View weather-related information that
                                    can support agricultural planning.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🧪
                                </div>

                                <h3>Soil Health Analysis</h3>

                                <p>
                                    Analyze important soil parameters and
                                    understand the overall soil condition.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    💧
                                </div>

                                <h3>Irrigation Suggestions</h3>

                                <p>
                                    Receive irrigation-related suggestions
                                    using environmental conditions.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    📊
                                </div>

                                <h3>Prediction History</h3>

                                <p>
                                    Review previous crop predictions and
                                    their confidence information.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    👤
                                </div>

                                <h3>User Dashboard</h3>

                                <p>
                                    Access predictions, statistics and
                                    farming-related insights from one
                                    dashboard.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="about-section about-section-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="section-label">
                            TECHNOLOGY
                        </span>

                        <h2 className="about-section-title">
                            Technology Stack
                        </h2>

                        <p className="about-section-subtitle">
                            Technologies planned for building the
                            AgriPredict AI platform.
                        </p>
                    </div>

                    <div className="row justify-content-center g-4">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>⚛️</span>
                                <h3>React + Vite</h3>
                                <p>Frontend application</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🟢</span>
                                <h3>Node.js + Express</h3>
                                <p>Backend API</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🍃</span>
                                <h3>MongoDB</h3>
                                <p>Database</p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🤖</span>
                                <h3>Machine Learning</h3>
                                <p>AI prediction layer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

export default About;