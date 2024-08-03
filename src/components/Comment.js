import React from "react";
// import "../styles/Comment.css";

const Comment = ({ comment }) => {
  return (
    <div className="comment-container">
      <img
        src={comment.user.picturePath || "/default-avatar.png"}
        alt="User Avatar"
        className="comment-avatar"
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-username">{comment.user.firstName}</span>
          <span className="comment-timestamp">{comment.createdAt}</span>
        </div>
        <p className="comment-text">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
