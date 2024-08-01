import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/", {
          withCredentials: true,
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollowToggle = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/users/follow/${userId}`,
        {},
        { withCredentials: true }
      );

      const updatedUser = response.data.userToFollow;

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.log("Error toggling follow status:", error.response.data.message);
    }
  };

  if (loading) return <div className="users-loading">Loading...</div>;

  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>
      <div className="users-list">
        {users.map((user) => (
          <UserCard userInfo={user} handleFollowToggle={handleFollowToggle} />
        ))}
      </div>
    </div>
  );
};

export default Users;
