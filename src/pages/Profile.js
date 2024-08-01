import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, isAuthenticating } = useContext(AuthContext);

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div>
      <h1>
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
      <p>Occupation: {user.occupation}</p>
    </div>
  );
};

export default Profile;
