import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Auth.css";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    if (email === "" || password === "") {
      alert("Please fill all fields ❌");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${BASE_URL}/login.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Login Successful ✅");

        // Clear old sessions first
        localStorage.removeItem("user");
        localStorage.removeItem("admin");

        // If admin logs in from normal login page
        if (data.user?.role === "admin") {
          localStorage.setItem("admin", JSON.stringify(data.user));
          setIsLoggedIn(true);
          navigate("/admin/dashboard");
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          setIsLoggedIn(true);
          navigate("/library");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <p className="auth-subtitle">Welcome back to AyurVision 🌿</p>

        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}