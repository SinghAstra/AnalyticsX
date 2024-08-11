import React, { useContext, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
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
            <button className="btn btn-primary edit-profile-button">
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
            <strong>{user.fullName}</strong>
            <p>Bio text goes here.</p>
            <a href="website_url" className="profile-website">
              website.com
            </a>
          </div>
        </div>
      </div>

      <div className="separator-line"></div>

      <div className="profile-navigation">
        <NavLink to="/profile" className="nav-link" end>
          <i class="uil uil-table"></i>
          <h3>Posts</h3>
        </NavLink>
        <NavLink to="/profile/feed" className="nav-link">
          <i class="uil uil-newspaper"></i>
          <h3>Feed</h3>
        </NavLink>
        <NavLink to="/profile/saved" className="nav-link">
          <i class="uil uil-bookmark"></i>
          <h3>Saved</h3>
        </NavLink>
        <NavLink to="/profile/tagged" className="nav-link">
          <i class="uil uil-tag"></i>
          <h3>Tagged</h3>
        </NavLink>
      </div>

      <div className="profile-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;

/* Implement Profile Highlights */
