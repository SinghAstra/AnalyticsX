"use client";
import { SessionContext } from "@/context/SessionContext";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "./button";
import ThemeChange from "./ThemeChange";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Header = () => {
  const { session } = useContext(SessionContext);

  console.log("session --header is ", session);
  return (
    <nav className="px-4 py-3">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/">
          <h1 className="md:text-2xl lg:text-2xl">AutoForm</h1>
        </Link>
        {session?.user ? (
          <div className="flex items-center gap-1 md:gap-1 lg:gap-4">
            <ThemeChange />
            <Link href="/view-forms">
              <Button variant="outline">
                <span className="hidden md:inline">Dashboard</span>{" "}
                <LayoutDashboard className="md:hidden" />
              </Button>
            </Link>
            {session.user.name && session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
                className="rounded-full hidden md:block border-2 border-primary"
              />
            )}
            <SignOut />
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
