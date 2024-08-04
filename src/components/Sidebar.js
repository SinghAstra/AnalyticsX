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
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
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
          <UilEstate className="icon" />
          <h3>Home</h3>
        </Link>
        <Link
          to="/explore"
          className={`sidebar-item ${
            activeItem === "/explore" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/explore")}
        >
          <UilCompass className="icon" />
          <h3>Explore</h3>
        </Link>
        <Link
          to="/notifications"
          className={`sidebar-item ${
            activeItem === "/notifications" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/notifications")}
        >
          <UilBell className="icon">
            <small className="notification-count">9+</small>
          </UilBell>
          <h3>Notifications</h3>
        </Link>
        <Link
          to="/messages"
          className={`sidebar-item ${
            activeItem === "/messages" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/messages")}
        >
          <UilEnvelopeAlt className="icon">
            <small className="notification-count">6</small>
          </UilEnvelopeAlt>
          <h3>Messages</h3>
        </Link>
        <Link
          to="/bookmarks"
          className={`sidebar-item ${
            activeItem === "/bookmarks" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/bookmarks")}
        >
          <UilBookmark className="icon" />
          <h3>Bookmarks</h3>
        </Link>
        <Link
          to="/analytics"
          className={`sidebar-item ${
            activeItem === "/analytics" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/analytics")}
        >
          <UilChartLine className="icon" />
          <h3>Analytics</h3>
        </Link>
        <Link
          to="/theme"
          className={`sidebar-item ${activeItem === "/theme" ? "active" : ""}`}
          onClick={() => handleSetActiveItem("/theme")}
        >
          <UilPalette className="icon" />
          <h3>Theme</h3>
        </Link>
        <Link
          to="/settings"
          className={`sidebar-item ${
            activeItem === "/settings" ? "active" : ""
          }`}
          onClick={() => handleSetActiveItem("/settings")}
        >
          <UilSetting className="icon" />
          <h3>Settings</h3>
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
