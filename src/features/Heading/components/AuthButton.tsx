"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Row } from "@/components";
import { useLanguage } from "@/hooks/useLanguage";

export default function AuthButton() {
  const { dict, lang } = useLanguage();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <Row className="items-center">
        <Link
          className={`
            text-primary-0
            hover:underline
          `}
          href={`/${lang}/account`}
        >
          <div
            className={`
              relative mr-1 ml-3 h-10 w-10
              sm:h-11 sm:w-11
              md:h-[50px] md:w-[50px]
            `}
          >
            {session.user?.image ? (
              <Image
                className={`
                  rounded-full border-2 border-white
                  group-hover:scale-105
                  hover:scale-105
                `}
                src={session.user.image}
                alt={session.user?.name ?? "profile"}
                fill
                priority
              />
            ) : (
              <svg className="h-full w-full" aria-hidden="true" role="img">
                <use href="/assets/sprite.svg#profile" />
              </svg>
            )}
          </div>
        </Link>

        <Link
          href="#"
          className={`
            text-primary-50 font-kyivType ml-2 text-sm
            hover:text-primary-0 hover:underline
          `}
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${window.location.origin}/` });
          }}
        >
          {dict["Sign out"]}
        </Link>
      </Row>
    );
  }

  return (
    <Row className="items-center">
      <Button
        layout="filled"
        icon="google-color"
        className={`
          bg-primary-0 text-cta-500 shadow-md
          active:bg-cta-100 active:text-cta-700
          hover:bg-cta-50 hover:text-cta-600
        `}
        size="condensed"
        onClick={() => {
          signIn("google");
        }}
      >
        {dict["Sign in"]}
      </Button>
    </Row>
  );
}
