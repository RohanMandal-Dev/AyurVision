import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Library.css";

export default function Library() {
  const navigate = useNavigate();
  const detailRef = useRef(null);

  const [savedPlants, setSavedPlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isSavedView, setIsSavedView] = useState(false);

  const userData = JSON.parse(localStorage.getItem("user"));
  const adminData = JSON.parse(localStorage.getItem("admin"));
  const currentUser = userData || adminData;

  useEffect(() => {
    if (!currentUser) {
      alert("Please login first to access your library 🌿");
      navigate("/login");
      return;
    }

    fetchSavedPlants();
    fetchAllPlants();
  }, [navigate]);

  useEffect(() => {
    if (selectedPlant && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedPlant]);

  async function fetchSavedPlants() {
    if (!currentUser) return;

    setLoadingSaved(true);

    const formData = new FormData();
    formData.append("user_id", currentUser.id);

    try {
      const response = await fetch(`${BASE_URL}/get-library.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setSavedPlants(data.plants);
      } else {
        setSavedPlants([]);
      }
    } catch (error) {
      console.log(error);
      alert("Server error while loading saved plants ❌");
    } finally {
      setLoadingSaved(false);
    }
  }

  async function fetchAllPlants() {
    setLoadingAll(true);

    try {
      const response = await fetch(`${BASE_URL}/get-all-plants.php`);
      const data = await response.json();

      if (data.status === "success") {
        setAllPlants(data.plants);
      } else {
        setAllPlants([]);
      }
    } catch (error) {
      console.log(error);
      alert("Server error while loading database plants ❌");
    } finally {
      setLoadingAll(false);
    }
  }

  async function handleRemovePlant(savedId) {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this plant from your library?"
    );

    if (!confirmRemove) return;

    const formData = new FormData();
    formData.append("saved_id", savedId);

    try {
      const response = await fetch(`${BASE_URL}/delete-library.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Removed from Library ✅");

        const updatedSaved = savedPlants.filter((p) => p.saved_id !== savedId);
        setSavedPlants(updatedSaved);

        if (selectedPlant && selectedPlant.saved_id === savedId) {
          setSelectedPlant(null);
        }
      } else {
        alert(data.message || "Failed to remove plant ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  }

  function getPlantImage(plant) {
    // First priority = user uploaded identify image
    if (plant.uploaded_image) {
      return `http://localhost/ayurvision-backend/${plant.uploaded_image}`;
    }

    // Second priority = database plant image
    if (plant.image) {
      return `http://localhost/ayurvision-backend/uploads/plants/${plant.image}`;
    }

    return null;
  }

  const filteredSavedPlants = savedPlants.filter((plant) =>
    (plant.plant_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const filteredAllPlants = allPlants.filter((plant) =>
    (plant.plant_name || "").toLowerCase().includes(search.toLowerCase())
  );

  if (!currentUser) return null;

  return (
    <div className="library-page">
      <div className="library-box">
        <h2>AyurVision Library 📚</h2>
        <p className="library-subtitle">
          Explore all Ayurvedic plants and your saved plants 🌿
        </p>

        <input
          type="text"
          className="library-search"
          placeholder="Search plant name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* MY SAVED PLANTS */}
        <h3 style={{ marginTop: "25px" }}>📌 My Saved Plants</h3>

        {loadingSaved ? (
          <p className="library-loading">Loading your saved plants... 🌿</p>
        ) : filteredSavedPlants.length === 0 ? (
          <p className="library-loading">No saved plants yet ❌</p>
        ) : (
          <div className="library-grid">
            {filteredSavedPlants.map((plant) => {
              const imageUrl = getPlantImage(plant);

              return (
                <div className="library-card" key={plant.saved_id}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={plant.plant_name} />
                  ) : (
                    <div className="library-no-image">No Image</div>
                  )}

                  <div className="library-card-content">
                    <h3>{plant.plant_name}</h3>
                    <p className="library-scientific">
                      {plant.scientific_name || "Scientific name not added"}
                    </p>

                    <div className="library-btn-row">
                      <button
                        className="library-view-btn"
                        onClick={() => {
                          setSelectedPlant(plant);
                          setIsSavedView(true);
                        }}
                      >
                        View 👁
                      </button>

                      <button
                        className="library-remove-btn"
                        onClick={() => handleRemovePlant(plant.saved_id)}
                      >
                        Remove ❌
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ALL DATABASE PLANTS */}
        <h3 style={{ marginTop: "35px" }}>🌿 AyurVision Plant Database</h3>

        {loadingAll ? (
          <p className="library-loading">Loading database plants... 🌿</p>
        ) : filteredAllPlants.length === 0 ? (
          <p className="library-loading">No plants found in database ❌</p>
        ) : (
          <div className="library-grid">
            {filteredAllPlants.map((plant) => {
              const imageUrl = getPlantImage(plant);

              return (
                <div className="library-card" key={plant.id}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={plant.plant_name} />
                  ) : (
                    <div className="library-no-image">No Image</div>
                  )}

                  <div className="library-card-content">
                    <h3>{plant.plant_name}</h3>
                    <p className="library-scientific">
                      {plant.scientific_name || "Scientific name not added"}
                    </p>

                    <div className="library-btn-row">
                      <button
                        className="library-view-btn"
                        onClick={() => {
                          setSelectedPlant(plant);
                          setIsSavedView(false);
                        }}
                      >
                        View 👁
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FULL VIEW */}
        {selectedPlant && (
          <div className="library-view-box" ref={detailRef}>
            <h2>{selectedPlant.plant_name} 🌿</h2>

            {getPlantImage(selectedPlant) && (
              <img
                className="library-view-image"
                src={getPlantImage(selectedPlant)}
                alt={selectedPlant.plant_name}
              />
            )}

            <p>
              <b>Scientific Name:</b>{" "}
              {selectedPlant.scientific_name || "Not added"}
            </p>

            <p>
              <b>Description:</b> {selectedPlant.description || "Not added"}
            </p>

            <p>
              <b>Uses:</b> {selectedPlant.uses || "Not added"}
            </p>

            <p>
              <b>Benefits:</b> {selectedPlant.benefits || "Not added"}
            </p>

            <p>
              <b>Precautions:</b> {selectedPlant.precautions || "Not added"}
            </p>

            {isSavedView && (
              <button
                className="library-remove-btn"
                style={{ marginRight: "10px" }}
                onClick={() => handleRemovePlant(selectedPlant.saved_id)}
              >
                Remove from Saved ❌
              </button>
            )}

            <button
              className="library-back-btn"
              onClick={() => setSelectedPlant(null)}
            >
              ⬅ Back to Library
            </button>
          </div>
        )}
      </div>
    </div>
  );
}