import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
  return <div>Profile</div>;
};

export default Profile;
