import { TailwindIndicator } from "@/components/Tailwind-Indicator";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
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
