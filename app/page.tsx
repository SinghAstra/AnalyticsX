import { authOptions } from "@/lib/auth-options";
import { generateUUID } from "@/lib/utils";
import { getServerSession } from "next-auth";
import ChatPage from "./chat";
import LandingPage from "./home";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return <LandingPage />;

  const id = generateUUID();

  return <ChatPage id={id} isNew={true} />;
};

export default HomePage;
