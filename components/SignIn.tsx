import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const SignIn = () => {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="link"
      className="text-md z-10"
    >
      Sign in
    </Button>
  );
};

export default SignIn;
