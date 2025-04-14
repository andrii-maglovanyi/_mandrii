"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components";
import { sendToMixpanel } from "@/lib/mixpanel";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname.startsWith("/en") ? "en" : "uk";

  const switchLanguage = () => {
    sendToMixpanel("switched_language", {
      lang: currentLang === "uk" ? "en" : "uk",
    });

    if (currentLang === "uk") {
      router.push(pathname.replace("/uk", "/en"));
    } else {
      router.push(pathname.replace("/en", "") || "/");
    }
  };

  return (
    <Button
      layout="ghost"
      size="condensed"
      className={`
        font-leOsler h-8 w-8 border border-yellow-500 bg-transparent text-base
        font-semibold text-yellow-500 uppercase
        hover:text-primary-0 hover:bg-yellow-500
        dark:hover:text-primary-0 dark:hover:bg-yellow-500
      `}
      onClick={switchLanguage}
    >
      {currentLang === "uk" ? "en" : "uk"}
    </Button>
  );
}
