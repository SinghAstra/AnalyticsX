"use client";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext } from "react";

interface User {
  email?: string | null | undefined;
  id: string;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

interface Session {
  expires: string;
  user: User;
}

interface SessionContextType {
  session: Session | null;
  isAuthenticating: boolean;
}

const SessionContext = createContext<SessionContextType>({
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

export const useSessionContext = () => useContext(SessionContext);
