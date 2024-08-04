import {
  UilBell,
  UilBookmark,
  UilChartLine,
  UilCompass,
  UilEnvelopeAlt,
  UilEstate,
  UilPalette,
  UilSetting,
} from "@iconscout/react-unicons";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-item-container">
        <Link to="/" className="sidebar-item active">
          <UilEstate className="icon" />
          <h3>Home</h3>
        </Link>
        <Link to="/explore" className="sidebar-item">
          <UilCompass className="icon" />
          <h3>Explore</h3>
        </Link>
        <Link to="/notifications" className="sidebar-item">
          <UilBell className="icon">
            <small className="notification-count">9+</small>
          </UilBell>
          <h3>Notifications</h3>
        </Link>
        <Link to="/messages" className="sidebar-item">
          <UilEnvelopeAlt className="icon">
            <small className="notification-count">6</small>
          </UilEnvelopeAlt>
          <h3>Messages</h3>
        </Link>
        <Link to="/bookmarks" className="sidebar-item">
          <UilBookmark className="icon" />
          <h3>Bookmarks</h3>
        </Link>
        <Link to="/analytics" className="sidebar-item">
          <UilChartLine className="icon" />
          <h3>Analytics</h3>
        </Link>
        <Link to="/theme" className="sidebar-item">
          <UilPalette className="icon" />
          <h3>Theme</h3>
        </Link>
        <Link to="/settings" className="sidebar-item">
          <UilSetting className="icon" />
          <h3>Settings</h3>
        </Link>
      </div>
      <button
        htmlFor="create-post"
        className="btn btn-primary create-post-button"
      >
        Create Post
      </button>
    </div>
  );
};

export default Sidebar;
