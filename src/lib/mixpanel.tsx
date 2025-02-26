import { nanoid } from "nanoid";

interface LocationData {
  city?: string;
  regionName?: string;
  country?: string;
  continent?: string;
}

interface EventProperties {
  [key: string]: any;
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

    const additionalProperties: Record<string, any> = {
      distinct_id: userID,
      $user_id: userID,
      $browser: userAgent,
      $browser_version: navigator?.appVersion ?? "Unknown",
      $city: locationData?.city ?? "Unknown",
      $region: locationData?.regionName ?? "Unknown",
      $continent: locationData?.continent ?? "Unknown",
      mp_country_code: locationData?.country ?? "Unknown",
      $current_url: window.location.href,
      $device: platform,
      $device_id: userAgent,
      $initial_referrer: document.referrer || undefined,
      $initial_referring_domain: document.referrer
        ? new URL(document.referrer).hostname
        : undefined,
      $os: platform,
      $screen_height: window.screen?.height ?? 0,
      $screen_width: window.screen?.width ?? 0,
      ...utmParams,
    };

    const properties: Record<string, any> = {
      ...eventProperties,
      ...additionalProperties,
    };

    const requestBody = JSON.stringify({ event: eventName, properties });

    if (navigator?.sendBeacon) {
      navigator.sendBeacon("/api/mixpanel", requestBody);
    } else {
      try {
        await fetch("/api/mixpanel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: requestBody,
        });
      } catch (error) {
        console.log("Error sending Mixpanel event:", error);
      }
    }
  }, 500);
};
