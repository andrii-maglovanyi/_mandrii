import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract client IP address from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip");

    // Validate the extracted IP
    if (!ip || !isPublicIP(ip)) {
      return NextResponse.json(
        { error: "Invalid or private IP address" },
        { status: 400 }
      );
    }

    // Set up a timeout for the fetch request
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    // Call IP-API.com (free tier does not require API key)
    const locationResponse = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,continent,country,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting`,
      { signal: controller.signal }
    );

    clearTimeout(timeout); // Clear timeout if request succeeds

    // Handle API response failure
    if (!locationResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch location data" },
        { status: locationResponse.status }
      );
    }

    const locationData = await locationResponse.json();

    // Check if IP-API returned an error
    if (locationData.status === "fail") {
      return NextResponse.json(
        { error: locationData.message || "Failed to retrieve location data" },
        { status: 400 }
      );
    }

    return NextResponse.json(locationData);
  } catch (error: unknown) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      console.error("Error fetching location data:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error type:", error);
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      return NextResponse.json({ error: "Request timeout" }, { status: 504 });
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Function to check if an IP is public
function isPublicIP(ip: string): boolean {
  return !/^(10\.|172\.16\.|192\.168\.|127\.0\.|::1|0\.0\.0\.0|255\.255\.255\.255)/.test(
    ip
  );
}
