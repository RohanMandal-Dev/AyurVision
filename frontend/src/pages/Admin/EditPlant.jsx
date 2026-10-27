import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Admin.css";

export default function EditPlant() {
  const navigate = useNavigate();
  const { id } = useParams(); // plant id from URL

  // Check admin login
  const adminData = JSON.parse(localStorage.getItem("admin"));

  if (!adminData) {
    navigate("/admin");
    return null;
  }

  // Form states
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");
  const [uses, setUses] = useState("");
  const [benefits, setBenefits] = useState("");
  const [precautions, setPrecautions] = useState("");
  const [image, setImage] = useState(null);

  // Store old image preview
  const [oldImage, setOldImage] = useState("");

  // Fetch plant details
  async function fetchPlantDetails() {
    const formData = new FormData();
    formData.append("plant_id", id);

    try {
      const response = await fetch(`${BASE_URL}/get-plant.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setPlantName(data.plant.plant_name);
        setScientificName(data.plant.scientific_name);
        setDescription(data.plant.description);
        setUses(data.plant.uses);
        setBenefits(data.plant.benefits);
        setPrecautions(data.plant.precautions);
        setOldImage(data.plant.image);
      } else {
        alert("Plant not found ❌");
      }
    } catch (error) {
      alert("Server error ❌");
    }
  }

  useEffect(() => {
    fetchPlantDetails();
  }, []);

  // Update plant function
  async function handleUpdatePlant(e) {
    e.preventDefault();

    if (plantName === "" || description === "") {
      alert("Plant name and description required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("plant_id", id);
    formData.append("plant_name", plantName);
    formData.append("scientific_name", scientificName);
    formData.append("description", description);
    formData.append("uses", uses);
    formData.append("benefits", benefits);
    formData.append("precautions", precautions);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(`${BASE_URL}/update-plant.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Plant updated successfully ✅");
        navigate("/admin/view-plants");
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
        <h2>Edit Plant 🌿</h2>

        {/* Show Old Image */}
        {oldImage && (
          <img
            className="admin-preview-img"
            src={`http://localhost/ayurvision-backend/uploads/plants/${oldImage}`}
            alt="Plant"
          />
        )}

        <form onSubmit={handleUpdatePlant}>
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
            placeholder="Uses"
            value={uses}
            onChange={(e) => setUses(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Precautions"
            value={precautions}
            onChange={(e) => setPrecautions(e.target.value)}
          ></textarea>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit" className="admin-btn">
            Update Plant
          </button>

          <button
            type="button"
            className="admin-back-btn"
            onClick={() => navigate("/admin/view-plants")}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
}
