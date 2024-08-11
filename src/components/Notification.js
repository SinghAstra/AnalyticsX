import React from "react";
import "../styles/Notification.css";

const Notification = ({ message }) => {
  return (
    <div className="notification">
      <span>{message}</span>
    </div>
  );
};

export default Notification;
