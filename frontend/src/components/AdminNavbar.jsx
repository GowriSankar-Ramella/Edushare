import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";



const AdminNavbar = () => {
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
    <nav className="admin-navbar">
      <div className="logo">Edushare</div>
      <ul className="nav-links">
        <li><Link to="/admin/pending">Pending Notes</Link></li>
        <li><Link to="/admin/reviewed">Reviewed Notes</Link></li>
        <li><Link to="/admin/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
