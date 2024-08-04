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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");

  console.log("comments is ", comments);

  const MAX_DESCRIPTION_LENGTH = 100;

  const handleLike = async () => {
    try {
      // Update the UI immediately
      setIsLiked((prev) => !prev);
      // It has been anticipated that the value of isLiked will not change immediately.
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

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Prevent adding empty comments

    try {
      // Update UI immediately
      const comment = { _id: user._id, user: user._id, text: newComment };
      setComments([...comments, comment]);

      // Send the comment to the backend
      const response = await axios.post(
        `http://localhost:5000/comments/${post._id}`,
        { text: newComment },
        { withCredentials: true }
      );

      console.log("response.data is ", response.data);

      setNewComment(""); // Clear the input field
    } catch (err) {
      console.log("Error while adding comment:", err);
    }
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
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
        <p>
          {isDescriptionExpanded ||
          post.description.length <= MAX_DESCRIPTION_LENGTH
            ? post.description
            : `${post.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`}
          {post.description.length > MAX_DESCRIPTION_LENGTH && (
            <span onClick={toggleDescription} className="read-more">
              {isDescriptionExpanded ? " Show less" : " Read more"}
            </span>
          )}
        </p>
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
            {comments.map((comment) => (
              // <Comment key={comment._id} comment={comment} />
              <h1 key={comment._id}>{comment.text}</h1>
            ))}
            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              {/* <button onClick={handleAddComment}>Add Comment</button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
