"use client";
import { Icons } from "@/components/Icons";
import MainNav from "@/components/MainNav";
import SignIn from "@/components/SignIn";
import ThemeChange from "@/components/ThemeChange";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/UserAvatar";
import { homeConfig } from "@/config/home";
import { SessionContext } from "@/context/SessionContext";
import React, { useContext } from "react";

const HomeNav = () => {
  const { session, isAuthenticating } = useContext(SessionContext);

  return (
    <nav className="px-4 py-3 z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {session?.user ? <MainNav items={homeConfig.mainNav} /> : <MainNav />}
        {isAuthenticating ? (
          <Button variant="outline">
            <Icons.spinner className="animate-spin mr-2" />
            Wait...
          </Button>
        ) : session?.user ? (
          <div className="flex items-center gap-1 md:gap-1 lg:gap-4">
            <ThemeChange />
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

export default HomeNav;
