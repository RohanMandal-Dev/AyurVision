import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-box">
        <h1>About AyurVision 🌿</h1>
        <p className="about-subtitle">
          AyurVision is an AI-powered Ayurvedic Plant Identifier that helps
          users detect medicinal plants and learn their Ayurvedic benefits.
        </p>

        {/* What is this project */}
        <div className="about-section">
          <h2>📌 What is AyurVision?</h2>
          <p>
            AyurVision is a web-based application that allows users to upload a
            plant image. The system identifies the plant and provides Ayurvedic
            information such as medicinal uses, benefits, and precautions.
          </p>
        </div>

        {/* How it works */}
        <div className="about-section">
          <h2>⚙ How It Works?</h2>
          <ul>
            <li>📤 User uploads a plant image.</li>
            <li>🤖 AI model processes the image and detects the plant.</li>
            <li>📖 System shows plant details, uses, and remedies.</li>
            <li>💾 User can save identified plants in Library.</li>
          </ul>
        </div>

        {/* Features */}
        <div className="about-section">
          <h2>✨ Key Features</h2>
          <ul>
            <li>🌱 AI-based plant identification</li>
            <li>📚 Ayurvedic plant library (saved plants)</li>
            <li>🔍 Easy and fast search system</li>
            <li>⚠ Precautions and health warnings</li>
            <li>📱 Mobile and Desktop friendly UI</li>
          </ul>
        </div>

        {/* Technology used */}
        <div className="about-section">
          <h2>🛠 Technology Used</h2>
          <ul>
            <li>Frontend: React.js + CSS</li>
            <li>Backend (Future): PHP / Node.js</li>
            <li>Database (Future): MySQL</li>
            <li>AI (Future): Machine Learning Model / API</li>
          </ul>
        </div>

        {/* Future Scope */}
        <div className="about-section">
          <h2>🚀 Future Scope</h2>
          <p>
            In future, AyurVision can include multi-language support, more
            accurate AI model, Ayurvedic doctor consultation, and real-time
            herbal medicine suggestions.
          </p>
        </div>
      </div>
    </div>
  );
}
