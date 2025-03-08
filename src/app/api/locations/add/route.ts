import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib";
import { geocodeAddress } from "./geo";
import { saveLocation, Ukrainian_Locations_Data } from "./location";
import slugify from "slugify";
import { processAndUploadImage } from "./images";
import { saveUser } from "./user";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.formData();
    let body = Object.fromEntries(data);

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
      geo: {
        type: "Point",
        coordinates,
      },
      name: body.name.toString().trim(),
      description_en: body.descriptionEn.toString(),
      description_uk: body.descriptionUk.toString(),
      website: body.website.toString().trim(),
      emails: [body.email.toString().trim()],
      category: body.category.toString(),
      slug: slugify(`${body.name} ${area}`, {
        lower: true,
        strict: true,
      }),
      status: "pending",
      phone_numbers: [],
      images: [],
      user_id: 0,
    };

    Object.entries(body).forEach(([key, value]: any) => {
      if (key.startsWith("phoneNumbers")) {
        locationData.phone_numbers?.push(value);
      }
    });

    const imageFiles: Array<Blob> = [];
    Object.entries(body).forEach(([key, value]: any) => {
      if (key.startsWith("image")) {
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

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
