import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return null;
  }
  return (
    <div className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">Social</h2>
        <div className="navbar-search-bar">
          <i className="uil uil-search"></i>
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
            <img src={user.picturePath} alt="user profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
