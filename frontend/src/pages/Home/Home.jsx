import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-left">
          <h1>
            AyurVision <span>🌿</span>
          </h1>

          <h2>AI Powered Ayurvedic Plant Identifier</h2>

          <p>
            Upload a plant photo and instantly get plant name, Ayurvedic uses,
            medicinal benefits and precautions.
          </p>

          <div className="hero-buttons">
            <button
              className="btn primary"
              onClick={() => navigate("/identify")}
            >
              Upload Plant Image
            </button>

            <button
              className="btn secondary"
              onClick={() => navigate("/library")}
            >
              Explore Library
            </button>
          </div>

          <div className="hero-mini-info">
            <span>⚡ Fast</span>
            <span>🌱 Accurate</span>
            <span>📖 Ayurveda Based</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="scanner-box">
              <img
                src="https://images.pexels.com/photos/4505169/pexels-photo-4505169.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Plant"
              />
              <div className="scan-line"></div>
            </div>

            <p className="scanner-text">AI Scanner Active...</p>
          </div>
        </div>
      </section>

      {/* ONLY 2 FEATURES */}
      <section className="features">
        <h2 className="section-title">Key Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🤖 AI Plant Identification</h3>
            <p>
              Upload plant photo and our AI will identify the herb with
              confidence.
            </p>
          </div>

          <div className="feature-card">
            <h3>🌿 Ayurvedic Uses & Remedies</h3>
            <p>
              Get medicinal uses, benefits, remedies and precautions in one
              place.
            </p>
          </div>
        </div>
      </section>

  {/* POPULAR HERBS */}
<section className="popular">
  <h2 className="section-title">Popular Herbs</h2>

  <div className="popular-grid">

    {/* Tulsi */}
    <div className="herb-card">
      <img
        src="/db_images/tulsi.webp"
        alt="Tulsi"
      />
      <h3>Tulsi</h3>
      <p>Boosts immunity and reduces stress.</p>
    </div>

    {/* Neem */}
    <div className="herb-card">
      <img
        src="/db_images/neem.jpg"
        alt="Neem"
      />
      <h3>Neem</h3>
      <p>Detoxifies blood and improves skin.</p>
    </div>

    {/* Aloe Vera */}
    <div className="herb-card">
      <img
        src="/db_images/alovera.jfif"
        alt="Aloe Vera"
      />
      <h3>Aloe Vera</h3>
      <p>Best for skin healing and digestion.</p>
    </div>

    {/* Ashwagandha */}
    <div className="herb-card">
      <img
        src="/db_images/ashwagandha.jpg"
        alt="Ashwagandha"
      />
      <h3>Ashwagandha</h3>
      <p>Improves strength and reduces anxiety.</p>
    </div>

  </div>
</section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Identifying Plants Now 🌱</h2>
        <p>Upload a plant image and get Ayurvedic details instantly.</p>

        <button className="btn primary" onClick={() => navigate("/identify")}>
          Start Now
        </button>
      </section>
    </div>
  );
}
