import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/Feeds.css";
import Feed from "./Feed";

const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts", {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feeds-wrapper">
      <div className="feeds">
        {posts.map((post) => (
          <Feed key={post._id} post={post} />
        ))}
      </div>
      <div className="suggested-profiles-container"></div>
    </div>
  );
};

export default Feeds;
