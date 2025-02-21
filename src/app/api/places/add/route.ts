import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { MongoClient } from "mongodb";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
import { PlaceData } from "@/types";

const GOOGLE_API_KEY = process.env.NEXT_PRIVATE_GOOGLE_MAPS_API_KEY || "";
const MONGO_URI = process.env.MONGO_URI || "";
const DB_NAME = "mandrii";
const COLLECTION_NAME = "places";
const FILE_FORMAT = "webp";

async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    }
    console.error(`Geocoding failed: ${data.status}`);
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

async function processAndUploadImage(
  file: Buffer,
  fileName: string
): Promise<string | null> {
  try {
    const processedImageBuffer = await sharp(file)
      .resize(1000, 1000, { fit: "cover" })
      .toFormat(FILE_FORMAT)
      .webp({ quality: 80 })
      .toBuffer();

    const blob = await put(fileName, processedImageBuffer, {
      access: "public",
    });

    return new URL(blob.url).pathname.replace(/^\/+/, "");
  } catch (error) {
    console.error("Image processing error:", error);
    return null;
  }
}

async function saveToDatabase(data: PlaceData): Promise<string | null> {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    const result = await collection.insertOne(data);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Database error:", error);
    return null;
  } finally {
    await client.close();
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user?.email) {
    return NextResponse.json({ error: "Missing user email" }, { status: 400 });
  }

  try {
    const data = await request.formData();
    let body = Object.fromEntries(data);

    const name = body.name.toString().trim();
    const address = body.address.toString().trim();
    const descriptionEn = body.descriptionEn.toString();
    const descriptionUk = body.descriptionUk.toString();
    const website = body.website.toString().trim();
    const email = body.email.toString().trim();
    const category = body.category.toString();
    const slug = body.slug.toString();
    const phoneNumbers: Array<string> = [];
    const imageFiles: Array<Blob> = [];
    const imageUrls: Array<string> = [];

    Object.entries(body).forEach(([key, value]: any) => {
      if (key.startsWith("phoneNumbers")) {
        phoneNumbers.push(value);
      }
    });

    Object.entries(body).forEach(([key, value]: any) => {
      if (key.startsWith("image")) {
        imageFiles.push(value);
      }
    });

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadedUrl = await processAndUploadImage(
        buffer,
        `${slug}.${FILE_FORMAT}`
      );

      if (uploadedUrl) imageUrls.push(uploadedUrl);
    }

    const geo = await geocodeAddress(address);
    if (!geo) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const document: PlaceData = {
      name,
      address,
      phone: phoneNumbers,
      email,
      category,
      geo: {
        type: "Point",
        coordinates: [geo.lng, geo.lat],
      },
      images: imageUrls,
      description: { en: descriptionEn, uk: descriptionUk },
      web: website,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
      userEmail: session.user.email,
    };

    const insertedId = await saveToDatabase(document);

    return NextResponse.json(
      { success: true, id: insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
