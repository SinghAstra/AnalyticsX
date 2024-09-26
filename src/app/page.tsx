"use client";
import Header from "@/components/ui/header";
import { SessionProvider } from "next-auth/react";
import LandingPage from "./LandingPage/index";

export default function Home() {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="relative p-24 z-10 antialiased flex-1 flex items-center justify-center">
          <LandingPage />
        </main>
      </div>
    </SessionProvider>
  );
}
