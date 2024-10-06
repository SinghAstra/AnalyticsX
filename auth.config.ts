import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
];

export const providerMap = providers
  .map((provider) => {
    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== "credentials");

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers,
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.image = token.picture;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
};
