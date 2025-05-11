import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import "./NoteDetail.css";
import UserNavbar from "../../components/UserNavbar";
import UserLayout from "../../components/UserLayout";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState("N/A")
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await API.get(`/notes/${id}`);
        setNote(res.data.data.note);
        setAvgRating(res.data.data.avgRating);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    };

    fetchNote();
  }, [id]);

  const handleRate = async () => {
    try {
      await API.post(`/notes/${id}/rate`, { rating });
      alert("Rating submitted!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleComment = async () => {
    try {
      await API.post(`/notes/${id}/comment`, { comment });
      alert("Comment added!");
      setComment("");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!note) return <p>Loading note...</p>;

  return (
    <UserLayout>
      <div className="note-detail-container">
        <h2><strong>Title:</strong> {note.title}</h2>
        <p><strong>Subject:</strong> {note.subject}</p>
        <p><strong>Topic:</strong> {note.topic}</p>
        <p className="note-description"><strong>Description: </strong>{note.description}</p>

        <div className="average-rating">
          <strong>Average Rating:</strong> ⭐ {avgRating}
        </div>
        <p><strong>Uploaded By:</strong> {note.uploadedBy.name}</p>
        <p><strong>Uploaded on:</strong> {note.createdAt}</p>


        <div className="preview-section">
          <iframe
            src={note.fileUrl}
            width="100%"
            height="500px"
            title="PDF Preview"
            style={{ borderRadius: "6px", border: "1px solid #ddd" }}
          />
        </div>

        <div className="rate-section">
          <h3>Rate this note</h3>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button onClick={handleRate}>Submit Rating</button>
        </div>

        <div className="comment-section">
          <h3>Leave a comment</h3>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your comment..."
          />
          <button onClick={handleComment}>Submit Comment</button>
        </div>

        <div className="comment-list">
          <h3>Comments</h3>
          {note.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            note.comments.map((c, idx) => (
              <div key={idx} className="comment">
                <p><strong>{c.userId?.name}:</strong> {c.comment}</p>
                <small>{new Date(c.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>

        <div className="download-section" style={{ marginTop: "1rem" }}>
          <a
            href={note.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="download-button"
          >
            ⬇️ Download Note (PDF)
          </a>
        </div>

      </div>
    </UserLayout>


  );
};

export default NoteDetail;
