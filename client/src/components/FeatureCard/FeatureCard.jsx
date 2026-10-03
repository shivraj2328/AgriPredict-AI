function FeatureCard({ title, description }) {

    const icons = {
        "Crop Recommendation": "🌱",
        "Weather Information": "☁️",
        "Soil Health": "🌿",
        "Irrigation": "💧",
        "Dashboard": "📊",
        "Prediction History": "🕘"
    };

    return (
        <div className="col-md-4">

            <div className="card h-100 shadow-sm feature-card">

                <div className="card-body d-flex align-items-center gap-3">

                    <div className="feature-icon">
                        {icons[title]}
                    </div>

                    <div>
                        <h4>{title}</h4>

                        <p>{description}</p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default FeatureCard;