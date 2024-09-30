import Header from "@/components/Header";
import { GridSmallBackground } from "@/components/ui/GridSmallBackground";
import { SessionProvider } from "@/context/SessionContext";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

export default async function Home() {
  return (
    <NextAuthProvider>
      <SessionProvider>
        <div className="min-h-screen flex flex-col relative">
          <GridSmallBackground />
          <Header />
          <main className="antialiased flex-1 flex flex-col items-center justify-center w-full h-full p-10">
            <h1 className="text-3xl text-center tracking-tighter sm:text-3xl md:text-6xl">
              Streamline Your Form Creation Process!
            </h1>
            <p className="max-w-[600px] text-center text-gray-500 md:text-xl sm:text-sm">
              Effortlessly create, customize, and manage forms with AI.
              <br /> Dive into powerful analytics and insights with ease.
            </p>
          </main>
        </div>
      </SessionProvider>
    </NextAuthProvider>
  );
}
