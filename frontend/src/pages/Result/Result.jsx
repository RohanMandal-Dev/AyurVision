import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Result.css";

export default function Result() {
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("identifyResult");

    if (storedResult) {
      setResultData(JSON.parse(storedResult));
    } else {
      alert("No result found ❌ Please identify plant again.");
      navigate("/identify");
    }
  }, [navigate]);

  async function handleSaveToLibrary() {
    const userData = JSON.parse(localStorage.getItem("user"));
    const adminData = JSON.parse(localStorage.getItem("admin"));

    const currentUser = userData || adminData;

    if (!currentUser) {
      alert("Please login first to save plants in your library 🌿");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", currentUser.id);

    if (resultData.uploaded_image) {
      formData.append("uploaded_image", resultData.uploaded_image);
    }

    if (resultData.plant && resultData.plant.id) {
      formData.append("plant_id", resultData.plant.id);
    } else {
      formData.append(
        "plant_name",
        resultData.plant?.plant_name ||
          resultData.api_data?.plant_name ||
          "Unknown Plant"
      );
      formData.append(
        "scientific_name",
        resultData.plant?.scientific_name ||
          resultData.api_data?.scientific_name ||
          "Not available"
      );
      formData.append(
        "description",
        resultData.plant?.description ||
          resultData.api_data?.wiki_description ||
          "No description available"
      );
      formData.append("uses", resultData.plant?.uses || "Not available");
      formData.append("benefits", resultData.plant?.benefits || "Not available");
      formData.append(
        "precautions",
        resultData.plant?.precautions || "Not available"
      );
    }

    try {
      const response = await fetch(`${BASE_URL}/save-plant.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Plant saved to your library successfully ✅");
      } else {
        alert(data.message || "Failed to save plant ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  }

  if (!resultData) {
    return <h2 style={{ textAlign: "center" }}>Loading Result...</h2>;
  }

  const plantName =
    resultData.plant?.plant_name ||
    resultData.api_data?.plant_name ||
    "Unknown Plant";

  const scientificName =
    resultData.plant?.scientific_name ||
    resultData.api_data?.scientific_name ||
    "Not available";

  const description =
    resultData.plant?.description ||
    resultData.api_data?.wiki_description ||
    "No description available";

  const uses = resultData.plant?.uses || "Not available";
  const benefits = resultData.plant?.benefits || "Not available";
  const precautions = resultData.plant?.precautions || "Not available";

  const trefleData = resultData.trefle_data;

  // Smart checks to avoid repeated info
  const normalizedPlantName = plantName.trim().toLowerCase();
  const normalizedScientificName = scientificName.trim().toLowerCase();

  const additionalCommonName =
    trefleData?.common_name &&
    trefleData.common_name.trim().toLowerCase() !== normalizedPlantName
      ? trefleData.common_name
      : null;

  const additionalScientificName =
    trefleData?.scientific_name &&
    trefleData.scientific_name.trim().toLowerCase() !== normalizedScientificName
      ? trefleData.scientific_name
      : null;

  const additionalFamily =
    trefleData?.family && trefleData.family !== "N/A" ? trefleData.family : null;

  const additionalAuthor =
    trefleData?.author && trefleData.author !== "N/A" ? trefleData.author : null;

  const additionalYear =
    trefleData?.year && trefleData.year !== "N/A" ? trefleData.year : null;

  const additionalBibliography =
    trefleData?.bibliography && trefleData.bibliography !== "N/A"
      ? trefleData.bibliography
      : null;

  const additionalImage =
    trefleData?.image_url && trefleData.image_url !== "" ? trefleData.image_url : null;

  const hasAdditionalInfo =
    additionalCommonName ||
    additionalScientificName ||
    additionalFamily ||
    additionalAuthor ||
    additionalYear ||
    additionalBibliography ||
    additionalImage;

  return (
    <div className="result-page">
      <div className="result-box">
        <h2>Plant Result 🌿</h2>

        {resultData.uploaded_image && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <img
              src={`http://localhost/ayurvision-backend/${resultData.uploaded_image}`}
              alt="Uploaded Plant"
              style={{
                maxWidth: "280px",
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {resultData.probability && (
          <p className="result-prob">
            Confidence: <b>{Number(resultData.probability).toFixed(2)}%</b>
          </p>
        )}

        <h3 className="result-name">{plantName}</h3>

        <p>
          <b>Scientific Name:</b> {scientificName}
        </p>

        <p>
          <b>Description:</b> {description}
        </p>

        <p>
          <b>Uses:</b> {uses}
        </p>

        <p>
          <b>Benefits:</b> {benefits}
        </p>

        <p>
          <b>Precautions:</b> {precautions}
        </p>

        {hasAdditionalInfo && (
          <div
            style={{
              marginTop: "20px",
              padding: "16px",
              borderRadius: "12px",
              background: "#f3fff5",
              border: "1px solid #d4f0d8",
            }}
          >
            <h3 style={{ marginBottom: "12px", color: "#2e7d32" }}>
              Additional Information 🌍
            </h3>

            {additionalCommonName && (
              <p>
                <b>Common Name:</b> {additionalCommonName}
              </p>
            )}

            {additionalScientificName && (
              <p>
                <b>Scientific Name:</b> {additionalScientificName}
              </p>
            )}

            {additionalFamily && (
              <p>
                <b>Family:</b> {additionalFamily}
              </p>
            )}

            {additionalAuthor && (
              <p>
                <b>Author:</b> {additionalAuthor}
              </p>
            )}

            {additionalYear && (
              <p>
                <b>Year:</b> {additionalYear}
              </p>
            )}

            {additionalBibliography && (
              <p>
                <b>Bibliography:</b> {additionalBibliography}
              </p>
            )}

            {additionalImage && (
              <div style={{ textAlign: "center", marginTop: "15px" }}>
                <img
                  src={additionalImage}
                  alt="Additional Plant"
                  style={{
                    maxWidth: "220px",
                    width: "100%",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="result-btn-row">
          <button className="save-btn" onClick={handleSaveToLibrary}>
            Save to Library 📚
          </button>

          <button className="back-btn" onClick={() => navigate("/identify")}>
            Identify Another Plant
          </button>
        </div>
      </div>
    </div>
  );
}