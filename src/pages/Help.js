import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Help = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 items-center justify-center bg-pink-400">
        <h1 className="text-5xl">Help</h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <NavLink to={"faq"}>
          <span className="text-xl">FAQ</span>
        </NavLink>
        <NavLink to={"contact-us"}>
          <span className="text-xl">Contact Us</span>
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Help;
