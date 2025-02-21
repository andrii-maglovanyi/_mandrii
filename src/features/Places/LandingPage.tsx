"use client";

import { Button, Column, H1, Icon, Phrase, Row } from "@/components";
import { FORM_ID } from "./constants";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { sendToMixpanel } from "@/lib/mixpanel";
import Link from "next/link";
import { signIn } from "next-auth/react";
import ShareLocationLink from "../ShareLocationLink/ShareLocationLink";

export const LandingPage = () => {
  const { lang, dict } = useLanguage();
  const router = useRouter();

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

      <Column className="max-w-screen-md text-center items-center justify-center pb-12 md:pb-24 box-border">
        <H1 className="font-leOsler font-bold mb-28 text-primary-0 text-7xl sm:text-8xl md:text-9xl mt-32 sm:mt-10 md:mt-20 px-4">
          {dict["Let's unite, Ukrainians!"]}
        </H1>
        <Column className="text-md md:text-lg mx-8 ">
          <Phrase className="font-semibold dark:text-primary-1000">
            {
              dict[
                "Discover Ukrainian businesses, restaurants, cultural center and community hubs across Europe. Whether you're looking for a familiar place, a taste of home, feeling of unity or ways to support own people abroad - this map helps you to find and contribute to the community."
              ]
            }
          </Phrase>

          <Column className="text-left">
            <Phrase className="mt-8 dark:text-primary-1000">
              💙 {dict["Find places owned by Ukrainians"]}
            </Phrase>
            <Phrase className="dark:text-primary-1000">
              💛 {dict["Support Ukrainian businesses and initiatives"]}
            </Phrase>
            <Phrase className="dark:text-primary-1000">
              🤝 {dict["Help each other grow and stay connected"]}
            </Phrase>
          </Column>
          <Button
            size="expanded"
            className="mt-8 
            dark:text-primary-0
            dark:bg-primary-950
            dark:hover:bg-primary-800
            dark:active:bg-primary-700
            dark:disabled:bg-primary-100
            dark:disabled:text-primary-300"
            layout="filled"
            onClick={() => {
              router.push(`/${lang}/map`);
              sendToMixpanel("map_opened");
            }}
          >
            {dict["Explore the map now!"]}
          </Button>

          <Column className="mt-12 mb-4 text-sm sm:flex-row">
            <Phrase className="text-nowrap text-primary-700 dark:text-primary-700">
              <Icon
                size="small"
                type="pin-solid"
                className="mr-2 animate-bounce"
              />{" "}
              {dict["Know a missed place?"]}
            </Phrase>
            <ShareLocationLink />.
          </Column>
          <Column className=" text-sm sm:flex-row">
            <Phrase className="text-nowrap text-primary-700 dark:text-primary-700">
              <Icon
                size="small"
                type="heart-solid"
                className="mr-2 animate-pulse"
              />{" "}
              {dict["Please support this project with"]}
            </Phrase>{" "}
            <Phrase className="text-nowrap text-primary-700 dark:text-primary-700">
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
              {dict["or"]}
              <a
                className="ml-1 text-cta-600 hover:underline font-bold text-nowrap"
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
              , {dict["thank you"]}!
            </Phrase>
          </Column>
        </Column>
      </Column>
    </Row>
  );
};
