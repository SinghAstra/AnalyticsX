"use client";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <Header />
    </SessionProvider>
  );
}
