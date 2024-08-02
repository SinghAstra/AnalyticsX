import axios from "axios";
import React, { useContext, useState } from "react";
import { FaHeart, FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Post.css";

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

  const handleLike = async () => {
    try {
      // Update the UI immediately
      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));

      // Send the like/unlike request to the backend
      await axios.post(
        `http://localhost:5000/posts/${post._id}/like`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Error while liking post.");
      // Revert UI changes in case of an error
      setIsLiked((prev) => !prev);
      setLikes((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const handleAddComment = (commentText) => {
    // Logic to add a new comment
    setComments([...comments, { userId: user._id, text: commentText }]);
    // You would also need to update the backend here
  };

  return (
    <div className="post">
      <Link to={`/users/${post.user._id}`}>
        <div className="post-header">
          <img
            src={post.user.picturePath || "/default-avatar.png"}
            alt="User Avatar"
            className="post-user-picture"
          />
          <div className="post-user-info">
            <h3>
              {post.user.firstName} {post.user.lastName}
            </h3>
            <p className="post-location-info">
              <FaLocationDot /> {post.location}
            </p>
          </div>
        </div>
      </Link>
      <div className="post-body">
        {post.picturePath && (
          <img src={post.picturePath} alt="Post" className="post-picture" />
        )}
        <p>{post.description}</p>
      </div>
      <div className="post-footer">
        <div className="post-footer-buttons">
          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />} {likes}
          </button>
          <button
            className="comment-button"
            onClick={() => setShowComments(!showComments)}
          >
            <FaRegCommentAlt />
          </button>
        </div>
        {showComments && (
          <div className="comments-section">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>
                  <strong>{comment.userName}:</strong> {comment.text}
                </p>
              </div>
            ))}
            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
