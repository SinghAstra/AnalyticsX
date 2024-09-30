import Link from "next/link";
import React from "react";
import ThemeChange from "./ThemeChange";

const Header = () => {
  return (
    <nav className="px-4 py-3">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/">
          <h1 className="md:text-2xl lg:text-2xl">AutoForm</h1>
        </Link>
        <ThemeChange />
      </div>
    </nav>
  );
};

export default Header;
