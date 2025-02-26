import { sendToMixpanel } from "@/lib/mixpanel";
import { Icon } from "../../../components/Icon/Icon";
import { Tooltip } from "../../../components/Tooltip/Tooltip";
import { SocialIcon } from "@/constants";
import { BaseComponentProps } from "@/types";
import { classNames } from "@/utils";

export interface SocialLinkProps extends BaseComponentProps {
  href: string;
  title: string;
  customSize?: number;
  icon: SocialIcon;
}

export const SocialLink = ({
  href,
  title,
  icon,
  customSize,
  className,
}: SocialLinkProps) => (
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
      className="cursor-pointer flex hover:underline mx-2 lg:mx-3 transition-transform hover:scale-125 motion-reduce:transform-none relative my-2 max-h-min"
    >
      <Icon
        className={classNames(className)}
        connotation="primary"
        size="small"
        customSize={customSize}
        data-testid={`icon-${icon}`}
        type={icon}
      />
    </a>
  </Tooltip>
);
