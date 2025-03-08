"use client";

import { Button, Column, H1, Icon, Phrase, Row } from "@/components";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { sendToMixpanel } from "@/lib/mixpanel";
import ShareLocationLink from "../ShareLocationLink/ShareLocationLink";

import { SocialLink } from "../Heading/components/SocialLink";
import { DONATE_LINKS, SOCIAL_LINKS } from "@/constants";

export const LandingPage = () => {
  const { lang, dict } = useLanguage();
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(1);

  useEffect(() => {
    sendToMixpanel("page_view", { page: "Landing Page" });
  }, []);

  useEffect(() => {
    setScreenHeight(window.innerHeight);

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollPosition(window.scrollY / 1.5);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Row className="justify-center">
      <Column className="w-screen h-full">
        <Column className="bg-ukraine-blue h-1/2 min-h-max px-7 md:flex-row ">
          <Row className="max-w-screen-xl justify-center m-auto h-full ">
            <Column className="w-full lg:w-[60vw] lg:pr-8 xl:pr-12 grow justify-around">
              <H1 className="font-kyivType text-primary-0 text-[14vw] leading-none sm:text-7xl md:text-8xl lg:text-7xl">
                {dict["Let's unite, Ukrainians!"]}
              </H1>

              <Phrase className="text-primary-0 text-md sm:text-lg lg:text-xl sm:mt-4 md:mt-8 xl:mt-4 font-arsenal">
                {
                  dict[
                    "Discover Ukrainian businesses, restaurants, cultural center and community hubs across Europe."
                  ]
                }
              </Phrase>
              <Phrase className="text-primary-0 mt-2 md:mt-5 lg:mt-8 xl:mt-4 text-md sm:text-lg lg:text-xl font-arsenal mb-6">
                {
                  dict[
                    "Whether you're looking for a familiar place, a taste of home, feeling of unity or ways to support own people abroad - this map helps you to find and contribute to the community."
                  ]
                }
              </Phrase>
            </Column>
            <Column className="hidden relative items-end lg:flex w-[50vw]">
              <svg className="h-full w-full scale-150 z-10 pointer-events-none">
                <mask id="headMask">
                  <rect
                    width="100%"
                    height={`calc(16.65% + ${scrollPosition}px)`}
                    fill="#1C539599"
                  />
                  <rect
                    y={`calc(16.65% + ${scrollPosition}px)`}
                    width="100%"
                    height="100%"
                    fill="white"
                  />
                </mask>
                <g mask="url(#headMask)">
                  <use href="/assets/sprite.svg#europe" />
                </g>
              </svg>
              <svg
                style={{
                  transform: `scale(${Math.max(
                    0.1,
                    0.5 - scrollPosition / screenHeight
                  )})`,
                  opacity: Math.max(0, 1 - (5 * scrollPosition) / screenHeight),
                }}
                className="top-1/2 origin-center left-[20%] -translate-x-1/2 -translate-y-1/2 absolute z-10"
              >
                <use href="/assets/sprite.svg#ukraine-heart" />
              </svg>
            </Column>
          </Row>
        </Column>
        <Column className="bg-ukraine-yellow grow px-7 font-arsenal w-full">
          <Column className="xl:flex-row lg:relative m-auto w-full max-w-screen-sm xl:max-w-screen-2xl xl:justify-around xl:items-center pt-4 xl:pt-8 z-0 lg:z-10">
            <Row className="items-center justify-between h-12 mb-4 xl:mb-0">
              <Column>
                <Phrase className="font-semibold text-cta-600">
                  {dict["Find places owned by Ukrainians"]}
                </Phrase>{" "}
              </Column>
              <Column className="min-w-9 items-center">
                <Icon
                  type="pin"
                  className="fill-cta-600 ml-4 min-w-8"
                  size="large"
                />
              </Column>
            </Row>
            <Row className="items-center justify-between h-12 min-w-8 mb-4 xl:mb-0">
              <Column>
                <Phrase className="font-semibold text-cta-600">
                  {dict["Support Ukrainian businesses and initiatives"]}
                </Phrase>{" "}
              </Column>
              <Column className="min-w-9 items-center">
                <Icon
                  type="life-vest"
                  className="fill-cta-600 ml-4"
                  size="large"
                />
              </Column>
            </Row>
            <Row className="items-center justify-between mb-4 h-12 min-w-8 xl:mb-0">
              <Column>
                <Phrase className="font-semibold text-cta-600">
                  {dict["Help each other grow and stay connected"]}
                </Phrase>
              </Column>
              <Column className="min-w-9 items-center">
                <Icon type="chart" className="fill-cta-600 ml-4" size="large" />
              </Column>
            </Row>
          </Column>

          <Column className="w-full mt-4 mb-8 max-w-screen-sm m-auto">
            <Button
              size="expanded"
              className="bg-primary-900 active:bg-cta-50  text-primary-0 hover:bg-primary-0 hover:text-cta-600 rounded-2xl shadow-lg h-14"
              layout="filled"
              onClick={() => {
                router.push(`/${lang}/map`);
                sendToMixpanel("map_opened");
              }}
            >
              {dict["Explore the map now!"]}
            </Button>
          </Column>

          <Row className="justify-center items-center my-2">
            <Phrase className="text-nowrap text-cta-600">
              {dict["Know a missed place?"]}
            </Phrase>
            <ShareLocationLink className="text-nowrap text-cta-600" />.
          </Row>

          <Row className="justify-between px-4 mt-4 text-ukraine-yellow w-full max-w-screen-sm m-auto">
            {[...DONATE_LINKS, ...SOCIAL_LINKS].map((props) => (
              <SocialLink
                className="fill-cta-600"
                customSize={40}
                key={props.href}
                {...props}
              />
            ))}
          </Row>

          <Row className="justify-center items-center text-cta-600 font-bold mb-2 mt-2">
            Мандруй / Мрій / Дій
          </Row>
        </Column>
      </Column>
    </Row>
  );
};
