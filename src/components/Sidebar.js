import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleSetActiveItem = (path) => {
    setActiveItem(path);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-item-container">
        <Link
          to="/"
          className={`sidebar-item ${activeItem === "/" ? "active" : ""}`}
          onClick={() => handleSetActiveItem("/")}
        >
          <i className="uil uil-estate"></i>
          <h3>Home</h3>
        </Link>
        <Link
          to="/search"
          className={`sidebar-item sidebar-item-search ${
            activeItem === "/search" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/search")}
        >
          <i className="uil uil-search"></i>
          <h3>Search</h3>
        </Link>
        <Link
          to="/explore"
          className={`sidebar-item ${
            activeItem === "/explore" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/explore")}
        >
          <i className="uil uil-compass"></i>
          <h3>Explore</h3>
        </Link>
        <Link
          to="/reels"
          className={`sidebar-item sidebar-item-reels ${
            activeItem === "/reels" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/reels")}
        >
          <i className="uil uil-film"></i>
          <h3>Reels</h3>
        </Link>
        <Link
          to="/messages"
          className={`sidebar-item ${
            activeItem === "/messages" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/messages")}
        >
          <i className="uil uil-envelope-alt">
            <small className="notification-count">6</small>
          </i>
          <h3>Messages</h3>
        </Link>
        <Link
          to="/notifications"
          className={`sidebar-item sidebar-item-notifications ${
            activeItem === "/notifications" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/notifications")}
        >
          <i className="uil uil-bell">
            <small className="notification-count">9+</small>
          </i>
          <h3>Notifications</h3>
        </Link>
        <Link
          to="/create-post"
          className={`sidebar-item sidebar-item-create-post ${
            activeItem === "/create-post" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/create-post")}
        >
          <i className="uil uil-plus-circle"></i>
          <h3>Create Post</h3>
        </Link>
        <Link
          to="/bookmarks"
          className={`sidebar-item sidebar-item-bookmarks ${
            activeItem === "/bookmarks" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/bookmarks")}
        >
          <i className="uil uil-bookmark"></i>
          <h3>Bookmarks</h3>
        </Link>
        <Link
          to="/analytics"
          className={`sidebar-item sidebar-item-analytics ${
            activeItem === "/analytics" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/analytics")}
        >
          <i className="uil uil-chart-line"></i>
          <h3>Analytics</h3>
        </Link>
        <Link
          to="/theme"
          className={`sidebar-item sidebar-item-theme ${
            activeItem === "/theme" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/theme")}
        >
          <i className="uil uil-palette"></i>
          <h3>Theme</h3>
        </Link>
        <Link
          to="/settings"
          className={`sidebar-item sidebar-item-settings ${
            activeItem === "/settings" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/settings")}
        >
          <i className="uil uil-setting"></i>
          <h3>Settings</h3>
        </Link>
        <Link
          to="/profile"
          className={`sidebar-item ${
            activeItem === "/profile" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/profile")}
        >
          {user.profilePicture ? (
            <div className="user-profile-picture">
              <img src={user.profilePicture} alt="user profile" />
            </div>
          ) : (
            <div className="user-profile-logo">
              <span>{user.fullName[0]}</span>
            </div>
          )}
          <h3>Profile</h3>
        </Link>
      </div>
      <Link
        to="/create-post"
        className="btn btn-primary create-post-button"
        onClick={() => handleSetActiveItem("/create-post")}
      >
        Create Post
      </Link>
    </div>
  );
};

export default Sidebar;
