import { Link, useNavigate } from "react-router-dom";
import "./PublisherNavbar.css";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const PublisherNavbar = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="publisher-navbar">
      <div className="logo">Edushare </div>
      <ul className="nav-links">
        <li><Link to="/publisher/mynotes">My Notes</Link></li>
        <li><Link to="/publisher/upload">Upload Note</Link></li>
        <li><Link to="/publisher/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>

      </ul>
    </nav>
  );
};

export default PublisherNavbar;
