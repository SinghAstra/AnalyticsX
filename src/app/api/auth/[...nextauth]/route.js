import client from "@/lib/mongoDB";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async signIn(params) {
      if (!params.user.email) {
        return false;
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
