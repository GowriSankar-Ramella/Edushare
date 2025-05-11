import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const UserNavbar = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await API.get("/auth/logout");
            setUser(null);
            navigate("/login");
        } catch (err) {
            alert("Logout failed");
        }
    };

    return (
        <nav className="user-navbar">
            <div className="logo">Edushare</div>
            <ul className="nav-links">
                <li><Link to="/user/dashboard">Dashboard</Link></li>
                <li><Link to="/user/viewed-notes">Viewed Notes</Link></li>
                <li><Link to="/user/profile">Profile</Link></li>

                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
    );
};

export default UserNavbar;
