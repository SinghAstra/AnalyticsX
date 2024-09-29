"use client";
import { SessionProvider } from "@/context/SessionContext";
import type { Metadata } from "next";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AutoForm",
//   description: "Build & Share Form with AI",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <SessionProvider>{children}</SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
