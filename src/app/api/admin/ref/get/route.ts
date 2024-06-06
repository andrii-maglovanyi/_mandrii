import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Redirect {
  url: string;
  hits: number;
}

export async function GET() {
  try {
    const allKeys = await kv.keys("*");
    const allRedirects: { topic: string; url: string; hits: number }[] = [];

    for (const topic of allKeys) {
      const redirect = await kv.get<Redirect>(topic);
      if (redirect) {
        allRedirects.push({ topic, url: redirect.url, hits: redirect.hits });
      }
    }

    return NextResponse.json(allRedirects);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
