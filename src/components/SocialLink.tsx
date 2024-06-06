import Image from "next/image";

interface SocialLinkProps {
  href: string;
  title: string;
  icon: string;
}

export const SocialLink = ({ href, title, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex gap-2 hover:underline"
  >
    <Image
      src={`/icons/${icon}.svg`}
      alt={`${title} ${icon}`}
      className="dark:invert"
      width={22}
      height={22}
      priority
    />{" "}
    {title}
  </a>
);
