import "../globals.css";

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";

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

const nunito = Nunito({
  display: "swap",
  preload: true,
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  description: "Букви та картинки",
  title: "Мандрій",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${nunito.variable}
          font-nunito
          ${leOsler.variable}
          font-leOsler
        `}
      >
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
