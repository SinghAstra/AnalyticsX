import React from "react";
import { Link } from "react-router-dom";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/" className="top-bar-button">
        Home
      </Link>
      <Link to="/create-post" className="top-bar-button">
        Create Post
      </Link>
      <Link to="/users" className="top-bar-button">
        Users
      </Link>
      <Link to="/profile" className="top-bar-button">
        Profile
      </Link>
    </div>
  );
};

export default TopBar;
