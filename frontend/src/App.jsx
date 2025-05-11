import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/UserDashboard";
import NoteDetail from "./pages/user/NoteDetail";
import ViewedNotes from "./pages/user/ViewedNotes";
import UserProfile from "./pages/user/UserProfile";
import UploadNote from "./pages/publisher/UploadNote";
import PublisherDashboard from "./pages/publisher/PublisherDashboard";
import AdminDashboard from "./pages/admin/ReviewedNotes";
import PendingNotes from "./pages/admin/PendingNotes";
import PublisherNoteDetail from "./pages/publisher/PublisherNoteDetail";
import PublisherProfile from "./pages/publisher/PublisherProfile";
import AdminNoteDetail from "./pages/admin/AdminNoteDetail";
import AdminProfile from "./pages/admin/AdminProfile";
import HomePage from "./pages/auth/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/viewed-notes" element={<ViewedNotes />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/publisher/upload" element={<UploadNote />} />
      <Route path="/publisher/profile" element={<PublisherProfile />} />
      <Route path="/publisher/mynotes" element={<PublisherDashboard />} />
      <Route path="/admin/reviewed" element={<AdminDashboard />} />
      <Route path="/admin/pending" element={<PendingNotes />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/user/note/:id" element={<NoteDetail />} />
      <Route path="/publisher/note/:id" element={<PublisherNoteDetail />} />
      <Route path="/admin/note/:id" element={<AdminNoteDetail />} />


    </Routes>
  );
}
export default App 