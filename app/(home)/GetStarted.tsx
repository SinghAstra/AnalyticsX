"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { SessionContext } from "@/context/SessionContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useContext } from "react";

const GetStarted = () => {
  const { isAuthenticating } = useContext(SessionContext);

  return isAuthenticating ? (
    <Button variant="outline" size="lg">
      <Icons.spinner className="animate-spin mr-2" />
      Wait...
    </Button>
  ) : (
    <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
      Get Started
    </Link>
  );
};
export default GetStarted;
