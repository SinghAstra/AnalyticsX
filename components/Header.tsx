"use client";
import { SessionContext } from "@/context/SessionContext";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import SignIn from "./SignIn";
import ThemeChange from "./ThemeChange";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";

const Header = () => {
  const { session, isAuthenticating } = useContext(SessionContext);

  console.log("session --header is ", session);
  return (
    <nav className="px-4 py-3 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/">
          <h1 className="md:text-2xl lg:text-2xl">AutoForm</h1>
        </Link>
        {isAuthenticating ? (
          <div className="rounded-full bg-slate-700 h-10 w-10 animate-pulse"></div>
        ) : session?.user ? (
          <div className="flex items-center gap-1 md:gap-1 lg:gap-4">
            <ThemeChange />
            <Link href="/view-forms">
              <Button variant="outline">
                <span className="hidden md:inline">Dashboard</span>{" "}
                <LayoutDashboard className="md:hidden" />
              </Button>
            </Link>
            <UserAvatar />
          </div>
        ) : (
          <div className="flex">
            <ThemeChange />
            <SignIn />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
