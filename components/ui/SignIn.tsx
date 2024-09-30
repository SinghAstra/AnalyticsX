import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./button";

const SignIn = () => {
  return (
    <Button onClick={() => signIn()} variant="link" className="text-md z-10">
      Sign in
    </Button>
  );
};

export default SignIn;
