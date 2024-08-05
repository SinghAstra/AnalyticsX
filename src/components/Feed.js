import React from "react";
import "../styles/Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <div className="head">
        <div className="user">
          <div className="profile-picture">
            <img src="/images/profile-13.jpg" alt="" />
          </div>
          <div className="info">
            <h3>Lana Rose</h3>
            <small>Dubai, 15 MINUTES AGO</small>
          </div>
        </div>
        <span className="edit">
          <i className="uil uil-ellipsis-h"></i>
        </span>
      </div>
      <div className="photo">
        <img src="/images/feed-1.jpg" alt="" />
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
      <div className="liked-by">
        <img src="/images/profile-10.jpg" alt="Profile 1" />
        <img src="/images/profile-4.jpg" alt="Profile 2" />
        <img src="/images/profile-15.jpg" alt="Profile 3" />
        <p>
          Liked by <b>Ernest Achiever</b> and <b>2,323</b> others
        </p>
      </div>
      <div className="caption">
        <p>
          <b>Lana Rose</b> Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Nihil, blanditiis? <span className="hash-tag">#lifestyle</span>
        </p>
      </div>
      <div className="comments text-muted">View all 277 Comments.</div>
    </div>
  );
};

export default Feed;
