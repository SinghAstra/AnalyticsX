import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
// import "../styles/Followers.css";

const Followers = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${id}/followers`,
          {
            withCredentials: true,
          }
        );
        setFollowers(response.data.followers);
      } catch (error) {
        console.log("Error fetching followers:", error);
        setError("Could not fetch followers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [id]);

  if (loading) return <div className="followers-loading">Loading...</div>;
  if (error) return <div className="followers-error">{error}</div>;

  const handleFollowToggle = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      const updatedUser = response.data.userToFollow;

      setFollowers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.log("Error toggling follow status:", error.response.data.message);
    }
  };

  return (
    <div className="followers-container">
      <h2>Followers</h2>
      <ul>
        {followers.map((follower) => (
          <UserCard
            key={follower._id}
            userInfo={follower}
            handleFollowToggle={handleFollowToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default Followers;
