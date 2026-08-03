import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/Dashboard/StatCard/StatCard";
import WeatherWidget from "../components/Dashboard/WeatherWidget/WeatherWidget";
import RecentPredictions from "../components/Dashboard/RecentPredictions/RecentPredictions";
import QuickPrediction from "../components/Dashboard/QuickPrediction/QuickPrediction";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h2>Welcome, Shivraj!</h2>
        <p>Here's an overview of your farming dashboard.</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatCard title="Total Predictions" value="156" icon="🌱" color="success" />
        </div>
        <div className="col-md-3">
          <StatCard title="Soil Health" value="87%" icon="🧪" color="primary" />
        </div>
        <div className="col-md-3">
          <StatCard title="Recommended Crops" value="22" icon="🌾" color="warning" />
        </div>
        <div className="col-md-3">
          <StatCard title="Weather Status" value="Sunny" icon="☀️" color="info" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <WeatherWidget />
        </div>

        <div className="col-lg-8">
          <RecentPredictions />
        </div>
      </div>

      <div className="mt-4">
        <QuickPrediction />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;