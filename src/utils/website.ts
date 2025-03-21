export const isWebsite = (url: string) => {
  if (!url) return false;

  let testUrl = url.trim();
  if (!/^https?:\/\//i.test(testUrl)) {
    testUrl = "https://" + testUrl;
  }

  try {
    const parsed = new URL(testUrl);

    const isValidHost = parsed.hostname.includes(".");
    return isValidHost;
  } catch {
    return false;
  }
};
