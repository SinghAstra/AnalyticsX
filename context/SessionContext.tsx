"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { createContext, ReactNode } from "react";

interface SessionContextType {
  session: Session | null;
  isAuthenticating: boolean;
}

export const SessionContext = createContext<SessionContextType>({
  session: null,
  isAuthenticating: true,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  return (
    <SessionContext.Provider
      value={{ session, isAuthenticating: status === "loading" }}
    >
      {children}
    </SessionContext.Provider>
  );
};
