import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import ChatPage from "./chat";
import LandingPage from "./home";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (session) return <ChatPage />;

  return <LandingPage />;
};

export default HomePage;
