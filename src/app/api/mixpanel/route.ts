import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Ensure Mixpanel Token Exists
    if (!process.env.MIXPANEL_TOKEN) {
      return NextResponse.json(
        { error: "Missing Mixpanel token" },
        { status: 500 }
      );
    }

    // Import Mixpanel dynamically (only on the server)
    const Mixpanel = (await import("mixpanel")).default;
    const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    // Parse request body
    const data = await request.json();
    const { event, properties } = data;

    // Validate event name
    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { error: "Invalid event name" },
        { status: 400 }
      );
    }

    // Validate properties object
    if (!properties || typeof properties !== "object") {
      return NextResponse.json(
        { error: "Invalid properties object" },
        { status: 400 }
      );
    }

    // Track the event in Mixpanel with proper callback typing
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
