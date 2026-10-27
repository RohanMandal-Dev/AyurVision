import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("identifyResult");

    setIsLoggedIn(false);
    alert("Logged out successfully ✅");

    // Better redirect based on role
    if (admin) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">
          <span className="leaf">🌿</span>
          <h2>AyurVision</h2>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/identify">Identify</Link>
          <Link to="/library">Library</Link>
          <Link to="/about">About</Link>

          {/* Contact Us only for guest + normal user */}
          {!admin && <Link to="/contact">Contact Us</Link>}

          {/* My Support only for normal logged-in user */}
          {user && !admin && <Link to="/my-support">My Support</Link>}

          {/* Admin only links */}
          {admin && <Link to="/admin/dashboard">Dashboard</Link>}
          {admin && <Link to="/admin/messages">Messages</Link>}
        </div>

        <div className="nav-auth">
          {!isLoggedIn ? (
            <>
              <Link className="login-btn" to="/login">
                Login
              </Link>

              <Link className="register-btn" to="/register">
                Register
              </Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}