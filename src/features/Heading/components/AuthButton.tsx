"use client";

import { Button, Row } from "@/components";
import { useLanguage } from "@/hooks/useLanguage";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function AuthButton() {
  const { dict, lang } = useLanguage();
  const { data: session } = useSession();

  if (session) {
    return (
      <Row className="items-center">
        <Link
          className="hover:underline text-primary-0 "
          href={`/${lang}/account`}
        >
          <div className="relative h-10 w-10 sm:h-11 sm:w-11 md:h-[50px] md:w-[50px] ml-3 mr-1">
            {session.user?.image ? (
              <Image
                className="rounded-full border-2 group-hover:scale-105 border-white hover:scale-105"
                src={session.user.image}
                alt={session.user?.name ?? "profile"}
                fill
                priority
              />
            ) : (
              <svg className="w-full h-full" aria-hidden="true" role="img">
                <use href="/assets/sprite.svg#profile" />
              </svg>
            )}
          </div>
        </Link>

        {/* <p>Role: {session?.user?.hasuraClaims["x-hasura-default-role"]}</p> */}
        <Link
          href="#"
          className="text-primary-50 hover:text-primary-0 font-kyivType ml-2 text-sm hover:underline"
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
        className="bg-primary-0 text-cta-500 active:bg-cta-100 active:text-cta-700 hover:bg-cta-50 hover:text-cta-600 shadow-md"
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
