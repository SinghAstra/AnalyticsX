import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Register.css";

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
    <div className="register-form">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
