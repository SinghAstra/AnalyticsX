import React from "react";
import TopBar from "../components/TopBar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <TopBar className="home-top-bar" />
      <div className="home-content">Home</div>
    </div>
  );
};

export default Home;
