"use client";

import { Button, Phrase, Row } from "@/components";
import { useLanguage } from "@/hooks/useLanguage";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { dict, lang } = useLanguage();
  const { data: session } = useSession();

  if (session) {
    return (
      <Row className="items-center">
        <Phrase className="mx-5">
          <Link
            className="hover:underline text-primary-0 "
            href={`/${lang}/account`}
          >
            {session.user?.name}
          </Link>
        </Phrase>
        <Button
          layout="filled"
          className="bg-primary-0 text-cta-500 active:bg-cta-100 active:text-cta-700 hover:bg-cta-50 hover:text-cta-600 shadow-md"
          size="condensed"
          onClick={() => {
            signOut({ callbackUrl: `${window.location.origin}/` });
          }}
        >
          {dict["Sign out"]}
        </Button>
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
