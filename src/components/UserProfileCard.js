import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserProfileCard = ({ user, setUser }) => {
  const { user: currentUser } = useContext(AuthContext);

  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(currentUser._id)
  );

  const handleFollowToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/follow/${user._id}`,
        {},
        { withCredentials: true }
      );
      const updatedUser = response.data.userToFollow;
      setUser(updatedUser);
      setIsFollowing(updatedUser.followers.includes(currentUser._id));
    } catch (error) {
      console.log("Error toggling follow status:", error.response.data.message);
    }
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <img
          src={user.picturePath || "/default-avatar.png"}
          alt={`${user.firstName} ${user.lastName}`}
          className="user-profile-picture"
        />
        <h2 className="user-profile-name">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="user-profile-info">
        <p className="user-profile-email">Email: {user.email}</p>
        <p className="user-profile-location">
          Location: {user.location || "Not provided"}
        </p>
        <p className="user-profile-occupation">
          Occupation: {user.occupation || "Not provided"}
        </p>
        <Link to={`/users/${user._id}/followers`}>
          <p className="user-profile-followers">
            Followers: {user.followers.length}
          </p>
        </Link>
        <Link to={`/users/${user._id}/following`}>
          <p className="user-profile-following">
            Following: {user.following.length}
          </p>
        </Link>
        <p className="user-profile-views">
          Profile Views: {user.viewedProfile || 0}
        </p>
        <p className="user-profile-impressions">
          Impressions: {user.impressions || 0}
        </p>
      </div>
      {currentUser._id !== user._id && (
        <button
          className={`user-profile-follow-button ${
            isFollowing ? "following" : "not-following"
          }`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfileCard;
