import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Redirect {
  url: string;
  hits: number;
}

export async function POST(request: Request) {
  const { topic, newUrl } = await request.json();

  if (!topic || !newUrl) {
    return NextResponse.json(
      { error: "Topic and new URL are required" },
      { status: 400 }
    );
  }

  try {
    const redirect = await kv.get<Redirect>(topic);

    if (!redirect) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    redirect.url = newUrl;
    await kv.set(topic, redirect);

    return NextResponse.json({ message: "URL updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
