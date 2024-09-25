import { LayoutDashboard, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";
import ThemeChange from "./ThemeChange";

const Header = () => {
  const session = useSession();
  return (
    <nav className=" border-b-[.25px] border-[#3f3e3e] px-4 py-3">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/">
          <h1 className="md:text-2xl lg:text-2xl">AutoForm</h1>
        </Link>
        <div>
          {!session?.user ? (
            <div className="flex items-center gap-1 md:gap-1 lg:gap-4">
              <ThemeChange />
              <Link href="/view-forms">
                <Button variant="outline">
                  <span className="hidden md:inline">Dashboard</span>{" "}
                  <LayoutDashboard className="md:hidden" />
                </Button>
              </Link>
              {/* {session.user.name && session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={32}
                  height={32}
                  className="rounded-full hidden md:block"
                />
              )} */}
              {/* <SignOut /> */}
              <Button type="submit">
                <LogOut className="md:hidden" />
                <span className="hidden md:block">Sign out</span>
              </Button>
            </div>
          ) : (
            <div className="flex">
              <ThemeChange />
              <Link href="/api/auth/signin">
                <Button variant="link" className="text-md">
                  Sign in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
