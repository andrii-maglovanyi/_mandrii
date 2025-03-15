import { kv } from "@vercel/kv";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { MiddlewareFactory } from "./stackHandler";

interface Redirect {
  hits: number;
  url: string;
}

export const withRef: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const { hostname, pathname } = request.nextUrl;

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

        return Response.redirect(redirect.url);
      } catch (error) {
        return Response.json(
          { error: `Internal Server Error: ${error}` },
          { status: 500 }
        );
      }
    }

    return next(request, _next);
  };
};
