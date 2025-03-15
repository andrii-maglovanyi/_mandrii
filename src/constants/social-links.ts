import { IconType } from "@/components/Icon/Icon";

export type SocialIcon = Extract<
  IconType,
  "buymeacoffee" | "instagram" | "patreon" | "telegram" | "youtube"
>;

interface SocialLinks {
  href: string;
  icon: SocialIcon;
  title: string;
}

export const DONATE_LINKS: Array<SocialLinks> = [
  {
    href: "https://patreon.com/Mandrii",
    icon: "patreon",
    title: "Patreon",
  },
  {
    href: "https://buymeacoffee.com/mandrii",
    icon: "buymeacoffee",
    title: "Buy Me a Coffee",
  },
];

export const SOCIAL_LINKS: Array<SocialLinks> = [
  {
    href: "https://www.youtube.com/@m.andrii",
    icon: "youtube",
    title: "@m.andrii",
  },
  {
    href: "https://t.me/m_andrii_ua",
    icon: "telegram",
    title: "m_andrii_ua",
  },
  {
    href: "https://www.instagram.com/m.andrii.ua",
    icon: "instagram",
    title: "m.andrii.ua",
  },
];
