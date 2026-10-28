import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Topbar.css";

function Topbar({ title = "AgriPredict" }) {
const [open, setOpen] = useState(false);
const navigate = useNavigate();

```
const user = JSON.parse(localStorage.getItem("user") || "{}");
const name = user.name || user.username || "User";

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("agripredict_last_prediction");

    setOpen(false);
    navigate("/login", { replace: true });
};

return (
    <header className="topbar">
        <h2 className="topbar-title">{title}</h2>

        <div className="user-menu">
            <button
                className="user-avatar"
                onClick={() => setOpen(!open)}
                aria-label="Open user menu"
            >
                {name.charAt(0).toUpperCase()}
            </button>

            {open && (
                <div className="user-dropdown">
                    <strong>{name}</strong>

                    <Link
                        to="/profile"
                        onClick={() => setOpen(false)}
                    >
                        👤 Profile
                    </Link>

                    <Link
                        to="/settings"
                        onClick={() => setOpen(false)}
                    >
                        ⚙️ Settings
                    </Link>

                    <button onClick={logout}>
                        🚪 Logout
                    </button>
                </div>
            )}
        </div>
    </header>
);
```

}

export default Topbar;
