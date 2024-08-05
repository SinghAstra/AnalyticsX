import React from "react";
import "../styles/Feed.css";

const Feed = ({ post }) => {
  const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const differenceInMs = now - postDate;

    const minutes = Math.floor(differenceInMs / (1000 * 60));
    const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365));

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (weeks > 0) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

    return "Just now";
  };

  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div className="profile-picture">
            <img src={post.user.picturePath} alt="" />
          </div>
          <div className="info">
            <h3>
              {post.user.firstName} {post.user.lastName}
            </h3>
            <small>
              {post.location}, {timeAgo(post.createdAt)}
            </small>
          </div>
        </div>
        <span className="edit">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>
      <div className="photo">
        <img src={post.picturePath} alt="" />
      </div>
      <div className="action-buttons">
        <div className="interaction-buttons">
          <span>
            <i className="uil uil-heart"></i>
          </span>
          <span>
            <i className="uil uil-comment-dots"></i>
          </span>
          <span>
            <i className="uil uil-share-alt"></i>
          </span>
        </div>
        <div className="bookmark">
          <span>
            <i className="uil uil-bookmark-full"></i>
          </span>
        </div>
      </div>
      <div className="likes">
        <p>{post.likes.length} Likes</p>
      </div>
      <div className="caption">
        <p>
          {post.description}
          <span className="hash-tag">#lifestyle</span>
        </p>
      </div>
      <div className="comments text-muted">View all 277 Comments.</div>
    </div>
  );
};

export default Feed;
