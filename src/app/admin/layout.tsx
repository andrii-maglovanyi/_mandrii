import "../globals.css";

import { Nunito } from "next/font/google";
import localFont from "next/font/local";

import { NotificationsProvider } from "@/context/NotificationsContext";
import ApolloWrapper from "@/lib/apollo-provider";

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
        <ApolloWrapper>
          <NotificationsProvider>
            <div className="relative">{children}</div>
          </NotificationsProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
