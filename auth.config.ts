import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Session, User } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import clientPromise from "./db/clientPromise";

const providers: Provider[] = [Google];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers,
  secret: process.env.NEXT_AUTH_SECRET ?? "secret",
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (!user.email) {
        return false;
      }
      return true;
    },
    async session({ session, user }: { session: Session; user: User }) {
      return session;
    },
  },
};
