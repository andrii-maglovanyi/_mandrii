"use client";

import { usePathname,useRouter } from "next/navigation";

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
        hover:bg-primary-0/10 hover:text-yellow-400
        font-leOsler h-8 w-8 border border-yellow-400 bg-transparent text-base
        font-semibold text-yellow-400 uppercase
        active:bg-yellow-300/10
      `}
      onClick={switchLanguage}
    >
      {currentLang === "uk" ? "en" : "uk"}
    </Button>
  );
}
