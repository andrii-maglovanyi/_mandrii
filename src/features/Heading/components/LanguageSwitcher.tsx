"use client";

import { Button } from "@/components";
import { sendToMixpanel } from "@/lib/mixpanel";
import { useRouter, usePathname } from "next/navigation";

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
      className="text-yellow-400 active:bg-yellow-300/10 hover:text-yellow-400 h-8 w-8 text-base uppercase border border-yellow-400 font-semibold bg-transparent hover:bg-primary-0/10 font-leOsler"
      onClick={switchLanguage}
    >
      {currentLang === "uk" ? "en" : "uk"}
    </Button>
  );
}
