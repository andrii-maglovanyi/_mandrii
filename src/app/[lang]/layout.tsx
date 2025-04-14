import "../globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Arsenal } from "next/font/google";
import localFont from "next/font/local";

import { Column } from "@/components";
import Providers from "@/components/Providers";
import { LanguageProvider } from "@/context/LanguageContext";
import { NotificationsProvider } from "@/context/NotificationsContext";
import { getDictionary } from "@/dictionaries";
import { CookieConsentBar } from "@/features/CookieConsentBar/CookieConsentBar";
import { Heading } from "@/features/Heading/Heading";
import { NotificationsTicker } from "@/features/NotificationsTicker/NotificationsTicker";
import ApolloWrapper from "@/lib/apollo-provider";
import { Language } from "@/types";

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
  subsets: ["latin", "cyrillic"],
  variable: "--font-arsenal",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  description: "мандруй / мрій / дій",
  metadataBase: new URL("https://mandrii.com"),
  openGraph: {
    images: ["/assets/logo/mandrii.png"],
    type: "website",
  },
  title: "Мандрій",
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
    <html lang={lang}>
      <body
        lang={lang}
        className={`
          ${arsenal.variable}
          ${leOsler.variable}
          ${kyivType.variable}
          font-arsenal flex min-h-screen flex-col
        `}
      >
        <Providers>
          <LanguageProvider lang={lang} dict={dict}>
            <ApolloWrapper>
              <NotificationsProvider>
                <Column
                  className={`
                    relative mt-14 max-w-screen flex-1 overflow-x-clip
                    sm:mt-16
                    md:mt-20
                  `}
                >
                  {children}
                </Column>
                <Heading />

                <NotificationsTicker />
              </NotificationsProvider>
            </ApolloWrapper>
            <CookieConsentBar />
          </LanguageProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
