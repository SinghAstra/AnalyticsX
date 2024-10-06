import { Icons } from "@/components/Icons";
import Link from "next/link";
import React from "react";

const AuthNav = () => {
  return (
    <nav className="px-4 py-3">
      <Link href="/" className="flex items-center gap-4 ">
        <Icons.backArrow className=" h-8 w-8" />
        <span>Back</span>
      </Link>
    </nav>
  );
};

export default AuthNav;
