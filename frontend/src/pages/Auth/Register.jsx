import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Auth.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister() {
    if (name === "" || email === "" || password === "") {
      alert("Please fill all fields ❌");
      return;
    }

    // Create form data for sending to PHP
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${BASE_URL}/register.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Registration Successful ✅ Now login!");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error ❌");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Register</h2>
        <p className="auth-subtitle">Create your AyurVision account 🌿</p>

        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
