import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;

interface Redirect {
  url: string;
  hits: number;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = url.hostname;

  if (url.pathname.startsWith("/api/admin")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (hostname.startsWith("ref.")) {
    const topic = url.pathname.slice(1);

    if (!topic) {
      return NextResponse.next();
    }

    try {
      const redirect = await kv.get<Redirect>(`ref:${topic}`);

      if (!redirect) {
        return NextResponse.next();
      }

      redirect.hits += 1;
      await kv.set(`ref:${topic}`, redirect);

      return Response.redirect(redirect.url);
    } catch (error) {
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/:topic*"],
};
