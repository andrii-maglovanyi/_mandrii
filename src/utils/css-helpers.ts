import { CONNOTATIONS } from "../types";

const connotationsArray = [
  "-transparent",
  ...Object.values(CONNOTATIONS).map((connotation) => `-${connotation}-`),
];

export const deduplicateClass = (
  defaultClassesString?: string | null,
  customClassesString?: string | null
): string => {
  if (!customClassesString && !defaultClassesString) return "";
  if (!customClassesString) return String(defaultClassesString);
  if (!defaultClassesString) return String(customClassesString);

  const re = /\b((?:[a-zA-Z0-9\:]+-)+)\w*\b/g;

  const customClassPrefixes = new Set(
    [...customClassesString.matchAll(re)].map((match) => match[1])
  );

  const filteredDefaultClassesString = defaultClassesString
    .split(" ")
    .filter((cls) => {
      return ![...customClassPrefixes].some((prefix) => {
        if (cls.startsWith(prefix)) return true;

        if (cls.split("-")[0] !== prefix.split("-")[0]) {
          return false;
        }

        if (!connotationsArray.some((item) => cls.includes(item))) {
          return false;
        }

        if (!connotationsArray.some((item) => prefix.includes(item))) {
          return false;
        }

        return true;
      });
    })
    .join(" ");

  return `${filteredDefaultClassesString} ${customClassesString}`.trim();
};

export const classNames = (
  ...classes: Array<string | boolean | null | undefined>
) => classes.filter((cls) => Boolean(cls) && typeof cls === "string").join(" ");
