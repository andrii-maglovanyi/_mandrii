import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./dictionaries/i18n-config";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;
  const { locales, defaultLocale } = i18n;

  const pathnameHasLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  return NextResponse.redirect(
    new URL(
      `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    )
  );
}

export const config = {
  matcher: ["/((?!api|qr|images|_next|assets|favicon.ico).*)"],
};
