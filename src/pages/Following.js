import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
// import "../styles/Following.css";

const Following = () => {
  const { id } = useParams();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${id}/following`,
          {
            withCredentials: true,
          }
        );
        console.log("response.data.following is ", response.data.following);
        setFollowing(response.data.following);
      } catch (error) {
        console.log("Error fetching following:", error);
        setError("Could not fetch following.");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [id]);

  if (loading) return <div className="following-loading">Loading...</div>;
  if (error) return <div className="following-error">{error}</div>;

  const handleFollowToggle = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      const updatedUser = response.data.userToFollow;

      setFollowing((prevFollowing) =>
        prevFollowing.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.log("Error toggling follow status:", error.response.data.message);
    }
  };

  return (
    <div className="following-container">
      <h2>Following</h2>
      <ul>
        {following.map((followed) => (
          <UserCard
            key={followed._id}
            userInfo={followed}
            handleFollowToggle={handleFollowToggle}
          />
        ))}
      </ul>
    </div>
  );
};

export default Following;
