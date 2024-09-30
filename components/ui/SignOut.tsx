import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./button";

const SignOut = () => {
  return (
    <Button onClick={() => signOut()} className="z-10">
      <LogOut className="md:hidden" />
      <span className="hidden md:block">Sign out</span>
    </Button>
  );
};

export default SignOut;
