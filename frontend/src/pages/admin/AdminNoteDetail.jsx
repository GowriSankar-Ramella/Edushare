import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";

const AdminNoteDetail = () => {
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
        alert("Error fetching note detail");
      }
    };
    fetchNote();
  }, [id]);

  if (!note) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
        <h2>Title: {note.title}</h2>
        <p><strong>Subject:</strong> {note.subject}</p>
        <p><strong>Topic:</strong> {note.topic}</p>
        <p><strong>Description:</strong> {note.description}</p>
        <p><strong>Status:</strong> {note.status}</p>
        <p><strong>Feedback:</strong> {note.feedback || "No feedback"}</p>
        <p><strong>Average Rating:</strong> ⭐ {note.avgRating || "N/A"}</p>

        <div style={{ margin: "2rem 0" }}>
          <iframe
            src={note.fileUrl}
            width="100%"
            height="500px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc", borderRadius: "6px" }}
          />
        </div>

        <h3>Comments</h3>
        {note.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          note.comments.map((c, i) => (
            <div key={i} style={{ padding: "1rem", border: "1px solid #ddd", marginBottom: "1rem", borderRadius: "6px" }}>
              <p><strong>{c.userId?.name}</strong>: {c.comment}</p>
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNoteDetail;
