import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../../../utils/auth";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="bg-success text-white p-3 vh-100">

      <h3 className="mb-4">
        AgriPredict
      </h3>

      <nav className="nav flex-column">

        <NavLink to="/dashboard" className="nav-link text-white">
          Dashboard
        </NavLink>

        <NavLink to="/prediction" className="nav-link text-white">
          Crop Prediction
        </NavLink>

        <NavLink to="/history" className="nav-link text-white">
          Prediction History
        </NavLink>

        <NavLink to="/profile" className="nav-link text-white">
          Profile
        </NavLink>

        <NavLink to="#" className="nav-link text-white">
          Settings
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="nav-link text-white text-start border-0 bg-transparent"
        >
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;