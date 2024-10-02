"use client";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { SessionContext } from "@/context/SessionContext";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import React, { useContext } from "react";

const initialState: {
  status: string;
  message: string;
  data?: any;
} = {
  status: "",
  message: "",
};

const GetStarted = () => {
  const { session, isAuthenticating } = useContext(SessionContext);
  const { toast } = useToast();

  const handleGetStarted = () => {
    if (session?.user) {
      toast({ description: "You are authenticated" });
    } else {
      signIn();
    }
  };

  return isAuthenticating ? (
    <Button variant="outline" size="lg">
      <Icons.spinner className="animate-spin mr-2" />
      Wait...
    </Button>
  ) : (
    <Button onClick={handleGetStarted} className="cursor-pointer lg">
      Get Started
    </Button>
  );
};

export default GetStarted;
