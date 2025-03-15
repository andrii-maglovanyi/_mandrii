"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, Column, H1, Icon, Phrase,Row } from "@/components";
import { DONATE_LINKS, SOCIAL_LINKS } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";
import { sendToMixpanel } from "@/lib/mixpanel";

import { SocialLink } from "../Heading/components/SocialLink";
import ShareLocationLink from "../ShareLocationLink/ShareLocationLink";

export const LandingPage = () => {
  const { dict, lang } = useLanguage();
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
      <Column className="h-full w-screen">
        <Column className={`
          bg-ukraine-blue h-1/2 min-h-max px-7
          md:flex-row
        `}>
          <Row className="m-auto h-full max-w-(--breakpoint-xl) justify-center">
            <Column className={`
              w-full grow justify-around
              lg:w-[60vw] lg:pr-8
              xl:pr-12
            `}>
              <H1 className={`
                font-kyivType text-primary-0 text-[14vw] leading-none
                sm:text-7xl
                md:text-8xl
                lg:text-7xl
              `}>
                {dict["Let's unite, Ukrainians!"]}
              </H1>

              <Phrase className={`
                text-primary-0 text-md font-arsenal
                sm:mt-4 sm:text-lg
                md:mt-8
                lg:text-xl
                xl:mt-4
              `}>
                {
                  dict[
                    "Discover Ukrainian businesses, restaurants, cultural center and community hubs across Europe."
                  ]
                }
              </Phrase>
              <Phrase className={`
                text-primary-0 text-md font-arsenal mt-2 mb-6
                sm:text-lg
                md:mt-5
                lg:mt-8 lg:text-xl
                xl:mt-4
              `}>
                {
                  dict[
                    "Whether you're looking for a familiar place, a taste of home, feeling of unity or ways to support own people abroad - this map helps you to find and contribute to the community."
                  ]
                }
              </Phrase>
            </Column>
            <Column className={`
              relative hidden w-[50vw] items-end
              lg:flex
            `}>
              <svg className="pointer-events-none z-10 h-full w-full scale-150">
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
                  opacity: Math.max(0, 1 - (5 * scrollPosition) / screenHeight),
                  transform: `scale(${Math.max(
                    0.1,
                    0.5 - scrollPosition / screenHeight
                  )})`,
                }}
                className={`
                  absolute top-2/3 left-[40%] z-10 origin-center
                  -translate-x-1/2 -translate-y-1/2
                `}
              >
                <use href="/assets/sprite.svg#ukraine-heart" />
              </svg>
            </Column>
          </Row>
        </Column>
        <Column className="bg-ukraine-yellow font-arsenal w-full grow px-7">
          <Column className={`
            z-0 m-auto w-full max-w-(--breakpoint-sm) pt-4
            lg:relative lg:z-10
            xl:max-w-(--breakpoint-2xl) xl:flex-row xl:items-center
            xl:justify-around xl:pt-8
          `}>
            <Row className={`
              mb-4 h-12 items-center justify-between
              xl:mb-0
            `}>
              <Column>
                <Phrase className="text-cta-600 font-semibold">
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
            <Row className={`
              mb-4 h-12 min-w-8 items-center justify-between
              xl:mb-0
            `}>
              <Column>
                <Phrase className="text-cta-600 font-semibold">
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
            <Row className={`
              mb-4 h-12 min-w-8 items-center justify-between
              xl:mb-0
            `}>
              <Column>
                <Phrase className="text-cta-600 font-semibold">
                  {dict["Help each other grow and stay connected"]}
                </Phrase>
              </Column>
              <Column className="min-w-9 items-center">
                <Icon type="chart" className="fill-cta-600 ml-4" size="large" />
              </Column>
            </Row>
          </Column>

          <Column className="m-auto mt-4 mb-8 w-full max-w-(--breakpoint-sm)">
            <Button
              size="expanded"
              className={`
                bg-primary-900 text-primary-0 h-14 rounded-2xl shadow-lg
                active:bg-cta-50
                hover:bg-primary-0 hover:text-cta-600
              `}
              layout="filled"
              onClick={() => {
                router.push(`/${lang}/map`);
                sendToMixpanel("map_opened");
              }}
            >
              {dict["Explore the map now!"]}
            </Button>
          </Column>

          <Row className="my-2 items-center justify-center">
            <Phrase className="text-cta-600 text-nowrap">
              {dict["Know a missed place?"]}
            </Phrase>
            <ShareLocationLink className="text-cta-600 text-nowrap" />.
          </Row>

          <Row className={`
            text-ukraine-yellow m-auto mt-4 w-full max-w-(--breakpoint-sm)
            justify-between px-4
          `}>
            {[...DONATE_LINKS, ...SOCIAL_LINKS].map((props) => (
              <SocialLink
                className="fill-cta-600"
                customSize={40}
                key={props.href}
                {...props}
              />
            ))}
          </Row>

          <Row className={`
            text-cta-600 mt-2 mb-2 items-center justify-center font-bold
          `}>
            Мандруй / Мрій / Дій
          </Row>
        </Column>
      </Column>
    </Row>
  );
};
