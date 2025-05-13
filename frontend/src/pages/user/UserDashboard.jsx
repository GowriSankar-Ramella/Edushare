import { useState } from "react";
import API from "../../services/api";
import "./UserDashboard.css";
import UserLayout from "../../components/UserLayout";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [keyword, setKeyword] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await API.get(`/notes/search?keyword=${keyword}`);
      setNotes(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <UserLayout>
    <div className="dashboard-container">
      <h2>Welcome, User 👋</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search notes by title, subject, or topic..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-card">
              <h3>Tilte: {note.title}</h3>
              <p><strong>Subject:</strong> {note.subject}</p>
              <p><strong>Topic:</strong> {note.topic}</p>
              <button onClick={() => navigate(`/user/note/${note._id}`)}>View Details</button>
                
            </div>
          ))
        )}
      </div>
    </div>
    </UserLayout>
  );
};

export default UserDashboard;
