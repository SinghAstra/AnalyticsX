import React from "react";
import Feeds from "./components/Feeds";
import Sidebar from "./components/Sidebar";
import "./styles/Main.css";

const Main = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <Feeds />
    </div>
  );
};

export default Main;
