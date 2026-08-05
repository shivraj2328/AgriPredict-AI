import "./ConfidenceMeter.css";

function ConfidenceMeter({ value }) {

    let color = "bg-danger";

    if (value >= 80) {

        color = "bg-success";

    }

    else if (value >= 50) {

        color = "bg-warning";

    }

    return (

        <>

            <h6>

                Confidence

            </h6>

            <div className="progress">

                <div

                    className={`progress-bar ${color}`}

                    style={{ width: `${value}%` }}

                >

                    {value}%

                </div>

            </div>

        </>

    );

}

export default ConfidenceMeter;