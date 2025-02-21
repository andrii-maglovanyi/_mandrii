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
      <Row className="items-center invert">
        <Phrase className="mr-5">
          <Link className="hover:underline " href={`/${lang}/account`}>
            {session.user?.name}
          </Link>
        </Phrase>
        <Button
          layout="outlined"
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
    <Row className="items-center invert">
      <Button
        layout="outlined"
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
