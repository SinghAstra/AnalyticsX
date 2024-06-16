import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-400 flex justify-between items-center p-4">
      <NavLink to="/" className="text-3xl">
        Job-a-router
      </NavLink>
      <div className="flex gap-10">
        <NavLink to="/" className="text-xl">
          Home
        </NavLink>
        <NavLink to="/about" className="text-xl">
          About
        </NavLink>
        <NavLink to="/help" className="text-xl">
          Help
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
