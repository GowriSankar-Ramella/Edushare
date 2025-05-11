import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import PublisherLayout from "../../components/PublisherLayout";

const PublisherNoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        const noteData = res.data.data.note;
        const avgRating = res.data.data.avgRating;
        setNote({ ...noteData, avgRating });
      } catch (err) {
        alert("Failed to load note details");
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <PublisherLayout><p>Loading...</p></PublisherLayout>;

  return (
    <PublisherLayout>
      <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <h2>Title: {note.title}</h2>
        <p><strong>Subject:</strong> {note.subject}</p>
        <p><strong>Topic:</strong> {note.topic}</p>
        <p><strong>Description:</strong> {note.description}</p>
        <p><strong>Status:</strong> {note.status}</p>
        <p><strong>Average Rating:</strong> ⭐ {note.avgRating|| "N/A"}</p>

        <div style={{ margin: "2rem 0" }}>
          <iframe
            src={note.fileUrl}
            width="100%"
            height="500px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </div>

        <h3>Comments</h3>
        {note.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          note.comments.map((c, i) => (
            <div key={i} style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "1rem" }}>
              <p><strong>{c.userId?.name}</strong>: {c.comment}</p>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}

        {note.status === "rejected" || note.status === "approved" ? (
          <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}>
            <strong>Admin Feedback:</strong> {note.feedback || "No feedback"}
          </div>
        ) : null}
      </div>
    </PublisherLayout>
  );
};

export default PublisherNoteDetail;
