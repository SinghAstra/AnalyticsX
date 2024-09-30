"use client";
import { siteConfig } from "@/config/site";
import { SessionContext } from "@/context/SessionContext";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Icons } from "./Icons";
import SignIn from "./SignIn";
import ThemeChange from "./ThemeChange";
import { Button } from "./ui/button";
import { UserAvatar } from "./UserAvatar";

const MainNav = () => {
  const { session, isAuthenticating } = useContext(SessionContext);

  console.log("session --MainNav is ", session);
  return (
    <nav className="px-4 py-3 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo />
          <span className="hidden sm:inline-block md:text-2xl lg:text-2xl">
            {siteConfig.name}
          </span>
        </Link>
        {isAuthenticating ? (
          <Button variant="outline">
            <Icons.spinner className="animate-spin mr-2" />
            Wait...
          </Button>
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

export default MainNav;
