import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname.startsWith("/api/admin")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
}

export const config = {
  matcher: "/api/admin/:path*",
};
