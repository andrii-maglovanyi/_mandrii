"use client";

import { createContext, ReactNode } from "react";

import { Dictionary } from "@/dictionaries";
import { Language } from "@/types";

interface LanguageContextType {
  dict: Dictionary;
  lang: Language["lang"];
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
  dict,
  lang,
}: LanguageContextType & {
  children: ReactNode;
}) => (
  <LanguageContext.Provider value={{ dict, lang }}>
    {children}
  </LanguageContext.Provider>
);
