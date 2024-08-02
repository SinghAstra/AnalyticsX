import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import UserProfileCard from "../components/UserProfileCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
        setError("Could not fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, currentUser._id]);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/posts/${id}`,
            { withCredentials: true }
          );
          setPosts(response.data);
        } catch (error) {
          console.log("Error fetching user posts:", error);
        }
      };

      fetchUserPosts();
    }
  }, [id, user]);

  if (loading)
    return <div className="user-profile-loading">Loading profile...</div>;
  if (error) return <div className="user-profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <UserProfileCard user={user} setUser={setUser} />
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
