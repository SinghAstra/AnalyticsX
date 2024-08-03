import axios from "axios";
import React, { useContext, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
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

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <div className="logo-container">
        <img src="/social.png" alt="logo" />
      </div>
      <div className="title-container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">
          Get started with <b>social</b>, just create an account and enjoy the
          experience.
        </span>
      </div>
      <div className="input-container">
        <label className="input-label" for="email">
          Email
        </label>
        <MdOutlineMailOutline className="icon" />
        <input
          placeholder="name@mail.com"
          id="email"
          type="email"
          name="email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label" for="password">
          Password
        </label>
        <HiOutlineEye className="icon-right" />
        <input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          className="input-field input-field-with-icon-right"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" class="sign-in-btn">
        <span>Sign In</span>
      </button>

      <div class="separator">
        <hr class="line" />
        <span>Or</span>
        <hr class="line" />
      </div>
      <button class="sign-in-google">
        <img src="/google.png" alt="google" />
        <span>Sign In with Google</span>
      </button>
      <button title="Sign In" class="sign-in-github">
        <img src="/github.png" alt="github" />
        <span>Sign In with Github</span>
      </button>
      <p class="note">Terms of use &amp; Conditions</p>
    </form>
  );
};

export default Login;
