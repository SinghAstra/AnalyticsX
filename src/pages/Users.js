import axios from "axios";
import React, { useEffect, useState } from "react";
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
        console.log("response is ", response);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="users-loading">Loading...</div>;

  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-profile-card">
            <img
              src={user.picturePath || "/default-avatar.png"}
              alt={`${user.firstName} ${user.lastName}`}
              className="user-profile-picture"
            />
            <div className="user-profile-info">
              <h3 className="user-profile-name">
                {user.firstName} {user.lastName}
              </h3>
              <button className="user-profile-follow-button">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
