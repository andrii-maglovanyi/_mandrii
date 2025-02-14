import { SocialLinkProps } from "./components/SocialLink";

export const DONATE_LINKS: Array<SocialLinkProps> = [
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

export const SOCIAL_LINKS: Array<SocialLinkProps> = [
  {
    href: "https://www.youtube.com/@m.andrii",
    title: "@m.andrii",
    icon: "youtube" as const,
  },
  {
    href: "https://t.me/m_andrii_ua",
    title: "m_andrii_ua",
    icon: "telegram" as const,
  },
  {
    href: "https://www.instagram.com/m.andrii.ua",
    title: "m.andrii.ua",
    icon: "instagram" as const,
  },
];
