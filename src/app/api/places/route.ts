import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const lat = parseFloat(url.searchParams.get("lat") || "0");
    const lng = parseFloat(url.searchParams.get("lng") || "0");
    const category = url.searchParams.get("category") || "";
    const distance = parseFloat(url.searchParams.get("distance") || "1000");

    const client = await clientPromise;
    const db = client.db("mandrii");

    const query: Record<string, unknown> = {};
    if (category) {
      query.category = category;
    }
    query.geo = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: distance,
      },
    };

    const places = await db.collection("places").find(query).toArray();
    const totalPlacesCount = await db.collection("places").countDocuments();

    return NextResponse.json({ places, totalPlacesCount });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
