"use client";
import { Icons } from "@/components/Icons";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";
import React from "react";

const EditFormNav = () => {
  return (
    <nav className="px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4 ">
        <Icons.backArrow className=" h-8 w-8" />
        <span>Back</span>
      </Link>
      <UserAvatar />
    </nav>
  );
};

export default EditFormNav;
