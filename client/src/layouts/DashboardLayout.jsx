import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Topbar from "../components/Dashboard/Topbar/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Topbar />

        <main className="container-fluid p-4">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;