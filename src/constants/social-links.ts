import { IconType } from "@/components/Icon/Icon";

export type SocialIcon = Extract<
  IconType,
  "buymeacoffee" | "instagram" | "patreon" | "telegram" | "youtube"
>;

interface SocialLinks {
  href: string;
  title: string;
  icon: SocialIcon;
}

export const DONATE_LINKS: Array<SocialLinks> = [
  {
    href: "https://patreon.com/Mandrii",
    title: "Patreon",
    icon: "patreon",
  },
  {
    href: "https://buymeacoffee.com/mandrii",
    title: "Buy Me a Coffee",
    icon: "buymeacoffee",
  },
];

export const SOCIAL_LINKS: Array<SocialLinks> = [
  {
    href: "https://www.youtube.com/@m.andrii",
    title: "@m.andrii",
    icon: "youtube",
  },
  {
    href: "https://t.me/m_andrii_ua",
    title: "m_andrii_ua",
    icon: "telegram",
  },
  {
    href: "https://www.instagram.com/m.andrii.ua",
    title: "m.andrii.ua",
    icon: "instagram",
  },
];
