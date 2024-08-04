import { UilSearch } from "@iconscout/react-unicons";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">Social</h2>
        <div className="navbar-search-bar">
          <UilSearch />
          <input
            type="text"
            placeholder="Search for creators, inspiration, and contacts"
            className="search-input"
          />
        </div>
        <div className="navbar-right-section">
          <Link to="/create-post" className="btn btn-primary">
            Create
          </Link>
          <div className="user-profile-picture">
            <img src="/profile-1.jpg" alt="user profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
