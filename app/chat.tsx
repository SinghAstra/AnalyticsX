import { prisma } from "@/lib/prisma";
import React from "react";

interface ChatPageProps {
  id: string;
  isNew: boolean;
}

const ChatPage = async ({ id, isNew }: ChatPageProps) => {
  const initialMessages = isNew
    ? []
    : await prisma.message.findMany({
        where: {
          chatId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
  return (
    <div className="min-h-screen flex items-center justify-center">
      ChatPage
    </div>
  );
};

export default ChatPage;
