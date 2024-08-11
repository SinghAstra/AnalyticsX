import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
        <NavLink to="/" className="sidebar-item">
          <i className="uil uil-estate"></i>
          <h3>Home</h3>
        </NavLink>
        <NavLink to="/search" className="sidebar-item sidebar-item-search">
          <i className="uil uil-search"></i>
          <h3>Search</h3>
        </NavLink>
        <NavLink to="/explore" className="sidebar-item">
          <i className="uil uil-compass"></i>
          <h3>Explore</h3>
        </NavLink>
        <NavLink to="/reels" className="sidebar-item sidebar-item-reels">
          <i className="uil uil-film"></i>
          <h3>Reels</h3>
        </NavLink>
        <NavLink to="/messages" className="sidebar-item">
          <i className="uil uil-envelope-alt">
            <small className="notification-count">6</small>
          </i>
          <h3>Messages</h3>
        </NavLink>
        <NavLink
          to="/notifications"
          className="sidebar-item sidebar-item-notifications"
        >
          <i className="uil uil-bell">
            <small className="notification-count">9+</small>
          </i>
          <h3>Notifications</h3>
        </NavLink>
        <NavLink
          to="/create-post"
          className="sidebar-item sidebar-item-create-post"
        >
          <i className="uil uil-plus-circle"></i>
          <h3>Create Post</h3>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className="sidebar-item sidebar-item-bookmarks"
        >
          <i className="uil uil-bookmark"></i>
          <h3>Bookmarks</h3>
        </NavLink>
        <NavLink
          to="/analytics"
          className="sidebar-item sidebar-item-analytics"
        >
          <i className="uil uil-chart-line"></i>
          <h3>Analytics</h3>
        </NavLink>
        <NavLink to="/theme" className="sidebar-item sidebar-item-theme">
          <i className="uil uil-palette"></i>
          <h3>Theme</h3>
        </NavLink>
        <NavLink to="/settings" className="sidebar-item sidebar-item-settings">
          <i className="uil uil-setting"></i>
          <h3>Settings</h3>
        </NavLink>
        <NavLink to="/profile" className="sidebar-item">
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
        </NavLink>
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
