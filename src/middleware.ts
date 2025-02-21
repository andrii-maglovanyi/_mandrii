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
  matcher: ["/((?!api|admin|auth|qr|images|_next|assets|favicon.ico).*)"],
};
