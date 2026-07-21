function FeatureCard(props) {

    return (

        <div className="col-md-4 mb-4">

            <div className="card h-100 shadow-sm">

                <div className="card-body">

                    <h4>

                        {props.title}

                    </h4>

                    <p>

                        {props.description}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default FeatureCard;