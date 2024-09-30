"use server";

import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (session) {
    return new Response(JSON.stringify(session), { status: 200 });
  } else {
    return new Response("Not authenticated user!", { status: 401 });
  }
}
