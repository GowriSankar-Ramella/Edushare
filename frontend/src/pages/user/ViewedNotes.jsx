import { useEffect, useState } from "react";
import API from "../../services/api";
import "./ViewedNotes.css";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../components/UserLayout";

const ViewedNotes = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViewedNotes = async () => {
      try {
        const res = await API.get("/users/viewed-notes");
        setNotes(res.data.data);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    };

    fetchViewedNotes();
  }, []);

  return (
    <UserLayout>
    <div className="viewed-notes-container">
      <h2>Previously Viewed Notes</h2>

      {notes.length === 0 ? (
        <p>No notes viewed yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3><strong>Title:</strong> {note.title}</h3>
            <p><strong>Subject:</strong> {note.subject}</p>
            <p><strong>Topic:</strong> {note.topic}</p>
           <button onClick={() => navigate(`/user/note/${note._id}`)}>View Details</button>
          </div>
        ))
      )}
    </div>
    </UserLayout>
  );
};

export default ViewedNotes;
