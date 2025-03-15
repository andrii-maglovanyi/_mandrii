import { nanoid } from "nanoid";

interface LocationData {
  city?: string;
  continent?: string;
  country?: string;
  regionName?: string;
}

interface EventProperties {
  [key: string]: unknown;
}

let cachedUserID: string | null = null;
let debounceTimer: NodeJS.Timeout | null = null;

function getUserID(): string {
  if (cachedUserID) return cachedUserID;

  let userID = localStorage.getItem("userID");
  if (!userID) {
    userID = nanoid();
    localStorage.setItem("userID", userID);
  }

  cachedUserID = userID;
  return userID;
}

export const sendToMixpanel = (
  eventName: string,
  eventProperties?: EventProperties
): void => {
  if (window.location.hostname === "localhost") {
    return;
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    let locationData: LocationData = {};

    try {
      const locationResponse = await fetch("/api/proxy");
      if (locationResponse.ok) {
        locationData = (await locationResponse.json()) as LocationData;
      } else {
        console.log("Could not fetch location.");
      }
    } catch (error) {
      console.log("Could not fetch location:", error);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string | undefined> = Object.fromEntries(
      [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "id",
      ].map((key) => [key, urlParams.get(key) || undefined])
    );

    const userID: string = getUserID();
    const userAgent: string = navigator?.userAgent ?? "Unknown";
    const platform: string = navigator?.platform ?? "Unknown";

    const additionalProperties: Record<string, unknown> = {
      $browser: userAgent,
      $browser_version: navigator?.appVersion ?? "Unknown",
      $city: locationData?.city ?? "Unknown",
      $continent: locationData?.continent ?? "Unknown",
      $current_url: window.location.href,
      $device: platform,
      $device_id: userAgent,
      $initial_referrer: document.referrer || undefined,
      $initial_referring_domain: document.referrer
        ? new URL(document.referrer).hostname
        : undefined,
      $os: platform,
      $region: locationData?.regionName ?? "Unknown",
      $screen_height: window.screen?.height ?? 0,
      $screen_width: window.screen?.width ?? 0,
      $user_id: userID,
      distinct_id: userID,
      mp_country_code: locationData?.country ?? "Unknown",
      ...utmParams,
    };

    const properties: Record<string, unknown> = {
      ...eventProperties,
      ...additionalProperties,
    };

    const requestBody = JSON.stringify({ event: eventName, properties });

    if (navigator?.sendBeacon) {
      navigator.sendBeacon("/api/mixpanel", requestBody);
    } else {
      try {
        await fetch("/api/mixpanel", {
          body: requestBody,
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });
      } catch (error) {
        console.log("Error sending Mixpanel event:", error);
      }
    }
  }, 500);
};
