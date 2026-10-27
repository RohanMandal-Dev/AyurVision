import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Admin.css";

export default function AdminLogin({ setIsLoggedIn }) {
  // Store admin email
  const [email, setEmail] = useState("");

  // Store admin password
  const [password, setPassword] = useState("");

  // Navigation
  const navigate = useNavigate();

  // Admin login function
  async function handleAdminLogin() {
    // Check empty fields
    if (email === "" || password === "") {
      alert("Please fill all fields ❌");
      return;
    }

    // FormData for PHP backend
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      // Call admin-login.php API
      const response = await fetch(`${BASE_URL}/admin-login.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      // If login success
      if (data.status === "success") {
        alert("Admin Login Successful ✅");

        // Save admin details in localStorage
        localStorage.setItem("admin", JSON.stringify(data.admin));

        // Update app login state
        setIsLoggedIn(true);

        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-box">
        <h2>Admin Login 🔑</h2>
        <p className="admin-subtitle">Login to manage AyurVision data</p>

        <input
          type="text"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-btn" onClick={handleAdminLogin}>
          Login as Admin
        </button>
      </div>
    </div>
  );
}