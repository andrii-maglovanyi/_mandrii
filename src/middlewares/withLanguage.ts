import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackHandler";

import { i18n } from "../dictionaries/i18n-config";

const excludedRoutes = [
  "admin",
  "api",
  "assets",
  "auth",
  "favicon.ico",
  "images",
  "qr",
  "_next",
];

export const withLanguage: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const url = request.nextUrl;
    const { pathname } = url;
    const { locales, defaultLocale } = i18n;

    if (!excludedRoutes.some((path) => pathname.startsWith(`/${path}`))) {
      const pathnameHasLocale = locales.find(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      );

      if (!pathnameHasLocale) {
        return NextResponse.redirect(
          new URL(
            `/${defaultLocale}${
              pathname.startsWith("/") ? "" : "/"
            }${pathname}`,
            request.url
          )
        );
      }
    }

    return next(request, _next);
  };
};
