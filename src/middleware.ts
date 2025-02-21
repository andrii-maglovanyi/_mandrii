import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./dictionaries/i18n-config";
import { kv } from "@vercel/kv";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY!;

interface Redirect {
  url: string;
  hits: number;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname, hostname } = url;
  const { locales, defaultLocale } = i18n;

  if (hostname.startsWith("ref.")) {
    const rawTopic = pathname.slice(1);

    if (!rawTopic) {
      return NextResponse.next();
    }

    const topic = decodeURI(rawTopic);

    try {
      const redirect = await kv.get<Redirect>(`ref:${topic}`);

      if (!redirect) {
        return NextResponse.next();
      }

      redirect.hits += 1;
      await kv.set(`ref:${topic}`, redirect);

      return NextResponse.redirect(redirect.url);
    } catch (error) {
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }

  if (hostname === "admin.mandrii.com") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/ref")) {
    const apiKey = request.headers.get("x-api-key");

    if (!apiKey || apiKey !== ADMIN_API_KEY) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const pathnameHasLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|admin|auth|qr|images|_next|assets|favicon.ico).*)", // Main middleware
    "/api/admin/:path*", // Matches /api/admin/*
    "/:topic*", // Matches /ref.mandrii.com/*
  ],
};
