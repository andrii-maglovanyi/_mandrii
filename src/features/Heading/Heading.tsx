"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Column, Row } from "@/components";
import { DONATE_LINKS, SOCIAL_LINKS } from "@/constants";
import { useLanguage } from "@/hooks/useLanguage";

import AuthButton from "./components/AuthButton";
import LanguageSwitcher from "./components/LanguageSwitcher";
// import { MenuButton } from ".//MenuButton";
import { SocialLink } from "./components/SocialLink";

export const Heading = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const { dict, lang } = useLanguage();

  const strippedPath = pathname.replace(/^\/(en|uk)(\/|$)/, "/");

  // const MENU_ITEMS = [
  //   {
  //     href: `${lang}/posts`,
  //     title: dict["Posts"],
  //   },
  // ];

  return (
    <div
      className={`
        fixed top-0 z-1 flex w-screen justify-center px-5
        lg:px-20
      `}
    >
      <Row
        className={`
          bg-cta-700 fixed left-0 -z-1 h-14 w-full
          dark:bg-primary-900
          sm:h-16
          md:h-20
        `}
      />
      <Row
        className={`
          relative z-100 h-14 w-screen max-w-(--breakpoint-xl) content-center
          sm:h-16
          md:h-20
        `}
      >
        <Column
          className={`
            relative w-20 min-w-min items-start pt-0.5
            sm:pt-[3px]
            md:pt-1.5
            lg:w-32
          `}
        >
          <Row className="items-center">
            <Column className="group min-w-max items-center">
              <Link href={`/${lang}`}>
                <div
                  className={`
                    relative h-10 w-10
                    sm:h-11 sm:w-11
                    md:h-[50px] md:w-[50px]
                  `}
                >
                  <Image
                    src="/assets/logo/mandrii.png"
                    alt={dict["Mandrii"]}
                    className={`
                      rounded-full border-2 border-white
                      group-hover:scale-105
                    `}
                    fill
                    priority
                    sizes="(min-width: 1024px) 64px, 48px"
                  />
                </div>
              </Link>
              <Row
                className={`
                  w-[61px] cursor-pointer justify-center
                  group-hover:font-bold
                  sm:w-[71px]
                  md:w-[91px]
                `}
              >
                <h1
                  className={`
                    font-leOsler text-primary-0 text-[11px]
                    sm:text-[13px]
                    md:text-[15px]
                  `}
                >
                  → {dict["Mandrii"]} ←
                </h1>
              </Row>
            </Column>

            {strippedPath === "/" ? null : (
              <Row
                className={`
                  ml-3 hidden h-12 items-center
                  sm:flex
                  lg:h-16
                `}
              >
                {DONATE_LINKS.map((props) => (
                  <SocialLink
                    className="fill-primary-0"
                    key={props.href}
                    {...props}
                  />
                ))}
              </Row>
            )}
          </Row>
        </Column>
        <Column className="grow justify-center">
          <div className="flex flex-row justify-end">
            {/* {MENU_ITEMS.map((props) => (
              <MenuButton key={props.href} {...props} />
            ))} */}
          </div>
        </Column>
        <Column className="grow items-end justify-center">
          <Row className="items-center">
            {strippedPath === "/" ? null : (
              <Row
                className={`
                  text-cta-700 fill-primary-0 hidden
                  sm:flex
                `}
              >
                {SOCIAL_LINKS.map((props) => (
                  <SocialLink
                    className="fill-primary-0"
                    key={props.href}
                    {...props}
                  />
                ))}
              </Row>
            )}

            <div className="ml-5">
              <LanguageSwitcher />
            </div>
            <div className="ml-3">
              <AuthButton />
            </div>
          </Row>
        </Column>
      </Row>
    </div>
  );
};
