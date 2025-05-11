import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import PublisherLayout from "../../components/PublisherLayout";
import "./UploadNote.css";

const UploadNote = () => {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    topic: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("file", file);

    try {
      await API.post("/notes/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Note uploaded successfully!");
      navigate("/publisher/mynotes");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <PublisherLayout>
      <div className="upload-container">
        <h2>Upload New Note</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="subject" placeholder="Subject" onChange={handleChange} required />
          <input name="topic" placeholder="Topic" onChange={handleChange} required />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            rows="4"
          ></textarea>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Upload</button>
        </form>
      </div>
    </PublisherLayout>
  );
};

export default UploadNote;
