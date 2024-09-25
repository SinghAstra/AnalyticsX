import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoForm",
  description: "Build & Publish Form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
