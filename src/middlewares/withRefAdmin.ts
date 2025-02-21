import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;

export const withRefAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;

    if (pathname.startsWith("/api/ref")) {
      const apiKey = request.headers.get("x-api-key");

      if (!apiKey || apiKey !== ADMIN_API_KEY) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return next(request, _next);
  };
};
