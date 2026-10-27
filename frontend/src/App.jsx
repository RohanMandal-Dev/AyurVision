import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Identify from "./pages/Identify/Identify";
import Library from "./pages/Library/Library";
import Result from "./pages/Result/Result";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import About from "./pages/About/About";

// SUPPORT SYSTEM IMPORTS
import ContactUs from "./pages/Contact/ContactUs";
import MySupport from "./pages/Support/MySupport";
import AdminMessages from "./pages/Admin/AdminMessages";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddPlant from "./pages/Admin/AddPlant";
import ViewPlants from "./pages/Admin/ViewPlants";
import EditPlant from "./pages/Admin/EditPlant";
import ManageUsers from "./pages/Admin/ManageUsers";
import AdminLogin from "./pages/Admin/AdminLogin";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    function checkLogin() {
      const userData = localStorage.getItem("user");
      const adminData = localStorage.getItem("admin");

      if (userData || adminData) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/result" element={<Result />} />
          <Route path="/library" element={<Library />} />

          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          {/* USER / GUEST SUPPORT ROUTE */}
          <Route path="/contact" element={<ContactUs />} />

          {/* USER SUPPORT HISTORY ROUTE */}
          <Route path="/my-support" element={<MySupport />} />

          <Route
            path="/admin"
            element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
          />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/admin/add-plant" element={<AddPlant />} />
          <Route path="/admin/view-plants" element={<ViewPlants />} />
          <Route path="/admin/edit-plant/:id" element={<EditPlant />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />

          {/* ADMIN SUPPORT INBOX */}
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}