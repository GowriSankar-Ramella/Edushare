import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <div className="homepage-overlay">
        <div className="homepage-content">
          <h1 className="title">EDUSHARE</h1>
          <p className="tagline">Empowering Learning Through Shared Knowledge</p>
          <p className="description">
            EduShare is your digital hub for academic collaboration. Students and publishers can upload notes on any subject. Experts verify the content to ensure accuracy. Users can search, preview, rate, and comment on notes — helping each other grow academically.
          </p>
          <div className="buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
