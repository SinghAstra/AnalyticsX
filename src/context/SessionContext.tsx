"use client";
import { useSession } from "next-auth/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  email: string;
  id: string;
  image: string;
  name: string;
}

interface Session {
  expires: string;
  user: User;
}

interface SessionContextType {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  loading: true,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  console.log("session --sessionContext is ", session);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setUserId(session.user.id);
    } else {
      setUserId(null);
    }
  }, [session, status]);

  return (
    <SessionContext.Provider value={{ session, loading: status === "loading" }}>
      {children}
    </SessionContext.Provider>
  );
};

// A custom hook to access the session context
export const useSessionContext = () => useContext(SessionContext);
