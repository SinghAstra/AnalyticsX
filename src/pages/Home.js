import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts", {
          withCredentials: true,
        });
        console.log("response.data is ", response.data);
        setPosts(response.data);
      } catch (err) {
        console.log(err.response ? err.response.data.message : "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="home-container">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
