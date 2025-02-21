"use client";

import { Column, Row } from "@/components";
import Image from "next/image";
import { DONATE_LINKS, SOCIAL_LINKS } from "./constants";
import { SocialLink } from "./components/SocialLink";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { MenuButton } from "./components/MenuButton";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { classNames } from "@/utils";
import AuthButton from "./components/AuthButton";

export const Heading = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { lang, dict } = useLanguage();

  const strippedPath = pathname.replace(/^\/(en|uk)(\/|$)/, "/");
  const isRootRoute = strippedPath === "/" || strippedPath === "";

  const MENU_ITEMS = [
    {
      title: dict["Posts"],
      href: `${lang}/posts`,
    },
  ];

  return (
    <div className="w-screen flex bg-slate-700 px-5 lg:px-20 justify-center">
      <Row className="h-14 lg:h-20 content-center w-screen max-w-screen-xl">
        <Column className="relative items-start w-20 lg:w-32 h-max mt-1 lg:mt-2 min-w-min">
          <Row className="items-start">
            <Column className="group pl-1 min-w-max items-center -ml-8 -lg:ml-2">
              <Link href={`/${lang}`}>
                <div className="relative h-12 w-12 lg:h-16 lg:w-16">
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
              <Row className="w-28 justify-center group-hover:font-bold">
                <h1
                  className={classNames(
                    "text-md lg:text-xl font-leOsler mt-1 lg:mt-2",
                    isRootRoute
                      ? "text-primary-0"
                      : "text-slate-700 dark:text-primary-0"
                  )}
                >
                  → {dict["Mandrii"]} ←
                </h1>
              </Row>
            </Column>
            <Row className="h-12 lg:h-16 items-center">
              {DONATE_LINKS.map((props) => (
                <SocialLink key={props.href} {...props} />
              ))}
            </Row>
          </Row>
        </Column>
        <Column className="grow justify-center">
          <div className="flex flex-row justify-end">
            {/* {MENU_ITEMS.map((props) => (
              <MenuButton key={props.href} {...props} />
            ))} */}
          </div>
        </Column>
        <Column className="grow items-end min-w-min h-max mt-1 lg:mt-2">
          <Row className="items-center h-12 lg:h-16">
            {SOCIAL_LINKS.map((props) => (
              <SocialLink key={props.href} {...props} />
            ))}
            <div className="ml-5">
              <LanguageSwitcher />
            </div>
            <div className="ml-5">
              <AuthButton />
            </div>
          </Row>
          <h1
            className={classNames(
              "text-md group-hover:font-bold lg:text-lg cursor-default font-leOsler mt-1 lg:mt-2 -ml-3 -lg:ml-4 mr-6",
              isRootRoute
                ? "text-primary-0"
                : "text-slate-700 dark:text-primary-0"
            )}
          >
            мандруй / мрій / дій
          </h1>
        </Column>
      </Row>
    </div>
  );
};
