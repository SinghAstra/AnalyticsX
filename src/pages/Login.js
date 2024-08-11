import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "engine@gmail.com",
    password: "123",
  });

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      fetchUser();
      console.log("res.data is ", res.data);
    } catch (error) {
      console.log(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    document.title = "Log In • Social UI 2.0";
  }, []);

  return (
    <div className="form-container-wrapper">
      <form className="form-container" onSubmit={handleFormSubmit}>
        <div className="logo-container">
          <img src="/social.png" alt="logo" />
        </div>
        <div className="title-container">
          <p className="title">Welcome Back!</p>
          <span className="subtitle">
            Log in to your account to continue your journey. Connect with
            friends, explore new content, and stay updated.
          </span>
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <MdOutlineMailOutline className="icon-left" />
          <input
            placeholder="name@mail.com"
            id="email"
            type="email"
            name="email"
            className="input-field-with-icon-left"
            value={formData.email}
            onChange={handleChange}
            required
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
            placeholder="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="input-field input-field-with-icon-right"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="block-level-button blue-button">
          <span>Sign In</span>
        </button>
        <div className="no-account-message">
          <Link to="/accounts/signup">
            <span>Don't have an account? Sign Up</span>
          </Link>
        </div>
        <div className="separator">
          <hr className="line" />
          <span>Or</span>
          <hr className="line" />
        </div>
        <button className="block-level-button button-with-img white-button">
          <img src="/google.png" alt="google" />
          <span>Sign In with Google</span>
        </button>
        <button className="block-level-button button-with-img black-button">
          <img src="/github.png" alt="github" />
          <span>Sign In with Github</span>
        </button>
        <p className="note">Terms of use &amp; Conditions</p>
      </form>
    </div>
  );
};

export default Login;
