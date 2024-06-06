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

  // Protect admin routes with an API key
  if (url.pathname.startsWith("/api/admin")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Handle subdomain redirects
  if (hostname === "ref.mandrii.com") {
    const topic = url.pathname.slice(1); // Extract the topic from the URL

    if (!topic) {
      return NextResponse.next();
    }

    try {
      const redirect = await kv.get<Redirect>(topic);

      if (!redirect) {
        return NextResponse.next();
      }

      // Increment the hit count
      redirect.hits += 1;
      await kv.set(topic, redirect);

      // Redirect to the specified URL
      return NextResponse.redirect(redirect.url);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*", "/:topic*"],
};
