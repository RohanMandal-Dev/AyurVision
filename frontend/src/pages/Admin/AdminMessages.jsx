import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyInputs, setReplyInputs] = useState({});

  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (!admin) {
      alert("Access denied! Admin only.");
      navigate("/admin");
      return;
    }

    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await fetch(
        "http://localhost/ayurvision-backend/api/get_contact_messages.php"
      );
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);

        // Pre-fill reply inputs from existing admin replies
        const replyMap = {};
        data.messages.forEach((msg) => {
          replyMap[msg.id] = msg.admin_reply || "";
        });
        setReplyInputs(replyMap);
      } else {
        alert(data.message || "Failed to load messages.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Server error while fetching messages.");
    } finally {
      setLoading(false);
    }
  }

  function handleReplyChange(id, value) {
    setReplyInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(
        "http://localhost/ayurvision-backend/api/update_contact_status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchMessages();
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Server error while updating status.");
    }
  }

  async function sendReply(id) {
    const reply = replyInputs[id]?.trim();

    if (!reply) {
      alert("Please write a reply before sending.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/ayurvision-backend/api/update_contact_reply.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, admin_reply: reply }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchMessages();
      } else {
        alert(data.message || "Failed to send reply.");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Server error while sending reply.");
    }
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        "http://localhost/ayurvision-backend/api/delete_contact_message.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        fetchMessages();
      } else {
        alert(data.message || "Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Server error while deleting message.");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Support Messages Inbox</h1>

      {loading ? (
        <p style={styles.infoText}>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p style={styles.infoText}>No messages found.</p>
      ) : (
        <div style={styles.cardList}>
          {messages.map((msg) => (
            <div key={msg.id} style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <h3 style={styles.cardTitle}>
                    #{msg.id} - {msg.subject}
                  </h3>
                  <p style={styles.metaText}>
                    <strong>Name:</strong> {msg.name}
                  </p>
                  <p style={styles.metaText}>
                    <strong>User ID:</strong> {msg.user_id ? msg.user_id : "Guest"}
                  </p>
                  <p style={styles.metaText}>
                    <strong>Email:</strong> {msg.email}
                  </p>
                  <p style={styles.metaText}>
                    <strong>Phone:</strong> {msg.phone ? msg.phone : "-"}
                  </p>
                  <p style={styles.metaText}>
                    <strong>Issue Type:</strong> {msg.issue_type}
                  </p>
                  <p style={styles.metaText}>
                    <strong>Status:</strong>{" "}
                    <span style={styles.statusBadge(msg.status)}>{msg.status}</span>
                  </p>
                  <p style={styles.metaText}>
                    <strong>Created:</strong> {msg.created_at}
                  </p>
                  {msg.resolved_at && (
                    <p style={styles.metaText}>
                      <strong>Resolved At:</strong> {msg.resolved_at}
                    </p>
                  )}
                </div>
              </div>

              <div style={styles.messageBox}>
                <strong>User Message:</strong>
                <p style={styles.messageText}>{msg.message}</p>
              </div>

              <div style={styles.replySection}>
                <label style={styles.replyLabel}>Admin Reply / Acknowledgment</label>
                <textarea
                  value={replyInputs[msg.id] || ""}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                  placeholder="Write reply for user..."
                  style={styles.textarea}
                />

                <div style={styles.actionRow}>
                  <button
                    style={styles.readBtn}
                    onClick={() => updateStatus(msg.id, "read")}
                  >
                    Mark Read
                  </button>

                  <button
                    style={styles.replyBtn}
                    onClick={() => sendReply(msg.id)}
                  >
                    Send Reply
                  </button>

                  <button
                    style={styles.resolveBtn}
                    onClick={() => updateStatus(msg.id, "resolved")}
                  >
                    Resolve
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </div>

                {msg.admin_reply && (
                  <div style={styles.previousReplyBox}>
                    <strong>Current Saved Reply:</strong>
                    <p style={styles.messageText}>{msg.admin_reply}</p>
                    {msg.reply_updated_at && (
                      <p style={styles.replyDate}>
                        Replied at: {msg.reply_updated_at}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px 20px",
    minHeight: "100vh",
    background: "#f8fff8",
  },
  heading: {
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: "25px",
    fontSize: "2rem",
  },
  infoText: {
    textAlign: "center",
    color: "#444",
    fontSize: "18px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "1px solid #e0e0e0",
  },
  topRow: {
    marginBottom: "15px",
  },
  cardTitle: {
    color: "#1b5e20",
    marginBottom: "10px",
  },
  metaText: {
    margin: "4px 0",
    color: "#333",
    fontSize: "14px",
  },
  statusBadge: (status) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    background:
      status === "resolved"
        ? "#2e7d32"
        : status === "read"
        ? "#1976d2"
        : "#f57c00",
  }),
  messageBox: {
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "18px",
  },
  messageText: {
    marginTop: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#444",
  },
  replySection: {
    marginTop: "10px",
  },
  replyLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#2e7d32",
  },
  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    resize: "vertical",
    fontSize: "15px",
    outline: "none",
    marginBottom: "15px",
    boxSizing: "border-box",
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "15px",
  },
  readBtn: {
    background: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  replyBtn: {
    background: "#6a1b9a",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  resolveBtn: {
    background: "#388e3c",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  deleteBtn: {
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  previousReplyBox: {
    background: "#f3e5f5",
    border: "1px solid #d1c4e9",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "10px",
  },
  replyDate: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#666",
  },
};