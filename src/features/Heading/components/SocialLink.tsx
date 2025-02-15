import { sendToMixpanel } from "@/lib/mixpanel";
import { Icon } from "../../../components/Icon/Icon";
import { Tooltip } from "../../../components/Tooltip/Tooltip";

export type SocialIcon =
  | "buymeacoffee"
  | "instagram"
  | "patreon"
  | "telegram"
  | "youtube";
export interface SocialLinkProps {
  href: string;
  title: string;
  icon: SocialIcon;
}

export const SocialLink = ({ href, title, icon }: SocialLinkProps) => (
  <Tooltip text={title} placement="bottom">
    <a
      href={href}
      onClick={() => {
        sendToMixpanel("followed_social_link", {
          social: title,
        });
      }}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer flex hover:underline mx-2 lg:mx-3 transition-transform hover:scale-125 motion-reduce:transform-none relative w-4 h-4 my-2"
    >
      <Icon
        className="fill-primary-0 "
        connotation="primary"
        size="small"
        data-testid={`icon-${icon}`}
        type={icon}
      />
    </a>
  </Tooltip>
);
