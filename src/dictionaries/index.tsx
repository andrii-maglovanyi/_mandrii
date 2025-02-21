import "server-only";
import { Locale } from "./i18n-config";

const dictionary = await import("./dict.json").then((module) => module.default);

const dictionaries = {
  base: () => import("./dict.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.base>>;

export const getDictionary = async (
  locale: Locale
): Promise<Record<keyof Dictionary, string>> => {
  const dict = await dictionaries.base();

  if (locale === "en") {
    return Object.keys(dict).reduce((acc, key) => {
      acc[key as keyof Dictionary] = key;
      return acc;
    }, {} as Record<keyof Dictionary, string>);
  } else {
    return dict;
  }
};
