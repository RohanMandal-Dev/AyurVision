import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Admin.css";

export default function ViewPlants() {
  const navigate = useNavigate();

  // Store plants list
  const [plants, setPlants] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Search state
  const [search, setSearch] = useState("");

  // Check admin login
  const adminData = JSON.parse(localStorage.getItem("admin"));

  // Redirect if admin not logged in
  useEffect(() => {
    if (!adminData) {
      navigate("/admin");
    }
  }, [adminData, navigate]);

  // Fetch plants from backend
  async function fetchPlants() {
    try {
      const response = await fetch(`${BASE_URL}/get-plants.php`);
      const data = await response.json();

      if (data.status === "success") {
        setPlants(data.plants);
      } else {
        alert("Failed to fetch plants ❌");
      }
    } catch (error) {
      alert("Server error ❌");
    }

    setLoading(false);
  }

  // Run fetchPlants when page loads
  useEffect(() => {
    if (adminData) {
      fetchPlants();
    }
  }, []);

  // Delete plant function
  async function handleDeletePlant(plantId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plant?"
    );

    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("plant_id", plantId);

    try {
      const response = await fetch(`${BASE_URL}/delete-plant.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Plant deleted successfully ✅");

        // Remove plant from UI without reloading
        setPlants(plants.filter((p) => p.id !== plantId));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌ Check console");
    }
  }

  // Filter plants by search
  const filteredPlants = plants.filter((plant) =>
    plant.plant_name.toLowerCase().includes(search.toLowerCase())
  );

  if (!adminData) return null;

  return (
    <div className="admin-view-page">
      <div className="admin-view-box">
        <h2>All Ayurvedic Plants 🌿</h2>

        <button
          className="admin-back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>

        {/* Search Bar */}
        <input
          type="text"
          className="admin-search-input"
          placeholder="Search plant by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Loading */}
        {loading ? (
          <p className="admin-loading">Loading plants... 🌿</p>
        ) : filteredPlants.length === 0 ? (
          <p className="admin-loading">No plants found ❌</p>
        ) : (
          <div className="admin-plant-grid">
            {filteredPlants.map((plant) => (
              <div className="admin-plant-card" key={plant.id}>
                {/* Plant Image */}
                {plant.image ? (
                  <img
                    src={`http://localhost/ayurvision-backend/uploads/plants/${plant.image}`}
                    alt={plant.plant_name}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}

                {/* Plant Info */}
                <div className="admin-plant-info">
                  <h3>{plant.plant_name}</h3>

                  <p>
                    <b>Scientific:</b>{" "}
                    {plant.scientific_name || "Not Added"}
                  </p>

                  <p className="admin-desc">
                    {plant.description
                      ? `${plant.description.substring(0, 80)}...`
                      : "No description available"}
                  </p>

                  <button
                    className="admin-edit-btn"
                    onClick={() => navigate(`/admin/edit-plant/${plant.id}`)}
                  >
                    Edit ✏
                  </button>

                  {/* Delete button */}
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDeletePlant(plant.id)}
                  >
                    Delete ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}