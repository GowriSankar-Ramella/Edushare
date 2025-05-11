import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "../../components/AdminLayout";
import "./PendingNotes.css";

const PendingNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await API.get("/notes/pending");
                setNotes(res.data.data);
            } catch (err) {
                alert("Failed to load pending notes.");
            }
        };
        fetchPending();
    }, []);

    const handleReview = async (id, status, feedback) => {
        try {
            await API.put(`/notes/${id}/review`, { status, feedback });
            alert("Note reviewed successfully.");
            setNotes(notes.filter((n) => n._id !== id)); // remove from list
        } catch (err) {
            alert("Failed to review note.");
        }
    };

    return (
        <AdminLayout>
            <h2>Welcome, Admin 👋</h2>
            <h2>Pending Notes for Review</h2>
            {notes.length === 0 ? (
                <p>No pending notes.</p>
            ) : (
                notes.map((note) => (
                    <div key={note._id} className="pending-card">
                        <h3>Title: {note.title}</h3>
                        <p><strong>Subject:</strong> {note.subject}</p>
                        <p><strong>Topic:</strong> {note.topic}</p>
                        <p><strong>Uploaded By:</strong> {note.uploadedBy.name}</p>
                        <p><strong>Uploaded on:</strong> {note.createdAt}</p>
                        <iframe
                            src={note.fileUrl}
                            width="100%"
                            height="600px"
                            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                            title="PDF Preview"
                        />


                        <div className="review-actions">
                            <textarea
                                placeholder="Feedback..."
                                onChange={(e) => note.feedback = e.target.value}
                            />
                            <button onClick={() => handleReview(note._id, "approved", note.feedback)}>Approve</button>
                            <button onClick={() => handleReview(note._id, "rejected", note.feedback)}>Reject</button>
                        </div>
                    </div>
                ))
            )}
        </AdminLayout>
    );
};

export default PendingNotes;
