"use client";

import { Dictionary } from "@/dictionaries";
import { Language } from "@/types";
import { createContext, ReactNode } from "react";

interface LanguageContextType {
  lang: Language["lang"];
  dict: Dictionary;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  lang,
  dict,
  children,
}: LanguageContextType & {
  children: ReactNode;
}) => (
  <LanguageContext.Provider value={{ lang, dict }}>
    {children}
  </LanguageContext.Provider>
);
