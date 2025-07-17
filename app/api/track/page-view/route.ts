import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Handles POST requests to record page view events.
 * Expected request body:
 * {
 *   trackingId: string,
 *   url: string,
 *   title: string,
 *   referrer: string,
 *   sessionId: string,
 *   userId: string
 * }
 */
export async function POST(req: Request) {
  try {
    const { trackingId, url, title, referrer, sessionId, userId } =
      await req.json();

    console.log("data from req.json() is ", {
      trackingId,
      url,
      title,
      referrer,
      sessionId,
      userId,
    });

    if (!trackingId || !url || !sessionId || !userId) {
      return new NextResponse(
        "Missing required fields: trackingId, url, sessionId, or userId",
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      );
    }

    const userAgent = req.headers.get("user-agent");

    // Extract IP address from request headers
    // For Vercel deployments, 'x-forwarded-for' is commonly used to get the client's IP.
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("remote-addr") ||
      req.headers.get("x-real-ip");

    const project = await prisma.project.findUnique({
      where: { trackingId: trackingId },
    });

    console.log("project is ", project);

    if (!project) {
      return new NextResponse("Project not found for the given tracking ID", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const pageView = await prisma.pageView.create({
      data: {
        projectId: project.id,
        url: url,
        title: title || null,
        referrer: referrer || null,
        userAgent: userAgent || null,
        ip: ip ? String(ip).split(",")[0].trim() : null,
      },
    });

    console.log("pageView is ", pageView);

    return NextResponse.json(
      { message: "Page view recorded successfully", pageView },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log("error.stack is ", error.stack);
      console.log("error.message is ", error.message);
    }
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

/**
 * Handles OPTIONS requests (preflight requests for CORS).
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow all origins for development
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400", // Cache preflight response for 24 hours
    },
  });
}
