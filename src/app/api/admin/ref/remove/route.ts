import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Redirect {
  url: string;
  hits: number;
}

export async function POST(request: Request) {
  const { topic, url } = await request.json();

  if (!topic || !url) {
    return NextResponse.json(
      { error: "Topic and URL are required" },
      { status: 400 }
    );
  }

  try {
    const existingRedirect = await kv.get<Redirect>(topic);

    if (existingRedirect) {
      return NextResponse.json(
        { error: "Topic already exists" },
        { status: 409 }
      );
    }

    const redirect: Redirect = { url, hits: 0 };
    await kv.set(topic, redirect);

    return NextResponse.json(
      { message: "URL added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
