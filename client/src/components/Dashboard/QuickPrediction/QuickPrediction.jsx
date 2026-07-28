function QuickPrediction() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4>Quick Prediction</h4>

        <p>
          Start a new crop prediction using soil and weather data.
        </p>

        <button className="btn btn-success">
          Start Prediction
        </button>
      </div>
    </div>
  );
}

export default QuickPrediction;