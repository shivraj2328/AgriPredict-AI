const predictions = [
  { date: "27 Jul", crop: "Rice", confidence: "96%" },
  { date: "26 Jul", crop: "Cotton", confidence: "91%" },
  { date: "25 Jul", crop: "Wheat", confidence: "94%" },
];

function RecentPredictions() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h4>Recent Predictions</h4>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Crop</th>
              <th>Confidence</th>
            </tr>
          </thead>

          <tbody>
            {predictions.map((prediction, index) => (
              <tr key={index}>
                <td>{prediction.date}</td>
                <td>{prediction.crop}</td>
                <td>{prediction.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentPredictions;