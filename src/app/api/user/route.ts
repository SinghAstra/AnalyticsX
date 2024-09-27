"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    return new Response(JSON.stringify(session), { status: 200 });
  } else {
    return new Response("Not authenticated user!", { status: 401 });
  }
}
