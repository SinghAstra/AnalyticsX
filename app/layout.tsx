import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import type { Metadata } from "next";
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
      <body className={inter.className}>
        <GridSmallBackground />
        {children}
      </body>
    </html>
  );
}
