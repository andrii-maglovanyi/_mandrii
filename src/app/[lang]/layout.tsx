import type { Metadata } from "next";
import localFont from "next/font/local";
import { Arsenal, Nunito } from "next/font/google";
import "../globals.css";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { NotificationsTicker } from "@/features/NotificationsTicker/NotificationsTicker";
import { LanguageProvider } from "@/context/LanguageContext";
import { Language } from "@/types";
import { getDictionary } from "@/dictionaries";
import { Heading } from "@/features/Heading/Heading";
import { Column } from "@/components";
import { CookieConsentBar } from "@/features/CookieConsentBar/CookieConsentBar";
import Providers from "@/components/Providers";

const kyivType = localFont({
  display: "swap",
  preload: true,
  src: [
    {
      path: "../../../public/assets/fonts/KyivTypeSans-Bold-.ttf",
      weight: "700",
    },
  ],
  variable: "--font-kyivType",
});

const leOsler = localFont({
  display: "swap",
  preload: true,
  src: [
    {
      path: "../../../public/assets/fonts/LeOsler_Sharp-Light.ttf",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/LeOsler_Sharp-Regular.ttf",
      weight: "700",
    },
  ],
  variable: "--font-leOsler",
});

const arsenal = Arsenal({
  display: "swap",
  preload: true,
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-arsenal",
});

const nunito = Nunito({
  display: "swap",
  preload: true,
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mandrii.com"),
  title: "Мандрій",
  description: "мандруй / мрій / дій",
  openGraph: {
    images: ["/assets/logo/mandrii.png"],
    type: "website",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Language>;
}>) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return (
    <html>
      <body
        lang={lang}
        className={`font-kyivType ${kyivType.variable} ${nunito.variable} font-nunito ${leOsler.variable} font-arsenal ${arsenal.variable} font-leOsler min-h-screen flex flex-col`}
      >
        <Providers>
          <LanguageProvider lang={lang} dict={dict}>
            <NotificationsProvider>
              <Column className="relative flex-1 mt-14 sm:mt-16 md:mt-20 max-w-screen overflow-x-clip">
                {children}
              </Column>
              <Heading />

              <NotificationsTicker />
            </NotificationsProvider>
            <CookieConsentBar />
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
