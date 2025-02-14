"use client";

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
    <button
      className="border-2 border-amber-400 rounded-full text-amber-400 h-10 w-10 uppercase text-xl font-bold font-leOsler pointer "
      onClick={switchLanguage}
    >
      {currentLang === "uk" ? "en" : "uk"}
    </button>
  );
}
