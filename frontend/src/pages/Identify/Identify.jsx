import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Identify.css";

export default function Identify() {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file ❌");
      return;
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleIdentifyPlant() {
    if (!imageFile) {
      alert("Please upload a plant image first ❌");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${BASE_URL}/identify.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("identifyResult", JSON.stringify(data));
        navigate("/result");
      } else {
        alert(data.message || "Plant not identified ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="identify-page">
      <div className="identify-box">
        <h2>Plant Identifier 🌿</h2>
        <p className="identify-subtitle">
          Upload plant image and identify instantly
        </p>

        <label className="custom-upload-btn">
          {loading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>

        {imageFile && <p className="file-name">📌 {imageFile.name}</p>}

        {preview && (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            {loading && <div className="scanner-line"></div>}
          </div>
        )}

        <button
          className="identify-btn"
          onClick={handleIdentifyPlant}
          disabled={loading}
        >
          {loading ? "Identifying... 🌿" : "Identify Plant"}
        </button>
      </div>
    </div>
  );
}