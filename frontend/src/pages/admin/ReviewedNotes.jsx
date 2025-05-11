import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewed = async () => {
      try {
        const res = await API.get("/notes/reviewed");
        setNotes(res.data.data);
      } catch (err) {
        alert("Error loading reviewed notes.");
      }
    };
    fetchReviewed();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard-container">
        <h2>Reviewed Notes</h2>
        {notes.length === 0 ? (
          <p>No reviewed notes yet.</p>
        ) : (
          <div className="reviewed-notes-grid">
            {notes.map((note) => (
              <div
                key={note._id}
                className="reviewed-card"
                onClick={() => navigate(`/admin/note/${note._id}`)}
              >
                <h3>{note.title}</h3>
                <p><strong>Subject:</strong> {note.subject}</p>
                <p><strong>Topic:</strong> {note.topic}</p>
                <p><strong>Description:</strong> {note.description}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${note.status}`}>
                    {note.status}
                  </span>
                </p>
                <p><strong>Feedback:</strong> {note.feedback || "No feedback"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
