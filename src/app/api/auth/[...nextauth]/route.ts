import client from "@/db/index";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: User;
  }
}

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET ?? "secret",
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) {
        return false;
      }
      return true;
    },
    async session({ session, user }: { session: Session; user: User }) {
      if (user && session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
