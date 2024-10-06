import { TailwindIndicator } from "@/components/Tailwind-Indicator";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SinghAstra Blog",
  description: "SinghAstra Blog",
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
        <SessionProvider>
          <GridSmallBackground />
          {children}
          <Toaster />
          <TailwindIndicator />
        </SessionProvider>
      </body>
    </html>
  );
}
