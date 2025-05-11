import { useEffect, useState } from "react";
import API from "../../services/api";
import PublisherLayout from "../../components/PublisherLayout";
import "./PublisherProfile.css";

const PublisherProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile"); // or "/users/me"
        setProfile(res.data.data);
      } catch (err) {
        alert("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <PublisherLayout><p>Loading profile...</p></PublisherLayout>;

  return (
    <PublisherLayout>
      <div className="profile-container">
        <h2>Your Profile</h2>
        <div className="profile-item"><strong>Name:</strong> {profile.name}</div>
        <div className="profile-item"><strong>Email:</strong> {profile.email}</div>
        <div className="profile-item"><strong>Role:</strong> {profile.role}</div>
      </div>
    </PublisherLayout>
  );
};

export default PublisherProfile;
