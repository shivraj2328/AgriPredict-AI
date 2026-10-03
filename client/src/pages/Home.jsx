import Hero from "../components/Hero/Hero";
import FeatureCard from "../components/FeatureCard/FeatureCard";
import "../styles/home.css";

function Home() {
    return (
        <div className="home-page">

            <section className="home-main-section">

                <Hero />

                <section className="container home-features">

                    <h2 className="text-center">
                        Our Features
                    </h2>

                    <div className="row g-3">

                        <FeatureCard
                            title="Crop Recommendation"
                            description="AI recommends the best crop."
                        />

                        <FeatureCard
                            title="Weather Information"
                            description="Live weather updates."
                        />

                        <FeatureCard
                            title="Soil Health"
                            description="Analyze soil quality."
                        />

                        <FeatureCard
                            title="Irrigation"
                            description="Smart irrigation advice."
                        />

                        <FeatureCard
                            title="Dashboard"
                            description="View all analytics."
                        />

                        <FeatureCard
                            title="Prediction History"
                            description="Access previous predictions."
                        />

                    </div>

                </section>

            </section>

        </div>
    );
}

export default Home;