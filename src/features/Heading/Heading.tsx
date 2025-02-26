"use client";

import { Column, Row } from "@/components";
import Image from "next/image";

import { SocialLink } from "./components/SocialLink";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { MenuButton } from "./components/MenuButton";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthButton from "./components/AuthButton";
import { DONATE_LINKS, SOCIAL_LINKS } from "@/constants";
import { BaseComponentProps } from "@/types";

export const Heading = ({ className }: BaseComponentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, dict } = useLanguage();

  const strippedPath = pathname.replace(/^\/(en|uk)(\/|$)/, "/");

  const MENU_ITEMS = [
    {
      title: dict["Posts"],
      href: `${lang}/posts`,
    },
  ];

  return (
    <div className="w-screen fixed top-0 flex px-5 lg:px-20 justify-center z-1">
      <Row className="bg-cta-700 w-full h-14 sm:h-16 md:h-20 fixed -z-1 left-0" />
      <Row className="h-14 sm:h-16 md:h-20 content-center w-screen max-w-screen-xl z-100 relative">
        <Column className="relative items-start w-20 lg:w-32 pt-0.5 sm:pt-[3px] md:pt-1.5 min-w-min">
          <Row className="items-start">
            <Column className="group min-w-max items-center">
              <Link href={`/${lang}`}>
                <div className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-[50px] md:w-[50px]">
                  <Image
                    src="/assets/logo/mandrii.png"
                    alt={dict["Mandrii"]}
                    className="rounded-full border-2 group-hover:scale-105 border-white "
                    fill
                    priority
                    sizes="(min-width: 1024px) 64px, 48px"
                  />
                </div>
              </Link>
              <Row className="w-[61px] sm:w-[71px] md:w-[91px] justify-center group-hover:font-bold cursor-pointer">
                <h1 className="text-[11px] sm:text-[13px] md:text-[15px] font-leOsler text-primary-0">
                  → {dict["Mandrii"]} ←
                </h1>
              </Row>
            </Column>
            {strippedPath === "/" ? null : (
              <Row className="h-12 lg:h-16 items-center ml-3">
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
        <Column className="grow justify-center items-end">
          <Row className="items-center">
            {strippedPath === "/" ? null : (
              <Row className="text-cta-700 fill-primary-0">
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
