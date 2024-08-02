import React, { useContext } from "react";
import UserProfileCard from "../components/UserProfileCard";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="profile-error">User not found</div>;

  return <UserProfileCard user={user} />;
};

export default Profile;
