import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import slugify from "slugify";

import { authOptions } from "@/lib";
import {
  Ukrainian_Location_Categories_Enum,
  Ukrainian_Location_Statuses_Enum,
} from "@/types";

import { geocodeAddress } from "./geo";
import { processAndUploadImage } from "./images";
import { saveLocation, Ukrainian_Locations_Data } from "./location";
import { saveUser } from "./user";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    const body = Object.fromEntries(data);

    const geo = await geocodeAddress(
      body.address.toString().trim(),
      process.env.NEXT_PRIVATE_GOOGLE_MAPS_API_KEY || ""
    );

    if (!geo) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const { area, coordinates, ...geoData } = geo;

    const locationData: Ukrainian_Locations_Data = {
      ...geoData,
      category: body.category as Ukrainian_Location_Categories_Enum,
      description_en: body.descriptionEn.toString(),
      description_uk: body.descriptionUk.toString(),
      emails: [body.email.toString().trim()],
      geo: {
        coordinates,
        type: "Point",
      },
      images: [],
      name: body.name.toString().trim(),
      phone_numbers: [],
      slug: slugify(`${body.name} ${area}`, {
        lower: true,
        strict: true,
      }),
      status: Ukrainian_Location_Statuses_Enum.Pending,
      user_id: 0,
      website: body.website.toString().trim(),
    };

    Object.entries(body).forEach(([key, value]: [string, string | Blob]) => {
      if (key.startsWith("phoneNumbers") && typeof value === "string") {
        locationData.phone_numbers?.push(value);
      }
    });

    const imageFiles: Array<Blob> = [];
    Object.entries(body).forEach(([key, value]: [string, string | Blob]) => {
      if (key.startsWith("image") && typeof value === "object") {
        imageFiles.push(value);
      }
    });

    for (const file of imageFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadedUrl = await processAndUploadImage(
        buffer,
        locationData.slug
      );

      if (uploadedUrl) {
        locationData.images?.push(uploadedUrl);
      }
    }

    locationData.user_id = await saveUser(session.user);

    const id = await saveLocation(locationData);

    return NextResponse.json({ id, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
