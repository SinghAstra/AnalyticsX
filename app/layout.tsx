import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/SessionContext";
import type { Metadata } from "next";
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoForm",
  description: "Build & Share Form with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-background antialiased relative ${inter.className}`}
      >
        <NextAuthProvider>
          <SessionProvider>
            <GridSmallBackground />
            {children}
            <Toaster />
          </SessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
