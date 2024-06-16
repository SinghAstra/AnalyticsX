import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-violet-400">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
