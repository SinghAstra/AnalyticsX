import { SessionProvider } from "@/context/SessionContext";
import type { Metadata } from "next";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sign In | AutoForm",
  description: "Sign In to your account",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      <NextAuthProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextAuthProvider>
    </div>
  );
}
