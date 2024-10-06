import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const SignIn = () => {
  return (
    <Button onClick={() => signIn()} variant="link" className="text-md z-10">
      Sign In
    </Button>
  );
};

export default SignIn;
