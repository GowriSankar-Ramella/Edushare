import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import PublisherLayout from "../../components/PublisherLayout";
import "./PublisherDashboard.css";

const PublisherDashboard = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyNotes = async () => {
      try {
        const res = await API.get("/notes/mynotes");
        setNotes(res.data.data);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    };

    fetchMyNotes();
  }, []);

  return (
    <PublisherLayout>
      <div className="dashboard-container">
        <h2>Welcome, Publisher 👋</h2>
        <h2>My Uploaded Notes</h2>
        {notes.length === 0 ? (
          <p>You haven't uploaded any notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="note-card"
              onClick={() => navigate(`/publisher/note/${note._id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>Title: {note.title}</h3>
              <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Topic:</strong> {note.topic}</p>
              <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${note.status}`}>
                    {note.status}
                  </span>
                </p>
            </div>
          ))
        )}
      </div>
    </PublisherLayout>
  );
};

export default PublisherDashboard;
