import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface Redirect {
  url: string;
  hits: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    // Fetch the redirect information from Vercel KV
    const redirect = await kv.get<Redirect>(topic);

    if (!redirect) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
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
