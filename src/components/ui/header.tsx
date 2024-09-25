import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="flex flex-wrap justify-between items-center border-gray-200 border bottom-1 px-4 py-3">
      <div className="mx-auto max-w-screen-xl ">
        <Link href="/">
          <h1 className="md:text-2xl">AutoForm</h1>
        </Link>
        <div>
          {/* {session?.user ? (
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
                    className="rounded-full hidden md:block"
                  />
                )}
                <SignOut />
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
            )} */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
