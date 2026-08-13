import { Link } from "react-router-dom";
function Hero() {
    return (

        <section className="container text-center py-5">

            <h1 className="display-4 fw-bold">

                Smart Farming Starts with Smart Decisions

            </h1>

            <p className="lead mt-3">

                AgriPredict AI helps farmers analyze crops,
                weather, irrigation and soil health using AI.

            </p>

            <div className="mt-4">

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

        </section>

    );
}

export default Hero;