import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "";

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user?.email) {
      return NextResponse.json(
        { error: "Missing user email" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mandrii");

    const query: Record<string, unknown> = { userEmail: session.user.email };

    if (category) {
      query.category = category;
    }

    const places = await db
      .collection("places")
      .find(query)
      .sort({
        createdAt: -1,
      })
      .toArray();

    const totalPlacesCount = await db.collection("places").countDocuments();

    return NextResponse.json({ places, totalPlacesCount });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
