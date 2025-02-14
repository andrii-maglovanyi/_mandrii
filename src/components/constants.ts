import { CONNOTATIONS } from "../types";
import { hexToRgb } from "../utils";

const connotationMap = {
  [CONNOTATIONS.announcement]: "announcement",
  [CONNOTATIONS.alert]: "alert",
  [CONNOTATIONS.cta]: "cta",
  [CONNOTATIONS.info]: "information",
  [CONNOTATIONS.primary]: "neutral",
  [CONNOTATIONS.success]: "success",
  [CONNOTATIONS.warning]: "warning",
};

const wrapWithCSSVars = (
  colors: Record<CONNOTATIONS, Record<number, string>>
) => {
  const wrapped = Object.keys(connotationMap).reduce(
    (acc, key) => ({ ...acc, [key]: {} }),
    {} as { [K in CONNOTATIONS]: Record<number, string> }
  );

  Object.entries(colors).forEach(([key, shades]) => {
    const connotation = key as CONNOTATIONS;
    wrapped[connotation] = Object.fromEntries(
      Object.entries(shades).map(([shade, value]) => [
        shade,
        `var(--dp-color-${
          connotationMap[connotation]
        }-${shade}, var(--vvd-color-${
          connotationMap[connotation]
        }-${shade}, ${hexToRgb(value)}))`,
      ])
    );
  });

  return wrapped;
};

const DEFAULT_COLORS = {
  [CONNOTATIONS.announcement]: {
    100: "#ffdcf7",
    200: "#f8b9e7",
    300: "#fb8fd8",
    400: "#e560bb",
    50: "#ffedfb",
    500: "#d6219c",
    600: "#bb1e89",
    700: "#8f1669",
    800: "#620256",
    900: "#32082c",
    950: "#1d031a",
  },
  [CONNOTATIONS.alert]: {
    100: "#fedfdf",
    200: "#ffbbbb",
    300: "#fe9696",
    400: "#f75959",
    50: "#ffeef2",
    500: "#e61d1d",
    600: "#cd0d0d",
    700: "#9f0202",
    800: "#6e0000",
    900: "#3e0004",
    950: "#250004",
  },
  [CONNOTATIONS.cta]: {
    100: "#ece2fa",
    200: "#dcc1fc",
    300: "#cba1fa",
    400: "#b27bf2",
    50: "#f5f0fd",
    500: "#9941ff",
    600: "#871eff",
    700: "#6405d1",
    800: "#440291",
    900: "#26044d",
    950: "#140623",
  },
  [CONNOTATIONS.info]: {
    100: "#d3e9fc",
    200: "#9dd2fe",
    300: "#65baff",
    400: "#2997f0",
    50: "#e8f4fb",
    500: "#0276d5",
    600: "#0e65c2",
    700: "#094a9e",
    800: "#0e306d",
    900: "#071939",
    950: "#040d1d",
  },
  [CONNOTATIONS.primary]: {
    0: `#FFFFFF`,
    100: "#E6E6E6",
    1000: "#000000",
    200: "#cccccc",
    300: "#b3b3b3",
    400: "#929292",
    50: "#F2F2F2",
    500: "#757575",
    600: "#666666",
    700: "#4d4d4d",
    800: "#333333",
    900: "#1a1a1a",
    950: "#0d0d0d",
  },
  [CONNOTATIONS.success]: {
    100: "#cfeed4",
    200: "#86e090",
    300: "#53ca6a",
    400: "#30a849",
    50: "#e1f8e5",
    500: "#1c8731",
    600: "#167629",
    700: "#155923",
    800: "#183a1e",
    900: "#0a1e11",
    950: "#060f09",
  },
  [CONNOTATIONS.warning]: {
    100: "#fdeaa0",
    200: "#facc4b",
    300: "#fa9f00",
    400: "#e07902",
    50: "#fdf5d4",
    500: "#be5702",
    600: "#a64c03",
    700: "#893000",
    800: "#522801",
    900: "#2a1502",
    950: "#150b01",
  },
};

const wrappedColors = wrapWithCSSVars(DEFAULT_COLORS);

export const COLORS = {
  ...wrappedColors,
  accent: {
    check: {
      faintDark: `var(--vvd-checkbox-accent-primary-increment, ${
        wrappedColors[CONNOTATIONS.primary][100]
      })`,
      faintLight: `var(--vvd-checkbox-accent-primary-increment, ${
        wrappedColors[CONNOTATIONS.primary][700]
      })`,
      primary: `var(--vvd-checkbox-accent-primary, ${
        wrappedColors[CONNOTATIONS.primary][1000]
      })`,
      text: `var(--vvd-checkbox-accent-primary-text, ${
        wrappedColors[CONNOTATIONS.primary][0]
      })`,
    },
    tab: {
      faint: `var(--vvd-tab-accent-faint, ${
        wrappedColors[CONNOTATIONS.primary][50]
      })`,
      primary: `var(--vvd-tab-accent-primary, ${
        wrappedColors[CONNOTATIONS.primary][950]
      })`,
    },
  },
  fixed: {
    ...DEFAULT_COLORS,
  },
};
