import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./Admin.css";

export default function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");

    if (!adminData) {
      alert("Please login as admin first ❌");
      navigate("/admin");
      return;
    }

    fetchUsers();
  }, [navigate]);

  async function fetchUsers() {
    try {
      const response = await fetch(`${BASE_URL}/get-users.php`);
      const data = await response.json();

      if (data.status === "success") {
        setUsers(data.users);
      } else {
        alert(data.message || "Failed to load users ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error while loading users ❌");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields ❌");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${BASE_URL}/add-user.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("User added successfully ✅");
        setName("");
        setEmail("");
        setPassword("");
        fetchUsers();
      } else {
        alert(data.message || "Failed to add user ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error while adding user ❌");
    }
  }

  async function handleDeleteUser(userId, userName) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );

    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append("user_id", userId);

    try {
      const response = await fetch(`${BASE_URL}/delete-user.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("User deleted successfully ✅");
        fetchUsers();
      } else {
        alert(data.message || "Failed to delete user ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server error while deleting user ❌");
    }
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-box" style={{ maxWidth: "1000px" }}>
        <h1>Manage Users 👤</h1>

        {/* Add User Form */}
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Add New User ➕</h3>

          <form onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <button className="admin-action-btn" type="submit">
              Add User
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div
          style={{
            marginTop: "20px",
            overflowX: "auto",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>All Registered Users 📋</h3>

          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr style={{ background: "#1b5e20", color: "#fff" }}>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>ID</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Email</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Role</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Created At</th>
                  <th style={{ padding: "12px", border: "1px solid #ddd" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.id}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.name}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.role}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {user.created_at}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      <button
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        style={{
                          background: "#d32f2f",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: "25px" }}>
          <button
            className="admin-action-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            ⬅ Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}