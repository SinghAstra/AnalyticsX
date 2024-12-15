import Providers from "@/components/providers/provider";
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
      <body className={`min-h-screen bg-background  ${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
