import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MySupport() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const user = JSON.parse(localStorage.getItem("user"));

    // Admin should not access My Support
    if (admin) {
      navigate("/admin/dashboard");
      return;
    }

    // Only logged-in user can access
    if (!user) {
      alert("Please login first to view your support messages.");
      navigate("/login");
      return;
    }

    const userId = user.id || user.user_id || user.userid || user.ID || "";

    if (!userId) {
      alert("User ID not found. Please login again.");
      navigate("/login");
      return;
    }

    fetchMySupportMessages(userId);
  }, [navigate]);

  async function fetchMySupportMessages(userId) {
    try {
      const response = await fetch(
        `http://localhost/ayurvision-backend/api/get_user_support_messages.php?user_id=${userId}`
      );

      const data = await response.json();

      if (data.success) {
        setTickets(data.messages);
      } else {
        alert(data.message || "Failed to load your support messages.");
      }
    } catch (error) {
      console.error("Error fetching support messages:", error);
      alert("Server error while loading support messages.");
    } finally {
      setLoading(false);
    }
  }

  function getStatusStyle(status) {
    if (status === "resolved") {
      return {
        background: "#e8f5e9",
        color: "#1b5e20",
        border: "1px solid #a5d6a7",
      };
    }

    if (status === "read") {
      return {
        background: "#e3f2fd",
        color: "#0d47a1",
        border: "1px solid #90caf9",
      };
    }

    return {
      background: "#fff3e0",
      color: "#e65100",
      border: "1px solid #ffcc80",
    };
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>My Support Requests</h1>
        <p style={styles.subText}>
          Track your complaints, admin replies, and issue resolution updates.
        </p>

        {loading ? (
          <p style={styles.infoText}>Loading your support messages...</p>
        ) : tickets.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.infoText}>
              You have not submitted any support request yet.
            </p>
          </div>
        ) : (
          <div style={styles.cardList}>
            {tickets.map((ticket) => (
              <div key={ticket.id} style={styles.card}>
                <div style={styles.headerRow}>
                  <h3 style={styles.cardTitle}>
                    #{ticket.id} - {ticket.subject}
                  </h3>
                  <span
                    style={{ ...styles.statusBadge, ...getStatusStyle(ticket.status) }}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p style={styles.metaText}>
                  <strong>Issue Type:</strong> {ticket.issue_type}
                </p>
                <p style={styles.metaText}>
                  <strong>Submitted On:</strong> {ticket.created_at}
                </p>

                {ticket.resolved_at && (
                  <p style={styles.metaText}>
                    <strong>Resolved On:</strong> {ticket.resolved_at}
                  </p>
                )}

                <div style={styles.messageBox}>
                  <strong>Your Message:</strong>
                  <p style={styles.messageText}>{ticket.message}</p>
                </div>

                {ticket.admin_reply ? (
                  <div style={styles.replyBox}>
                    <strong>Admin Reply:</strong>
                    <p style={styles.messageText}>{ticket.admin_reply}</p>

                    {ticket.reply_updated_at && (
                      <p style={styles.replyDate}>
                        Reply sent on: {ticket.reply_updated_at}
                      </p>
                    )}
                  </div>
                ) : (
                  <div style={styles.waitingBox}>
                    <strong>No admin reply yet.</strong>
                    <p style={styles.waitingText}>
                      Your request is under review. Please check again later.
                    </p>
                  </div>
                )}

                {ticket.status === "resolved" && (
                  <div style={styles.resolvedBox}>
                    ✅ Your issue has been marked as resolved by admin.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    color: "#2e7d32",
    fontSize: "2.3rem",
    marginBottom: "10px",
  },
  subText: {
    textAlign: "center",
    color: "#555",
    marginBottom: "30px",
    fontSize: "1.05rem",
  },
  infoText: {
    textAlign: "center",
    color: "#444",
    fontSize: "17px",
  },
  emptyBox: {
    background: "#fff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    border: "1px solid #e0e0e0",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  cardTitle: {
    color: "#1b5e20",
    margin: 0,
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  metaText: {
    margin: "5px 0",
    color: "#333",
    fontSize: "14px",
  },
  messageBox: {
    background: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "15px",
    marginBottom: "15px",
  },
  replyBox: {
    background: "#f3e5f5",
    border: "1px solid #d1c4e9",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "15px",
  },
  waitingBox: {
    background: "#fff8e1",
    border: "1px solid #ffe082",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "15px",
  },
  waitingText: {
    marginTop: "6px",
    color: "#6d4c41",
  },
  resolvedBox: {
    background: "#e8f5e9",
    color: "#1b5e20",
    border: "1px solid #a5d6a7",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "600",
  },
  messageText: {
    marginTop: "8px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#444",
  },
  replyDate: {
    marginTop: "8px",
    fontSize: "13px",
    color: "#666",
  },
};