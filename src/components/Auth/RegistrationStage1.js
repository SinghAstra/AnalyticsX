import axios from "axios";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const RegistrationStage1 = ({ onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async () => {
    console.log("formData is ", formData);
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src="/social.png" alt="logo" />
        </div>
        <div className="title-container">
          <span className="subtitle">
            Sign up to see photos and videos <br /> from your friends
          </span>
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="mobileOrEmail">
            Mobile Number or Email Address
          </label>
          <MdAlternateEmail className="icon" />
          <input
            className="input-field-with-icon-left"
            id="mobileOrEmail"
            name="mobileOrEmail"
            onChange={handleChange}
            placeholder="Mobile Number or Email Address"
            type="text"
            value={formData.mobileOrEmail}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="input-field"
            id="fullName"
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            type="text"
            value={formData.fullName}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            Username
          </label>
          <FaUser className="icon" />
          <input
            className="input-field-with-icon-left"
            id="username"
            name="username"
            onChange={handleChange}
            placeholder="username"
            type="text"
            value={formData.username}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          {showPassword ? (
            <HiOutlineEyeOff
              className="icon-right"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <HiOutlineEye
              className="icon-right"
              onClick={togglePasswordVisibility}
            />
          )}
          <input
            className="input-field-with-icon-right"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
          />
        </div>
        <button type="submit" className="block-level-button blue-button">
          Sign Up
        </button>
      </form>
      <div className="register-form-footer-container">
        <p>
          Already a member ? <Link to={"/login"}>Log in</Link>
        </p>
      </div>
    </>
  );
};

export default RegistrationStage1;
