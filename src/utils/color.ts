export const hexToRgb = (
  hex: string,
  alpha: number | string = "<alpha-value>",
): string => {
  hex = hex.trim();
  if (hex.startsWith("#")) {
    hex = hex.slice(1);
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (!(Number.isInteger(r) && Number.isInteger(g) && Number.isInteger(b))) {
    throw new Error("Bad Hex");
  }

  if (typeof alpha === "string" && alpha !== "<alpha-value>") {
    alpha = parseInt(alpha, 10);
  }

  if (typeof alpha === "number") {
    if (alpha < 0) {
      alpha = 0;
    } else if (alpha > 1) {
      alpha = 1;
    }
  }

  return `rgb(${r} ${g} ${b} / ${alpha})`;
};
