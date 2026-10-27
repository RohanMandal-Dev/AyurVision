import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminDashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    } else {
      navigate("/admin");
    }
  }, [navigate]);

  function handleAdminLogout() {
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
    alert("Admin logged out ✅");
    navigate("/admin");
  }

  if (!adminData) {
    return <h2 style={{ textAlign: "center" }}>Loading Admin Dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-box">
        <h1>Admin Dashboard ⚙</h1>

        <p className="admin-welcome">
          Welcome, <b>{adminData.name}</b>
        </p>

        <div className="admin-dashboard-buttons">
          <button
            className="admin-action-btn"
            onClick={() => navigate("/admin/add-plant")}
          >
            ➕ Add Plant
          </button>

          <button
            className="admin-action-btn"
            onClick={() => navigate("/admin/view-plants")}
          >
            🌿 View Plants
          </button>

          <button
            className="admin-action-btn"
            onClick={() => navigate("/admin/manage-users")}
          >
            👤 Manage Users
          </button>

          <button className="admin-action-btn logout" onClick={handleAdminLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}