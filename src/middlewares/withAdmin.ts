import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { MiddlewareFactory } from "./stackHandler";

export const withAdmin: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const hostname = request.headers.get("host") || "";
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    const isStaticAsset =
      pathname.startsWith("/_next") || pathname.startsWith("/static");
    const isApiRoute = pathname.startsWith("/api");
    const isPublicFile = /\.(.*)$/.test(pathname); // favicon.ico, etc.

    if (
      hostname.startsWith("admin.") &&
      !isStaticAsset &&
      !isApiRoute &&
      !isPublicFile
    ) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }

    return next(request, _next);
  };
};
