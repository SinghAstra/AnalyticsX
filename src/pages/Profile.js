import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Post from "../components/Post";
import UserProfileCard from "../components/UserProfileCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/posts/${user._id}`,
            { withCredentials: true }
          );
          setPosts(response.data);
        } catch (error) {
          console.log("Error fetching user posts:", error);
        }
      };

      fetchUserPosts();
    }
  }, [user]);

  if (!user) return <div className="profile-error">User not found</div>;

  console.log("posts is ", posts);
  return (
    <div className="profile-container">
      <UserProfileCard user={user} />
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
