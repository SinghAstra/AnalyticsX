import axios from "axios";
import React, { useContext, useState } from "react";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Register.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "The",
    lastName: "Engineer",
    location: "Human World",
    occupation: "Coding",
    picture: null,
    email: "engine@gmail.com",
    password: "123",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/register",
        formDataToSend,
        { withCredentials: true }
      );

      fetchUser();

      console.log("Response data:", res.data);
    } catch (error) {
      console.log("Registration error:", error.response.data);
    }
  };

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <div className="logo-container">
        <img src="/social.png" alt="logo" />
      </div>
      <div className="title-container">
        <p className="title">Create Your Account</p>
        <span className="subtitle">
          Join us today and enjoy a personalized experience.
        </span>
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FirstName
        </label>
        <input
          placeholder="name@mail.com"
          id="firstName"
          type="firstName"
          name="firstName"
          className="input-field"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LastName
        </label>
        <input
          placeholder="name@mail.com"
          id="lastName"
          type="lastName"
          name="lastName"
          className="input-field"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="location">
          Location
        </label>
        <HiOutlineLocationMarker className="icon-right" />
        <input
          placeholder="name@mail.com"
          id="location"
          type="location"
          name="location"
          className="input-field-with-icon-right"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="occupation">
          Occupation
        </label>
        <PiSuitcaseSimpleFill className="icon-right" />
        <input
          placeholder="name@mail.com"
          id="occupation"
          type="occupation"
          name="occupation"
          className="input-field-with-icon-right"
          value={formData.occupation}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="profile-picture">
          Profile Picture
        </label>
        <input
          type="file"
          id="picture"
          name="picture"
          className="input-field"
          onChange={handleChange}
          style={{ paddingTop: "4px" }}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <MdOutlineMailOutline className="icon" />
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
        Register
      </button>
      <div className="already-account-message">
        <Link to="/login">
          <span>Already have an account? Sign In</span>
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
  );
};

export default Register;
