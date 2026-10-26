import "../styles/about.css";

function About() {
    return (
        <>
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
                                AgriPredict AI is a smart farming platform
                                that helps farmers make informed crop
                                selection decisions using soil parameters,
                                weather information and AI-powered
                                recommendations.
                            </p>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="about-hero-card">
                                <div className="about-hero-icon">
                                    🌱
                                </div>

                                <h3>Smart Agriculture</h3>

                                <p>
                                    Connect farm-specific information,
                                    intelligent crop predictions and
                                    soil health insights in one place.
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
                                AgriPredict AI is a web-based smart farming
                                application designed to support farmers
                                in making data-driven agricultural
                                decisions.
                            </p>

                            <p>
                                Farmers can register multiple farms,
                                provide soil and environmental parameters,
                                and receive AI-powered crop recommendations
                                for their selected farm.
                            </p>

                            <p>
                                The platform also provides prediction
                                history, farm-specific indicative soil
                                health analysis and a dashboard that
                                brings important farming insights
                                together.
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
                                    Use recorded farm information,
                                    soil measurements and weather data
                                    to support informed crop selection
                                    and agricultural planning.
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
                            OUR WORKFLOW
                        </span>

                        <h2 className="about-section-title">
                            How AgriPredict Works
                        </h2>

                        <p className="about-section-subtitle">
                            From registering a farm to receiving crop
                            recommendations and reviewing soil health,
                            every step helps organize your farming data.
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* Step 1 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    01
                                </div>

                                <div className="workflow-icon">
                                    🚜
                                </div>

                                <h3>Register Your Farm</h3>

                                <p>
                                    Create a farm profile by providing
                                    its name and location coordinates.
                                    Manage multiple registered farms
                                    from your account.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    02
                                </div>

                                <div className="workflow-icon">
                                    🧪
                                </div>

                                <h3>Enter Farm Conditions</h3>

                                <p>
                                    Select a registered farm and provide
                                    nitrogen, phosphorus, potassium and
                                    soil pH values. Review the available
                                    weather information and farm location.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    03
                                </div>

                                <div className="workflow-icon">
                                    🤖
                                </div>

                                <h3>Predict a Suitable Crop</h3>

                                <p>
                                    AgriPredict processes the submitted
                                    conditions through its crop prediction
                                    system and returns a recommended crop
                                    with a confidence score.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <div className="workflow-card">
                                <div className="workflow-number">
                                    04
                                </div>

                                <div className="workflow-icon">
                                    📊
                                </div>

                                <h3>Review Your Insights</h3>

                                <p>
                                    View predictions in your history,
                                    review the soil health score for
                                    individual predictions and check
                                    your dashboard for recent farming
                                    insights.
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

                        <p className="about-section-subtitle">
                            Tools to organize farm information and
                            support crop selection decisions.
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* Crop Recommendation */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🌾
                                </div>

                                <h3>AI Crop Recommendation</h3>

                                <p>
                                    Receive a crop recommendation based
                                    on submitted soil and environmental
                                    parameters, together with the model's
                                    confidence score.
                                </p>
                            </div>
                        </div>

                        {/* Farm Management */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🚜
                                </div>

                                <h3>Multiple Farm Management</h3>

                                <p>
                                    Register and manage multiple farms
                                    under your account, with farm
                                    locations and prediction records
                                    associated with the relevant farm.
                                </p>
                            </div>
                        </div>

                        {/* Weather */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🌦️
                                </div>

                                <h3>Weather Information</h3>

                                <p>
                                    View weather information used to
                                    support crop prediction and understand
                                    environmental conditions relevant
                                    to farming.
                                </p>
                            </div>
                        </div>

                        {/* Soil Health */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    🧪
                                </div>

                                <h3>Indicative Soil Health</h3>

                                <p>
                                    Review a soil health score calculated
                                    from nitrogen, phosphorus, potassium
                                    and pH values, with individual
                                    parameter scores and classifications.
                                    This is an indicative assessment,
                                    not a laboratory soil test.
                                </p>
                            </div>
                        </div>

                        {/* History */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    📊
                                </div>

                                <h3>Prediction History</h3>

                                <p>
                                    Browse previous crop predictions,
                                    filter records by farm and confidence,
                                    and open individual records to review
                                    their crop results, input parameters
                                    and available soil health information.
                                </p>
                            </div>
                        </div>

                        {/* Dashboard */}
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="feature-about-card">
                                <div className="feature-about-icon">
                                    📈
                                </div>

                                <h3>Smart Dashboard</h3>

                                <p>
                                    Track total predictions, your latest
                                    prediction and its associated farm,
                                    indicative soil health and recent
                                    crop prediction activity in one place.
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
                            Technologies powering the AgriPredict
                            application and its crop prediction workflow.
                        </p>
                    </div>

                    <div className="row justify-content-center g-4">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>⚛️</span>
                                <h3>React + Vite</h3>
                                <p>
                                    Interactive frontend application
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🟢</span>
                                <h3>Node.js + Express</h3>
                                <p>
                                    Backend services and REST API
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🍃</span>
                                <h3>MongoDB</h3>
                                <p>
                                    User, farm and prediction data
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className="technology-card">
                                <span>🤖</span>
                                <h3>Machine Learning</h3>
                                <p>
                                    Crop prediction and confidence output
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default About;
