"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components";
import { useLanguage } from "@/hooks";
import { sendToMixpanel } from "@/lib";
import { classNames } from "@/utils";

interface ShareLocationLinkProps {
  asButton?: boolean;
  className?: string;
}

export default function ShareLocationLink({
  asButton,
  className = "",
}: ShareLocationLinkProps) {
  const { data: session, status } = useSession();
  const { dict, lang } = useLanguage();
  const router = useRouter();

  const handleClick = (e: React.SyntheticEvent<Element>) => {
    e.preventDefault();

    sendToMixpanel("share_location_landing", { lang });

    if (status === "loading") return;

    if (session) {
      router.push("/account/add-place");
    } else {
      signIn("google", {
        callbackUrl: `${window.location.origin}/account/add-place`,
      });
    }
  };

  const message = dict["Share a location"];

  return asButton ? (
    <Button onClick={handleClick} layout="filled">
      {message}
    </Button>
  ) : (
    <Link
      className={classNames("ml-2 font-bold", className)}
      href=""
      onClick={handleClick}
    >
      {message}
    </Link>
  );
}
