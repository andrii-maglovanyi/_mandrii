import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({ status: "Event is ignored" });
    }

    if (!process.env.MIXPANEL_TOKEN) {
      return NextResponse.json(
        { error: "Missing Mixpanel token" },
        { status: 500 }
      );
    }

    const Mixpanel = (await import("mixpanel")).default;
    const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    const data = await request.json();
    const { event, properties } = data;

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { error: "Invalid event name" },
        { status: 400 }
      );
    }

    if (!properties || typeof properties !== "object") {
      return NextResponse.json(
        { error: "Invalid properties object" },
        { status: 400 }
      );
    }

    mixpanel.track(event, properties, (err?: Error) => {
      if (err) {
        console.error("Mixpanel tracking failed:", err);
      }
    });

    return NextResponse.json({ status: "Event tracked successfully" });
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      console.error("Error in Mixpanel route:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error type:", error);
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
