import React from "react";
import { Link } from "react-router-dom";
import "../styles/TopBar.css";

const TopBar = () => {
  return (
    <div className="top-bar">
      <Link to="/create-post" className="top-bar-button">
        Create Post
      </Link>
      <Link to="/users" className="top-bar-button">
        Users
      </Link>
    </div>
  );
};

export default TopBar;
