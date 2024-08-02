import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: currentUser } = useContext(AuthContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsFollowing(response.data.user.followers.includes(currentUser._id));
      } catch (error) {
        console.log("Error fetching user:", error);
        setError("Could not fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, currentUser._id]);

  const handleFollowToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/follow/${id}`,
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

  if (loading)
    return <div className="user-profile-loading">Loading profile...</div>;
  if (error) return <div className="user-profile-error">{error}</div>;

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
        <Link to={`/users/${id}/followers`}>
          <p className="user-profile-followers">
            Followers: {user.followers.length}
          </p>
        </Link>
        <Link to={`/users/${id}/following`}>
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
      <button
        className={`user-profile-follow-button ${
          isFollowing ? "following" : "not-following"
        }`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserProfile;
