import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";

export async function PATCH(req: Request) {
  try {
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

    if (!session.user.isAdmin) {
      return NextResponse.json({ error: "No permissions" }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing recordId or status" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("mandrii");
    const collection = db.collection("places");

    const filter = { _id: new ObjectId(String(id)) };
    const update = { $set: { status } };

    const result = await collection.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Record updated successfully",
      updatedId: id,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
