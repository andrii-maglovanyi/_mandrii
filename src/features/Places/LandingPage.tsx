"use client";

import { Column, H1, Icon, Phrase, Row } from "@/components";
import { Button } from "@/components/Button/Button";
import { FORM_ID } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { sendToMixpanel } from "@/lib/mixpanel";

export const LandingPage = () => {
  const { lang, dict } = useLanguage();
  const router = useRouter();

  const { landingPage: lp } = dict;

  useEffect(() => {
    sendToMixpanel("page_view");
  }, []);

  return (
    <Row className="grow justify-center -mt-8">
      <div className="w-screen h-full absolute z-[-100] ">
        <Image
          className="object-cover h-full w-full"
          src="/assets/places/prapor.webp"
          alt="Background"
          fill
          priority
        />

        <div className="mt-64 absolute inset-0 bg-gradient-to-b from-transparent to-white" />
      </div>

      <Column className="max-w-screen-md text-center items-center justify-center pb-24">
        <H1 className="font-leOsler font-bold mb-28 text-primary-0 text-9xl mt-20">
          {lp.title}
        </H1>
        <Column className="text-lg">
          <Phrase className="font-semibold">{lp.body}</Phrase>
          <Row className="mt-8">💙 {lp.goalFindPlace}</Row>
          <Row>💛 {lp.goalSupportPlace}</Row>
          <Row>🤝 {lp.goalStayConnected}</Row>
          <Button
            icon="rocket-solid"
            size="expanded"
            className="mt-8"
            layout="filled"
            onClick={() => {
              router.push(`/${lang}/map`);
              sendToMixpanel("map_opened");
            }}
          >
            {lp.button}
          </Button>

          <Row className="mt-12 mb-4 text-primary-700 text-sm">
            <Icon
              size="small"
              type="pin-solid"
              className="mr-2 animate-bounce"
            />{" "}
            {lp.missedPlace}
            <a
              className="ml-2 text-cta-600 hover:underline font-bold"
              target="_blank"
              href={`https://forms.gle/${FORM_ID[lang]}`}
              onClick={() => {
                sendToMixpanel("share_location_landing", { lang });
              }}
            >
              {lp.shareLocation}
            </a>
            .
          </Row>
          <Row className="text-primary-700 text-sm">
            <Icon
              size="small"
              type="heart-solid"
              className="mr-2 animate-pulse"
            />{" "}
            {lp.supportProject}{" "}
            <a
              className="mx-1 text-cta-600 hover:underline font-bold"
              target="_blank"
              href="https://patreon.com/Mandrii"
              onClick={() => {
                sendToMixpanel("followed_social_link", {
                  social: "Patreon",
                });
              }}
            >
              Patreon
            </a>
            {lp.or}
            <a
              className="ml-1 text-cta-600 hover:underline font-bold"
              target="_blank"
              href="https://buymeacoffee.com/mandrii"
              onClick={() => {
                sendToMixpanel("followed_social_link", {
                  social: "Buy Me a Coffee",
                });
              }}
            >
              Buy me a coffee
            </a>
            , {lp.thankYou}!
          </Row>
        </Column>
      </Column>
    </Row>
  );
};
