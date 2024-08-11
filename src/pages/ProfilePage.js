import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  console.log("user is ", user);

  useEffect(() => {
    document.title = `${user.fullName} (@${user.userName}) • Social UI 2.0`;
  }, [user.fullName, user.userName]);

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        {user.profilePicture ? (
          <div className="profile-picture">
            <img
              src="path_to_profile_picture.jpg"
              alt="Profile"
              className="profile-picture-img"
            />
          </div>
        ) : (
          <div className="profile-picture-logo">
            <span>{user.fullName[0]}</span>
          </div>
        )}
        <div className="profile-info">
          <div className="profile-username">
            <h1>{user.userName}</h1>
            <button className="btn btn-secondary edit-profile-button">
              Edit Profile
            </button>
          </div>
          <div className="profile-stats">
            <span className="posts-count">
              <strong>100</strong> posts
            </span>
            <span className="followers-count">
              <strong>200k</strong> followers
            </span>
            <span className="following-count">
              <strong>180</strong> following
            </span>
          </div>
          <div className="profile-bio">
            <p>Bio text goes here.</p>
            <a href="website_url" className="profile-website">
              website.com
            </a>
          </div>
        </div>
      </div>

      {/* Implement Profile Highlights */}

      {/* Profile Posts */}
      {/* <section className="profile-posts">
        <div className="post-grid">
          <div className="post-item">
            <img
              src="path_to_post_image.jpg"
              alt="Post 1"
              className="post-image"
            />
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ProfilePage;
