export const isPhoneNumber = (input: string) => {
  if (!input) return false;

  const cleaned = input
    .replace(/\(0\)/g, "")
    .replace(/[^+\d]/g, "")
    .replace(/^00/, "+");

  if (!cleaned.startsWith("+")) return false;

  const digits = cleaned.slice(1);

  const match = digits.match(/^(\d{1,3})(\d{4,12})$/);

  return !!match;
};

export const formatPhoneNumber = (input: string) => {
  if (!input) return "";

  const cleaned = input
    .replace(/\(0\)/g, "")
    .replace(/[^+\d]/g, "")
    .replace(/^00/, "+");

  const match = cleaned.match(/^\+?(\d{1,3})(\d{3,})$/); // country code + rest
  if (!match) return cleaned.startsWith("+") ? cleaned : "+" + cleaned;

  const [, countryCode, rest] = match;

  const chunks = [];
  let i = 0;

  while (i < rest.length) {
    const chunkSize = i === 0 ? 3 : 3;
    chunks.push(rest.slice(i, i + chunkSize));
    i += chunkSize;
  }

  return `+${countryCode} ${chunks.join(" ")}`;
};
