import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    email: "",
    phone: "",
    issue_type: "Complaint",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const user = JSON.parse(localStorage.getItem("user"));

    // Admin should not access Contact Us
    if (admin) {
      navigate("/admin/dashboard");
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.id || user.user_id || user.userid || user.ID || "",
        name: user.name || user.username || user.full_name || "",
        email: user.email || "",
      }));
    }
  }, [navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.issue_type ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost/ayurvision-backend/api/contact_submit.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("Your support request has been sent successfully ✅");

        const user = JSON.parse(localStorage.getItem("user"));

        setFormData({
          user_id: user?.id || user?.user_id || user?.userid || user?.ID || "",
          name: user?.name || user?.username || user?.full_name || "",
          email: user?.email || "",
          phone: "",
          issue_type: "Complaint",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          if (user) {
            navigate("/my-support");
          } else {
            navigate("/");
          }
        }, 1200);
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Contact Support</h1>
          <p style={styles.subText}>
            Have a complaint, question, or forgot your password? Send us a
            message.
          </p>

          {successMsg && <div style={styles.successBox}>{successMsg}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="issue_type"
              value={formData.issue_type}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Complaint">Complaint</option>
              <option value="Forgot Password">Forgot Password</option>
              <option value="Plant Identification Problem">
                Plant Identification Problem
              </option>
              <option value="Account Issue">Account Issue</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4fff4",
    padding: "40px 15px 60px",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  heading: {
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: "10px",
    fontSize: "2.4rem",
  },
  subText: {
    textAlign: "center",
    color: "#555",
    marginBottom: "25px",
    fontSize: "1.1rem",
  },
  successBox: {
    background: "#e8f5e9",
    color: "#1b5e20",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #a5d6a7",
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "16px",
    minHeight: "150px",
    resize: "vertical",
    outline: "none",
  },
  button: {
    background: "#2e7d32",
    color: "#fff",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};