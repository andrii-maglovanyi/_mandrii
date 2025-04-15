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
        font-leOsler border-ukraine-yellow !text-ukraine-yellow h-8 w-8 border
        bg-transparent text-base font-semibold uppercase
        hover:!text-cta-800 hover:bg-ukraine-yellow
        dark:hover:!text-cta-800 dark:hover:bg-ukraine-yellow
      `}
      onClick={switchLanguage}
    >
      {currentLang === "uk" ? "en" : "uk"}
    </Button>
  );
}
