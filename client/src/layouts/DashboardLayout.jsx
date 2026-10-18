import { useLocation } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Topbar from "../components/Dashboard/Topbar/Topbar";

function DashboardLayout({ children }) {
    const { pathname } = useLocation();

    const pageTitles = {
        "/dashboard": "Dashboard",
        "/prediction": "🌱 Crop Prediction",
        "/history": "Prediction History",
        "/profile": "My Profile",
        "/settings": "Settings"
    };

    const title = pageTitles[pathname] || "AgriPredict";

   return (
    <div className="dashboard-layout">
        <Sidebar />

        <div className="dashboard-main">
            <Topbar title={title} />

            <main className="container-fluid dashboard-content">
                {children}
            </main>
        </div>
    </div>
);
}

export default DashboardLayout;