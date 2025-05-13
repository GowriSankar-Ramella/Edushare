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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
      <Route path="/user/viewed-notes" element={<ProtectedRoute role="user"><ViewedNotes /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
      <Route path="/publisher/upload" element={<ProtectedRoute role="publisher"><UploadNote /></ProtectedRoute>} />
      <Route path="/publisher/profile" element={<ProtectedRoute role="publisher"><PublisherProfile /></ProtectedRoute>} />
      <Route path="/publisher/mynotes" element={<ProtectedRoute role="publisher"><PublisherDashboard /></ProtectedRoute>} />
      <Route path="/admin/reviewed" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/pending" element={<ProtectedRoute role="admin"><PendingNotes /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />
      <Route path="/user/note/:id" element={<ProtectedRoute role="user"><NoteDetail /></ProtectedRoute>}/>
      <Route path="/publisher/note/:id" element={<ProtectedRoute role="publisher"><PublisherNoteDetail /></ProtectedRoute>} />
      <Route path="/admin/note/:id" element={<ProtectedRoute role="admin"><AdminNoteDetail /></ProtectedRoute>} />

    </Routes>
  );
}
export default App 