import { kv } from "@vercel/kv";

interface Redirect {
  url: string;
  hits: number;
}

const getKey = (topic: string) => `ref:${topic}`;

const scanAllKeys = async (): Promise<string[]> => {
  const allKeys: string[] = [];
  let cursor = 0;

  do {
    const [nextCursor, keys] = await kv.scan(cursor, { match: "ref:*" });
    cursor = Number(nextCursor);
    allKeys.push(...keys);
  } while (cursor !== 0);

  return allKeys;
};

export async function DELETE(request: Request) {
  const { topic } = await request.json();

  if (!topic) {
    return Response.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    const key = getKey(topic);
    const redirect = await kv.get(key);

    if (!redirect) {
      return Response.json({ error: "Topic not found" }, { status: 404 });
    }

    await kv.del(key);

    return Response.json({ message: "URL removed successfully" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allKeys = await scanAllKeys();
    const allRedirects: { topic: string; url: string; hits: number }[] = [];

    for (const key of allKeys) {
      const redirect = await kv.get<Redirect>(key);
      if (redirect) {
        allRedirects.push({
          topic: key.replace("ref:", ""),
          url: redirect.url,
          hits: redirect.hits,
        });
      }
    }

    return Response.json(allRedirects);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { topic, url } = await request.json();

  if (!topic || !url) {
    return Response.json(
      { error: "Topic and URL are required" },
      { status: 400 }
    );
  }

  try {
    const key = getKey(topic);
    const existingRedirect = await kv.get<Redirect>(key);

    if (existingRedirect) {
      return Response.json({ error: "Topic already exists" }, { status: 409 });
    }

    const redirect: Redirect = { url, hits: 0 };
    await kv.set(key, redirect);

    return Response.json(
      { message: "URL added successfully" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { topic, url } = await request.json();

  if (!topic || !url) {
    return Response.json(
      { error: "Topic and new URL are required" },
      { status: 400 }
    );
  }

  try {
    const key = getKey(topic);
    const redirect = await kv.get<Redirect>(key);

    if (!redirect) {
      return Response.json({ error: "Topic not found" }, { status: 404 });
    }

    redirect.url = url;
    await kv.set(key, redirect);

    return Response.json({ message: "URL updated successfully" });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
