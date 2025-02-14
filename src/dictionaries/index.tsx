import "server-only";
import { Locale } from "./i18n-config";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  uk: () => import("./uk.json").then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<typeof dictionaries.uk>>;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.uk();
