import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Admin.css";

export default function AddPlant() {
  const navigate = useNavigate();

  // Form state variables
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  const [uses, setUses] = useState("");
  const [benefits, setBenefits] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [image, setImage] = useState(null);

  // Check if admin logged in
  const adminData = JSON.parse(localStorage.getItem("admin"));

  if (!adminData) {
    navigate("/admin");
    return null;
  }

  // Handle plant form submit
  async function handleAddPlant(e) {
    e.preventDefault();

    // Basic validation
    if (plantName === "" || description === "") {
      alert("Plant name and description required ❌");
      return;
    }

    // Create FormData for sending to PHP
    const formData = new FormData();
    formData.append("plant_name", plantName);
    formData.append("scientific_name", scientificName);
    formData.append("description", description);
    formData.append("uses", uses);
    formData.append("benefits", benefits);
    formData.append("precautions", precautions);

    // Add image if selected
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${BASE_URL}/add-plant.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Plant added successfully ✅");
        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error ❌");
    }
  }

  return (
    <div className="admin-form-page">
      <div className="admin-form-box">
        <h2>Add Ayurvedic Plant 🌿</h2>

        <form onSubmit={handleAddPlant}>
          <input
            type="text"
            placeholder="Plant Name"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Scientific Name"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
          />

          <textarea
            placeholder="Plant Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Uses (comma separated)"
            value={uses}
            onChange={(e) => setUses(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Benefits (comma separated)"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Precautions (comma separated)"
            value={precautions}
            onChange={(e) => setPrecautions(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="admin-btn">
            Add Plant
          </button>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
