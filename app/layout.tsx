import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
