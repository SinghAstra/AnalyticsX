import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="profile-error">User not found</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.picturePath || "/default-avatar.png"}
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-picture"
        />
        <h2 className="profile-name">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="profile-info">
        <p className="profile-email">Email: {user.email}</p>
        <p className="profile-location">
          Location: {user.location || "Not provided"}
        </p>
        <p className="profile-occupation">
          Occupation: {user.occupation || "Not provided"}
        </p>
        <p className="profile-followers">Followers: {user.followers.length}</p>
        <p className="profile-following">Following: {user.following.length}</p>
        <p className="profile-views">
          Profile Views: {user.viewedProfile || 0}
        </p>
        <p className="profile-impressions">
          Impressions: {user.impressions || 0}
        </p>
      </div>
    </div>
  );
};

export default Profile;
