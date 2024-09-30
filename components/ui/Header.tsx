"use client";
import { SessionContext } from "@/context/SessionContext";
import Link from "next/link";
import React, { useContext } from "react";
import ThemeChange from "./ThemeChange";

const Header = () => {
  const session = useContext(SessionContext);

  console.log("session --header is ", session);
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
