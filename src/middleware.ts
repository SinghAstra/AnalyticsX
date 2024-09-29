import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

  console.log("token is ", token);

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  // Attach user information to the request for later use
  //   req.user = { id: token.id, email: token.email };

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/:path"],
};
