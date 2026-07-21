import Hero from "../components/Hero/Hero";
import FeatureCard from "../components/FeatureCard/FeatureCard";

function Home() {

    return (

        <>

            <Hero />

            <section className="container my-5">

                <h2 className="text-center mb-5">
                    Our Features
                </h2>

                <div className="row">

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

        </>

    );

}

export default Home;