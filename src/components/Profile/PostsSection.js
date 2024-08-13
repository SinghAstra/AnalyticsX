import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/PostsSection.css";

const PostsSection = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${username}/posts`,
          { withCredentials: true }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("posts is ", posts);

  return (
    <div className="posts-grid">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-item">
            {post.media[0].type === "image" ? (
              <img
                src={post.media[0].url}
                alt="Post media"
                className="post-thumbnail"
              />
            ) : (
              <video
                src={post.media[0].url}
                className="post-thumbnail"
                muted
                loop
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostsSection;
