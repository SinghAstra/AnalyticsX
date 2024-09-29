"use client";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import React from "react";

const FormEditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        {children}
      </div>
    </SessionProvider>
  );
};

export default FormEditLayout;
